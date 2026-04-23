/* PAGE MODULE: buildings — SPA v5 (redesigned) */
(function () {
  'use strict';
  window.__pages = window.__pages || {};

  const _css = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0d1421;
      --surface:#131c2e;
      --surface2:#0f1827;
      --border:rgba(255,255,255,0.07);
      --border-h:rgba(255,255,255,0.13);
      --text:#dde8ff;
      --text2:#a0b8d8;
      --muted:#4a6580;
      --muted2:#2e4560;
      --accent:#378ADD;
      --accent-dim:rgba(55,138,221,0.12);
      --accent-border:rgba(55,138,221,0.28);
      --success:#1D9E75;
      --success-dim:rgba(29,158,117,0.12);
      --success-border:rgba(29,158,117,0.28);
      --warning:#d4952a;
      --warning-dim:rgba(212,149,42,0.12);
      --warning-border:rgba(212,149,42,0.3);
      --danger:#c06060;
      --danger-dim:rgba(200,80,80,0.1);
      --danger-border:rgba(200,80,80,0.22);
      --r:12px;--r-sm:8px;--r-xs:6px;
      --tr:all 0.2s ease;
    }
    @keyframes bld-spin{to{transform:rotate(360deg)}}
    @keyframes bld-fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bld-fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes bld-slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes bld-pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes bld-popIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
    @media(max-width:640px){
      .bld-sels{grid-template-columns:1fr!important}
      .bld-page{padding:14px 12px 80px!important}
      .bld-panel-actions{flex-wrap:wrap}
      .bld-prog-card{flex-direction:column;gap:10px}
    }
    #bld-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
    #bld-modal.open{display:flex;animation:bld-fadeIn .18s ease}
    #bld-modal .mbox{background:#111d30;border:1px solid var(--border-h);border-radius:16px;max-width:520px;width:94%;max-height:88vh;overflow-y:auto;animation:bld-popIn .22s ease;box-shadow:0 32px 80px rgba(0,0,0,0.6)}
    #bld-modal .mbox.wide{max-width:820px}
    #bld-modal .mhead{padding:16px 20px 14px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#111d30;z-index:2;border-radius:16px 16px 0 0}
    #bld-modal .mhead h2{font-size:.95rem;font-weight:700;color:var(--text)}
    #bld-modal .mcls{background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--muted);font-size:.9rem;cursor:pointer;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:7px;transition:var(--tr)}
    #bld-modal .mcls:hover{color:var(--text);background:var(--danger-dim);border-color:var(--danger-border)}
    #bld-modal .mbody{padding:18px 20px}
    #bld-modal .mfoot{padding:12px 20px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end;position:sticky;bottom:0;background:#0e1928;border-radius:0 0 16px 16px}
    #bld-lb{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:5000;align-items:center;justify-content:center;flex-direction:column;gap:16px}
    #bld-lb.open{display:flex;animation:bld-fadeIn .18s ease}
    #bld-lb-img-wrap{position:relative;max-width:90vw;max-height:78vh;border-radius:12px;overflow:hidden}
    #bld-lb img{display:block;max-width:88vw;max-height:76vh;object-fit:contain;border-radius:10px}
    #bld-lb-caption{color:rgba(255,255,255,0.4);font-size:.78rem;text-align:center}
    .bld-lb-bar{display:flex;gap:8px;align-items:center}
    .bld-lb-btn{padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.08);color:#fff;font-size:.8rem;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:'Tajawal',sans-serif;font-weight:600;transition:var(--tr)}
    .bld-lb-btn:hover{background:rgba(255,255,255,0.15)}
    .bld-lb-btn.del{border-color:var(--danger-border);color:var(--danger)}
    .bld-lb-btn.del:hover{background:var(--danger-dim)}
    #bld-lb-prev,#bld-lb-next{position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;transition:var(--tr)}
    #bld-lb-prev{right:18px}
    #bld-lb-next{left:18px}
    #bld-lb-prev:hover,#bld-lb-next:hover{background:rgba(255,255,255,0.15)}
    #bld-toast-container{position:fixed;bottom:20px;left:20px;z-index:9999;display:flex;flex-direction:column;gap:7px;pointer-events:none}
    .bld-toast{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;background:#0e1928;border:1px solid var(--border);font-size:.8rem;font-weight:600;animation:bld-slideDown .2s ease;max-width:280px;pointer-events:all}
    .bld-toast i{font-size:1rem}
    .bld-toast.ok{border-color:var(--success-border);color:var(--success)}
    .bld-toast.err{border-color:var(--danger-border);color:var(--danger)}
    .bld-toast.info{border-color:var(--accent-border);color:var(--accent)}
    .bld-fg{margin-bottom:13px}
    .bld-fg label{display:block;font-size:.72rem;font-weight:700;margin-bottom:5px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
    .bld-fi,.bld-fsel,.bld-fta{width:100%;padding:9px 12px;border-radius:var(--r-sm);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:var(--text)!important;font-family:inherit;font-size:.88rem;transition:var(--tr)}
    .bld-fi::placeholder{color:var(--muted2)}
    .bld-fsel{appearance:none;cursor:pointer;color-scheme:dark;color:#dde8ff}
    .bld-fsel:focus{animation:bld-dropOpen .18s cubic-bezier(0.4,0,.2,1)}
    @keyframes bld-dropOpen{from{opacity:.8;transform:scaleY(.97)}to{opacity:1;transform:scaleY(1)}}
    .bld-fta{resize:vertical;min-height:72px;line-height:1.6}
    .bld-fi:focus,.bld-fsel:focus,.bld-fta:focus{outline:none;background:var(--accent-dim);border-color:var(--accent);box-shadow:0 0 0 3px rgba(55,138,221,0.12)}
    .bld-fsel option{background:#0d2040;color:#dde8ff!important}
    .bld-fsel{color-scheme:dark}
    .bld-tg{display:flex;border-radius:var(--r-xs);overflow:hidden;border:1px solid rgba(255,255,255,0.09)}
    .bld-tgb{flex:1;padding:9px;background:transparent;border:none;color:var(--muted);font-family:inherit;font-size:.83rem;font-weight:700;cursor:pointer;transition:var(--tr)}
    .bld-tgb+.bld-tgb{border-right:1px solid rgba(255,255,255,0.07)}
    .bld-tgb.y{background:var(--success-dim);color:var(--success)}
    .bld-tgb.n{background:var(--danger-dim);color:var(--danger)}
    .bld-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:var(--r-sm);border:none;font-family:inherit;font-size:.83rem;font-weight:700;cursor:pointer;transition:var(--tr)}
    .bld-btn:disabled{opacity:.4;cursor:not-allowed}
    .bld-btn-p{background:var(--accent-dim);color:var(--accent);border:1px solid var(--accent-border)}
    .bld-btn-p:hover:not(:disabled){background:rgba(55,138,221,0.2)}
    .bld-btn-s{background:var(--success-dim);color:var(--success);border:1px solid var(--success-border)}
    .bld-btn-s:hover:not(:disabled){background:rgba(29,158,117,0.2)}
    .bld-btn-d{background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger-border)}
    .bld-btn-d:hover:not(:disabled){background:rgba(200,80,80,0.18)}
    .bld-btn-g{background:rgba(255,255,255,0.04);color:var(--text2);border:1px solid var(--border-h)}
    .bld-btn-g:hover:not(:disabled){background:rgba(255,255,255,0.08)}
    .bld-btn-w{background:var(--warning-dim);color:var(--warning);border:1px solid var(--warning-border)}
    .bld-btn-w:hover:not(:disabled){background:rgba(212,149,42,0.2)}
    .bld-btn-sm{padding:6px 12px;font-size:.78rem;border-radius:7px}
    .bld-page{padding:22px 24px 100px;max-width:960px;margin:0 auto}
    .bld-hdr{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 24px;margin:-22px -24px 20px;background:rgba(13,20,33,0.97);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);animation:bld-fadeUp .3s ease both}
    @media(max-width:768px){.bld-hdr{margin:-14px -12px 16px;padding:10px 14px}}
    .bld-hdr-l{display:flex;align-items:center;gap:10px}
    .bld-hdr-icon{width:38px;height:38px;border-radius:10px;background:var(--accent-dim);border:1px solid var(--accent-border);display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1.1rem}
    .bld-hdr-t{font-size:1.05rem;font-weight:800;letter-spacing:-.02em;color:var(--text)}
    .bld-hdr-s{font-size:.72rem;color:var(--muted);margin-top:1px}
    .bld-sels{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;animation:bld-fadeUp .3s ease both}
    .bld-sel-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:border-color .2s}
    .bld-sel-card:focus-within{border-color:var(--accent-border)}
    .bld-sel-card-top{padding:8px 12px 5px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--border)}
    .bld-sel-card-top i{color:var(--accent);font-size:.85rem}
    .bld-sel-card-top span{font-size:.67rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
    .bld-sel-card select{width:100%;padding:9px 12px 11px;background:transparent;border:none;outline:none;color:#dde8ff!important;font-family:inherit;font-size:.9rem;font-weight:600;cursor:pointer;appearance:none;color-scheme:dark;transition:color .15s}
    .bld-sel-card select option{background:#0d2040;color:#dde8ff!important}
    .bld-prog-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px 20px;margin-bottom:18px;display:flex;align-items:center;gap:20px;animation:bld-fadeUp .32s ease both}
    .bld-prog-num{text-align:center;min-width:56px}
    .bld-prog-pct{font-size:2rem;font-weight:800;color:var(--accent);letter-spacing:-.04em;line-height:1}
    .bld-prog-pct-lbl{font-size:.65rem;color:var(--muted);margin-top:2px}
    .bld-prog-right{flex:1}
    .bld-prog-name{font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:8px}
    .bld-prog-bar-bg{height:5px;background:rgba(255,255,255,0.06);border-radius:5px;overflow:hidden;margin-bottom:7px}
    .bld-prog-bar{height:100%;background:var(--accent);border-radius:5px;transition:width 1s ease}
    .bld-prog-pips{display:flex;gap:4px}
    .bld-prog-pip{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,0.07);transition:background .4s}
    .bld-prog-pip.done{background:var(--success)}
    .bld-prog-pip.curr{background:var(--accent);animation:bld-pulse 2s infinite}
    .bld-prog-detail{font-size:.72rem;color:var(--muted);margin-top:6px}
    .bld-timeline{display:flex;flex-direction:column;position:relative}
    .bld-tl-line{position:absolute;right:17px;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.06);z-index:0;border-radius:2px}
    .bld-stage-row{display:flex;gap:14px;align-items:flex-start;position:relative;z-index:1;margin-bottom:6px;animation:bld-fadeUp .3s ease both}
    .bld-dot-wrap{display:flex;flex-direction:column;align-items:center;flex-shrink:0;padding-top:13px}
    .bld-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;border:2px solid transparent;position:relative;z-index:2;background:var(--bg)}
    .bld-dot.done{border-color:var(--success);color:var(--success);background:#0a1a12}
    .bld-dot.curr{border-color:var(--accent);color:var(--accent);background:#0a1524;box-shadow:0 0 0 5px rgba(55,138,221,0.1)}
    .bld-dot.pend{border-color:rgba(255,255,255,0.1);color:var(--muted2);background:var(--bg)}
    .bld-sr{flex:1;border-radius:var(--r);border:1px solid var(--border);background:var(--surface);overflow:hidden;transition:border-color .2s,background .2s}
    .bld-sr.done{border-color:var(--success-border)}
    .bld-sr.curr{border-color:var(--accent-border);background:#0f1b2d}
    .bld-sr.pend{opacity:.45}
    .bld-sr-h{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px;cursor:pointer;user-select:none}
    .bld-sr-l{display:flex;align-items:center;gap:10px;flex:1;min-width:0}
    .bld-sr-info{min-width:0;flex:1}
    .bld-sr-nm{font-size:.9rem;font-weight:700;color:var(--text);line-height:1.2}
    .bld-sr-nm.mu{color:var(--muted);font-weight:400}
    .bld-sr-sub{font-size:.7rem;color:var(--muted2);margin-top:3px;display:flex;align-items:center;gap:4px}
    .bld-sr-sub.done{color:var(--success)}
    .bld-sr-sub.curr{color:#5a9acc}
    .bld-sr-r{display:flex;align-items:center;gap:7px;flex-shrink:0}
    .bld-badge{padding:3px 9px;border-radius:20px;font-size:.68rem;font-weight:700}
    .bld-b-d{background:var(--success-dim);color:var(--success);border:1px solid var(--success-border)}
    .bld-b-c{background:var(--accent-dim);color:var(--accent);border:1px solid var(--accent-border)}
    .bld-b-p{background:rgba(255,255,255,0.04);color:var(--muted);border:1px solid var(--border)}
    .bld-ib{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);background:rgba(255,255,255,0.03);color:var(--muted);cursor:pointer;font-size:.8rem;transition:var(--tr)}
    .bld-ib:hover{background:var(--danger-dim);color:var(--danger);border-color:var(--danger-border)}
    .bld-ib.disabled-del{opacity:.25;cursor:not-allowed;pointer-events:none}
    .bld-chev{color:var(--muted2);font-size:.9rem;transition:transform .28s;margin-right:2px}
    .bld-panel{max-height:0;overflow:hidden;transition:max-height .38s cubic-bezier(.4,0,.2,1)}
    .bld-panel.open{max-height:3000px}
    .bld-p-in{padding:0 16px 16px;border-top:1px solid var(--border)}
    .bld-ph-sec{margin-top:14px}
    .bld-ph-lbl{font-size:.68rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px;display:flex;align-items:center;gap:6px}
    .bld-ph-count{background:var(--accent-dim);color:var(--accent);padding:1px 7px;border-radius:20px;font-size:.68rem;font-weight:700}
    .bld-ph-grid{display:flex;gap:7px;flex-wrap:wrap;align-items:flex-end}
    .bld-ph-thumb{position:relative;width:76px;height:62px;border-radius:9px;overflow:hidden;border:1px solid var(--border);cursor:pointer;flex-shrink:0;transition:border-color .2s,transform .2s;background:var(--surface2)}
    .bld-ph-thumb:hover{border-color:var(--accent);transform:scale(1.05)}
    .bld-ph-thumb img{width:100%;height:100%;object-fit:cover;display:block}
    .bld-ph-overlay{position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .2s;display:flex;align-items:center;justify-content:center}
    .bld-ph-thumb:hover .bld-ph-overlay{background:rgba(0,0,0,0.45)}
    .bld-ph-overlay i{color:#fff;font-size:1rem;opacity:0;transition:opacity .2s}
    .bld-ph-thumb:hover .bld-ph-overlay i{opacity:1}
    .bld-ph-del-btn{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:rgba(200,60,60,0.9);border:none;color:#fff;font-size:.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;z-index:2}
    .bld-ph-thumb:hover .bld-ph-del-btn{opacity:1}
    .bld-ph-num{position:absolute;bottom:3px;right:4px;background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.75);font-size:.58rem;padding:1px 5px;border-radius:20px;font-weight:700}
    .bld-ph-upload{width:76px;height:62px;border-radius:9px;border:1.5px dashed var(--accent-border);background:var(--accent-dim);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;transition:var(--tr);flex-shrink:0;position:relative;overflow:hidden}
    .bld-ph-upload:hover{background:rgba(55,138,221,0.18)}
    .bld-ph-upload i{font-size:1.1rem;color:var(--accent)}
    .bld-ph-upload span{font-size:.58rem;color:var(--muted);font-weight:600;text-align:center}
    .bld-ph-upload.loading{opacity:.5;pointer-events:none}
    .bld-ph-empty{padding:11px 14px;border-radius:8px;background:rgba(255,255,255,0.02);border:1px dashed var(--border);color:var(--muted2);font-size:.78rem;display:flex;align-items:center;gap:6px}
    input.bld-hf{display:none}
    .bld-panel-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}
    .bld-rep-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px;margin-top:10px;margin-bottom:10px}
    .bld-rep-field{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:8px 10px}
    .bld-rep-label{font-size:.62rem;color:var(--muted2);margin-bottom:4px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
    .bld-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:.74rem;font-weight:700}
    .bld-cy{background:var(--success-dim);color:var(--success);border:1px solid var(--success-border)}
    .bld-cn{background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger-border)}
    .bld-tbg{display:inline-block;padding:2px 8px;border-radius:20px;background:var(--accent-dim);color:#7ab8e8;border:1px solid rgba(55,138,221,0.18);font-size:.76rem}
    .bld-notes-v{margin-top:9px;font-size:.83rem;color:#7a9ab8;line-height:1.75;background:rgba(255,255,255,0.02);border:1px solid var(--border);padding:10px 13px;border-radius:8px}
    .bld-comp-date-badge{display:inline-flex;align-items:center;gap:5px;background:var(--success-dim);color:var(--success);border:1px solid var(--success-border);padding:3px 10px;border-radius:20px;font-size:.73rem;font-weight:700;margin-bottom:10px}
    .bld-pdiv{height:1px;background:var(--border);margin:12px 0}
    .bld-m-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin-top:12px}
    .bld-m-gthumb{position:relative;aspect-ratio:4/3;border-radius:9px;overflow:hidden;cursor:pointer;border:1px solid var(--border);transition:border-color .2s,transform .2s}
    .bld-m-gthumb:hover{border-color:var(--accent);transform:scale(1.02)}
    .bld-m-gthumb img{width:100%;height:100%;object-fit:cover;display:block}
    .bld-m-gthumb-overlay{position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .2s}
    .bld-m-gthumb:hover .bld-m-gthumb-overlay{background:rgba(0,0,0,0.45)}
    .bld-m-gthumb-overlay i{color:#fff;opacity:0;font-size:1.1rem;transition:opacity .2s}
    .bld-m-gthumb:hover .bld-m-gthumb-overlay i{opacity:1}
    .bld-m-upload{width:100%;padding:8px 13px;border-radius:9px;border:1.5px dashed var(--accent-border);background:var(--accent-dim);color:var(--accent);font-size:.8rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:var(--tr);margin-top:10px;font-family:inherit}
    .bld-m-upload:hover{background:rgba(55,138,221,0.18)}
    .bld-m-upload.loading{opacity:.5;pointer-events:none}
    .bld-lb-box{display:flex;align-items:center;justify-content:center;min-height:240px}
    .bld-spin{width:38px;height:38px;border:3px solid rgba(255,255,255,0.06);border-top-color:var(--accent);border-radius:50%;animation:bld-spin .75s linear infinite}
    .bld-emp{text-align:center;padding:60px 20px;color:var(--muted2)}
    .bld-emp-icon{font-size:2rem;display:block;margin-bottom:10px;opacity:.2}
    .bld-emp p{font-size:.88rem;line-height:1.7}
    .bld-done-banner{text-align:center;padding:22px;margin-top:14px;background:var(--success-dim);border:1px solid var(--success-border);border-radius:14px;animation:bld-fadeUp .4s ease both}
    .bld-done-banner .bld-done-emoji{font-size:2rem;display:block;margin-bottom:8px}
    .bld-done-banner p{color:var(--success);font-weight:800;font-size:.95rem}
    .bld-done-banner .bld-done-sub{color:var(--muted);font-size:.8rem;margin-top:4px}
    .bld-confirm-box{text-align:center;padding:24px 18px}
    .bld-confirm-icon{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem}
    .bld-confirm-icon.danger{background:var(--danger-dim);border:1px solid var(--danger-border)}
    .bld-confirm-icon.success{background:var(--success-dim);border:1px solid var(--success-border)}
    .bld-confirm-text{color:var(--text2);line-height:1.8;font-size:.87rem;max-width:300px;margin:0 auto}
    .bld-confirm-text strong{color:var(--text)}
    .bld-confirm-actions{display:flex;gap:8px;justify-content:center;margin-top:18px}
    .bld-date-section{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-top:14px}
    .bld-date-section label{display:block;font-size:.72rem;font-weight:700;margin-bottom:7px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
    .bld-next-card{margin-top:18px;padding:16px 18px;background:var(--accent-dim);border:1.5px dashed var(--accent-border);border-radius:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;animation:bld-fadeUp .4s ease both}
    .bld-next-info{display:flex;align-items:center;gap:10px}
    .bld-next-icon{width:36px;height:36px;border-radius:10px;background:rgba(55,138,221,0.1);border:1px solid var(--accent-border);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
    .bld-next-label{font-size:.78rem;color:var(--muted);font-weight:600}
    .bld-next-name{font-size:.9rem;font-weight:800;color:var(--text);margin-top:2px}
    @media(max-width:480px){.bld-next-card{flex-direction:column;align-items:flex-start}}
  `;

  window.__pages['buildings'] = {
    getCSS: function () { return _css; },
    init: async function () {

      const container = document.getElementById('app-main');
      container.innerHTML = `
        <div id="bld-modal">
          <div class="mbox" id="bld-mbox">
            <div class="mhead"><h2 id="bld-mTitle"></h2><button class="mcls" id="bld-mCls"><i class="ri-close-line"></i></button></div>
            <div id="bld-mBody"></div>
          </div>
        </div>
        <div id="bld-lb">
          <div id="bld-lb-img-wrap"><img id="bld-lb-img" src="" alt=""/></div>
          <div id="bld-lb-caption"></div>
          <div class="bld-lb-bar">
            <button class="bld-lb-btn" id="bld-lb-prev"><i class="ri-arrow-right-line"></i> السابقة</button>
            <button class="bld-lb-btn" id="bld-lb-close-btn"><i class="ri-close-line"></i> إغلاق</button>
            <button class="bld-lb-btn del" id="bld-lb-del-btn"><i class="ri-delete-bin-line"></i> حذف</button>
            <button class="bld-lb-btn" id="bld-lb-next"><i class="ri-arrow-left-line"></i> التالية</button>
          </div>
        </div>
        <div id="bld-toast-container"></div>
        <div class="bld-page">
          <div class="bld-hdr">
            <div class="bld-hdr-l">
              <div class="bld-hdr-icon"><i class="ri-building-4-line"></i></div>
              <div><div class="bld-hdr-t">مراحل البناء</div><div class="bld-hdr-s">تتبع وإدارة مراحل الإنشاء</div></div>
            </div>
            <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-refreshBtn"><i class="ri-refresh-line"></i> <span>تحديث</span></button>
          </div>
          <div class="bld-sels">
            <div class="bld-sel-card">
              <div class="bld-sel-card-top"><i class="ri-home-4-line"></i><span>المشروع</span></div>
              <select id="bld-pSel"><option value="">— كل المشاريع —</option></select>
            </div>
            <div class="bld-sel-card">
              <div class="bld-sel-card-top"><i class="ri-building-2-line"></i><span>العمارة</span></div>
              <select id="bld-bSel"><option value="">اختر العمارة</option></select>
            </div>
          </div>
          <div id="bld-sw"><div class="bld-lb-box"><div class="bld-spin"></div></div></div>
        </div>`;

      const S = { projects: [], buildings: [], stages: [], selProject: '', selBuilding: '', building: null };
      let lbImages = [], lbIndex = 0, lbKey = null, lbStageId = null;

      const DEFS = [
        { key: 'SitePreparation',  emoji: '⛏️', label: 'تجهيز الموقع والحفر' },
        { key: 'Foundation',       emoji: '🧱', label: 'الأساسات' },
        { key: 'Structure',        emoji: '🏗️', label: 'الهيكل الإنشائي' },
        { key: 'MasonryAndWalls',  emoji: '🏠', label: 'المباني والحوائط' },
        { key: 'InitialFinishing', emoji: '🔨', label: 'التشطيبات الأولية' },
        { key: 'FinalFinishing',   emoji: '🎨', label: 'التشطيبات النهائية' },
        { key: 'Handover',         emoji: '🔑', label: 'التسليم' },
      ];

      const RFIELDS = {
        SitePreparation:  [{ id: 'soilTest', type: 'toggle', label: 'اختبار التربة' }, { id: 'excavationDepth', type: 'number', label: 'عمق الحفر (م)' }, { id: 'soilType', type: 'text', label: 'نوع التربة' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        Foundation:       [{ id: 'concreteType', type: 'text', label: 'نوع الخرسانة' }, { id: 'steelType', type: 'text', label: 'نوع الحديد' }, { id: 'insulationType', type: 'text', label: 'نوع العزل' }, { id: 'pressureTest', type: 'toggle', label: 'اختبار الضغط' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        Structure:        [{ id: 'columnConcrete', type: 'text', label: 'خرسانة الأعمدة' }, { id: 'roofConcrete', type: 'text', label: 'خرسانة الأسقف' }, { id: 'floorsPouredCount', type: 'number', label: 'أدوار مصبوبة' }, { id: 'cubeTest', type: 'toggle', label: 'اختبار المكعبات' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        MasonryAndWalls:  [{ id: 'blockType', type: 'text', label: 'نوع البلوك' }, { id: 'plastering', type: 'toggle', label: 'البياض' }, { id: 'waterproofing', type: 'toggle', label: 'العزل المائي' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        InitialFinishing: [{ id: 'electrical', type: 'toggle', label: 'الكهربائية' }, { id: 'plumbing', type: 'toggle', label: 'السباكة' }, { id: 'tiling', type: 'toggle', label: 'التبليط' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        FinalFinishing:   [{ id: 'painting', type: 'toggle', label: 'الدهان' }, { id: 'kitchens', type: 'toggle', label: 'المطابخ' }, { id: 'acInstalled', type: 'toggle', label: 'التكييف' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
        Handover:         [{ id: 'handoverDate', type: 'date', label: 'تاريخ التسليم' }, { id: 'snagsDone', type: 'toggle', label: 'حل الملاحظات' }, { id: 'keysHanded', type: 'toggle', label: 'تسليم المفاتيح' }, { id: 'notes', type: 'textarea', label: 'ملاحظات' }],
      };

      const API_BASE = `http://${window.location.hostname}:5256`;

      function getToken() {
        let t = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!t) { try { const p = JSON.parse(localStorage.getItem('authData') || '{}'); t = p.token || p.authToken; } catch { } }
        return t || '';
      }

      function translateError(msg) {
        if (!msg) return 'حدث خطأ غير معروف';
        const m = msg.toLowerCase();
        if (m.includes('name') && (m.includes('duplicate') || m.includes('unique') || m.includes('already'))) return 'هذا الاسم مستخدم مسبقاً';
        if (m.includes('unique') || m.includes('duplicate') || (m.includes('already') && m.includes('exist')) || m.includes('ix_') || m.includes('uq_')) return 'هذه البيانات مسجلة مسبقاً';
        if (m.includes('foreign key') || m.includes('reference')) return 'لا يمكن تنفيذ العملية — توجد بيانات مرتبطة';
        if (m.includes('not found') || m.includes('404')) return 'العنصر غير موجود';
        return msg;
      }

      async function apiReq(method, path, body) {
        const token = getToken();
        if (!token) { toast('يرجى تسجيل الدخول', 'err'); return null; }
        const opts = { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
        if (body !== undefined) opts.body = JSON.stringify(body);
        const r = await fetch(API_BASE + path, opts);
        if (r.status === 401 || r.status === 403) { localStorage.clear(); window.location.replace('/unauth.html'); return; }
        if (!r.ok) { let m = `خطأ ${r.status}`; try { const b = await r.json(); m = b?.message || b?.title || m; } catch { } throw new Error(m); }
        if (r.status === 204) return null;
        return r.json().catch(() => null);
      }

      async function uploadFile(path, fd) {
        const token = getToken();
        const r = await fetch(API_BASE + path, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd });
        if (!r.ok) { let m = `خطأ ${r.status}`; try { const b = await r.json(); m = b?.message || b?.title || m; } catch { } throw new Error(m); }
        return r.json().catch(() => null);
      }

      const GET  = p      => apiReq('GET', p);
      const PUT  = (p, b) => apiReq('PUT', p, b);
      const POST = (p, b) => apiReq('POST', p, b);
      const DEL  = p      => apiReq('DELETE', p);

      function toArr(v) { if (Array.isArray(v)) return v; if (v && typeof v === 'object') return v.data || v.items || v.value || v.results || []; return []; }

      function getStageImages(stage) {
        if (!stage) return [];
        for (const f of ['images','stageImages','photos','files','attachments','Images','StageImages','Photos','Files','Attachments']) { const a = toArr(stage[f]); if (a.length) return a; }
        return [];
      }

      function imgSrc(img) {
        if (!img) return '';
        let src = img.imageUrl || img.ImageUrl || img.url || img.Url || img.src || img.Src
          || img.filePath || img.FilePath || img.path || img.Path
          || img.imageUri || img.ImageUri || img.uri || img.Uri
          || img.fileName || img.FileName || '';
        if (!src && typeof img === 'string') src = img;
        if (src && !src.startsWith('http') && !src.startsWith('blob') && !src.startsWith('data')) src = `${API_BASE}/${src.replace(/^\/+/, '')}`;
        src = src.replace(/^(https?:\/\/[^/]+)\/(https?:\/\/)/, '$2');
        return src;
      }

      function toast(msg, type = 'ok') {
        const el = document.createElement('div');
        el.className = `bld-toast ${type}`;
        const icons = { ok: 'checkbox-circle', err: 'error-warning', info: 'information' };
        el.innerHTML = `<i class="ri-${icons[type] || 'information'}-line"></i><span>${msg}</span>`;
        document.getElementById('bld-toast-container').appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 3000);
      }

      function openModal(title, html, wide = false) {
        document.getElementById('bld-mTitle').textContent = title;
        document.getElementById('bld-mBody').innerHTML = html;
        wide ? document.getElementById('bld-mbox').classList.add('wide') : document.getElementById('bld-mbox').classList.remove('wide');
        document.getElementById('bld-modal').classList.add('open');
      }
      function closeModal() { document.getElementById('bld-modal').classList.remove('open'); document.getElementById('bld-mBody').innerHTML = ''; }
      window.closeModal = closeModal;

      function openLb(images, startIndex, key, stageId) {
        lbImages = images; lbIndex = startIndex; lbKey = key; lbStageId = stageId || null;
        showLbImage(); document.getElementById('bld-lb').classList.add('open');
      }
      function showLbImage() {
        if (!lbImages.length) return;
        const img = lbImages[lbIndex];
        document.getElementById('bld-lb-img').src = imgSrc(img);
        document.getElementById('bld-lb-caption').textContent = `${lbIndex + 1} / ${lbImages.length}`;
        document.getElementById('bld-lb-del-btn').dataset.id = img.id || img.Id || img.imageId || img.ImageId || '';
        document.getElementById('bld-lb-prev').style.opacity = lbImages.length > 1 ? '1' : '0.3';
        document.getElementById('bld-lb-next').style.opacity = lbImages.length > 1 ? '1' : '0.3';
      }
      function closeLb() { document.getElementById('bld-lb').classList.remove('open'); }

      document.getElementById('bld-lb').addEventListener('click', e => { if (e.target === document.getElementById('bld-lb')) closeLb(); }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-lb-close-btn').addEventListener('click', closeLb, { signal: window.__pageAbortSignal });
      document.getElementById('bld-lb-prev').addEventListener('click', () => { if (lbImages.length < 2) return; lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showLbImage(); }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-lb-next').addEventListener('click', () => { if (lbImages.length < 2) return; lbIndex = (lbIndex + 1) % lbImages.length; showLbImage(); }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-lb-del-btn').addEventListener('click', () => { const id = document.getElementById('bld-lb-del-btn').dataset.id; if (id && lbKey) { closeLb(); delPhoto(id, lbKey); } }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-mCls').addEventListener('click', closeModal, { signal: window.__pageAbortSignal });
      document.getElementById('bld-modal').addEventListener('click', e => { if (e.target === document.getElementById('bld-modal')) closeModal(); }, { signal: window.__pageAbortSignal });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { if (document.getElementById('bld-lb').classList.contains('open')) closeLb(); else if (document.getElementById('bld-modal').classList.contains('open')) closeModal(); }
        if (document.getElementById('bld-lb').classList.contains('open')) {
          if (e.key === 'ArrowRight') document.getElementById('bld-lb-prev').click();
          if (e.key === 'ArrowLeft') document.getElementById('bld-lb-next').click();
        }
      }, { signal: window.__pageAbortSignal });

      function esc(s) { return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
      function fmtDate(d) { if (!d) return null; try { return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return null; } }
      function fmtDateShort(d) { if (!d) return null; try { return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return null; } }
      function toInputDate(d) { if (!d) return ''; try { return new Date(d).toISOString().split('T')[0]; } catch { return ''; } }
      function setBusy(id, busy, orig) { const el = document.getElementById(id); if (!el) return; el.disabled = busy; if (busy) el.innerHTML = '<i class="ri-loader-4-line" style="animation:bld-spin .7s linear infinite;display:inline-block"></i> جاري...'; else if (orig) el.innerHTML = orig; }

      function getStage(key) { return S.stages.find(s => s.stageName === key) || null; }
      function isDone(key) { const s = getStage(key); return s ? (s.isCompleted === true || s.status === 'Completed') : false; }
      function currIdx() { for (let i = 0; i < DEFS.length; i++) { if (!isDone(DEFS[i].key)) return i; } return -1; }
      function pct() { return Math.round(DEFS.filter(d => isDone(d.key)).length / DEFS.length * 100); }
      function lastDoneIdx() { let last = -1; for (let i = 0; i < DEFS.length; i++) { if (isDone(DEFS[i].key)) last = i; } return last; }

      function fillProjs() {
        const sel = document.getElementById('bld-pSel'); if (!sel) return;
        sel.innerHTML = '<option value="">— كل المشاريع —</option>';
        S.projects.forEach(p => sel.innerHTML += `<option value="${p.id}">${esc(p.name || '')}</option>`);
        if (S.selProject) sel.value = S.selProject;
      }
      function fillBldgs() {
        const sel = document.getElementById('bld-bSel'); if (!sel) return;
        sel.innerHTML = '<option value="">اختر العمارة</option>';
        const list = S.selProject ? S.buildings.filter(b => String(b.projectId) === String(S.selProject)) : S.buildings;
        list.forEach(b => sel.innerHTML += `<option value="${b.id}">${esc(b.name || '')}</option>`);
        if (S.selBuilding) sel.value = S.selBuilding;
      }
      function onProject(val) {
        S.selProject = val; S.selBuilding = ''; fillBldgs();
        const w = document.getElementById('bld-sw');
        if (w) w.innerHTML = `<div class="bld-emp"><span class="bld-emp-icon"><i class="ri-building-line"></i></span><p>اختر عمارة لعرض المراحل</p></div>`;
      }
      function onBuilding(val) { S.selBuilding = val; S.building = S.buildings.find(b => String(b.id) === val) || null; loadStages(); }

      async function loadInitial() {
        showLoader();
        const [pd, bd] = await Promise.all([GET('/api/Projects').catch(() => null), GET('/api/Buildings').catch(() => null)]);
        S.projects = toArr(pd); S.buildings = toArr(bd);
        fillProjs(); fillBldgs();
        const w = document.getElementById('bld-sw');
        if (w) w.innerHTML = `<div class="bld-emp"><span class="bld-emp-icon"><i class="ri-building-4-line"></i></span><p>اختر مشروعاً وعمارة لعرض مراحل البناء</p></div>`;
      }
      function showLoader() { const w = document.getElementById('bld-sw'); if (w) w.innerHTML = '<div class="bld-lb-box"><div class="bld-spin"></div></div>'; }

      async function loadStages() {
        if (!S.selBuilding) { const w = document.getElementById('bld-sw'); if (w) w.innerHTML = `<div class="bld-emp"><span class="bld-emp-icon"><i class="ri-building-line"></i></span><p>اختر عمارة</p></div>`; return; }
        showLoader();
        try {
          const data = await GET(`/api/ConstructionStages?buildingId=${S.selBuilding}`);
          S.stages = toArr(data);
          const stagesWithoutImages = S.stages.filter(s => !getStageImages(s).length && s.id);
          if (stagesWithoutImages.length) {
            await Promise.all(stagesWithoutImages.map(async s => {
              try { const imgs = await GET(`/api/StageImages?stageId=${s.id}`); const arr = toArr(imgs); if (arr.length) s.images = arr; } catch { }
            }));
          }
          render();
        } catch (e) {
          toast('فشل تحميل البيانات', 'err');
          const w = document.getElementById('bld-sw');
          if (w) w.innerHTML = `<div class="bld-emp"><span class="bld-emp-icon"><i class="ri-wifi-off-line"></i></span><p>فشل الاتصال بالخادم</p></div>`;
        }
      }

      function render() {
        const wrap = document.getElementById('bld-sw'); if (!wrap) return;
        const p = pct(), ci = currIdx(), bName = esc(S.building?.name || 'العمارة');
        const doneCount = DEFS.filter(d => isDone(d.key)).length;
        const ld = lastDoneIdx();

        const pips = DEFS.map((d, i) => {
          const cls = isDone(d.key) ? 'done' : (i === ci ? 'curr' : '');
          return `<div class="bld-prog-pip ${cls}"></div>`;
        }).join('');

        let html = `
          <div class="bld-prog-card">
            <div class="bld-prog-num">
              <div class="bld-prog-pct">${p}%</div>
              <div class="bld-prog-pct-lbl">مكتمل</div>
            </div>
            <div class="bld-prog-right">
              <div class="bld-prog-name">${bName}</div>
              <div class="bld-prog-bar-bg"><div class="bld-prog-bar" style="width:${p}%"></div></div>
              <div class="bld-prog-pips">${pips}</div>
              <div class="bld-prog-detail">${doneCount} من ${DEFS.length} مراحل مكتملة</div>
            </div>
          </div>
          <div class="bld-timeline">
            <div class="bld-tl-line"></div>`;

        DEFS.forEach((def, idx) => {
          const done = isDone(def.key), isCurr = !done && idx === ci;
          const stCls = done ? 'done' : isCurr ? 'curr' : 'pend';
          const dotCls = done ? 'done' : isCurr ? 'curr' : 'pend';
          const dotContent = done ? '<i class="ri-check-line"></i>' : isCurr ? '<i class="ri-play-fill"></i>' : `${idx + 1}`;
          const stage = getStage(def.key);
          let rd = {}; if (stage?.reportData) { try { rd = JSON.parse(stage.reportData); } catch { } }
          const completionDate = stage?.endDate || stage?.completionDate || rd?.completionDate || null;

          let subHtml = '';
          if (done) subHtml = `<div class="bld-sr-sub done"><i class="ri-calendar-check-line"></i> اكتملت ${fmtDateShort(completionDate) || ''}</div>`;
          else if (isCurr) subHtml = `<div class="bld-sr-sub curr"><i class="ri-record-circle-line"></i> المرحلة الجارية</div>`;
          else subHtml = `<div class="bld-sr-sub"><i class="ri-time-line"></i> لم تبدأ بعد</div>`;

          const isLastDone = done && idx === ld;
          let rightHtml = '';
          if (done) {
            rightHtml = `
              <button class="bld-ib ${isLastDone ? '' : 'disabled-del'}" data-act="del" data-id="${stage?.id || ''}" data-label="${esc(def.label)}" title="${isLastDone ? 'حذف المرحلة' : 'يمكنك حذف المرحلة الأخيرة فقط'}"><i class="ri-delete-bin-line"></i></button>
              <span class="bld-badge bld-b-d"><i class="ri-check-line"></i> مكتملة</span>
              <i class="ri-arrow-down-s-line bld-chev" id="bld-chev-${def.key}"></i>`;
          } else if (isCurr) {
            rightHtml = `
              <span class="bld-badge bld-b-c"><i class="ri-record-circle-line"></i> جارية</span>
              <i class="ri-arrow-down-s-line bld-chev" id="bld-chev-${def.key}"></i>`;
          } else {
            rightHtml = `<span class="bld-badge bld-b-p">${idx + 1}</span>`;
          }

          let panelHtml = '';
          if (done || isCurr) {
            panelHtml = `<div class="bld-p-in">`;
            const imgs = getStageImages(stage);
            const stageId = stage?.id || stage?.Id || '';

            if (isCurr) {
              panelHtml += `<div class="bld-ph-sec">
                <div class="bld-ph-lbl"><i class="ri-image-2-line"></i> صور المرحلة <span class="bld-ph-count">${imgs.length}</span></div>
                <div class="bld-ph-grid">`;
              imgs.forEach((img, ii) => {
                const src = imgSrc(img); if (!src) return;
                const safeId = img.id || img.Id || img.imageId || img.ImageId || '';
                panelHtml += `<div class="bld-ph-thumb" id="bld-pt-${safeId}">
                  <img src="${esc(src)}" alt="" loading="lazy" onerror="this.closest('.bld-ph-thumb').style.display='none'" data-bld-thumb-img data-idx="${ii}" data-key="${esc(def.key)}"/>
                  <div class="bld-ph-overlay"><i class="ri-zoom-in-line"></i></div>
                  <button class="bld-ph-del-btn" data-act="delP" data-id="${safeId}" data-key="${esc(def.key)}"><i class="ri-close-line"></i></button>
                  <span class="bld-ph-num">${ii + 1}</span>
                </div>`;
              });
              if (!imgs.length) panelHtml += `<div class="bld-ph-empty"><i class="ri-image-add-line"></i> لا توجد صور بعد</div>`;
              if (stageId) {
                panelHtml += `<label class="bld-ph-upload" id="bld-ul-${stageId}">
                  <i class="ri-upload-cloud-2-line"></i><span>رفع صورة</span>
                  <input type="file" class="bld-hf" accept="image/jpeg,image/png,image/webp,image/gif" multiple data-act="up" data-sid="${stageId}" data-key="${esc(def.key)}"/>
                </label>`;
              }
              panelHtml += `</div></div><div class="bld-pdiv"></div>`;
            }

            if (done) {
              const fields = RFIELDS[def.key] || [];
              const hasData = fields.some(f => rd[f.id] !== undefined && rd[f.id] !== null && rd[f.id] !== '');
              if (completionDate) panelHtml += `<div><span class="bld-comp-date-badge"><i class="ri-calendar-check-line"></i> تاريخ الاكتمال: ${fmtDate(completionDate)}</span></div>`;
              if (hasData) {
                panelHtml += `<div class="bld-rep-grid">`;
                fields.filter(f => f.id !== 'notes').forEach(f => {
                  const val = rd[f.id]; if (val === undefined || val === null || val === '') return;
                  let vh = '';
                  if (f.type === 'toggle') vh = (val === true || val === 'true' || val === 1) ? `<span class="bld-chip bld-cy"><i class="ri-check-line"></i> نعم</span>` : `<span class="bld-chip bld-cn"><i class="ri-close-line"></i> لا</span>`;
                  else if (f.type === 'number') vh = `<span style="font-size:.9rem;font-weight:700;color:var(--text)">${esc(val)}</span>`;
                  else if (f.type === 'date') vh = `<span class="bld-tbg"><i class="ri-calendar-line"></i> ${fmtDateShort(val) || esc(val)}</span>`;
                  else vh = `<span class="bld-tbg">${esc(val)}</span>`;
                  panelHtml += `<div class="bld-rep-field"><div class="bld-rep-label">${esc(f.label)}</div>${vh}</div>`;
                });
                panelHtml += `</div>`;
                if (rd.notes) panelHtml += `<div class="bld-notes-v"><i class="ri-sticky-note-line" style="opacity:.4;margin-left:4px"></i>${esc(rd.notes)}</div>`;
              }
              const imgCount = imgs.length;
              panelHtml += `<div class="bld-panel-actions">
                <button class="bld-btn bld-btn-g bld-btn-sm" data-act="viewStage" data-key="${def.key}" data-label="${esc(def.label)}" data-id="${stage?.id || ''}">
                  <i class="ri-eye-line"></i> عرض التقرير${imgCount > 0 ? ` <span class="bld-ph-count">${imgCount}</span>` : ''}
                </button>
                <button class="bld-btn bld-btn-w bld-btn-sm" data-act="rep" data-key="${def.key}" data-label="${esc(def.label)}" data-id="${stage?.id || ''}"><i class="ri-file-edit-line"></i> تعديل التقرير</button>
                <button class="bld-btn bld-btn-g bld-btn-sm" data-act="editDate" data-id="${stage?.id || ''}" data-key="${def.key}" data-date="${esc(completionDate || '')}"><i class="ri-calendar-2-line"></i> تعديل التاريخ</button>
              </div>`;
            }

            if (isCurr) {
              panelHtml += `<div class="bld-panel-actions">
                <button class="bld-btn bld-btn-w bld-btn-sm" data-act="rep" data-key="${def.key}" data-label="${esc(def.label)}" data-id="${stage?.id || ''}"><i class="ri-file-list-3-line"></i> تقرير فني</button>
                <button class="bld-btn bld-btn-s bld-btn-sm" id="bld-compBtn" data-act="complete"><i class="ri-checkbox-circle-line"></i> تأكيد الإكمال</button>
              </div>`;
            }

            panelHtml += `</div>`;
          }

          html += `
            <div class="bld-stage-row" style="animation-delay:${idx * 40}ms">
              <div class="bld-dot-wrap"><div class="bld-dot ${dotCls}">${dotContent}</div></div>
              <div class="bld-sr ${stCls}">
                <div class="bld-sr-h" ${(done || isCurr) ? `data-act="tog" data-key="${def.key}"` : ''}>
                  <div class="bld-sr-l">
                    <div class="bld-sr-info">
                      <div class="bld-sr-nm${(!done && !isCurr) ? ' mu' : ''}">${def.emoji} ${def.label}</div>
                      ${subHtml}
                    </div>
                  </div>
                  <div class="bld-sr-r">${rightHtml}</div>
                </div>
                ${panelHtml ? `<div class="bld-panel" id="bld-panel-${def.key}">${panelHtml}</div>` : ''}
              </div>
            </div>`;
        });

        html += `</div>`;

        if (ci !== -1 && !getStage(DEFS[ci].key)) {
          html += `<div class="bld-next-card">
            <div class="bld-next-info">
              <div class="bld-next-icon">${DEFS[ci].emoji}</div>
              <div><div class="bld-next-label">المرحلة الجارية غير مسجلة</div><div class="bld-next-name">${esc(DEFS[ci].label)}</div></div>
            </div>
            <button class="bld-btn bld-btn-p bld-btn-sm" data-act="addNext" data-key="${DEFS[ci].key}" id="bld-addNext-btn"><i class="ri-add-circle-line"></i> بدء المرحلة</button>
          </div>`;
        }

        if (ci === -1) html += `<div class="bld-done-banner"><span class="bld-done-emoji">🎉</span><p>جميع مراحل البناء مكتملة بنجاح!</p><div class="bld-done-sub">تم إنجاز المشروع بالكامل</div></div>`;

        wrap.innerHTML = html;
        bindEv();
      }

      function bindEv() {
        const wrap = document.getElementById('bld-sw'); if (!wrap) return;

        wrap.querySelectorAll('[data-act="tog"]').forEach(el => {
          el.addEventListener('click', () => {
            const key = el.dataset.key, panel = document.getElementById(`bld-panel-${key}`);
            if (!panel) return;
            const open = panel.classList.toggle('open');
            const ch = document.getElementById(`bld-chev-${key}`);
            if (ch) ch.style.transform = open ? 'rotate(180deg)' : '';
          });
        });

        wrap.querySelectorAll('[data-act="del"]').forEach(el => { el.addEventListener('click', e => { e.stopPropagation(); delStage(el.dataset.id, el.dataset.label); }); });
        wrap.querySelector('[data-act="complete"]')?.addEventListener('click', confirmComplete);
        wrap.querySelectorAll('[data-act="rep"]').forEach(el => { el.addEventListener('click', e => { e.stopPropagation(); openRep(el.dataset.key, el.dataset.label, el.dataset.id); }); });
        wrap.querySelectorAll('[data-act="editDate"]').forEach(el => { el.addEventListener('click', e => { e.stopPropagation(); editCompletionDate(el.dataset.id, el.dataset.key, el.dataset.date); }); });
        wrap.querySelectorAll('[data-act="viewStage"]').forEach(el => { el.addEventListener('click', e => { e.stopPropagation(); openViewStage(el.dataset.key, el.dataset.label, el.dataset.id); }); });
        wrap.querySelector('[data-act="addNext"]')?.addEventListener('click', e => { e.stopPropagation(); openAddNextStage(e.currentTarget.dataset.key); });

        wrap.querySelectorAll('input[data-act="up"]').forEach(inp => {
          inp.addEventListener('change', async () => {
            const files = Array.from(inp.files || []); if (!files.length) return;
            const _key = inp.dataset.key, _sid = inp.dataset.sid;
            const label = document.getElementById(`bld-ul-${_sid}`);
            if (label) label.classList.add('loading');
            for (const file of files) await uploadPhoto(_sid, _key, file, () => openPanel(_key));
            inp.value = '';
          });
        });

        wrap.querySelectorAll('[data-act="delP"]').forEach(btn => { btn.addEventListener('click', e => { e.stopPropagation(); delPhoto(btn.dataset.id, btn.dataset.key); }); });
        wrap.querySelectorAll('[data-bld-thumb-img]').forEach(img => {
          img.addEventListener('click', e => {
            e.stopPropagation();
            const stage = getStage(img.dataset.key); if (!stage) return;
            openLb(getStageImages(stage), parseInt(img.dataset.idx, 10), img.dataset.key, stage.id);
          });
        });
      }

      function openViewStage(key, label, stageId) {
        const stage = getStage(key); if (!stage) return;
        const fields = RFIELDS[key] || [];
        let rd = {}; if (stage.reportData) { try { rd = JSON.parse(stage.reportData); } catch {} }
        const imgs = getStageImages(stage);
        const completionDate = stage?.endDate || stage?.completionDate || rd?.completionDate || null;
        const hasData = fields.some(f => rd[f.id] !== undefined && rd[f.id] !== null && rd[f.id] !== '');

        let body = `<div class="mbody">`;
        if (completionDate) body += `<div style="margin-bottom:14px"><span class="bld-comp-date-badge"><i class="ri-calendar-check-line"></i> تاريخ الاكتمال: ${fmtDate(completionDate)}</span></div>`;
        if (hasData) {
          body += `<div style="font-size:.7rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:9px"><i class="ri-file-list-3-line"></i> بيانات التقرير الفني</div><div class="bld-rep-grid">`;
          fields.filter(f => f.id !== 'notes').forEach(f => {
            const val = rd[f.id]; if (val === undefined || val === null || val === '') return;
            let vh = '';
            if (f.type === 'toggle') vh = (val === true || val === 'true' || val === 1) ? `<span class="bld-chip bld-cy"><i class="ri-check-line"></i> نعم</span>` : `<span class="bld-chip bld-cn"><i class="ri-close-line"></i> لا</span>`;
            else if (f.type === 'number') vh = `<span style="font-size:.9rem;font-weight:700;color:var(--text)">${esc(val)}</span>`;
            else if (f.type === 'date') vh = `<span class="bld-tbg"><i class="ri-calendar-line"></i> ${fmtDateShort(val) || esc(val)}</span>`;
            else vh = `<span class="bld-tbg">${esc(val)}</span>`;
            body += `<div class="bld-rep-field"><div class="bld-rep-label">${esc(f.label)}</div>${vh}</div>`;
          });
          body += `</div>`;
          if (rd.notes) body += `<div class="bld-notes-v"><i class="ri-sticky-note-line" style="opacity:.4;margin-left:4px"></i>${esc(rd.notes)}</div>`;
        } else {
          body += `<div class="bld-ph-empty" style="margin-bottom:12px"><i class="ri-file-search-line"></i> لا توجد بيانات تقرير</div>`;
        }
        body += `<div class="bld-pdiv"></div><div style="font-size:.7rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:9px"><i class="ri-image-2-line"></i> صور المرحلة <span class="bld-ph-count">${imgs.length}</span></div>`;
        if (imgs.length) {
          body += `<div class="bld-m-gallery">`;
          imgs.forEach((img, ii) => {
            const src = imgSrc(img); if (!src) return;
            body += `<div class="bld-m-gthumb" data-midx="${ii}" data-mkey="${esc(key)}">
              <img src="${esc(src)}" alt="" loading="lazy" onerror="this.closest('.bld-m-gthumb').style.display='none'"/>
              <div class="bld-m-gthumb-overlay"><i class="ri-zoom-in-line"></i></div>
            </div>`;
          });
          body += `</div>`;
        } else {
          body += `<div class="bld-ph-empty"><i class="ri-image-add-line"></i> لا توجد صور</div>`;
        }
        if (stageId) {
          body += `<label class="bld-m-upload" id="bld-dum-${stageId}"><i class="ri-upload-cloud-2-line"></i> رفع صورة إضافية<input type="file" class="bld-hf" accept="image/jpeg,image/png,image/webp,image/gif" multiple data-act="mup" data-sid="${stageId}" data-key="${esc(key)}"/></label>`;
        }
        body += `</div><div class="mfoot">
          <button class="bld-btn bld-btn-w bld-btn-sm" data-act="rep" data-key="${key}" data-label="${esc(label)}" data-id="${stageId}"><i class="ri-file-edit-line"></i> تعديل التقرير</button>
          <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-vsClose">إغلاق</button>
        </div>`;

        openModal(`${DEFS.find(d => d.key === key)?.emoji || ''} ${esc(label)}`, body, true);
        document.getElementById('bld-vsClose')?.addEventListener('click', closeModal);
        document.querySelectorAll('[data-act="rep"]').forEach(el => { el.addEventListener('click', () => { closeModal(); openRep(el.dataset.key, el.dataset.label, el.dataset.id); }); });
        document.querySelectorAll('.bld-m-gthumb').forEach(el => { el.addEventListener('click', () => { closeModal(); openLb(imgs, parseInt(el.dataset.midx, 10), key, stageId); }); });
        document.querySelectorAll('input[data-act="mup"]').forEach(inp => {
          inp.addEventListener('change', async () => {
            const files = Array.from(inp.files || []); if (!files.length) return;
            const lbl = document.getElementById(`bld-dum-${inp.dataset.sid}`); if (lbl) lbl.classList.add('loading');
            const _key = inp.dataset.key, _sid = inp.dataset.sid;
            for (const file of files) await uploadPhoto(_sid, _key, file, () => openViewStage(_key, label, stageId));
            inp.value = '';
          });
        });
      }

      function confirmComplete() {
        const ci = currIdx(); if (ci === -1) return;
        const def = DEFS[ci];
        openModal(`إكمال: ${def.label}`, `
          <div class="bld-confirm-box">
            <div class="bld-confirm-icon success">✅</div>
            <p class="bld-confirm-text">هل تريد تأكيد إكمال مرحلة <strong>${esc(def.label)}</strong>؟<br>سينتقل النظام للمرحلة التالية تلقائياً.</p>
            <div class="bld-date-section">
              <label><i class="ri-calendar-check-line"></i> تاريخ الاكتمال</label>
              <input type="date" id="bld-compDate" class="bld-fi" value="${toInputDate(new Date())}" dir="ltr"/>
            </div>
            <div class="bld-confirm-actions">
              <button class="bld-btn bld-btn-s bld-btn-sm" id="bld-cOk"><i class="ri-checkbox-circle-line"></i> نعم، مكتملة</button>
              <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-cCx">إلغاء</button>
            </div>
          </div>`);
        document.getElementById('bld-cCx').addEventListener('click', closeModal);
        document.getElementById('bld-cOk').addEventListener('click', () => doComplete(def.key));
      }

      async function doComplete(key) {
        setBusy('bld-cOk', true);
        try {
          const compDate = document.getElementById('bld-compDate')?.value || new Date().toISOString().split('T')[0];
          const existing = getStage(key);
          let rd = {}; if (existing?.reportData) { try { rd = JSON.parse(existing.reportData); } catch { } }
          rd.completionDate = compDate;
          const pl = { buildingId: Number(S.selBuilding), stageName: key, status: 'Completed', isCompleted: true, notes: existing?.notes || null, endDate: compDate, reportData: JSON.stringify(rd) };
          if (existing?.id) await PUT(`/api/ConstructionStages/${existing.id}`, pl); else await POST('/api/ConstructionStages', pl);
          toast(`تم إكمال "${DEFS.find(d => d.key === key)?.label}" 🎉`);
          closeModal(); await loadStages(); openPanel(key);
        } catch (e) { toast(`فشل الإكمال: ${translateError(e.message)}`, 'err'); setBusy('bld-cOk', false, '<i class="ri-checkbox-circle-line"></i> نعم، مكتملة'); }
      }

      function editCompletionDate(stageId, key, existingDate) {
        const def = DEFS.find(d => d.key === key);
        openModal(`تعديل تاريخ الاكتمال — ${def?.label || ''}`, `
          <div class="mbody">
            <div class="bld-fg"><label><i class="ri-calendar-check-line"></i> تاريخ الاكتمال</label><input type="date" id="bld-edDate" class="bld-fi" value="${esc(existingDate ? toInputDate(existingDate) : toInputDate(new Date()))}" dir="ltr"/></div>
          </div>
          <div class="mfoot">
            <button class="bld-btn bld-btn-p bld-btn-sm" id="bld-edSv"><i class="ri-save-3-line"></i> حفظ التاريخ</button>
            <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-edCx">إلغاء</button>
          </div>`);
        document.getElementById('bld-edCx').addEventListener('click', closeModal);
        document.getElementById('bld-edSv').addEventListener('click', async () => {
          const newDate = document.getElementById('bld-edDate')?.value; if (!newDate) { toast('اختر تاريخاً', 'err'); return; }
          setBusy('bld-edSv', true);
          try {
            const stage = getStage(key); let rd = {}; if (stage?.reportData) { try { rd = JSON.parse(stage.reportData); } catch { } } rd.completionDate = newDate;
            const pl = { buildingId: Number(S.selBuilding), stageName: key, status: 'Completed', isCompleted: true, notes: stage?.notes || null, endDate: newDate, reportData: JSON.stringify(rd) };
            if (stageId) await PUT(`/api/ConstructionStages/${stageId}`, pl);
            toast('تم تحديث التاريخ ✓'); closeModal(); await loadStages(); openPanel(key);
          } catch (e) { toast(`فشل التحديث: ${translateError(e.message)}`, 'err'); setBusy('bld-edSv', false, '<i class="ri-save-3-line"></i> حفظ التاريخ'); }
        });
      }

      function delStage(id, label) {
        if (!id) { toast('لا يوجد ID', 'err'); return; }
        openModal('حذف المرحلة', `
          <div class="bld-confirm-box">
            <div class="bld-confirm-icon danger">🗑️</div>
            <p class="bld-confirm-text">هل أنت متأكد من حذف مرحلة <strong>${esc(label)}</strong>؟<br>لا يمكن التراجع عن هذه العملية.</p>
            <div class="bld-confirm-actions">
              <button class="bld-btn bld-btn-d bld-btn-sm" id="bld-dOk"><i class="ri-delete-bin-line"></i> احذف نهائياً</button>
              <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-dCx">إلغاء</button>
            </div>
          </div>`);
        document.getElementById('bld-dCx').addEventListener('click', closeModal);
        document.getElementById('bld-dOk').addEventListener('click', async () => {
          setBusy('bld-dOk', true);
          try { await DEL(`/api/ConstructionStages/${id}`); toast('تم الحذف ✓'); closeModal(); await loadStages(); }
          catch (e) { toast(`فشل الحذف: ${translateError(e.message)}`, 'err'); setBusy('bld-dOk', false, '<i class="ri-delete-bin-line"></i> احذف نهائياً'); }
        });
      }

      function openRep(key, label, existingId) {
        const fields = RFIELDS[key] || [{ id: 'notes', type: 'textarea', label: 'ملاحظات' }];
        const stage = getStage(key); let rd = {};
        if (stage?.reportData) { try { rd = JSON.parse(stage.reportData); } catch { } }
        if (!rd.notes && stage?.notes) rd.notes = stage.notes;
        let fh = '';
        fields.forEach(f => {
          const val = rd[f.id];
          if (f.type === 'toggle') {
            const y = val === true || val === 'true' || val === 1;
            fh += `<div class="bld-fg"><label>${esc(f.label)}</label>
              <div class="bld-tg" id="bld-tg_${f.id}">
                <button type="button" class="bld-tgb ${y ? 'y' : ''}" data-tg="${f.id}" data-v="true"><i class="ri-check-line"></i> نعم</button>
                <button type="button" class="bld-tgb ${!y ? 'n' : ''}" data-tg="${f.id}" data-v="false"><i class="ri-close-line"></i> لا</button>
              </div>
              <input type="hidden" id="bld-fld_${f.id}" value="${y ? 'true' : 'false'}"></div>`;
          } else if (f.type === 'textarea') {
            fh += `<div class="bld-fg"><label>${esc(f.label)}</label><textarea id="bld-fld_${f.id}" class="bld-fta">${esc(String(val || ''))}</textarea></div>`;
          } else {
            fh += `<div class="bld-fg"><label>${esc(f.label)}</label><input id="bld-fld_${f.id}" class="bld-fi" type="${f.type}" value="${esc(String(val || ''))}" dir="${f.type === 'date' ? 'ltr' : 'auto'}"></div>`;
          }
        });
        openModal(`تقرير — ${esc(label)}`, `<div class="mbody">${fh}</div><div class="mfoot"><button class="bld-btn bld-btn-p bld-btn-sm" id="bld-rSv"><i class="ri-save-3-line"></i> حفظ التقرير</button><button class="bld-btn bld-btn-g bld-btn-sm" id="bld-rCx">إلغاء</button></div>`);
        document.getElementById('bld-rCx').addEventListener('click', closeModal);
        document.querySelectorAll('[data-tg]').forEach(btn => {
          btn.addEventListener('click', () => {
            const fid = btn.dataset.tg, v = btn.dataset.v === 'true';
            document.getElementById(`bld-fld_${fid}`).value = v ? 'true' : 'false';
            const tg = document.getElementById(`bld-tg_${fid}`);
            const [yb, nb] = tg.querySelectorAll('[data-tg]');
            yb.className = `bld-tgb ${v ? 'y' : ''}`; nb.className = `bld-tgb ${!v ? 'n' : ''}`;
          });
        });
        document.getElementById('bld-rSv').addEventListener('click', () => saveRep(key, existingId));
      }

      async function saveRep(key, existingId) {
        setBusy('bld-rSv', true);
        try {
          const fields = RFIELDS[key] || [], rd = {};
          fields.forEach(f => { const el = document.getElementById(`bld-fld_${f.id}`); if (!el) return; if (f.type === 'toggle') rd[f.id] = el.value === 'true'; else if (f.type === 'number') rd[f.id] = parseFloat(el.value) || 0; else rd[f.id] = el.value.trim(); });
          const existing = getStage(key), id = existingId && existingId !== 'null' ? existingId : existing?.id;
          const pl = { buildingId: Number(S.selBuilding), stageName: key, status: existing?.status || 'InProgress', isCompleted: existing?.isCompleted || false, notes: rd.notes || null, reportData: JSON.stringify(rd) };
          if (id) await PUT(`/api/ConstructionStages/${id}`, pl); else await POST('/api/ConstructionStages', pl);
          toast('تم حفظ التقرير ✓'); closeModal(); await loadStages(); openPanel(key);
        } catch (e) { toast(`فشل حفظ التقرير: ${translateError(e.message)}`, 'err'); setBusy('bld-rSv', false, '<i class="ri-save-3-line"></i> حفظ التقرير'); }
      }

      async function uploadPhoto(stageId, key, file, afterCb) {
        try {
          const fd = new FormData(); fd.append('stageId', String(stageId)); fd.append('file', file);
          await uploadFile('/api/StageImages/upload', fd);
          toast('تم رفع الصورة ✓');
          await loadStages();
          if (afterCb) afterCb(); else openPanel(key);
        } catch (e) { toast(`فشل رفع الصورة: ${translateError(e.message)}`, 'err'); }
      }

      async function delPhoto(id, key) {
        if (!id) { toast('ID غير موجود', 'err'); return; }
        openModal('حذف الصورة', `
          <div class="bld-confirm-box">
            <div class="bld-confirm-icon danger">🖼️</div>
            <p class="bld-confirm-text">هل تريد حذف هذه الصورة نهائياً؟</p>
            <div class="bld-confirm-actions">
              <button class="bld-btn bld-btn-d bld-btn-sm" id="bld-dpOk"><i class="ri-delete-bin-line"></i> احذف الصورة</button>
              <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-dpCx">إلغاء</button>
            </div>
          </div>`);
        document.getElementById('bld-dpCx').addEventListener('click', closeModal);
        document.getElementById('bld-dpOk').addEventListener('click', async () => {
          setBusy('bld-dpOk', true);
          try { await DEL(`/api/StageImages/${id}`); toast('تم حذف الصورة ✓'); closeModal(); await loadStages(); openPanel(key); }
          catch (e) { toast(`فشل الحذف: ${translateError(e.message)}`, 'err'); setBusy('bld-dpOk', false, '<i class="ri-delete-bin-line"></i> احذف الصورة'); }
        });
      }

      function openAddNextStage(key) {
        if (!S.selBuilding) { toast('اختر عمارة أولاً', 'err'); return; }
        const def = DEFS.find(d => d.key === key); if (!def) return;
        openModal(`بدء مرحلة: ${def.label}`, `
          <div class="mbody">
            <div style="background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:10px;padding:13px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
              <span style="font-size:1.6rem">${def.emoji}</span>
              <div><div style="font-size:.9rem;font-weight:800;color:var(--text)">${esc(def.label)}</div><div style="font-size:.74rem;color:var(--muted);margin-top:2px">المرحلة ${DEFS.indexOf(def) + 1} من ${DEFS.length}</div></div>
            </div>
            <div class="bld-fg"><label>الحالة الأولية</label><select id="bld-ns-s" class="bld-fsel"><option value="InProgress">جارية الآن</option><option value="Completed">مكتملة مسبقاً</option></select></div>
            <div class="bld-fg" id="bld-ns-dateWrap" style="display:none">
              <label><i class="ri-calendar-check-line"></i> تاريخ الاكتمال</label>
              <input type="date" id="bld-ns-dt" class="bld-fi" value="${toInputDate(new Date())}" dir="ltr"/>
            </div>
          </div>
          <div class="mfoot">
            <button class="bld-btn bld-btn-p bld-btn-sm" id="bld-nsSv"><i class="ri-add-circle-line"></i> إضافة المرحلة</button>
            <button class="bld-btn bld-btn-g bld-btn-sm" id="bld-nsCx">إلغاء</button>
          </div>`);
        document.getElementById('bld-nsCx').addEventListener('click', closeModal);
        document.getElementById('bld-ns-s').addEventListener('change', function () { document.getElementById('bld-ns-dateWrap').style.display = this.value === 'Completed' ? 'block' : 'none'; });
        document.getElementById('bld-nsSv').addEventListener('click', async () => {
          const status = document.getElementById('bld-ns-s')?.value || 'InProgress';
          const compDate = document.getElementById('bld-ns-dt')?.value || '';
          setBusy('bld-nsSv', true);
          try {
            let rd = {}; if (compDate && status === 'Completed') rd.completionDate = compDate;
            const pl = { buildingId: Number(S.selBuilding), stageName: key, status, isCompleted: status === 'Completed', notes: null, endDate: (compDate && status === 'Completed') ? compDate : null, reportData: Object.keys(rd).length ? JSON.stringify(rd) : null };
            await POST('/api/ConstructionStages', pl);
            toast('تم إضافة المرحلة ✓'); closeModal(); await loadStages(); openPanel(key);
          } catch (e) { toast(`فشل الإضافة: ${translateError(e.message)}`, 'err'); setBusy('bld-nsSv', false, '<i class="ri-add-circle-line"></i> إضافة المرحلة'); }
        });
      }

      function openPanel(key) {
        const panel = document.getElementById(`bld-panel-${key}`), ch = document.getElementById(`bld-chev-${key}`);
        if (panel && !panel.classList.contains('open')) { panel.classList.add('open'); if (ch) ch.style.transform = 'rotate(180deg)'; }
      }

      document.getElementById('bld-refreshBtn').addEventListener('click', () => {
        if (S.selBuilding) { toast('جاري التحديث...', 'info'); loadStages(); } else loadInitial();
      }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-pSel').addEventListener('change', function () { onProject(this.value); }, { signal: window.__pageAbortSignal });
      document.getElementById('bld-bSel').addEventListener('change', function () { onBuilding(this.value); }, { signal: window.__pageAbortSignal });

      Object.assign(window, { closeModal });
      await loadInitial();
    }
  };
})();