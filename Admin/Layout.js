const API_BASE = `http://${window.location.hostname}:5256`;

/* ══════════════════════════════════════
   1. AUTH CHECK
══════════════════════════════════════ */
function checkAuth() {
  let token = localStorage.getItem('token')
           || localStorage.getItem('authToken');
  if (!token) {
    try {
      const d = JSON.parse(localStorage.getItem('authData') || '{}');
      token = d.token || d.authToken;
    } catch {}
  }
  if (!token) {
    window.location.replace('/unauth.html');
    return false;
  }
  return true;
}

/* ══════════════════════════════════════
   2. API WRAPPER
══════════════════════════════════════ */
window.apiFetch = async function(endpoint, options = {}) {
  const userData = getUserData();
  const token = userData?.token
             || localStorage.getItem('token')
             || localStorage.getItem('authToken');
  if (!token) { handleLogout(); return null; }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    if (response.status === 401) { handleLogout(); return null; }
    if (response.status === 403) { window.location.replace('/unauth.html'); return null; }
    return response;
  } catch (err) {
    console.error('API Connection Error:', err);
    return null;
  }
};

/* ══════════════════════════════════════
   3. CONFIG
══════════════════════════════════════ */
const LAYOUT_CONFIG = {
  appName: 'الروابي للعقارات',
  nav: [
    { id: 'dashboard',    label: 'لوحة التحكم', icon: 'ri-dashboard-3-line'   },
    { id: 'projects',     label: 'المشاريع',    icon: 'ri-building-4-line'     },
    { id: 'buildings',    label: 'البناء',       icon: 'ri-community-line'      },
    { id: 'reservations', label: 'الحجوزات',    icon: 'ri-calendar-check-line' },
    { id: 'users',        label: 'المستخدمين',  icon: 'ri-user-settings-line'  },
    { id: 'buyers',       label: 'المشترين',    icon: 'ri-group-line'          },
    { id: 'log',          label: 'السجل',       icon: 'ri-file-list-3-line'    },
  ]
};

/* ══════════════════════════════════════
   4. HELPERS
══════════════════════════════════════ */
function getUserData() {
  try { const d = localStorage.getItem('authData'); return d ? JSON.parse(d) : null; }
  catch { return null; }
}

function handleLogout() {
  ['authData', 'token', 'authToken', 'rememberMe', 'savedEmail']
    .forEach(k => localStorage.removeItem(k));
  location.href = '/login.html';
}

/* ══════════════════════════════════════
   5. CSS — header + drawer + responsive
══════════════════════════════════════ */
function injectStyles() {
  const styleId = 'layout-enhanced-styles';
  if (document.getElementById(styleId)) return;

  const css = `
    /* ── Page transitions ── */
    .page-content {
      animation: lyt-slide-in 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform, opacity;
    }
    @keyframes lyt-slide-in {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    ::view-transition-old(root) { animation: 0.25s ease-out both lyt-fade-out; }
    ::view-transition-new(root) { animation: 0.35s cubic-bezier(0.4,0,0.2,1) both lyt-page-in; }
    @keyframes lyt-page-in  { from { transform:translateX(24px); opacity:0; } to { transform:translateX(0); opacity:1; } }
    @keyframes lyt-fade-out { from { opacity:1; } to { opacity:0; } }

    /* ── Header structure ── */
    #app-header {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
      min-width: 0;
    }
    .header-page-label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    .header-page-title {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--light, #fff);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px;
    }
    .header-nav {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      justify-content: center;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Hamburger ── */
    .lyt-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 38px; height: 38px;
      border-radius: 9px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.09);
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .lyt-hamburger:hover {
      background: rgba(255,255,255,0.11);
      border-color: rgba(255,255,255,0.18);
    }
    .lyt-hamburger span {
      display: block;
      width: 18px; height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
      transform-origin: center;
      pointer-events: none;
    }
    .lyt-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .lyt-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .lyt-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ── Drawer overlay ── */
    #lyt-overlay {
      display: none;
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.62);
      z-index: 1000;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.28s ease;
    }
    #lyt-overlay.open { display: block; opacity: 1; }

    /* ── Drawer panel ── */
    #lyt-drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 268px;
      max-width: 82vw;
      z-index: 1001;
      background: rgba(6,16,40,0.99);
      border-left: 1px solid rgba(255,255,255,0.07);
      display: flex;
      flex-direction: column;
      transform: translateX(110%);
      transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      overflow-y: auto;
    }
    #lyt-drawer.open { transform: translateX(0); }

    .lyt-d-head {
      padding: 18px 18px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .lyt-d-logo {
      font-size: 1.05rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.2px;
    }
    .lyt-d-close {
      width: 30px; height: 30px;
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.45);
      cursor: pointer;
      font-size: 1.05rem;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.18s ease;
    }
    .lyt-d-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

    .lyt-d-user {
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 11px;
      flex-shrink: 0;
    }
    .lyt-d-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4e8df5, #2563eb);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.85rem; font-weight: 800; color: #fff;
      border: 2px solid rgba(255,255,255,0.14);
      flex-shrink: 0;
    }
    .lyt-d-uname {
      font-size: 0.88rem; font-weight: 700; color: #fff;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .lyt-d-role { font-size: 0.7rem; color: #ffcc00; margin-top: 2px; }

    .lyt-d-nav {
      flex: 1;
      padding: 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .lyt-d-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 13px;
      border-radius: 11px;
      cursor: pointer;
      color: rgba(255,255,255,0.5);
      font-size: 0.92rem;
      font-weight: 600;
      border: 1px solid transparent;
      transition: all 0.18s ease;
      background: none;
      font-family: 'Tajawal', inherit;
      width: 100%;
      text-align: right;
    }
    .lyt-d-item i {
      font-size: 1.1rem;
      flex-shrink: 0;
      width: 20px;
      text-align: center;
    }
    .lyt-d-item:hover {
      color: #fff;
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.08);
    }
    .lyt-d-item.active {
      color: #4e8df5;
      background: rgba(78,141,245,0.12);
      border-color: rgba(78,141,245,0.22);
    }

    .lyt-d-foot {
      padding: 12px 10px;
      border-top: 1px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
    }
    .lyt-d-logout {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 13px;
      border-radius: 11px;
      background: rgba(255,59,48,0.08);
      color: #ff3b30;
      border: 1px solid rgba(255,59,48,0.18);
      cursor: pointer;
      font-family: 'Tajawal', inherit;
      font-size: 0.9rem;
      font-weight: 700;
      transition: all 0.18s ease;
      width: 100%;
    }
    .lyt-d-logout:hover { background: rgba(255,59,48,0.18); }
    .lyt-d-logout i { font-size: 1.05rem; }

    /* ── Tablet: hide nav labels ── */
    @media (max-width: 1100px) {
      .header-nav .nav-tab span { display: none; }
      .header-nav .nav-tab { padding: 8px 10px; }
      .header-page-title { max-width: 110px; }
    }

    /* ── Mobile: drawer mode ── */
    @media (max-width: 768px) {
      .header-nav    { display: none !important; }
      .logout-btn    { display: none !important; }
      .user-name     { display: none !important; }
      .header-divider{ display: none !important; }
      .header-page-label { display: none !important; }
      .lyt-hamburger { display: flex !important; }
    }
  `;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

/* ══════════════════════════════════════
   6. DRAWER DOM BUILDER
══════════════════════════════════════ */
function _buildDrawer() {
  if (document.getElementById('lyt-drawer')) return;

  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'lyt-overlay';
  overlay.onclick = closeDrawer;
  document.body.appendChild(overlay);

  // Panel
  const panel = document.createElement('nav');
  panel.id = 'lyt-drawer';
  panel.innerHTML = `
    <div class="lyt-d-head">
      <span class="lyt-d-logo">${LAYOUT_CONFIG.appName}</span>
      <button class="lyt-d-close" onclick="closeDrawer()">
        <i class="ri-close-line"></i>
      </button>
    </div>
    <div class="lyt-d-user">
      <div class="lyt-d-avatar" id="lyt-d-avatar">؟</div>
      <div style="min-width:0">
        <div class="lyt-d-uname" id="lyt-d-uname">—</div>
        <div class="lyt-d-role"  id="lyt-d-role">—</div>
      </div>
    </div>
    <div class="lyt-d-nav" id="lyt-d-nav"></div>
    <div class="lyt-d-foot">
      <button class="lyt-d-logout" onclick="handleLogout()">
        <i class="ri-logout-box-r-line"></i> تسجيل الخروج
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  // ESC to close
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

function _fillDrawer(userName, userRole, initials) {
  const av = document.getElementById('lyt-d-avatar');
  const un = document.getElementById('lyt-d-uname');
  const ur = document.getElementById('lyt-d-role');
  if (av) av.textContent = initials;
  if (un) un.textContent = userName;
  if (ur) ur.textContent = userRole;

  const nav = document.getElementById('lyt-d-nav');
  if (!nav) return;
  nav.innerHTML = LAYOUT_CONFIG.nav.map(item => `
    <button class="lyt-d-item" data-page="${item.id}"
      onclick="window._lytNavDrawer('${item.id}')">
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
    </button>
  `).join('');
}

/* ══════════════════════════════════════
   7. DRAWER ACTIONS (global)
══════════════════════════════════════ */
window.openDrawer = function() {
  document.getElementById('lyt-drawer')?.classList.add('open');
  document.getElementById('lyt-overlay')?.classList.add('open');
  document.querySelector('.lyt-hamburger')?.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeDrawer = function() {
  document.getElementById('lyt-drawer')?.classList.remove('open');
  document.getElementById('lyt-overlay')?.classList.remove('open');
  document.querySelector('.lyt-hamburger')?.classList.remove('open');
  document.body.style.overflow = '';
};

window._lytNavDrawer = function(pageId) {
  closeDrawer();
  navigate(pageId);
};

function _syncDrawer(pageId) {
  document.querySelectorAll('.lyt-d-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
}

/* ══════════════════════════════════════
   8. INIT LAYOUT
══════════════════════════════════════ */
function initLayout() {
  if (!checkAuth()) return;

  injectStyles();
  _buildDrawer();

  const userData = getUserData();
  const userName = userData?.email ? userData.email.split('@')[0] : '—';
  const userRole = userData?.role  || '—';
  const initials = userName !== '—' ? userName.slice(0, 2).toUpperCase() : '؟';

  _fillDrawer(userName, userRole, initials);

  const navHTML = LAYOUT_CONFIG.nav.map(item => `
    <button class="nav-tab" data-page="${item.id}" onclick="navigate('${item.id}')">
      <i class="${item.icon}"></i><span>${item.label}</span>
    </button>
  `).join('');

  const headerHTML = `
    <div class="header-right">
      <a class="header-logo" href="#dashboard" onclick="navigate('dashboard');return false;">
        ${LAYOUT_CONFIG.appName}
      </a>
      <div class="header-divider"></div>
      <div class="header-page-label">
        <div class="header-page-title" id="header-page-title">لوحة التحكم</div>
        <div class="header-role-badge"><i class="ri-shield-star-line"></i>${userRole}</div>
      </div>
    </div>

    <nav class="header-nav" id="header-nav">${navHTML}</nav>

    <div class="header-left">
      <div class="header-user">
        <div class="user-avatar">${initials}</div>
        <span class="user-name">${userName}</span>
      </div>
      <button class="logout-btn" onclick="handleLogout()">
        <i class="ri-logout-box-r-line"></i> خروج
      </button>
      <button class="lyt-hamburger" onclick="openDrawer()" aria-label="القائمة">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const header = document.getElementById('app-header');
  if (header) header.innerHTML = headerHTML;
  document.title = LAYOUT_CONFIG.appName;
}

/* ══════════════════════════════════════
   9. NAVIGATION
══════════════════════════════════════ */
async function navigate(pageId) {
  const titleEl = document.getElementById('header-page-title');
  const navItem = LAYOUT_CONFIG.nav.find(n => n.id === pageId);
  if (navItem && titleEl) titleEl.innerText = navItem.label;

  const area = document.getElementById('main-content') || document.getElementById('app-main');

  if (document.startViewTransition) {
    document.startViewTransition(() => updatePageContent(pageId));
  } else {
    if (area) {
      area.style.cssText += 'opacity:0;transform:translateY(10px);transition:opacity .18s ease,transform .18s ease';
      setTimeout(() => {
        updatePageContent(pageId);
        area.style.cssText += 'opacity:1;transform:translateY(0)';
        area.classList.add('page-content');
      }, 180);
    } else {
      updatePageContent(pageId);
    }
  }
}

function updatePageContent(pageId) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
  _syncDrawer(pageId);

  if (typeof window.loadPage === 'function') {
    window.loadPage(pageId);
  }
}

/* ══════════════════════════════════════
   10. KICK OFF
══════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', initLayout);