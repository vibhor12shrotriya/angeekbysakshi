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

// ── Dashboard ───────────────────────────────
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
