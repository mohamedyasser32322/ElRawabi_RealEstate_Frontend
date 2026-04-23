/* PAGE MODULE: Users (المستخدمين) — SPA v3 */
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
    @keyframes users-fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes users-fadeUp  { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
    @keyframes users-spin    { to { transform: rotate(360deg); } }
    @keyframes users-slideDown{ from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }

    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:var(--primary-deep)}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:6px}

    /* ── STICKY TOOLBAR ── */
    .us-toolbar {
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
    @media(max-width:1024px){ .us-toolbar{ margin:-24px -16px 20px; padding:10px 16px; } }

    .us-toolbar-left  { display:flex; align-items:center; gap:10px; flex:1; min-width:0; }
    .us-toolbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; flex-wrap:wrap; }

    .us-title {
      font-size:1.1rem; font-weight:800; color:var(--light);
      display:flex; align-items:center; gap:8px; white-space:nowrap;
    }
    .us-title i { color:var(--accent); font-size:1.2rem; }

    .us-add-btn {
      display:flex; align-items:center; gap:7px;
      padding:9px 18px; border-radius:10px;
      background:var(--accent); color:#fff; border:none;
      font-family:inherit; font-size:.88rem; font-weight:700;
      cursor:pointer; transition:var(--transition); white-space:nowrap;
    }
    .us-add-btn:hover { background:#3a7de4; transform:translateY(-1px); box-shadow:0 6px 18px rgba(78,141,245,.35); }

    /* ── TABLE ── */
    .us-table-wrap {
      background:var(--card-bg); border:1px solid var(--border);
      border-radius:16px; overflow:hidden; animation:users-fadeUp .4s ease both;
    }
    .us-table-scroll { overflow-x:auto; }
    .us-table { width:100%; border-collapse:collapse; min-width:620px; }
    .us-table thead tr { background:rgba(255,255,255,.025); border-bottom:1px solid var(--border); }
    .us-table thead th {
      padding:13px 16px; text-align:right;
      font-size:.75rem; font-weight:700; color:var(--text-muted);
      text-transform:uppercase; letter-spacing:.5px; white-space:nowrap;
    }
    .us-table tbody tr { border-bottom:1px solid var(--border); transition:background .18s; }
    .us-table tbody tr:last-child { border-bottom:none; }
    .us-table tbody tr:hover { background:rgba(78,141,245,.06); }
    .us-table tbody td { padding:13px 16px; font-size:.88rem; color:var(--light); vertical-align:middle; }

    .us-user-cell { display:flex; align-items:center; gap:12px; }
    .us-avatar {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,var(--accent),#3a7de4);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-weight:700; font-size:1rem; flex-shrink:0;
    }
    .us-name  { font-weight:700; font-size:.9rem; }
    .us-email { font-size:.75rem; color:var(--text-muted); margin-top:1px; }

    .us-role-badge {
      display:inline-flex; align-items:center; gap:5px;
      padding:4px 11px; border-radius:20px; font-size:.75rem; font-weight:700; white-space:nowrap;
    }
    .us-role-admin    { background:rgba(255,193,7,.15);  color:#ffb300; border:1px solid rgba(255,193,7,.3); }
    .us-role-booking  { background:rgba(78,141,245,.15); color:#4e8df5; border:1px solid rgba(78,141,245,.3); }
    .us-role-engineer { background:rgba(52,199,89,.15);  color:#34c759; border:1px solid rgba(52,199,89,.3); }

    .us-status-badge {
      display:inline-flex; align-items:center; gap:5px;
      padding:4px 11px; border-radius:20px; font-size:.75rem; font-weight:700;
    }
    .us-status-active   { background:rgba(52,199,89,.15); color:#34c759; border:1px solid rgba(52,199,89,.3); }
    .us-status-inactive { background:rgba(255,59,48,.15); color:#ff3b30; border:1px solid rgba(255,59,48,.3); }

    .us-actions { display:flex; gap:6px; justify-content:flex-end; }
    .us-action-btn {
      width:30px; height:30px; border-radius:8px;
      border:1px solid var(--border); background:rgba(255,255,255,.05);
      color:var(--text-muted); cursor:pointer; font-size:.9rem;
      display:flex; align-items:center; justify-content:center;
      transition:var(--transition);
    }
    .us-action-btn:hover       { background:rgba(78,141,245,.18); color:var(--accent); border-color:var(--accent); }
    .us-action-btn.del:hover   { background:rgba(255,59,48,.18);  color:var(--danger);  border-color:var(--danger); }

    /* ── LOADER / EMPTY ── */
    .us-loader { display:flex; align-items:center; justify-content:center; min-height:300px; }
    .us-spinner { width:44px; height:44px; border:3px solid rgba(255,255,255,.08); border-top-color:var(--accent); border-radius:50%; animation:users-spin .75s linear infinite; }
    .us-empty { text-align:center; padding:60px 20px; color:var(--text-muted); font-size:.95rem; }
    .us-empty i { font-size:2.5rem; display:block; margin-bottom:12px; opacity:.35; }

    /* ── MODAL ── */
    #us-modal {
      display:none; position:fixed; inset:0;
      background:rgba(0,0,0,.65); z-index:1000;
      align-items:center; justify-content:center;
      backdrop-filter:blur(6px); animation:users-fadeIn .2s ease;
    }
    .us-modal-box {
      background:rgba(13,33,66,.98); border:1px solid rgba(255,255,255,.12);
      border-radius:20px; max-width:500px; width:94%;
      max-height:90vh; overflow-y:auto;
      box-shadow:0 24px 56px rgba(0,0,0,.5);
      animation:users-slideDown .25s cubic-bezier(.34,1.3,.64,1);
    }
    .us-modal-head {
      padding:22px 26px 16px; border-bottom:1px solid var(--border);
      display:flex; justify-content:space-between; align-items:center;
      position:sticky; top:0; background:rgba(13,33,66,.99); z-index:2;
      border-radius:20px 20px 0 0;
    }
    .us-modal-title { font-size:1.05rem; font-weight:800; color:var(--light); }
    .us-modal-close {
      background:none; border:none; color:var(--text-muted);
      font-size:1.35rem; cursor:pointer; transition:var(--transition);
    }
    .us-modal-close:hover { color:var(--light); transform:rotate(90deg); }
    .us-modal-body   { padding:22px 26px; }
    .us-modal-footer {
      padding:16px 26px; border-top:1px solid var(--border);
      display:flex; gap:10px; justify-content:flex-end;
      background:rgba(0,0,0,.15); border-radius:0 0 20px 20px;
      position:sticky; bottom:0;
    }

    /* ── FORM ── */
    .us-fg { margin-bottom:14px; }
    .us-fl { display:block; font-size:.84rem; font-weight:700; margin-bottom:7px; color:var(--light); }
    .us-fi, .us-fsel {
      width:100%; padding:11px 13px; border-radius:10px;
      background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.1);
      color:var(--light); font-family:inherit; font-size:.9rem;
      transition:var(--transition);
    }
    .us-fi::placeholder { color:var(--text-muted); }
    .us-fi:focus, .us-fsel:focus {
      outline:none; background:rgba(255,255,255,.09);
      border-color:var(--accent); box-shadow:0 0 0 3px rgba(78,141,245,.13);
    }
    /* ── Dropdown: dark bg + smooth ── */
    .us-fsel {
      appearance:none; cursor:pointer; color-scheme:dark; color:#dde8ff;
      background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat:no-repeat; background-position:left 12px center; background-size:16px; padding-left:36px;
    }
    .us-fsel:focus { animation:us-dropOpen .18s cubic-bezier(.4,0,.2,1); }
    @keyframes us-dropOpen { from{opacity:.8;transform:scaleY(.97)} to{opacity:1;transform:scaleY(1)} }
    .us-fsel option { background:#0d2040; color:#dde8ff; }

    .us-fr { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

    .us-status-toggle {
      display:flex; align-items:center; justify-content:space-between;
      padding:13px 15px; background:rgba(255,255,255,.03);
      border-radius:10px; border:1px solid rgba(255,255,255,.1); margin-bottom:14px;
    }
    .us-status-toggle-label { display:flex; align-items:center; gap:8px; font-weight:600; font-size:.88rem; }
    .us-status-text { font-size:.85rem; font-weight:700; min-width:40px; }
    .us-toggle-cb { width:18px; height:18px; cursor:pointer; accent-color:var(--accent); }

    /* ── ERROR INLINE ── */
    .us-field-err {
      font-size:.76rem; color:var(--danger); margin-top:5px;
      display:none; align-items:center; gap:4px;
    }
    .us-field-err.show { display:flex; }
    .us-field-err i { font-size:.85rem; }

    /* ── BUTTONS ── */
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

    /* ── CONFIRM ── */
    .confirm-box { text-align:center; padding:10px 0; }
    .confirm-icon { font-size:2.8rem; margin-bottom:14px; }
    .confirm-msg  { font-size:.92rem; color:var(--text-muted); line-height:1.7; margin-bottom:22px; }
    .confirm-actions { display:flex; gap:12px; justify-content:center; }

    /* ── TOAST ── */
    #us-toast {
      position:fixed; bottom:22px; right:22px; z-index:9999;
      display:flex; flex-direction:column; gap:8px; pointer-events:none;
    }
    .us-toast {
      display:flex; align-items:center; gap:10px;
      padding:12px 18px; border-radius:12px;
      background:rgba(8,18,38,.98); border:1px solid var(--border);
      color:var(--light); font-size:.88rem; font-weight:600;
      animation:users-slideDown .24s ease; box-shadow:0 8px 24px rgba(0,0,0,.35);
      pointer-events:all; max-width:320px;
    }
    .us-toast.success { border-color:rgba(52,199,89,.4); }
    .us-toast.error   { border-color:rgba(255,59,48,.4); }
    .us-toast i { font-size:1.1rem; flex-shrink:0; }
    .us-toast.success i { color:var(--success); }
    .us-toast.error   i { color:var(--danger); }

    /* ── RESPONSIVE ── */
    @media(max-width:768px){
      .us-table{ min-width:520px; }
    }
    @media(max-width:480px){
      .us-toolbar-left { flex-direction:column; align-items:flex-start; }
      .us-fr { grid-template-columns:1fr; }
    }
  `;

  window.__pages['users'] = {
    getCSS: function () { return _css; },
    init: async function () {
      const container = document.getElementById('app-main');
      const API_BASE = `http://${window.location.hostname}:5256`;
      let users = [];

      /* ─── Arabic error translator ─── */
      function translateError(msg) {
        if (!msg) return 'حدث خطأ غير معروف';
        const m = msg.toLowerCase();
        if (m.includes('email') || m.includes('البريد') || m.includes('duplicate') && m.includes('email'))
          return 'البريد الإلكتروني مسجل مسبقاً';
        if (m.includes('phone') || m.includes('هاتف'))
          return 'رقم الهاتف مسجل مسبقاً';
        if (m.includes('username') || m.includes('اسم المستخدم'))
          return 'اسم المستخدم مسجل مسبقاً';
        if (m.includes('national') || m.includes('وطني'))
          return 'الرقم الوطني مسجل مسبقاً';
        if (m.includes('unique') || m.includes('duplicate') || m.includes('already exist') || m.includes('ix_') || m.includes('uq_'))
          return 'هذه البيانات مسجلة مسبقاً — يرجى التحقق من القيم المكررة';
        if (m.includes('foreign key') || m.includes('reference'))
          return 'لا يمكن تنفيذ العملية — توجد بيانات مرتبطة';
        if (m.includes('not found') || m.includes('404'))
          return 'العنصر غير موجود';
        if (m.includes('unauthorized') || m.includes('401'))
          return 'غير مصرح — يرجى تسجيل الدخول';
        if (m.includes('forbidden') || m.includes('403'))
          return 'ليس لديك صلاحية لهذه العملية';
        if (m.includes('password') || m.includes('كلمة مرور'))
          return 'كلمة المرور غير صحيحة أو قصيرة جداً';
        return msg;
      }

      /* ─── HTML ─── */
      container.innerHTML = `
        <div id="us-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(6px)">
          <div class="us-modal-box">
            <div class="us-modal-head">
              <div class="us-modal-title" id="us-modal-title">مستخدم جديد</div>
              <button class="us-modal-close" onclick="window.closeModal()"><i class="ri-close-line"></i></button>
            </div>
            <div id="us-modal-body"></div>
          </div>
        </div>

        <div id="us-toast"></div>

        <!-- Sticky toolbar -->
        <div class="us-toolbar">
          <div class="us-toolbar-left">
            <div class="us-title"><i class="ri-team-line"></i>إدارة المستخدمين</div>
          </div>
          <div class="us-toolbar-right">
            <button class="us-add-btn" onclick="window.openUserModal()">
              <i class="ri-add-line"></i>مستخدم جديد
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="us-table-wrap">
          <div class="us-table-scroll">
            <table class="us-table">
              <thead>
                <tr>
                  <th>المستخدم</th>
                  <th>الدور</th>
                  <th>الحالة</th>
                  <th>تاريخ الانضمام</th>
                  <th style="text-align:left">الإجراءات</th>
                </tr>
              </thead>
              <tbody id="us-tableBody">
                <tr><td colspan="5" style="text-align:center;padding:60px;color:var(--text-muted)">
                  <i class="ri-loader-4-line" style="animation:users-spin 1s linear infinite;display:inline-block;font-size:1.5rem"></i>
                </td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

      /* ─── Helpers ─── */
      function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
      function v(id)  { return (document.getElementById(id)?.value||'').trim(); }

      function toast(msg, type='success') {
        const el = document.createElement('div');
        el.className = `us-toast ${type}`;
        el.innerHTML = `<i class="ri-${type==='success'?'checkbox-circle-fill':'error-warning-fill'}"></i><span>${msg}</span>`;
        document.getElementById('us-toast').appendChild(el);
        setTimeout(()=>{el.style.cssText+='opacity:0;transform:translateY(4px);transition:.3s';setTimeout(()=>el.remove(),320);},3500);
      }

      function showErr(id, msg) {
        const el = document.getElementById(id); if(!el) return;
        el.classList.add('show'); el.querySelector('span').textContent = msg;
      }
      function clearErrs() { document.querySelectorAll('.us-field-err').forEach(e=>e.classList.remove('show')); }

      function setBusy(id, busy, label) {
        const btn = document.getElementById(id); if(!btn) return;
        btn.disabled = busy;
        if(busy) btn.innerHTML = '<i class="ri-loader-4-line" style="animation:users-spin 1s linear infinite"></i> جاري...';
        else if(label) btn.innerHTML = label;
      }

      function openModal(title, bodyHTML) {
        document.getElementById('us-modal-title').textContent = title;
        document.getElementById('us-modal-body').innerHTML = bodyHTML;
        document.getElementById('us-modal').style.display = 'flex';
      }
      function closeModal() {
        document.getElementById('us-modal').style.display = 'none';
      }
      window.closeModal = closeModal;

      /* ─── API ─── */
      function getAuthToken() {
        let token = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!token) {
          try { const d = JSON.parse(localStorage.getItem('authData')); token = d?.token; } catch {}
        }
        return token || '';
      }

      async function api(method, path, body) {
        const token = getAuthToken();
        const opts = { method, headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${token}` } };
        if (body) opts.body = JSON.stringify(body);
        const r = await fetch(API_BASE + path, opts);
        if (!r.ok) {
          if (r.status === 401 || r.status === 403) {
            localStorage.clear();
            window.location.replace('/unauth.html');
            return;
          }
          let errMsg = `HTTP ${r.status}`;
          try {
            const j = await r.json();
            // Try to extract a useful message from various server formats
            errMsg = j.message || j.title || j.detail || j.error || (j.errors ? Object.values(j.errors).flat().join(', ') : null) || errMsg;
          } catch {}
          throw new Error(errMsg);
        }
        return r.status === 204 ? null : r.json();
      }

      const GET    = p    => api('GET',    p);
      const POST   = (p,b)=> api('POST',   p, b);
      const PUT    = (p,b)=> api('PUT',    p, b);
      const DELETE = p    => api('DELETE', p);

      /* ─── Lookup helpers ─── */
      const getRoleName  = id => ({1:'مدير النظام', 2:'مدير الحجوزات', 3:'مهندس الموقع'}[id] || 'غير معروف');
      const getRoleClass = id => ({1:'us-role-admin', 2:'us-role-booking', 3:'us-role-engineer'}[id] || '');
      const getRoleIcon  = id => ({1:'ri-shield-star-line', 2:'ri-calendar-check-line', 3:'ri-building-4-line'}[id] || 'ri-user-line');
      const getInitials  = (f,l) => ((f?.[0]||'')+(l?.[0]||'')).toUpperCase();
      const fmtDate      = d => d ? new Date(d).toLocaleDateString('ar-EG') : '—';

      /* ─── Load ─── */
      async function loadUsers() {
        try {
          const data = await GET('/api/Users');
          users = Array.isArray(data) ? data : (data?.data || []);
          renderUsers();
        } catch(e) {
          toast(translateError(e.message), 'error');
          document.getElementById('us-tableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted)">فشل تحميل البيانات</td></tr>';
        }
      }

      function renderUsers() {
        const tbody = document.getElementById('us-tableBody');
        if (!users.length) {
          tbody.innerHTML = `<tr><td colspan="5"><div class="us-empty"><i class="ri-team-line"></i>لا يوجد مستخدمون بعد</div></td></tr>`;
          return;
        }
        tbody.innerHTML = users.map(u => `
          <tr>
            <td>
              <div class="us-user-cell">
                <div class="us-avatar">${getInitials(u.firstName,u.lastName)}</div>
                <div>
                  <div class="us-name">${esc(u.firstName)} ${esc(u.lastName)}</div>
                  <div class="us-email">${esc(u.email)}</div>
                </div>
              </div>
            </td>
            <td><span class="us-role-badge ${getRoleClass(u.roleId)}"><i class="${getRoleIcon(u.roleId)}"></i> ${getRoleName(u.roleId)}</span></td>
            <td><span class="us-status-badge ${u.isActive?'us-status-active':'us-status-inactive'}">${u.isActive?'✓ نشط':'✗ معطل'}</span></td>
            <td style="color:var(--text-muted)">${fmtDate(u.createdAt)}</td>
            <td>
              <div class="us-actions">
                <button class="us-action-btn" title="تعديل" onclick="window.openUserModal(${u.id})"><i class="ri-edit-line"></i></button>
                <button class="us-action-btn del" title="حذف" onclick="window.deleteUser(${u.id},'${esc(u.firstName+' '+u.lastName)}')"><i class="ri-delete-bin-line"></i></button>
              </div>
            </td>
          </tr>
        `).join('');
      }

      /* ─── Modal form builder ─── */
      function buildForm(u=null) {
        const isEdit = !!u;
        return `
          <div class="us-modal-body">
            <div class="us-fr">
              <div class="us-fg">
                <label class="us-fl">الاسم الأول *</label>
                <input id="us-fn" class="us-fi" value="${esc(u?.firstName||'')}" placeholder="الاسم الأول">
                <div class="us-field-err" id="us-err-fn"><i class="ri-error-warning-line"></i><span></span></div>
              </div>
              <div class="us-fg">
                <label class="us-fl">الاسم الأخير *</label>
                <input id="us-ln" class="us-fi" value="${esc(u?.lastName||'')}" placeholder="الاسم الأخير">
                <div class="us-field-err" id="us-err-ln"><i class="ri-error-warning-line"></i><span></span></div>
              </div>
            </div>
            <div class="us-fg">
              <label class="us-fl">البريد الإلكتروني *</label>
              <input id="us-em" class="us-fi" type="email" style="direction:ltr;text-align:left" value="${esc(u?.email||'')}" placeholder="example@domain.com">
              <div class="us-field-err" id="us-err-em"><i class="ri-error-warning-line"></i><span></span></div>
            </div>
            ${!isEdit ? `
            <div class="us-fg">
              <label class="us-fl">كلمة المرور *</label>
              <input id="us-pw" class="us-fi" type="password" placeholder="6 أحرف على الأقل">
              <div class="us-field-err" id="us-err-pw"><i class="ri-error-warning-line"></i><span></span></div>
            </div>` : ''}
            <div class="us-fg">
              <label class="us-fl">الدور الوظيفي *</label>
              <select id="us-role" class="us-fsel">
                <option value="">— اختر الدور —</option>
                <option value="1" ${u?.roleId===1?'selected':''}>مدير النظام</option>
                <option value="2" ${u?.roleId===2?'selected':''}>مدير الحجوزات</option>
                <option value="3" ${u?.roleId===3?'selected':''}>مهندس الموقع</option>
              </select>
              <div class="us-field-err" id="us-err-role"><i class="ri-error-warning-line"></i><span></span></div>
            </div>
            <div class="us-status-toggle">
              <div class="us-status-toggle-label"><i class="ri-shield-check-line"></i> حالة الحساب</div>
              <div style="display:flex;align-items:center;gap:10px">
                <span id="us-status-text" class="us-status-text"></span>
                <input type="checkbox" id="us-active" class="us-toggle-cb" ${!isEdit||u?.isActive?'checked':''}>
              </div>
            </div>
          </div>
          <div class="us-modal-footer">
            <button class="btn-submit" id="us-submitBtn" onclick="window.submitUserForm(${u?.id||'null'})">
              <i class="ri-save-line"></i>${isEdit?'حفظ التعديلات':'إضافة المستخدم'}
            </button>
            <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
          </div>
        `;
      }

      function updateStatusText() {
        const cb  = document.getElementById('us-active');
        const txt = document.getElementById('us-status-text');
        if(!cb||!txt) return;
        txt.textContent = cb.checked ? 'نشط' : 'معطل';
        txt.style.color = cb.checked ? 'var(--success)' : 'var(--danger)';
      }

      /* ─── Open / Submit ─── */
      window.openUserModal = function(id=null) {
        if (id) {
          const u = users.find(x=>x.id===id);
          if (!u) { toast('لم يتم العثور على المستخدم', 'error'); return; }
          openModal('تعديل بيانات المستخدم', buildForm(u));
        } else {
          openModal('مستخدم جديد', buildForm());
        }
        // bind status toggle
        setTimeout(()=>{
          updateStatusText();
          document.getElementById('us-active')?.addEventListener('change', updateStatusText);
        },20);
      };

      window.submitUserForm = async function(id) {
        clearErrs();
        const fn   = v('us-fn'), ln   = v('us-ln'),
              em   = v('us-em'), pw   = v('us-pw'),
              role = v('us-role');
        const isEdit = id !== null && id !== 'null';
        let ok = true;
        if(!fn){ showErr('us-err-fn','الاسم الأول مطلوب'); ok=false; }
        if(!ln){ showErr('us-err-ln','اسم العائلة مطلوب'); ok=false; }
        if(!em){ showErr('us-err-em','البريد الإلكتروني مطلوب'); ok=false; }
        else if(!/\S+@\S+\.\S+/.test(em)){ showErr('us-err-em','البريد الإلكتروني غير صحيح'); ok=false; }
        if(!isEdit){
          if(!pw){ showErr('us-err-pw','كلمة المرور مطلوبة'); ok=false; }
          else if(pw.length<6){ showErr('us-err-pw','يجب أن تكون 6 أحرف على الأقل'); ok=false; }
        }
        if(!role){ showErr('us-err-role','الدور الوظيفي مطلوب'); ok=false; }
        if(!ok) return;

        // client-side duplicate email check
        const dupEmail = users.find(u => Number(u.id)!==Number(id) && u.email?.toLowerCase()===em.toLowerCase());
        if(dupEmail){ showErr('us-err-em','البريد الإلكتروني مسجل لمستخدم آخر'); return; }

        const payload = {
          firstName:fn, lastName:ln, email:em,
          roleId:parseInt(role),
          isActive: document.getElementById('us-active')?.checked ?? true,
        };
        if(!isEdit) payload.password = pw;

        setBusy('us-submitBtn', true);
        try {
          if(isEdit) await PUT(`/api/Users/${id}`, payload);
          else        await POST('/api/Users', payload);
          toast(isEdit?'تم تعديل بيانات المستخدم':'تم إضافة المستخدم بنجاح');
          closeModal(); await loadUsers();
        } catch(e) {
          const translated = translateError(e.message||'');
          const m = (e.message||'').toLowerCase();
          if(m.includes('email') || m.includes('بريد') || m.includes('duplicate') && m.includes('em'))
            showErr('us-err-em', translated);
          else
            toast(`فشل: ${translated}`, 'error');
        }
        setBusy('us-submitBtn', false, `<i class="ri-save-line"></i>${isEdit?'حفظ التعديلات':'إضافة المستخدم'}`);
      };

      /* ─── Delete ─── */
      window.deleteUser = function(id, name) {
        openModal('حذف المستخدم', `
          <div class="us-modal-body">
            <div class="confirm-box">
              <div class="confirm-icon">🗑️</div>
              <p class="confirm-msg">هل أنت متأكد من حذف المستخدم <strong>${esc(name)}</strong>؟<br>لا يمكن التراجع عن هذا الإجراء.</p>
              <div class="confirm-actions">
                <button class="btn-danger" id="us-submitBtn" onclick="window.confirmDeleteUser(${id})">
                  <i class="ri-delete-bin-line"></i>نعم، احذف
                </button>
                <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
              </div>
            </div>
          </div>
        `);
      };

      window.confirmDeleteUser = async function(id) {
        setBusy('us-submitBtn', true, 'جاري الحذف...');
        try {
          await DELETE(`/api/Users/${id}`);
          toast('تم حذف المستخدم بنجاح');
          closeModal(); await loadUsers();
        } catch(e) {
          toast(`فشل الحذف: ${translateError(e.message)}`, 'error');
          setBusy('us-submitBtn', false, '<i class="ri-delete-bin-line"></i>نعم، احذف');
        }
      };

      /* ─── Event delegation ─── */
      document.getElementById('us-modal').addEventListener('click', e => {
        if(e.target.id==='us-modal') closeModal();
      }, { signal: window.__pageAbortSignal });
      document.addEventListener('keydown', e => {
        if(e.key==='Escape') closeModal();
      }, { signal: window.__pageAbortSignal });

      await loadUsers();
    }
  };
})();