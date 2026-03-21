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
