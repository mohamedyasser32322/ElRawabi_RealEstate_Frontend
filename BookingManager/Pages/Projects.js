/* PAGE MODULE: projects — SPA v3 (merged) */
(function () {
  window.__pages = window.__pages || {};

  /* ─── CSS ─── */
  const _css = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary:#0D2142; --primary-deep:#081830; --card-bg:#112952; --card-hover:#163366;
      --border:rgba(255,255,255,0.08); --light:#FFFFFF; --text-muted:#8fa3c0;
      --success:#34c759; --warning:#ff9500; --danger:#ff3b30; --accent:#4e8df5;
      --closed:#6b7a8d;
      --transition:all 0.25s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes spin    { to { transform:rotate(360deg); } }
    @keyframes fadeUp  { from { opacity:0;transform:translateY(16px); } to { opacity:1;transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0;transform:scale(.95); } to { opacity:1;transform:scale(1); } }
    @keyframes slideDown { from { opacity:0;transform:translateY(-8px); } to { opacity:1;transform:translateY(0); } }
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--primary-deep)}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:6px}

    .toolbar-wrapper{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;background:rgba(255,255,255,0.02);border-bottom:1px solid var(--border);margin-bottom:20px;border-radius:12px}
    #breadcrumb{display:flex;align-items:center;gap:8px;flex:1;font-size:0.83rem;color:var(--text-muted)}
    .bc-item{cursor:pointer;color:var(--accent);transition:opacity 0.2s}.bc-item:hover{opacity:.75}
    .bc-sep{opacity:.3}.bc-current{color:var(--light);font-weight:700}
    #addBtn{display:flex;align-items:center;gap:7px;padding:9px 20px;border-radius:10px;background:var(--accent);color:#fff;border:none;font-family:inherit;font-size:.88rem;font-weight:700;cursor:pointer;transition:var(--transition);white-space:nowrap}
    #addBtn:hover{background:#3a7de4;transform:translateY(-1px);box-shadow:0 6px 20px rgba(78,141,245,.35)}

    .search-container{display:flex;justify-content:center;margin:0 0 20px;width:100%}
    .search-wrap{position:relative;display:flex;align-items:center;width:100%;max-width:480px}
    .search-input{background:rgba(255,255,255,.06);border:1.5px solid var(--border);color:var(--light);font-family:inherit;font-size:.95rem;padding:12px 46px 12px 16px;border-radius:12px;width:100%;transition:var(--transition)}
    .search-input:focus{outline:none;background:rgba(255,255,255,.1);border-color:var(--accent);box-shadow:0 0 0 3px rgba(78,141,245,.12)}
    .search-input::placeholder{color:var(--text-muted)}.search-icon{position:absolute;left:14px;color:var(--text-muted);font-size:1.15rem;pointer-events:none}

    /* ── Filter bar with dropdowns for rooms & facing ── */
    #filterBar{display:none;gap:10px;flex-wrap:wrap;margin-bottom:20px;align-items:center;padding:12px 16px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:12px}
    .filter-section-label{font-size:.75rem;color:var(--text-muted);font-weight:700;white-space:nowrap}
    .filter-divider{width:1px;height:22px;background:var(--border);margin:0 4px}
    .pill{padding:6px 14px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--text-muted);font-family:inherit;font-size:.8rem;font-weight:600;cursor:pointer;transition:var(--transition);white-space:nowrap}
    .pill:hover{background:rgba(255,255,255,.09);color:var(--light)}
    .pill.active{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.25);color:var(--light)}
    .pill.p-avail.active{background:rgba(52,199,89,.13);border-color:var(--success);color:var(--success)}
    .pill.p-resrv.active{background:rgba(255,149,0,.12);border-color:var(--warning);color:var(--warning)}
    .pill.p-sold.active{background:rgba(255,59,48,.13);border-color:var(--danger);color:var(--danger)}
    .pill.p-closed.active{background:rgba(107,122,141,.15);border-color:var(--closed);color:var(--closed)}

    /* Rooms custom dropdown */
    .rooms-dropdown-wrap{position:relative;display:inline-block}
    .rooms-dropdown-btn{display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--text-muted);font-family:inherit;font-size:.8rem;font-weight:600;cursor:pointer;transition:var(--transition);white-space:nowrap;user-select:none}
    .rooms-dropdown-btn:hover{background:rgba(255,255,255,.09);color:var(--light)}
    .rooms-dropdown-btn.active{background:rgba(78,141,245,.13);border-color:var(--accent);color:var(--accent)}
    .rooms-dropdown-btn .dd-arrow{font-size:.75rem;transition:transform .2s ease}
    .rooms-dropdown-btn.open .dd-arrow{transform:rotate(180deg)}
    .rooms-dropdown-menu{display:none;position:absolute;top:calc(100% + 7px);right:0;background:#0e1f42;border:1px solid rgba(255,255,255,.12);border-radius:12px;min-width:150px;z-index:200;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,.45);animation:slideDown .18s ease}
    .rooms-dropdown-menu.open{display:block}
    .rooms-dd-item{display:flex;align-items:center;gap:9px;padding:10px 16px;font-size:.83rem;font-weight:600;color:var(--text-muted);cursor:pointer;transition:background .15s}
    .rooms-dd-item:hover{background:rgba(78,141,245,.1);color:var(--light)}
    .rooms-dd-item.active{background:rgba(78,141,245,.15);color:var(--accent)}
    .rooms-dd-item .dd-check{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:.6rem;flex-shrink:0;transition:var(--transition)}
    .rooms-dd-item.active .dd-check{background:var(--accent);border-color:var(--accent);color:#fff}

    /* Facing select */
    .facing-select-wrap{display:flex;align-items:center;gap:7px}
    .facing-select{
      background:rgba(255,255,255,.06);color:var(--light);border:1px solid var(--border);
      padding:6px 30px 6px 12px;border-radius:20px;font-family:inherit;font-size:.8rem;font-weight:600;
      cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;
      background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat:no-repeat;background-position:left 8px center;background-size:13px;
      transition:var(--transition);min-width:140px;color-scheme:dark;
    }
    .facing-select option{background:#0D2142;color:#dde8ff}
    .facing-select:hover{background-color:rgba(255,255,255,.1);border-color:rgba(255,255,255,.25)}
    .facing-select:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(78,141,245,.18)}

    .loader-box{display:flex;align-items:center;justify-content:center;min-height:380px}
    .spinner{width:44px;height:44px;border:3px solid rgba(255,255,255,.08);border-top-color:var(--accent);border-radius:50%;animation:spin .75s linear infinite}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
    .empty-msg{text-align:center;padding:60px 20px;color:var(--text-muted);font-size:.95rem}
    .empty-msg i{font-size:2.5rem;display:block;margin-bottom:12px;opacity:.35}

    .p-card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;cursor:pointer;opacity:0;animation:fadeUp .4s ease forwards;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden}
    .p-card-ribbon{height:3px;background:linear-gradient(90deg,var(--accent),#7ab3ff);border-radius:16px 16px 0 0}
    .p-card-body{padding:18px 22px 20px}
    .p-card:hover{transform:translateY(-5px) scale(1.02);border-color:rgba(78,141,245,.35);box-shadow:0 20px 40px rgba(8,24,48,.5)}
    .p-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px}
    .p-card-title-wrap{flex:1}
    .p-card-code{display:inline-block;font-size:.72rem;font-weight:800;padding:2px 8px;border-radius:6px;background:rgba(78,141,245,.15);color:var(--accent);border:1px solid rgba(78,141,245,.3);margin-bottom:4px;letter-spacing:.5px}
    .p-card-title{font-size:1.05rem;font-weight:800;color:var(--light)}
    .p-card-actions{display:flex;gap:5px;opacity:0;transition:opacity .2s ease}
    .p-card:hover .p-card-actions{opacity:1}
    .icon-btn{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text-muted);cursor:pointer;font-size:.85rem;transition:var(--transition)}
    .icon-btn.edit:hover{background:rgba(78,141,245,.18);color:var(--accent);border-color:var(--accent)}
    .p-card-loc{font-size:.8rem;color:var(--text-muted);margin-bottom:12px;display:flex;align-items:center;gap:4px}
    .p-card-stats{display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:13px}
    .ps-box{text-align:center;flex:1}.ps-num{font-weight:800;font-size:1rem;margin-bottom:2px}.ps-lbl{font-size:.62rem;text-transform:uppercase;letter-spacing:.5px}
    .ps-total .ps-num{color:var(--light)}.ps-total .ps-lbl{color:var(--text-muted)}
    .ps-avail .ps-num{color:var(--success)}.ps-avail .ps-lbl{color:var(--success)}
    .ps-resrv .ps-num{color:var(--warning)}.ps-resrv .ps-lbl{color:var(--warning)}
    .ps-sold  .ps-num{color:var(--danger)}.ps-sold  .ps-lbl{color:var(--danger)}
    .ps-closed .ps-num{color:var(--closed)}.ps-closed .ps-lbl{color:var(--closed)}
    .p-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)}
    .p-card-date{font-size:.73rem;color:var(--text-muted)}

    .b-card{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;cursor:pointer;opacity:0;animation:fadeUp .4s ease forwards;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;position:relative;overflow:hidden}
    .b-card-ribbon{height:3px;background:linear-gradient(90deg,var(--warning),#ffd966);border-radius:16px 16px 0 0}
    .b-card-body{padding:18px 22px 20px}
    .b-card:hover{transform:translateY(-5px) scale(1.02);border-color:rgba(255,149,0,.35);box-shadow:0 20px 40px rgba(8,24,48,.5)}
    .b-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
    .b-card-title-wrap{flex:1}
    .b-card-code{display:inline-block;font-size:.72rem;font-weight:800;padding:2px 8px;border-radius:6px;background:rgba(255,149,0,.12);color:var(--warning);border:1px solid rgba(255,149,0,.3);margin-bottom:4px;letter-spacing:.5px}
    .b-card-title{font-size:1.05rem;font-weight:800;color:var(--light)}
    .b-card-actions{display:flex;gap:5px;opacity:0;transition:opacity .2s ease}
    .b-card:hover .b-card-actions{opacity:1}

    .floor-map{display:flex;flex-direction:column;gap:16px}
    .floor-row{background:var(--card-bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;opacity:0;animation:fadeUp .4s ease forwards}
    .floor-row.is-roof{border-color:rgba(155,89,182,.3)}
    .floor-header{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:rgba(255,255,255,.025);border-bottom:1px solid var(--border)}
    .floor-lbl{font-size:.9rem;font-weight:800;color:var(--light);display:flex;align-items:center;gap:8px}
    .floor-lbl::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--accent)}
    .floor-row.is-roof .floor-lbl::before{background:#9b59b6}
    .roof-badge{font-size:.65rem;padding:2px 7px;border-radius:5px;background:rgba(155,89,182,.2);color:#c39bd3;border:1px solid rgba(155,89,182,.3);font-weight:700}
    .floor-count{font-size:.73rem;color:var(--text-muted);background:rgba(255,255,255,.05);padding:3px 10px;border-radius:20px}
    .units-wrap{display:flex;flex-wrap:wrap;gap:9px;padding:14px 18px;direction:rtl;justify-content:flex-start;}

    /* ── Unit card — new top/bottom design ── */
    .unit-box{
      flex:0 0 auto;width:130px;
      border-radius:11px;cursor:pointer;
      border:1.5px solid rgba(255,255,255,.1);
      transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
      position:relative;overflow:hidden;
      display:flex;flex-direction:column;
    }
    .unit-box-top{padding:11px 12px 9px 14px;flex:1;display:flex;flex-direction:column;gap:0}
    .unit-box-bottom{
      display:flex;align-items:center;gap:6px;
      padding:6px 12px 7px 14px;
      border-top:1px solid rgba(255,255,255,.07);
    }
    .u-num-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px}
    .u-num{font-weight:800;font-size:1rem;color:var(--light);line-height:1.1}
    .u-type-badge{
      display:inline-block;font-size:.6rem;padding:2px 7px;
      border-radius:20px;font-weight:700;white-space:nowrap;line-height:1.4;
    }
    .u-type-apt{background:rgba(78,141,245,.15);color:rgba(120,170,255,.9);border:1px solid rgba(78,141,245,.3)}
    .u-type-roof{background:rgba(155,89,182,.2);color:#c39bd3;border:1px solid rgba(155,89,182,.35)}
    .u-divider{height:1px;background:rgba(255,255,255,.06);margin:6px 0}
    .u-info-row{display:flex;align-items:center;gap:4px;font-size:.7rem;color:var(--text-muted);margin-bottom:3px}
    .u-info-row i{font-size:.72rem}
    .u-facing-row{display:flex;align-items:center;gap:4px;font-size:.68rem;color:var(--text-muted);margin-bottom:2px}
    .u-facing-row i{font-size:.7rem}
    .u-client-row{font-size:.66rem;color:var(--text-muted);margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:3px}
    .u-client-row i{font-size:.68rem;flex-shrink:0}
    .u-status-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
    .u-status-text{font-size:.72rem;font-weight:700;flex:1}
    .u-price{font-size:.64rem;color:var(--text-muted);white-space:nowrap}

    .unit-box.st-available .unit-box-top{background:rgba(52,199,89,.07)}
    .unit-box.st-available{border-color:rgba(52,199,89,.3)}
    .unit-box.st-available:hover{border-color:var(--success);transform:scale(1.06);box-shadow:0 10px 24px rgba(52,199,89,.18)}
    .unit-box.st-available .u-status-dot{background:var(--success);box-shadow:0 0 6px var(--success)}
    .unit-box.st-available .u-status-text{color:rgba(52,199,89,.9)}

    .unit-box.st-reserved .unit-box-top{background:rgba(255,149,0,.07)}
    .unit-box.st-reserved{border-color:rgba(255,149,0,.3)}
    .unit-box.st-reserved:hover{border-color:var(--warning);transform:scale(1.06);box-shadow:0 10px 24px rgba(255,149,0,.15)}
    .unit-box.st-reserved .u-status-dot{background:var(--warning);box-shadow:0 0 6px var(--warning)}
    .unit-box.st-reserved .u-status-text{color:rgba(255,149,0,.9)}

    .unit-box.st-sold .unit-box-top{background:rgba(255,59,48,.07)}
    .unit-box.st-sold{border-color:rgba(255,59,48,.3)}
    .unit-box.st-sold:hover{border-color:var(--danger);transform:scale(1.06);box-shadow:0 10px 24px rgba(255,59,48,.17)}
    .unit-box.st-sold .u-status-dot{background:var(--danger);box-shadow:0 0 6px var(--danger)}
    .unit-box.st-sold .u-status-text{color:rgba(255,59,48,.9)}

    .unit-box.st-closed .unit-box-top{background:rgba(107,122,141,.07)}
    .unit-box.st-closed{border-color:rgba(107,122,141,.25)}
    .unit-box.st-closed:hover{border-color:var(--closed);transform:scale(1.04)}
    .unit-box.st-closed .u-status-dot{background:var(--closed);box-shadow:0 0 4px rgba(107,122,141,.5)}
    .unit-box.st-closed .u-status-text{color:var(--closed)}

    .u-actions{position:absolute;top:5px;left:5px;display:flex;gap:3px;opacity:0;transform:scale(.85);transition:opacity .18s,transform .18s}
    .unit-box:hover .u-actions{opacity:1;transform:scale(1)}
    .u-icon-btn{width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.12);background:rgba(8,24,48,.75);color:var(--light);cursor:pointer;font-size:.72rem;transition:var(--transition);padding:0}
    .u-icon-btn.edit:hover{background:rgba(78,141,245,.5);color:var(--accent);border-color:var(--accent)}

    .floor-add-btn{flex:0 0 auto;min-width:80px;padding:12px 10px;border-radius:11px;background:rgba(78,141,245,.06);border:1.5px dashed rgba(78,141,245,.35);color:rgba(78,141,245,.65);font-family:inherit;font-size:.8rem;font-weight:700;cursor:pointer;transition:var(--transition);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
    .floor-add-btn i{font-size:1rem}
    .floor-add-btn:hover{background:rgba(78,141,245,.14);border-color:var(--accent);color:var(--accent);transform:scale(1.03)}
    .legend{display:flex;gap:14px;flex-wrap:wrap;padding:9px 18px;border-top:1px solid var(--border);background:rgba(255,255,255,.01)}
    .legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:var(--text-muted)}
    .legend-dot{width:7px;height:7px;border-radius:50%}

    #pagination{display:flex;justify-content:center;gap:7px;margin-top:28px}
    .pg-btn{padding:7px 13px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--text-muted);font-family:inherit;font-size:.84rem;font-weight:600;cursor:pointer;transition:var(--transition)}
    .pg-btn:hover:not(:disabled){background:rgba(255,255,255,.1);color:var(--light)}.pg-btn.active{background:var(--accent);color:#fff;border-color:var(--accent)}.pg-btn:disabled{opacity:.35;cursor:not-allowed}

    #proj-modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
    #proj-modal.open{display:flex;animation:fadeIn .2s ease}
    .modal-content{background:rgba(14,28,58,.97);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:18px;max-width:500px;width:92%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.45);animation:scaleIn .25s cubic-bezier(0.34,1.56,0.64,1)}
    .modal-wide{max-width:560px}
    .modal-header{padding:24px 26px 18px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:rgba(14,28,58,.99);z-index:2}
    #proj-modal-title{font-size:1.15rem;font-weight:800;color:var(--light)}
    .modal-close{background:none;border:none;color:var(--text-muted);font-size:1.35rem;cursor:pointer;transition:all .25s}
    .modal-close:hover{color:var(--light);transform:rotate(90deg)}
    .modal-body{padding:24px 26px}
    .modal-footer{padding:18px 26px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:10px;justify-content:flex-end;background:rgba(0,0,0,.15);position:sticky;bottom:0;border-radius:0 0 18px 18px}

    .form-group{margin-bottom:15px}.form-label{display:block;font-size:.86rem;font-weight:700;margin-bottom:7px;color:var(--light)}
    .form-input,.form-select{width:100%;padding:11px 13px;border-radius:9px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);color:#dde8ff;font-family:inherit;font-size:.88rem;transition:all .22s}
    .form-select{appearance:none;cursor:pointer;color-scheme:dark;color:#dde8ff;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 10px center;background-size:16px;padding-right:36px}
    .form-select:focus{animation:proj-dropOpen .18s cubic-bezier(.4,0,.2,1)}
    @keyframes proj-dropOpen{from{opacity:.8;transform:scaleY(.97)}to{opacity:1;transform:scaleY(1)}}
    .form-select option{background:#0D2142;color:#dde8ff}
    .form-input:focus,.form-select:focus{outline:none;background:rgba(255,255,255,.08);border-color:var(--accent);box-shadow:0 0 0 3px rgba(78,141,245,.13)}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px}
    .form-error{font-size:.75rem;color:var(--danger);margin-top:4px;display:none}

    .client-search-wrap{position:relative;margin-bottom:12px}
    .client-search-input{width:100%;padding:10px 36px 10px 12px;border-radius:9px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);color:var(--light);font-family:inherit;font-size:.88rem;transition:all .22s}
    .client-search-input:focus{outline:none;border-color:var(--accent);background:rgba(255,255,255,.08)}
    .client-search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:1rem;pointer-events:none}
    .client-list{max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:6px}
    .client-item{display:flex;align-items:center;gap:12px;padding:10px 13px;border-radius:9px;border:1.5px solid var(--border);cursor:pointer;transition:var(--transition)}
    .client-item:hover{background:rgba(78,141,245,.08);border-color:rgba(78,141,245,.3)}
    .client-item.selected{background:rgba(78,141,245,.15);border-color:var(--accent)}
    .client-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#4e8df5,#3a7de4);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:800;color:#fff;flex-shrink:0}
    .client-info-name{font-size:.88rem;font-weight:700;color:var(--light)}
    .client-info-sub{font-size:.72rem;color:var(--text-muted)}
    .client-empty{text-align:center;padding:24px;color:var(--text-muted);font-size:.85rem}
    .client-picker-label{font-size:.82rem;font-weight:700;color:var(--light);margin-bottom:8px;display:flex;align-items:center;gap:6px}
    .client-picker-label i{color:var(--accent)}

    .status-badge{display:inline-block;padding:5px 12px;border-radius:8px;font-size:.78rem;font-weight:700}
    .sb-available{background:rgba(52,199,89,.18);color:var(--success)}.sb-reserved{background:rgba(255,149,0,.14);color:var(--warning)}
    .sb-sold{background:rgba(255,59,48,.18);color:var(--danger)}.sb-closed{background:rgba(107,122,141,.15);color:var(--closed)}
    .unit-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .ud-block{background:rgba(255,255,255,.04);padding:12px;border-radius:9px}
    .ud-label{font-size:.73rem;color:var(--text-muted);margin-bottom:4px}.ud-value{font-size:.97rem;font-weight:700;color:var(--light)}
    .client-info-box{border-radius:10px;padding:14px 16px;margin-top:14px;display:flex;align-items:center;gap:12px}
    .client-info-box.reserved{background:rgba(255,149,0,.08);border:1px solid rgba(255,149,0,.25)}
    .client-info-box.sold{background:rgba(255,59,48,.08);border:1px solid rgba(255,59,48,.25)}
    .ci-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#4e8df5,#3a7de4);display:flex;align-items:center;justify-content:center;font-size:.95rem;font-weight:800;color:#fff;flex-shrink:0}
    .ci-label{font-size:.72rem;color:var(--text-muted);margin-bottom:2px}
    .ci-name{font-size:.95rem;font-weight:800;color:var(--light)}
    .ci-sub{font-size:.75rem;color:var(--text-muted)}

    .btn-submit{display:flex;align-items:center;gap:6px;padding:10px 22px;border-radius:9px;background:var(--accent);color:#fff;border:none;font-family:inherit;font-size:.88rem;font-weight:700;cursor:pointer;transition:all .22s;box-shadow:0 4px 14px rgba(78,141,245,.28)}
    .btn-submit:hover:not(:disabled){background:#3a7de4;transform:translateY(-1px)}.btn-submit:disabled{opacity:.6;cursor:not-allowed}
    .btn-cancel{padding:10px 20px;border-radius:9px;background:rgba(255,255,255,.05);color:var(--light);border:1px solid rgba(255,255,255,.12);font-family:inherit;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .22s}
    .btn-cancel:hover{background:rgba(255,255,255,.09)}

    #proj-toast-container{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none}
    .proj-toast{display:flex;align-items:center;gap:10px;padding:13px 17px;border-radius:9px;background:rgba(5,18,42,.97);border:1px solid rgba(255,255,255,.08);color:var(--light);font-size:.88rem;font-weight:600;animation:slideDown .28s ease;box-shadow:0 8px 24px rgba(0,0,0,.35);pointer-events:all}
    .proj-toast.success{border-color:rgba(52,199,89,.4)}.proj-toast.error{border-color:rgba(255,59,48,.4)}

    @media(max-width:768px){.form-row{grid-template-columns:1fr}.unit-detail-grid{grid-template-columns:1fr}.unit-box{width:100px}#filterBar{flex-direction:column;align-items:flex-start}}
  `;

  /* ─── INIT ─── */
  window.__pages['projects'] = {
    getCSS: function () { return _css; },
    init: async function () {

      const container = document.getElementById('app-main');
      container.innerHTML = `
        <div id="proj-modal">
          <div class="modal-content" id="modalBox">
            <div class="modal-header">
              <h2 id="proj-modal-title"></h2>
              <button class="modal-close" onclick="window.closeModal()"><i class="ri-close-line"></i></button>
            </div>
            <div id="proj-modal-content"></div>
          </div>
        </div>
        <div id="proj-toast-container"></div>
        <div class="toolbar-wrapper">
          <div id="breadcrumb"><span class="bc-current">المشاريع</span></div>
          <button id="addBtn" onclick="window.openAddProject()"><i class="ri-add-line"></i>إضافة مشروع</button>
        </div>
        <div id="searchContainer" class="search-container">
          <div class="search-wrap">
            <i class="search-icon ri-search-line"></i>
            <input type="text" id="searchInput" class="search-input" placeholder="ابحث عن مشروع أو رمز..." oninput="window.handleSearch()">
          </div>
        </div>
        <div id="filterBar">
          <span class="filter-section-label">الحالة:</span>
          <div id="statusPills" style="display:flex;gap:6px;flex-wrap:wrap;">
            <button class="pill active" data-cls="pill" onclick="window.setFilter(0,this)">الكل</button>
            <button class="pill" data-cls="pill" data-active-cls="p-avail" onclick="window.setFilter(1,this)">متاح</button>
            <button class="pill" data-cls="pill" data-active-cls="p-resrv" onclick="window.setFilter(2,this)">محجوز</button>
            <button class="pill" data-cls="pill" data-active-cls="p-sold" onclick="window.setFilter(3,this)">مباع</button>
            <button class="pill" data-cls="pill" data-active-cls="p-closed" onclick="window.setFilter(4,this)">مقفول</button>
          </div>
          <div class="filter-divider"></div>
          <span class="filter-section-label">الغرف:</span>
          <div id="roomsDropdownContainer"></div>
          <div class="facing-select-wrap" id="facingSelectWrap" style="display:none;">
            <span class="filter-section-label">الواجهة:</span>
            <select class="facing-select" id="facingSelectEl" onchange="window.setFacingFilter(Number(this.value))">
              <option value="0">كل الواجهات</option>
              <option value="1">أمامي على شارع</option>
              <option value="2">أمامي على شارعين</option>
              <option value="3">خلفي</option>
            </select>
          </div>
        </div>
        <div id="mainView" style="min-height:400px"></div>
        <div id="pagination"></div>
      `;

      document.getElementById('proj-modal').addEventListener('click', e => {
        if (e.target === document.getElementById('proj-modal')) closeModal();
      }, { signal: window.__pageAbortSignal });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && document.getElementById('proj-modal')?.style.display !== 'none') closeModal();
      }, { signal: window.__pageAbortSignal });
      document.addEventListener('click', e => {
        const wrap = document.querySelector('.rooms-dropdown-wrap');
        if (wrap && !wrap.contains(e.target)) _closeRoomsDropdown();
      }, { signal: window.__pageAbortSignal });

      const API_BASE = `http://${window.location.hostname}:5256`;
      const PER_PAGE = 12;
      const BUILDING_LETTERS = ['A','B','C','D','E','F'];
      const STATUS_AR   = {1:'متاح',2:'محجوز',3:'مباع',4:'مقفول'};
      const STATUS_CSS  = {1:'st-available',2:'st-reserved',3:'st-sold',4:'st-closed'};
      const STATUS_BADGE= {1:'sb-available',2:'sb-reserved',3:'sb-sold',4:'sb-closed'};
      const TYPE_AR     = {1:'شقة',2:'روف'};
      const FACING_AR   = {0:'غير محدد',1:'أمامي على شارع',2:'أمامي على شارعين',3:'خلفي'};

      const S = {
        view:'projects', page:1, filter:0, roomsFilter:0, facingFilter:0,
        data:[], filtered:[], params:{}, buyers:[], _busy:false
      };

      function getAuthToken(){
        let t = localStorage.getItem('token') || localStorage.getItem('authToken');
        if(!t){try{const a=JSON.parse(localStorage.getItem('authData')||'{}');t=a.token||a.authToken;}catch{}}
        return t || '';
      }
      async function api(method, path, body){
        const token = getAuthToken();
        if(!token){ toast('يرجى تسجيل الدخول أولاً','error'); return null; }
        const opts = {method, headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}};
        if(body !== undefined) opts.body = JSON.stringify(body);
        const r = await fetch(API_BASE + path, opts);
        if(!r.ok){
          if (r.status === 401 || r.status === 403) {
            localStorage.clear();
            window.location.replace('/unauth.html');
            return;
          }
          let msg = `خطأ ${r.status}`;
          try{const e=await r.json();msg=e.message||e.title||msg;}catch{}
          throw new Error(msg);
        }
        if(r.status===204) return null;
        return r.json().catch(()=>null);
      }
      const GET    = p     => api('GET',    p);
      const POST   = (p,b) => api('POST',   p, b);
      const PUT    = (p,b) => api('PUT',    p, b);
      const DELETE = p     => api('DELETE', p);
      function arr(v){return Array.isArray(v)?v:(v?.data||v?.items||v?.value||[]);}

      function toast(msg, type='success'){
        const el = document.createElement('div');
        el.className = `proj-toast ${type}`;
        el.innerHTML = `<i class="${type==='success'?'ri-checkbox-circle-line':'ri-error-warning-line'}" style="color:${type==='success'?'var(--success)':'var(--danger)'}"></i><span>${msg}</span>`;
        document.getElementById('proj-toast-container').appendChild(el);
        setTimeout(()=>el.remove(), 3200);
      }
      function openModal(title, html, wide=false){
        document.getElementById('proj-modal-title').textContent = title;
        document.getElementById('proj-modal-content').innerHTML = html;
        document.getElementById('modalBox').classList.toggle('modal-wide', wide);
        document.getElementById('proj-modal').style.display = 'flex';
      }
      function closeModal(){
        document.getElementById('proj-modal').style.display = 'none';
        document.getElementById('proj-modal-content').innerHTML = '';
      }
      window.closeModal = closeModal;

      const sleep = ms => new Promise(r=>setTimeout(r,ms));
      function v(id){const el=document.getElementById(id);return el?el.value.trim():'';}
      function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
      function fmtDate(d){if(!d)return'—';try{return new Date(d).toLocaleDateString('ar-SA',{year:'numeric',month:'short',day:'numeric'});}catch{return'—';}}
      function initials(fn,ln){return((fn||'').charAt(0)+(ln||'').charAt(0)).toUpperCase()||'؟';}
      function setBusy(id,busy,lbl='حفظ'){
        const el=document.getElementById(id);if(!el)return;
        el.disabled=busy;
        el.innerHTML=busy?'<i class="ri-loader-4-line" style="animation:spin .8s linear infinite;display:inline-block"></i> جاري...':`<i class="ri-save-line"></i>${lbl}`;
      }
      function showLoader(){
        const vw=document.getElementById('mainView');if(vw)vw.innerHTML='<div class="loader-box"><div class="spinner"></div></div>';
        const p=document.getElementById('pagination');if(p)p.innerHTML='';
      }
      async function swap(fn){
        if(S._busy)return;S._busy=true;
        const vw=document.getElementById('mainView');if(!vw){S._busy=false;return;}
        vw.style.transition='opacity .2s ease,transform .2s ease';vw.style.opacity='0';vw.style.transform='translateY(8px)';
        await sleep(180);fn();vw.style.opacity='1';vw.style.transform='translateY(0)';await sleep(180);S._busy=false;
      }

      function toStatus(val){
        if(val===null||val===undefined)return 4;
        if(typeof val==='number')return val;
        return {'available':1,'reserved':2,'sold':3,'closed':4,'Available':1,'Reserved':2,'Sold':3,'Closed':4}[val]??4;
      }
      // unit type: 1=apartment, 2=roof  (matches v1 / الصفحة المرجعية)
      function toType(val){
        if(val===null||val===undefined)return 1;
        if(typeof val==='number')return val;
        return {
          'apartment':1,'Apartment':1,
          'roof':2,'Roof':2,
          'typicalfloor':1,'TypicalFloor':1,
          'groundfloor':1,'GroundFloor':1,
        }[val]??1;
      }
      function toFacing(val){
        if(val===null||val===undefined||val===0||val==='0')return 0;
        if(typeof val==='number')return val;
        return {
          'frontonstreet':1,'frontonestreet':1,'FrontOneStreet':1,
          'fronttwostreets':2,'FrontTwoStreets':2,
          'back':3,'Back':3
        }[val]??1;
      }
      function computeStats(units){
        return{
          total:units.length,
          avail:units.filter(u=>toStatus(u.status)===1).length,
          resrv:units.filter(u=>toStatus(u.status)===2).length,
          sold :units.filter(u=>toStatus(u.status)===3).length,
          closed:units.filter(u=>toStatus(u.status)===4).length,
        };
      }

      async function ensureBuyers(){
        if(S.buyers.length>0)return;
        try{const d=await GET('/api/Buyers');S.buyers=arr(d);}catch{S.buyers=[];}
      }
      function buyerById(id){
        if(!id)return null;
        return S.buyers.find(b=>b.id===id||b.id===Number(id)||String(b.id)===String(id))||null;
      }
      function buyerName(b){if(!b)return'—';return `${b.firstName||''} ${b.lastName||''}`.trim()||'—';}

      /* ── Custom Rooms Dropdown ── */
      function _closeRoomsDropdown(){
        const menu=document.getElementById('roomsDDMenu');
        const btn=document.getElementById('roomsDDBtn');
        if(menu)menu.classList.remove('open');
        if(btn)btn.classList.remove('open');
      }
      function buildRoomsDropdown(roomSet){
        const container=document.getElementById('roomsDropdownContainer');
        if(!container)return;
        const activeLabel = S.roomsFilter===0 ? 'الكل' : `${S.roomsFilter} غرف`;
        const isActive = S.roomsFilter !== 0;
        container.innerHTML = `
          <div class="rooms-dropdown-wrap">
            <div class="rooms-dropdown-btn${isActive?' active':''}" id="roomsDDBtn" onclick="window._toggleRoomsDD()">
              <i class="ri-hotel-bed-line" style="font-size:.82rem"></i>
              <span id="roomsDDLabel">${activeLabel}</span>
              <i class="ri-arrow-down-s-line dd-arrow"></i>
            </div>
            <div class="rooms-dropdown-menu" id="roomsDDMenu">
              <div class="rooms-dd-item${S.roomsFilter===0?' active':''}" onclick="window._pickRoom(0)">
                <span class="dd-check">${S.roomsFilter===0?'<i class="ri-check-line"></i>':''}</span>
                <span>الكل</span>
              </div>
              ${roomSet.map(r=>`
                <div class="rooms-dd-item${S.roomsFilter===r?' active':''}" onclick="window._pickRoom(${r})">
                  <span class="dd-check">${S.roomsFilter===r?'<i class="ri-check-line"></i>':''}</span>
                  <span>${r} غرف</span>
                </div>`).join('')}
            </div>
          </div>`;
      }
      window._toggleRoomsDD = function(){
        const menu=document.getElementById('roomsDDMenu');
        const btn=document.getElementById('roomsDDBtn');
        if(!menu||!btn)return;
        const open=menu.classList.contains('open');
        menu.classList.toggle('open',!open);
        btn.classList.toggle('open',!open);
      };
      window._pickRoom = function(val){
        S.roomsFilter=Number(val);
        _closeRoomsDropdown();
        const label=document.getElementById('roomsDDLabel');
        const btn=document.getElementById('roomsDDBtn');
        if(label)label.textContent=val===0?'الكل':`${val} غرف`;
        if(btn)btn.classList.toggle('active',val!==0);
        doSearch();
      };

      function showFacingDropdown(show){
        const wrap=document.getElementById('facingSelectWrap');
        if(wrap) wrap.style.display=show?'flex':'none';
      }
      function setFacingFilter(val){
        S.facingFilter=Number(val);
        const sel=document.getElementById('facingSelectEl');
        if(sel) sel.value=val;
        doSearch();
      }

      let _st = null;
      function handleSearch(){clearTimeout(_st);_st=setTimeout(doSearch,150);}
      function setFilter(f,btn){
        S.filter=f;
        document.querySelectorAll('#statusPills .pill').forEach(b=>{b.className=b.dataset.cls||'pill';});
        btn.classList.add('active');if(btn.dataset.activeCls)btn.classList.add(btn.dataset.activeCls);
        doSearch();
      }
      function getFloorUnits(floorId){
        return(S.params.units||[]).filter(u=>{
          if(Number(u.floorId)!==Number(floorId))return false;
          if(S.filter!==0&&toStatus(u.status)!==S.filter)return false;
          if(S.roomsFilter>0&&Number(u.rooms)!==S.roomsFilter)return false;
          if(S.facingFilter>0&&toFacing(u.facing)!==S.facingFilter)return false;
          return true;
        });
      }
      function doSearch(){
        const q=(document.getElementById('searchInput')?.value||'').toLowerCase().trim();
        if(S.view==='projects')S.filtered=S.data.filter(p=>(p.name||'').toLowerCase().includes(q)||(p.location||'').toLowerCase().includes(q)||(p.code||'').toLowerCase().includes(q));
        else if(S.view==='buildings')S.filtered=[...S.data];
        else if(S.view==='units')S.filtered=S.filter===0&&S.roomsFilter===0&&S.facingFilter===0?[...S.data]:S.data.filter(f=>getFloorUnits(f.id).length>0);
        S.page=1;swap(renderView);
      }

      function renderPag(total){
        const pages=Math.ceil(total/PER_PAGE),d=document.getElementById('pagination');
        if(!d||pages<=1){if(d)d.innerHTML='';return;}
        let h=`<button class="pg-btn" onclick="window.goPage(${S.page-1})" ${S.page===1?'disabled':''}>السابق</button>`;
        for(let i=1;i<=pages;i++)h+=`<button class="pg-btn ${S.page===i?'active':''}" onclick="window.goPage(${i})">${i}</button>`;
        h+=`<button class="pg-btn" onclick="window.goPage(${S.page+1})" ${S.page===pages?'disabled':''}>التالي</button>`;
        d.innerHTML=h;
      }
      function goPage(p){S.page=p;swap(renderView);window.scrollTo({top:0,behavior:'smooth'});}

      function renderView(){
        const start=(S.page-1)*PER_PAGE, page=S.filtered.slice(start,start+PER_PAGE), c=document.getElementById('mainView');
        if(!c)return;

        if(S.view==='projects'){
          if(!page.length){c.innerHTML='<div class="empty-msg"><i class="ri-building-2-line"></i>لا توجد مشاريع</div>';renderPag(0);return;}
          c.innerHTML='<div class="grid">'+page.map((p,i)=>{
            const pUnits=(S.params.allUnits||[]).filter(u=>u._projectId===p.id);
            const st=pUnits.length?computeStats(pUnits):{total:p.totalUnits??0,avail:p.availableUnits??0,resrv:p.reservedUnits??0,sold:p.soldUnits??0,closed:p.closedUnits??0};
            return `<div class="p-card" style="animation-delay:${i*50}ms" onclick="window.showBuildings(${p.id},'${esc(p.name)}','${esc(p.code||'')}')">
              <div class="p-card-ribbon"></div>
              <div class="p-card-body">
                <div class="p-card-header">
                  <div class="p-card-title-wrap"><div class="p-card-title">${esc(p.name)}</div></div>
                  <div class="p-card-actions">
                    <button class="icon-btn edit" onclick="event.stopPropagation();window.editProject(${p.id})"><i class="ri-edit-line"></i></button>
                  </div>
                </div>
                <div class="p-card-loc"><i class="ri-map-pin-line"></i>${esc(p.location)}</div>
                ${p.description?`<div style="font-size:.75rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(p.description)}</div>`:''}
                <div class="p-card-stats">
                  <div class="ps-box ps-total"><div class="ps-num">${st.total}</div><div class="ps-lbl">وحدات</div></div>
                  <div class="ps-box ps-avail"><div class="ps-num">${st.avail}</div><div class="ps-lbl">متاح</div></div>
                  <div class="ps-box ps-resrv"><div class="ps-num">${st.resrv}</div><div class="ps-lbl">محجوز</div></div>
                  <div class="ps-box ps-sold"><div class="ps-num">${st.sold}</div><div class="ps-lbl">مباع</div></div>
                  <div class="ps-box ps-closed"><div class="ps-num">${st.closed}</div><div class="ps-lbl">مقفول</div></div>
                </div>
                <div class="p-card-footer"><div class="p-card-date"><i class="ri-calendar-line"></i> ${fmtDate(p.createdAt)}</div></div>
              </div>
            </div>`;
          }).join('')+'</div>';
          renderPag(S.filtered.length);
        }

        else if(S.view==='buildings'){
          if(!page.length){c.innerHTML='<div class="empty-msg"><i class="ri-building-3-line"></i>لا توجد مبانٍ</div>';renderPag(0);return;}
          c.innerHTML='<div class="grid">'+page.map((b,i)=>{
            const bUnits=(S.params.allUnits||[]).filter(u=>u._buildingId===b.id);
            const st=bUnits.length?computeStats(bUnits):{total:b.totalUnits??0,avail:b.availableUnits??0,resrv:b.reservedUnits??0,sold:b.soldUnits??0,closed:b.closedUnits??0};
            const pCode=S.params.projectCode||'';
            const bLabel=pCode?`${pCode}-${b.code||b.name}`:b.code||b.name;
            return `<div class="b-card" style="animation-delay:${i*50}ms" onclick="window.showUnits(${b.id},'${esc(b.name)}','${esc(b.code||'')}')">
              <div class="b-card-ribbon"></div>
              <div class="b-card-body">
                <div class="b-card-header">
                  <div class="b-card-title-wrap">
                    <div class="b-card-code">${esc(bLabel)}</div>
                    <div class="b-card-title">${esc(b.name)}</div>
                  </div>
                  <div class="b-card-actions">
                    <div class="icon-btn edit" onclick="event.stopPropagation();window.editBuilding(${b.id})"><i class="ri-edit-line"></i></div>
                  </div>
                </div>
                <div class="p-card-stats" style="margin-top:12px">
                  <div class="ps-box ps-total"><div class="ps-num">${st.total}</div><div class="ps-lbl">وحدات</div></div>
                  <div class="ps-box ps-avail"><div class="ps-num">${st.avail}</div><div class="ps-lbl">متاح</div></div>
                  <div class="ps-box ps-resrv"><div class="ps-num">${st.resrv}</div><div class="ps-lbl">محجوز</div></div>
                  <div class="ps-box ps-sold"><div class="ps-num">${st.sold}</div><div class="ps-lbl">مباع</div></div>
                  <div class="ps-box ps-closed"><div class="ps-num">${st.closed}</div><div class="ps-lbl">مقفول</div></div>
                </div>
                <div class="p-card-footer"><div class="p-card-date"><i class="ri-calendar-line"></i> ${fmtDate(b.createdAt)}</div></div>
              </div>
            </div>`;
          }).join('')+'</div>';
          renderPag(S.filtered.length);
        }

        else if(S.view==='units'){
          const allUnits=S.params.units||[];
          const roomSet=[...new Set(allUnits.map(u=>Number(u.rooms)).filter(r=>r>0))].sort((a,b)=>a-b);
          buildRoomsDropdown(roomSet);
          showFacingDropdown(true);

          const floorsToShow=S.filter===0&&S.roomsFilter===0&&S.facingFilter===0?S.data:S.data.filter(f=>getFloorUnits(f.id).length>0);
          const sortedFloors=[...floorsToShow].sort((a,b)=>(b.floorNumber??0)-(a.floorNumber??0));

          if(!sortedFloors.length){c.innerHTML='<div class="empty-msg"><i class="ri-layout-2-line"></i>لا توجد وحدات مطابقة</div>';renderPag(0);return;}
          const pagFloors=sortedFloors.slice((S.page-1)*PER_PAGE,S.page*PER_PAGE);
          let h='<div class="floor-map">';
          pagFloors.forEach((f,fi)=>{
            const fu=getFloorUnits(f.id);
            const isRoof=!!(f.isRoof||f.type===3||String(f.type).toLowerCase()==='roof');
            const floorLabel=isRoof?`الدور ${f.floorNumber} <span class="roof-badge">روف</span>`:`الدور ${f.floorNumber}`;
            const avail=fu.filter(u=>toStatus(u.status)===1).length;
            const resrv=fu.filter(u=>toStatus(u.status)===2).length;
            const sold =fu.filter(u=>toStatus(u.status)===3).length;
            const closed=fu.filter(u=>toStatus(u.status)===4).length;
            h+=`<div class="floor-row${isRoof?' is-roof':''}" style="animation-delay:${fi*50}ms">
              <div class="floor-header">
                <div class="floor-lbl">${floorLabel}</div>
                <span class="floor-count">${fu.length} وحدة</span>
              </div>
              <div class="units-wrap">`;
            fu.forEach(u=>{
              const st=toStatus(u.status), tp=toType(u.type);
              const facing=toFacing(u.facing);
              const css=STATUS_CSS[st]||'st-closed', stAr=STATUS_AR[st]||'—';
              const isUnitRoof=tp===2;
              const rooms=Number(u.rooms)||0;
              const buyer=buyerById(u.buyerId), bName=buyer?buyerName(buyer):'';
              const facingAr=FACING_AR[facing]||'—';
              const priceStr=u.price&&Number(u.price)>0?Number(u.price).toLocaleString('ar-SA'):'—';
              const typeBadgeClass=isUnitRoof?'u-type-badge u-type-roof':'u-type-badge u-type-apt';
              const typeBadgeText=isUnitRoof?'روف':'شقة';
              h+=`<div class="unit-box ${css}" onclick="window.openUnitDetail(${u.id})">
                <div class="u-actions">
                  <button class="u-icon-btn edit" onclick="event.stopPropagation();window.editUnit(${u.id})"><i class="ri-edit-line"></i></button>
                </div>
                <div class="unit-box-top">
                  <div class="u-num-row">
                    <span class="u-num">${esc(String(u.unitNumber))}</span>
                    <span class="${typeBadgeClass}">${typeBadgeText}</span>
                  </div>
                  <div class="u-divider"></div>
                  ${rooms>0?`<div class="u-info-row"><i class="ri-hotel-bed-line"></i>${rooms} غرف</div>`:'<div class="u-info-row"><i class="ri-hotel-bed-line"></i>—</div>'}
                  ${u.area&&Number(u.area)>0?`<div class="u-info-row"><i class="ri-layout-line"></i>${u.area} م²</div>`:''}
                  <div class="u-facing-row"><i class="ri-compass-3-line"></i>${facingAr}</div>
                  ${bName?`<div class="u-client-row"><i class="ri-user-line"></i>${esc(bName)}</div>`:''}
                </div>
                <div class="unit-box-bottom">
                  <span class="u-status-dot"></span>
                  <span class="u-status-text">${stAr}</span>
                  <span class="u-price">${priceStr}</span>
                </div>
              </div>`;
            });
            h+=`<button class="floor-add-btn" onclick="window.openAddUnit(${f.id},${f.floorNumber},${isRoof})"><i class="ri-add-line"></i><span>وحدة</span></button></div>`;
            if(fu.length>0)h+=`<div class="legend">
              ${avail >0?`<span class="legend-item"><span class="legend-dot" style="background:var(--success)"></span>متاح (${avail})</span>`:''}
              ${resrv >0?`<span class="legend-item"><span class="legend-dot" style="background:var(--warning)"></span>محجوز (${resrv})</span>`:''}
              ${sold  >0?`<span class="legend-item"><span class="legend-dot" style="background:var(--danger)"></span>مباع (${sold})</span>`:''}
              ${closed>0?`<span class="legend-item"><span class="legend-dot" style="background:var(--closed)"></span>مقفول (${closed})</span>`:''}
            </div>`;
            h+='</div>';
          });
          h+='</div>';c.innerHTML=h;renderPag(sortedFloors.length);
        }
      }

      function setBreadcrumb(items){
        const el=document.getElementById('breadcrumb');if(!el)return;
        el.innerHTML=items.map((it,i)=>{const last=i===items.length-1;
          return last?`<span class="bc-current">${esc(it.label)}</span>`:`<span class="bc-item" onclick="${it.fn}">${esc(it.label)}</span><span class="bc-sep">/</span>`;
        }).join('');
      }
      function setAddBtn(label,oc){const el=document.getElementById('addBtn');if(!el)return;el.innerHTML=`<i class="ri-add-line"></i>${label}`;el.setAttribute('onclick',oc);}
      function updateSearch(ph){const el=document.getElementById('searchInput');if(!el)return;el.placeholder=ph;el.value='';}
      function showSearchBar(show){const el=document.getElementById('searchContainer');if(el)el.style.display=show?'flex':'none';}
      function showFilterBar(show){
        const el=document.getElementById('filterBar');if(!el)return;
        el.style.display=show?'flex':'none';
        if(show){
          document.querySelectorAll('#statusPills .pill').forEach((b,i)=>{b.className=b.dataset.cls||'pill';if(i===0)b.classList.add('active');});
          S.filter=0;S.roomsFilter=0;S.facingFilter=0;
          const rc=document.getElementById('roomsDropdownContainer');if(rc)rc.innerHTML='';
          const fsel=document.getElementById('facingSelectEl');if(fsel)fsel.value=0;
          showFacingDropdown(false);
        }
      }

      async function showProjects(){
        S.view='projects';S.page=1;S.filter=0;S.roomsFilter=0;S.facingFilter=0;S.params={};
        setBreadcrumb([{label:'المشاريع'}]);
        setAddBtn('إضافة مشروع','window.openAddProject()');
        showSearchBar(true);showFilterBar(false);updateSearch('ابحث عن مشروع أو رمز...');showLoader();
        try{
          const[projData,allUnitsData,floorsData,bldData]=await Promise.all([GET('/api/Projects'),GET('/api/Units'),GET('/api/Floors'),GET('/api/Buildings')]);
          S.data=arr(projData);
          const floors=arr(floorsData),buildings=arr(bldData);
          S.params.allUnits=arr(allUnitsData).map(u=>{
            const floor=floors.find(f=>Number(f.id)===Number(u.floorId));
            const bld=floor?buildings.find(b=>Number(b.id)===Number(floor.buildingId)):null;
            return{...u,_projectId:bld?.projectId,_buildingId:bld?.id};
          });
          S.filtered=[...S.data];swap(renderView);
        }catch(e){console.error(e);toast('فشل تحميل المشاريع','error');}
      }

      async function showBuildings(projectId,projectName,projectCode){
        S.view='buildings';S.page=1;S.filter=0;S.roomsFilter=0;S.facingFilter=0;
        S.params={projectId:Number(projectId),projectName,projectCode:projectCode||''};
        setBreadcrumb([{label:'المشاريع',fn:'window.showProjects()'},{label:projectName}]);
        setAddBtn('إضافة مبنى',`window.openAddBuilding(${projectId})`);
        showSearchBar(false);showFilterBar(false);showLoader();
        try{
          const[bldData,allUnitsData,floorsData]=await Promise.all([GET('/api/Buildings'),GET('/api/Units'),GET('/api/Floors')]);
          S.data=arr(bldData).filter(b=>Number(b.projectId)===Number(projectId));
          const floors=arr(floorsData);
          S.params.allUnits=arr(allUnitsData).map(u=>{const floor=floors.find(f=>Number(f.id)===Number(u.floorId));return{...u,_buildingId:floor?.buildingId};});
          S.filtered=[...S.data];swap(renderView);
        }catch(e){console.error(e);toast('فشل تحميل المباني','error');}
      }

      async function showUnits(buildingId,buildingName,buildingCode){
        S.view='units';S.page=1;S.filter=0;S.roomsFilter=0;S.facingFilter=0;
        const{projectId,projectName,projectCode}=S.params;
        S.params={...S.params,buildingId:Number(buildingId),buildingName,buildingCode:buildingCode||''};
        setBreadcrumb([
          {label:'المشاريع',fn:'window.showProjects()'},
          {label:projectName,fn:`window.showBuildings(${projectId},'${esc(projectName)}','${esc(projectCode||'')}')`},
          {label:buildingName}
        ]);
        setAddBtn('إضافة دور',`window.openAddFloor(${buildingId})`);
        showSearchBar(false);showFilterBar(true);showLoader();
        await ensureBuyers();
        try{
          const[floorsData,unitsData]=await Promise.all([GET('/api/Floors'),GET('/api/Units')]);
          const floors=arr(floorsData).filter(f=>Number(f.buildingId)===Number(buildingId)).sort((a,b)=>(a.floorNumber??0)-(b.floorNumber??0));
          const units=arr(unitsData).filter(u=>floors.some(f=>Number(f.id)===Number(u.floorId))).sort((a,b)=>Number(a.unitNumber)-Number(b.unitNumber));
          S.data=[...floors];S.filtered=[...floors];S.params.units=units;
          const roomSet=[...new Set(units.map(u=>Number(u.rooms)).filter(r=>r>0))].sort((a,b)=>a-b);
          buildRoomsDropdown(roomSet);
          showFacingDropdown(true);
          swap(renderView);
        }catch(e){console.error(e);toast('فشل تحميل الوحدات','error');}
      }

      /* ── PROJECTS CRUD ── */
      function openAddProject(){
        openModal('إضافة مشروع جديد',`<div class="modal-body">
          <div class="form-group"><label class="form-label">اسم المشروع *</label><input id="f-pname" class="form-input" placeholder="اسم المشروع"><div id="err-pname" class="form-error">الاسم موجود مسبقاً</div></div>
          <div class="form-group"><label class="form-label">الموقع *</label><input id="f-ploc" class="form-input" placeholder="الموقع"></div>
          <div class="form-group"><label class="form-label">وصف المشروع</label><textarea id="f-pdesc" class="form-input" placeholder="وصف مختصر" rows="3" style="resize:none;padding:10px"></textarea></div>
        </div>
        <div class="modal-footer">
          <button class="btn-submit" id="submitBtn" onclick="window.submitAddProject()"><i class="ri-save-line"></i>حفظ</button>
          <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
        </div>`);
      }
      async function submitAddProject(){
        const name=v('f-pname'),location=v('f-ploc'),description=v('f-pdesc');
        document.getElementById('err-pname').style.display='none';
        if(!name||!location){toast('يرجى ملء الحقول الإلزامية','error');return;}
        if(S.data.find(p=>p.name.trim().toLowerCase()===name.toLowerCase())){document.getElementById('err-pname').style.display='block';return;}
        setBusy('submitBtn',true);
        try{await POST('/api/Projects',{name,location,description});toast('تم إضافة المشروع');closeModal();await showProjects();}
        catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }
      async function editProject(id){
        try{
          const p=await GET(`/api/Projects/${id}`);
          openModal('تعديل المشروع',`<div class="modal-body">
            <div class="form-group"><label class="form-label">اسم المشروع *</label><input id="f-pname" class="form-input" value="${esc(p.name||'')}"><div id="err-pname" class="form-error">الاسم موجود مسبقاً</div></div>
            <div class="form-group"><label class="form-label">الموقع *</label><input id="f-ploc" class="form-input" value="${esc(p.location||'')}"></div>
            <div class="form-group"><label class="form-label">وصف المشروع</label><textarea id="f-pdesc" class="form-input" rows="3" style="resize:none;padding:10px">${esc(p.description||'')}</textarea></div>
          </div>
          <div class="modal-footer">
            <button class="btn-submit" id="submitBtn" onclick="window.submitEditProject(${id})"><i class="ri-save-line"></i>حفظ</button>
            <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
          </div>`);
        }catch{toast('فشل تحميل البيانات','error');}
      }
      async function submitEditProject(id){
        const name=v('f-pname'),location=v('f-ploc'),description=v('f-pdesc');
        if(!name||!location){toast('يرجى ملء الحقول الإلزامية','error');return;}
        setBusy('submitBtn',true);
        try{await PUT(`/api/Projects/${id}`,{name,location,description});toast('تم التعديل');closeModal();await showProjects();}
        catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }

      /* ── BUILDINGS CRUD ── */
      function openAddBuilding(projectId){
        const usedCodes=S.data.map(b=>(b.code||'').toUpperCase());
        const availLetters=BUILDING_LETTERS.filter(l=>!usedCodes.includes(l));
        openModal('إضافة مبنى جديد',`<div class="modal-body">
          <div class="form-group"><label class="form-label">حرف المبنى *</label>
            ${availLetters.length>0
              ?`<select id="f-bcode" class="form-select">${availLetters.map(l=>`<option value="${l}">${l}</option>`).join('')}</select>`
              :`<div style="padding:10px;background:rgba(255,59,48,.1);border:1px solid rgba(255,59,48,.3);border-radius:8px;font-size:.85rem;color:var(--danger)">تم استخدام جميع الحروف المتاحة (A-F)</div><input type="hidden" id="f-bcode" value="">`}
          </div>
          <div class="form-group"><label class="form-label">عدد الأدوار *</label><input id="f-bfloors" class="form-input" type="number" min="1" max="30" value="5"></div>
        </div>
        <div class="modal-footer">
          <button class="btn-submit" id="submitBtn" onclick="window.submitAddBuilding(${projectId})"><i class="ri-save-line"></i>حفظ</button>
          <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
        </div>`);
      }
      async function submitAddBuilding(projectId){
        const code=v('f-bcode'),floorsCount=Math.max(1,Number(v('f-bfloors'))||5);
        if(!code){toast('يرجى اختيار حرف المبنى','error');return;}
        setBusy('submitBtn',true);
        try{
          const res=await POST('/api/Buildings',{name:code,code,projectId:Number(projectId)});
          const buildingId=res?.id||res?.buildingId;
          if(buildingId){
            for(let i=1;i<=floorsCount;i++){
              const isRoof=(i===floorsCount);
              const floorType=isRoof?3:2;
              const unitType=isRoof?2:1;
              const floorRes=await POST('/api/Floors',{buildingId:Number(buildingId),floorNumber:i,isRoof,type:floorType});
              const floorId=floorRes?.id||floorRes?.floorId;
              if(floorId)await Promise.allSettled([
                POST('/api/Units',{unitNumber:`${i}01`,type:unitType,status:1,facing:0,area:0,rooms:0,price:0,floorId:Number(floorId)}),
                POST('/api/Units',{unitNumber:`${i}02`,type:unitType,status:1,facing:0,area:0,rooms:0,price:0,floorId:Number(floorId)})
              ]);
            }
          }
          toast(`تم إضافة المبنى ${code} مع ${floorsCount} أدوار`);closeModal();
          await showBuildings(S.params.projectId,S.params.projectName,S.params.projectCode);
        }catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }
      async function editBuilding(id){
        try{
          const b=await GET(`/api/Buildings/${id}`);
          openModal('تعديل المبنى',`<div class="modal-body">
            <div class="form-group"><label class="form-label">حرف المبنى</label>
              <div style="padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:9px;font-weight:700;font-size:1rem">${esc(b.code||b.name)}</div>
            </div></div>
            <div class="modal-footer"><button class="btn-cancel" onclick="window.closeModal()">إغلاق</button></div>`);
        }catch{toast('فشل تحميل البيانات','error');}
      }

      /* ── FLOORS CRUD ── */
      function openAddFloor(buildingId){
        const existNums=S.data.map(f=>f.floorNumber);
        const nextFloor=(existNums.length?Math.max(...existNums):0)+1;
        openModal('إضافة دور جديد',`<div class="modal-body">
          <div class="form-group"><label class="form-label">رقم الدور *</label><input id="f-fnum" class="form-input" type="number" min="1" value="${nextFloor}"></div>
          <div class="form-group"><label class="form-label">نوع الدور</label>
            <select id="f-ftype" class="form-select"><option value="2">دور عادي</option><option value="3">روف</option></select>
          </div></div>
          <div class="modal-footer">
            <button class="btn-submit" id="submitBtn" onclick="window.submitAddFloor(${buildingId})"><i class="ri-save-line"></i>إضافة</button>
            <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
          </div>`);
      }
      async function submitAddFloor(buildingId){
        const floorNumber=Number(v('f-fnum')),ftype=Number(v('f-ftype'));
        if(!floorNumber||floorNumber<1){toast('يرجى إدخال رقم دور صحيح','error');return;}
        if(S.data.find(f=>f.floorNumber===floorNumber)){toast('رقم الدور موجود مسبقاً','error');return;}
        setBusy('submitBtn',true);
        const isRoof=ftype===3;
        const unitType=isRoof?2:1;
        try{
          const floorRes=await POST('/api/Floors',{buildingId:Number(buildingId),floorNumber,isRoof,type:ftype});
          const floorId=floorRes?.id||floorRes?.floorId;
          if(floorId)await Promise.allSettled([
            POST('/api/Units',{unitNumber:`${floorNumber}01`,type:unitType,status:1,facing:0,area:0,rooms:0,price:0,floorId:Number(floorId)}),
            POST('/api/Units',{unitNumber:`${floorNumber}02`,type:unitType,status:1,facing:0,area:0,rooms:0,price:0,floorId:Number(floorId)})
          ]);
          toast('تم إضافة الدور مع وحدتين');closeModal();
          await showUnits(buildingId,S.params.buildingName,S.params.buildingCode);
        }catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }

      /* ── UNITS CRUD ── */
      let _selectedBuyerId = null;
      function buildClientPicker(selectedId=null){
        _selectedBuyerId=selectedId||null;
        return `<div class="client-search-wrap">
          <i class="client-search-icon ri-search-line"></i>
          <input type="text" id="clientSearchInput" class="client-search-input" placeholder="ابحث باسم العميل أو رقمه..." oninput="window._filterClients()">
        </div><div class="client-list" id="clientList"></div>`;
      }
      function renderClientList(q=''){
        const el=document.getElementById('clientList');if(!el)return;
        const filtered=S.buyers.filter(b=>{const name=buyerName(b).toLowerCase();return name.includes(q.toLowerCase())||(b.phoneNumber||'').includes(q)||(b.nationalId||'').includes(q)||(b.email||'').toLowerCase().includes(q.toLowerCase());});
        if(!filtered.length){el.innerHTML=`<div class="client-empty"><i class="ri-user-search-line" style="font-size:1.5rem;display:block;margin-bottom:8px;opacity:.4"></i>لا يوجد عملاء مطابقون</div>`;return;}
        el.innerHTML=filtered.map(b=>{
          const sel=String(_selectedBuyerId)===String(b.id);
          return `<div class="client-item${sel?' selected':''}" onclick="window._selectClient(${b.id},this)">
            <div class="client-avatar">${initials(b.firstName,b.lastName)}</div>
            <div><div class="client-info-name">${esc(buyerName(b))}</div><div class="client-info-sub">${esc(b.phoneNumber||b.email||'')}</div></div>
          </div>`;
        }).join('');
      }
      window._filterClients = () => renderClientList(document.getElementById('clientSearchInput')?.value||'');
      window._selectClient  = (id,el) => {
        _selectedBuyerId=id;
        document.querySelectorAll('.client-item').forEach(i=>i.classList.remove('selected'));
        if(el)el.classList.add('selected');
      };

      function uStatusOpts(sel=1){const selNum=toStatus(sel);return [{v:1,l:'متاح'},{v:2,l:'محجوز'},{v:3,l:'مباع'},{v:4,l:'مقفول'}].map(o=>`<option value="${o.v}" ${selNum===o.v?'selected':''}>${o.l}</option>`).join('');}
      function uTypeOpts(sel=1){const selNum=toType(sel);return [{v:1,l:'شقة'},{v:2,l:'روف'}].map(o=>`<option value="${o.v}" ${selNum===o.v?'selected':''}>${o.l}</option>`).join('');}
      function uFacingOpts(sel=0){const selNum=toFacing(sel);return [
        {v:0,l:'— غير محدد —'},
        {v:1,l:'أمامي على شارع'},
        {v:2,l:'أمامي على شارعين'},
        {v:3,l:'خلفي'}
      ].map(o=>`<option value="${o.v}" ${selNum===o.v?'selected':''}>${o.l}</option>`).join('');}

      window.calcRemaining = function(){
        const price=parseFloat(v('f-uprice'))||0,paid=parseFloat(v('f-bpaid'))||0;
        const ri=document.getElementById('f-bremain');if(ri)ri.value=Math.max(0,price-paid);
      };
      window.handleUnitStatusChange = function(sel){
        const section=document.getElementById('clientPickerSection'),finSection=document.getElementById('bookingFinancials');if(!section)return;
        const st=Number(sel.value);
        if(st===2||st===3){
          section.style.display='block';if(finSection)finSection.style.display='block';
          const txt=document.getElementById('cPickerText');if(txt)txt.textContent=(st===3?'مباع لـ':'محجوز لـ');
        }else{
          section.style.display='none';if(finSection)finSection.style.display='none';_selectedBuyerId=null;
        }
      };

      let _addFloorId = null;
      async function openAddUnit(floorId,floorNumber,isRoof=false){
        _addFloorId=floorId;
        const existingInFloor=(S.params.units||[]).filter(u=>Number(u.floorId)===Number(floorId));
        const suggestedNum=`${floorNumber}${String(existingInFloor.length+1).padStart(2,'0')}`;
        const defaultType=isRoof?2:1;
        openModal('إضافة وحدة',`<div class="modal-body">
          <div class="form-row">
            <div class="form-group"><label class="form-label">رقم الوحدة *</label><input id="f-unum" class="form-input" value="${suggestedNum}"><div id="err-unum" class="form-error">الرقم موجود في هذا الدور</div></div>
            <div class="form-group"><label class="form-label">نوع الوحدة</label><select id="f-utype" class="form-select">${uTypeOpts(defaultType)}</select></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">الحالة</label><select id="f-ustatus" class="form-select" onchange="window.handleUnitStatusChange(this)">${uStatusOpts(1)}</select></div>
            <div class="form-group"><label class="form-label">عدد الغرف</label><input id="f-urooms" class="form-input" type="number" min="0" value="0"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">المساحة (م²)</label><input id="f-uarea" class="form-input" type="number" step="0.5" value="0"></div>
            <div class="form-group"><label class="form-label">السعر (ر.س)</label><input id="f-uprice" class="form-input" type="number" step="1000" value="0" oninput="window.calcRemaining()"></div>
          </div>
          <div class="form-group">
            <label class="form-label"><i class="ri-compass-3-line" style="color:var(--accent)"></i> الواجهة</label>
            <select id="f-ufacing" class="form-select">${uFacingOpts(0)}</select>
          </div>
          <div id="clientPickerSection" style="display:none">
            <div class="client-picker-label"><i class="ri-user-line"></i>اختر العميل *</div>${buildClientPicker(null)}
          </div>
          <div id="bookingFinancials" style="display:none;margin-top:10px">
            <div class="form-row">
              <div class="form-group"><label class="form-label">المبلغ المدفوع (المقدم)</label><input id="f-bpaid" class="form-input" type="number" min="0" value="0" oninput="window.calcRemaining()"></div>
              <div class="form-group"><label class="form-label">المبلغ المتبقي</label><input id="f-bremain" class="form-input" type="number" min="0" value="0" readonly style="background:rgba(0,0,0,.2);opacity:.8;cursor:not-allowed"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-submit" id="submitBtn" onclick="window.submitAddUnit()"><i class="ri-save-line"></i>حفظ</button>
          <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
        </div>`);
        setTimeout(()=>renderClientList(''),50);
      }
      async function submitAddUnit(){
        const floorId=_addFloorId,unitNumber=v('f-unum'),utype=Number(v('f-utype')),status=Number(v('f-ustatus'));
        const rooms=Number(v('f-urooms'))||0,area=Number(v('f-uarea'))||0,price=Number(v('f-uprice'))||0;
        const facing=Number(v('f-ufacing'))||0;
        if(!unitNumber||!floorId){toast('يرجى إدخال رقم الوحدة','error');return;}
        const dup=(S.params.units||[]).find(u=>Number(u.floorId)===Number(floorId)&&String(u.unitNumber).trim()===unitNumber);
        if(dup){document.getElementById('err-unum').style.display='block';return;}
        if((status===2||status===3)&&!_selectedBuyerId){toast('يرجى اختيار عميل','error');return;}
        setBusy('submitBtn',true);
        try{
          const backendStatus=(status===2||status===3)?1:status;
          const newUnit=await POST('/api/Units',{unitNumber,type:utype,status:backendStatus,facing,area,rooms,price,floorId:Number(floorId),buyerId:null});
          const unitId=newUnit?.id||newUnit?.unitId;
          if(unitId&&(status===2||status===3)){
            const bPaid=Number(v('f-bpaid'))||0,bRemain=Number(v('f-bremain'))||0;
            await POST('/api/Bookings',{status:status===3?2:1,amountPaid:bPaid,remainingAmount:bRemain,buyerId:_selectedBuyerId,unitId});
            if(status===3)await PUT(`/api/Units/${unitId}`,{unitNumber,type:utype,status:3,facing,area,rooms,price,floorId:Number(floorId),buyerId:_selectedBuyerId});
          }
          toast('تم إضافة الوحدة');closeModal();
          await showUnits(S.params.buildingId,S.params.buildingName,S.params.buildingCode);
        }catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }

      async function editUnit(id){
        await ensureBuyers();
        try{
          const u=await GET(`/api/Units/${id}`);
          const currStatus=toStatus(u.status),currType=toType(u.type),currFacing=toFacing(u.facing);
          let bPaid=0,bRemain=0,bookingIdFromApi=null;
          if(u.bookingId){
            try{
              const b=await GET(`/api/Bookings/${u.bookingId}`);
              if(b){bPaid=b.amountPaid||0;bRemain=b.remainingAmount||0;bookingIdFromApi=b.id;}
            }catch{}
          }
          openModal('تعديل الوحدة',`<div class="modal-body">
            <div class="form-row">
              <div class="form-group"><label class="form-label">رقم الوحدة *</label><input id="f-unum" class="form-input" value="${esc(String(u.unitNumber||''))}"></div>
              <div class="form-group"><label class="form-label">نوع الوحدة</label><select id="f-utype" class="form-select">${uTypeOpts(currType)}</select></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">الحالة</label><select id="f-ustatus" class="form-select" onchange="window.handleUnitStatusChange(this)">${uStatusOpts(currStatus)}</select></div>
              <div class="form-group"><label class="form-label">عدد الغرف</label><input id="f-urooms" class="form-input" type="number" min="0" value="${u.rooms||0}"></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">المساحة (م²)</label><input id="f-uarea" class="form-input" type="number" step="0.5" value="${u.area||0}"></div>
              <div class="form-group"><label class="form-label">السعر (ر.س)</label><input id="f-uprice" class="form-input" type="number" step="1000" value="${u.price||0}" oninput="window.calcRemaining()"></div>
            </div>
            <div class="form-group">
              <label class="form-label"><i class="ri-compass-3-line" style="color:var(--accent)"></i> الواجهة</label>
              <select id="f-ufacing" class="form-select">${uFacingOpts(currFacing)}</select>
            </div>
            <div id="clientPickerSection" style="display:${currStatus===2||currStatus===3?'block':'none'}">
              <div class="client-picker-label"><i class="ri-user-line"></i><span id="cPickerText">${currStatus===3?'مباع لـ':'محجوز لـ'}</span> *</div>
              ${buildClientPicker(u.buyerId||null)}
            </div>
            <div id="bookingFinancials" style="display:${currStatus===2||currStatus===3?'block':'none'};margin-top:10px">
              <div class="form-row">
                <div class="form-group"><label class="form-label">المبلغ المدفوع</label><input id="f-bpaid" class="form-input" type="number" min="0" value="${bPaid}" oninput="window.calcRemaining()"></div>
                <div class="form-group"><label class="form-label">المبلغ المتبقي</label><input id="f-bremain" class="form-input" type="number" min="0" value="${bRemain}" readonly style="background:rgba(0,0,0,.2);opacity:.8;cursor:not-allowed"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-submit" id="submitBtn" onclick="window.submitEditUnit(${id},${u.floorId},${currStatus},${bookingIdFromApi||u.bookingId||'null'})"><i class="ri-save-line"></i>حفظ</button>
            <button class="btn-cancel" onclick="window.closeModal()">إلغاء</button>
          </div>`,true);
          _selectedBuyerId=u.buyerId||null;
          setTimeout(()=>{renderClientList('');window.calcRemaining();},50);
        }catch(e){console.error(e);toast('فشل تحميل بيانات الوحدة','error');}
      }

      async function submitEditUnit(id,floorId,oldStatus,existingBookingId){
        const unitNumber=v('f-unum'),utype=Number(v('f-utype')),status=Number(v('f-ustatus'));
        const rooms=Number(v('f-urooms'))||0,area=Number(v('f-uarea'))||0,price=Number(v('f-uprice'))||0;
        const facing=Number(v('f-ufacing'))||0;
        const bPaid=Number(v('f-bpaid'))||0,bRemain=Number(v('f-bremain'))||0;
        if(!unitNumber){toast('يرجى إدخال رقم الوحدة','error');return;}
        if((status===2||status===3)&&!_selectedBuyerId){toast('يرجى اختيار عميل','error');return;}
        setBusy('submitBtn',true);
        try{
          const isNowBooked=(status===2||status===3);
          const wasBooked=(oldStatus===2||oldStatus===3);
          const bookingStatusId=status===3?2:1;
          const newBuyerId=isNowBooked?_selectedBuyerId:null;
          await PUT(`/api/Units/${id}`,{unitNumber,type:utype,status,facing,area,rooms,price,floorId:Number(floorId),buyerId:newBuyerId});
          if(isNowBooked&&!wasBooked){
            await POST('/api/Bookings',{status:bookingStatusId,amountPaid:bPaid,remainingAmount:bRemain,buyerId:_selectedBuyerId,unitId:id});
          } else if(isNowBooked&&wasBooked&&existingBookingId&&existingBookingId!=='null'){
            await PUT(`/api/Bookings/${existingBookingId}`,{status:bookingStatusId,amountPaid:bPaid,remainingAmount:bRemain,buyerId:_selectedBuyerId,unitId:id});
          } else if(!isNowBooked&&wasBooked&&existingBookingId&&existingBookingId!=='null'){
            await DELETE(`/api/Bookings/${existingBookingId}`);
          }
          toast('تم التعديل بنجاح');closeModal();
          await showUnits(S.params.buildingId,S.params.buildingName,S.params.buildingCode);
        }catch(e){toast(`فشل: ${e.message}`,'error');}
        setBusy('submitBtn',false);
      }

      async function openUnitDetail(unitId){
        let u=(S.params.units||[]).find(x=>Number(x.id)===Number(unitId));
        if(!u){try{u=await GET(`/api/Units/${unitId}`);}catch{toast('فشل تحميل بيانات الوحدة','error');return;}}
        if(!u)return;
        const st=toStatus(u.status),tp=toType(u.type),facing=toFacing(u.facing);
        const bc=STATUS_BADGE[st]||'sb-closed',stAr=STATUS_AR[st]||'—',typeLabel=TYPE_AR[tp]||'شقة';
        const facingAr=FACING_AR[facing]||'—';
        const price=u.price&&Number(u.price)>0?Number(u.price).toLocaleString('ar-SA')+' ر.س':'—';
        const area=u.area&&Number(u.area)>0?u.area+' م²':'—';
        const{projectCode,buildingCode}=S.params;
        const unitRef=projectCode&&buildingCode?`${projectCode}-${buildingCode}-${u.unitNumber}`:String(u.unitNumber);
        const buyer=buyerById(u.buyerId),showClient=st===2||st===3;
        const clientHtml=showClient?`<div class="client-info-box ${st===3?'sold':'reserved'}">
          <div class="ci-avatar">${buyer?initials(buyer.firstName,buyer.lastName):'؟'}</div>
          <div>
            <div class="ci-label">${st===3?'مباع لـ':'محجوز لـ'}</div>
            <div class="ci-name">${buyer?esc(buyerName(buyer)):'غير محدد'}</div>
            ${buyer?.phoneNumber?`<div class="ci-sub">${esc(buyer.phoneNumber)}</div>`:''}
            ${buyer?.email?`<div class="ci-sub">${esc(buyer.email)}</div>`:''}
          </div></div>`:'';
        openModal(`وحدة ${esc(unitRef)}`,`<div class="modal-body">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <span class="status-badge ${bc}">${stAr}</span>
            <span style="font-size:.78rem;padding:4px 10px;border-radius:8px;background:rgba(255,255,255,.06);color:var(--text-muted)">${typeLabel}</span>
            <span style="font-size:.78rem;padding:4px 10px;border-radius:8px;background:rgba(78,141,245,.08);color:var(--accent);border:1px solid rgba(78,141,245,.2)"><i class="ri-compass-3-line"></i> ${facingAr}</span>
          </div>
          <div class="unit-detail-grid">
            <div class="ud-block"><div class="ud-label">رقم الوحدة</div><div class="ud-value">${esc(String(u.unitNumber))}</div></div>
            <div class="ud-block"><div class="ud-label">الغرف</div><div class="ud-value">${u.rooms&&Number(u.rooms)>0?u.rooms:'—'}</div></div>
            <div class="ud-block"><div class="ud-label">المساحة</div><div class="ud-value">${area}</div></div>
            <div class="ud-block"><div class="ud-label">السعر</div><div class="ud-value">${price}</div></div>
            <div class="ud-block"><div class="ud-label">الواجهة</div><div class="ud-value" style="font-size:.85rem">${facingAr}</div></div>
            <div class="ud-block"><div class="ud-label">الرمز الكامل</div><div class="ud-value" style="font-size:.82rem;color:var(--accent)">${esc(unitRef)}</div></div>
            <div class="ud-block"><div class="ud-label">تاريخ الإضافة</div><div class="ud-value">${fmtDate(u.createdAt)}</div></div>
          </div>${clientHtml}
        </div>
        <div class="modal-footer">
          <button class="btn-submit" onclick="window.closeModal();window.editUnit(${u.id})"><i class="ri-edit-line"></i>تعديل</button>
          <button class="btn-cancel" onclick="window.closeModal()">إغلاق</button>
        </div>`);
      }

      Object.assign(window, {
        showProjects, showBuildings, showUnits,
        openAddProject, submitAddProject, editProject, submitEditProject,
        openAddBuilding, submitAddBuilding, editBuilding,
        openAddFloor, submitAddFloor,
        openAddUnit, submitAddUnit, editUnit, submitEditUnit,
        openUnitDetail, handleSearch, setFilter, setFacingFilter, goPage,
      });

      await showProjects();
    }
  };
})();