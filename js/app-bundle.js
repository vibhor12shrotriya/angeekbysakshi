/* ═══════════════════════════════════════════
   DATA.JS — Seed data and constants
   Angeek By Sakshi · Studio Billing System
   In production: replace with API/DB calls
═══════════════════════════════════════════ */

const STUDIO = {
  name:    'Angeek By Sakshi',
  tagline: 'Premium Lehenga & Indo-Western Collection',
  address: 'Udaipur, Rajasthan',
  phone:   '+91 91169 63601',
  email:   'angeekbysakshi@gmail.com',
  invoicePrefix: 'INV',
  invoiceYear:   '2026',
  nextInvoiceNum: 45,
  gstEnabled: true,
  gstin:    '',
  gstRate:  12,
  returnPolicy: 'Items must be returned by the agreed date in original condition. Late returns will incur the late fee specified in the invoice. Security deposit is refundable after satisfactory inspection of the returned outfit.'
};

// ── Seed inventory ──────────────────────────
const SEED_INVENTORY = [
  { id:'I001', code:'L-022', name:'Bridal Lehenga Set',      category:'Lehenga',      type:'both', size:'M',  rentPrice:8000,  salePrice:75000, status:'rented' },
  { id:'I002', code:'L-015', name:'Designer Lehenga',        category:'Lehenga',      type:'rent', size:'S',  rentPrice:6000,  salePrice:null,  status:'rented' },
  { id:'I003', code:'IW-07', name:'Anarkali Suit Set',       category:'Indo-Western', type:'sale', size:'L',  rentPrice:null,  salePrice:45000, status:'sold'   },
  { id:'I004', code:'L-031', name:'Heavy Bridal Lehenga',    category:'Lehenga',      type:'both', size:'XL', rentPrice:10000, salePrice:90000, status:'available' },
  { id:'I005', code:'IW-12', name:'Embroidered Sharara',     category:'Indo-Western', type:'both', size:'M',  rentPrice:5000,  salePrice:32000, status:'available' },
  { id:'I006', code:'L-009', name:'Pastel Lehenga Choli',    category:'Lehenga',      type:'rent', size:'S',  rentPrice:4500,  salePrice:null,  status:'available' },
  { id:'I007', code:'L-041', name:'Mint Georgette Lehenga',  category:'Lehenga',      type:'both', size:'M',  rentPrice:3800,  salePrice:28000, status:'available' },
  { id:'I008', code:'IW-18', name:'Navy Palazzo Set',        category:'Indo-Western', type:'rent', size:'L',  rentPrice:3200,  salePrice:null,  status:'available' },
  { id:'I009', code:'L-055', name:'Teal Silk Lehenga',       category:'Lehenga',      type:'both', size:'XL', rentPrice:7000,  salePrice:55000, status:'available' },
  { id:'I010', code:'IW-23', name:'Cream Sharara Set',       category:'Indo-Western', type:'sale', size:'S',  rentPrice:null,  salePrice:22000, status:'available' },
];

// ── Seed customers ──────────────────────────
const SEED_CUSTOMERS = [
  { id:'C001', name:'Priya Sharma',  mobile:'9876543210', address:'Sector 14, Gurugram', since:'2024-01-15' },
  { id:'C002', name:'Anjali Mehta',  mobile:'9823456789', address:'DLF Phase 2, Gurugram', since:'2024-03-20' },
  { id:'C003', name:'Simran Kaur',   mobile:'9123478901', address:'Sushant Lok, Gurugram', since:'2025-02-10' },
  { id:'C004', name:'Pooja Verma',   mobile:'9087654321', address:'Palam Vihar, Gurugram', since:'2023-12-05' },
  { id:'C005', name:'Nita Bhatia',   mobile:'9765432109', address:'South City, Gurugram', since:'2024-06-18' },
  { id:'C006', name:'Divya Nair',    mobile:'9654321098', address:'Sohna Road, Gurugram', since:'2024-09-02' },
  { id:'C007', name:'Reena Gupta',   mobile:'9543210987', address:'MG Road, Gurugram',    since:'2025-01-25' },
];

// ── Seed invoices ───────────────────────────
const SEED_INVOICES = [
  {
    id:'INV001', number:'INV-2025-044', type:'rent',
    customerId:'C003', customerName:'Simran Kaur', customerMobile:'9123478901',
    outfitCode:'L-022', outfitName:'Bridal Lehenga Set', inventoryId:'I001',
    rentAmount:8000, deposit:10000, lateFeePerDay:300,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-21', rentTo:'2025-03-28',
    paymentMode:'cash', amountPaid:12000, depositRefunded:false,
    status:'partial', returnStatus:'active',
    createdAt:'2025-03-21', notes:'Handle with care — dupatta is heavy'
  },
  {
    id:'INV002', number:'INV-2025-043', type:'sale',
    customerId:'C004', customerName:'Pooja Verma', customerMobile:'9087654321',
    outfitCode:'IW-07', outfitName:'Anarkali Suit Set', inventoryId:'I003',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:45000, discount:2000, discountType:'flat',
    rentFrom:null, rentTo:null,
    paymentMode:'upi', amountPaid:43000, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-20', notes:''
  },
  {
    id:'INV003', number:'INV-2025-042', type:'rent',
    customerId:'C001', customerName:'Priya Sharma', customerMobile:'9876543210',
    outfitCode:'L-015', outfitName:'Designer Lehenga', inventoryId:'I002',
    rentAmount:6000, deposit:8000, lateFeePerDay:200,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-15', rentTo:'2025-03-19',
    paymentMode:'cash', amountPaid:14000, depositRefunded:false,
    status:'paid', returnStatus:'overdue',
    createdAt:'2025-03-15', notes:''
  },
  {
    id:'INV004', number:'INV-2025-041', type:'rent',
    customerId:'C002', customerName:'Anjali Mehta', customerMobile:'9823456789',
    outfitCode:'IW-18', outfitName:'Navy Palazzo Set', inventoryId:'I008',
    rentAmount:4000, deposit:6000, lateFeePerDay:150,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-18', rentTo:'2025-03-21',
    paymentMode:'cash', amountPaid:10000, depositRefunded:false,
    status:'paid', returnStatus:'due-today',
    createdAt:'2025-03-18', notes:''
  },
  {
    id:'INV005', number:'INV-2025-040', type:'sale',
    customerId:'C005', customerName:'Nita Bhatia', customerMobile:'9765432109',
    outfitCode:'L-031', outfitName:'Heavy Bridal Lehenga', inventoryId:'I004',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:38000, discount:5, discountType:'pct',
    rentFrom:null, rentTo:null,
    paymentMode:'bank', amountPaid:36100, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-17', notes:'Alteration done — waist size adjusted'
  },
  {
    id:'INV006', number:'INV-2025-039', type:'sale',
    customerId:'C006', customerName:'Divya Nair', customerMobile:'9654321098',
    outfitCode:'IW-12', outfitName:'Embroidered Sharara', inventoryId:'I005',
    rentAmount:null, deposit:0, lateFeePerDay:0,
    salePrice:28500, discount:0, discountType:'flat',
    rentFrom:null, rentTo:null,
    paymentMode:'upi', amountPaid:28500, depositRefunded:false,
    status:'paid', returnStatus:'na',
    createdAt:'2025-03-15', notes:''
  },
  {
    id:'INV007', number:'INV-2025-037', type:'rent',
    customerId:'C007', customerName:'Reena Gupta', customerMobile:'9543210987',
    outfitCode:'L-055', outfitName:'Teal Silk Lehenga', inventoryId:'I009',
    rentAmount:7000, deposit:12000, lateFeePerDay:250,
    salePrice:null, discount:0, discountType:'flat',
    rentFrom:'2025-03-24', rentTo:'2025-03-28',
    paymentMode:'upi', amountPaid:7000, depositRefunded:false,
    status:'partial', returnStatus:'upcoming',
    createdAt:'2025-03-14', notes:''
  },
];

// ── Seed payments ───────────────────────────
const SEED_PAYMENTS = [
  { id:'P001', invoiceId:'INV001', invoiceNumber:'INV-2025-044', customerName:'Simran Kaur',  amount:12000, mode:'cash', date:'2025-03-21', note:'Advance paid' },
  { id:'P002', invoiceId:'INV002', invoiceNumber:'INV-2025-043', customerName:'Pooja Verma',  amount:43000, mode:'upi',  date:'2025-03-20', note:'Full payment' },
  { id:'P003', invoiceId:'INV003', invoiceNumber:'INV-2025-042', customerName:'Priya Sharma', amount:14000, mode:'cash', date:'2025-03-15', note:'' },
  { id:'P004', invoiceId:'INV004', invoiceNumber:'INV-2025-041', customerName:'Anjali Mehta', amount:10000, mode:'cash', date:'2025-03-18', note:'' },
  { id:'P005', invoiceId:'INV005', invoiceNumber:'INV-2025-040', customerName:'Nita Bhatia',  amount:36100, mode:'bank', date:'2025-03-17', note:'Bank NEFT' },
  { id:'P006', invoiceId:'INV006', invoiceNumber:'INV-2025-039', customerName:'Divya Nair',   amount:28500, mode:'upi',  date:'2025-03-15', note:'' },
  { id:'P007', invoiceId:'INV007', invoiceNumber:'INV-2025-037', customerName:'Reena Gupta',  amount:7000,  mode:'upi',  date:'2025-03-14', note:'Advance' },
];

// ── Payment modes ───────────────────────────
const PAYMENT_MODES = [
  { value:'cash', label:'Cash' },
  { value:'upi',  label:'UPI' },
  { value:'bank', label:'Bank Transfer' },
  { value:'mixed',label:'Mixed' },
];

// ── Category / type options ──────────────────
const CATEGORIES = ['Lehenga', 'Indo-Western', 'Other'];
const ITEM_TYPES  = ['rent', 'sale', 'both'];
const SIZES       = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];
/* ═══════════════════════════════════════════
   UTILS.JS — Helpers, formatting, validation
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */

const Utils = (() => {

  // ── Number formatting ──
  function inr(n) {
    if (n === null || n === undefined) return '—';
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  function num(n) {
    return Number(n) || 0;
  }

  // ── Date formatting ──
  function fmtDate(str) {
    if (!str) return '—';
    const d = new Date(str);
    return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  }

  function fmtDateShort(str) {
    if (!str) return '—';
    const d = new Date(str);
    return d.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
  }

  function fmtDateInput(d) {
    if (!d) return '';
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().split('T')[0];
  }

  function today() { return fmtDateInput(new Date()); }

  function addDays(str, n) {
    const d = new Date(str);
    d.setDate(d.getDate() + n);
    return fmtDateInput(d);
  }

  function daysDiff(fromStr, toStr) {
    const a = new Date(fromStr);
    const b = new Date(toStr || today());
    return Math.floor((b - a) / 86400000);
  }

  function isOverdue(returnDate) {
    if (!returnDate) return false;
    return daysDiff(returnDate, today()) > 0;
  }

  function daysOverdue(returnDate) {
    return Math.max(0, daysDiff(returnDate, today()));
  }

  function returnStatus(inv) {
    if (inv.type !== 'rent') return 'na';
    if (inv.returnStatus === 'returned') return 'returned';
    if (!inv.rentTo) return 'active';
    const diff = daysDiff(inv.rentTo, today());
    if (diff > 0) return 'overdue';
    if (diff === 0) return 'due-today';
    if (diff >= -3) return 'upcoming';
    return 'active';
  }

  // ── Invoice calculations ──
  function calcInvoice(inv) {
    if (inv.type === 'rent') {
      const rent    = num(inv.rentAmount);
      const deposit = num(inv.deposit);
      const total   = rent + deposit;
      const paid    = num(inv.amountPaid);
      const balance = Math.max(0, total - paid);
      return { rent, deposit, subtotal: rent, discount: 0, total, paid, balance };
    } else {
      const price    = num(inv.salePrice);
      const disc     = num(inv.discount);
      const discAmt  = inv.discountType === 'pct' ? Math.round(price * disc / 100) : disc;
      const total    = price - discAmt;
      const paid     = num(inv.amountPaid);
      const balance  = Math.max(0, total - paid);
      return { price, discAmt, discount: discAmt, subtotal: price, total, paid, balance };
    }
  }

  function invoiceStatus(inv) {
    const { total, paid, balance } = calcInvoice(inv);
    if (balance === 0) return 'paid';
    if (paid > 0)      return 'partial';
    return 'pending';
  }

  // ── String ──
  function initials(name) {
    if (!name) return '??';
    return name.split(' ').filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join('');
  }

  function sanitize(str) {
    return (str || '').trim();
  }

  function toSlug(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  // ── Validation ──
  function validateMobile(m) {
    return /^[6-9]\d{9}$/.test(m.replace(/\D/g,''));
  }

  function cleanMobile(m) {
    return m.replace(/\D/g,'').slice(-10);
  }

  // ── Toast ──
  let toastTimer;
  function toast(msg, type = '') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className   = 'show' + (type ? ' toast-' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  }

  // ── Modal helpers ──
  function openModal(id, html) {
    const el = document.getElementById(id);
    if (!el) return;
    if (html !== undefined) el.innerHTML = html;
    el.style.display = 'flex';
    // close on backdrop click
    el.onclick = (e) => { if (e.target === el) closeModal(id); };
    // close on Escape
    document._escHandler = (e) => { if (e.key === 'Escape') closeModal(id); };
    document.addEventListener('keydown', document._escHandler);
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
    document.removeEventListener('keydown', document._escHandler);
  }

  // ── Confirm dialog ──
  function confirm(msg, onYes) {
    openModal('confirm-modal', `
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Confirm Action</div>
          <button class="modal-close" onclick="Utils.closeModal('confirm-modal')">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:13.5px;color:var(--ink-mid);line-height:1.6">${msg}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="Utils.closeModal('confirm-modal')">Cancel</button>
          <button class="btn btn-danger" onclick="Utils.closeModal('confirm-modal');(${onYes.toString()})()">Confirm</button>
        </div>
      </div>
    `);
  }

  // ── DOM helpers ──
  function el(id)  { return document.getElementById(id); }
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel){ return document.querySelectorAll(sel); }

  function setHTML(id, html) {
    const e = el(id);
    if (e) e.innerHTML = html;
  }

  function val(id) {
    const e = el(id);
    return e ? e.value : '';
  }

  function setVal(id, v) {
    const e = el(id);
    if (e) e.value = v;
  }

  // ── Status badge helper ──
  function statusBadge(status) {
    const map = {
      paid:      '<span class="badge badge-green">Paid</span>',
      partial:   '<span class="badge badge-gold">Partial</span>',
      pending:   '<span class="badge badge-red">Pending</span>',
      overdue:   '<span class="badge badge-red">Overdue</span>',
      'due-today': '<span class="badge badge-gold">Due Today</span>',
      upcoming:  '<span class="badge badge-blue">Upcoming</span>',
      active:    '<span class="badge badge-blue">Active</span>',
      returned:  '<span class="badge badge-green">Returned</span>',
      available: '<span class="badge badge-green">Available</span>',
      rented:    '<span class="badge badge-rose">Rented</span>',
      sold:      '<span class="badge badge-gray">Sold</span>',
      na:        '',
    };
    return map[status] || `<span class="badge badge-gray">${status}</span>`;
  }

  // ── Payment mode badge ──
  function modeBadge(mode) {
    const map = {
      cash:  '<span class="badge badge-gold">Cash</span>',
      upi:   '<span class="badge badge-blue">UPI</span>',
      bank:  '<span class="badge badge-green">Bank</span>',
      mixed: '<span class="badge badge-gray">Mixed</span>',
    };
    return map[mode] || `<span class="badge badge-gray">${mode}</span>`;
  }

  return {
    inr, num, fmtDate, fmtDateShort, fmtDateInput, today, addDays, daysDiff,
    isOverdue, daysOverdue, returnStatus, calcInvoice, invoiceStatus,
    initials, sanitize, toSlug, validateMobile, cleanMobile,
    toast, openModal, closeModal, confirm,
    el, qs, qsa, setHTML, val, setVal,
    statusBadge, modeBadge,
  };
})();
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
/* ═══════════════════════════════════════════
   CHARTS.JS — Chart.js wrappers
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */
const Charts = (() => {
  const charts = {};

  function destroy(id) {
    if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  }

  function initDashboard(invoices) {
    // Last 7 days revenue bar chart
    const today = new Date();
    const labels = [], data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const rev = invoices
        .filter(inv => inv.createdAt === ds)
        .reduce((s,inv) => s + Utils.calcInvoice(inv).paid, 0);
      labels.push(d.toLocaleDateString('en-IN', { day:'numeric', month:'short' }));
      data.push(rev);
    }

    const revCanvas = document.getElementById('revChart');
    if (revCanvas) {
      destroy('rev');
      charts['rev'] = new Chart(revCanvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label:'Revenue', data, backgroundColor:'rgba(201,168,76,0.75)', borderRadius:4 }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{
            y:{ ticks:{ callback:v=>'₹'+(v/1000)+'K', font:{size:10} }, grid:{color:'rgba(180,140,60,0.1)'} },
            x:{ ticks:{ font:{size:10} } }
          }
        }
      });
    }

    // Pie: Rent vs Sale
    const rentCount = invoices.filter(i=>i.type==='rent').length;
    const saleCount = invoices.filter(i=>i.type==='sale').length;
    const pieCanvas = document.getElementById('pieChart');
    if (pieCanvas) {
      destroy('pie');
      charts['pie'] = new Chart(pieCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Rental','Sale'],
          datasets: [{ data:[rentCount,saleCount], backgroundColor:['#2850A0','#C97B84'], borderWidth:0 }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:12 } } },
          cutout:'65%'
        }
      });
    }
  }

  function initReports(invoices, payments) {
    // Monthly trend (last 6 months)
    const months = [], totalData = [], rentData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key   = d.toISOString().slice(0,7);
      const label = d.toLocaleDateString('en-IN', { month:'short' });
      const mInvs = invoices.filter(inv => inv.createdAt.startsWith(key));
      months.push(label);
      totalData.push(mInvs.reduce((s,inv) => s + Utils.calcInvoice(inv).paid, 0));
      rentData.push(mInvs.filter(i=>i.type==='rent').reduce((s,i) => s + Utils.num(i.rentAmount), 0));
    }

    const mc = document.getElementById('monthChart');
    if (mc) {
      destroy('month');
      charts['month'] = new Chart(mc, {
        type:'line',
        data:{ labels:months, datasets:[
          { label:'Total', data:totalData, borderColor:'#C9A84C', backgroundColor:'rgba(201,168,76,0.08)', tension:0.4, fill:true, pointRadius:3 },
          { label:'Rental', data:rentData, borderColor:'#2850A0', backgroundColor:'transparent', tension:0.4, pointRadius:3 }
        ]},
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ position:'bottom', labels:{font:{size:11}} } },
          scales:{ y:{ ticks:{ callback:v=>'₹'+(v/1000)+'K', font:{size:10} } }, x:{ ticks:{font:{size:10}} } }
        }
      });
    }

    // Rental vs Sale stacked bar
    const rentRevData = months.map((_,i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5-i));
      const key = d.toISOString().slice(0,7);
      return invoices.filter(inv=>inv.createdAt.startsWith(key)&&inv.type==='rent')
                     .reduce((s,inv)=>s+Utils.num(inv.rentAmount),0);
    });
    const saleRevData = months.map((_,i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5-i));
      const key = d.toISOString().slice(0,7);
      return invoices.filter(inv=>inv.createdAt.startsWith(key)&&inv.type==='sale')
                     .reduce((s,inv)=>s+Utils.calcInvoice(inv).total,0);
    });

    const sc = document.getElementById('splitChart');
    if (sc) {
      destroy('split');
      charts['split'] = new Chart(sc, {
        type:'bar',
        data:{ labels:months, datasets:[
          { label:'Rental', data:rentRevData, backgroundColor:'rgba(40,80,160,0.75)', borderRadius:3 },
          { label:'Sale',   data:saleRevData, backgroundColor:'rgba(201,120,132,0.75)', borderRadius:3 }
        ]},
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ position:'bottom', labels:{font:{size:11}} } },
          scales:{ x:{ stacked:true, ticks:{font:{size:10}} }, y:{ stacked:true, ticks:{callback:v=>'₹'+(v/1000)+'K',font:{size:10}} } }
        }
      });
    }

    // Payment mode bar
    const cashAmt  = payments.filter(p=>p.mode==='cash').reduce((s,p)=>s+p.amount,0);
    const upiAmt   = payments.filter(p=>p.mode==='upi').reduce((s,p)=>s+p.amount,0);
    const bankAmt  = payments.filter(p=>p.mode==='bank').reduce((s,p)=>s+p.amount,0);
    const total    = cashAmt + upiAmt + bankAmt || 1;

    const pc = document.getElementById('payChart');
    if (pc) {
      destroy('pay');
      charts['pay'] = new Chart(pc, {
        type:'bar',
        data:{
          labels:['Cash','UPI','Bank Transfer'],
          datasets:[{ data:[
            Math.round(cashAmt/total*100),
            Math.round(upiAmt/total*100),
            Math.round(bankAmt/total*100)
          ], backgroundColor:['#C9A84C','#2850A0','#2D7A4F'], borderRadius:5 }]
        },
        options:{ responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{ y:{ ticks:{ callback:v=>v+'%', font:{size:10} } }, x:{ ticks:{font:{size:11}} } }
        }
      });
    }
  }

  return { initDashboard, initReports };
})();


/* ═══════════════════════════════════════════
   WHATSAPP.JS — Click-to-chat (no API)
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */
const WhatsApp = (() => {

  function buildUrl(phone, message) {
    const clean = phone.replace(/\D/g,'').slice(-10);
    return `https://wa.me/91${clean}?text=${encodeURIComponent(message)}`;
  }

  function open(invId) {
    const inv    = Store.getInvoice(invId);
    if (!inv) return;
    const studio  = Store.getStudio();
    const { total, paid, balance } = Utils.calcInvoice(inv);
    const retStat = Utils.returnStatus(inv);

    let msg;
    if (retStat === 'overdue') {
      const days    = Utils.daysOverdue(inv.rentTo);
      const lateFee = days * Utils.num(inv.lateFeePerDay);
      msg = `Dear ${inv.customerName},

This is a gentle reminder from *${studio.name}* 🌸

Your rented outfit (${inv.outfitCode} – ${inv.outfitName}) was due for return on *${Utils.fmtDate(inv.rentTo)}*.

It is now *${days} day${days!==1?'s':''} overdue.*
Late charges: ${Utils.inr(lateFee)} (${Utils.inr(inv.lateFeePerDay)}/day)
Deposit held: ${Utils.inr(inv.deposit)}

Please return the outfit at your earliest convenience.

Thank you 🙏
${studio.name}`;
    } else {
      msg = `Dear ${inv.customerName},

Thank you for choosing *${studio.name}* ✨

*Invoice: ${inv.number}*
Item: ${inv.outfitName}
${inv.type === 'rent' ? `Rental: ${Utils.fmtDate(inv.rentFrom)} → ${Utils.fmtDate(inv.rentTo)}\nSecurity Deposit: ${Utils.inr(inv.deposit)}\n` : ''}
Total: *${Utils.inr(total)}*
Paid: ${Utils.inr(paid)}
${balance > 0 ? `*Balance Due: ${Utils.inr(balance)}*` : '✓ Fully paid'}

${studio.phone}`;
    }

    const waUrl = buildUrl(inv.customerMobile, msg);

    Utils.openModal('whatsapp-modal', `
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Send via WhatsApp</div>
          <button class="modal-close" onclick="Utils.closeModal('whatsapp-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:#E8F8EC;border-radius:8px;padding:14px;margin-bottom:14px;font-size:12.5px;line-height:1.7;white-space:pre-wrap;color:#1A3520">
${msg}
          </div>
          <div class="alert alert-info" style="margin:0">
            Clicking the button opens WhatsApp with this pre-filled message. You send it manually.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="Utils.closeModal('whatsapp-modal')">Cancel</button>
          <a href="${waUrl}" target="_blank" rel="noopener" onclick="Utils.closeModal('whatsapp-modal')" class="btn-wa btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Open WhatsApp →
          </a>
        </div>
      </div>
    `);
  }

  function openForCustomer(customerId) {
    const c = Store.getCustomer(customerId);
    if (!c) return;
    const msg = `Dear ${c.name},\n\nThis is ${Store.getStudio().name}. We wanted to reach out regarding your recent booking.\n\nPlease feel free to contact us for any queries.\n\n${Store.getStudio().phone}`;
    const url = buildUrl(c.mobile, msg);
    window.open(url, '_blank');
  }

  return { open, openForCustomer };
})();


/* ═══════════════════════════════════════════
   PDF.JS — Print / PDF generation
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */
const PDF = (() => {

  function print(invId) {
    const inv    = Store.getInvoice(invId);
    if (!inv) return;
    const studio  = Store.getStudio();
    const { rent, deposit, price, discAmt, total, paid, balance } = Utils.calcInvoice(inv);
    const retStat = Utils.returnStatus(inv);
    const daysLate= Utils.daysOverdue(inv.rentTo);
    const lateFee = daysLate * Utils.num(inv.lateFeePerDay);

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${inv.number} – ${studio.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:'DM Sans',sans-serif; font-size:12px; color:#2C2118; padding:32px; max-width:640px; margin:0 auto; }
    h1,h2,h3 { font-family:'Playfair Display',serif; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:14px; border-bottom:2px solid #C9A84C; margin-bottom:20px; }
    .brand h2 { color:#8B6914; font-size:20px; }
    .brand p { font-size:10px; color:#5C4D3C; margin-top:2px; }
    .inv-num { text-align:right; }
    .inv-num .num { font-family:'Playfair Display',serif; font-size:16px; font-weight:500; }
    .inv-num .date { font-size:10px; color:#5C4D3C; }
    .badge { background:#EEF4FF; color:#2850A0; padding:2px 8px; border-radius:20px; font-size:10px; font-weight:500; }
    .badge.sale { background:#F5E8EA; color:#8B3A44; }
    section { margin-bottom:16px; }
    section h4 { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:#8B6914; margin-bottom:6px; font-family:'DM Sans',sans-serif; }
    table { width:100%; border-collapse:collapse; }
    th { background:#F5EDD5; font-size:10px; padding:7px 10px; text-align:left; }
    td { padding:7px 10px; border-bottom:1px solid rgba(180,140,60,0.12); font-size:11.5px; }
    .rental-box { background:#F5EDD5; border-radius:6px; padding:8px 10px; font-size:10.5px; color:#8B6914; margin-bottom:14px; }
    .totals { width:220px; margin-left:auto; margin-top:12px; }
    .total-row { display:flex; justify-content:space-between; padding:4px 0; font-size:12px; color:#5C4D3C; }
    .grand { border-top:1px solid #C9A84C; padding-top:8px; margin-top:4px; font-size:14px; font-weight:500; color:#2C2118; }
    .footer { margin-top:20px; padding-top:12px; border-top:1px solid rgba(180,140,60,0.2); font-size:10px; color:#9B8A78; line-height:1.6; }
    @media print { body { padding:16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <h2>${studio.name}</h2>
      <p>${studio.tagline}</p>
      <p style="margin-top:2px">📍 ${studio.address} · ${studio.phone}</p>
    </div>
    <div class="inv-num">
      <div class="num">${inv.number}</div>
      <div class="date">${Utils.fmtDate(inv.createdAt)}</div>
      <div style="margin-top:4px"><span class="badge ${inv.type==='sale'?'sale':''}">${inv.type==='rent'?'Rental':'Sale'}</span></div>
    </div>
  </div>

  <section>
    <h4>Bill To</h4>
    <div style="font-size:13px;font-weight:500">${inv.customerName}</div>
    <div style="font-size:11px;color:#5C4D3C">+91 ${inv.customerMobile}</div>
  </section>

  <section>
    <h4>Items</h4>
    <table>
      <thead><tr><th>Description</th><th>Code</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr>
          <td>${inv.outfitName||'—'} ${inv.type==='rent'?'(Rental)':''}</td>
          <td>${inv.outfitCode||'—'}</td>
          <td style="text-align:right;font-weight:500">${Utils.inr(inv.type==='rent'?rent:price)}</td>
        </tr>
        ${inv.type==='rent' && deposit > 0 ? `
        <tr>
          <td>Security Deposit (Refundable)</td><td>—</td>
          <td style="text-align:right;font-weight:500">${Utils.inr(deposit)}</td>
        </tr>` : ''}
      </tbody>
    </table>
  </section>

  ${inv.type==='rent' && inv.rentFrom ? `
  <div class="rental-box">
    Rental period: ${Utils.fmtDate(inv.rentFrom)} → ${Utils.fmtDate(inv.rentTo)} &nbsp;·&nbsp;
    Late fee: ${Utils.inr(inv.lateFeePerDay)}/day &nbsp;·&nbsp;
    Deposit: ${Utils.inr(deposit)} (refundable on return)
    ${daysLate > 0 ? `<br><strong>⚠ Overdue ${daysLate} day${daysLate!==1?'s':''} — Additional charges: ${Utils.inr(lateFee)}</strong>` : ''}
  </div>` : ''}

  <div class="totals">
    ${inv.type==='rent'
      ? `<div class="total-row"><span>Rent Amount</span><span>${Utils.inr(rent)}</span></div>
         ${deposit>0?`<div class="total-row"><span>Security Deposit</span><span>${Utils.inr(deposit)}</span></div>`:''}
         ${lateFee>0?`<div class="total-row"><span style="color:#A83232">Late Fee (${daysLate}d)</span><span style="color:#A83232">${Utils.inr(lateFee)}</span></div>`:''}`
      : `<div class="total-row"><span>Item Price</span><span>${Utils.inr(price)}</span></div>
         ${discAmt>0?`<div class="total-row"><span>Discount</span><span style="color:#2D7A4F">-${Utils.inr(discAmt)}</span></div>`:''}`}
    <div class="total-row grand"><span>Total</span><span>${Utils.inr(total)}</span></div>
    <div class="total-row"><span>Paid (${inv.paymentMode})</span><span style="color:#2D7A4F">${Utils.inr(paid)}</span></div>
    <div class="total-row"><span style="color:${balance>0?'#A83232':'inherit'}">Balance Due</span>
      <span style="color:${balance>0?'#A83232':'inherit'}">${Utils.inr(balance)}</span></div>
  </div>

  ${studio.gstEnabled && studio.gstin ? `
  <div style="margin-top:14px;font-size:10.5px;color:#5C4D3C">
    GSTIN: ${studio.gstin} · GST (${studio.gstRate}%): ${Utils.inr(Math.round(total * studio.gstRate / 100))}
  </div>` : ''}

  <div class="footer">
    <strong>Return Policy:</strong> ${studio.returnPolicy}<br>
    <em>Thank you for choosing ${studio.name} ✦</em>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
  }

  return { print };
})();
const Dashboard = (() => {
  function render() {
    const el = document.getElementById('page-dashboard');
    const invoices   = Store.getInvoices();
    const inventory  = Store.getInventory();

    // compute stats
    const today      = Utils.today();
    const todayBills = invoices.filter(i => i.createdAt === today);
    const todayRev   = todayBills.reduce((s,i) => s + Utils.calcInvoice(i).paid, 0);

    const thisMonth  = today.slice(0,7);
    const monthBills = invoices.filter(i => i.createdAt.startsWith(thisMonth));
    const monthRev   = monthBills.reduce((s,i) => s + Utils.calcInvoice(i).paid, 0);

    const activeRentals = invoices.filter(i => i.type==='rent' && i.returnStatus !== 'returned' && i.returnStatus !== 'na');
    const totalDeposit  = activeRentals.reduce((s,i) => s + Utils.num(i.deposit), 0);

    const pending = invoices.filter(i => Utils.calcInvoice(i).balance > 0);
    const pendingAmt = pending.reduce((s,i) => s + Utils.calcInvoice(i).balance, 0);

    const overdueRentals = invoices.filter(i => Utils.returnStatus(i) === 'overdue');

    const avail  = inventory.filter(i => i.status==='available').length;
    const rented = inventory.filter(i => i.status==='rented').length;
    const sold   = inventory.filter(i => i.status==='sold').length;

    const recent = invoices.slice(0,6);

    el.innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <div class="page-title">Good morning ✦</div>
          <div class="page-subtitle">Today — <span id="today-date"></span></div>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="Store.exportAll()">↓ Backup Data</button>
          <button class="btn btn-primary" onclick="navigate('billing')">+ New Bill</button>
        </div>
      </div>

      ${overdueRentals.length ? `
        <div class="alert alert-warn">
          ⚠ ${overdueRentals.length} rental${overdueRentals.length>1?'s':''} ${overdueRentals.length>1?'are':'is'} overdue.
          <a href="#" onclick="navigate('invoices');return false" style="font-weight:500;margin-left:6px">View →</a>
        </div>` : ''}

      <div class="stat-grid">
        <div class="stat-card stat-gold">
          <div class="stat-label">Today's Revenue</div>
          <div class="stat-value">${Utils.inr(todayRev)}</div>
          <div class="stat-sub">${todayBills.length} bill${todayBills.length!==1?'s':''} today</div>
        </div>
        <div class="stat-card stat-rose">
          <div class="stat-label">Active Rentals</div>
          <div class="stat-value">${activeRentals.length}</div>
          <div class="stat-sub">${overdueRentals.length} overdue</div>
        </div>
        <div class="stat-card stat-green">
          <div class="stat-label">This Month</div>
          <div class="stat-value">${Utils.inr(monthRev)}</div>
          <div class="stat-sub">${monthBills.length} transactions</div>
        </div>
        <div class="stat-card stat-ink">
          <div class="stat-label">Pending Deposits</div>
          <div class="stat-value">${Utils.inr(totalDeposit)}</div>
          <div class="stat-sub">${activeRentals.length} refunds pending</div>
        </div>
      </div>

      <div class="two-col">
        <div>
          <div class="card">
            <div class="card-header"><span class="card-title">Revenue — Last 7 Days</span></div>
            <div class="card-body"><div class="chart-wrap"><canvas id="revChart"></canvas></div></div>
          </div>
          <div class="card">
            <div class="card-header">
              <span class="card-title">Pending Returns</span>
              ${overdueRentals.length ? `<span class="badge badge-red">${overdueRentals.length} overdue</span>` : '<span class="badge badge-green">All clear</span>'}
            </div>
            <div class="card-body" style="padding:8px 18px">
              ${renderPendingReturns(invoices)}
            </div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="card-header"><span class="card-title">Bill Type Breakdown</span></div>
            <div class="card-body"><div class="chart-wrap"><canvas id="pieChart"></canvas></div></div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Inventory Status</span>
              <button class="btn btn-secondary btn-sm" onclick="navigate('inventory')">Manage</button>
            </div>
            <div class="card-body" style="padding:8px 18px">
              ${renderInventoryStatus(avail, rented, sold)}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Recent Transactions</span>
              <a href="#" onclick="navigate('invoices');return false" style="font-size:12px;color:var(--gold-dark)">View all →</a>
            </div>
            <div style="overflow:hidden">
              <table>
                <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Type</th></tr></thead>
                <tbody>
                  ${recent.map(i => `
                    <tr onclick="InvoiceModal.open('${i.id}')" style="cursor:pointer">
                      <td style="font-weight:500;color:var(--gold-dark)">${i.number}</td>
                      <td>${i.customerName.split(' ')[0]} ${i.customerName.split(' ').slice(1).map(n=>n[0]+'.').join('')}</td>
                      <td>${Utils.inr(Utils.calcInvoice(i).total)}</td>
                      <td>${i.type==='rent' ? '<span class="badge badge-blue">Rent</span>' : '<span class="badge badge-rose">Sale</span>'}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    setTodayDate();
    Charts.initDashboard(invoices);
  }

  function setTodayDate() {
    const el = document.getElementById('today-date');
    if (el) el.textContent = new Date().toLocaleDateString('en-IN', {
      weekday:'long', day:'numeric', month:'long', year:'numeric'
    });
  }

  function renderPendingReturns(invoices) {
    const pending = invoices
      .filter(i => i.type==='rent' && i.returnStatus !== 'returned')
      .filter(i => {
        const s = Utils.returnStatus(i);
        return ['overdue','due-today','upcoming'].includes(s);
      })
      .slice(0,4);

    if (!pending.length) return '<div class="empty-state"><p>No pending returns 🎉</p></div>';

    return pending.map(i => {
      const s   = Utils.returnStatus(i);
      const late = s === 'overdue' ? Utils.daysOverdue(i.rentTo) : 0;
      return `
        <div class="pending-item">
          <div>
            <div class="pending-item-title">${i.customerName}</div>
            <div class="pending-item-sub">${i.number} · ${i.outfitName}</div>
          </div>
          <div style="text-align:right">
            ${Utils.statusBadge(s)}
            <div style="font-size:11px;color:var(--ink-mid);margin-top:3px">
              ${late ? `${late}d late · ${Utils.inr(late * Utils.num(i.lateFeePerDay))} fee` : `Due: ${Utils.fmtDateShort(i.rentTo)}`}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function renderInventoryStatus(avail, rented, sold) {
    const total = avail + rented + sold;
    return `
      <div class="pending-item">
        <span><span class="dot dot-green"></span> Available</span>
        <span style="font-weight:500">${avail} outfits</span>
      </div>
      <div class="pending-item">
        <span><span class="dot dot-gold"></span> On Rent</span>
        <span style="font-weight:500">${rented} outfits</span>
      </div>
      <div class="pending-item" style="border-bottom:none">
        <span><span class="dot dot-gray"></span> Sold</span>
        <span style="font-weight:500">${sold} outfits</span>
      </div>
      <div style="margin-top:10px;font-size:11px;color:var(--ink-mid);display:flex;justify-content:space-between">
        <span>Utilisation rate</span>
        <span style="font-weight:500">${total ? Math.round((rented/total)*100) : 0}%</span>
      </div>
      <div style="height:5px;background:var(--surface3);border-radius:3px;margin-top:4px;overflow:hidden">
        <div style="height:100%;width:${total ? Math.round((rented/total)*100) : 0}%;background:var(--gold);border-radius:3px"></div>
      </div>`;
  }

  return { render };
})();
/* ═══════════════════════════════════════════
   APP.JS — Router, navigation, bootstrap
   Angeek By Sakshi · Studio Billing System
═══════════════════════════════════════════ */

const App = (() => {

  const PAGE_LOADERS = {
    dashboard: Dashboard.render,
    billing:   Billing.render,
    invoices:  Invoices.render,
    customers: Customers.render,
    inventory: Inventory.render,
    payments:  Payments.render,
    reports:   Reports.render,
  };

  let currentPage = 'dashboard';

  // ── Navigation ──
  function navigate(page) {
    if (!PAGE_LOADERS[page]) { console.warn('Unknown page:', page); return; }

    // hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // show target
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // update nav items
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
    });

    // render the page if not already rendered or always-refresh pages
    const alwaysRefresh = ['dashboard', 'invoices', 'customers', 'inventory', 'payments', 'reports'];
    if (alwaysRefresh.includes(page) || !target.dataset.rendered) {
      PAGE_LOADERS[page]();
      target.dataset.rendered = '1';
    }

    currentPage = page;

    // update URL hash (nice for bookmarking, no server needed)
    history.replaceState(null, '', '#' + page);
  }

  // expose globally for onclick attributes
  window.navigate = navigate;

  // ── Wire sidebar nav items ──
  function wireNav() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => navigate(item.dataset.page));
    });
  }

  // ── Today's date ──
  function setTodayDate() {
    const el = document.getElementById('today-date');
    if (el) {
      el.textContent = new Date().toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
    }
  }

  // ── Init ──
  function init() {
    // Seed data
    Store.init();

    // Wire navigation
    wireNav();

    // Load initial page from hash or default
    const hash = location.hash.replace('#','');
    const startPage = PAGE_LOADERS[hash] ? hash : 'dashboard';
    navigate(startPage);

    setTodayDate();

    console.log('%c✦ Angeek By Sakshi Billing System', 'color:#C9A84C;font-size:13px;font-weight:bold');
    console.log('%cRunning in offline mode with localStorage', 'color:#888;font-size:11px');
  }

  return { init, navigate, currentPage: () => currentPage };
})();


// ── Bootstrap ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
