/* PAGE MODULE: reservations — SPA v3 */
(function () {
  window.__pages = window.__pages || {};

  const _css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary:      #0D2142;
      --primary-deep: #081830;
      --card-bg:      #112952;
      --card-hover:   #163366;
      --border:       rgba(255,255,255,0.08);
      --border-hover: rgba(255,255,255,0.2);
      --light:        #FFFFFF;
      --text-muted:   #8fa3c0;
      --success:      #34c759;
      --warning:      #ffcc00;
      --danger:       #ff3b30;
      --accent:       #4e8df5;
      --transition:   all 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes res-spin      { to { transform: rotate(360deg); } }
    @keyframes res-fadeUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes res-fadeIn    { from { opacity:0; } to { opacity:1; } }
    @keyframes res-slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
    #res-page ::-webkit-scrollbar { width: 5px; height: 5px; }
    #res-page ::-webkit-scrollbar-track { background: var(--primary-deep); }
    #res-page ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 6px; }
    #res-page select option { background-color: #0d2040; color: #dde8ff; }
    #res-page select { color-scheme: dark; transition: all 0.25s ease; color: #dde8ff; }
    #res-page select:disabled { opacity: 0.5; cursor: not-allowed; }
    .res-custom-select-wrap select { transition: border-color 0.25s, background 0.25s; color: #dde8ff; }
    /* Smooth dropdown open animation */
    select { animation: none; }
    #res-page select:focus { animation: res-dropdown-open 0.18s cubic-bezier(0.4,0,0.2,1); }
    @keyframes res-dropdown-open { from { opacity:0.7; transform:scaleY(0.97); } to { opacity:1; transform:scaleY(1); } }
    .res-toolbar-wrapper { position:sticky; top:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:12px 24px; background:rgba(8,24,48,0.97); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-bottom:1px solid var(--border); margin:-36px -36px 20px; flex-wrap:wrap; gap:10px; }
    @media(max-width:1024px){ .res-toolbar-wrapper{ margin:-24px -16px 16px; padding:10px 16px; } }
    .res-toolbar-right { display:flex; align-items:center; gap:10px; }
    .res-csv-btn { display:flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; background:rgba(52,199,89,0.12); border:1px solid rgba(52,199,89,0.3); color:var(--success); font-family:inherit; font-size:0.85rem; font-weight:700; cursor:pointer; transition:var(--transition); white-space:nowrap; }
    .res-csv-btn:hover { background:rgba(52,199,89,0.22); transform:translateY(-1px); box-shadow:0 6px 20px rgba(52,199,89,0.2); }
    .res-add-btn { display:flex; align-items:center; gap:7px; padding:9px 20px; border-radius:10px; background:var(--accent); color:#fff; border:none; font-family:inherit; font-size:0.88rem; font-weight:700; cursor:pointer; transition:var(--transition); white-space:nowrap; }
    .res-add-btn:hover { background:#3a7de4; transform:translateY(-2px); box-shadow:0 8px 24px rgba(78,141,245,0.35); }
    .res-dropdown-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px; animation:res-fadeUp 0.35s 0.05s ease both; }
    .res-custom-select-wrap { position:relative; background:var(--card-bg); border:1px solid var(--border); border-radius:12px; transition:var(--transition); }
    .res-custom-select-wrap:hover { border-color:var(--border-hover); }
    .res-custom-select-wrap .res-select-icon { position:absolute; right:16px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:1.1rem; pointer-events:none; z-index:1; }
    .res-custom-select-wrap .res-chevron { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:1rem; pointer-events:none; }
    .res-custom-select-wrap select { width:100%; padding:13px 44px 13px 38px; background:transparent; border:none; outline:none; color:#dde8ff; font-family:'Tajawal',sans-serif; font-size:0.92rem; font-weight:600; cursor:pointer; appearance:none; }
    .res-custom-select-wrap:focus-within { border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,0.1); transition: border-color 0.25s ease, box-shadow 0.25s ease; }
    .res-filter-search-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:16px; animation:res-fadeUp 0.35s 0.1s ease both; }
    .res-filter-pills { display:flex; gap:7px; flex-wrap:wrap; }
    .res-pill { padding:7px 18px; border-radius:20px; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text-muted); font-family:inherit; font-size:0.83rem; font-weight:700; cursor:pointer; transition:var(--transition); user-select:none; }
    .res-pill:hover { background:rgba(255,255,255,0.09); color:var(--light); border-color:rgba(255,255,255,0.18); }
    .res-pill.active { background:rgba(255,255,255,0.13); border-color:rgba(255,255,255,0.32); color:var(--light); }
    .res-pill.p-reserved.active { background:rgba(255,204,0,0.10); border-color:var(--warning); color:var(--warning); }
    .res-pill.p-sold.active { background:rgba(255,59,48,0.12); border-color:var(--danger); color:var(--danger); }
    .res-search-wrap { position:relative; display:flex; align-items:center; flex:1; min-width:200px; max-width:380px; margin-right:auto; }
    .res-search-input { background:rgba(255,255,255,0.06); border:1.5px solid var(--border); color:var(--light); font-family:inherit; font-size:0.9rem; padding:10px 14px 10px 40px; border-radius:12px; width:100%; transition:var(--transition); }
    .res-search-input:focus { outline:none; background:rgba(255,255,255,0.1); border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,0.12); }
    .res-search-input::placeholder { color:var(--text-muted); }
    .res-search-icon { position:absolute; left:13px; color:var(--text-muted); font-size:1.05rem; pointer-events:none; }
    .res-results-count { font-size:0.8rem; color:var(--text-muted); margin-bottom:12px; text-align:left; }
    .res-table-container { background:var(--card-bg); border:1px solid var(--border); border-radius:16px; overflow:hidden; animation:res-fadeUp 0.4s 0.15s ease both; }
    .res-table-scroll { overflow-x:auto; }
    #res-page table { width:100%; border-collapse:collapse; min-width:860px; }
    #res-page thead tr { background:rgba(255,255,255,0.025); border-bottom:1px solid var(--border); }
    #res-page thead th { padding:13px 16px; text-align:right; font-size:0.73rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; white-space:nowrap; }
    #res-page tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.18s ease; }
    #res-page tbody tr:last-child { border-bottom:none; }
    #res-page tbody tr:hover { background:rgba(255,255,255,0.028); }
    #res-page tbody td { padding:13px 16px; font-size:0.88rem; vertical-align:middle; }
    .res-unit-num { font-size:1rem; font-weight:800; color:var(--light); }
    .res-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:8px; font-size:0.76rem; font-weight:700; white-space:nowrap; }
    .res-badge::before { content:''; width:6px; height:6px; border-radius:50%; }
    .badge-reserved { background:rgba(255,204,0,0.11); color:var(--warning); }
    .badge-reserved::before { background:var(--warning); }
    .badge-sold { background:rgba(255,59,48,0.13); color:var(--danger); }
    .badge-sold::before { background:var(--danger); }
    .res-buyer-cell { display:flex; align-items:center; gap:9px; }
    .res-buyer-avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#4e8df5,#2a6dd4); display:flex; align-items:center; justify-content:center; font-size:0.72rem; font-weight:800; color:#fff; flex-shrink:0; }
    .res-buyer-name { font-weight:600; font-size:0.87rem; color:var(--light); }
    .res-buyer-empty { color:var(--text-muted); font-size:0.85rem; }
    .res-money { font-weight:700; font-size:0.87rem; color:var(--light); direction:ltr; display:inline-block; }
    .res-money-warn { font-weight:700; font-size:0.87rem; color:var(--warning); direction:ltr; display:inline-block; }
    .res-type-tag { color:var(--text-muted); font-size:0.85rem; font-weight:600; }
    .res-row-actions { display:flex; gap:5px; align-items:center; justify-content:flex-end; }
    .res-action-btn { position:relative; width:30px; height:30px; border-radius:7px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:var(--transition); display:flex; align-items:center; justify-content:center; font-size:0.92rem; flex-shrink:0; }
    .res-action-btn:hover { transform:translateY(-1px); }
    .res-action-btn[data-tip]:hover::after { content:attr(data-tip); position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:rgba(8,24,48,0.97); color:var(--light); font-size:0.7rem; font-weight:600; padding:4px 8px; border-radius:6px; white-space:nowrap; pointer-events:none; border:1px solid rgba(255,255,255,0.1); z-index:99; font-family:'Tajawal',sans-serif; }
    .res-action-btn.view { border-color:rgba(255,255,255,0.1); color:var(--text-muted); }
    .res-action-btn.view:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.22); color:var(--light); }
    .res-action-btn.edit { border-color:rgba(78,141,245,0.25); color:var(--accent); }
    .res-action-btn.edit:hover { background:rgba(78,141,245,0.18); border-color:var(--accent); box-shadow:0 4px 12px rgba(78,141,245,0.2); }
    .res-action-btn.del { border-color:rgba(255,59,48,0.2); color:var(--danger); }
    .res-action-btn.del:hover { background:rgba(255,59,48,0.15); border-color:var(--danger); box-shadow:0 4px 12px rgba(255,59,48,0.18); }
    .res-loader-box { display:flex; align-items:center; justify-content:center; min-height:360px; }
    .res-spinner { width:48px; height:48px; border:4px solid rgba(255,255,255,0.1); border-top-color:var(--accent); border-radius:50%; animation:res-spin 0.8s linear infinite; }
    .res-empty-msg { text-align:center; padding:70px 20px; color:var(--text-muted); font-size:1rem; }
    .res-empty-msg i { font-size:2.8rem; display:block; margin-bottom:12px; opacity:0.35; }
    #res-pagination { display:flex; justify-content:center; gap:7px; margin-top:24px; }
    .res-pg-btn { padding:7px 14px; border-radius:8px; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text-muted); font-family:inherit; font-size:0.84rem; font-weight:600; cursor:pointer; transition:var(--transition); }
    .res-pg-btn:hover:not(:disabled) { background:rgba(255,255,255,0.1); color:var(--light); }
    .res-pg-btn.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    .res-pg-btn:disabled { opacity:0.35; cursor:not-allowed; }
    #res-modal { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:1000; align-items:center; justify-content:center; backdrop-filter:blur(5px); }
    .res-modal-content { background:rgba(14,30,62,0.98); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.1); border-radius:20px; max-width:560px; width:93%; max-height:88vh; overflow-y:auto; box-shadow:0 30px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07); animation:res-slideDown 0.22s ease; }
    .res-modal-header { padding:22px 26px 16px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:rgba(14,30,62,0.99); z-index:2; }
    #res-modal-title { font-size:1.1rem; font-weight:800; background:linear-gradient(135deg,#fff 0%,#b8ccf0 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .res-modal-close { background:none; border:none; color:var(--text-muted); font-size:1.35rem; cursor:pointer; transition:all 0.25s; }
    .res-modal-close:hover { color:var(--light); transform:rotate(90deg); }
    .res-modal-body { padding:22px 26px; }
    .res-modal-footer { padding:16px 26px; border-top:1px solid rgba(255,255,255,0.08); display:flex; gap:9px; justify-content:flex-end; background:rgba(0,0,0,0.15); position:sticky; bottom:0; }
    .res-form-group { margin-bottom:14px; }
    .res-form-label { display:block; font-size:0.84rem; font-weight:700; margin-bottom:6px; color:var(--light); }
    .res-form-input,.res-form-select { width:100%; padding:10px 13px; border-radius:10px; background:#0a1e42; border:1.5px solid rgba(255,255,255,0.12); color:var(--light); font-family:inherit; font-size:0.89rem; transition:all 0.25s ease; }
    .res-form-select { appearance:none; background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238fa3c0' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat:no-repeat; background-position:left 10px center; background-size:16px; padding-left:34px; cursor:pointer; color-scheme:dark; }
    .res-form-input:focus,.res-form-select:focus { outline:none; background:#0f2450; border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,0.13); }
    .res-form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .res-section-label { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted); margin-bottom:10px; font-weight:700; }
    .res-form-section { padding:14px 16px; border-radius:10px; margin-bottom:14px; }
    .res-form-section.unit-sec { background:rgba(255,255,255,0.04); border:1px solid var(--border); }
    .res-form-section.book-sec { background:rgba(78,141,245,0.05); border:1px solid rgba(78,141,245,0.15); }
    .res-form-section.book-sec .res-section-label { color:var(--accent); opacity:0.9; }
    .res-btn-primary { display:flex; align-items:center; gap:6px; padding:10px 22px; border-radius:10px; background:linear-gradient(135deg,#4e8df5 0%,#3472dc 100%); color:#fff; border:none; font-family:inherit; font-size:0.88rem; font-weight:700; cursor:pointer; transition:all 0.25s; box-shadow:0 4px 14px rgba(78,141,245,0.28); }
    .res-btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 22px rgba(78,141,245,0.38); }
    .res-btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    .res-btn-secondary { padding:10px 20px; border-radius:10px; background:rgba(255,255,255,0.05); color:var(--light); border:1px solid rgba(255,255,255,0.12); font-family:inherit; font-size:0.88rem; font-weight:600; cursor:pointer; transition:all 0.25s; }
    .res-btn-secondary:hover { background:rgba(255,255,255,0.09); }
    .res-btn-danger { display:flex; align-items:center; gap:6px; padding:10px 18px; border-radius:10px; background:var(--danger); color:#fff; border:none; font-family:inherit; font-size:0.88rem; font-weight:700; cursor:pointer; transition:var(--transition); }
    .res-btn-danger:hover { background:#e62c21; transform:translateY(-1px); }
    .res-confirm-box { text-align:center; padding:8px 0; }
    .res-confirm-icon { font-size:2.8rem; margin-bottom:14px; }
    .res-confirm-msg { font-size:0.9rem; color:var(--text-muted); line-height:1.65; margin-bottom:22px; }
    .res-confirm-actions { display:flex; gap:12px; justify-content:center; }
    #res-toast-container { position:fixed; bottom:22px; right:22px; z-index:2000; display:flex; flex-direction:column; gap:10px; pointer-events:none; }
    .res-toast { display:flex; align-items:center; gap:9px; padding:12px 16px; border-radius:10px; background:rgba(8,24,48,0.97); border:1px solid rgba(255,255,255,0.08); color:var(--light); font-size:0.86rem; font-weight:600; animation:res-slideDown 0.25s ease; box-shadow:0 8px 24px rgba(0,0,0,0.35); pointer-events:all; }
    .res-toast.success { border-color:rgba(52,199,89,0.4); }
    .res-toast.error { border-color:rgba(255,59,48,0.4); }
    @media(max-width:768px) { .res-dropdown-row { grid-template-columns:1fr; } .res-form-row { grid-template-columns:1fr; } .res-filter-search-row { flex-direction:column; align-items:stretch; } .res-search-wrap { max-width:100%; margin-right:0; } }
    @media(max-width:480px){ .res-toolbar-right{ flex-wrap:wrap; gap:6px; } .res-filter-pills{ flex-wrap:wrap; } }
  `;

  window.__pages['reservations'] = {
    getCSS: function () { return _css; },
    init: async function () {

      const container = document.getElementById('app-main');
      container.innerHTML = `
        <div id="res-page" style="padding:28px 28px 80px;max-width:1380px;margin:0 auto">

          <!-- Modal -->
          <div id="res-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(5px)">
            <div class="res-modal-content">
              <div class="res-modal-header">
                <h2 id="res-modal-title"></h2>
                <button class="res-modal-close" onclick="window.closeModal()"><i class="ri-close-line"></i></button>
              </div>
              <div id="res-modal-content"></div>
            </div>
          </div>

          <!-- Toast -->
          <div id="res-toast-container"></div>

          <!-- Toolbar -->
          <div class="res-toolbar-wrapper">
            <div id="res-breadcrumb" style="display:flex;align-items:center;gap:8px;font-size:0.83rem;color:var(--text-muted);flex:1">
              <span style="color:var(--light);font-weight:700">إدارة الحجوزات والمبيعات</span>
            </div>
            <div class="res-toolbar-right">
              <button class="res-csv-btn" onclick="window.exportCSV()"><i class="ri-download-2-line"></i> تصدير CSV</button>
              <button class="res-add-btn" onclick="window.openAddBooking()"><i class="ri-add-line"></i> حجز وحدة</button>
            </div>
          </div>

          <!-- Dropdowns -->
          <div class="res-dropdown-row">
            <div class="res-custom-select-wrap">
              <i class="res-select-icon ri-home-4-line"></i>
              <select id="projectFilter" onchange="window.S_res.selectedProject=this.value;window.populateBuildingDropdown();window.applyFilter()">
                <option value="">— كل المشاريع —</option>
              </select>
              <i class="res-chevron ri-arrow-down-s-line"></i>
            </div>
            <div class="res-custom-select-wrap">
              <i class="res-select-icon ri-building-2-line"></i>
              <select id="buildingFilter" onchange="window.S_res.selectedBuilding=this.value;window.applyFilter()">
                <option value="">— كل المباني —</option>
              </select>
              <i class="res-chevron ri-arrow-down-s-line"></i>
            </div>
          </div>

          <!-- Filters + Search -->
          <div class="res-filter-search-row">
            <div class="res-filter-pills">
              <button class="res-pill active" data-cls="res-pill" onclick="window.setFilter('all',this)">الكل</button>
              <button class="res-pill p-reserved" data-cls="res-pill p-reserved" onclick="window.setFilter('reserved',this)">محجوز</button>
              <button class="res-pill p-sold" data-cls="res-pill p-sold" onclick="window.setFilter('sold',this)">مباع</button>
            </div>
            <div class="res-search-wrap">
              <i class="res-search-icon ri-search-line"></i>
              <input type="text" id="searchInput" class="res-search-input" placeholder="ابحث برقم الوحدة، العميل، المبنى..." oninput="window.handleSearch()">
            </div>
          </div>

          <!-- Date Filter Row -->
          <div class="res-date-filter-row" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;padding:12px 14px;background:rgba(78,141,245,0.05);border:1px solid rgba(78,141,245,0.15);border-radius:12px;animation:res-fadeUp 0.35s 0.12s ease both">
            <i class="ri-calendar-line" style="color:var(--accent);font-size:1rem;flex-shrink:0"></i>
            <span style="font-size:0.8rem;font-weight:700;color:var(--text-muted);white-space:nowrap">فلتر التاريخ (ميلادي):</span>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <label style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap">من</label>
                <input type="date" id="res-dateFrom" class="res-date-input" oninput="window.applyFilter()" style="background:#0a1e42;border:1.5px solid rgba(255,255,255,0.12);color:#dde8ff;font-family:'Tajawal',sans-serif;font-size:0.84rem;padding:7px 10px;border-radius:8px;outline:none;transition:all 0.2s;color-scheme:dark;cursor:pointer">
              </div>
              <div style="display:flex;align-items:center;gap:6px">
                <label style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap">إلى</label>
                <input type="date" id="res-dateTo" class="res-date-input" oninput="window.applyFilter()" style="background:#0a1e42;border:1.5px solid rgba(255,255,255,0.12);color:#dde8ff;font-family:'Tajawal',sans-serif;font-size:0.84rem;padding:7px 10px;border-radius:8px;outline:none;transition:all 0.2s;color-scheme:dark;cursor:pointer">
              </div>
              <button onclick="window.clearDateFilter()" id="res-dateClearBtn" style="display:none;align-items:center;gap:4px;padding:6px 12px;border-radius:8px;background:rgba(255,59,48,0.1);border:1px solid rgba(255,59,48,0.25);color:#ff3b30;font-family:'Tajawal',sans-serif;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;white-space:nowrap">
                <i class="ri-close-circle-line"></i> مسح التاريخ
              </button>
            </div>
          </div>

          <div class="res-results-count" id="resultsCount"></div>
          <div id="tableWrap"><div class="res-loader-box"><div class="res-spinner"></div></div></div>
          <div id="res-pagination"></div>
        </div>
      `;

      /* ── Modal close events ── */
      document.getElementById('res-modal').addEventListener('click', e => {
        if (e.target === document.getElementById('res-modal')) closeModal();
      }, { signal: window.__pageAbortSignal });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
      }, { signal: window.__pageAbortSignal });

      /* ── API Base ── */
      const API_BASE = `http://${window.location.hostname}:5256`;
      const PER_PAGE = 15;

      /* ── State ── */
      const S = {
        page:1, units:[], bookings:[], merged:[], filtered:[],
        filter:'all', projects:[], buildings:[], floors:[], buyers:[],
        selectedProject:'', selectedBuilding:'', _busy:false
      };
      window.S_res = S;

      /* ── Helpers ── */
      function getAuthToken(){
        let token=localStorage.getItem('token')||localStorage.getItem('authToken');
        if(!token){const d=localStorage.getItem('authData');if(d){try{const p=JSON.parse(d);token=p.token||p.authToken;}catch(e){}}}
        return token||'';
      }

      async function api(method,path,body){
        const token=getAuthToken();
        if(!token){toast('يرجى تسجيل الدخول أولاً','error');return null;}
        const opts={method,headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}};
        if(body)opts.body=JSON.stringify(body);
        try{
          const r=await fetch(API_BASE+path,opts);
          if(!r.ok){
            if (r.status === 401 || r.status === 403) {
              localStorage.clear();
              window.location.replace('/unauth.html');
              return;
            }
            let errMsg=`HTTP ${r.status}`;
            try{const j=await r.json();errMsg=j.message||j.title||j.detail||j.error||(j.errors?Object.values(j.errors).flat().join(', '):null)||errMsg;}catch{}
            throw new Error(errMsg);
          }
          if(r.status===204)return null;
          return r.json().catch(()=>null);
        }catch(e){console.error('API Error:',e);throw e;}
      }

      const GET    = p     => api('GET',p);
      const POST   = (p,b) => api('POST',p,b);
      const PUT    = (p,b) => api('PUT',p,b);
      const DELETE = p     => api('DELETE',p);
      function arr(v){return Array.isArray(v)?v:(v?.data||v?.items||v?.value||[]);}

      function toast(msg,type='success'){
        const el=document.createElement('div');el.className=`res-toast ${type}`;
        el.innerHTML=`<i class="${type==='success'?'ri-checkbox-circle-line':'ri-error-warning-line'}" style="color:${type==='success'?'var(--success)':'var(--danger)'}"></i><span>${msg}</span>`;
        const tc=document.getElementById('res-toast-container');if(tc)tc.appendChild(el);
        setTimeout(()=>el.remove(),3200);
      }

      function openModal(title,html){
        document.getElementById('res-modal-title').textContent=title;
        document.getElementById('res-modal-content').innerHTML=html;
        document.getElementById('res-modal').style.display='flex';
      }
      function closeModal(){
        document.getElementById('res-modal').style.display='none';
        document.getElementById('res-modal-content').innerHTML='';
      }
      window.closeModal=closeModal;

      function translateError(msg){
        if(!msg)return'حدث خطأ غير معروف';
        const m=msg.toLowerCase();
        if(m.includes('email')||m.includes('البريد'))return'البريد الإلكتروني مسجل مسبقاً';
        if(m.includes('phone')||m.includes('هاتف'))return'رقم الهاتف مسجل مسبقاً';
        if(m.includes('national')||m.includes('وطني'))return'الرقم الوطني مسجل مسبقاً';
        if(m.includes('unit')&&(m.includes('already')||m.includes('duplicate')))return'هذه الوحدة محجوزة مسبقاً';
        if(m.includes('unique')||m.includes('duplicate')||(m.includes('already')&&m.includes('exist'))||m.includes('ix_')||m.includes('uq_'))return'هذه البيانات مسجلة مسبقاً — تحقق من القيم المكررة';
        if(m.includes('foreign key')||m.includes('reference'))return'لا يمكن تنفيذ العملية — توجد بيانات مرتبطة';
        if(m.includes('not found')||m.includes('404'))return'العنصر غير موجود';
        return msg;
      }

      function v(id){const el=document.getElementById(id);return el?el.value.trim():'';}
      function fmtDate(d){if(!d)return'—';try{return new Date(d).toLocaleDateString('ar-SA',{year:'numeric',month:'short',day:'numeric'});}catch{return'—';}}
      function fmtMoney(n){if(n==null||n==='')return'—';return Number(n).toLocaleString('ar-SA')+' ر.س';}
      function initials(name){if(!name)return'؟';const p=name.trim().split(' ');return((p[0]||'').charAt(0)+(p[1]||'').charAt(0)).toUpperCase()||'؟';}
      function setBusy(id,busy,label='حفظ'){const el=document.getElementById(id);if(!el)return;el.disabled=busy;el.innerHTML=busy?'<i class="ri-loader-4-line" style="animation:res-spin 0.8s linear infinite;display:inline-block"></i> جاري...':`<i class="ri-save-line"></i> ${label}`;}
      function showLoader(){const w=document.getElementById('tableWrap');if(w)w.innerHTML='<div class="res-loader-box"><div class="res-spinner"></div></div>';const p=document.getElementById('res-pagination');if(p)p.innerHTML='';}

      function toStatus(val){
        if(val===null||val===undefined)return 4;
        if(typeof val==='number')return val;
        const map={'available':1,'reserved':2,'sold':3,'closed':4,'Available':1,'Reserved':2,'Sold':3,'Closed':4};
        return map[val]??4;
      }

      const UNIT_STATUS_AR   ={1:'متاح',2:'محجوز',3:'مباع',4:'مقفول'};
      const UNIT_STATUS_BADGE={1:'badge-available',2:'badge-reserved',3:'badge-sold',4:'badge-locked'};

      window.calcRemaining=function(){
        const price=parseFloat(document.getElementById('f-price')?.value)||0;
        const paid=parseFloat(v('f-paid'))||0;
        const ri=document.getElementById('f-remaining');
        if(ri)ri.value=Math.max(0,price-paid);
      };

      function populateProjectDropdown(){
        const sel=document.getElementById('projectFilter');if(!sel)return;
        sel.innerHTML='<option value="">— كل المشاريع —</option>';
        S.projects.filter(p=>!p.isDeleted).forEach(p=>{sel.innerHTML+=`<option value="${p.id}" ${String(p.id)===S.selectedProject?'selected':''}>${p.name||''}</option>`;});
      }
      window.populateBuildingDropdown=function(){
        const sel=document.getElementById('buildingFilter');if(!sel)return;
        sel.innerHTML='<option value="">— كل المباني —</option>';
        let list=S.buildings.filter(b=>!b.isDeleted);
        if(S.selectedProject)list=list.filter(b=>String(b.projectId)===S.selectedProject);
        list.forEach(b=>{sel.innerHTML+=`<option value="${b.id}" ${String(b.id)===S.selectedBuilding?'selected':''}>${b.name||''}</option>`;});
      };

      function mergeData(){
        const activeProjects   =S.projects.filter(p=>!p.isDeleted);
        const activeProjectIds =new Set(activeProjects.map(p=>p.id));
        const activeBuildings  =S.buildings.filter(b=>!b.isDeleted&&activeProjectIds.has(b.projectId));
        const activeBuildingIds=new Set(activeBuildings.map(b=>b.id));
        const activeFloors     =S.floors.filter(f=>!f.isDeleted&&activeBuildingIds.has(f.buildingId));
        const activeFloorIds   =new Set(activeFloors.map(f=>f.id));
        S.merged=[];
        S.units.forEach(u=>{
          if(u.isDeleted||!activeFloorIds.has(u.floorId))return;
          const unitStatus=toStatus(u.status);
          if(unitStatus!==2&&unitStatus!==3)return;
          const booking=S.bookings.find(b=>Number(b.unitId)===Number(u.id)&&!b.isDeleted&&b.status!==3&&b.status!=='Cancelled')||null;
          if(!booking)return;
          const floor   =activeFloors.find(f=>f.id===u.floorId);
          const building=activeBuildings.find(b=>b.id===floor?.buildingId);
          const project =activeProjects.find(p=>p.id===building?.projectId);
          let buyerName='—';
          if(u.buyerId){const buyer=S.buyers.find(b=>Number(b.id)===Number(u.buyerId));if(buyer)buyerName=`${buyer.firstName||''} ${buyer.lastName||''}`.trim();}
          else if(booking?.buyerId){const buyer=S.buyers.find(b=>Number(b.id)===Number(booking.buyerId));if(buyer)buyerName=`${buyer.firstName||''} ${buyer.lastName||''}`.trim();}
          S.merged.push({...u,booking,buyerName,projectName:project?.name||'—',projectId:project?.id,buildingName:building?.name||'—',buildingId:building?.id,floorNumber:floor?.floorNumber||'—',realStatus:unitStatus});
        });
        S.merged.sort((a,b)=>{
          const dA=new Date(a.booking?.updatedAt||a.booking?.createdAt||a.updatedAt||a.createdAt||0);
          const dB=new Date(b.booking?.updatedAt||b.booking?.createdAt||b.updatedAt||b.createdAt||0);
          return dB-dA;
        });
      }

      const FILTER_MAP={'all':null,'reserved':[2],'sold':[3]};
      let _searchTimer=null;
      window.handleSearch=function(){clearTimeout(_searchTimer);_searchTimer=setTimeout(applyFilter,160);};
      window.setFilter=function(f,btn){
        S.filter=f;
        document.querySelectorAll('.res-pill').forEach(b=>{b.className=b.dataset.cls||'res-pill';});
        btn.classList.add('active');
        applyFilter();
      };
      window.clearDateFilter=function(){
        const df=document.getElementById('res-dateFrom');const dt=document.getElementById('res-dateTo');
        if(df)df.value='';if(dt)dt.value='';
        const cb=document.getElementById('res-dateClearBtn');if(cb)cb.style.display='none';
        applyFilter();
      };
      function applyFilter(){
        const q=(document.getElementById('searchInput')?.value||'').toLowerCase().trim();
        const dateFrom=document.getElementById('res-dateFrom')?.value||'';
        const dateTo=document.getElementById('res-dateTo')?.value||'';
        const clearBtn=document.getElementById('res-dateClearBtn');
        if(clearBtn)clearBtn.style.display=(dateFrom||dateTo)?'flex':'none';
        const fromTs=dateFrom?new Date(dateFrom).setHours(0,0,0,0):null;
        const toTs=dateTo?new Date(dateTo).setHours(23,59,59,999):null;
        S.filtered=S.merged.filter(u=>{
          const mf=S.filter==='all'||FILTER_MAP[S.filter].includes(u.realStatus);
          const mp=!S.selectedProject||String(u.projectId)===S.selectedProject;
          const mb=!S.selectedBuilding||String(u.buildingId)===S.selectedBuilding;
          const ms=!q||(u.unitNumber||'').toLowerCase().includes(q)||(u.buyerName||'').toLowerCase().includes(q)||(u.buildingName||'').toLowerCase().includes(q)||(u.projectName||'').toLowerCase().includes(q)||String(u.id).includes(q);
          // Date filter on booking date
          let md=true;
          if(fromTs||toTs){
            const rawDate=u.booking?.bookingDate||u.booking?.createdAt||u.updatedAt||u.createdAt;
            if(!rawDate){md=false;}else{const ts=new Date(rawDate).getTime();md=(!fromTs||ts>=fromTs)&&(!toTs||ts<=toTs);}
          }
          return mf&&mp&&mb&&ms&&md;
        });
        S.page=1;renderTable();
      }
      window.applyFilter=applyFilter;

      function renderTable(){
        const wrap=document.getElementById('tableWrap');
        const pag =document.getElementById('res-pagination');
        const cnt =document.getElementById('resultsCount');
        if(!wrap)return;
        if(cnt)cnt.textContent=`النتائج: ${S.filtered.length}`;
        if(!S.filtered.length){
          wrap.innerHTML='<div class="res-empty-msg"><i class="ri-calendar-check-line"></i><p>لا توجد حجوزات مطابقة</p></div>';
          if(pag)pag.innerHTML='';return;
        }
        const start=(S.page-1)*PER_PAGE;
        const page=S.filtered.slice(start,start+PER_PAGE);
        wrap.innerHTML=`
          <div class="res-table-container"><div class="res-table-scroll"><table>
            <thead><tr>
              <th>الوحدة</th>
              <th>الموقع</th>
              <th>الحالة</th>
              <th>العميل</th>
              <th>السعر الإجمالي</th>
              <th>المدفوع</th>
              <th>المتبقي</th>
              <th>تاريخ الحجز</th>
              <th style="width:100px;text-align:center">إجراء</th>
            </tr></thead>
            <tbody>${page.map(u=>{
              const stAr =UNIT_STATUS_AR[u.realStatus]||'مجهول';
              const stBdg=UNIT_STATUS_BADGE[u.realStatus]||'badge-locked';
              const hasBuyer=u.buyerName&&u.buyerName!=='—';
              const paid  =u.booking?.amountPaid;
              const remain=u.booking?.remainingAmount;
              const bDate =fmtDate(u.booking?.bookingDate||u.booking?.createdAt||u.updatedAt);
              const typeLabel=u.type===3?'روف':'شقة';
              return `<tr>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="width:36px;height:36px;border-radius:9px;background:rgba(78,141,245,0.1);border:1px solid rgba(78,141,245,0.2);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800;color:var(--accent);flex-shrink:0">${u.unitNumber||'—'}</div>
                    <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600">${typeLabel}</span>
                  </div>
                </td>
                <td>
                  <div style="font-weight:700;font-size:0.85rem;color:var(--accent);line-height:1.3">${u.projectName}</div>
                  <div style="font-size:0.76rem;color:var(--text-muted);margin-top:2px">${u.buildingName} · دور ${u.floorNumber}</div>
                </td>
                <td><span class="res-badge ${stBdg}">${stAr}</span></td>
                <td>${hasBuyer?`<div class="res-buyer-cell"><div class="res-buyer-avatar">${initials(u.buyerName)}</div><span class="res-buyer-name">${u.buyerName}</span></div>`:'<span class="res-buyer-empty">—</span>'}</td>
                <td><span class="res-money">${fmtMoney(u.price)}</span></td>
                <td>${paid!=null?`<span class="res-money">${fmtMoney(paid)}</span>`:'<span class="res-buyer-empty">—</span>'}</td>
                <td>${remain!=null?`<span class="res-money-warn">${fmtMoney(remain)}</span>`:'<span class="res-buyer-empty">—</span>'}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;white-space:nowrap">${bDate}</td>
                <td>
                  <div class="res-row-actions">
                    <button class="res-action-btn view" data-tip="تفاصيل" onclick="window.openDetailsModal(${u.id})"><i class="ri-eye-line"></i></button>
                    <button class="res-action-btn edit" data-tip="تعديل" onclick="window.openEditModal(${u.id})"><i class="ri-edit-line"></i></button>
                    <button class="res-action-btn del"  data-tip="إلغاء الحجز" onclick="window.deleteBooking(${u.booking.id},'${u.unitNumber}')"><i class="ri-delete-bin-line"></i></button>
                  </div>
                </td>
              </tr>`;
            }).join('')}</tbody>
          </table></div></div>`;
        const pages=Math.ceil(S.filtered.length/PER_PAGE);
        if(!pag)return;
        if(pages<=1){pag.innerHTML='';return;}
        let h=`<button class="res-pg-btn" onclick="window.goPage(${S.page-1})" ${S.page===1?'disabled':''}>السابق</button>`;
        for(let i=1;i<=pages;i++)h+=`<button class="res-pg-btn ${S.page===i?'active':''}" onclick="window.goPage(${i})">${i}</button>`;
        h+=`<button class="res-pg-btn" onclick="window.goPage(${S.page+1})" ${S.page===pages?'disabled':''}>التالي</button>`;
        pag.innerHTML=h;
      }

      window.goPage=function(p){S.page=p;renderTable();window.scrollTo({top:0,behavior:'smooth'});};

      async function loadAll(){
        showLoader();
        try{
          const[unitsData,bookingsData,projectsData,buildingsData,floorsData,buyersData]=await Promise.all([
            GET('/api/Units'),GET('/api/Bookings').catch(()=>[]),GET('/api/Projects').catch(()=>[]),
            GET('/api/Buildings').catch(()=>[]),GET('/api/Floors').catch(()=>[]),GET('/api/Buyers').catch(()=>[]),
          ]);
          S.units    =arr(unitsData);S.bookings=arr(bookingsData);S.projects=arr(projectsData);
          S.buildings=arr(buildingsData);S.floors=arr(floorsData);S.buyers=arr(buyersData);
          mergeData();S.filtered=[...S.merged];populateProjectDropdown();window.populateBuildingDropdown();renderTable();
        }catch(e){
          console.error('loadAll:',e);toast(translateError(e.message)||'فشل تحميل البيانات','error');
          const w=document.getElementById('tableWrap');if(w)w.innerHTML='<div class="res-empty-msg"><i class="ri-wifi-off-line"></i><p>فشل الاتصال بالخادم</p></div>';
        }
      }

      window.openDetailsModal=function(unitId){
        const u=S.merged.find(x=>Number(x.id)===Number(unitId));if(!u)return;
        const stAr =UNIT_STATUS_AR[u.realStatus]||'مجهول';
        const stBdg=UNIT_STATUS_BADGE[u.realStatus]||'badge-locked';
        openModal(`تفاصيل الوحدة: ${u.unitNumber}`,`
          <div class="res-modal-body" style="line-height:2.2;font-size:0.95rem;">
            <div style="display:flex;justify-content:space-between;margin-bottom:15px;">
              <span class="res-badge ${stBdg}" style="font-size:1rem;padding:6px 14px;">${stAr}</span>
              <span style="color:var(--text-muted);font-size:0.85rem;">تاريخ الحجز: ${fmtDate(u.booking?.bookingDate||u.booking?.createdAt)}</span>
            </div>
            <div style="background:rgba(255,255,255,0.02);padding:15px;border-radius:12px;border:1px solid var(--border);margin-bottom:15px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div><span style="color:var(--text-muted)">المشروع:</span> <strong>${u.projectName}</strong></div>
                <div><span style="color:var(--text-muted)">المبنى:</span> <strong>${u.buildingName}</strong></div>
                <div><span style="color:var(--text-muted)">الدور:</span> <strong>${u.floorNumber}</strong></div>
                <div><span style="color:var(--text-muted)">النوع:</span> <strong style="color:var(--accent)">${u.type===3?'روف':'شقة عادية'}</strong></div>
                <div><span style="color:var(--text-muted)">الغرف:</span> <strong>${u.rooms||'—'}</strong></div>
                <div><span style="color:var(--text-muted)">المساحة:</span> <strong>${u.area?u.area+' م²':'—'}</strong></div>
                <div style="grid-column:span 2;"><span style="color:var(--text-muted)">السعر الإجمالي:</span> <strong style="color:var(--success);font-size:1.1rem;">${fmtMoney(u.price)}</strong></div>
              </div>
            </div>
            <div style="background:rgba(78,141,245,0.05);padding:15px;border-radius:12px;border:1px solid rgba(78,141,245,0.15);">
              <h4 style="color:var(--accent);margin-bottom:10px;font-size:0.9rem;">تفاصيل الحجز والعميل</h4>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div style="grid-column:span 2;"><span style="color:var(--text-muted)">العميل:</span> <strong>${u.buyerName}</strong></div>
                <div><span style="color:var(--text-muted)">المدفوع:</span> <strong style="color:var(--light)">${fmtMoney(u.booking?.amountPaid)}</strong></div>
                <div><span style="color:var(--text-muted)">المتبقي:</span> <strong style="color:var(--warning)">${fmtMoney(u.booking?.remainingAmount)}</strong></div>
              </div>
            </div>
          </div>
          <div class="res-modal-footer"><button class="res-btn-secondary" onclick="window.closeModal()">إغلاق</button></div>
        `);
      };

      window.openEditModal=async function(unitId){
        const unit=S.merged.find(u=>Number(u.id)===Number(unitId));if(!unit)return;
        const booking=unit.booking;
        const statusOpts=[{val:2,label:'محجوز'},{val:3,label:'مباع'}]
          .map(o=>`<option value="${o.val}" ${unit.realStatus===o.val?'selected':''}>${o.label}</option>`).join('');
        openModal(`تعديل بيانات: وحدة ${unit.unitNumber}`,`
          <div class="res-modal-body">
            <div class="res-form-section unit-sec">
              <div class="res-section-label">تحديث الوحدة والماليات</div>
              <div class="res-form-row">
                <div class="res-form-group"><label class="res-form-label">حالة الوحدة</label><select id="f-edit-status" class="res-form-select">${statusOpts}</select></div>
                <div class="res-form-group"><label class="res-form-label">إجمالي السعر (ر.س)</label><input id="f-price" class="res-form-input" type="number" step="1000" min="0" value="${unit.price||0}" oninput="window.calcRemaining()"></div>
              </div>
              <div class="res-form-row">
                <div class="res-form-group"><label class="res-form-label">المبلغ المدفوع</label><input id="f-paid" class="res-form-input" type="number" step="0.01" min="0" value="${booking?.amountPaid||0}" oninput="window.calcRemaining()"></div>
                <div class="res-form-group"><label class="res-form-label">المبلغ المتبقي</label><input id="f-remaining" class="res-form-input" type="number" step="0.01" min="0" value="${booking?.remainingAmount||0}" readonly style="background:rgba(0,0,0,0.2);cursor:not-allowed;"></div>
              </div>
            </div>
          </div>
          <div class="res-modal-footer">
            <button class="res-btn-primary" id="submitBtn" onclick="window.submitEditUnit(${unit.id},${booking?.id||'null'})"><i class="ri-save-line"></i> حفظ التعديلات</button>
            <button class="res-btn-secondary" onclick="window.closeModal()">إلغاء</button>
          </div>
        `);
        setTimeout(()=>window.calcRemaining(),50);
      };

      window.submitEditUnit=async function(id,existingBookingId){
        const status =Number(v('f-edit-status'));
        const price  =parseFloat(v('f-price'))||0;
        const bPaid  =parseFloat(v('f-paid'))||0;
        const bRemain=parseFloat(v('f-remaining'))||0;
        setBusy('submitBtn',true,'حفظ التعديلات');
        try{
          const unitOld=S.units.find(u=>Number(u.id)===Number(id));
          await PUT(`/api/Units/${id}`,{...unitOld,status,price,buyerId:unitOld.buyerId});
          if(existingBookingId){
            const bStatus=status===3?2:1;
            const oldBooking=S.bookings.find(b=>b.id===existingBookingId);
            await PUT(`/api/Bookings/${existingBookingId}`,{...oldBooking,status:bStatus,amountPaid:bPaid,remainingAmount:bRemain});
          }
          toast('تم حفظ التعديلات بنجاح');closeModal();await loadAll();
        }catch(e){console.error('submitEditUnit:',e);toast('فشل حفظ التعديلات','error');}
        setBusy('submitBtn',false,'حفظ التعديلات');
      };

      window.openAddBooking=function(){
        const activeProjects=S.projects.filter(p=>!p.isDeleted);
        if(!activeProjects.length){toast('لا توجد مشاريع متاحة','error');return;}
        const projectOpts='<option value="">— اختر المشروع —</option>'+activeProjects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
        const buyerOpts='<option value="">— اختر المشتري —</option>'+S.buyers.map(b=>`<option value="${b.id}">${`${b.firstName||''} ${b.lastName||''}`.trim()}</option>`).join('');
        openModal('حجز وحدة',`
          <div class="res-modal-body">
            <div class="res-form-section unit-sec">
              <div class="res-section-label">تحديد الوحدة</div>
              <div class="res-form-row">
                <div class="res-form-group"><label class="res-form-label">المشروع *</label><select id="f-book-project" class="res-form-select" onchange="window.onBookProjectChange()">${projectOpts}</select></div>
                <div class="res-form-group"><label class="res-form-label">المبنى *</label><select id="f-book-building" class="res-form-select" onchange="window.onBookBuildingChange()" disabled><option value="">— اختر المشروع أولاً —</option></select></div>
              </div>
              <div class="res-form-group"><label class="res-form-label">الوحدة (المتاحة فقط) *</label><select id="f-unit" class="res-form-select" onchange="window.updateAddBookingPrice()" disabled><option value="">— اختر المبنى أولاً —</option></select></div>
            </div>
            <div class="res-form-section book-sec">
              <div class="res-section-label">تفاصيل الإجراء</div>
              <div class="res-form-row">
                <div class="res-form-group"><label class="res-form-label">المشتري *</label><select id="f-buyer" class="res-form-select">${buyerOpts}</select></div>
                <div class="res-form-group"><label class="res-form-label">نوع الإجراء *</label><select id="f-action-type" class="res-form-select"><option value="reserved" selected>حجز (مبدئي)</option><option value="sold">بيع (نهائي)</option></select></div>
              </div>
              <input id="f-price" type="hidden" value="0">
              <div class="res-form-row">
                <div class="res-form-group"><label class="res-form-label">المبلغ المدفوع (المقدم)</label><input id="f-paid" class="res-form-input" type="number" step="0.01" min="0" value="0" oninput="window.calcRemaining()"></div>
                <div class="res-form-group"><label class="res-form-label">المبلغ المتبقي</label><input id="f-remaining" class="res-form-input" type="number" step="0.01" min="0" value="0" readonly style="background:rgba(0,0,0,0.2);cursor:not-allowed;"></div>
              </div>
            </div>
          </div>
          <div class="res-modal-footer">
            <button class="res-btn-primary" id="submitBtn" onclick="window.submitAddBooking()"><i class="ri-save-line"></i> تأكيد العملية</button>
            <button class="res-btn-secondary" onclick="window.closeModal()">إلغاء</button>
          </div>
        `);
      };

      window.onBookProjectChange=function(){
        const projId=document.getElementById('f-book-project').value;
        const bldSel=document.getElementById('f-book-building');
        const unitSel=document.getElementById('f-unit');
        unitSel.innerHTML='<option value="">— اختر المبنى أولاً —</option>';unitSel.disabled=true;
        document.getElementById('f-price').value=0;window.calcRemaining();
        if(!projId){bldSel.innerHTML='<option value="">— اختر المشروع أولاً —</option>';bldSel.disabled=true;return;}
        const buildings=S.buildings.filter(b=>!b.isDeleted&&String(b.projectId)===String(projId));
        if(!buildings.length){bldSel.innerHTML='<option value="">— لا توجد مباني —</option>';bldSel.disabled=true;return;}
        bldSel.innerHTML='<option value="">— اختر المبنى —</option>'+buildings.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
        bldSel.disabled=false;
      };

      window.onBookBuildingChange=function(){
        const bldId=document.getElementById('f-book-building').value;
        const unitSel=document.getElementById('f-unit');
        document.getElementById('f-price').value=0;window.calcRemaining();
        if(!bldId){unitSel.innerHTML='<option value="">— اختر المبنى أولاً —</option>';unitSel.disabled=true;return;}
        const allUnits=S.units.filter(u=>{
          const floor=S.floors.find(f=>f.id===u.floorId);
          return floor&&String(floor.buildingId)===String(bldId)&&toStatus(u.status)===1;
        });
        if(!allUnits.length){unitSel.innerHTML='<option value="">— لا توجد وحدات متاحة —</option>';unitSel.disabled=true;return;}
        unitSel.innerHTML='<option value="">— اختر الوحدة —</option>'+allUnits.map(u=>`<option value="${u.id}" data-price="${u.price||0}" data-floor="${u.floorId}">وحدة ${u.unitNumber} (${u.type===3?'روف':'شقة عادية'})</option>`).join('');
        unitSel.disabled=false;
      };

      window.updateAddBookingPrice=function(){
        const sel=document.getElementById('f-unit');if(!sel||!sel.value)return;
        document.getElementById('f-price').value=sel.options[sel.selectedIndex].getAttribute('data-price');
        window.calcRemaining();
      };

      window.submitAddBooking=async function(){
        const sel=document.getElementById('f-unit');
        const unitId=Number(sel.value);
        const buyerId=Number(v('f-buyer'));
        const paid=parseFloat(v('f-paid'))||0;
        const remaining=parseFloat(v('f-remaining'))||0;
        const actionType=v('f-action-type');
        if(!unitId||!buyerId){toast('اختر الوحدة والمشتري','error');return;}
        const floorId=sel.options[sel.selectedIndex].getAttribute('data-floor');
        const targetUnitStatus=actionType==='sold'?3:2;
        const targetBookingStatus=actionType==='sold'?2:1;
        setBusy('submitBtn',true,'تأكيد العملية');
        try{
          const unitOld=S.units.find(u=>Number(u.id)===unitId);
          await PUT(`/api/Units/${unitId}`,{...unitOld,status:targetUnitStatus,floorId:Number(floorId),buyerId});
          await POST('/api/Bookings',{unitId,buyerId,amountPaid:paid,remainingAmount:remaining,status:targetBookingStatus});
          toast(actionType==='sold'?'تم بيع الوحدة بنجاح':'تم حجز الوحدة بنجاح');
          closeModal();await loadAll();
        }catch(e){console.error('submitAddBooking:',e);toast(translateError(e.message)||'فشل العملية','error');}
        setBusy('submitBtn',false,'تأكيد العملية');
      };

      window.deleteBooking=function(bookingId,unitNum){
        openModal('إلغاء الحجز',`
          <div class="res-modal-body"><div class="res-confirm-box">
            <div class="res-confirm-icon">🗑️</div>
            <p class="res-confirm-msg">هل أنت متأكد من إلغاء الحجز للوحدة <strong>${unitNum}</strong>؟<br>هذا سيعيد الوحدة كـ "متاحة" للبيع.</p>
            <div class="res-confirm-actions">
              <button class="res-btn-danger" id="submitBtn" onclick="window.confirmDeleteBooking(${bookingId})"><i class="ri-delete-bin-line"></i> نعم، إلغاء الحجز</button>
              <button class="res-btn-secondary" onclick="window.closeModal()">تراجع</button>
            </div>
          </div></div>
        `);
      };

      window.confirmDeleteBooking=async function(bookingId){
        const btn=document.getElementById('submitBtn');
        if(btn){btn.disabled=true;btn.innerHTML='<i class="ri-loader-4-line"></i> جاري...';}
        try{await DELETE(`/api/Bookings/${bookingId}`);toast('تم الإلغاء وتحرير الوحدة بنجاح');closeModal();await loadAll();}
        catch(e){console.error('confirmDeleteBooking:',e);toast('فشل الإلغاء','error');}
        if(btn){btn.disabled=false;btn.innerHTML='<i class="ri-delete-bin-line"></i> نعم، إلغاء الحجز';}
      };

      window.exportCSV=function(){
        if(!S.filtered.length){toast('لا توجد بيانات للتصدير','error');return;}
        const headers=['المشروع','المبنى','الدور','رقم الوحدة','النوع','المساحة','السعر','الحالة','المشتري','المدفوع','المتبقي','تاريخ الحجز'];
        const rows=S.filtered.map(u=>[u.projectName||'',u.buildingName||'',u.floorNumber||'',u.unitNumber||'',u.type===3?'روف':'شقة عادية',u.area??'',u.price||0,UNIT_STATUS_AR[u.realStatus]||'',u.buyerName!=='—'?u.buyerName:'',u.booking?.amountPaid||0,u.booking?.remainingAmount||0,fmtDate(u.booking?.bookingDate||u.booking?.createdAt)]);
        const csv='\uFEFF'+[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
        const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download=`الحجوزات_${new Date().toISOString().split('T')[0]}.csv`;a.click();
        toast('تم تصدير الملف بنجاح');
      };

      await loadAll();
    }
  };
})();