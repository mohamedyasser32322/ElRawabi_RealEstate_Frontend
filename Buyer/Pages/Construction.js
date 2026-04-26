/* PAGE MODULE: construction — Buyer Panel (Read-Only)
   الروابي للعقارات — بوابة المشتري
   ══════════════════════════════════════════════════ */
(function () {
  'use strict';
  window.__pages = window.__pages || {};

  const _css = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#081830; --surface:#0f1f3d; --surface2:#0a1629;
      --border:rgba(255,255,255,.07); --border-h:rgba(255,255,255,.14);
      --text:#dde8ff; --text2:#a0b8d8; --muted:#4a6580; --muted2:#2e4560;
      --accent:#4e8df5; --accent-dim:rgba(78,141,245,.12); --accent-border:rgba(78,141,245,.28);
      --gold:#f5c842; --gold-dim:rgba(245,200,66,.1); --gold-border:rgba(245,200,66,.28);
      --success:#34c759; --success-dim:rgba(52,199,89,.12); --success-border:rgba(52,199,89,.28);
      --warning:#ffcc00; --warning-dim:rgba(255,204,0,.12); --warning-border:rgba(255,204,0,.3);
      --danger:#ff3b30;
      --r:12px; --tr:all .22s ease;
    }
    @keyframes bc-spin   { to{transform:rotate(360deg)} }
    @keyframes bc-fadeUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
    @keyframes bc-fadeIn { from{opacity:0}to{opacity:1} }
    @keyframes bc-pulse  { 0%,100%{opacity:1}50%{opacity:.35} }
    @keyframes bc-popIn  { from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)} }

    /* ── PAGE ── */
    .bc-page{padding:0 0 100px;max-width:860px;margin:0 auto}

    /* ── TOPBAR ── */
    .bc-topbar{
      display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
      padding:14px 0 20px;border-bottom:1px solid var(--border);margin-bottom:24px;
      animation:bc-fadeUp .3s ease both;flex-wrap:wrap;
    }
    .bc-back-btn{
      display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:10px;
      background:rgba(255,255,255,.05);border:1px solid var(--border);
      color:var(--text2);font-family:'Tajawal',sans-serif;font-size:.85rem;font-weight:600;
      cursor:pointer;transition:var(--tr);flex-shrink:0;margin-top:2px;
    }
    .bc-back-btn:hover{color:var(--text);background:rgba(255,255,255,.09);border-color:var(--border-h)}

    /* header info block */
    .bc-hdr-info{flex:1;min-width:0}
    .bc-hdr-title{font-size:1.1rem;font-weight:800;color:var(--text);display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .bc-hdr-title i{color:var(--accent)}
    .bc-hdr-chips{display:flex;flex-wrap:wrap;gap:6px}
    .bc-hdr-chip{
      display:inline-flex;align-items:center;gap:5px;
      font-size:.75rem;font-weight:600;padding:4px 11px;border-radius:8px;
      background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--text2);
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;
    }
    .bc-hdr-chip i{font-size:.8rem;color:var(--accent);opacity:.8;flex-shrink:0}

    /* ── PROGRESS CARD ── */
    .bc-prog-card{
      background:var(--surface);border:1px solid var(--border);
      border-radius:16px;padding:20px 24px;margin-bottom:20px;
      display:flex;align-items:center;gap:20px;animation:bc-fadeUp .35s ease both;
    }
    @media(max-width:560px){.bc-prog-card{flex-direction:column;gap:14px;padding:16px}}
    .bc-prog-ring{position:relative;width:80px;height:80px;flex-shrink:0}
    .bc-prog-ring svg{transform:rotate(-90deg)}
    .bc-ring-bg  {fill:none;stroke:rgba(255,255,255,.06);stroke-width:8}
    .bc-ring-fill{fill:none;stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset 1.2s ease}
    .bc-ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .bc-ring-pct{font-size:1.2rem;font-weight:800;color:var(--text);line-height:1}
    .bc-ring-sub{font-size:.6rem;color:var(--muted);margin-top:2px}
    .bc-prog-info{flex:1;min-width:0;width:100%}
    .bc-prog-name{font-size:1rem;font-weight:800;color:var(--text);margin-bottom:8px;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .bc-prog-track{height:5px;background:rgba(255,255,255,.06);border-radius:5px;overflow:hidden;margin-bottom:8px}
    .bc-prog-bar{height:100%;border-radius:5px;transition:width 1.2s ease}
    .bc-prog-pips{display:flex;gap:3px}
    .bc-prog-pip{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.07);transition:background .4s}
    .bc-prog-pip.done{background:var(--success)}
    .bc-prog-pip.curr{background:var(--accent);animation:bc-pulse 2s infinite}
    .bc-prog-detail{font-size:.72rem;color:var(--muted);margin-top:7px}

    /* ── TIMELINE ── */
    .bc-timeline{display:flex;flex-direction:column;position:relative}
    .bc-tl-line{position:absolute;right:17px;top:0;bottom:0;width:2px;background:rgba(255,255,255,.05);z-index:0;border-radius:2px}
    .bc-stage-row{display:flex;gap:14px;align-items:flex-start;position:relative;z-index:1;margin-bottom:8px;animation:bc-fadeUp .3s ease both}

    /* dot */
    .bc-dot-wrap{display:flex;flex-direction:column;align-items:center;flex-shrink:0;padding-top:14px}
    .bc-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;border:2px solid transparent;position:relative;z-index:2;background:var(--bg)}
    .bc-dot.done{border-color:var(--success);color:var(--success);background:#0a1a12}
    .bc-dot.curr{border-color:var(--accent);color:var(--accent);background:#0a1524;box-shadow:0 0 0 5px rgba(78,141,245,.1)}
    .bc-dot.pend{border-color:rgba(255,255,255,.1);color:var(--muted2)}

    /* stage card */
    .bc-sr{flex:1;min-width:0;border-radius:var(--r);border:1px solid var(--border);background:var(--surface);overflow:hidden;transition:border-color .2s,background .2s}
    .bc-sr.done{border-color:var(--success-border)}
    .bc-sr.curr{border-color:var(--accent-border);background:#0d1e35}
    .bc-sr.pend{opacity:.45}

    /* ── STAGE HEADER — responsive fix ── */
    .bc-sr-h{
      display:flex;flex-direction:column;gap:10px;padding:14px 16px;
    }
    /* top row: name + badge */
    .bc-sr-top{
      display:flex;align-items:flex-start;justify-content:space-between;gap:8px;
    }
    .bc-sr-l{display:flex;align-items:flex-start;gap:10px;flex:1;min-width:0}
    .bc-sr-nm{font-size:.92rem;font-weight:700;color:var(--text);line-height:1.4;word-break:break-word}
    .bc-sr-nm.mu{color:var(--muted);font-weight:400}
    .bc-sr-sub{font-size:.7rem;color:var(--muted2);margin-top:4px;display:flex;align-items:center;gap:4px;flex-wrap:wrap}
    .bc-sr-sub.done{color:var(--success)}
    .bc-sr-sub.curr{color:#5a9acc}
    .bc-badge-wrap{flex-shrink:0}

    /* bottom row: action buttons */
    .bc-sr-actions{
      display:flex;gap:7px;flex-wrap:wrap;
    }

    .bc-badge{padding:3px 9px;border-radius:20px;font-size:.68rem;font-weight:700;white-space:nowrap}
    .bc-b-d{background:var(--success-dim);color:var(--success);border:1px solid var(--success-border)}
    .bc-b-c{background:var(--accent-dim);color:var(--accent);border:1px solid var(--accent-border)}
    .bc-b-p{background:rgba(255,255,255,.04);color:var(--muted);border:1px solid var(--border)}

    /* SPINNER inside current stage dot */
    .bc-dot-spinner{
      width:14px;height:14px;
      border:2px solid rgba(78,141,245,.3);
      border-top-color:var(--accent);
      border-radius:50%;
      animation:bc-spin .7s linear infinite;
      display:inline-block;
    }

    /* action buttons */
    .bc-action-btn{
      display:inline-flex;align-items:center;gap:5px;
      padding:7px 13px;border-radius:8px;
      font-family:'Tajawal',sans-serif;font-size:.78rem;font-weight:700;
      cursor:pointer;transition:var(--tr);border:1px solid;
      white-space:nowrap;
    }
    .bc-btn-report{background:rgba(255,204,0,.08);color:var(--warning);border-color:rgba(255,204,0,.28)}
    .bc-btn-report:hover{background:rgba(255,204,0,.18)}
    .bc-btn-photos{background:var(--accent-dim);color:var(--accent);border-color:var(--accent-border)}
    .bc-btn-photos:hover{background:rgba(78,141,245,.22)}

    /* ── MODAL OVERLAY ── */
    #bc-modal{
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,.7);z-index:2000;
      align-items:center;justify-content:center;
      backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
      padding:12px;
    }
    #bc-modal.open{display:flex;animation:bc-fadeIn .18s ease}
    .bc-mbox{
      background:#0e1c36;border:1px solid var(--border-h);
      border-radius:18px;max-width:580px;width:100%;
      max-height:88vh;overflow-y:auto;
      animation:bc-popIn .22s ease;box-shadow:0 32px 80px rgba(0,0,0,.6);
    }
    .bc-mbox.wide{max-width:820px}
    .bc-mhead{
      padding:14px 16px 12px;border-bottom:1px solid var(--border);
      display:flex;justify-content:space-between;align-items:center;
      position:sticky;top:0;background:#0e1c36;z-index:2;border-radius:18px 18px 0 0;
      gap:10px;
    }
    .bc-mhead h2{font-size:.92rem;font-weight:700;color:var(--text);font-family:'Tajawal',sans-serif;
      word-break:break-word;flex:1;min-width:0}
    .bc-mcls{
      background:rgba(255,255,255,.05);border:1px solid var(--border);
      color:var(--muted);font-size:.9rem;cursor:pointer;
      width:28px;height:28px;min-width:28px;display:flex;align-items:center;justify-content:center;
      border-radius:7px;transition:var(--tr);
    }
    .bc-mcls:hover{color:var(--text);background:rgba(255,59,48,.1);border-color:rgba(255,59,48,.3)}
    .bc-mbody{padding:16px}

    /* report field grid in modal */
    .bc-rep-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin:14px 0}
    .bc-rep-field{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:8px;padding:9px 11px}
    .bc-rep-label{font-size:.62rem;color:var(--muted2);margin-bottom:4px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
    .bc-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:.74rem;font-weight:700}
    .bc-cy{background:var(--success-dim);color:var(--success);border:1px solid var(--success-border)}
    .bc-cn{background:rgba(255,59,48,.1);color:var(--danger);border:1px solid rgba(255,59,48,.22)}
    .bc-tbg{display:inline-block;padding:2px 8px;border-radius:20px;background:var(--accent-dim);color:#7ab3ff;border:1px solid rgba(78,141,245,.18);font-size:.76rem;word-break:break-word}
    .bc-notes{margin-top:10px;font-size:.83rem;color:#7a9ab8;line-height:1.75;background:rgba(255,255,255,.02);border:1px solid var(--border);padding:10px 13px;border-radius:8px;word-break:break-word}
    .bc-comp-badge{display:inline-flex;align-items:center;gap:5px;background:var(--success-dim);color:var(--success);border:1px solid var(--success-border);padding:3px 10px;border-radius:20px;font-size:.73rem;font-weight:700;margin-bottom:12px;flex-wrap:wrap}
    .bc-no-data{padding:20px;text-align:center;color:var(--muted);font-size:.85rem}

    /* photo gallery in modal */
    .bc-photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-top:4px}
    .bc-photo-thumb{
      aspect-ratio:4/3;border-radius:10px;overflow:hidden;
      border:1px solid var(--border);cursor:pointer;
      transition:border-color .2s,transform .2s;background:var(--surface2);
    }
    .bc-photo-thumb:hover{border-color:var(--accent);transform:scale(1.03)}
    .bc-photo-thumb img{width:100%;height:100%;object-fit:cover;display:block}
    .bc-no-photos{padding:30px;text-align:center;color:var(--muted);font-size:.85rem;display:flex;flex-direction:column;align-items:center;gap:8px}
    .bc-no-photos i{font-size:2rem;opacity:.25}

    /* ── LIGHTBOX (full screen inside modal) ── */
    #bc-lb{
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,.95);z-index:3000;
      align-items:center;justify-content:center;flex-direction:column;gap:14px;
      padding:16px;
    }
    #bc-lb.open{display:flex;animation:bc-fadeIn .18s ease}
    #bc-lb-img{max-width:88vw;max-height:76vh;object-fit:contain;border-radius:10px;display:block}
    .bc-lb-cap{color:rgba(255,255,255,.4);font-size:.78rem}
    .bc-lb-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center}
    .bc-lb-btn{padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);color:#fff;font-size:.8rem;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:'Tajawal',sans-serif;font-weight:600;transition:var(--tr)}
    .bc-lb-btn:hover{background:rgba(255,255,255,.15)}
    #bc-lb-prev{position:fixed;top:50%;transform:translateY(-50%);right:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;transition:var(--tr)}
    #bc-lb-next{position:fixed;top:50%;transform:translateY(-50%);left:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;transition:var(--tr)}
    #bc-lb-prev:hover,#bc-lb-next:hover{background:rgba(255,255,255,.15)}

    /* DONE BANNER */
    .bc-done-banner{text-align:center;padding:24px;margin-top:16px;background:var(--success-dim);border:1px solid var(--success-border);border-radius:16px;animation:bc-fadeUp .4s ease both}
    .bc-done-emoji{font-size:2rem;display:block;margin-bottom:8px}
    .bc-done-banner p{color:var(--success);font-weight:800;font-size:.95rem}
    .bc-done-sub{color:var(--muted);font-size:.8rem;margin-top:4px}

    /* SPINNER PAGE */
    .bc-spin-wrap{display:flex;align-items:center;justify-content:center;min-height:300px}
    .bc-spinner{width:40px;height:40px;border:3px solid rgba(255,255,255,.07);border-top-color:var(--accent);border-radius:50%;animation:bc-spin .75s linear infinite}

    /* ── MOBILE BREAKPOINTS ── */
    @media(max-width:480px){
      .bc-page{padding:0 0 80px}
      .bc-topbar{padding:10px 0 16px;gap:8px}
      .bc-back-btn{padding:7px 11px;font-size:.8rem}
      .bc-hdr-title{font-size:1rem}
      .bc-hdr-chip{font-size:.7rem;padding:3px 9px;max-width:130px}

      .bc-prog-card{flex-direction:column;gap:12px;padding:14px}
      .bc-prog-ring{width:70px;height:70px}
      .bc-prog-ring svg{width:70px;height:70px}
      .bc-ring-pct{font-size:1.05rem}
      .bc-prog-info{width:100%}

      .bc-sr-nm{font-size:.85rem}
      .bc-sr-sub{font-size:.67rem}
      .bc-badge{font-size:.64rem;padding:3px 7px}
      .bc-action-btn{font-size:.74rem;padding:6px 10px}

      .bc-rep-grid{grid-template-columns:1fr 1fr}
      .bc-photo-grid{grid-template-columns:repeat(auto-fill,minmax(85px,1fr));gap:6px}

      .bc-mbox{border-radius:14px}
      .bc-mhead{padding:12px 14px}
      .bc-mbody{padding:12px}

      #bc-lb-prev{right:6px;width:36px;height:36px;font-size:.95rem}
      #bc-lb-next{left:6px;width:36px;height:36px;font-size:.95rem}
    }

    @media(max-width:360px){
      .bc-hdr-chips{gap:4px}
      .bc-hdr-chip{font-size:.65rem;padding:3px 7px;max-width:110px}
      .bc-sr-actions{gap:5px}
      .bc-action-btn{font-size:.7rem;padding:5px 8px;gap:3px}
    }
  `;

  const STAGE_DEFS = [
    { key:'SitePreparation',  emoji:'⛏️', label:'تجهيز الموقع والحفر' },
    { key:'Foundation',       emoji:'🧱', label:'الأساسات' },
    { key:'Structure',        emoji:'🏗️', label:'الهيكل الإنشائي' },
    { key:'MasonryAndWalls',  emoji:'🏠', label:'المباني والحوائط' },
    { key:'InitialFinishing', emoji:'🔨', label:'التشطيبات الأولية' },
    { key:'FinalFinishing',   emoji:'🎨', label:'التشطيبات النهائية' },
    { key:'Handover',         emoji:'🔑', label:'التسليم' },
  ];

  const REPORT_FIELDS = {
    SitePreparation:  [{id:'soilTest',type:'toggle',label:'اختبار التربة'},{id:'excavationDepth',type:'number',label:'عمق الحفر (م)'},{id:'soilType',type:'text',label:'نوع التربة'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    Foundation:       [{id:'concreteType',type:'text',label:'نوع الخرسانة'},{id:'steelType',type:'text',label:'نوع الحديد'},{id:'insulationType',type:'text',label:'نوع العزل'},{id:'pressureTest',type:'toggle',label:'اختبار الضغط'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    Structure:        [{id:'columnConcrete',type:'text',label:'خرسانة الأعمدة'},{id:'roofConcrete',type:'text',label:'خرسانة الأسقف'},{id:'floorsPouredCount',type:'number',label:'أدوار مصبوبة'},{id:'cubeTest',type:'toggle',label:'اختبار المكعبات'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    MasonryAndWalls:  [{id:'blockType',type:'text',label:'نوع البلوك'},{id:'plastering',type:'toggle',label:'البياض'},{id:'waterproofing',type:'toggle',label:'العزل المائي'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    InitialFinishing: [{id:'electrical',type:'toggle',label:'الكهربائية'},{id:'plumbing',type:'toggle',label:'السباكة'},{id:'tiling',type:'toggle',label:'التبليط'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    FinalFinishing:   [{id:'painting',type:'toggle',label:'الدهان'},{id:'kitchens',type:'toggle',label:'المطابخ'},{id:'acInstalled',type:'toggle',label:'التكييف'},{id:'notes',type:'textarea',label:'ملاحظات'}],
    Handover:         [{id:'handoverDate',type:'date',label:'تاريخ التسليم'},{id:'snagsDone',type:'toggle',label:'حل الملاحظات'},{id:'keysHanded',type:'toggle',label:'تسليم المفاتيح'},{id:'notes',type:'textarea',label:'ملاحظات'}],
  };

  window.__pages['construction'] = {
    getCSS: function() { return _css; },
    init: async function() {

      const container = document.getElementById('app-main');
      const API_BASE  = window.__API_BASE || `http://${location.hostname}:5256`;
      const getToken  = window.__getToken || (()=>'');
      const target    = window.__constructionTarget || {};

      container.innerHTML = `
        <!-- lightbox -->
        <div id="bc-lb">
          <img id="bc-lb-img" src="" alt=""/>
          <div class="bc-lb-cap" id="bc-lb-cap"></div>
          <div class="bc-lb-bar">
            <button class="bc-lb-btn" id="bc-lb-prev"><i class="ri-arrow-right-line"></i></button>
            <button class="bc-lb-btn" id="bc-lb-close"><i class="ri-close-line"></i> إغلاق</button>
            <button class="bc-lb-btn" id="bc-lb-next"><i class="ri-arrow-left-line"></i></button>
          </div>
        </div>

        <!-- modal -->
        <div id="bc-modal">
          <div class="bc-mbox" id="bc-mbox">
            <div class="bc-mhead">
              <h2 id="bc-mtitle">—</h2>
              <button class="bc-mcls" id="bc-mcls"><i class="ri-close-line"></i></button>
            </div>
            <div class="bc-mbody" id="bc-mbody"></div>
          </div>
        </div>

        <div class="bc-page">
          <!-- topbar -->
          <div class="bc-topbar">
            <button class="bc-back-btn" id="bc-back"><i class="ri-arrow-right-line"></i> العودة</button>
            <div class="bc-hdr-info">
              <div class="bc-hdr-title"><i class="ri-building-4-line"></i> مراحل البناء</div>
              <div class="bc-hdr-chips">
                ${target.projectName  ? `<span class="bc-hdr-chip"><i class="ri-map-pin-2-line"></i>${target.projectName}</span>`    : ''}
                ${target.buildingName ? `<span class="bc-hdr-chip"><i class="ri-building-2-line"></i>${target.buildingName}</span>` : ''}
                ${target.floorNum    ? `<span class="bc-hdr-chip"><i class="ri-stack-line"></i>الدور ${target.floorNum}</span>`       : ''}
                ${target.unitNum     ? `<span class="bc-hdr-chip"><i class="ri-home-4-line"></i>وحدة ${target.unitNum}</span>`        : ''}
              </div>
            </div>
          </div>
          <div id="bc-content"><div class="bc-spin-wrap"><div class="bc-spinner"></div></div></div>
        </div>`;

      /* ── helpers ── */
      function toArr(v) { return Array.isArray(v)?v:(v?.data||v?.items||v?.value||v?.results||[]); }
      function esc(s)   { return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

      /* ── DATE HELPERS — Gregorian (en-GB style, Arabic labels) ── */
      function fmtDate(d) {
        if(!d) return null;
        try {
          return new Date(d).toLocaleDateString('ar', {
            calendar: 'gregory',
            year: 'numeric', month: 'long', day: 'numeric',
            numberingSystem: 'latn'
          });
        } catch { return null; }
      }
      function fmtDateShort(d) {
        if(!d) return null;
        try {
          return new Date(d).toLocaleDateString('ar', {
            calendar: 'gregory',
            year: 'numeric', month: 'short', day: 'numeric',
            numberingSystem: 'latn'
          });
        } catch { return null; }
      }

      function imgSrc(img) {
        if(!img)return '';
        let src=img.imageUrl||img.ImageUrl||img.url||img.Url||img.filePath||img.FilePath||img.path||img.Path||'';
        if(!src&&typeof img==='string')src=img;
        if(src&&!src.startsWith('http')&&!src.startsWith('blob')&&!src.startsWith('data'))
          src=`${API_BASE}/${src.replace(/^\/+/,'')}`;
        src=src.replace(/^(https?:\/\/[^/]+)\/(https?:\/\/)/,'$2');
        return src;
      }
      function getStageImages(stage) {
        if(!stage)return[];
        for(const f of['images','stageImages','photos','Images','StageImages','Photos']){
          const a=toArr(stage[f]); if(a.length)return a;
        }
        return[];
      }
      async function apiFetch(path) {
        const r=await fetch(API_BASE+path,{headers:{'Authorization':'Bearer '+getToken()}});
        if(!r.ok)throw new Error(r.status);
        return r.json().catch(()=>null);
      }

      /* ── lightbox ── */
      let lbImages=[], lbIdx=0;
      function openLb(imgs,idx){ lbImages=imgs; lbIdx=idx; showLbImg(); document.getElementById('bc-lb').classList.add('open'); }
      function showLbImg(){
        document.getElementById('bc-lb-img').src=imgSrc(lbImages[lbIdx]);
        document.getElementById('bc-lb-cap').textContent=`${lbIdx+1} / ${lbImages.length}`;
      }
      function closeLb(){ document.getElementById('bc-lb').classList.remove('open'); }
      document.getElementById('bc-lb').addEventListener('click', e=>{ if(e.target===document.getElementById('bc-lb'))closeLb(); },{signal:window.__pageAbortSignal});
      document.getElementById('bc-lb-close').addEventListener('click',closeLb,{signal:window.__pageAbortSignal});
      document.getElementById('bc-lb-prev').addEventListener('click',()=>{ if(lbImages.length<2)return; lbIdx=(lbIdx-1+lbImages.length)%lbImages.length; showLbImg(); },{signal:window.__pageAbortSignal});
      document.getElementById('bc-lb-next').addEventListener('click',()=>{ if(lbImages.length<2)return; lbIdx=(lbIdx+1)%lbImages.length; showLbImg(); },{signal:window.__pageAbortSignal});

      /* ── modal ── */
      function openModal(title, html, wide=false){
        document.getElementById('bc-mtitle').textContent=title;
        document.getElementById('bc-mbody').innerHTML=html;
        document.getElementById('bc-mbox').classList.toggle('wide',wide);
        document.getElementById('bc-modal').classList.add('open');
      }
      function closeModal(){ document.getElementById('bc-modal').classList.remove('open'); document.getElementById('bc-mbody').innerHTML=''; }
      document.getElementById('bc-mcls').addEventListener('click',closeModal,{signal:window.__pageAbortSignal});
      document.getElementById('bc-modal').addEventListener('click',e=>{ if(e.target===document.getElementById('bc-modal'))closeModal(); },{signal:window.__pageAbortSignal});

      /* keyboard */
      document.addEventListener('keydown',e=>{
        if(document.getElementById('bc-lb').classList.contains('open')){
          if(e.key==='Escape')closeLb();
          if(e.key==='ArrowRight')document.getElementById('bc-lb-prev').click();
          if(e.key==='ArrowLeft') document.getElementById('bc-lb-next').click();
        } else if(document.getElementById('bc-modal').classList.contains('open')){
          if(e.key==='Escape')closeModal();
        }
      },{signal:window.__pageAbortSignal});

      /* ── back ── */
      document.getElementById('bc-back').addEventListener('click',()=>{ window.__constructionTarget=null; navigate('dashboard'); },{signal:window.__pageAbortSignal});

      /* ── open report modal ── */
      function openReportModal(def, stage){
        const rd = (() => { try{ return JSON.parse(stage?.reportData||'{}'); }catch{return {};} })();
        const completionDate = stage?.endDate||stage?.completionDate||rd?.completionDate||null;
        const fields = REPORT_FIELDS[def.key]||[];
        const hasData = fields.some(f => rd[f.id]!==undefined && rd[f.id]!==null && rd[f.id]!=='');

        let html = '';
        if(completionDate) html+=`<div><span class="bc-comp-badge"><i class="ri-calendar-check-line"></i> تاريخ الاكتمال: ${fmtDate(completionDate)}</span></div>`;

        if(hasData){
          html+=`<div class="bc-rep-grid">`;
          fields.filter(f=>f.id!=='notes').forEach(f=>{
            const val=rd[f.id]; if(val===undefined||val===null||val==='')return;
            let vh='';
            if(f.type==='toggle') vh=(val===true||val==='true'||val===1)?`<span class="bc-chip bc-cy"><i class="ri-check-line"></i> نعم</span>`:`<span class="bc-chip bc-cn"><i class="ri-close-line"></i> لا</span>`;
            else if(f.type==='number') vh=`<span style="font-size:.9rem;font-weight:700;color:var(--text)">${esc(val)}</span>`;
            else if(f.type==='date')   vh=`<span class="bc-tbg"><i class="ri-calendar-line"></i> ${fmtDateShort(val)||esc(val)}</span>`;
            else vh=`<span class="bc-tbg">${esc(val)}</span>`;
            html+=`<div class="bc-rep-field"><div class="bc-rep-label">${esc(f.label)}</div>${vh}</div>`;
          });
          html+='</div>';
          if(rd.notes) html+=`<div class="bc-notes"><i class="ri-sticky-note-line" style="opacity:.4;margin-left:4px"></i>${esc(rd.notes)}</div>`;
        } else {
          html+=`<div class="bc-no-data"><i class="ri-file-search-line" style="margin-left:6px"></i>لا توجد بيانات تقرير بعد</div>`;
        }
        openModal(`${def.emoji} تقرير — ${def.label}`, html);
      }

      /* ── open photos modal ── */
      function openPhotosModal(def, stage){
        const imgs = getStageImages(stage);
        let html = '';
        if(!imgs.length){
          html=`<div class="bc-no-photos"><i class="ri-image-add-line"></i><span>لا توجد صور لهذه المرحلة حتى الآن</span></div>`;
        } else {
          html=`<div class="bc-photo-grid">`;
          imgs.forEach((img,ii)=>{
            const src=imgSrc(img); if(!src)return;
            html+=`<div class="bc-photo-thumb" data-idx="${ii}">
              <img src="${esc(src)}" alt="" loading="lazy" onerror="this.closest('.bc-photo-thumb').style.display='none'"/>
            </div>`;
          });
          html+='</div>';
        }
        openModal(`${def.emoji} صور — ${def.label}`, html, true);

        /* bind thumbs to lightbox */
        setTimeout(()=>{
          document.querySelectorAll('.bc-photo-thumb').forEach(th=>{
            th.addEventListener('click',()=>{ closeModal(); openLb(imgs, parseInt(th.dataset.idx,10)); });
          });
        },50);
      }

      /* ── load & render ── */
      const buildingId = target.buildingId;
      if(!buildingId){
        document.getElementById('bc-content').innerHTML=`<div style="text-align:center;padding:60px;color:var(--muted)"><i class="ri-information-line" style="font-size:2.5rem;display:block;margin-bottom:12px;opacity:.3"></i><p>ارجع للوحة التحكم واختر وحدتك</p></div>`;
        return;
      }

      try {
        const data = await apiFetch(`/api/ConstructionStages?buildingId=${buildingId}`);
        let stages  = toArr(data);

        /* fetch images if missing */
        await Promise.all(stages.filter(s=>!getStageImages(s).length&&s.id).map(async s=>{
          try{ const imgs=await apiFetch(`/api/StageImages?stageId=${s.id}`); const a=toArr(imgs); if(a.length)s.images=a; }catch{}
        }));

        render(stages);
      } catch(e){
        console.error(e);
        document.getElementById('bc-content').innerHTML=`<div style="text-align:center;padding:60px;color:#ff7b72"><i class="ri-wifi-off-line" style="font-size:2.5rem;display:block;margin-bottom:12px;opacity:.5"></i><p>فشل تحميل مراحل البناء</p></div>`;
      }

      function getStage(key){ return window.__bcStages?.find(s=>s.stageName===key)||null; }
      function isDone(key){ const s=getStage(key); return s?(s.isCompleted===true||s.status==='Completed'):false; }
      function currIdx(){ for(let i=0;i<STAGE_DEFS.length;i++){if(!isDone(STAGE_DEFS[i].key))return i;} return -1; }
      function pct(){ return Math.round(STAGE_DEFS.filter(d=>isDone(d.key)).length/STAGE_DEFS.length*100); }

      function render(stages){
        window.__bcStages = stages;
        const content = document.getElementById('bc-content'); if(!content)return;

        const p=pct(), ci=currIdx(), doneCount=STAGE_DEFS.filter(d=>isDone(d.key)).length;
        const circ=2*Math.PI*32, off=circ-(p/100)*circ;
        const barColor = p===100?'linear-gradient(90deg,var(--success),#28a745)':'linear-gradient(90deg,var(--accent),#3a7de4)';
        const ringColor= p===100?'var(--success)':'var(--accent)';

        const pips=STAGE_DEFS.map((d,i)=>{
          const cls=isDone(d.key)?'done':(i===ci?'curr':'');
          return `<div class="bc-prog-pip ${cls}"></div>`;
        }).join('');

        let html=`
          <div class="bc-prog-card">
            <div class="bc-prog-ring">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <circle class="bc-ring-bg"   cx="40" cy="40" r="32"/>
                <circle class="bc-ring-fill" cx="40" cy="40" r="32"
                  stroke="${ringColor}" stroke-dasharray="${circ}" stroke-dashoffset="${off}"/>
              </svg>
              <div class="bc-ring-label"><div class="bc-ring-pct">${p}%</div><div class="bc-ring-sub">مكتمل</div></div>
            </div>
            <div class="bc-prog-info">
              <div class="bc-prog-name">${esc(target.buildingName||'المبنى')}</div>
              <div class="bc-prog-track"><div class="bc-prog-bar" style="width:${p}%;background:${barColor}"></div></div>
              <div class="bc-prog-pips">${pips}</div>
              <div class="bc-prog-detail">${doneCount} من ${STAGE_DEFS.length} مراحل مكتملة</div>
            </div>
          </div>
          <div class="bc-timeline"><div class="bc-tl-line"></div>`;

        STAGE_DEFS.forEach((def,idx)=>{
          const done  =isDone(def.key);
          const isCurr=!done&&idx===ci;
          const stCls =done?'done':isCurr?'curr':'pend';
          const dotCls=done?'done':isCurr?'curr':'pend';
          const stage =getStage(def.key);
          const rd    = (()=>{try{return JSON.parse(stage?.reportData||'{}');}catch{return {};}})();
          const completionDate=stage?.endDate||stage?.completionDate||rd?.completionDate||null;
          const imgs  =getStageImages(stage);

          /* dot content — spinner for current */
          const dotContent = done
            ? '<i class="ri-check-line"></i>'
            : isCurr
              ? '<span class="bc-dot-spinner"></span>'
              : `${idx+1}`;

          let subHtml='';
          if(done)        subHtml=`<div class="bc-sr-sub done"><i class="ri-calendar-check-line"></i> اكتملت ${fmtDateShort(completionDate)||''}</div>`;
          else if(isCurr) subHtml=`<div class="bc-sr-sub curr"><i class="ri-record-circle-line"></i> المرحلة الجارية</div>`;
          else            subHtml=`<div class="bc-sr-sub"><i class="ri-time-line"></i> لم تبدأ بعد</div>`;

          let badgeHtml='';
          if(done)        badgeHtml=`<span class="bc-badge bc-b-d"><i class="ri-check-line"></i> مكتملة</span>`;
          else if(isCurr) badgeHtml=`<span class="bc-badge bc-b-c"><i class="ri-record-circle-line"></i> جارية</span>`;
          else            badgeHtml=`<span class="bc-badge bc-b-p">${idx+1}</span>`;

          /* action buttons for done/curr only */
          let actionsHtml='';
          if(done||isCurr){
            actionsHtml=`
              <button class="bc-action-btn bc-btn-report" data-key="${def.key}">
                <i class="ri-file-list-3-line"></i> التقرير
              </button>
              <button class="bc-action-btn bc-btn-photos" data-key="${def.key}">
                <i class="ri-image-2-line"></i> الصور
                ${imgs.length?`<span style="background:rgba(78,141,245,.2);padding:1px 6px;border-radius:20px;font-size:.68rem">${imgs.length}</span>`:''}
              </button>`;
          }

          html+=`
            <div class="bc-stage-row" style="animation-delay:${idx*45}ms">
              <div class="bc-dot-wrap"><div class="bc-dot ${dotCls}">${dotContent}</div></div>
              <div class="bc-sr ${stCls}">
                <div class="bc-sr-h">
                  <div class="bc-sr-top">
                    <div class="bc-sr-l">
                      <div>
                        <div class="bc-sr-nm${!done&&!isCurr?' mu':''}">${def.emoji} ${def.label}</div>
                        ${subHtml}
                      </div>
                    </div>
                    <div class="bc-badge-wrap">${badgeHtml}</div>
                  </div>
                  ${actionsHtml ? `<div class="bc-sr-actions">${actionsHtml}</div>` : ''}
                </div>
              </div>
            </div>`;
        });

        html+='</div>';
        if(ci===-1) html+=`<div class="bc-done-banner"><span class="bc-done-emoji">🎉</span><p>جميع مراحل البناء مكتملة!</p><div class="bc-done-sub">نتطلع إلى تسليمك الوحدة في أفضل حال</div></div>`;

        content.innerHTML=html;

        /* bind report buttons */
        content.querySelectorAll('.bc-btn-report').forEach(btn=>{
          btn.addEventListener('click',()=>{
            const def=STAGE_DEFS.find(d=>d.key===btn.dataset.key);
            if(def) openReportModal(def, getStage(def.key));
          });
        });

        /* bind photos buttons */
        content.querySelectorAll('.bc-btn-photos').forEach(btn=>{
          btn.addEventListener('click',()=>{
            const def=STAGE_DEFS.find(d=>d.key===btn.dataset.key);
            if(def) openPhotosModal(def, getStage(def.key));
          });
        });
      }
    }
  };
})();