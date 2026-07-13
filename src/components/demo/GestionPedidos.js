// GestionPedidos.js — Dashboard admin "Gestión de Pedidos" como WEB COMPONENT.
// Convertido desde la DC para que el bundler lo incruste via x-import (offline OK).
// Sincronizado con el reloj MAESTRO: localMs = window.__pyMap(masterTime,'admin').
(function(){
  const MARKUP = `<div style="display:flex; height:100%; width:100%; background:#f4f5f9; font-family:'Poppins',sans-serif; color:#1f2533;">

  <!-- ============ SIDEBAR ============ -->
  <aside style="width:288px; flex:none; background:linear-gradient(180deg,#0d1628 0%,#0a1020 100%); display:flex; flex-direction:column; padding:0 0 26px; position:relative;">
    <!-- logo -->
    <div style="padding:30px 26px 30px;">
      <img data-logo="1" src="assets/logo-pidemeya.png" alt="PidemeYa" style="height:38px; width:auto; display:block;">
    </div>

    <div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; color:#56607a; padding:6px 28px 12px;">MENÚ PRINCIPAL</div>
    <nav style="display:flex; flex-direction:column; gap:3px; padding:0 16px;">
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="layout-grid" width="19" height="19" class="lc"></i> DASHBOARD
      </div>
    </nav>

    <div style="font-size:10.5px; font-weight:600; letter-spacing:1.4px; color:#56607a; padding:20px 28px 12px;">GESTIÓN</div>
    <nav style="display:flex; flex-direction:column; gap:3px; padding:0 16px;">
      <!-- active -->
      <div style="position:relative; display:flex; align-items:center; gap:14px; padding:14px 14px 14px 16px; border-radius:12px; background:#172033; color:#fff; font-size:13.5px; font-weight:700; letter-spacing:.6px; box-shadow:0 6px 18px rgba(0,0,0,.25);">
        <span style="position:absolute; left:0; top:9px; bottom:9px; width:4px; border-radius:0 4px 4px 0; background:#f26522;"></span>
        <i data-lucide="shopping-cart" width="19" height="19" class="lc"></i> PEDIDOS
      </div>
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="package" width="19" height="19" class="lc"></i> PRODUCTOS
      </div>
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="contact" width="19" height="19" class="lc"></i> CLIENTES
      </div>
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="truck" width="19" height="19" class="lc"></i> REPARTIDORES
      </div>
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="user-cog" width="19" height="19" class="lc"></i> USUARIOS
      </div>
      <div style="display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:12px; color:#8a93a8; font-size:13.5px; font-weight:600; letter-spacing:.6px;">
        <i data-lucide="pie-chart" width="19" height="19" class="lc"></i> REPORTES
      </div>
    </nav>

    <div style="margin-top:auto; padding:0 16px;">
      <div style="display:flex; align-items:center; gap:14px; padding:13px 14px; border-radius:12px; color:#fb4d6b; font-size:13.5px; font-weight:700; letter-spacing:.6px;">
        <i data-lucide="power" width="19" height="19" class="lc"></i> CERRAR SESIÓN
      </div>
    </div>
  </aside>

  <!-- ============ MAIN ============ -->
  <div style="flex:1; min-width:0; display:flex; flex-direction:column;">

    <!-- top bar -->
    <header style="display:flex; align-items:center; gap:20px; padding:24px 34px;">
      <button style="width:50px; height:50px; flex:none; border:none; background:#fff; border-radius:14px; display:flex; align-items:center; justify-content:center; color:#3a4254; box-shadow:0 4px 14px rgba(20,30,60,.06); cursor:pointer;">
        <i data-lucide="panel-left-close" width="20" height="20" class="lc"></i>
      </button>
      <div style="flex:1; max-width:560px; display:flex; align-items:center; gap:13px; background:#fff; border-radius:14px; padding:0 22px; height:50px; box-shadow:0 4px 14px rgba(20,30,60,.06); color:#9aa3b4;">
        <i data-lucide="search" width="19" height="19" class="lc"></i>
        <span style="font-size:13px; font-weight:600; letter-spacing:.8px;">BUSCAR PEDIDOS, CLIENTES...</span>
      </div>
      <div style="flex:1;"></div>
      <button data-r="bellBtn" style="position:relative; width:50px; height:50px; flex:none; border:none; background:#fff; border-radius:14px; display:flex; align-items:center; justify-content:center; color:#3a4254; box-shadow:0 4px 14px rgba(20,30,60,.06); cursor:pointer; transform-origin:50% 6px;">
        <i data-lucide="bell" width="20" height="20" class="lc"></i>
        <span data-r="bellDot" style="position:absolute; top:9px; right:11px; width:9px; height:9px; border-radius:50%; background:#f8312f; border:2px solid #fff; opacity:0;"></span>
      </button>
      <div style="display:flex; align-items:center; gap:12px; background:#fff; border-radius:14px; padding:7px 14px 7px 8px; box-shadow:0 4px 14px rgba(20,30,60,.06);">
        <div style="position:relative; width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,#f5601a,#ef4e0a); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:14px;">
          CR
          <span style="position:absolute; bottom:-2px; right:-2px; width:11px; height:11px; border-radius:50%; background:#22c55e; border:2px solid #fff;"></span>
        </div>
        <div style="line-height:1.25;">
          <div style="font-size:12.5px; font-weight:700; letter-spacing:.4px; color:#252b39;">CARLOS RAMÍREZ</div>
          <div style="font-size:10px; font-weight:600; letter-spacing:1px; color:#9aa3b4;">ADMIN</div>
        </div>
        <i data-lucide="chevron-down" width="17" height="17" class="lc" style="color:#9aa3b4;"></i>
      </div>
    </header>

    <!-- content -->
    <main style="flex:1; padding:8px 34px 40px;">

      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:20px;">
        <div>
          <h1 style="margin:0; font-size:34px; font-weight:800; letter-spacing:-.8px; color:#f26522;">Gestión de Pedidos</h1>
          <p style="margin:7px 0 0; font-size:12.5px; font-weight:600; letter-spacing:.9px; color:#8a93a6;">ADMINISTRA Y MONITOREA TUS PEDIDOS EN TIEMPO REAL.</p>
        </div>
        <button style="display:flex; align-items:center; gap:11px; border:none; background:linear-gradient(135deg,#f5601a,#ef4e0a); color:#fff; font-family:'Poppins'; font-size:14px; font-weight:700; letter-spacing:.7px; padding:0 26px; height:58px; border-radius:16px; cursor:pointer; box-shadow:0 12px 26px rgba(242,101,34,.32);">
          <span style="width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,.22); display:flex; align-items:center; justify-content:center;"><i data-lucide="plus" width="17" height="17" class="lc"></i></span>
          NUEVO PEDIDO
        </button>
      </div>

      <!-- metrics -->
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:26px;">
        <!-- volumen -->
        <div data-r="volCard" style="position:relative; overflow:hidden; background:#fff; border-radius:20px; padding:26px 28px; display:flex; align-items:center; gap:20px; box-shadow:0 6px 22px rgba(20,30,60,.05); transition:box-shadow .1s linear;">
          <div style="position:absolute; right:-30px; top:-30px; width:140px; height:140px; border-radius:50%; background:rgba(91,140,240,.06);"></div>
          <div style="width:56px; height:56px; flex:none; border-radius:16px; background:linear-gradient(135deg,#5b8cf0,#4661e8); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 18px rgba(70,97,232,.32);">
            <i data-lucide="shopping-cart" width="25" height="25" class="lc"></i>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; letter-spacing:1.3px; color:#9aa3b4;">VOLUMEN</div>
            <div style="display:flex; align-items:baseline; gap:8px; margin-top:3px;">
              <span data-r="volNum" style="font-size:34px; font-weight:800; color:#252b39; line-height:1;">1</span>
              <span style="font-size:11px; font-weight:700; letter-spacing:.6px; color:#9aa3b4;">VENTAS</span>
            </div>
          </div>
        </div>
        <!-- en espera -->
        <div data-r="esperaCard" style="position:relative; overflow:hidden; background:#fff; border-radius:20px; padding:26px 28px; display:flex; align-items:center; gap:20px; box-shadow:0 6px 22px rgba(20,30,60,.05); transition:box-shadow .1s linear;">
          <div style="position:absolute; right:-30px; top:-30px; width:140px; height:140px; border-radius:50%; background:rgba(242,101,34,.06);"></div>
          <div style="width:56px; height:56px; flex:none; border-radius:16px; background:linear-gradient(135deg,#fb9a3c,#f26522); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 18px rgba(242,101,34,.32);">
            <i data-lucide="clock" width="25" height="25" class="lc"></i>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; letter-spacing:1.3px; color:#9aa3b4;">EN ESPERA</div>
            <div style="display:flex; align-items:baseline; gap:8px; margin-top:3px;">
              <span data-r="esperaNum" style="font-size:34px; font-weight:800; color:#252b39; line-height:1;">0</span>
              <span style="font-size:11px; font-weight:700; letter-spacing:.6px; color:#f26522;">PEND.</span>
            </div>
          </div>
        </div>
        <!-- caja -->
        <div data-r="cajaCard" style="position:relative; overflow:hidden; background:#fff; border-radius:20px; padding:26px 28px; display:flex; align-items:center; gap:20px; box-shadow:0 6px 22px rgba(20,30,60,.05); transition:box-shadow .1s linear;">
          <div style="position:absolute; right:-30px; top:-30px; width:140px; height:140px; border-radius:50%; background:rgba(31,201,154,.07);"></div>
          <div style="width:56px; height:56px; flex:none; border-radius:16px; background:linear-gradient(135deg,#1fc99a,#12a87f); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 18px rgba(18,168,127,.32);">
            <i data-lucide="dollar-sign" width="25" height="25" class="lc"></i>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; letter-spacing:1.3px; color:#9aa3b4;">CAJA (ENTREGADOS)</div>
            <div style="display:flex; align-items:baseline; gap:5px; margin-top:3px;">
              <span style="font-size:15px; font-weight:700; color:#9aa3b4;">S/</span>
              <span data-r="cajaNum" style="font-size:34px; font-weight:800; color:#252b39; line-height:1;">17.00</span>
            </div>
          </div>
        </div>
      </div>

      <!-- filters -->
      <div style="background:#fff; border-radius:20px; padding:24px 26px; margin-top:24px; box-shadow:0 6px 22px rgba(20,30,60,.05); display:grid; grid-template-columns:1fr 1fr 300px; gap:22px; align-items:end;">
        <div>
          <div style="font-size:11px; font-weight:700; letter-spacing:1.1px; color:#9aa3b4; margin-bottom:9px;">FECHA DESDE</div>
          <div style="display:flex; align-items:center; justify-content:space-between; background:#f6f7fa; border:1.5px solid #edeef3; border-radius:13px; padding:0 16px; height:52px; color:#aab2c0; font-size:14px; font-weight:600; letter-spacing:.5px;">
            DD/MM/AAAA <i data-lucide="calendar" width="18" height="18" class="lc"></i>
          </div>
        </div>
        <div>
          <div style="font-size:11px; font-weight:700; letter-spacing:1.1px; color:#9aa3b4; margin-bottom:9px;">FECHA HASTA</div>
          <div style="display:flex; align-items:center; justify-content:space-between; background:#f6f7fa; border:1.5px solid #edeef3; border-radius:13px; padding:0 16px; height:52px; color:#aab2c0; font-size:14px; font-weight:600; letter-spacing:.5px;">
            DD/MM/AAAA <i data-lucide="calendar" width="18" height="18" class="lc"></i>
          </div>
        </div>
        <button style="display:flex; align-items:center; justify-content:center; gap:11px; border:none; background:linear-gradient(135deg,#f5601a,#ef4e0a); color:#fff; font-family:'Poppins'; font-size:14px; font-weight:700; letter-spacing:1px; height:52px; border-radius:13px; cursor:pointer; box-shadow:0 10px 22px rgba(242,101,34,.28);">
          <i data-lucide="search" width="18" height="18" class="lc"></i> FILTRAR
        </button>
      </div>

      <!-- table -->
      <div style="background:#fff; border-radius:20px; margin-top:24px; box-shadow:0 6px 22px rgba(20,30,60,.05); overflow:hidden;">
        <!-- header -->
        <div style="display:grid; grid-template-columns:160px minmax(190px,1fr) 165px 105px 160px 112px 96px; align-items:center; padding:20px 28px 16px; font-size:11px; font-weight:700; letter-spacing:1.1px; color:#9aa3b4;">
          <div>ID PEDIDO</div>
          <div>CLIENTE / DATOS</div>
          <div style="text-align:center;">REPARTIDOR</div>
          <div style="text-align:center;">DETALLE</div>
          <div style="text-align:center;">ESTADO</div>
          <div style="text-align:right;">TOTAL</div>
          <div style="text-align:right;">GESTIÓN</div>
        </div>

        <!-- NEW ROW (animated) -->
        <div data-r="newRow" style="height:0; overflow:hidden; opacity:0;">
          <div data-r="newRowInner" style="display:grid; grid-template-columns:160px minmax(190px,1fr) 165px 105px 160px 112px 96px; align-items:center; padding:16px 28px; height:92px; box-sizing:border-box; border-top:1px solid #f0f2f5;">
            <!-- id -->
            <div style="display:flex; flex-direction:column; gap:7px; align-items:flex-start;">
              <span style="display:inline-flex; align-items:center; gap:6px; background:#fdeee7; color:#e0561d; font-size:11px; font-weight:700; padding:5px 9px; border-radius:8px;"><i data-lucide="calendar" width="13" height="13" class="lc"></i> 17/06/2026 22:31</span>
              <span style="background:#f1f3f6; color:#8b94a3; font-size:10.5px; font-weight:700; letter-spacing:.4px; padding:4px 9px; border-radius:7px;">PED-NUEVO01</span>
            </div>
            <!-- cliente -->
            <div style="display:flex; align-items:center; gap:13px;">
              <div style="width:42px; height:42px; flex:none; border-radius:50%; background:linear-gradient(135deg,#f5601a,#ef4e0a); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:16px;">P</div>
              <div style="line-height:1.35;">
                <div style="display:flex; align-items:center; gap:5px;">
                  <span data-r="gpsIcon" style="display:inline-flex; color:#3b5bdb; opacity:0; transform-origin:center;"><i data-lucide="map-pin" width="14" height="14" class="lc"></i></span>
                  <span style="font-size:14.5px; font-weight:700; color:#252b39;">Pedro Castillo</span>
                </div>
                <div style="font-size:11.5px; font-weight:600; color:#9aa3b4;">DNI: 16703992</div>
                <span style="display:inline-flex; align-items:center; gap:4px; margin-top:4px; background:#fdeee7; color:#e0561d; font-size:10.5px; font-weight:700; padding:3px 8px; border-radius:7px;"><i data-lucide="map-pin" width="12" height="12" class="lc"></i> AV. TUPAC</span>
              </div>
            </div>
            <!-- repartidor -->
            <div style="position:relative; min-height:46px; display:flex; align-items:center; justify-content:center;">
              <div data-r="sinAsignar" style="display:flex; align-items:center; gap:8px; color:#9aa3b4; font-size:13.5px; font-weight:600;">
                <span style="width:9px; height:9px; border-radius:50%; background:#c3cad6;"></span> Sin asignar
              </div>
              <div data-r="risterEmilio" style="position:absolute; inset:0; opacity:0; display:flex; flex-direction:column; align-items:center; justify-content:center; line-height:1.35;">
                <div style="display:flex; align-items:center; gap:8px; color:#252b39; font-size:13.5px; font-weight:700;"><span style="width:9px; height:9px; border-radius:50%; background:#22c55e;"></span> rister emilio</div>
                <div style="font-size:10.5px; font-weight:700; letter-spacing:.4px; color:#f26522;">REASIGNAR</div>
              </div>
            </div>
            <!-- detalle -->
            <div style="display:flex; justify-content:center;">
              <div style="display:flex; align-items:center; gap:8px; background:#fff; border:1.5px solid #eef0f4; border-radius:11px; padding:9px 14px; box-shadow:0 3px 10px rgba(20,30,60,.05);">
                <i data-lucide="target" width="17" height="17" class="lc" style="color:#f26522;"></i>
                <span style="font-size:12.5px; font-weight:700; color:#3a4254;">1 PROD.</span>
              </div>
            </div>
            <!-- estado -->
            <div style="position:relative; min-height:42px; display:flex; align-items:center; justify-content:center;">
              <div data-r="pendientePill" style="display:inline-flex; align-items:center; gap:7px; background:#fdeee7; color:#e0561d; border:1.5px solid #f7d3c2; font-size:12px; font-weight:700; letter-spacing:.4px; padding:8px 14px; border-radius:11px;">
                PENDIENTE <i data-lucide="chevron-down" width="15" height="15" class="lc"></i>
              </div>
              <div data-r="caminoPill" style="position:absolute; inset:0; opacity:0; display:flex; align-items:center; justify-content:center;">
                <span style="display:inline-flex; align-items:center; gap:7px; background:#e9eefe; color:#3b5bdb; border:1.5px solid #c8d4fb; font-size:12px; font-weight:700; letter-spacing:.4px; padding:8px 14px; border-radius:11px;">EN CAMINO <i data-lucide="chevron-down" width="15" height="15" class="lc"></i></span>
              </div>
              <div data-r="entregadoPill" style="position:absolute; inset:0; opacity:0; display:flex; align-items:center; justify-content:center;">
                <span style="display:inline-flex; align-items:center; gap:7px; background:#e7f7ee; color:#1c9d5b; border:1.5px solid #bfe8cf; font-size:12px; font-weight:700; letter-spacing:.4px; padding:8px 14px; border-radius:11px;">ENTREGADO <i data-lucide="chevron-down" width="15" height="15" class="lc"></i></span>
              </div>
            </div>
            <!-- total -->
            <div style="display:flex; align-items:baseline; justify-content:flex-end; gap:4px;">
              <span style="font-size:12px; font-weight:700; color:#9aa3b4;">S/</span>
              <span style="font-size:18px; font-weight:800; color:#252b39;">17.00</span>
            </div>
            <!-- gestion -->
            <div style="display:flex; align-items:center; justify-content:flex-end; gap:9px;">
              <button style="width:38px; height:38px; border:1.5px solid #eef0f4; background:#fff; border-radius:11px; display:flex; align-items:center; justify-content:center; color:#8b94a3; cursor:pointer;"><i data-lucide="printer" width="17" height="17" class="lc"></i></button>
              <button style="width:38px; height:38px; border:1.5px solid #eef0f4; background:#fff; border-radius:11px; display:flex; align-items:center; justify-content:center; color:#8b94a3; cursor:pointer;"><i data-lucide="trash-2" width="17" height="17" class="lc"></i></button>
            </div>
          </div>
        </div>

        <!-- EXISTING ROW -->
        <div style="display:grid; grid-template-columns:160px minmax(190px,1fr) 165px 105px 160px 112px 96px; align-items:center; padding:16px 28px; height:92px; box-sizing:border-box; border-top:1px solid #f0f2f5;">
          <div style="display:flex; flex-direction:column; gap:7px; align-items:flex-start;">
            <span style="display:inline-flex; align-items:center; gap:6px; background:#fdeee7; color:#e0561d; font-size:11px; font-weight:700; padding:5px 9px; border-radius:8px;"><i data-lucide="calendar" width="13" height="13" class="lc"></i> 14/06/2026 22:29</span>
            <span style="background:#f1f3f6; color:#8b94a3; font-size:10.5px; font-weight:700; letter-spacing:.4px; padding:4px 9px; border-radius:7px;">PED-ENZ4NK2Q</span>
          </div>
          <div style="display:flex; align-items:center; gap:13px;">
            <div style="width:42px; height:42px; flex:none; border-radius:50%; background:linear-gradient(135deg,#f5601a,#ef4e0a); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:16px;">L</div>
            <div style="line-height:1.35;">
              <div style="font-size:14.5px; font-weight:700; color:#252b39;">Lucía Fernández</div>
              <div style="font-size:11.5px; font-weight:600; color:#9aa3b4;">DNI: 16703992</div>
              <span style="display:inline-flex; align-items:center; gap:4px; margin-top:4px; background:#fdeee7; color:#e0561d; font-size:10.5px; font-weight:700; padding:3px 8px; border-radius:7px;"><i data-lucide="map-pin" width="12" height="12" class="lc"></i> AV. TUPAC</span>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; line-height:1.35;">
            <div style="display:flex; align-items:center; gap:8px; color:#252b39; font-size:13.5px; font-weight:700;"><span style="width:9px; height:9px; border-radius:50%; background:#22c55e;"></span> Diego Salas</div>
            <div style="font-size:10.5px; font-weight:700; letter-spacing:.4px; color:#f26522;">REASIGNAR</div>
          </div>
          <div style="display:flex; justify-content:center;">
            <div style="display:flex; align-items:center; gap:8px; background:#fff; border:1.5px solid #eef0f4; border-radius:11px; padding:9px 14px; box-shadow:0 3px 10px rgba(20,30,60,.05);">
              <i data-lucide="target" width="17" height="17" class="lc" style="color:#f26522;"></i>
              <span style="font-size:12.5px; font-weight:700; color:#3a4254;">1 PROD.</span>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:center;">
            <span style="display:inline-flex; align-items:center; gap:7px; background:#e7f7ee; color:#1c9d5b; border:1.5px solid #bfe8cf; font-size:12px; font-weight:700; letter-spacing:.4px; padding:8px 14px; border-radius:11px;">ENTREGADO <i data-lucide="chevron-down" width="15" height="15" class="lc"></i></span>
          </div>
          <div style="display:flex; align-items:baseline; justify-content:flex-end; gap:4px;">
            <span style="font-size:12px; font-weight:700; color:#9aa3b4;">S/</span>
            <span style="font-size:18px; font-weight:800; color:#252b39;">17.00</span>
          </div>
          <div style="display:flex; align-items:center; justify-content:flex-end; gap:9px;">
            <button style="width:38px; height:38px; border:1.5px solid #eef0f4; background:#fff; border-radius:11px; display:flex; align-items:center; justify-content:center; color:#8b94a3; cursor:pointer;"><i data-lucide="printer" width="17" height="17" class="lc"></i></button>
            <button style="width:38px; height:38px; border:1.5px solid #eef0f4; background:#fff; border-radius:11px; display:flex; align-items:center; justify-content:center; color:#8b94a3; cursor:pointer;"><i data-lucide="trash-2" width="17" height="17" class="lc"></i></button>
          </div>
        </div>
      </div>

    </main>
  </div>
</div>`;
  function ensureHead(){
    if(!document.getElementById('gp-poppins')){
      const l=document.createElement('link'); l.id='gp-poppins'; l.rel='stylesheet';
      l.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(l);
    }
    if(!document.getElementById('gp-lucide-style')){
      const st=document.createElement('style'); st.id='gp-lucide-style'; st.textContent='.lc{stroke-width:2.2;}';
      document.head.appendChild(st);
    }
    if(!window.lucide && !document.getElementById('gp-lucide')){
      const s=document.createElement('script'); s.id='gp-lucide'; s.src='https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
      document.head.appendChild(s);
    }
  }
  class GestionPedidos extends HTMLElement {
    connectedCallback(){
      ensureHead();
      this.style.display='block'; this.style.width='100%'; this.style.height='100%';
      this.innerHTML = MARKUP;
      // logo via recurso incrustado por el bundler (fallback al src relativo online)
      try{ const lg=this.querySelector('[data-logo]'); if(lg && window.__resources && window.__resources.adminLogo) lg.src=window.__resources.adminLogo; }catch(e){}
      const tryIcons=()=>{ if(window.lucide&&window.lucide.createIcons) window.lucide.createIcons(); else this._it=setTimeout(tryIcons,80); };
      tryIcons();
      this._t0=performance.now();
      const loop=(now)=>{
        const m=window.__pyMaster; let localMs;
        if(m&&typeof m.time==='number'&&window.__pyMap){ const mp=window.__pyMap(m.time,'admin'); localMs=(mp==null)?((now-this._t0)%13000):mp; }
        else localMs=(now-this._t0)%13000;
        this.frame(localMs);
        this._raf=requestAnimationFrame(loop);
      };
      this._raf=requestAnimationFrame(loop);
    }
    disconnectedCallback(){ if(this._raf)cancelAnimationFrame(this._raf); if(this._it)clearTimeout(this._it); }
    q(name){ return this.querySelector('[data-r="'+name+'"]'); }
    frame(t){
      const clamp=x=>Math.max(0,Math.min(1,x));
      const easeOut=x=>1-Math.pow(1-x,3);
      const easeIO=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
      const set=(el,prop,val)=>{ if(el) el.style[prop]=val; };
      if(window.lucide && this.querySelector('i[data-lucide]')) window.lucide.createIcons();
      const ROWH=92;
      let h,op,ty;
      if(t<2000){h=0;op=0;ty=-14;}
      else if(t<2750){const e=easeOut(clamp((t-2000)/750));h=ROWH*e;op=e;ty=-14*(1-e);}
      else if(t<10500){h=ROWH;op=1;ty=0;}
      else if(t<12200){const e=easeIO(clamp((t-10500)/1700));h=ROWH*(1-e);op=1-e;ty=-10*e;}
      else{h=0;op=0;ty=-14;}
      set(this.q('newRow'),'height',h+'px');
      set(this.q('newRow'),'opacity',String(op));
      let g;
      if(t<2000)g=0; else if(t<2600)g=clamp((t-2000)/600); else if(t<3900)g=1-clamp((t-2600)/1300); else g=0;
      const nri=this.q('newRowInner');
      if(nri){ nri.style.transform=`translateY(${ty}px)`; nri.style.background=g>0.001?`rgba(242,101,34,${0.10*g})`:'transparent'; nri.style.boxShadow=g>0.001?`inset 4px 0 0 rgba(242,101,34,${g}), 0 10px 28px rgba(242,101,34,${0.18*g})`:'none'; }
      let esp; if(t<2300)esp=0; else if(t<3100)esp=easeOut(clamp((t-2300)/800)); else if(t<8200)esp=1; else if(t<9100)esp=1-easeOut(clamp((t-8200)/900)); else esp=0;
      let vol; if(t<8200)vol=1; else if(t<9100)vol=1+easeOut(clamp((t-8200)/900)); else if(t<10500)vol=2; else if(t<11700)vol=2-easeIO(clamp((t-10500)/1200)); else vol=1;
      let caja; if(t<8200)caja=17; else if(t<9100)caja=17+17*easeOut(clamp((t-8200)/900)); else if(t<10500)caja=34; else if(t<11700)caja=34-17*easeIO(clamp((t-10500)/1200)); else caja=17;
      const en=this.q('esperaNum'); if(en)en.textContent=String(Math.round(esp));
      const vn=this.q('volNum'); if(vn)vn.textContent=String(Math.round(vol));
      const cn=this.q('cajaNum'); if(cn)cn.textContent=caja.toFixed(2);
      const hl=(a,b)=>(t>=a&&t<=b)?Math.sin(Math.PI*clamp((t-a)/(b-a))):0;
      const shadow=p=>p>0.001?`0 6px 22px rgba(20,30,60,.05), 0 12px 30px rgba(242,101,34,${0.18*p}), 0 0 0 ${2*p}px rgba(242,101,34,${0.5*p})`:'0 6px 22px rgba(20,30,60,.05)';
      const ehp=hl(2300,3500); set(this.q('esperaCard'),'boxShadow',shadow(ehp)); set(this.q('esperaCard'),'transform',`scale(${1+0.012*ehp})`);
      const dhp=hl(8200,9400); set(this.q('volCard'),'boxShadow',shadow(dhp)); set(this.q('volCard'),'transform',`scale(${1+0.012*dhp})`); set(this.q('cajaCard'),'boxShadow',shadow(dhp)); set(this.q('cajaCard'),'transform',`scale(${1+0.012*dhp})`);
      const bp=(t>=2000&&t<2950)?Math.sin(Math.PI*clamp((t-2000)/950)):0;
      set(this.q('bellBtn'),'transform',`scale(${1+0.16*bp}) rotate(${Math.sin((t-2000)/45)*11*bp}deg)`);
      let dot; if(t<2000)dot=0; else if(t<2320)dot=easeOut(clamp((t-2000)/320)); else if(t<10500)dot=1; else if(t<11400)dot=1-clamp((t-10500)/900); else dot=0;
      set(this.q('bellDot'),'opacity',String(dot)); set(this.q('bellDot'),'transform',`scale(${0.5+0.5*dot})`);
      let pend,cam,ent;
      if(t<4500){pend=1;cam=0;ent=0;} else if(t<5100){const e=easeIO(clamp((t-4500)/600));pend=1-e;cam=e;ent=0;} else if(t<8000){pend=0;cam=1;ent=0;} else if(t<8600){const e=easeIO(clamp((t-8000)/600));pend=0;cam=1-e;ent=e;} else {pend=0;cam=0;ent=1;}
      set(this.q('pendientePill'),'opacity',String(pend)); set(this.q('caminoPill'),'opacity',String(cam)); set(this.q('entregadoPill'),'opacity',String(ent));
      let rc; if(t<4400)rc=0; else if(t<5000)rc=easeIO(clamp((t-4400)/600)); else rc=1;
      set(this.q('sinAsignar'),'opacity',String(1-rc)); set(this.q('risterEmilio'),'opacity',String(rc)); set(this.q('gpsIcon'),'opacity',String(rc)); set(this.q('gpsIcon'),'transform',`scale(${0.6+0.4*rc})`);
    }
  }
  if(!customElements.get('gestion-pedidos')) customElements.define('gestion-pedidos', GestionPedidos);
})();
