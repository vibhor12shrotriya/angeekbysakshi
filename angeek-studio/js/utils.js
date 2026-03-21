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
