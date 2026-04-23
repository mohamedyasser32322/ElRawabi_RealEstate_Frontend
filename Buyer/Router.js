/* ═══════════════════════════════════════════
   ROUTER.JS — Buyer SPA Navigation
   الروابي للعقارات — Buyer Panel
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  const PAGE_MAP = {
    'dashboard':     { file: null,                        label: 'لوحة التحكم' },
    'construction':  { file: 'pages/construction.js',     label: 'مراحل البناء' },
  };

  const loadedModules = {};
  let currentPage = null;
  let activeStyleEl = null;
  let pageAbortController = null;

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

  function injectCSS(pageId) {
    if (activeStyleEl) { activeStyleEl.remove(); activeStyleEl = null; }
    const page = window.__pages && window.__pages[pageId];
    if (!page) return;
    const css = page.getCSS ? page.getCSS() : '';
    if (!css) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    activeStyleEl = style;
  }

  function updateNav(pageId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === pageId);
    });
    document.querySelectorAll('.drawer-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
    const info = PAGE_MAP[pageId];
    const titleEl = document.getElementById('header-page-title');
    if (titleEl && info) titleEl.textContent = info.label;
  }

  window.navigate = async function (pageId, pushState) {
    if (pushState === undefined) pushState = true;

    /* Auth guard */
    let authData;
    try { authData = JSON.parse(localStorage.getItem('authData')); } catch {}
    if (!authData || !authData.token) { window.location.href = '../Unauth.html'; return; }
    if (authData.role !== 'Buyer') { window.location.href = '../Unauth.html'; return; }

    if (pageId === currentPage) return;
    currentPage = pageId;
    if (pushState) history.pushState({ page: pageId }, '', '#' + pageId);
    updateNav(pageId);

    const main = document.getElementById('app-main');
    if (main) { main.style.opacity = '0'; main.style.transition = 'opacity 0.15s ease'; }

    if (pageAbortController) { pageAbortController.abort(); pageAbortController = null; }
    pageAbortController = new AbortController();
    window.__pageAbortSignal = pageAbortController.signal;

    try {
      await loadPageModule(pageId);
      injectCSS(pageId);

      if (main) requestAnimationFrame(() => requestAnimationFrame(() => { main.style.opacity = '1'; }));

      const page = window.__pages && window.__pages[pageId];
      if (page && typeof page.init === 'function') {
        await page.init();
      } else if (pageId === 'dashboard') {
        /* dashboard rendered by index.html boot */
        if (typeof window.__loadDashboard === 'function') window.__loadDashboard();
      }
    } catch (e) {
      console.error('[BuyerRouter]', e);
      if (main) {
        main.style.opacity = '1';
        main.innerHTML = `<div class="b-error-state">فشل تحميل الصفحة</div>`;
      }
    }
  };

  window.addEventListener('popstate', e => {
    const pageId = (e.state && e.state.page) || getHash() || 'dashboard';
    window.navigate(pageId, false);
  });

  function getHash() {
    const h = location.hash.replace('#', '').toLowerCase();
    return PAGE_MAP[h] ? h : null;
  }

  window.__initRouter = function () {
    window.navigate(getHash() || 'dashboard', false);
  };
})();