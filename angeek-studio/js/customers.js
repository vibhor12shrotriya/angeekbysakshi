/* ═══════════════════════════════════════════
   CUSTOMERS.JS
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */
const Customers = (() => {
  let selected = null;

  function render() {
    const customers = Store.getCustomers();
    const invoices  = Store.getInvoices();
    const el = document.getElementById('page-customers');

    // Pick first customer by default
    if (!selected && customers.length) selected = customers[0].id;

    el.innerHTML = `
      <div class="page-header">
        <div><div class="page-title">Customers</div><div class="page-subtitle">Directory and booking history</div></div>
        <div class="page-actions">
          <div class="search-bar" style="width:220px">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg>
            <input id="cust-search" placeholder="Search name or mobile..." oninput="Customers.doSearch(this.value)">
          </div>
          <button class="btn btn-secondary btn-sm" onclick="Store.exportCSV('customers')">↓ CSV</button>
        </div>
      </div>
      <div class="two-col">
        <div class="card" style="overflow:hidden">
          <div class="card-header"><span class="card-title">All Customers (${customers.length})</span></div>
          <div class="table-scroll">
            <table class="table-clickable">
              <thead><tr><th>Customer</th><th>Mobile</th><th>Orders</th><th>Status</th></tr></thead>
              <tbody id="cust-list">
                ${customers.map(c => renderRow(c, invoices)).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div id="cust-detail-panel">
          ${selected ? renderDetail(Store.getCustomer(selected), invoices) : '<div class="empty-state"><p>Select a customer to view profile</p></div>'}
        </div>
      </div>
    `;
  }

  function renderRow(c, invoices) {
    const cInvs    = invoices.filter(i => i.customerId === c.id);
    const hasDue   = cInvs.some(i => Utils.calcInvoice(i).balance > 0);
    const hasOver  = cInvs.some(i => Utils.returnStatus(i) === 'overdue');
    const badge    = hasOver ? '<span class="badge badge-red">Overdue</span>'
                   : hasDue  ? '<span class="badge badge-gold">Dues</span>'
                   : '<span class="badge badge-green">Clear</span>';
    return `
      <tr onclick="Customers.select('${c.id}')" ${selected===c.id?'style="background:var(--gold-light)"':''}>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar avatar-sm">${Utils.initials(c.name)}</div>
            <div>
              <div style="font-weight:500">${c.name}</div>
              <div style="font-size:11px;color:var(--ink-mid)">Since ${Utils.fmtDateShort(c.since)}</div>
            </div>
          </div>
        </td>
        <td>${c.mobile}</td>
        <td>${cInvs.length}</td>
        <td>${badge}</td>
      </tr>`;
  }

  function renderDetail(c, invoices) {
    if (!c) return '<div class="empty-state"><p>Customer not found</p></div>';
    const cInvs    = invoices.filter(i => i.customerId === c.id);
    const totalPaid= cInvs.reduce((s,i) => s + Utils.calcInvoice(i).paid, 0);
    const totalDue = cInvs.reduce((s,i) => s + Utils.calcInvoice(i).balance, 0);
    const deposits = cInvs.filter(i => i.type==='rent' && !i.depositRefunded && i.returnStatus!=='returned')
                          .reduce((s,i) => s + Utils.num(i.deposit), 0);
    const rentals  = cInvs.filter(i => i.type==='rent').length;
    const sales    = cInvs.filter(i => i.type==='sale').length;

    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">Customer Profile</span>
          <div class="flex-gap-sm">
            <button class="btn-wa btn btn-sm" onclick="WhatsApp.openForCustomer('${c.id}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Message
            </button>
            <button class="btn btn-primary btn-sm" onclick="navigate('billing')">New Bill</button>
          </div>
        </div>
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
            <div class="avatar avatar-lg">${Utils.initials(c.name)}</div>
            <div>
              <div style="font-family:var(--font-display);font-size:17px;font-weight:500">${c.name}</div>
              <div style="font-size:12px;color:var(--ink-mid)">+91 ${c.mobile}</div>
              ${c.address ? `<div style="font-size:11px;color:var(--ink-light)">${c.address}</div>` : ''}
            </div>
          </div>

          <div class="three-col" style="margin-bottom:18px">
            <div class="stat-card stat-gold" style="padding:10px 12px">
              <div class="stat-label" style="font-size:10px">Rentals</div>
              <div class="stat-value" style="font-size:20px">${rentals}</div>
            </div>
            <div class="stat-card stat-rose" style="padding:10px 12px">
              <div class="stat-label" style="font-size:10px">Sales</div>
              <div class="stat-value" style="font-size:20px">${sales}</div>
            </div>
            <div class="stat-card stat-green" style="padding:10px 12px">
              <div class="stat-label" style="font-size:10px">Total Spent</div>
              <div class="stat-value" style="font-size:17px">${Utils.inr(totalPaid)}</div>
            </div>
          </div>

          ${totalDue > 0 ? `<div class="alert alert-danger">Outstanding balance: ${Utils.inr(totalDue)}</div>` : ''}
          ${deposits > 0 ? `<div class="alert alert-warn">Deposit held: ${Utils.inr(deposits)}</div>` : ''}

          <div style="font-size:11px;font-weight:500;color:var(--ink-mid);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">Booking History</div>
          ${cInvs.slice(0,6).map(i => `
            <div onclick="InvoiceModal.open('${i.id}')" style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);cursor:pointer;align-items:center">
              <div>
                <div style="font-size:12.5px;font-weight:500">${i.number}</div>
                <div style="font-size:11px;color:var(--ink-mid)">${i.outfitName||i.outfitCode||'—'} · ${Utils.fmtDateShort(i.createdAt)}</div>
              </div>
              <div style="text-align:right">
                ${Utils.statusBadge(Utils.invoiceStatus(i))}
                <div style="font-size:11px;color:var(--ink-mid);margin-top:3px">${Utils.inr(Utils.calcInvoice(i).total)}</div>
              </div>
            </div>`).join('')}
          ${cInvs.length === 0 ? '<div class="empty-state" style="padding:20px"><p>No bookings yet</p></div>' : ''}
        </div>
      </div>`;
  }

  function select(id) {
    selected = id;
    const invoices = Store.getInvoices();
    const cust     = Store.getCustomer(id);
    Utils.setHTML('cust-detail-panel', renderDetail(cust, invoices));
    // Re-highlight row
    document.querySelectorAll('#cust-list tr').forEach(tr => {
      tr.style.background = '';
    });
  }

  function doSearch(q) {
    const all  = Store.getCustomers();
    const inv  = Store.getInvoices();
    const filtered = q
      ? all.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.mobile.includes(q))
      : all;
    Utils.setHTML('cust-list', filtered.map(c => renderRow(c, inv)).join(''));
  }

  return { render, select, doSearch };
})();


/* ═══════════════════════════════════════════
   INVENTORY.JS
═══════════════════════════════════════════ */
const Inventory = (() => {

  function render() {
    const items = Store.getInventory();
    const el    = document.getElementById('page-inventory');
    const avail = items.filter(i=>i.status==='available').length;
    const rented= items.filter(i=>i.status==='rented').length;
    const sold  = items.filter(i=>i.status==='sold').length;

    el.innerHTML = `
      <div class="page-header">
        <div><div class="page-title">Inventory</div><div class="page-subtitle">Outfit catalog & availability</div></div>
        <div class="page-actions">
          <div class="search-bar" style="width:200px">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg>
            <input placeholder="Search code or name..." oninput="Inventory.doSearch(this.value)">
          </div>
          <select class="form-input" style="width:130px" onchange="Inventory.doFilter(this.value)">
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="sold">Sold</option>
          </select>
          <button class="btn btn-secondary btn-sm" onclick="Store.exportCSV('inventory')">↓ CSV</button>
          <button class="btn btn-primary" onclick="Inventory.openForm()">+ Add Outfit</button>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card stat-green"><div class="stat-label">Available</div><div class="stat-value">${avail}</div></div>
        <div class="stat-card stat-rose"><div class="stat-label">Rented Out</div><div class="stat-value">${rented}</div></div>
        <div class="stat-card stat-ink"><div class="stat-label">Sold</div><div class="stat-value">${sold}</div></div>
        <div class="stat-card stat-gold"><div class="stat-label">Total Items</div><div class="stat-value">${items.length}</div></div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">All Outfits</span>
          <div class="flex-gap-sm">
            <span class="badge badge-gold" style="cursor:pointer" onclick="Inventory.catFilter('')">All</span>
            <span class="badge badge-gray" style="cursor:pointer" onclick="Inventory.catFilter('Lehenga')">Lehenga</span>
            <span class="badge badge-gray" style="cursor:pointer" onclick="Inventory.catFilter('Indo-Western')">Indo-Western</span>
          </div>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Code</th><th>Name</th><th>Category</th><th>Size</th><th>Type</th><th>Rent Price</th><th>Sale Price</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody id="inv-table">
              ${items.map(renderRow).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderRow(item) {
    const typeBadge = item.type === 'rent' ? '<span class="badge badge-blue">Rent</span>'
                    : item.type === 'sale' ? '<span class="badge badge-rose">Sale</span>'
                    : '<span class="badge badge-gold">Both</span>';
    return `
      <tr>
        <td style="font-weight:500;color:var(--gold-dark)">${item.code}</td>
        <td style="font-weight:500">${item.name}</td>
        <td>${item.category}</td>
        <td>${item.size}</td>
        <td>${typeBadge}</td>
        <td>${item.rentPrice ? Utils.inr(item.rentPrice) : '—'}</td>
        <td>${item.salePrice ? Utils.inr(item.salePrice) : '—'}</td>
        <td>${Utils.statusBadge(item.status)}</td>
        <td>
          <div class="flex-gap-sm">
            <button class="btn btn-secondary btn-sm" onclick="Inventory.openForm('${item.id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="Inventory.remove('${item.id}')">Del</button>
          </div>
        </td>
      </tr>`;
  }

  function openForm(id) {
    const item = id ? Store.getInventoryItem(id) : null;
    const t = item || {};
    Utils.openModal('confirm-modal', `
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">${item ? 'Edit Outfit' : 'Add New Outfit'}</div>
          <button class="modal-close" onclick="Utils.closeModal('confirm-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-grid form-grid-2" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Outfit Code *</label>
              <input class="form-input" id="of-code" value="${t.code||''}" placeholder="e.g. L-022"></div>
            <div class="form-group"><label class="form-label">Name *</label>
              <input class="form-input" id="of-name" value="${t.name||''}" placeholder="Bridal Lehenga Set"></div>
          </div>
          <div class="form-grid form-grid-3" style="margin-bottom:14px">
            <div class="form-group"><label class="form-label">Category</label>
              <select class="form-input" id="of-cat">
                ${CATEGORIES.map(c=>`<option ${t.category===c?'selected':''}>${c}</option>`).join('')}
              </select></div>
            <div class="form-group"><label class="form-label">Type</label>
              <select class="form-input" id="of-type">
                <option value="rent" ${t.type==='rent'?'selected':''}>Rent Only</option>
                <option value="sale" ${t.type==='sale'?'selected':''}>Sale Only</option>
                <option value="both" ${t.type==='both'?'selected':''}>Both</option>
              </select></div>
            <div class="form-group"><label class="form-label">Size</label>
              <select class="form-input" id="of-size">
                ${SIZES.map(s=>`<option ${t.size===s?'selected':''}>${s}</option>`).join('')}
              </select></div>
          </div>
          <div class="form-grid form-grid-2">
            <div class="form-group"><label class="form-label">Rent Price (₹)</label>
              <input class="form-input" id="of-rent" type="number" value="${t.rentPrice||''}" placeholder="0"></div>
            <div class="form-group"><label class="form-label">Sale Price (₹)</label>
              <input class="form-input" id="of-sale" type="number" value="${t.salePrice||''}" placeholder="0"></div>
          </div>
          ${item ? `
          <div class="form-group" style="margin-top:14px"><label class="form-label">Status</label>
            <select class="form-input" id="of-status">
              <option value="available" ${t.status==='available'?'selected':''}>Available</option>
              <option value="rented" ${t.status==='rented'?'selected':''}>Rented</option>
              <option value="sold" ${t.status==='sold'?'selected':''}>Sold</option>
            </select></div>` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="Utils.closeModal('confirm-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="Inventory.save('${id||''}')">
            ${item ? 'Save Changes' : 'Add to Inventory'}
          </button>
        </div>
      </div>`);
  }

  function save(id) {
    const code = Utils.sanitize(Utils.val('of-code'));
    const name = Utils.sanitize(Utils.val('of-name'));
    if (!code || !name) { Utils.toast('Code and name are required', 'error'); return; }

    const item = {
      id:        id || Store.genId('IV'),
      code, name,
      category:  Utils.val('of-cat'),
      type:      Utils.val('of-type'),
      size:      Utils.val('of-size'),
      rentPrice: Utils.num(Utils.val('of-rent')) || null,
      salePrice: Utils.num(Utils.val('of-sale')) || null,
      status:    id ? (Utils.val('of-status') || 'available') : 'available',
    };
    Store.saveInventoryItem(item);
    Utils.closeModal('confirm-modal');
    Utils.toast(`✓ ${name} ${id?'updated':'added'}`, 'success');
    render();
  }

  function remove(id) {
    Utils.confirm('Delete this outfit from inventory?', () => {
      Store.deleteInventoryItem(id);
      Utils.toast('Outfit removed', 'success');
      render();
    });
  }

  function doSearch(q) {
    const all = Store.getInventory();
    const filtered = q ? all.filter(i =>
      i.code.toLowerCase().includes(q.toLowerCase()) ||
      i.name.toLowerCase().includes(q.toLowerCase())
    ) : all;
    Utils.setHTML('inv-table', filtered.map(renderRow).join(''));
  }

  function doFilter(status) {
    const all = Store.getInventory();
    const filtered = status ? all.filter(i => i.status === status) : all;
    Utils.setHTML('inv-table', filtered.map(renderRow).join(''));
  }

  function catFilter(cat) {
    const all = Store.getInventory();
    const filtered = cat ? all.filter(i => i.category === cat) : all;
    Utils.setHTML('inv-table', filtered.map(renderRow).join(''));
  }

  return { render, openForm, save, remove, doSearch, doFilter, catFilter };
})();


/* ═══════════════════════════════════════════
   PAYMENTS.JS
═══════════════════════════════════════════ */
const Payments = (() => {
  function render() {
    const invoices = Store.getInvoices();
    const payments = Store.getPayments();
    const el = document.getElementById('page-payments');

    const pending  = invoices.filter(i => Utils.calcInvoice(i).balance > 0);
    const totalDue = pending.reduce((s,i) => s + Utils.calcInvoice(i).balance, 0);
    const deposits = invoices.filter(i => i.type==='rent' && !i.depositRefunded && i.returnStatus !== 'returned' && Utils.num(i.deposit) > 0);
    const totalDep = deposits.reduce((s,i) => s + Utils.num(i.deposit), 0);

    el.innerHTML = `
      <div class="page-header">
        <div><div class="page-title">Payments</div><div class="page-subtitle">Track advances, balances & deposits</div></div>
        <button class="btn btn-primary" onclick="Payments.openRecordModal()">+ Record Payment</button>
      </div>

      <div class="stat-grid">
        <div class="stat-card stat-gold"><div class="stat-label">Total Collected</div>
          <div class="stat-value">${Utils.inr(payments.reduce((s,p)=>s+p.amount,0))}</div></div>
        <div class="stat-card stat-rose"><div class="stat-label">Pending Dues</div>
          <div class="stat-value">${Utils.inr(totalDue)}</div><div class="stat-sub">${pending.length} invoices</div></div>
        <div class="stat-card stat-ink"><div class="stat-label">Deposits Held</div>
          <div class="stat-value">${Utils.inr(totalDep)}</div><div class="stat-sub">${deposits.length} rentals</div></div>
        <div class="stat-card stat-green"><div class="stat-label">Today's Collection</div>
          <div class="stat-value">${Utils.inr(payments.filter(p=>p.date===Utils.today()).reduce((s,p)=>s+p.amount,0))}</div></div>
      </div>

      <div class="two-col">
        <div>
          <div class="card">
            <div class="card-header"><span class="card-title">Pending Payments</span>
              <span class="badge badge-red">${Utils.inr(totalDue)} due</span>
            </div>
            <div class="table-scroll">
              <table>
                <thead><tr><th>Invoice</th><th>Customer</th><th>Total</th><th>Paid</th><th>Balance</th><th></th></tr></thead>
                <tbody>
                  ${pending.map(i => {
                    const c = Utils.calcInvoice(i);
                    return `<tr>
                      <td style="font-weight:500;color:var(--gold-dark)">${i.number}</td>
                      <td>${i.customerName}</td>
                      <td>${Utils.inr(c.total)}</td>
                      <td style="color:var(--success)">${Utils.inr(c.paid)}</td>
                      <td style="color:var(--danger);font-weight:500">${Utils.inr(c.balance)}</td>
                      <td><button class="btn btn-primary btn-sm" onclick="InvoiceModal.recordPayment('${i.id}')">Pay</button></td>
                    </tr>`;
                  }).join('') || '<tr><td colspan="6"><div class="empty-state"><p>No pending payments</p></div></td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="card-header"><span class="card-title">Deposit Refund Tracker</span>
              <span class="badge badge-gold">${Utils.inr(totalDep)} held</span>
            </div>
            <div class="card-body" style="padding:8px 18px">
              ${deposits.map(i => `
                <div class="pending-item">
                  <div>
                    <div class="pending-item-title">${i.customerName}</div>
                    <div class="pending-item-sub">${i.number} · ${Utils.returnStatus(i)}</div>
                  </div>
                  <div style="text-align:right">
                    <div style="font-weight:500">${Utils.inr(i.deposit)}</div>
                    <div class="flex-gap-sm" style="margin-top:6px;justify-content:flex-end">
                      <button class="btn btn-success btn-sm" onclick="Payments.refundDeposit('${i.id}',true)">Refund</button>
                      <button class="btn btn-danger btn-sm" onclick="Payments.refundDeposit('${i.id}',false)">Hold</button>
                    </div>
                  </div>
                </div>`).join('')}
              ${deposits.length === 0 ? '<div class="empty-state"><p>No pending deposit refunds</p></div>' : ''}
            </div>
          </div>

          <div class="card">
            <div class="card-header"><span class="card-title">Recent Payments</span></div>
            <div class="table-scroll">
              <table>
                <thead><tr><th>Date</th><th>Invoice</th><th>Customer</th><th>Mode</th><th>Amount</th></tr></thead>
                <tbody>
                  ${payments.slice().reverse().slice(0,8).map(p => `
                    <tr>
                      <td>${Utils.fmtDateShort(p.date)}</td>
                      <td style="color:var(--gold-dark)">${p.invoiceNumber}</td>
                      <td>${p.customerName}</td>
                      <td>${Utils.modeBadge(p.mode)}</td>
                      <td style="color:var(--success);font-weight:500">${Utils.inr(p.amount)}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function refundDeposit(invId, refund) {
    const inv = Store.getInvoice(invId);
    if (!inv) return;
    inv.depositRefunded = refund;
    if (refund) { inv.returnStatus = 'returned'; inv.returnedAt = Utils.today(); }
    Store.saveInvoice(inv);
    Utils.toast(refund ? '✓ Deposit refunded' : '✓ Deposit held / deducted', 'success');
    render();
  }

  function openRecordModal() {
    const invoices = Store.getInvoices().filter(i => Utils.calcInvoice(i).balance > 0);
    Utils.openModal('confirm-modal', `
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Record Payment</div>
          <button class="modal-close" onclick="Utils.closeModal('confirm-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Invoice</label>
            <select class="form-input" id="rp-inv" onchange="Payments.fillBalance(this.value)">
              <option value="">Select invoice...</option>
              ${invoices.map(i => `<option value="${i.id}">${i.number} · ${i.customerName} · Balance: ${Utils.inr(Utils.calcInvoice(i).balance)}</option>`).join('')}
            </select>
          </div>
          <div class="form-grid form-grid-2">
            <div class="form-group"><label class="form-label">Amount (₹)</label>
              <input class="form-input" id="rp-amount" type="number" placeholder="0"></div>
            <div class="form-group"><label class="form-label">Mode</label>
              <select class="form-input" id="rp-mode">
                ${PAYMENT_MODES.map(m=>`<option value="${m.value}">${m.label}</option>`).join('')}
              </select></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="Utils.closeModal('confirm-modal')">Cancel</button>
          <button class="btn btn-primary" onclick="Payments.saveRecord()">Save Payment</button>
        </div>
      </div>`);
  }

  function fillBalance(invId) {
    const inv = Store.getInvoice(invId);
    if (inv) Utils.setVal('rp-amount', Utils.calcInvoice(inv).balance);
  }

  function saveRecord() {
    const invId  = Utils.val('rp-inv');
    const amount = Utils.num(Utils.val('rp-amount'));
    const mode   = Utils.val('rp-mode');
    if (!invId)  { Utils.toast('Select an invoice', 'error'); return; }
    if (!amount) { Utils.toast('Enter amount', 'error'); return; }
    const inv = Store.getInvoice(invId);
    if (!inv) return;
    inv.amountPaid = (inv.amountPaid||0) + amount;
    inv.status = Utils.invoiceStatus(inv);
    Store.saveInvoice(inv);
    Store.savePayment({ id: Store.genId('P'), invoiceId: invId, invoiceNumber: inv.number,
      customerName: inv.customerName, amount, mode, date: Utils.today(), note: 'Payment' });
    Utils.closeModal('confirm-modal');
    Utils.toast(`✓ ${Utils.inr(amount)} recorded`, 'success');
    render();
  }

  return { render, refundDeposit, openRecordModal, fillBalance, saveRecord };
})();


/* ═══════════════════════════════════════════
   REPORTS.JS
═══════════════════════════════════════════ */
const Reports = (() => {
  function render() {
    const invoices = Store.getInvoices();
    const payments = Store.getPayments();
    const el = document.getElementById('page-reports');

    const thisMonth = Utils.today().slice(0,7);
    const mInvs = invoices.filter(i => i.createdAt.startsWith(thisMonth));
    const mRev  = mInvs.reduce((s,i) => s + Utils.calcInvoice(i).paid, 0);
    const mRent = mInvs.filter(i=>i.type==='rent').reduce((s,i) => s + Utils.num(i.rentAmount), 0);
    const mSale = mInvs.filter(i=>i.type==='sale').reduce((s,i) => s + Utils.calcInvoice(i).total, 0);
    const avgBill = mInvs.length ? Math.round(mRev / mInvs.length) : 0;

    const overdue = invoices.filter(i => Utils.returnStatus(i) === 'overdue').length;
    const totalDue= invoices.reduce((s,i) => s + Utils.calcInvoice(i).balance, 0);
    const deposits= invoices.filter(i => i.type==='rent' && !i.depositRefunded && i.returnStatus!=='returned')
                            .reduce((s,i) => s + Utils.num(i.deposit), 0);

    const cashTotal = payments.filter(p=>p.mode==='cash').reduce((s,p)=>s+p.amount,0);
    const upiTotal  = payments.filter(p=>p.mode==='upi').reduce((s,p)=>s+p.amount,0);
    const bankTotal = payments.filter(p=>p.mode==='bank').reduce((s,p)=>s+p.amount,0);
    const totalPay  = cashTotal + upiTotal + bankTotal || 1;

    const studio = Store.getStudio();

    el.innerHTML = `
      <div class="page-header">
        <div><div class="page-title">Reports</div><div class="page-subtitle">Business analytics & exports</div></div>
        <div class="page-actions">
          <select class="form-input" style="width:130px">
            <option>This Month</option><option>Last Month</option><option>This Year</option>
          </select>
          <button class="btn btn-secondary" onclick="Store.exportCSV('invoices')">↓ CSV</button>
          <button class="btn btn-secondary" onclick="Store.exportAll()">↓ Backup</button>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card stat-gold"><div class="stat-label">Total Revenue</div>
          <div class="stat-value">${Utils.inr(mRev)}</div>
          <div class="stat-sub">${mInvs.length} transactions</div></div>
        <div class="stat-card stat-blue" style="border-left:3px solid var(--info)"><div class="stat-label">Rental Income</div>
          <div class="stat-value">${Utils.inr(mRent)}</div></div>
        <div class="stat-card stat-rose"><div class="stat-label">Sales Income</div>
          <div class="stat-value">${Utils.inr(mSale)}</div></div>
        <div class="stat-card stat-green"><div class="stat-label">Avg. Bill Value</div>
          <div class="stat-value">${Utils.inr(avgBill)}</div></div>
      </div>

      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Monthly Revenue Trend</span></div>
          <div class="card-body"><div class="chart-wrap chart-wrap-lg"><canvas id="monthChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Rental vs Sale Breakdown</span></div>
          <div class="card-body"><div class="chart-wrap chart-wrap-lg"><canvas id="splitChart"></canvas></div></div>
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Pending Summary</span></div>
          <div class="card-body" style="padding:10px 18px">
            <div class="pending-item"><div>Overdue returns</div><span class="badge badge-red">${overdue} items</span></div>
            <div class="pending-item"><div>Pending payments</div><span class="badge badge-gold">${Utils.inr(totalDue)}</span></div>
            <div class="pending-item"><div>Deposits held</div><span class="badge badge-blue">${Utils.inr(deposits)}</span></div>
            <div class="pending-item"><div style="border-bottom:none">Active rentals</div>
              <span class="badge badge-green">${invoices.filter(i=>i.type==='rent'&&i.returnStatus!=='returned').length}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Payment Mode Split</span></div>
          <div class="card-body">
            <div class="flex-gap" style="margin-bottom:12px;flex-wrap:wrap">
              <span style="display:flex;align-items:center;gap:5px;font-size:12px">
                <span style="width:10px;height:10px;border-radius:2px;background:var(--gold);display:inline-block"></span>
                Cash ${Math.round(cashTotal/totalPay*100)}%</span>
              <span style="display:flex;align-items:center;gap:5px;font-size:12px">
                <span style="width:10px;height:10px;border-radius:2px;background:var(--info);display:inline-block"></span>
                UPI ${Math.round(upiTotal/totalPay*100)}%</span>
              <span style="display:flex;align-items:center;gap:5px;font-size:12px">
                <span style="width:10px;height:10px;border-radius:2px;background:var(--success);display:inline-block"></span>
                Bank ${Math.round(bankTotal/totalPay*100)}%</span>
            </div>
            <div class="chart-wrap"><canvas id="payChart"></canvas></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">GST Settings</span>
          <span class="badge ${studio.gstEnabled ? 'badge-green' : 'badge-gray'}">${studio.gstEnabled ? 'Enabled' : 'Disabled'}</span>
        </div>
        <div class="card-body">
          <div class="alert alert-info" style="margin-bottom:14px">
            ${studio.gstEnabled ? 'GST is enabled. GSTIN will appear on all invoices.' : 'GST is disabled. Enable below to add GSTIN and tax breakdown to invoices.'}
          </div>
          <div class="form-grid form-grid-2" style="margin-bottom:14px;${!studio.gstEnabled?'opacity:0.45;pointer-events:none':''}">
            <div class="form-group"><label class="form-label">GSTIN</label>
              <input class="form-input" id="gst-in" value="${studio.gstin||''}" placeholder="22AAAAA0000A1Z5"></div>
            <div class="form-group"><label class="form-label">GST Rate</label>
              <select class="form-input" id="gst-rate">
                <option value="5" ${studio.gstRate==5?'selected':''}>5%</option>
                <option value="12" ${studio.gstRate==12?'selected':''}>12%</option>
                <option value="18" ${studio.gstRate==18?'selected':''}>18%</option>
              </select></div>
          </div>
          <div class="flex-gap">
            <button class="btn btn-secondary" onclick="Reports.toggleGST()">
              ${studio.gstEnabled ? 'Disable GST' : 'Enable GST'}
            </button>
            ${studio.gstEnabled ? '<button class="btn btn-primary" onclick="Reports.saveGST()">Save GST Settings</button>' : ''}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => Charts.initReports(invoices, Store.getPayments()), 100);
  }

  function toggleGST() {
    const studio = Store.getStudio();
    studio.gstEnabled = !studio.gstEnabled;
    Store.saveStudio(studio);
    Utils.toast(`GST ${studio.gstEnabled ? 'enabled' : 'disabled'}`, 'success');
    render();
  }

  function saveGST() {
    const studio = Store.getStudio();
    studio.gstin   = Utils.val('gst-in');
    studio.gstRate = Utils.num(Utils.val('gst-rate'));
    Store.saveStudio(studio);
    Utils.toast('GST settings saved', 'success');
    render();
  }

  return { render, toggleGST, saveGST };
})();
