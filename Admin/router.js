/* ═══════════════════════════════════════════════
    ROUTER.JS — SPA Navigation Engine (Secured)
    الروابي للعقارات — الإصدار المطور v4
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  // تعريف الصفحات مع تحديد الأدوار المسموح لها بالدخول
  const PAGE_MAP = {
    'dashboard':    { file: null,                    label: 'لوحة التحكم', roles: ['Admin'] },
    'projects':     { file: 'pages/projects.js',     label: 'المشاريع',    roles: ['Admin'] },
    'buildings':    { file: 'pages/buildings.js',    label: 'البناء',      roles: ['Admin'] },
    'reservations': { file: 'pages/reservations.js', label: 'الحجوزات',    roles: ['Admin'] },
    'users':        { file: 'pages/users.js',        label: 'المستخدمين',  roles: ['Admin'] },
    'buyers':       { file: 'pages/buyers.js',       label: 'المشترين',    roles: ['Admin'] },
    'log':          { file: 'pages/log.js',          label: 'السجل',       roles: ['Admin'] },
  };

  const loadedModules = {};
  let currentPage   = null;
  let activeStyleEl = null;
  let pageAbortController = null;

  function loadPageModule(pageId) {
    return new Promise((resolve, reject) => {
      const info = PAGE_MAP[pageId];
      if (!info || !info.file) { resolve(); return; }
      if (loadedModules[pageId]) { resolve(); return; }
      const script = document.createElement('script');
      script.src = info.file + '?v=' + Date.now(); // Cache busting
      script.onload  = () => { loadedModules[pageId] = true; resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function injectCSS(pageId) {
    if (activeStyleEl) { activeStyleEl.remove(); activeStyleEl = null; }
    const page = window.__pages && window.__pages[pageId];
    if (!page) return;
    const css = page.getCSS ? page.getCSS() : '';
    if (!css) return;
    const style = document.createElement('style');
    style.id = 'page-style-' + pageId;
    style.textContent = css;
    document.head.appendChild(style);
    activeStyleEl = style;
  }

  function setPageHTML(pageId) {
    const main = document.getElementById('app-main');
    if (!main) return;
    main.innerHTML = '';

    if (pageId === 'dashboard') {
      main.innerHTML = window.__dashboardHTML || '<div class="page-header"><h1>لوحة المعلومات</h1></div>';
      return;
    }

    const selfInjectPages = ['projects', 'buildings', 'buyers', 'reservations'];
    if (selfInjectPages.includes(pageId)) return;

    const staticHTML = window.__pageHTML && window.__pageHTML[pageId];
    if (staticHTML) main.innerHTML = staticHTML;
  }

  function updateNav(pageId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === pageId);
    });
    const info = PAGE_MAP[pageId];
    const titleEl = document.getElementById('header-page-title');
    if (titleEl && info) titleEl.textContent = info.label;
  }

  window.navigate = async function(pageId, pushState) {
    if (pushState === undefined) pushState = true;

    // ── حماية المسارات (Security Guard) ──
    const authData = JSON.parse(localStorage.getItem('authData'));
    
    // 1. التأكد من تسجيل الدخول
    if (!authData || !authData.token) {
        window.location.href = '../login.html';
        return;
    }

    // 2. التأكد من الصلاحية (Role Check)
    const info = PAGE_MAP[pageId];
    if (info && info.roles && !info.roles.includes(authData.role)) {
        console.error(`Access Denied: Role ${authData.role} cannot access ${pageId}`);
        if (pageId !== 'dashboard') window.navigate('dashboard', false);
        return;
    }

    if (pageId === currentPage) return;
    currentPage = pageId;

    if (pushState) history.pushState({ page: pageId }, '', ' ');

    updateNav(pageId);

    const main = document.getElementById('app-main');
    if (main) { main.style.opacity = '0'; main.style.transition = 'opacity 0.15s ease'; }

    if (pageAbortController) { pageAbortController.abort(); pageAbortController = null; }
    pageAbortController = new AbortController();
    window.__pageAbortSignal = pageAbortController.signal;

    try {
      await loadPageModule(pageId);
      injectCSS(pageId);
      setPageHTML(pageId);

      if (main) requestAnimationFrame(() => requestAnimationFrame(() => { main.style.opacity = '1'; }));

      const page = window.__pages && window.__pages[pageId];
      if (page && typeof page.init === 'function') {
        await page.init();
      }

    } catch (e) {
      console.error('[Router] error:', pageId, e);
      if (main) {
        main.style.opacity = '1';
        main.innerHTML = `<div class="error-state">فشل تحميل الصفحة: ${e.message || e}</div>`;
      }
    }
  };

  window.addEventListener('popstate', e => {
    const pageId = (e.state && e.state.page) || getPageFromHash() || 'dashboard';
    window.navigate(pageId, false);
  });

  function getPageFromHash() {
    const hash = location.hash.replace('#', '').toLowerCase();
    return PAGE_MAP[hash] ? hash : null;
  }

  window.__initRouter = function() {
    window.navigate(getPageFromHash() || 'dashboard', false);
  };

})();