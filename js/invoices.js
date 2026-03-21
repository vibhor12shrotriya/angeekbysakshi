/* ═══════════════════════════════════════════
   INVOICES.JS — Invoice list + modal
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */

const Invoices = (() => {
  let filter = 'all';
  let search = '';

  function render() {
    const invoices = filtered();
    const el = document.getElementById('page-invoices');
    el.innerHTML = `
      <div class="page-header">
        <div><div class="page-title">Invoices</div><div class="page-subtitle">All billing records (${invoices.length})</div></div>
        <div class="page-actions">
          <div class="search-bar" style="width:240px">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg>
            <input id="inv-search" placeholder="Search name, invoice, mobile..." value="${search}"
              oninput="Invoices.doSearch(this.value)">
          </div>
          <select class="form-input" style="width:110px" onchange="Invoices.doFilter(this.value)">
            <option value="all" ${filter==='all'?'selected':''}>All Types</option>
            <option value="rent" ${filter==='rent'?'selected':''}>Rental</option>
            <option value="sale" ${filter==='sale'?'selected':''}>Sale</option>
          </select>
          <button class="btn btn-secondary btn-sm" onclick="Store.exportCSV('invoices')">↓ CSV</button>
          <button class="btn btn-primary" onclick="navigate('billing')">+ New Bill</button>
        </div>
      </div>

      <div class="card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Invoice</th><th>Date</th><th>Customer</th><th>Item</th>
                <th>Type</th><th>Total</th><th>Paid</th><th>Balance</th>
                <th>Status</th><th>Return</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${invoices.length ? invoices.map(renderRow).join('') : `
                <tr><td colspan="11"><div class="empty-state"><p>No invoices found</p></div></td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderRow(inv) {
    const { total, paid, balance } = Utils.calcInvoice(inv);
    const status  = Utils.invoiceStatus(inv);
    const retStat = Utils.returnStatus(inv);
    return `
      <tr onclick="InvoiceModal.open('${inv.id}')" style="cursor:pointer">
        <td style="font-weight:500;color:var(--gold-dark)">${inv.number}</td>
        <td>${Utils.fmtDateShort(inv.createdAt)}</td>
        <td>${inv.customerName}</td>
        <td style="max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${inv.outfitName||inv.outfitCode||'—'}</td>
        <td>${inv.type==='rent' ? '<span class="badge badge-blue">Rent</span>' : '<span class="badge badge-rose">Sale</span>'}</td>
        <td>${Utils.inr(total)}</td>
        <td style="color:var(--success)">${Utils.inr(paid)}</td>
        <td style="color:${balance>0?'var(--danger)':'var(--ink-mid)'}">${Utils.inr(balance)}</td>
        <td>${Utils.statusBadge(status)}</td>
        <td>${retStat !== 'na' ? Utils.statusBadge(retStat) : '—'}</td>
        <td onclick="event.stopPropagation()">
          <div class="flex-gap-sm">
            <button class="btn btn-secondary btn-sm" onclick="InvoiceModal.open('${inv.id}')">View</button>
            <button class="btn-wa btn btn-sm" onclick="WhatsApp.open('${inv.id}')">WA</button>
          </div>
        </td>
      </tr>`;
  }

  function filtered() {
    return Store.getInvoices().filter(i => {
      if (filter !== 'all' && i.type !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return i.number.toLowerCase().includes(q) ||
               i.customerName.toLowerCase().includes(q) ||
               (i.customerMobile||'').includes(q) ||
               (i.outfitCode||'').toLowerCase().includes(q) ||
               (i.outfitName||'').toLowerCase().includes(q);
      }
      return true;
    });
  }

  function doFilter(v) { filter = v; render(); }
  function doSearch(v) { search = v; render(); }

  return { render, doFilter, doSearch };
})();

/* ── Invoice Modal ────────────────────────────────────── */
const InvoiceModal = (() => {
  function open(invId) {
    const inv  = Store.getInvoice(invId);
    if (!inv) return;
    const studio = Store.getStudio();
    const { rent, deposit, price, discAmt, total, paid, balance } = Utils.calcInvoice(inv);
    const retStat = Utils.returnStatus(inv);
    const daysLate = Utils.daysOverdue(inv.rentTo);
    const lateFee  = daysLate * Utils.num(inv.lateFeePerDay);

    Utils.openModal('invoice-modal', `
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-title">${inv.number}</div>
          <button class="modal-close" onclick="Utils.closeModal('invoice-modal')">✕</button>
        </div>
        <div class="modal-body">
          ${retStat === 'overdue' ? `
            <div class="alert alert-danger">
              ⚠ This rental is ${daysLate} day${daysLate!==1?'s':''} overdue.
              Late fee: ${Utils.inr(lateFee)} (${Utils.inr(inv.lateFeePerDay)}/day)
            </div>` : ''}

          <div class="invoice-preview">
            <div class="invoice-header">
              <div class="invoice-brand">
                <h2>${studio.name}</h2>
                <p>${studio.tagline}</p>
                <p style="font-size:10px;color:var(--ink-mid);margin-top:2px">📍 ${studio.address} · ${studio.phone}</p>
              </div>
              <div class="invoice-num">
                <div class="num">${inv.number}</div>
                <div class="date">${Utils.fmtDate(inv.createdAt)}</div>
                <div style="margin-top:5px">
                  ${inv.type==='rent' ? '<span class="badge badge-blue">Rental</span>' : '<span class="badge badge-rose">Sale</span>'}
                </div>
              </div>
            </div>

            <div class="invoice-section">
              <h4>Bill To</h4>
              <div style="font-size:13px;font-weight:500">${inv.customerName}</div>
              <div style="font-size:11.5px;color:var(--ink-mid)">+91 ${inv.customerMobile}</div>
            </div>

            <div class="invoice-section">
              <h4>Item${inv.type==='sale'?'s':''}</h4>
              <table class="invoice-table">
                <thead><tr><th>Description</th><th>Code</th><th style="text-align:right">Amount</th></tr></thead>
                <tbody>
                  <tr>
                    <td>${inv.outfitName||'—'} ${inv.type==='rent'?'(Rental)':''}</td>
                    <td>${inv.outfitCode||'—'}</td>
                    <td style="text-align:right;font-weight:500">${Utils.inr(inv.type==='rent'?rent:price)}</td>
                  </tr>
                  ${inv.type==='rent' && deposit > 0 ? `
                  <tr>
                    <td>Security Deposit</td><td>—</td>
                    <td style="text-align:right;font-weight:500">${Utils.inr(deposit)}</td>
                  </tr>` : ''}
                </tbody>
              </table>
            </div>

            ${inv.type==='rent' && inv.rentFrom ? `
              <div style="background:var(--gold-light);border-radius:6px;padding:8px 10px;font-size:11px;color:var(--gold-dark);margin-bottom:14px">
                Rental: ${Utils.fmtDate(inv.rentFrom)} → ${Utils.fmtDate(inv.rentTo)} &nbsp;·&nbsp;
                Late fee: ${Utils.inr(inv.lateFeePerDay)}/day &nbsp;·&nbsp;
                Deposit: ${Utils.inr(deposit)} (refundable)
              </div>` : ''}

            <div class="invoice-totals">
              ${inv.type==='rent'
                ? `<div class="total-row"><span>Rent Amount</span><span>${Utils.inr(rent)}</span></div>
                   ${deposit>0?`<div class="total-row"><span>Security Deposit</span><span>${Utils.inr(deposit)}</span></div>`:''}
                   ${lateFee>0?`<div class="total-row"><span style="color:var(--danger)">Late Fee (${daysLate}d)</span><span style="color:var(--danger)">${Utils.inr(lateFee)}</span></div>`:''}
                `
                : `<div class="total-row"><span>Item Price</span><span>${Utils.inr(price)}</span></div>
                   ${discAmt>0?`<div class="total-row"><span>Discount</span><span style="color:var(--success)">-${Utils.inr(discAmt)}</span></div>`:''}
                `}
              <div class="total-row grand"><span>Total</span><span>${Utils.inr(total)}</span></div>
              <div class="total-row"><span>Paid (${inv.paymentMode||'cash'})</span><span style="color:var(--success)">${Utils.inr(paid)}</span></div>
              <div class="total-row"><span style="color:${balance>0?'var(--danger)':'inherit'}">Balance Due</span>
                <span style="color:${balance>0?'var(--danger)':'inherit'}">${Utils.inr(balance)}</span></div>
            </div>

            <div class="invoice-footer">${studio.returnPolicy}</div>
          </div>

          ${inv.type==='rent' && inv.returnStatus !== 'returned' ? `
            <div style="margin-top:16px;padding:14px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <div style="font-size:12px;font-weight:500;color:var(--ink-mid);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.7px">Return Management</div>
              <div class="flex-wrap">
                <button class="btn btn-success" onclick="InvoiceModal.markReturned('${inv.id}',true)">
                  ✓ Mark Returned & Refund Deposit
                </button>
                <button class="btn btn-secondary" onclick="InvoiceModal.markReturned('${inv.id}',false)">
                  Mark Returned (Hold Deposit)
                </button>
                ${balance > 0 ? `<button class="btn btn-primary" onclick="InvoiceModal.recordPayment('${inv.id}')">Record Payment</button>` : ''}
              </div>
            </div>` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="PDF.print('${inv.id}')">🖨 Print / PDF</button>
          <button class="btn-wa btn" onclick="WhatsApp.open('${inv.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Share WhatsApp
          </button>
          <button class="btn btn-primary" onclick="Utils.closeModal('invoice-modal')">Close</button>
        </div>
      </div>
    `);
  }

  function markReturned(invId, refundDeposit) {
    const inv = Store.getInvoice(invId);
    if (!inv) return;
    inv.returnStatus   = 'returned';
    inv.depositRefunded= refundDeposit;
    inv.returnedAt     = Utils.today();
    Store.saveInvoice(inv);

    // Update inventory
    if (inv.inventoryId) {
      const item = Store.getInventoryItem(inv.inventoryId);
      if (item) { item.status = 'available'; Store.saveInventoryItem(item); }
    }

    Utils.closeModal('invoice-modal');
    Utils.toast(refundDeposit ? '✓ Returned & deposit refunded' : '✓ Returned, deposit held', 'success');
  }

  function recordPayment(invId) {
    const inv = Store.getInvoice(invId);
    if (!inv) return;
    const { balance } = Utils.calcInvoice(inv);

    Utils.openModal('invoice-modal', `
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Record Payment</div>
          <button class="modal-close" onclick="InvoiceModal.open('${invId}')">✕</button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warn">Balance outstanding: ${Utils.inr(balance)}</div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Amount (₹)</label>
            <input class="form-input" id="pay-amount" type="number" placeholder="${balance}" value="${balance}">
          </div>
          <div class="form-group">
            <label class="form-label">Payment Mode</label>
            <select class="form-input" id="pay-mode">
              ${PAYMENT_MODES.map(m=>`<option value="${m.value}">${m.label}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="InvoiceModal.open('${invId}')">Cancel</button>
          <button class="btn btn-primary" onclick="InvoiceModal.savePayment('${invId}')">Save Payment</button>
        </div>
      </div>`);
  }

  function savePayment(invId) {
    const inv    = Store.getInvoice(invId);
    if (!inv) return;
    const amount = Utils.num(Utils.val('pay-amount'));
    const mode   = Utils.val('pay-mode') || 'cash';
    if (!amount) { Utils.toast('Enter payment amount', 'error'); return; }

    inv.amountPaid = (inv.amountPaid || 0) + amount;
    inv.paymentMode = mode;
    inv.status = Utils.invoiceStatus(inv);
    Store.saveInvoice(inv);

    Store.savePayment({
      id: Store.genId('P'), invoiceId: invId, invoiceNumber: inv.number,
      customerName: inv.customerName, amount, mode,
      date: Utils.today(), note: 'Additional payment',
    });

    Utils.closeModal('invoice-modal');
    Utils.toast(`✓ Payment of ${Utils.inr(amount)} recorded`, 'success');
  }

  return { open, markReturned, recordPayment, savePayment };
})();
