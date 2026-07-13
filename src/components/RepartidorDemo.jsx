// RepartidorDemo.jsx — Commercial demo animation for the "PidemeYa" delivery app (driver POV).
import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';

/* ───────────────────────── engine ───────────────────────── */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const Easing = {
  linear: t => t,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inCubic: t => t * t * t,
  inOutCubic: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuad: t => t * (2 - t),
  inOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  outBack: t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  outElastic: t => { const c4 = (2 * Math.PI) / 3; return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1; },
};

function tw(T, s, e, from, to, ease = Easing.inOutCubic) {
  if (T <= s) return from;
  if (T >= e) return to;
  return from + (to - from) * ease((T - s) / (e - s));
}

// Local playhead (seconds). Follows the global player clock (window.__pyMaster)
// mapped to this view's beats via window.__pyMap(masterTime, 'pidemeya-demo').
// With no master present it free-runs on its own loop so it still works standalone.
const RD_KEY = 'pidemeya-demo', RD_DUR = 38;
const useT = () => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      const m = typeof window !== 'undefined' ? window.__pyMaster : null;
      let lt;
      if (m && typeof m.time === 'number') {
        const mapped = window.__pyMap ? window.__pyMap(m.time, RD_KEY) : null;
        lt = (mapped == null) ? (m.progress || 0) * RD_DUR : mapped;
      } else {
        lt = (performance.now() / 1000) % RD_DUR;
      }
      setT(lt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
};

/* ───────────────────────── tokens ───────────────────────── */
const ORANGE = '#F26522', NAVY = '#15233B', GREEN = '#16A34A', BLUE = '#2563EB';
const BG = '#EEF1F6', GRAY = '#8C99AB', LINE = '#E6EAF0';
const HEAD = 'Poppins, system-ui, sans-serif';
const BODY = 'Inter, system-ui, sans-serif';
const G_BLUE = 'linear-gradient(145deg,#5C74F2,#3F4FD8)';
const G_GREEN = 'linear-gradient(145deg,#22BE7A,#129157)';
const G_ORANGE = 'linear-gradient(145deg,#FF9347,#F26522)';

/* screen geometry inside the 1080x1920 stage */
const SCR = { x: 236, y: 311, w: 608, h: 1298 };

/* ───────────────────────── small chrome ───────────────────────── */
function StatusBar({ time = '12:06', bg = ORANGE, color = '#fff' }) {
  return (
    <div style={{ height: 48, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', flexShrink: 0, fontFamily: BODY }}>
      <span style={{ fontSize: 22, fontWeight: 700, fontStyle: 'italic', letterSpacing: '.5px' }}>{time}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="22" height="16" viewBox="0 0 22 16"><path d="M11 14.5a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z" fill={color} /><path d="M4 8.2a10 10 0 0114 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M7 11a6 6 0 018 0" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
        <svg width="20" height="16" viewBox="0 0 20 16">{[0, 1, 2, 3].map(i => <rect key={i} x={i * 5} y={11 - i * 3} width="3.4" height={3 + i * 3} rx="1" fill={color} />)}</svg>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 30, height: 17, border: `2px solid ${color}`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color }}>65</span>
          <span style={{ width: 2.5, height: 7, background: color, borderRadius: 2 }} />
        </span>
      </span>
    </div>
  );
}

function TopBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: '#fff', boxShadow: '0 8px 22px rgba(20,40,80,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C6B80' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 22, padding: '7px 14px 7px 7px', boxShadow: '0 8px 22px rgba(20,40,80,.08)' }}>
        <div style={{ position: 'relative', width: 56, height: 56, borderRadius: 16, background: G_ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, fontFamily: HEAD }}>
          RE<span style={{ position: 'absolute', right: -3, bottom: -3, width: 16, height: 16, borderRadius: 8, background: GREEN, border: '3px solid #fff' }} />
        </div>
        <span style={{ color: GRAY, fontSize: 18 }}>▾</span>
      </div>
    </div>
  );
}

function IconSquare({ grad, children }) {
  return <div style={{ width: 86, height: 86, borderRadius: 26, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 14px 26px rgba(40,70,120,.22)' }}>{children}</div>;
}
const cardStyle = { background: '#fff', borderRadius: 30, boxShadow: '0 18px 40px rgba(20,40,80,.07)' };

function BottomNav({ active }) {
  const Item = ({ id, label, icon }) => {
    const on = active === id;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: on ? '16px 44px' : '16px 30px', borderRadius: 40, background: on ? ORANGE : 'transparent', color: on ? '#fff' : '#9AA7BC', flex: on ? '0 0 auto' : '0 0 auto' }}>
        {icon(on ? '#fff' : '#9AA7BC')}
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '.06em', fontFamily: HEAD }}>{label}</span>
      </div>
    );
  };
  const grid = c => <svg width="26" height="26" viewBox="0 0 24 24" fill={c}><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>;
  const bag = c => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M5 8h14l-1 12H6L5 8z" strokeLinejoin="round" /><path d="M9 8a3 3 0 016 0" /></svg>;
  return (
    <div style={{ position: 'absolute', left: 26, right: 26, bottom: 26, height: 110, background: '#15233B', borderRadius: 50, boxShadow: '0 20px 44px rgba(10,20,40,.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 14px' }}>
      <Item id="dash" label="DASHBOARD" icon={grid} />
      <Item id="ped" label="PEDIDOS" icon={bag} />
    </div>
  );
}

/* ───────────────────────── layer crossfade helpers ───────────────────────── */
function Layer({ inAt, outAt, inDur = 0.5, outDur = 0.5, slide = 46, z = 1, children }) {
  const T = useT();
  if (T < inAt - 0.001 || T > outAt + 0.4) return null;
  let o = 1, dx = 0;
  if (T < inAt + inDur) { const k = Easing.outCubic(clamp((T - inAt) / inDur, 0, 1)); o = k; dx = (1 - k) * slide; }
  else if (T > outAt - outDur) { const k = Easing.inCubic(clamp((T - (outAt - outDur)) / outDur, 0, 1)); o = 1 - k; dx = -k * slide; }
  return <div style={{ position: 'absolute', inset: 0, opacity: o, transform: `translateX(${dx}px)`, zIndex: z, willChange: 'opacity,transform' }}>{children}</div>;
}

/* ═══════════════════════ SCENE 1 — HOME ═══════════════════════ */
function HomeScreen() {
  const T = useT();
  const generic = [
    { bg: '#34507A', g: '✆' }, { bg: '#2F6E5C', g: '✉' }, { bg: '#6E5430', g: '◷' }, { bg: '#4A3F75', g: '♪' },
    { bg: '#5A3550', g: '★' }, { bg: '#355A6E', g: '☷' }, { bg: '#6E4A35', g: '⚙' }, { bg: '#3F6E45', g: '✓' },
  ];
  const dock = [{ bg: '#34507A', g: '✆' }, { bg: '#2F6E5C', g: '✉' }, { bg: '#6E5430', g: '◷' }, { bg: '#5A3550', g: '⌾' }];
  const tap = T >= 2.0 && T <= 2.55;
  const pulse = ((T) % 2) / 2;
  return (
    <Layer inAt={0} outAt={12} slide={0} inDur={0.6} z={1}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(165deg,#16284a 0%,#1c3358 50%,#24406a 100%)', fontFamily: BODY, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -150, right: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,101,34,.4),transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -180, left: -130, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle,rgba(40,90,160,.4),transparent 70%)' }} />
        <StatusBar bg="transparent" />
        <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 27, fontWeight: 600, opacity: .85 }}>Miércoles 17 de Junio</div>
        </div>
        {/* generic app grid */}
        <div style={{ position: 'absolute', top: 178, left: 50, right: 50, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', rowGap: 42, columnGap: 22, justifyItems: 'center' }}>
          {generic.map((a, i) => (
            <div key={i} style={{ width: 112, height: 112, borderRadius: 28, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, color: 'rgba(255,255,255,.82)', boxShadow: '0 8px 20px rgba(0,0,0,.28)' }}>{a.g}</div>
          ))}
        </div>
        {/* featured PidemeYa app */}
        <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ position: 'relative', width: 150, height: 150, borderRadius: 38, background: G_ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 48px rgba(242,101,34,.55)', transform: `scale(${tap ? tw(T, 2.0, 2.18, 1, 0.9, Easing.outQuad) : tw(T, 0.2, 1.0, 0.7, 1, Easing.outBack)})` }}>
            <PinGlyph size={84} color="#fff" />
            <div style={{ position: 'absolute', inset: -8, borderRadius: 46, border: '3px solid rgba(255,255,255,.5)', opacity: clamp(.6 - .6 * pulse, 0, .6), transform: `scale(${1 + pulse * 0.22})` }} />
          </div>
          <span style={{ color: '#fff', fontSize: 27, fontWeight: 700, fontFamily: HEAD }}>PidemeYa</span>
        </div>
        {/* page dots */}
        <div style={{ position: 'absolute', bottom: 250, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === 0 ? '#fff' : 'rgba(255,255,255,.35)' }} />)}
        </div>
        {/* dock */}
        <div style={{ position: 'absolute', bottom: 56, left: 36, right: 36, height: 160, borderRadius: 44, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 28px' }}>
          {dock.map((a, i) => (
            <div key={i} style={{ width: 110, height: 110, borderRadius: 27, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, color: 'rgba(255,255,255,.85)' }}>{a.g}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 200, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.5)' }} />
        </div>
      </div>
    </Layer>
  );
}

function PinGlyph({ size = 40, color = '#fff' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill={color} /><circle cx="12" cy="9" r="2.7" fill="rgba(242,101,34,.95)" /></svg>;
}

/* ═══════════════════════ SCENE 2 & 3 — PUSH NOTIFICATIONS ═══════════════════════ */
function PushCard({ T, inAt, outAt, children, slideOut }) {
  if (T < inAt - 0.01 || T > outAt + 0.01) return null;
  let y = 0, o = 1;
  const inD = 0.5;
  if (T < inAt + inD) { const k = Easing.outBack(clamp((T - inAt) / inD, 0, 1)); y = (1 - k) * -380; o = clamp((T - inAt) / 0.3, 0, 1); }
  else if (T > outAt - 0.45) { const k = Easing.inCubic(clamp((T - (outAt - 0.45)) / 0.45, 0, 1)); y = slideOut === 'up' ? k * -380 : 0; o = 1 - k; }
  return (
    <div style={{ position: 'absolute', top: 96, left: 22, right: 22, transform: `translateY(${y}px)`, opacity: o, background: '#fff', borderRadius: 34, boxShadow: '0 30px 70px rgba(0,0,0,.5)', padding: '26px 28px', fontFamily: BODY, zIndex: 30 }}>
      {children}
    </div>
  );
}

function PushLayer() {
  const T = useT();
  if (T < 3 || T > 12.2) return null;
  const accepted = T >= 5.55;
  const dim = Math.max(
    clamp(tw(T, 3.0, 3.4, 0, .5) - tw(T, 5.7, 6.1, 0, .5), 0, .5),
    clamp(tw(T, 8.9, 9.3, 0, .5) - tw(T, 11.6, 12.0, 0, .5), 0, .5)
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: `rgba(8,14,26,${dim})`, zIndex: 20, pointerEvents: 'none' }}>
      {/* Scene 2 — Nuevo pedido */}
      <PushCard T={T} inAt={3.1} outAt={6.0} slideOut="up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: G_ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PinGlyph size={24} /></div>
          <span style={{ fontSize: 19, fontWeight: 700, color: NAVY }}>PidemeYa</span>
          <span style={{ fontSize: 16, color: GRAY }}>· empresa2.pidemeya.com</span>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY, fontFamily: HEAD, marginBottom: 8 }}>¡Nuevo Pedido! 📦</div>
        <div style={{ fontSize: 21, color: '#46566C', marginBottom: 22 }}>📍 Ref: Av. Tupac</div>
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ flex: 1, position: 'relative', height: 70, borderRadius: 18, background: accepted ? '#0f7a37' : GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, fontFamily: HEAD, transform: `scale(${accepted ? tw(T, 5.55, 5.75, 0.92, 1, Easing.outBack) : 1})`, boxShadow: '0 10px 22px rgba(22,163,74,.35)' }}>✅ Aceptar</div>
          <div style={{ flex: 1, height: 70, borderRadius: 18, background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, fontFamily: HEAD, opacity: accepted ? .5 : 1, boxShadow: '0 10px 22px rgba(239,68,68,.3)' }}>❌ Rechazar</div>
        </div>
      </PushCard>
      {/* Scene 3 — Pedido asignado (after WhatsApp confirmation) */}
      <PushCard T={T} inAt={9.0} outAt={11.9} slideOut="up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: G_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>✓</div>
          <span style={{ fontSize: 19, fontWeight: 700, color: NAVY }}>PidemeYa</span>
          <span style={{ fontSize: 16, color: GRAY }}>· ahora</span>
        </div>
        <div style={{ fontSize: 29, fontWeight: 800, color: GREEN, fontFamily: HEAD, marginBottom: 10 }}>✅ ¡Pedido Asignado!</div>
        <div style={{ fontSize: 21, color: '#46566C', lineHeight: 1.45 }}>El pedido es tuyo y el tracking GPS se ha activado.</div>
        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#EAF7F0', color: GREEN, borderRadius: 14, padding: '10px 16px', fontSize: 17, fontWeight: 700 }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: GREEN, boxShadow: `0 0 ${8 + 6 * Math.sin(T * 6)}px ${GREEN}` }} /> GPS activo
        </div>
      </PushCard>
    </div>
  );
}

/* ═══════════════════════ SCENE 4 — DASHBOARD ═══════════════════════ */
function DashboardScreen() {
  const T = useT();
  const rows = [
    { code: '#PED-KZLGVUGY' }, { code: '#PED-SWPYCK5S' },
  ];
  return (
    <Layer inAt={11.7} outAt={17.2} z={2}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: BG, fontFamily: BODY }}>
        <StatusBar time="12:06" />
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '22px 26px 170px', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <TopBar />
            <div>
              <div style={{ fontSize: 50, fontWeight: 800, fontFamily: HEAD, letterSpacing: '-.5px', lineHeight: 1.05 }}>
                <span style={{ color: NAVY }}>Hola, </span><span style={{ color: ORANGE }}>rister emilio</span> 👋
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 21, color: '#5A6678', fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: GREEN }} />
                Resumen de operaciones del <span style={{ color: NAVY, fontWeight: 800, borderBottom: `3px solid ${ORANGE}`, paddingBottom: 2 }}>17/06/2026</span>
              </div>
            </div>
            <StatCard grad={G_BLUE} icon={<MotoGlyph />} label="MIS PEDIDOS EN CAMINO" big="1" unit="Ruta" unitColor="#5A6678" />
            <StatCard grad={G_GREEN} icon={<span style={{ fontSize: 40 }}>✓</span>} label="ENTREGADOS HOY" big="0" unit="Completos" unitColor={GREEN} />
            {/* recientes */}
            <div style={{ ...cardStyle, padding: '26px 26px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: ORANGE, fontSize: 26 }}>↺</span>
                  <span style={{ fontSize: 27, fontWeight: 800, color: NAVY, fontFamily: HEAD }}>Mis Entregas Recientes</span>
                </div>
                <span style={{ color: ORANGE, fontSize: 15, fontWeight: 800, letterSpacing: '.04em' }}>VER MI HISTORIAL</span>
              </div>
              <div style={{ display: 'flex', fontSize: 15, fontWeight: 800, color: '#A6B1C2', letterSpacing: '.08em', padding: '0 4px 12px' }}>
                <span style={{ flex: 1 }}>CÓDIGO</span><span style={{ flex: 1 }}>CLIENTE</span><span style={{ flex: '0 0 150px', textAlign: 'center' }}>ESTADO</span>
              </div>
              {rows.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '18px 4px', borderTop: `1px solid ${LINE}` }}>
                  <span style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#9AA6B8' }}>{r.code}</span>
                  <span style={{ flex: 1, fontSize: 19, fontWeight: 800, color: NAVY }}>RISTER<br />ARVILDO</span>
                  <span style={{ flex: '0 0 150px', display: 'flex', justifyContent: 'center' }}>
                    <span style={{ background: '#E7F6EE', color: GREEN, fontWeight: 800, fontSize: 15, letterSpacing: '.05em', padding: '10px 18px', borderRadius: 20 }}>ENTREGADO</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <BottomNav active="dash" />
        </div>
      </div>
    </Layer>
  );
}

function StatCard({ grad, icon, label, big, unit, unitColor }) {
  return (
    <div style={{ ...cardStyle, padding: '28px 30px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -40, bottom: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(120,140,180,.05)' }} />
      <IconSquare grad={grad}>{icon}</IconSquare>
      <div style={{ marginTop: 22, fontSize: 17, fontWeight: 800, color: '#9AA6B8', letterSpacing: '.1em' }}>{label}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: 56, fontWeight: 800, color: NAVY, fontFamily: HEAD, lineHeight: 1 }}>{big}</span>
        <span style={{ fontSize: 24, fontWeight: 600, color: unitColor }}>{unit}</span>
      </div>
    </div>
  );
}
function MotoGlyph({ color = '#fff', size = 42 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17" r="3" /><circle cx="18.5" cy="17" r="3" /><path d="M8.5 17h6l3-6h-4M14.5 11l-2-3h-3" /><path d="M15 8h3" /></svg>;
}

/* ═══════════════════════ SCENE 5 & 7 — GESTIÓN DE PEDIDOS ═══════════════════════ */
function GestionScreen() {
  const T = useT();
  const v1 = T >= 16.7 && T <= 22.1;
  const v2 = T >= 27.6 && T <= 34.2;
  if (!v1 && !v2) return null;
  const inAt = v1 ? 16.7 : 27.6;
  const outAt = v1 ? 22.1 : 34.2;
  const caja = tw(T, 31.1, 32.3, 51, 68, Easing.outCubic);
  const entregado = T >= 30.95;
  return (
    <Layer inAt={inAt} outAt={outAt} z={2}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: BG, fontFamily: BODY }}>
        <StatusBar time={v2 ? '12:16' : '12:16'} />
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '22px 26px 170px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TopBar />
            <div>
              <div style={{ fontSize: 50, fontWeight: 800, color: ORANGE, fontFamily: HEAD, letterSpacing: '-.5px' }}>Gestión de Pedidos</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#7E8B9E', letterSpacing: '.04em', marginTop: 4 }}>ADMINISTRA Y MONITOREA TUS PEDIDOS EN TIEMPO REAL.</div>
            </div>
            <div style={{ display: 'flex', gap: 18 }}>
              <MiniStat grad={G_ORANGE} icon={<span style={{ fontSize: 30 }}>🕒</span>} label="EN ESPERA" big="0" unit="Pend." unitColor={ORANGE} />
              <MiniStat grad={G_GREEN} icon={<span style={{ fontSize: 28, fontWeight: 800 }}>S/</span>} label="CAJA (ENTREGADOS)" big={`S/ ${caja.toFixed(2)}`} small unitColor={GREEN} flash={entregado} T={T} />
            </div>
            <div style={{ height: 78, borderRadius: 22, background: ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 22, fontWeight: 800, fontFamily: HEAD, boxShadow: '0 12px 26px rgba(242,101,34,.32)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" strokeLinecap="round" /></svg> FILTRAR
            </div>
            <OrderCard T={T} entregado={entregado} />
          </div>
          <BottomNav active="ped" />
        </div>
      </div>
    </Layer>
  );
}

function MiniStat({ grad, icon, label, big, unit, unitColor, small, flash, T }) {
  return (
    <div style={{ flex: 1, ...cardStyle, padding: '22px 22px', overflow: 'hidden' }}>
      <div style={{ width: 70, height: 70, borderRadius: 22, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 12px 22px rgba(40,70,120,.2)' }}>{icon}</div>
      <div style={{ marginTop: 16, fontSize: 15, fontWeight: 800, color: '#9AA6B8', letterSpacing: '.06em' }}>{label}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 8, transform: flash ? `scale(${tw(T, 31.1, 31.4, 1, 1.08, Easing.outBack) * tw(T, 31.4, 32.4, 1, 1 / 1.08 * 1.08, Easing.outCubic)})` : 'none', transformOrigin: 'left' }}>
        <span style={{ fontSize: small ? 34 : 50, fontWeight: 800, color: NAVY, fontFamily: HEAD, lineHeight: 1 }}>{big}</span>
        {unit && <span style={{ fontSize: 17, fontWeight: 700, color: unitColor }}>{unit}</span>}
      </div>
    </div>
  );
}

function OrderCard({ T, entregado }) {
  const pillPulse = T >= 21.0 && T <= 21.9;
  return (
    <div style={{ ...cardStyle, padding: '26px 26px', position: 'relative' }}>
      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ background: '#EEF2F7', color: '#5C6B80', fontSize: 16, fontWeight: 800, padding: '8px 14px', borderRadius: 16, letterSpacing: '.02em' }}>PED-WLSBBEP9</span>
          <span data-pin style={{ width: 44, height: 44, borderRadius: 14, background: pillPulse ? '#DBEAFE' : '#EFF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: pillPulse ? `0 0 0 ${tw(T, 21.0, 21.5, 0, 8)}px rgba(37,99,235,.18)` : 'none' }}>
            <PinGlyph size={26} color={BLUE} />
          </span>
          <span style={{ background: '#EEF2F7', color: '#5C6B80', fontSize: 16, fontWeight: 800, padding: '8px 14px', borderRadius: 16 }}>YAPE/PLIN</span>
        </div>
        <StatusPill entregado={entregado} T={T} />
      </div>
      {/* client */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: G_ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, fontFamily: HEAD }}>R</div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: NAVY, fontFamily: HEAD }}>Rister arvildo .</div>
          <div style={{ fontSize: 17, color: GRAY, fontWeight: 600 }}>DNI: 16703992</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#FFF1E8', color: ORANGE, fontSize: 16, fontWeight: 700, padding: '9px 14px', borderRadius: 14 }}>📍 Av. Tupac</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#FFF1E8', color: ORANGE, fontSize: 16, fontWeight: 700, padding: '9px 14px', borderRadius: 14 }}>📅 17/06/2026 00:10</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 30, fontWeight: 800, color: NAVY, fontFamily: HEAD }}>S/ 17.00</span>
          <span style={{ background: '#EEF2F7', color: '#5C6B80', fontSize: 15, fontWeight: 800, padding: '8px 14px', borderRadius: 14 }}>1 PROD.</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ background: '#FFF1E8', color: ORANGE, fontSize: 15, fontWeight: 800, padding: '11px 16px', borderRadius: 14 }}>↻ LIBERAR</span>
          <span style={{ background: '#FDECEC', color: '#EF4444', fontSize: 15, fontWeight: 800, padding: '11px 16px', borderRadius: 14 }}>⊗ RECHAZAR</span>
        </div>
      </div>
      {/* status dropdown bar */}
      <div data-dropdown style={{ height: 70, borderRadius: 18, background: entregado ? '#E7F6EE' : '#EAF1FE', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', boxShadow: (T >= 28.3 && T <= 29.0) ? `0 0 0 ${tw(T, 28.3, 28.7, 0, 7)}px rgba(37,99,235,.16)` : 'none' }}>
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '.04em', color: entregado ? GREEN : BLUE, display: 'flex', alignItems: 'center', gap: 10 }}>
          {entregado && <span style={{ transform: `scale(${tw(T, 30.95, 31.3, 0, 1, Easing.outBack)})` }}>✓</span>}
          {entregado ? 'ENTREGADO' : 'EN CAMINO'}
        </span>
        <span style={{ color: entregado ? GREEN : BLUE, fontSize: 20 }}>▾</span>
      </div>
    </div>
  );
}
function StatusPill({ entregado, T }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: entregado ? '#E7F6EE' : '#EAF1FE', color: entregado ? GREEN : BLUE, fontSize: 16, fontWeight: 800, padding: '10px 16px', borderRadius: 20, letterSpacing: '.04em' }}>
      <span style={{ width: 9, height: 9, borderRadius: 5, background: entregado ? GREEN : BLUE }} />
      {entregado ? 'ENTREGADO' : 'EN CAMINO'}
    </span>
  );
}

/* ═══════════════════════ SCENE 7 — STATUS SELECTOR MODAL ═══════════════════════ */
function StatusModal() {
  const T = useT();
  if (T < 28.85 || T > 31.0) return null;
  let o = 1, ty = 0;
  if (T < 29.25) { const k = Easing.outCubic(clamp((T - 28.85) / 0.4, 0, 1)); o = k; ty = (1 - k) * 60; }
  else if (T > 30.7) { const k = Easing.inCubic(clamp((T - 30.7) / 0.3, 0, 1)); o = 1 - k; ty = k * 30; }
  const sel = T >= 30.35 ? 'ENTREGADO' : 'EN CAMINO';
  const opts = [
    { k: 'PENDIENTE', c: ORANGE }, { k: 'EN CAMINO', c: BLUE }, { k: 'ENTREGADO', c: GREEN },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: `rgba(8,14,26,${0.6 * o})`, display: 'flex', alignItems: 'flex-end', zIndex: 40, fontFamily: BODY }}>
      <div style={{ width: '100%', background: '#15233B', borderTopLeftRadius: 36, borderTopRightRadius: 36, padding: '30px 30px 46px', opacity: o, transform: `translateY(${ty}px)` }}>
        <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.25)', margin: '0 auto 26px' }} />
        <div style={{ fontSize: 27, fontWeight: 800, color: '#fff', fontFamily: HEAD, marginBottom: 6 }}>Cambiar estado del pedido</div>
        <div style={{ fontSize: 17, color: '#90A0B8', marginBottom: 24 }}>PED-WLSBBEP9</div>
        {opts.map(op => {
          const on = sel === op.k;
          return (
            <div key={op.k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderRadius: 18, marginBottom: 14, background: on ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.03)', border: `2px solid ${on ? op.c : 'rgba(255,255,255,.07)'}` }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '.03em' }}>
                <span style={{ width: 12, height: 12, borderRadius: 6, background: op.c }} />{op.k}
              </span>
              <span style={{ width: 30, height: 30, borderRadius: 15, border: `3px solid ${on ? op.c : '#4A5A72'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {on && <span style={{ width: 14, height: 14, borderRadius: 7, background: op.c, transform: `scale(${op.k === 'ENTREGADO' ? tw(T, 30.35, 30.6, 0, 1, Easing.outBack) : 1})` }} />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ SCENE 6 — MAP TRACKING ═══════════════════════ */
function MapScreen() {
  const T = useT();
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  useLayoutEffect(() => { if (pathRef.current) setLen(pathRef.current.getTotalLength()); }, [pathRef.current]);
  if (T < 21.7 || T > 28.3) return null;
  const frac = tw(T, 22.2, 27.8, 0.94, 0.34, Easing.inOutQuad);
  let moto = { x: 470, y: 470 };
  if (pathRef.current && len) { const p = pathRef.current.getPointAtLength(frac * len); moto = { x: p.x, y: p.y }; }
  const house = { x: 150, y: 470 };
  const d = "M150 470 L250 470 L250 410 L360 410 L360 470 L470 470 L470 400 L545 400";
  return (
    <Layer inAt={21.7} outAt={28.3} z={3} slide={0} inDur={0.55}>
      <div style={{ position: 'absolute', inset: 0, background: '#2b313a', fontFamily: BODY, overflow: 'hidden' }}>
        <StatusBar time="12:15" />
        {/* map */}
        <div style={{ position: 'absolute', top: 48, left: 0, right: 0, height: 720, overflow: 'hidden', background: '#2b313a' }}>
          {/* street grid */}
          <div style={{ position: 'absolute', inset: -80, transform: 'rotate(-8deg)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(70,150,160,.22) 0 2px, transparent 2px 78px), repeating-linear-gradient(0deg, rgba(70,150,160,.22) 0 2px, transparent 2px 92px)' }} />
          <div style={{ position: 'absolute', inset: -80, transform: 'rotate(-8deg)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(70,150,160,.1) 0 1px, transparent 1px 26px), repeating-linear-gradient(0deg, rgba(70,150,160,.1) 0 1px, transparent 1px 30px)' }} />
          {/* park blob */}
          <div style={{ position: 'absolute', left: 280, top: 330, width: 130, height: 90, background: 'rgba(60,110,90,.35)', borderRadius: 8, transform: 'rotate(-8deg)' }} />
          {/* street labels */}
          <span style={{ position: 'absolute', left: 30, top: 290, color: 'rgba(200,220,225,.6)', fontSize: 19, fontWeight: 700, fontStyle: 'italic' }}>Avenida Túpac Amaru</span>
          <span style={{ position: 'absolute', right: 40, top: 230, color: 'rgba(200,220,225,.55)', fontSize: 22, fontWeight: 800, letterSpacing: '1px' }}>SAN<br />FERNANDO</span>
          <span style={{ position: 'absolute', left: 330, top: 500, color: 'rgba(200,220,225,.5)', fontSize: 18, fontWeight: 700, letterSpacing: '1px' }}>CARLOS TUBINO</span>
          {/* route */}
          <svg width="608" height="720" style={{ position: 'absolute', inset: 0 }}>
            <path d={d} stroke="rgba(35,180,210,.35)" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={pathRef} d={d} stroke="#22B4D2" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={len} strokeDashoffset={len ? len * (1 - tw(T, 21.9, 23.0, 0, 1, Easing.outCubic)) : 0} />
          </svg>
          {/* house marker */}
          <Marker x={house.x} y={house.y} color={GREEN}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 11l8-6 8 6" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9h12v-9" strokeLinejoin="round" /></svg>
          </Marker>
          {/* moto marker */}
          <Marker x={moto.x} y={moto.y} color={BLUE} pulse T={T}>
            <MotoGlyph color="#fff" size={32} />
          </Marker>
          {/* zoom controls */}
          <div style={{ position: 'absolute', right: 22, top: 24, width: 56, background: '#3a414c', borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 16px rgba(0,0,0,.3)' }}>
            {['+', '–', '◇'].map((s, i) => <div key={i} style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cfd8e0', fontSize: 26, borderTop: i ? '1px solid rgba(255,255,255,.08)' : 'none' }}>{s}</div>)}
          </div>
        </div>
        {/* bottom panel */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 530, background: '#162130', borderTopLeftRadius: 34, borderTopRightRadius: 34, padding: '26px 28px', boxShadow: '0 -20px 50px rgba(0,0,0,.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cfd8e0', fontSize: 26 }}>←</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#2ED3E8', fontSize: 20, fontWeight: 700, border: '1px solid rgba(46,211,232,.4)', borderRadius: 22, padding: '10px 18px' }}>
              <span style={{ width: 9, height: 9, borderRadius: 5, background: '#2ED3E8' }} /> Pedido #PED-WLSBBEP9 ▾
            </span>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '0 0 22px' }} />
          <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
            <PanelStat label="LLEGADA ESTIMADA" value="3 minutos" />
            <PanelStat label="DISTANCIA RESTANTE" value="1.19 km" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,.04)', borderRadius: 18, padding: '18px 20px', marginBottom: 20, border: '1px solid rgba(255,255,255,.06)' }}>
            <span style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(46,211,232,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MotoGlyph color="#2ED3E8" size={30} /></span>
            <div>
              <div style={{ fontSize: 16, color: '#8FA0B5', fontWeight: 600 }}>Repartidor</div>
              <div style={{ fontSize: 21, color: '#fff', fontWeight: 800 }}>rister emilio arvildo canepa</div>
              <div style={{ fontSize: 16, color: '#8FA0B5' }}>Tel: 916703992</div>
            </div>
          </div>
          <div style={{ height: 74, borderRadius: 18, background: '#2ED3E8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 22, fontWeight: 800, color: '#0c1722', fontFamily: HEAD, boxShadow: '0 12px 28px rgba(46,211,232,.3)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0c1722" strokeWidth="2"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" strokeLinecap="round" /></svg>
            Centrar en la Ruta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: GREEN, fontSize: 17, fontWeight: 700 }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: GREEN, opacity: .5 + .5 * Math.sin(T * 5) }} /> En vivo (Rastreando)
            </span>
            <span style={{ color: '#8FA0B5', fontSize: 16 }}>⟳ 05:15:17 a.m.</span>
          </div>
        </div>
      </div>
    </Layer>
  );
}
function Marker({ x, y, color, children, pulse, T }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)' }}>
      {pulse && <div style={{ position: 'absolute', left: '50%', top: '50%', width: 70, height: 70, marginLeft: -35, marginTop: -35, borderRadius: '50%', background: color, opacity: clamp(.4 - .4 * ((T * 1.2) % 1), 0, .4), transform: `scale(${1 + ((T * 1.2) % 1) * 1.3})` }} />}
      <div style={{ position: 'relative', width: 60, height: 60, borderRadius: '50%', background: color, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${color}88` }}>{children}</div>
    </div>
  );
}
function PanelStat({ label, value }) {
  return (
    <div style={{ flex: 1, background: 'rgba(255,255,255,.04)', borderRadius: 16, padding: '18px 18px', borderTop: `3px solid ${GREEN}`, border: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ fontSize: 14, color: '#8FA0B5', fontWeight: 800, letterSpacing: '.05em' }}>{label}</div>
      <div style={{ fontSize: 26, color: '#fff', fontWeight: 800, fontFamily: HEAD, marginTop: 6 }}>{value}</div>
    </div>
  );
}

/* ═══════════════════════ SCENE 2.5 — WHATSAPP (justo tras Aceptar) ═══════════════════════ */
function WhatsAppScene() {
  const T = useT();
  if (T < 5.9 || T > 12.0) return null;
  const bubbleIn = 6.7;
  const typing = T >= 6.15 && T < bubbleIn;
  let bo = 0, by = 0;
  if (T >= bubbleIn) { bo = clamp((T - bubbleIn) / 0.25, 0, 1); by = (1 - Easing.outBack(clamp((T - bubbleIn) / 0.45, 0, 1))) * 36; }
  return (
    <Layer inAt={5.95} outAt={11.95} z={4} slide={0} inDur={0.45} outDur={0.4}>
      <div style={{ position: 'absolute', inset: 0, background: '#0B141A', fontFamily: BODY, display: 'flex', flexDirection: 'column' }}>
        <StatusBar time="12:07" bg="#0B141A" color="#cfd8d8" />
        {/* header */}
        <div style={{ background: '#1F2C34', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px' }}>
          <span style={{ color: '#cfd8d8', fontSize: 32, lineHeight: 1 }}>‹</span>
          <div style={{ width: 62, height: 62, borderRadius: 31, background: G_ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 30, fontFamily: HEAD }}>P</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: '#fff' }}>PidemeYa</div>
            <div style={{ fontSize: 16, color: '#34D399', fontWeight: 600 }}>en línea</div>
          </div>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8FA3A8" strokeWidth="1.8"><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" strokeLinejoin="round" /></svg>
          <span style={{ color: '#8FA3A8', fontSize: 26, fontWeight: 800, lineHeight: 1 }}>⋮</span>
        </div>
        {/* chat body */}
        <div style={{ flex: 1, padding: '26px 22px', background: '#0B141A', backgroundImage: 'radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px)', backgroundSize: '24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12 }}>
          {typing && (
            <div style={{ alignSelf: 'flex-start', background: '#1F2C34', borderRadius: '6px 18px 18px 18px', padding: '20px 24px', display: 'flex', gap: 9 }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 13, height: 13, borderRadius: 7, background: '#8FA3A8', opacity: .35 + .55 * Math.abs(Math.sin(T * 5 - i * 0.7)) }} />)}
            </div>
          )}
          {T >= bubbleIn && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '88%', background: '#1F2C34', borderRadius: '6px 22px 22px 22px', padding: '22px 24px', opacity: bo, transform: `translateY(${by}px)`, boxShadow: '0 8px 22px rgba(0,0,0,.35)' }}>
              <div style={{ fontSize: 27, fontWeight: 800, color: '#fff', fontFamily: HEAD, marginBottom: 14 }}>📦 ¡Pedido Aceptado! 🚀</div>
              {[['Cliente:', 'Rister arvildo'], ['📍 Ubicación recibida ·', 'Av. Tupac'], ['💰 Cobrar:', 'S/ 17.00'], ['💳 Pago:', 'Yape/Plin']].map((l, i) => (
                <div key={i} style={{ fontSize: 20, color: '#D6E0E2', marginBottom: 8, lineHeight: 1.4 }}>
                  <span style={{ color: '#8FA3A8' }}>{l[0]} </span><span style={{ fontWeight: 700, color: '#fff' }}>{l[1]}</span>
                </div>
              ))}
              <div style={{ textAlign: 'right', fontSize: 14, color: '#6E8087', marginTop: 6 }}>12:07 ✓✓</div>
            </div>
          )}
        </div>
        {/* input bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 28px', background: '#0B141A' }}>
          <div style={{ flex: 1, height: 64, borderRadius: 32, background: '#1F2C34', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', color: '#6E8087', fontSize: 20 }}>
            <span style={{ fontSize: 24 }}>☺</span> Mensaje
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B141A', fontSize: 24 }}>➤</div>
        </div>
      </div>
    </Layer>
  );
}

function BrandScreen() {
  const T = useT();
  if (T < 34.0) return null;
  const k = Easing.outCubic(clamp((T - 34.0) / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 6, background: 'linear-gradient(160deg,#15233B 0%,#0E1828 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: clamp((T - 34.0) / 0.5, 0, 1), fontFamily: BODY, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,101,34,.3),transparent 65%)', transform: `scale(${0.8 + 0.2 * k})` }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${(1 - k) * 24}px)` }}>
        <div style={{ width: 150, height: 150, borderRadius: 40, background: G_ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 60px rgba(242,101,34,.5)', transform: `scale(${tw(T, 34.1, 34.7, 0.6, 1, Easing.outBack)})` }}>
          <PinGlyph size={86} />
        </div>
        <div style={{ marginTop: 36, fontSize: 64, fontWeight: 800, color: '#fff', fontFamily: HEAD, letterSpacing: '-1px' }}>
          Pideme<span style={{ color: ORANGE }}>Ya</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 22, fontWeight: 700, color: '#9FB0C8', letterSpacing: '.22em', textAlign: 'center' }}>GESTIÓN DE DELIVERY<br />EN TIEMPO REAL</div>
      </div>
    </div>
  );
}

/* ═══════════════════════ TAPS (cursor + ripple, stage coords) ═══════════════════════ */
function Tap({ at, x, y }) {
  const T = useT();
  const dt = T - at;
  if (dt < -0.25 || dt > 0.85) return null;
  const rp = clamp(dt / 0.6, 0, 1);
  const press = dt >= 0 && dt < 0.18 ? 0.82 : 1;
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 60, pointerEvents: 'none' }}>
      {dt >= 0 && <div style={{ position: 'absolute', left: -55, top: -55, width: 110, height: 110, borderRadius: '50%', border: '4px solid rgba(242,101,34,.9)', opacity: 1 - rp, transform: `scale(${0.3 + rp * 1.1})` }} />}
      <div style={{ position: 'absolute', left: -26, top: -26, width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.35)', border: '3px solid #fff', transform: `scale(${press}) translateY(${dt < -0.25 ? 30 : 0}px)`, boxShadow: '0 8px 20px rgba(0,0,0,.4)', opacity: clamp((dt + 0.25) / 0.25, 0, 1) }} />
    </div>
  );
}

/* ═══════════════════════ MOVIE ROOT ═══════════════════════ */
function Movie() {
  const T = useT();
  const rootRef = useRef(null);
  useEffect(() => { if (rootRef.current) rootRef.current.setAttribute('data-screen-label', `t=${Math.floor(T)}s`); }, [Math.floor(T)]);
  return (
    <div ref={rootRef} data-screen-label="t=0s" style={{ position: 'absolute', inset: 0 }}>
      {/* phone — modern slim-bezel mockup */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 640, height: 1330, boxSizing: 'border-box', borderRadius: 96, background: 'linear-gradient(150deg, #2b2b30 0%, #141416 55%, #060607 100%)', boxShadow: '0 30px 80px rgba(0,0,0,.5), 0 0 0 2px #04050a, inset 0 0 0 1.5px rgba(255,255,255,.08)', padding: 16 }}>
        <div style={{ position: 'relative', width: SCR.w, height: SCR.h, borderRadius: 78, overflow: 'hidden', background: '#000', boxShadow: 'inset 0 0 0 2px #050609' }}>
          <HomeScreen />
          <PushLayer />
          <DashboardScreen />
          <GestionScreen />
          <MapScreen />
          <StatusModal />
          <WhatsAppScene />
          <BrandScreen />
          {/* dynamic island */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', width: 132, height: 38, borderRadius: 22, background: '#000', zIndex: 75, pointerEvents: 'none' }} />
        </div>
      </div>
      {/* taps in stage coords */}
      <Tap at={2.0} x={16 + 304} y={16 + 635} />{/* abrir app */}
      <Tap at={5.35} x={16 + 165} y={16 + 308} />{/* Aceptar */}
      <Tap at={21.25} x={16 + 215} y={16 + 770} />{/* blue pin */}
      <Tap at={28.55} x={16 + 470} y={16 + 1010} />{/* dropdown */}
      <Tap at={30.25} x={16 + 520} y={16 + 980} />{/* entregado radio */}
    </div>
  );
}

export default function RepartidorDemo() {
  return <Movie />;
}
