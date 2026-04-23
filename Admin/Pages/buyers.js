/* PAGE MODULE: buyers — SPA v3 */
(function () {
  window.__pages = window.__pages || {};

  const _css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary:#0D2142; --primary-deep:#081830; --card-bg:#112952; --card-hover:#163366;
      --border:rgba(255,255,255,0.08); --border-hover:rgba(255,255,255,0.2);
      --light:#FFFFFF; --text-muted:#8fa3c0;
      --success:#34c759; --warning:#ffcc00; --danger:#ff3b30; --accent:#4e8df5;
      --transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes spin     { to { transform:rotate(360deg); } }
    @keyframes fadeUp   { from { opacity:0;transform:translateY(16px); } to { opacity:1;transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes slideDown{ from { opacity:0;transform:translateY(-8px); } to { opacity:1;transform:translateY(0); } }

    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:var(--primary-deep)}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:6px}

    /* ── STICKY TOOLBAR ── */
    .by-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(8,24,48,0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      margin: -36px -36px 24px;
    }
    @media(max-width:1024px){ .by-toolbar{ margin:-24px -16px 20px; padding:10px 16px; } }

    .by-toolbar-left  { display:flex; align-items:center; gap:10px; flex:1; min-width:0; }
    .by-toolbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; flex-wrap:wrap; }

    .by-title {
      font-size:1.1rem; font-weight:800; color:var(--light);
      display:flex; align-items:center; gap:8px; white-space:nowrap;
    }
    .by-title i { color:var(--accent); font-size:1.2rem; }

    .by-search-wrap {
      position:relative; flex:1; max-width:360px; min-width:140px;
    }
    .by-search-wrap i {
      position:absolute; left:11px; top:50%; transform:translateY(-50%);
      color:var(--text-muted); font-size:1rem; pointer-events:none;
    }
    .by-search {
      width:100%; padding:9px 14px 9px 36px;
      background:rgba(255,255,255,0.07); border:1.5px solid var(--border);
      border-radius:10px; color:var(--light); font-family:inherit; font-size:.88rem;
      transition:var(--transition);
    }
    .by-search:focus {
      outline:none; background:rgba(255,255,255,0.11);
      border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,.12);
    }
    .by-search::placeholder { color:var(--text-muted); }

    #by-addBtn {
      display:flex; align-items:center; gap:7px;
      padding:9px 18px; border-radius:10px;
      background:var(--accent); color:#fff; border:none;
      font-family:inherit; font-size:.88rem; font-weight:700;
      cursor:pointer; transition:var(--transition); white-space:nowrap;
    }
    #by-addBtn:hover { background:#3a7de4; transform:translateY(-1px); box-shadow:0 6px 18px rgba(78,141,245,.35); }

    #by-csvBtn {
      display:flex; align-items:center; gap:7px;
      padding:9px 16px; border-radius:10px;
      background:rgba(52,199,89,.12); color:var(--success);
      border:1.5px solid rgba(52,199,89,.3);
      font-family:inherit; font-size:.88rem; font-weight:700;
      cursor:pointer; transition:var(--transition); white-space:nowrap;
    }
    #by-csvBtn:hover { background:rgba(52,199,89,.22); border-color:var(--success); transform:translateY(-1px); }

    /* ── STATS ── */
    .by-stats {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
      gap:14px; margin-bottom:22px;
      animation:fadeUp .4s ease both;
    }
    .by-stat {
      background:var(--card-bg); border:1px solid var(--border);
      border-radius:14px; padding:16px 18px;
      display:flex; align-items:center; gap:14px;
    }
    .by-stat-icon {
      width:42px; height:42px; border-radius:12px;
      display:flex; align-items:center; justify-content:center;
      font-size:1.2rem; flex-shrink:0;
    }
    .by-stat-icon.blue  { background:rgba(78,141,245,.15); color:var(--accent); }
    .by-stat-icon.green { background:rgba(52,199,89,.15);  color:var(--success); }
    .by-stat-icon.gray  { background:rgba(255,255,255,.06);color:var(--text-muted); }
    .by-stat-num { font-size:1.5rem; font-weight:800; line-height:1; }
    .by-stat-lbl { font-size:.73rem; color:var(--text-muted); margin-top:3px; }

    /* ── TABLE ── */
    .by-table-wrap {
      background:var(--card-bg); border:1px solid var(--border);
      border-radius:16px; overflow:hidden;
      animation:fadeUp .4s ease both;
    }
    .by-table-scroll { overflow-x:auto; }
    .by-table {
      width:100%; border-collapse:collapse; min-width:680px;
    }
    .by-table thead tr {
      background:rgba(255,255,255,.025); border-bottom:1px solid var(--border);
    }
    .by-table thead th {
      padding:13px 16px; text-align:right;
      font-size:.75rem; font-weight:700; color:var(--text-muted);
      text-transform:uppercase; letter-spacing:.5px; white-space:nowrap;
    }
    .by-table tbody tr {
      border-bottom:1px solid var(--border); transition:background .18s;
    }
    .by-table tbody tr:last-child { border-bottom:none; }
    .by-table tbody tr:hover { background:rgba(255,255,255,.025); }
    .by-table tbody td {
      padding:13px 16px; font-size:.88rem; color:var(--light); vertical-align:middle;
    }

    .by-avatar {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg,#4e8df5,#3a7de4);
      display:flex; align-items:center; justify-content:center;
      font-size:.85rem; font-weight:800; color:#fff; flex-shrink:0;
    }
    .by-name-cell { display:flex; align-items:center; gap:11px; }
    .by-name  { font-weight:700; font-size:.9rem; }
    .by-email { font-size:.73rem; color:var(--text-muted); margin-top:1px; }

    .by-unit-badge {
      display:inline-flex; align-items:center; gap:5px;
      padding:3px 10px; border-radius:20px; font-size:.73rem; font-weight:700;
    }
    .by-unit-badge.has { background:rgba(52,199,89,.12); color:var(--success); border:1px solid rgba(52,199,89,.3); }
    .by-unit-badge.none{ background:rgba(255,255,255,.04); color:var(--text-muted); border:1px solid var(--border); }

    .by-row-actions { display:flex; gap:6px; justify-content:flex-end; }
    .by-icon-btn {
      width:30px; height:30px; border-radius:8px;
      display:flex; align-items:center; justify-content:center;
      border:1px solid var(--border); background:rgba(255,255,255,.05);
      color:var(--text-muted); cursor:pointer; font-size:.88rem;
      transition:var(--transition);
    }
    .by-icon-btn.view:hover { background:rgba(52,199,89,.18); color:var(--success); border-color:var(--success); }
    .by-icon-btn.edit:hover { background:rgba(78,141,245,.18); color:var(--accent);  border-color:var(--accent); }
    .by-icon-btn.del:hover  { background:rgba(255,59,48,.18);  color:var(--danger);  border-color:var(--danger); }

    /* ── LOADER / EMPTY ── */
    .loader-box { display:flex; align-items:center; justify-content:center; min-height:360px; }
    .spinner { width:44px; height:44px; border:3px solid rgba(255,255,255,.08); border-top-color:var(--accent); border-radius:50%; animation:spin .75s linear infinite; }
    .by-empty { text-align:center; padding:60px 20px; color:var(--text-muted); font-size:.95rem; }
    .by-empty i { font-size:2.8rem; display:block; margin-bottom:12px; opacity:.35; }

    /* ── PAGINATION ── */
    .by-pag { display:flex; justify-content:center; gap:7px; margin-top:22px; }
    .pg-btn {
      padding:7px 13px; border-radius:8px;
      background:rgba(255,255,255,.05); border:1px solid var(--border);
      color:var(--text-muted); font-family:inherit; font-size:.84rem; font-weight:600;
      cursor:pointer; transition:var(--transition);
    }
    .pg-btn:hover:not(:disabled) { background:rgba(255,255,255,.1); color:var(--light); }
    .pg-btn.active { background:var(--accent); color:#fff; border-color:var(--accent); }
    .pg-btn:disabled { opacity:.35; cursor:not-allowed; }

    /* ── MODAL ── */
    #by-modal {
      display:none; position:fixed; inset:0;
      background:rgba(0,0,0,.65); z-index:1000;
      align-items:center; justify-content:center;
      backdrop-filter:blur(6px); animation:fadeIn .2s ease;
    }
    .by-modal-box {
      background:rgba(13,33,66,.98); border:1px solid rgba(255,255,255,.12);
      border-radius:20px; max-width:580px; width:94%;
      max-height:90vh; overflow-y:auto;
      box-shadow:0 24px 56px rgba(0,0,0,.5);
    }
    .by-modal-head {
      padding:22px 26px 16px; border-bottom:1px solid var(--border);
      display:flex; justify-content:space-between; align-items:center;
      position:sticky; top:0; background:rgba(13,33,66,.99); z-index:2;
      border-radius:20px 20px 0 0;
    }
    .by-modal-title { font-size:1.1rem; font-weight:800; color:var(--light); }
    .by-modal-close {
      background:none; border:none; color:var(--text-muted);
      font-size:1.35rem; cursor:pointer; transition:var(--transition);
    }
    .by-modal-close:hover { color:var(--light); transform:rotate(90deg); }
    .by-modal-body   { padding:22px 26px; }
    .by-modal-footer {
      padding:16px 26px; border-top:1px solid var(--border);
      display:flex; gap:10px; justify-content:flex-end;
      background:rgba(0,0,0,.15); border-radius:0 0 20px 20px;
      position:sticky; bottom:0;
    }

    /* ── FORM ── */
    .fg { margin-bottom:14px; }
    .fl { display:block; font-size:.84rem; font-weight:700; margin-bottom:7px; color:var(--light); }
    .fi, .fsel {
      width:100%; padding:11px 13px; border-radius:10px;
      background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.1);
      color:var(--light); font-family:inherit; font-size:.9rem;
      transition:var(--transition);
    }
    .fi::placeholder { color:var(--text-muted); }
    .fi:focus, .fsel:focus {
      outline:none; background:rgba(255,255,255,.09);
      border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,.13);
    }
    /* ── Dropdown fix: dark background ── */
    .fsel {
      appearance:none; cursor:pointer; color-scheme:dark; color:#dde8ff;
      background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat:no-repeat; background-position:right 12px center; background-size:16px; padding-right:38px;
    }
    .fsel:focus { animation:by-dropOpen .18s cubic-bezier(.4,0,.2,1); }
    @keyframes by-dropOpen { from{opacity:.8;transform:scaleY(.97)} to{opacity:1;transform:scaleY(1)} }
    .fsel option { background:#0d2040; color:#dde8ff; }
    .fr { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    @media(max-width:540px){ .fr{ grid-template-columns:1fr; } }

    .btn-submit {
      display:flex; align-items:center; gap:6px;
      padding:10px 22px; border-radius:10px;
      background:var(--accent); color:#fff; border:none;
      font-family:inherit; font-size:.9rem; font-weight:700;
      cursor:pointer; transition:var(--transition);
      box-shadow:0 4px 14px rgba(78,141,245,.3);
    }
    .btn-submit:hover:not(:disabled) { background:#3a7de4; transform:translateY(-1px); }
    .btn-submit:disabled { opacity:.6; cursor:not-allowed; }
    .btn-cancel {
      padding:10px 20px; border-radius:10px;
      background:rgba(255,255,255,.06); color:var(--light);
      border:1px solid rgba(255,255,255,.12);
      font-family:inherit; font-size:.9rem; font-weight:600;
      cursor:pointer; transition:var(--transition);
    }
    .btn-cancel:hover { background:rgba(255,255,255,.11); }
    .btn-danger {
      display:flex; align-items:center; gap:6px;
      padding:10px 20px; border-radius:10px;
      background:var(--danger); color:#fff; border:none;
      font-family:inherit; font-size:.9rem; font-weight:700;
      cursor:pointer; transition:var(--transition);
    }
    .btn-danger:hover { background:#e62c21; }

    /* ── ERROR INLINE ── */
    .field-err {
      font-size:.76rem; color:var(--danger); margin-top:5px;
      display:none; align-items:center; gap:4px;
    }
    .field-err.show { display:flex; }
    .field-err i { font-size:.85rem; }

    /* ── CONFIRM ── */
    .confirm-box { text-align:center; padding:10px 0; }
    .confirm-icon { font-size:2.8rem; margin-bottom:14px; }
    .confirm-msg { font-size:.92rem; color:var(--text-muted); line-height:1.7; margin-bottom:22px; }
    .confirm-actions { display:flex; gap:12px; justify-content:center; }

    /* ── DETAIL VIEW ── */
    .buyer-head {
      display:flex; align-items:center; gap:16px;
      padding:18px; background:rgba(78,141,245,.08);
      border-radius:14px; border:1px solid rgba(78,141,245,.2); margin-bottom:20px;
    }
    .buyer-head-avatar {
      width:54px; height:54px; border-radius:50%;
      background:linear-gradient(135deg,#4e8df5,#3a7de4);
      display:flex; align-items:center; justify-content:center;
      font-size:1.25rem; font-weight:800; color:#fff; flex-shrink:0;
    }
    .buyer-head-name  { font-size:1.1rem; font-weight:800; }
    .buyer-head-email { font-size:.8rem; color:var(--text-muted); margin-top:2px; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .detail-block {
      background:rgba(255,255,255,.04); padding:13px; border-radius:10px;
      border:1px solid var(--border);
    }
    .detail-block.full { grid-column:1/-1; }
    .detail-label { font-size:.7rem; color:var(--text-muted); margin-bottom:5px; text-transform:uppercase; letter-spacing:.4px; }
    .detail-value { font-size:.95rem; font-weight:700; color:var(--light); }
    @media(max-width:540px){ .detail-grid{ grid-template-columns:1fr; } }

    /* ── UNIT CARDS (in detail view) ── */
    .u-card {
      background:rgba(13,33,66,.5); border:1px solid rgba(78,141,245,.15);
      border-radius:12px; padding:16px; margin-bottom:12px;
      transition:transform .2s,border-color .2s;
    }
    .u-card:hover { transform:translateY(-2px); border-color:rgba(78,141,245,.35); }
    .u-card-head {
      display:flex; justify-content:space-between; align-items:flex-start;
      margin-bottom:12px; padding-bottom:12px;
      border-bottom:1px dashed rgba(255,255,255,.08);
    }
    .u-card-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .u-cell { background:rgba(0,0,0,.2); padding:9px 12px; border-radius:8px; }
    .u-cell-lbl { font-size:.68rem; color:var(--text-muted); margin-bottom:3px; }
    .u-cell-val { font-size:.88rem; font-weight:700; }

    /* ── TOAST ── */
    #by-toast {
      position:fixed; bottom:22px; right:22px; z-index:9999;
      display:flex; flex-direction:column; gap:8px; pointer-events:none;
    }
    .by-toast {
      display:flex; align-items:center; gap:10px;
      padding:12px 18px; border-radius:12px;
      background:rgba(8,18,38,.98); border:1px solid var(--border);
      color:var(--light); font-size:.88rem; font-weight:600;
      animation:slideDown .24s ease; box-shadow:0 8px 24px rgba(0,0,0,.35);
      pointer-events:all; max-width:320px;
    }
    .by-toast.success { border-color:rgba(52,199,89,.4); }
    .by-toast.error   { border-color:rgba(255,59,48,.4); }
    .by-toast i { font-size:1.1rem; flex-shrink:0; }
    .by-toast.success i { color:var(--success); }
    .by-toast.error   i { color:var(--danger); }

    /* ── RESPONSIVE ── */
    @media(max-width:768px){
      .by-table{ min-width:560px; }
      .by-stats { grid-template-columns:1fr 1fr; }
    }
    @media(max-width:480px){
      .by-stats { grid-template-columns:1fr; }
      .by-toolbar-left { flex-direction:column; align-items:flex-start; }
      .by-search-wrap { max-width:100%; }
    }
  `;

  window.__pages['buyers'] = {
    getCSS: function () { return _css; },
    init: async function () {

      /* ── build full page HTML ── */
      const container = document.getElementById('app-main');
      container.innerHTML = `
        <!-- Modal -->
        <div id="by-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(6px)">
          <div class="by-modal-box">
            <div class="by-modal-head">
              <div class="by-modal-title" id="by-modal-title"></div>
              <button class="by-modal-close" onclick="window.closeModal()"><i class="ri-close-line"></i></button>
            </div>
            <div id="by-modal-body"></div>
          </div>
        </div>
        <!-- Toasts -->
        <div id="by-toast"></div>

        <!-- Sticky toolbar (title + search + buttons) -->
        <div class="by-toolbar">
          <div class="by-toolbar-left">
            <div class="by-title"><i class="ri-group-line"></i>إدارة العملاء</div>
            <div class="by-search-wrap">
              <i class="ri-search-line"></i>
              <input type="text" id="by-search" class="by-search"
                     placeholder="ابحث بالاسم أو الهاتف أو البريد..."
                     oninput="window.handleSearch()">
            </div>
          </div>
          <div class="by-toolbar-right">
            <button id="by-csvBtn" onclick="window.exportCSV()">
              <i class="ri-file-excel-2-line"></i>تصدير CSV
            </button>
            <button id="by-addBtn" onclick="window.openAddBuyer()">
              <i class="ri-add-line"></i>إضافة عميل
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="by-stats" id="by-stats"></div>

        <!-- Table -->
        <div id="by-table-wrap">
          <div class="loader-box"><div class="spinner"></div></div>
        </div>

        <!-- Pagination -->
        <div class="by-pag" id="by-pag"></div>
      `;

      /* ── modal events ── */
      document.getElementById('by-modal').addEventListener('click', e => {
        if (e.target === document.getElementById('by-modal')) closeModal();
      }, { signal: window.__pageAbortSignal });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
      }, { signal: window.__pageAbortSignal });

      /* ════ CONFIG ════ */
      const API_BASE = `http://${window.location.hostname}:5256`;
      const PER_PAGE = 10;
      const S = { page:1, data:[], filtered:[], units:[], bookings:[], projects:[], buildings:[], floors:[] };

      /* ════ API ════ */
      function getToken() {
        let t = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!t) { try { const a = JSON.parse(localStorage.getItem('authData')||'{}'); t = a.token||a.authToken; } catch {} }
        return t || '';
      }
      async function api(method, path, body) {
        const t = getToken();
        if (!t) { toast('يرجى تسجيل الدخول أولاً','error'); return null; }
        const opts = { method, headers:{'Content-Type':'application/json','Authorization':`Bearer ${t}`} };
        if (body !== undefined) opts.body = JSON.stringify(body);
        const r = await fetch(API_BASE + path, opts);
        if (!r.ok) {
          if (r.status === 401 || r.status === 403) {
            localStorage.clear();
            window.location.replace('/unauth.html');
            return;
          }
          let msg = `خطأ ${r.status}`;
          try { const e = await r.json(); msg = e.message||e.title||msg; } catch {}
          throw new Error(msg);
        }
        if (r.status === 204) return null;
        return r.json().catch(() => null);
      }
      const GET    = p     => api('GET',    p);
      const POST   = (p,b) => api('POST',   p, b);
      const PUT    = (p,b) => api('PUT',    p, b);
      const DELETE = p     => api('DELETE', p);
      function arr(v) { return Array.isArray(v) ? v : (v?.data||v?.items||v?.value||[]); }

      /* ════ UTILS ════ */
      function toast(msg, type='success') {
        const el = document.createElement('div');
        el.className = `by-toast ${type}`;
        el.innerHTML = `<i class="ri-${type==='success'?'checkbox-circle':'error-warning'}-line"></i><span>${msg}</span>`;
        document.getElementById('by-toast').appendChild(el);
        setTimeout(() => { el.style.opacity='0'; el.style.transition='.3s'; setTimeout(()=>el.remove(),320); }, 3200);
      }
      function openModal(title, html) {
        document.getElementById('by-modal-title').textContent = title;
        document.getElementById('by-modal-body').innerHTML   = html;
        document.getElementById('by-modal').style.display   = 'flex';
      }
      function closeModal() {
        document.getElementById('by-modal').style.display  = 'none';
        document.getElementById('by-modal-body').innerHTML = '';
      }
      window.closeModal = closeModal;

      function v(id)  { const el=document.getElementById(id); return el?el.value.trim():''; }
      function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

      function translateError(msg) {
        if(!msg) return 'حدث خطأ غير معروف';
        const m = msg.toLowerCase();
        if(m.includes('email') || m.includes('البريد')) return 'البريد الإلكتروني مسجل مسبقاً';
        if(m.includes('phone') || m.includes('هاتف')) return 'رقم الهاتف مسجل مسبقاً';
        if(m.includes('national') || m.includes('وطني')) return 'الرقم الوطني مسجل مسبقاً';
        if(m.includes('unique') || m.includes('duplicate') || (m.includes('already') && m.includes('exist')) || m.includes('ix_') || m.includes('uq_'))
          return 'هذه البيانات مسجلة مسبقاً — يرجى التحقق من القيم المكررة';
        if(m.includes('foreign key') || m.includes('reference')) return 'لا يمكن تنفيذ العملية — توجد بيانات مرتبطة';
        if(m.includes('not found') || m.includes('404')) return 'العنصر غير موجود';
        if(m.includes('unauthorized') || m.includes('401')) return 'غير مصرح — يرجى تسجيل الدخول';
        return msg;
      }
      function fmtDate(d) { if(!d)return'—'; try{return new Date(d).toLocaleDateString('ar-SA',{year:'numeric',month:'short',day:'numeric'});}catch{return'—';} }
      function initials(fn,ln) { return ((fn||'').charAt(0)+(ln||'').charAt(0)).toUpperCase()||'؟'; }
      function setBusy(id, busy, lbl='حفظ') {
        const el=document.getElementById(id); if(!el)return;
        el.disabled=busy;
        el.innerHTML=busy
          ? '<i class="ri-loader-4-line" style="animation:spin .8s linear infinite;display:inline-block"></i> جاري...'
          : `<i class="ri-save-line"></i>${lbl}`;
      }

      /* ════ ACTIVE UNIT CHECK ════ */
      function isActiveUnit(u) {
        if (u.isDeleted===true||u.deleted===true) return false;
        if (u.isActive===false||u.active===false)  return false;
        if (u.status===4||u.status==='Deleted')    return false;
        return true;
      }
      function getBuyerUnits(buyerId) {
        return S.units.filter(u => Number(u.buyerId)===Number(buyerId) && isActiveUnit(u));
      }

      /* ════ SEARCH ════ */
      let _st = null;
      function handleSearch() {
        clearTimeout(_st);
        _st = setTimeout(() => {
          const q = (document.getElementById('by-search')?.value||'').toLowerCase().trim();
          S.filtered = S.data.filter(b =>
            (`${b.firstName||''} ${b.lastName||''}`).toLowerCase().includes(q) ||
            (b.email||'').toLowerCase().includes(q) ||
            (b.phoneNumber||'').includes(q) ||
            (b.nationalId||'').includes(q)
          );
          S.page = 1; renderTable();
        }, 180);
      }
      window.handleSearch = handleSearch;

      /* ════ STATS ════ */
      function renderStats() {
        const total = S.data.length;
        const activeUnits = S.units.filter(isActiveUnit);
        const buyerIdsWithUnits = new Set(activeUnits.filter(u=>u.buyerId).map(u=>Number(u.buyerId)));
        S.bookings.filter(b=>b.buyerId&&b.status!==3&&b.status!=='Cancelled').forEach(b=>{
          const u = S.units.find(u=>Number(u.id)===Number(b.unitId));
          if(u&&isActiveUnit(u)) buyerIdsWithUnits.add(Number(b.buyerId));
        });
        const withUnits = S.data.filter(b=>buyerIdsWithUnits.has(b.id)).length;
        const el = document.getElementById('by-stats');
        if (!el) return;
        el.innerHTML = `
          <div class="by-stat"><div class="by-stat-icon blue"><i class="ri-group-line"></i></div>
            <div><div class="by-stat-num">${total}</div><div class="by-stat-lbl">إجمالي العملاء</div></div></div>
          <div class="by-stat"><div class="by-stat-icon green"><i class="ri-home-heart-line"></i></div>
            <div><div class="by-stat-num">${withUnits}</div><div class="by-stat-lbl">عملاء لديهم وحدات</div></div></div>
          <div class="by-stat"><div class="by-stat-icon gray"><i class="ri-user-search-line"></i></div>
            <div><div class="by-stat-num">${total-withUnits}</div><div class="by-stat-lbl">بدون وحدات</div></div></div>`;
      }

      /* ════ TABLE ════ */
      function renderTable() {
        const wrap = document.getElementById('by-table-wrap');
        const pag  = document.getElementById('by-pag');
        if (!wrap) return;
        if (!S.filtered.length) {
          wrap.innerHTML = '<div class="by-empty"><i class="ri-group-line"></i>لا يوجد عملاء مطابقون</div>';
          if(pag) pag.innerHTML=''; return;
        }
        const page = S.filtered.slice((S.page-1)*PER_PAGE, S.page*PER_PAGE);
        wrap.innerHTML = `
          <div class="by-table-wrap">
            <div class="by-table-scroll">
              <table class="by-table">
                <thead><tr>
                  <th>العميل</th><th>رقم الهاتف</th><th>الرقم الوطني</th>
                  <th>الوحدات</th><th>العنوان</th><th>تاريخ التسجيل</th><th></th>
                </tr></thead>
                <tbody>
                ${page.map(b => {
                  const cnt = getBuyerUnits(b.id).length;
                  return `<tr>
                    <td><div class="by-name-cell">
                      <div class="by-avatar">${initials(b.firstName,b.lastName)}</div>
                      <div>
                        <div class="by-name">${esc(b.firstName||'')} ${esc(b.lastName||'')}</div>
                        <div class="by-email">${esc(b.email||'')}</div>
                      </div></div></td>
                    <td><span style="direction:ltr;display:inline-block">${esc(b.phoneNumber||'—')}</span></td>
                    <td style="font-family:monospace;font-size:.82rem">${esc(b.nationalId||'—')}</td>
                    <td><span class="by-unit-badge ${cnt>0?'has':'none'}">
                      <i class="ri-home-line"></i>${cnt>0?cnt+' وحدة':'لا يوجد'}
                    </span></td>
                    <td style="color:var(--text-muted);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(b.address||'—')}</td>
                    <td style="color:var(--text-muted)">${fmtDate(b.createdAt)}</td>
                    <td><div class="by-row-actions">
                      <div class="by-icon-btn view" onclick="window.viewBuyer(${b.id})" title="عرض"><i class="ri-eye-line"></i></div>
                      <div class="by-icon-btn edit" onclick="window.editBuyer(${b.id})" title="تعديل"><i class="ri-edit-line"></i></div>
                      <div class="by-icon-btn del"  onclick="window.deleteBuyer(${b.id},'${esc(b.firstName)} ${esc(b.lastName)}')" title="حذف"><i class="ri-delete-bin-line"></i></div>
                    </div></td>
                  </tr>`;
                }).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
        /* pagination */
        const pages = Math.ceil(S.filtered.length/PER_PAGE);
        if (!pag) return;
        if (pages<=1){pag.innerHTML='';return;}
        let h=`<button class="pg-btn" onclick="window.goPage(${S.page-1})" ${S.page===1?'disabled':''}>السابق</button>`;
        for(let i=1;i<=pages;i++) h+=`<button class="pg-btn ${S.page===i?'active':''}" onclick="window.goPage(${i})">${i}</button>`;
        h+=`<button class="pg-btn" onclick="window.goPage(${S.page+1})" ${S.page===pages?'disabled':''}>التالي</button>`;
        pag.innerHTML=h;
      }
      window.goPage = p => { S.page=p; renderTable(); window.scrollTo({top:0,behavior:'smooth'}); };

      /* ════ LOAD ════ */
      async function loadBuyers() {
        const wrap = document.getElementById('by-table-wrap');
        if(wrap) wrap.innerHTML='<div class="loader-box"><div class="spinner"></div></div>';
        try {
          const [bd,ud,bkd,pd,bld,fd] = await Promise.all([
            GET('/api/Buyers'),
            GET('/api/Units').catch(()=>[]),
            GET('/api/Bookings').catch(()=>[]),
            GET('/api/Projects').catch(()=>[]),
            GET('/api/Buildings').catch(()=>[]),
            GET('/api/Floors').catch(()=>[]),
          ]);
          S.data      = arr(bd).sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
          S.units     = arr(ud);
          S.bookings  = arr(bkd);
          S.projects  = arr(pd);
          S.buildings = arr(bld);
          S.floors    = arr(fd);
          S.filtered  = [...S.data];
          renderStats(); renderTable();
        } catch(e) {
          console.error(e); toast('فشل تحميل بيانات العملاء','error');
          if(wrap) wrap.innerHTML='<div class="by-empty"><i class="ri-wifi-off-line"></i>فشل الاتصال بالخادم</div>';
        }
      }

      /* ════ VIEW ════ */
      async function viewBuyer(id) {
        try {
          const b = await GET(`/api/Buyers/${id}`);
          const buyerUnits = getBuyerUnits(id);
          let unitsHtml = `<div style="text-align:center;padding:14px;color:var(--text-muted);background:rgba(255,255,255,.02);border-radius:10px;">لا توجد وحدات مرتبطة بهذا العميل</div>`;
          if (buyerUnits.length) {
            unitsHtml = buyerUnits.map(u => {
              const stAr  = (u.status===3||u.status==='Sold') ? 'مباع' : 'محجوز';
              const stCol = (u.status===3||u.status==='Sold') ? 'var(--danger)' : 'var(--warning)';
              const price = u.price ? Number(u.price).toLocaleString('ar-SA')+' ر.س' : '—';
              const bk    = S.bookings.find(bk=>Number(bk.unitId)===Number(u.id)&&bk.status!==3&&bk.status!=='Cancelled');
              const paid  = bk?.amountPaid     ? Number(bk.amountPaid).toLocaleString('ar-SA')+' ر.س' : '0 ر.س';
              const remain= bk?.remainingAmount ? Number(bk.remainingAmount).toLocaleString('ar-SA')+' ر.س' : '0 ر.س';
              const floor = S.floors.find(f=>f.id===u.floorId);
              const bld   = S.buildings.find(x=>x.id===floor?.buildingId);
              const proj  = S.projects.find(x=>x.id===bld?.projectId);
              const loc   = [proj?.name?`مشروع ${proj.name}`:'',bld?.name?`مبنى ${bld.name}`:'',floor?.floorNumber?`الدور ${floor.floorNumber}`:''].filter(Boolean).join(' • ');
              return `<div class="u-card">
                <div class="u-card-head">
                  <div>
                    <div style="font-size:1rem;font-weight:800;display:flex;align-items:center;gap:6px;">
                      <i class="ri-home-office-line" style="color:var(--accent)"></i> وحدة ${esc(String(u.unitNumber||'—'))}
                      <span style="font-size:.68rem;background:rgba(255,255,255,.06);padding:2px 8px;border-radius:6px;color:var(--text-muted)">${u.type===3?'روف':'عادي'}</span>
                    </div>
                    <div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">${loc||'—'}</div>
                  </div>
                  <span style="font-size:.72rem;font-weight:700;padding:4px 12px;border-radius:20px;border:1px solid ${stCol}40;color:${stCol}">${stAr}</span>
                </div>
                <div class="u-card-grid">
                  <div class="u-cell"><div class="u-cell-lbl">السعر</div><div class="u-cell-val">${price}</div></div>
                  <div class="u-cell"><div class="u-cell-lbl">المساحة</div><div class="u-cell-val">${u.area?u.area+' م²':'—'}</div></div>
                  <div class="u-cell" style="background:rgba(52,199,89,.05);border:1px solid rgba(52,199,89,.1)"><div class="u-cell-lbl">المدفوع</div><div class="u-cell-val" style="color:var(--success)">${paid}</div></div>
                  <div class="u-cell" style="background:rgba(255,204,0,.05);border:1px solid rgba(255,204,0,.1)"><div class="u-cell-lbl">المتبقي</div><div class="u-cell-val" style="color:var(--warning)">${remain}</div></div>
                </div>
              </div>`;
            }).join('');
          }
          openModal('تفاصيل العميل', `
            <div class="by-modal-body">
              <div class="buyer-head">
                <div class="buyer-head-avatar">${initials(b.firstName,b.lastName)}</div>
                <div>
                  <div class="buyer-head-name">${esc(b.firstName||'')} ${esc(b.lastName||'')}</div>
                  <div class="buyer-head-email">${esc(b.email||'')}</div>
                </div>
              </div>
              <div class="detail-grid">
                <div class="detail-block"><div class="detail-label">رقم الهاتف</div><div class="detail-value" style="direction:ltr;text-align:right">${esc(b.phoneNumber||'—')}</div></div>
                <div class="detail-block"><div class="detail-label">الرقم الوطني</div><div class="detail-value" style="font-family:monospace">${esc(b.nationalId||'—')}</div></div>
                <div class="detail-block full"><div class="detail-label">العنوان</div><div class="detail-value">${esc(b.address||'—')}</div></div>
                <div class="detail-block"><div class="detail-label">تاريخ التسجيل</div><div class="detail-value">${fmtDate(b.createdAt)}</div></div>
                <div class="detail-block"><div class="detail-label">معرّف العميل</div><div class="detail-value" style="color:var(--text-muted)">#${b.id}</div></div>
              </div>
              <div style="margin-top:22px">
                <h4 style="font-size:1rem;font-weight:700;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:10px;margin-bottom:14px">
                  الوحدات المرتبطة
                  ${buyerUnits.length?`<span style="font-size:.72rem;background:rgba(52,199,89,.12);color:var(--success);padding:2px 10px;border-radius:20px;margin-right:8px">${buyerUnits.length} وحدة</span>`:''}
                </h4>
                <div style="max-height:300px;overflow-y:auto;padding-left:2px">${unitsHtml}</div>
              </div>
            </div>
            <div class="by-modal-footer">
              <button class="btn-submit" onclick="window.closeModal();window.editBuyer(${b.id})"><i class="ri-edit-line"></i>تعديل</button>
              <button class="btn-cancel" onclick="window.closeModal()">إغلاق</button>
            </div>`);
        } catch { toast('فشل تحميل بيانات العميل','error'); }
      }
      window.viewBuyer = viewBuyer;

      /* ════ ADD ════ */
      function openAddBuyer() {
        openModal('إضافة عميل جديد', `
          <div class="by-modal-body">
            <div class="fr">
              <div class="fg"><label class="fl">الاسم الأول *</label><input id="f-fn" class="fi" placeholder="الاسم الأول">
                <div class="field-err" id="err-fn"><i class="ri-error-warning-line"></i><span></span></div></div>
              <div class="fg"><label class="fl">اسم العائلة *</label><input id="f-ln" class="fi" placeholder="اسم العائلة">
                <div class="field-err" id="err-ln"><i class="ri-error-warning-line"></i><span></span></div></div>
            </div>
            <div class="fg"><label class="fl">البريد الإلكتروني *</label>
              <input id="f-em" class="fi" type="email" placeholder="example@email.com" style="direction:ltr;text-align:left">
              <div class="field-err" id="err-em"><i class="ri-error-warning-line"></i><span></span></div></div>
            <div class="fg"><label class="fl">كلمة المرور *</label>
              <input id="f-pw" class="fi" type="password" placeholder="كلمة المرور">
              <div class="field-err" id="err-pw"><i class="ri-error-warning-line"></i><span></span></div></div>
            <div class="fr">
              <div class="fg"><label class="fl">رقم الهاتف *</label>
                <input id="f-ph" class="fi" placeholder="05xxxxxxxx" style="direction:ltr;text-align:right">
                <div class="field-err" id="err-ph"><i class="ri-error-warning-line"></i><span></span></div></div>
              <div class="fg"><label class="fl">الرقم الوطني</label><input id="f-ni" class="fi" placeholder="اختياري"></div>
            </div>
            <div class="fg"><label class="fl">العنوان</label><input id="f-ad" class="fi" placeholder="اختياري"></div>
          </div>
          <div class="by-modal-footer">
            <button class="btn-submit" id="submitBtn" onclick="window.submitAddBuyer()"><i class="ri-save-line"></i>حفظ</button>
            <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
          </div>`);
      }
      window.openAddBuyer = openAddBuyer;

      function showErr(id, msg) {
        const el = document.getElementById(id); if(!el)return;
        el.classList.add('show'); el.querySelector('span').textContent = msg;
      }
      function clearErrs() {
        document.querySelectorAll('.field-err').forEach(e=>e.classList.remove('show'));
      }

      async function submitAddBuyer() {
        clearErrs();
        const fn=v('f-fn'), ln=v('f-ln'), em=v('f-em'), pw=v('f-pw'), ph=v('f-ph');
        let ok=true;
        if(!fn){showErr('err-fn','الاسم الأول مطلوب');ok=false;}
        if(!ln){showErr('err-ln','اسم العائلة مطلوب');ok=false;}
        if(!em){showErr('err-em','البريد الإلكتروني مطلوب');ok=false;}
        else if(!/\S+@\S+\.\S+/.test(em)){showErr('err-em','البريد الإلكتروني غير صحيح');ok=false;}
        if(!pw){showErr('err-pw','كلمة المرور مطلوبة');ok=false;}
        else if(pw.length<6){showErr('err-pw','كلمة المرور يجب أن تكون 6 أحرف على الأقل');ok=false;}
        if(!ph){showErr('err-ph','رقم الهاتف مطلوب');ok=false;}
        if(!ok)return;
        /* check duplicate email */
        if(S.data.find(b=>b.email?.toLowerCase()===em.toLowerCase())){
          showErr('err-em','هذا البريد الإلكتروني مسجل مسبقاً'); return;
        }
        setBusy('submitBtn',true);
        try {
          await POST('/api/Buyers',{firstName:fn,lastName:ln,email:em,password:pw,phoneNumber:ph,address:v('f-ad')||null,nationalId:v('f-ni')||null});
          toast('تم إضافة العميل بنجاح'); closeModal(); await loadBuyers();
        } catch(e) {
          const msg = e.message||'';
          const m = msg.toLowerCase();
          if(m.includes('email')||m.includes('بريد')) showErr('err-em', 'البريد الإلكتروني مسجل مسبقاً');
          else if(m.includes('phone')||m.includes('هاتف')) showErr('err-ph','رقم الهاتف مسجل مسبقاً');
          else if(m.includes('national')||m.includes('وطني')) showErr('err-ni'&&document.getElementById('err-ni')?'err-ni':'err-ph','الرقم الوطني مسجل مسبقاً');
          else toast(`فشل الإضافة: ${translateError(msg)}`,'error');
        }
        setBusy('submitBtn',false);
      }
      window.submitAddBuyer = submitAddBuyer;

      /* ════ EDIT ════ */
      async function editBuyer(id) {
        try {
          const b = await GET(`/api/Buyers/${id}`);
          openModal('تعديل بيانات العميل', `
            <div class="by-modal-body">
              <div class="fr">
                <div class="fg"><label class="fl">الاسم الأول *</label><input id="f-fn" class="fi" value="${esc(b.firstName||'')}">
                  <div class="field-err" id="err-fn"><i class="ri-error-warning-line"></i><span></span></div></div>
                <div class="fg"><label class="fl">اسم العائلة *</label><input id="f-ln" class="fi" value="${esc(b.lastName||'')}">
                  <div class="field-err" id="err-ln"><i class="ri-error-warning-line"></i><span></span></div></div>
              </div>
              <div class="fg"><label class="fl">البريد الإلكتروني *</label>
                <input id="f-em" class="fi" type="email" style="direction:ltr;text-align:left" value="${esc(b.email||'')}">
                <div class="field-err" id="err-em"><i class="ri-error-warning-line"></i><span></span></div></div>
              <div class="fr">
                <div class="fg"><label class="fl">رقم الهاتف *</label>
                  <input id="f-ph" class="fi" style="direction:ltr;text-align:right" value="${esc(b.phoneNumber||'')}">
                  <div class="field-err" id="err-ph"><i class="ri-error-warning-line"></i><span></span></div></div>
                <div class="fg"><label class="fl">الرقم الوطني</label><input id="f-ni" class="fi" value="${esc(b.nationalId||'')}"></div>
              </div>
              <div class="fg"><label class="fl">العنوان</label><input id="f-ad" class="fi" value="${esc(b.address||'')}"></div>
            </div>
            <div class="by-modal-footer">
              <button class="btn-submit" id="submitBtn" onclick="window.submitEditBuyer(${id})"><i class="ri-save-line"></i>حفظ التعديلات</button>
              <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
            </div>`);
        } catch { toast('فشل تحميل بيانات العميل','error'); }
      }
      window.editBuyer = editBuyer;

      async function submitEditBuyer(id) {
        clearErrs();
        const fn=v('f-fn'), ln=v('f-ln'), em=v('f-em'), ph=v('f-ph');
        let ok=true;
        if(!fn){showErr('err-fn','الاسم الأول مطلوب');ok=false;}
        if(!ln){showErr('err-ln','اسم العائلة مطلوب');ok=false;}
        if(!em){showErr('err-em','البريد الإلكتروني مطلوب');ok=false;}
        else if(!/\S+@\S+\.\S+/.test(em)){showErr('err-em','البريد الإلكتروني غير صحيح');ok=false;}
        if(!ph){showErr('err-ph','رقم الهاتف مطلوب');ok=false;}
        if(!ok)return;
        /* duplicate check (exclude current buyer) */
        if(S.data.find(b=>b.id!==id&&b.email?.toLowerCase()===em.toLowerCase())){
          showErr('err-em','هذا البريد الإلكتروني مسجل مسبقاً'); return;
        }
        setBusy('submitBtn',true,'حفظ التعديلات');
        try {
          await PUT(`/api/Buyers/${id}`,{firstName:fn,lastName:ln,email:em,phoneNumber:ph,address:v('f-ad')||null,nationalId:v('f-ni')||null});
          toast('تم تعديل بيانات العميل'); closeModal(); await loadBuyers();
        } catch(e) {
          const msg=e.message||'';
          const m=msg.toLowerCase();
          if(m.includes('email')||m.includes('بريد')) showErr('err-em','البريد الإلكتروني مسجل مسبقاً');
          else if(m.includes('phone')||m.includes('هاتف')) showErr('err-ph','رقم الهاتف مسجل مسبقاً');
          else if(m.includes('national')||m.includes('وطني')) showErr('err-ph','الرقم الوطني مسجل مسبقاً');
          else toast(`فشل التعديل: ${translateError(msg)}`,'error');
        }
        setBusy('submitBtn',false,'حفظ التعديلات');
      }
      window.submitEditBuyer = submitEditBuyer;

      /* ════ DELETE ════ */
      function deleteBuyer(id, name) {
        openModal('حذف العميل', `
          <div class="by-modal-body">
            <div class="confirm-box">
              <div class="confirm-icon">🗑️</div>
              <p class="confirm-msg">هل أنت متأكد من حذف العميل <strong>${esc(name)}</strong>؟<br>لا يمكن التراجع عن هذا الإجراء.</p>
              <div class="confirm-actions">
                <button class="btn-danger" id="submitBtn" onclick="window.confirmDeleteBuyer(${id})">
                  <i class="ri-delete-bin-line"></i>نعم، احذف
                </button>
                <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
              </div>
            </div>
          </div>`);
      }
      window.deleteBuyer = deleteBuyer;

      async function confirmDeleteBuyer(id) {
        setBusy('submitBtn',true,'جاري الحذف');
        try {
          await DELETE(`/api/Buyers/${id}`);
          toast('تم حذف العميل بنجاح'); closeModal(); await loadBuyers();
        } catch(e) {
          toast(`فشل الحذف: ${translateError(e.message)}`,'error');
          setBusy('submitBtn',false,'احذف');
        }
      }
      window.confirmDeleteBuyer = confirmDeleteBuyer;

      /* ════ CSV ════ */
      function exportCSV() {
        if(!S.filtered.length){toast('لا توجد بيانات للتصدير','error');return;}
        const headers=['الاسم الأول','اسم العائلة','البريد الإلكتروني','رقم الهاتف','الرقم الوطني','العنوان','عدد الوحدات','تاريخ التسجيل'];
        const rows=S.filtered.map(b=>{
          const cnt=getBuyerUnits(b.id).length;
          return [b.firstName||'',b.lastName||'',b.email||'',b.phoneNumber||'',b.nationalId||'',b.address||'',cnt,
            b.createdAt?new Date(b.createdAt).toLocaleDateString('ar-SA'):'']
            .map(c=>{const s=String(c);return(s.includes(',')||s.includes('"')||s.includes('\n'))?`"${s.replace(/"/g,'""')}"`:s;});
        });
        const csv='\uFEFF'+[headers,...rows].map(r=>r.join(',')).join('\n');
        const a=document.createElement('a');
        a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
        a.download=`العملاء_${new Date().toLocaleDateString('ar-SA').replace(/\//g,'-')}.csv`;
        document.body.appendChild(a);a.click();document.body.removeChild(a);
        toast(`تم تصدير ${S.filtered.length} عميل`);
      }
      window.exportCSV = exportCSV;

      /* ════ KICK OFF ════ */
      await loadBuyers();
    }
  };
})();