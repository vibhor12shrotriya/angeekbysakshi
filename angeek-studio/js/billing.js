/* ═══════════════════════════════════════════
   BILLING.JS — New bill creation
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */

const Billing = (() => {
  let billType = 'rent';

  function render() {
    const el = document.getElementById('page-billing');
    const nextNum = Store.getNextInvNum();
    const invNum  = Store.formatInvNumber(nextNum);
    const today   = Utils.today();

    el.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div class="page-title">New Bill</div>
          <div class="page-subtitle">Invoice ${invNum} · ${Utils.fmtDate(today)}</div>
        </div>
        <div class="page-actions">
          <div class="type-toggle">
            <button class="type-btn rent active" id="rentBtn" onclick="Billing.setType('rent')">Rental</button>
            <button class="type-btn sale" id="saleBtn" onclick="Billing.setType('sale')">Sale</button>
          </div>
          <button class="btn btn-secondary" onclick="Billing.reset()">Reset</button>
          <button class="btn btn-primary" onclick="Billing.generate()">Generate Invoice</button>
        </div>
      </div>

      <div class="col-left-wide">
        <!-- ── LEFT: Form ── -->
        <div>
          <!-- Customer -->
          <div class="form-section">
            <div class="form-section-title">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
              Customer Details
            </div>
            <div class="form-grid form-grid-2" style="margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">Customer Name <span class="form-required">*</span></label>
                <input class="form-input" id="b-name" placeholder="Full name" oninput="Billing.calc()" autocomplete="off">
              </div>
              <div class="form-group">
                <label class="form-label">Mobile <span class="form-required">*</span></label>
                <input class="form-input" id="b-mobile" placeholder="10-digit number" maxlength="10"
                  oninput="Billing.lookupCustomer()" autocomplete="off">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Address / Notes</label>
              <input class="form-input" id="b-address" placeholder="Optional address">
            </div>
            <div id="b-returning-alert" style="display:none;margin-top:10px"></div>
          </div>

          <!-- Item -->
          <div class="form-section">
            <div class="form-section-title">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>
              Item Details
            </div>
            <div class="form-grid form-grid-2" style="margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">Outfit Code <span class="form-required">*</span></label>
                <input class="form-input" id="b-code" placeholder="e.g. L-022"
                  oninput="Billing.lookupOutfit()" autocomplete="off">
              </div>
              <div class="form-group">
                <label class="form-label">Item Name</label>
                <input class="form-input" id="b-item" placeholder="Auto-fills from code" oninput="Billing.calc()">
              </div>
            </div>
            <div class="form-grid form-grid-3">
              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-input" id="b-category">
                  ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Size</label>
                <input class="form-input" id="b-size" placeholder="S / M / L / XL">
              </div>
              <div class="form-group">
                <label class="form-label">Qty</label>
                <input class="form-input" id="b-qty" type="number" value="1" min="1" oninput="Billing.calc()">
              </div>
            </div>
          </div>

          <!-- Rental fields -->
          <div class="form-section" id="rent-fields">
            <div class="form-section-title">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>
              Rental Details
            </div>
            <div class="form-grid form-grid-2" style="margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">Rent Amount (₹) <span class="form-required">*</span></label>
                <input class="form-input" id="b-rent" type="number" placeholder="0" oninput="Billing.calc()">
              </div>
              <div class="form-group">
                <label class="form-label">Security Deposit (₹)</label>
                <input class="form-input" id="b-deposit" type="number" placeholder="0" oninput="Billing.calc()">
              </div>
            </div>
            <div class="form-grid form-grid-2" style="margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">Rent From</label>
                <input class="form-input" id="b-from" type="date" oninput="Billing.calc()">
              </div>
              <div class="form-group">
                <label class="form-label">Return Date</label>
                <input class="form-input" id="b-to" type="date" oninput="Billing.calc()">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Late Fee per Day (₹)</label>
              <input class="form-input" id="b-latefee" type="number" placeholder="0">
              <span class="form-hint">Charged if outfit returned after due date</span>
            </div>
          </div>

          <!-- Sale fields -->
          <div class="form-section" id="sale-fields" style="display:none">
            <div class="form-section-title">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/></svg>
              Sale Details
            </div>
            <div class="form-grid form-grid-2" style="margin-bottom:12px">
              <div class="form-group">
                <label class="form-label">Sale Price (₹) <span class="form-required">*</span></label>
                <input class="form-input" id="b-price" type="number" placeholder="0" oninput="Billing.calc()">
              </div>
              <div class="form-group">
                <label class="form-label">Discount</label>
                <div class="flex-gap">
                  <input class="form-input" id="b-disc" type="number" placeholder="0" oninput="Billing.calc()" style="flex:1">
                  <select class="form-input" id="b-disc-type" onchange="Billing.calc()" style="width:65px">
                    <option value="flat">₹</option>
                    <option value="pct">%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment -->
          <div class="form-section">
            <div class="form-section-title">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/></svg>
              Payment
            </div>
            <div class="form-grid form-grid-3">
              <div class="form-group">
                <label class="form-label">Payment Mode</label>
                <select class="form-input" id="b-paymode">
                  ${PAYMENT_MODES.map(m => `<option value="${m.value}">${m.label}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid (₹)</label>
                <input class="form-input" id="b-paid" type="number" placeholder="0" oninput="Billing.calc()">
              </div>
              <div class="form-group">
                <label class="form-label">Balance Due</label>
                <input class="form-input readonly" id="b-balance" readonly style="color:var(--danger);font-weight:500">
              </div>
            </div>
            <div class="form-group" style="margin-top:12px">
              <label class="form-label">Additional Notes</label>
              <textarea class="form-input" id="b-notes" rows="2" placeholder="Special instructions, alterations, pickup notes..."></textarea>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Live Preview ── -->
        <div class="sticky-preview">
          <div class="card">
            <div class="card-header">
              <span class="card-title">Invoice Preview</span>
              <span class="badge badge-gold" id="prev-invnum">${invNum}</span>
            </div>
            <div class="card-body" style="padding:14px">
              <div class="invoice-preview" id="inv-preview">
                ${renderPreview()}
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary flex-1" style="justify-content:center" onclick="Billing.generate()">
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Set default dates
    Utils.setVal('b-from', Utils.today());
    Utils.setVal('b-to', Utils.addDays(Utils.today(), 7));

    billType = 'rent';
  }

  function renderPreview() {
    const studio = Store.getStudio();
    return `
      <div class="invoice-header">
        <div class="invoice-brand">
          <h2>${studio.name}</h2>
          <p>${studio.tagline}</p>
          <p style="margin-top:3px;font-size:10px;color:var(--ink-mid)">📍 ${studio.address} · ${studio.phone}</p>
        </div>
        <div class="invoice-num">
          <div class="num" id="inv-num">${Store.formatInvNumber(Store.getNextInvNum())}</div>
          <div class="date">${Utils.fmtDate(Utils.today())}</div>
          <div style="margin-top:5px"><span class="badge badge-blue" id="inv-type-badge">Rental</span></div>
        </div>
      </div>
      <div class="invoice-section">
        <h4>Bill To</h4>
        <div style="font-size:13px;font-weight:500" id="inv-cust-name">—</div>
        <div style="font-size:11.5px;color:var(--ink-mid)" id="inv-cust-mobile">—</div>
      </div>
      <div class="invoice-section">
        <h4>Items</h4>
        <table class="invoice-table">
          <thead><tr><th>Item</th><th>Code</th><th style="text-align:right">Amount</th></tr></thead>
          <tbody>
            <tr id="inv-item-row">
              <td>—</td><td>—</td><td style="text-align:right">—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="inv-rental-note" style="background:var(--gold-light);border-radius:6px;padding:8px 10px;font-size:11px;color:var(--gold-dark);margin-bottom:14px">
        Rental period: <span id="inv-dates">—</span><br>
        Security deposit: <span id="inv-dep-display">₹0</span> (refundable on return)
      </div>
      <div class="invoice-totals">
        <div class="total-row"><span id="inv-row1-label">Rent Amount</span><span id="inv-row1-val">₹0</span></div>
        <div class="total-row" id="inv-dep-row"><span>Security Deposit</span><span id="inv-dep-val">₹0</span></div>
        <div class="total-row" id="inv-disc-row" style="display:none"><span>Discount</span><span id="inv-disc-val" style="color:var(--success)">-₹0</span></div>
        <div class="total-row grand"><span>Total</span><span id="inv-total">₹0</span></div>
        <div class="total-row"><span>Paid</span><span id="inv-paid" style="color:var(--success)">₹0</span></div>
        <div class="total-row"><span style="color:var(--danger)">Balance</span><span id="inv-bal" style="color:var(--danger)">₹0</span></div>
      </div>
      <div class="invoice-footer">${Store.getStudio().returnPolicy}</div>
    `;
  }

  function setType(t) {
    billType = t;
    const rentBtn = Utils.el('rentBtn');
    const saleBtn = Utils.el('saleBtn');
    if (rentBtn) { rentBtn.classList.toggle('active', t==='rent'); }
    if (saleBtn) { saleBtn.classList.toggle('active', t==='sale'); }

    const rentFields = Utils.el('rent-fields');
    const saleFields = Utils.el('sale-fields');
    if (rentFields) rentFields.style.display = t==='rent' ? 'block' : 'none';
    if (saleFields) saleFields.style.display = t==='sale' ? 'block' : 'none';

    const badge = Utils.el('inv-type-badge');
    if (badge) {
      badge.textContent = t==='rent' ? 'Rental' : 'Sale';
      badge.className   = 'badge ' + (t==='rent' ? 'badge-blue' : 'badge-rose');
    }

    const note    = Utils.el('inv-rental-note');
    const depRow  = Utils.el('inv-dep-row');
    const r1label = Utils.el('inv-row1-label');
    if (note)    note.style.display   = t==='rent' ? 'block' : 'none';
    if (depRow)  depRow.style.display = t==='rent' ? 'flex'  : 'none';
    if (r1label) r1label.textContent  = t==='rent' ? 'Rent Amount' : 'Sale Price';

    calc();
  }

  function calc() {
    const name   = Utils.val('b-name');
    const mobile = Utils.val('b-mobile');
    const code   = Utils.val('b-code');
    const item   = Utils.val('b-item');

    // Update customer in preview
    const custName = Utils.el('inv-cust-name');
    const custMob  = Utils.el('inv-cust-mobile');
    if (custName) custName.textContent = name || '—';
    if (custMob)  custMob.textContent  = mobile ? '+91 ' + mobile : '—';

    if (billType === 'rent') {
      const rent    = Utils.num(Utils.val('b-rent'));
      const deposit = Utils.num(Utils.val('b-deposit'));
      const paid    = Utils.num(Utils.val('b-paid'));
      const total   = rent + deposit;
      const balance = Math.max(0, total - paid);
      const from    = Utils.val('b-from');
      const to      = Utils.val('b-to');

      set('inv-row1-val',    Utils.inr(rent));
      set('inv-dep-val',     Utils.inr(deposit));
      set('inv-dep-display', Utils.inr(deposit));
      set('inv-total',       Utils.inr(total));
      set('inv-paid',        Utils.inr(paid));
      set('inv-bal',         Utils.inr(balance));
      set('b-balance',       balance > 0 ? Utils.inr(balance) : '₹0', true);
      set('inv-dates',       (from && to) ? `${Utils.fmtDate(from)} — ${Utils.fmtDate(to)}` : '—');

      const row = Utils.el('inv-item-row');
      if (row) row.innerHTML = `<td>${item||'—'}</td><td>${code||'—'}</td><td style="text-align:right">${Utils.inr(rent)}</td>`;

    } else {
      const price    = Utils.num(Utils.val('b-price'));
      const disc     = Utils.num(Utils.val('b-disc'));
      const discType = Utils.val('b-disc-type');
      const paid     = Utils.num(Utils.val('b-paid'));
      const discAmt  = discType === 'pct' ? Math.round(price * disc / 100) : disc;
      const total    = price - discAmt;
      const balance  = Math.max(0, total - paid);

      set('inv-row1-val',  Utils.inr(price));
      set('inv-total',     Utils.inr(total));
      set('inv-paid',      Utils.inr(paid));
      set('inv-bal',       Utils.inr(balance));
      set('b-balance',     balance > 0 ? Utils.inr(balance) : '₹0', true);

      const discRow = Utils.el('inv-disc-row');
      if (discRow) discRow.style.display = discAmt > 0 ? 'flex' : 'none';
      set('inv-disc-val', `-${Utils.inr(discAmt)}`);

      const row = Utils.el('inv-item-row');
      if (row) row.innerHTML = `<td>${item||'—'}</td><td>${code||'—'}</td><td style="text-align:right">${Utils.inr(price)}</td>`;
    }
  }

  // Helper to set text or value
  function set(id, v, isInput=false) {
    const el = Utils.el(id);
    if (!el) return;
    if (isInput) el.value = v; else el.textContent = v;
  }

  function lookupCustomer() {
    const mobile = Utils.cleanMobile(Utils.val('b-mobile'));
    const alertEl = Utils.el('b-returning-alert');
    if (!alertEl) return;

    if (mobile.length === 10) {
      const cust = Store.getCustomerByMobile(mobile);
      if (cust) {
        // Auto-fill name
        Utils.setVal('b-name', cust.name);
        Utils.setVal('b-address', cust.address || '');
        const orders = Store.getInvoices().filter(i => i.customerId === cust.id).length;
        alertEl.style.display = 'block';
        alertEl.innerHTML = `<div class="alert alert-success" style="margin:0">✓ Returning customer found · ${orders} previous order${orders!==1?'s':''}</div>`;
        calc();
      } else {
        alertEl.style.display = 'none';
      }
    } else {
      alertEl.style.display = 'none';
    }
  }

  function lookupOutfit() {
    const code = Utils.val('b-code').trim();
    if (!code) return;
    const outfit = Store.getInventoryByCode(code);
    if (outfit) {
      Utils.setVal('b-item', outfit.name);
      Utils.setVal('b-size', outfit.size);
      const catEl = Utils.el('b-category');
      if (catEl) catEl.value = outfit.category;
      // Auto-fill price
      if (billType === 'rent' && outfit.rentPrice) Utils.setVal('b-rent', outfit.rentPrice);
      if (billType === 'sale' && outfit.salePrice)  Utils.setVal('b-price', outfit.salePrice);
      Utils.toast(`✓ Outfit found: ${outfit.name}`, 'success');
      calc();
    }
  }

  function reset() {
    render();
  }

  function generate() {
    const name   = Utils.sanitize(Utils.val('b-name'));
    const mobile = Utils.cleanMobile(Utils.val('b-mobile'));
    const code   = Utils.sanitize(Utils.val('b-code'));

    if (!name)   { Utils.toast('Please enter customer name', 'error'); return; }
    if (!mobile) { Utils.toast('Please enter mobile number', 'error'); return; }
    if (billType === 'rent' && !Utils.val('b-rent')) { Utils.toast('Please enter rent amount', 'error'); return; }
    if (billType === 'sale' && !Utils.val('b-price')) { Utils.toast('Please enter sale price', 'error'); return; }

    // Upsert customer
    let customer = Store.getCustomerByMobile(mobile);
    if (!customer) {
      customer = {
        id:      Store.genId('C'),
        name, mobile,
        address: Utils.sanitize(Utils.val('b-address')),
        since:   Utils.today(),
      };
      Store.saveCustomer(customer);
    }

    // Build invoice
    const invId  = Store.genId('I');
    const invNum = Store.formatInvNumber(Store.bumpInvNum());

    const inv = {
      id:             invId,
      number:         invNum,
      type:           billType,
      customerId:     customer.id,
      customerName:   customer.name,
      customerMobile: customer.mobile,
      outfitCode:     code || Utils.sanitize(Utils.val('b-item')),
      outfitName:     Utils.sanitize(Utils.val('b-item')),
      inventoryId:    null,
      rentAmount:     billType === 'rent' ? Utils.num(Utils.val('b-rent'))    : null,
      deposit:        billType === 'rent' ? Utils.num(Utils.val('b-deposit')) : 0,
      lateFeePerDay:  billType === 'rent' ? Utils.num(Utils.val('b-latefee')): 0,
      salePrice:      billType === 'sale' ? Utils.num(Utils.val('b-price'))   : null,
      discount:       billType === 'sale' ? Utils.num(Utils.val('b-disc'))    : 0,
      discountType:   billType === 'sale' ? (Utils.val('b-disc-type')||'flat'): 'flat',
      rentFrom:       billType === 'rent' ? Utils.val('b-from') : null,
      rentTo:         billType === 'rent' ? Utils.val('b-to')   : null,
      paymentMode:    Utils.val('b-paymode') || 'cash',
      amountPaid:     Utils.num(Utils.val('b-paid')),
      depositRefunded:false,
      returnStatus:   billType === 'rent' ? 'active' : 'na',
      status:         Utils.invoiceStatus({
        type:       billType,
        rentAmount: Utils.num(Utils.val('b-rent')),
        deposit:    Utils.num(Utils.val('b-deposit')),
        salePrice:  Utils.num(Utils.val('b-price')),
        discount:   Utils.num(Utils.val('b-disc')),
        discountType: Utils.val('b-disc-type') || 'flat',
        amountPaid: Utils.num(Utils.val('b-paid')),
      }),
      createdAt:      Utils.today(),
      notes:          Utils.sanitize(Utils.val('b-notes')),
    };

    // Update inventory status if code matched
    if (code) {
      const outfit = Store.getInventoryByCode(code);
      if (outfit) {
        inv.inventoryId = outfit.id;
        outfit.status = billType === 'rent' ? 'rented' : 'sold';
        Store.saveInventoryItem(outfit);
      }
    }

    Store.saveInvoice(inv);

    // Record payment if paid amount > 0
    if (inv.amountPaid > 0) {
      Store.savePayment({
        id:            Store.genId('P'),
        invoiceId:     invId,
        invoiceNumber: invNum,
        customerName:  customer.name,
        amount:        inv.amountPaid,
        mode:          inv.paymentMode,
        date:          Utils.today(),
        note:          inv.amountPaid >= Utils.calcInvoice(inv).total ? 'Full payment' : 'Advance',
      });
    }

    Utils.toast(`✓ Invoice ${invNum} generated!`, 'success');

    // Show success modal with actions
    Utils.openModal('invoice-modal', `
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Invoice Generated ✦</div>
          <button class="modal-close" onclick="Utils.closeModal('invoice-modal')">✕</button>
        </div>
        <div class="modal-body" style="text-align:center;padding:28px">
          <div style="font-size:44px;margin-bottom:12px">✓</div>
          <div style="font-family:var(--font-display);font-size:20px;margin-bottom:6px">Invoice ${invNum}</div>
          <div style="font-size:13px;color:var(--ink-mid);margin-bottom:24px">
            Created for ${customer.name} · ${Utils.inr(Utils.calcInvoice(inv).total)}
          </div>
          <div class="flex-wrap" style="justify-content:center;gap:10px">
            <button class="btn btn-secondary" onclick="Utils.closeModal('invoice-modal');InvoiceModal.open('${invId}')">View Invoice</button>
            <button class="btn-wa btn" onclick="Utils.closeModal('invoice-modal');WhatsApp.open('${invId}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send WhatsApp
            </button>
            <button class="btn btn-primary" onclick="Utils.closeModal('invoice-modal');navigate('billing')">New Bill</button>
          </div>
        </div>
      </div>
    `);
  }

  return { render, setType, calc, lookupCustomer, lookupOutfit, reset, generate };
})();
