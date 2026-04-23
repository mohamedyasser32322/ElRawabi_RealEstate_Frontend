/* ═══════════════════════════════════════════
   LAYOUT.JS — Buyer Panel Shell
   الروابي للعقارات — Buyer Panel
   ═══════════════════════════════════════════ */

function getUserData() {
  try { return JSON.parse(localStorage.getItem('authData')) || {}; } catch { return {}; }
}

function getToken() {
  const d = getUserData();
  return d.token || '';
}

function handleLogout() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    localStorage.removeItem('authData');
    window.location.href = '../login.html';
  }
}
window.handleLogout = handleLogout;

function initLayout() {
  const u       = getUserData();
  const email   = u.email || '';
  const name    = email.split('@')[0] || 'مستخدم';
  const initials = name.slice(0, 2).toUpperCase();

  const NAV = [
    { id: 'dashboard',   label: 'لوحة التحكم', icon: 'ri-dashboard-3-line' },
  ];

  const header = document.getElementById('app-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-right">
      <a class="header-logo" onclick="navigate('dashboard')">الروابي للعقارات</a>
      <div class="header-divider"></div>
      <div class="header-page-label">
        <span class="header-page-title" id="header-page-title">لوحة التحكم</span>
        <span class="header-role-badge"><i class="ri-user-line"></i> مشتري</span>
      </div>
    </div>

    <nav class="header-nav">
      ${NAV.map(n => `
        <button class="nav-tab" data-page="${n.id}" onclick="navigate('${n.id}')">
          <i class="${n.icon}"></i><span>${n.label}</span>
        </button>`).join('')}
    </nav>

    <div class="header-left">
      <div class="header-user">
        <div class="user-avatar">${initials}</div>
        <span class="user-name">${name}</span>
      </div>
      <button class="logout-btn" onclick="handleLogout()">
        <i class="ri-logout-box-r-line"></i>خروج
      </button>
    </div>
  `;

  /* drawer user info */
  const da = document.getElementById('drawer-avatar');
  const du = document.getElementById('drawer-username');
  const dr = document.getElementById('drawer-role');
  if (da) da.textContent = initials;
  if (du) du.textContent = name;
  if (dr) dr.textContent = 'مشتري';

  /* drawer nav */
  const dn = document.getElementById('drawer-nav');
  if (dn) {
    dn.innerHTML = NAV.map(n => `
      <button class="drawer-nav-item" data-page="${n.id}" onclick="navigateDrawer('${n.id}')">
        <i class="${n.icon}"></i><span>${n.label}</span>
      </button>`).join('');
  }
}

function navigateDrawer(pageId) {
  if (typeof closeDrawer === 'function') closeDrawer();
  if (typeof navigate === 'function') navigate(pageId);
}
window.navigateDrawer = navigateDrawer;