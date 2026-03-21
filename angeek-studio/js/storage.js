/* ═══════════════════════════════════════════
   STORAGE.JS — localStorage persistence layer
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */

const Store = (() => {
  const KEYS = {
    invoices:  'abs_invoices',
    customers: 'abs_customers',
    inventory: 'abs_inventory',
    payments:  'abs_payments',
    studio:    'abs_studio',
    invNum:    'abs_invoice_num',
  };

  function get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Store.get error:', e);
      return null;
    }
  }

  function set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Store.set error:', e);
      return false;
    }
  }

  // ── Seed on first load ──
  function init() {
    if (!get(KEYS.customers)) set(KEYS.customers, SEED_CUSTOMERS);
    if (!get(KEYS.inventory))  set(KEYS.inventory,  SEED_INVENTORY);
    if (!get(KEYS.invoices))   set(KEYS.invoices,   SEED_INVOICES);
    if (!get(KEYS.payments))   set(KEYS.payments,   SEED_PAYMENTS);
    if (!get(KEYS.studio))     set(KEYS.studio,     STUDIO);
    if (!get(KEYS.invNum))     set(KEYS.invNum,     STUDIO.nextInvoiceNum);
  }

  // ── Invoices ──
  function getInvoices()  { return get(KEYS.invoices)  || []; }
  function getInvoice(id) { return getInvoices().find(i => i.id === id) || null; }
  function saveInvoice(inv) {
    const list = getInvoices();
    const idx  = list.findIndex(i => i.id === inv.id);
    if (idx >= 0) list[idx] = inv; else list.unshift(inv);
    set(KEYS.invoices, list);
  }
  function deleteInvoice(id) {
    set(KEYS.invoices, getInvoices().filter(i => i.id !== id));
  }

  // ── Customers ──
  function getCustomers()    { return get(KEYS.customers) || []; }
  function getCustomer(id)   { return getCustomers().find(c => c.id === id) || null; }
  function getCustomerByMobile(mobile) {
    return getCustomers().find(c => c.mobile === mobile.replace(/\D/g,'')) || null;
  }
  function saveCustomer(cust) {
    const list = getCustomers();
    const idx  = list.findIndex(c => c.id === cust.id);
    if (idx >= 0) list[idx] = cust; else list.push(cust);
    set(KEYS.customers, list);
  }

  // ── Inventory ──
  function getInventory()     { return get(KEYS.inventory) || []; }
  function getInventoryItem(id) { return getInventory().find(i => i.id === id) || null; }
  function getInventoryByCode(code) {
    return getInventory().find(i => i.code.toLowerCase() === code.toLowerCase()) || null;
  }
  function saveInventoryItem(item) {
    const list = getInventory();
    const idx  = list.findIndex(i => i.id === item.id);
    if (idx >= 0) list[idx] = item; else list.push(item);
    set(KEYS.inventory, list);
  }
  function deleteInventoryItem(id) {
    set(KEYS.inventory, getInventory().filter(i => i.id !== id));
  }

  // ── Payments ──
  function getPayments()          { return get(KEYS.payments) || []; }
  function getPaymentsForInvoice(invoiceId) {
    return getPayments().filter(p => p.invoiceId === invoiceId);
  }
  function savePayment(pmt) {
    const list = getPayments();
    const idx  = list.findIndex(p => p.id === pmt.id);
    if (idx >= 0) list[idx] = pmt; else list.push(pmt);
    set(KEYS.payments, list);
  }

  // ── Studio config ──
  function getStudio()       { return get(KEYS.studio) || STUDIO; }
  function saveStudio(cfg)   { set(KEYS.studio, cfg); }

  // ── Invoice number ──
  function getNextInvNum()   { return get(KEYS.invNum) || 45; }
  function bumpInvNum() {
    const n = getNextInvNum() + 1;
    set(KEYS.invNum, n);
    return n - 1;
  }
  function formatInvNumber(n) {
    const studio = getStudio();
    return `${studio.invoicePrefix}-${studio.invoiceYear}-${String(n).padStart(3,'0')}`;
  }

  // ── Export / backup ──
  function exportAll() {
    const data = {
      exportDate: new Date().toISOString(),
      studio:     getStudio(),
      invoices:   getInvoices(),
      customers:  getCustomers(),
      inventory:  getInventory(),
      payments:   getPayments(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `angeek-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importBackup(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (data.invoices)  set(KEYS.invoices,  data.invoices);
      if (data.customers) set(KEYS.customers, data.customers);
      if (data.inventory) set(KEYS.inventory, data.inventory);
      if (data.payments)  set(KEYS.payments,  data.payments);
      if (data.studio)    set(KEYS.studio,    data.studio);
      return true;
    } catch (e) {
      return false;
    }
  }

  function exportCSV(type) {
    let rows = [], headers = [], filename = '';
    if (type === 'invoices') {
      headers = ['Invoice#','Type','Customer','Mobile','Item','Code','Total','Paid','Balance','Status','Date'];
      rows    = getInvoices().map(i => {
        const total   = i.type==='rent' ? (i.rentAmount||0)+(i.deposit||0) : calcSaleTotal(i);
        const balance = Math.max(0, total - (i.amountPaid||0));
        return [i.number,i.type,i.customerName,i.customerMobile,i.outfitName,i.outfitCode,total,i.amountPaid||0,balance,i.status,i.createdAt];
      });
      filename = 'invoices';
    } else if (type === 'customers') {
      headers = ['Name','Mobile','Address','Since'];
      const invoices = getInvoices();
      rows = getCustomers().map(c => {
        return [c.name, c.mobile, c.address||'', c.since];
      });
      filename = 'customers';
    } else if (type === 'inventory') {
      headers = ['Code','Name','Category','Type','Size','Rent Price','Sale Price','Status'];
      rows = getInventory().map(i => [i.code,i.name,i.category,i.type,i.size,i.rentPrice||'',i.salePrice||'',i.status]);
      filename = 'inventory';
    }
    const csv  = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `angeek-${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function calcSaleTotal(inv) {
    const price    = inv.salePrice || 0;
    const discAmt  = inv.discountType === 'pct' ? Math.round(price * inv.discount / 100) : (inv.discount || 0);
    return price - discAmt;
  }

  // ── ID generator ──
  function genId(prefix) {
    return prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase();
  }

  return {
    init,
    // invoices
    getInvoices, getInvoice, saveInvoice, deleteInvoice,
    // customers
    getCustomers, getCustomer, getCustomerByMobile, saveCustomer,
    // inventory
    getInventory, getInventoryItem, getInventoryByCode, saveInventoryItem, deleteInventoryItem,
    // payments
    getPayments, getPaymentsForInvoice, savePayment,
    // studio
    getStudio, saveStudio,
    // invoice nums
    getNextInvNum, bumpInvNum, formatInvNumber,
    // io
    exportAll, importBackup, exportCSV,
    // util
    genId, calcSaleTotal,
  };
})();
