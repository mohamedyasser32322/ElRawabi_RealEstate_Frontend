/* ═══════════════════════════════════════════════
    ROUTER.JS — BookingManager SPA
    الروابي للعقارات
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  const PAGE_MAP = {
    'dashboard':    { file: null,                    label: 'لوحة التحكم', roles: ['BookingManager'] },
    'projects':     { file: 'pages/projects.js',     label: 'المشاريع',    roles: ['BookingManager'] },
    'reservations': { file: 'pages/reservations.js', label: 'الحجوزات',    roles: ['BookingManager'] },
    'buyers':       { file: 'pages/buyers.js',       label: 'العملاء',     roles: ['BookingManager'] },
  };

  const loadedModules   = {};
  let   currentPage     = null;
  let   activeStyleEl   = null;
  let   pageAbortController = null;

  /* ── load JS module ── */
  function loadPageModule(pageId) {
    return new Promise((resolve, reject) => {
      const info = PAGE_MAP[pageId];
      if (!info || !info.file) { resolve(); return; }
      if (loadedModules[pageId]) { resolve(); return; }
      const script = document.createElement('script');
      script.src = info.file + '?v=' + Date.now();
      script.onload  = () => { loadedModules[pageId] = true; resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /* ── inject page CSS ── */
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

  /* ── set page HTML skeleton ── */
  function setPageHTML(pageId) {
    const main = document.getElementById('app-main');
    if (!main) return;
    main.innerHTML = '';

    if (pageId === 'dashboard') {
      main.innerHTML = window.__bmDashboardHTML || '<div class="page-header"><h1>لوحة التحكم</h1></div>';
      return;
    }

    // projects / buyers / reservations inject themselves
  }

  /* ── sync nav highlights ── */
  function updateNav(pageId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === pageId);
    });
    const info = PAGE_MAP[pageId];
    const titleEl = document.getElementById('header-page-title');
    if (titleEl && info) titleEl.textContent = info.label;
  }

  /* ══════════════════════════════════════
     MAIN navigate()
  ══════════════════════════════════════ */
  window.navigate = async function(pageId, pushState) {
    if (pushState === undefined) pushState = true;

    // ── Auth guard ──
    let authData = null;
    try { authData = JSON.parse(localStorage.getItem('authData')); } catch {}

    if (!authData || !authData.token) {
      window.location.href = '/login.html';
      return;
    }

    // ── Page guard: redirect unknown pages to dashboard ──
    if (!PAGE_MAP[pageId]) {
      window.navigate('dashboard', false);
      return;
    }

    if (pageId === currentPage) return;
    currentPage = pageId;

    if (pushState) history.pushState({ page: pageId }, '', '#' + pageId);

    updateNav(pageId);

    const main = document.getElementById('app-main');
    if (main) {
      main.style.opacity    = '0';
      main.style.transition = 'opacity 0.15s ease';
    }

    // abort previous page init
    if (pageAbortController) { pageAbortController.abort(); pageAbortController = null; }
    pageAbortController = new AbortController();
    window.__pageAbortSignal = pageAbortController.signal;

    try {
      await loadPageModule(pageId);
      injectCSS(pageId);
      setPageHTML(pageId);

      if (main) requestAnimationFrame(() => requestAnimationFrame(() => { main.style.opacity = '1'; }));

      // dashboard special handler
      if (pageId === 'dashboard' && typeof window.__bmLoadDashboard === 'function') {
        window.__bmLoadDashboard();
        return;
      }

      const page = window.__pages && window.__pages[pageId];
      if (page && typeof page.init === 'function') {
        await page.init();
      }

    } catch (e) {
      console.error('[Router] error loading page:', pageId, e);
      if (main) {
        main.style.opacity = '1';
        main.innerHTML = `<div style="padding:40px;text-align:center;color:#8fa3c0">فشل تحميل الصفحة</div>`;
      }
    }
  };

  /* ── browser back/forward ── */
  window.addEventListener('popstate', e => {
    const pageId = (e.state && e.state.page) || getPageFromHash() || 'dashboard';
    window.navigate(pageId, false);
  });

  function getPageFromHash() {
    const hash = location.hash.replace('#', '').toLowerCase();
    return PAGE_MAP[hash] ? hash : null;
  }

  /* ── kick off after layout is ready ── */
  window.__initRouter = function() {
    window.navigate(getPageFromHash() || 'dashboard', false);
  };

})();