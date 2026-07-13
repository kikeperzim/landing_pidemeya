// ChatCommercial.jsx — PidemeYa WhatsApp-style delivery bot commercial.
import React from 'react';
import { useTime } from './animations.jsx';
// Mounted inside <Stage> from animations.jsx; reads the playhead via the Stage timeline context.

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeOutBack = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

const ACCENT = '#F26522';
const GREEN = '#25D366';
const BOT_BG = '#202c33';
const CHAT_BG = '#0b141a';
const HEADER_BG = '#1f2c33';
const LINK = '#53bdeb';
const BTN_GREEN = '#2ee36a';

// ── Message script ───────────────────────────────────────────────────────────
const TIME = '12:12 p. m.';
const M = [
  { from: 'client', text: 'Hola' },
  { from: 'bot', text: '👋 ¡Hola Rister! Qué gusto verte de nuevo. Indícame tu distrito para verificar la cobertura y el costo de envío:' },
  { from: 'client', text: 'Calleria' },
  { from: 'bot', text: '✅ Excelente, sí llegamos a tu zona.\nAquí tienes nuestro catálogo, elige una Categoría:', buttons: [{ icon: '📋', label: 'Ver Categorías' }] },
  { from: 'bot', text: '🛒 POLLO — Selecciona el producto que deseas:', buttons: [{ icon: '📂', label: 'Ver Productos' }] },
  { from: 'bot', type: 'product', title: '1/4 pollo a la braza', price: 'S/ 15' },
  { from: 'client', text: '1/4 pollo a la braza' },
  { from: 'bot', text: 'Elegiste: 1/4 pollo a la braza (S/ 15).\n¿Cuántos deseas?', buttons: [{ icon: '↩', label: '1' }, { icon: '↩', label: '2' }, { icon: '↩', label: '3' }] },
  { from: 'client', text: '1' },
  { from: 'bot', type: 'cart' },
  { from: 'client', text: 'CONFIRMAR Y PAGAR' },
  { from: 'bot', text: 'Me indicas con qué medio cancelas 🙌', buttons: [{ icon: '🟣', label: 'YAPE/PLIN' }, { icon: '💳', label: 'TARJETA (POS)' }, { icon: '💵', fill: 'EFECTIVO', label: 'EFECTIVO' }] },
  { from: 'client', text: '🟣 YAPE/PLIN' },
  { from: 'bot', text: '📍 Para finalizar, manda tu ubicación actual de Google Maps (botón Adjuntar 📎 → Ubicación).' },
  { from: 'client', type: 'map', text: 'Sobrios Restobar', sub: 'Manantay, UC, PE' },
  { from: 'bot', text: '📍 Ubicación recibida. Ahora escribe una referencia de tu domicilio:' },
  { from: 'client', text: 'Av. Tupac' },
  { from: 'bot', type: 'confirm' },
  { from: 'bot', type: 'track' },
];

// ── Timeline schedule (deterministic) ────────────────────────────────────────
function charCount(m) {
  if (m.type === 'cart') return 150;
  if (m.type === 'confirm') return 160;
  if (m.type === 'product') return 45;
  if (m.type === 'map') return 40;
  if (m.type === 'track') return 120;
  let n = (m.text || '').length;
  (m.buttons || []).forEach((b) => { n += (b.label || '').length + 8; });
  return n;
}
function readTime(m) {
  const c = charCount(m);
  let t = 0.65 + c * 0.0145;
  if (m.type === 'cart' || m.type === 'confirm') t += 0.6;
  return clamp(t, 0.85, 2.5);
}

// Bottom sheets that open after a given message index is read.
const SHEETS = {
  3: { title: 'Ver Categorías', name: 'POLLO', sub: 'Ver catálogo de POLLO' },
  4: { title: 'Ver Productos', name: '1/4 pollo a la braza', sub: 'S/ 15 – Seleccionar' },
};
const SHEET_DUR = 3.0;

let cursor = 0.6;
const SHEET_EVENTS = [];
const SCHED = M.map((m, idx) => {
  const o = {};
  if (m.from === 'bot') {
    const typingDur = (m.type === 'cart' || m.type === 'confirm' || m.type === 'track') ? 0.8 : 0.55;
    o.typingStart = cursor;
    o.bubbleStart = cursor + typingDur;
  } else {
    o.typingStart = null;
    o.bubbleStart = cursor + 0.22;
  }
  o.read = readTime(m);
  cursor = o.bubbleStart + o.read;
  if (SHEETS[idx]) {
    const start = cursor + 0.3;
    SHEET_EVENTS.push({ start, end: start + SHEET_DUR, dur: SHEET_DUR, def: SHEETS[idx] });
    cursor = start + SHEET_DUR + 0.35;
  }
  return o;
});
const CHAT_END = cursor;

function activeSheet(time) {
  for (const s of SHEET_EVENTS) {
    if (time >= s.start && time <= s.end) return { def: s.def, dur: s.dur, local: time - s.start };
  }
  return null;
}
const CLOSE_START = CHAT_END + 0.5;
const TOTAL = CLOSE_START + 5.0;
if (typeof window !== 'undefined') window.PIDEMEYA_TOTAL = TOTAL;

// ── Small pieces ─────────────────────────────────────────────────────────────
function entryStyle(local) {
  const t = clamp(local / 0.34, 0, 1);
  const e = easeOutBack(t);
  return {
    opacity: clamp(local / 0.18, 0, 1),
    transform: `translateY(${(1 - e) * 18}px) scale(${0.97 + 0.03 * Math.min(1, t)})`,
  };
}

function Ticks({ light }) {
  return (
    <span style={{ display: 'inline-flex', marginLeft: 6, color: light ? 'rgba(255,255,255,0.75)' : LINK, letterSpacing: '-3px', fontSize: 20 }}>
      ✓✓
    </span>
  );
}

function TimeRow({ light, withTicks }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0, marginTop: 3 }}>
      <span style={{ fontSize: 18, color: light ? 'rgba(255,255,255,0.7)' : 'rgba(233,237,239,0.45)' }}>{TIME}</span>
      {withTicks ? <Ticks light={light} /> : null}
    </div>
  );
}

function Buttons({ buttons, row }) {
  return (
    <div style={{ marginLeft: -16, marginRight: -16, marginTop: 10, marginBottom: -8 }}>
      {buttons.map((b, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '13px 16px', borderTop: '1px solid rgba(255,255,255,0.08)',
          color: BTN_GREEN, fontWeight: 600, fontSize: 25,
        }}>
          <span style={{ fontSize: 24, filter: 'grayscale(0)' }}>{b.icon}</span>
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function Bubble({ m, local }) {
  const isClient = m.from === 'client';
  const bg = isClient ? GREEN : BOT_BG;
  const color = isClient ? '#fff' : '#e9edef';
  const radius = isClient
    ? '18px 18px 6px 18px'
    : '18px 18px 18px 6px';
  return (
    <div style={{ display: 'flex', justifyContent: isClient ? 'flex-end' : 'flex-start', padding: '0 22px', ...entryStyle(local) }}>
      <div style={{
        maxWidth: '80%', background: bg, color, borderRadius: radius,
        padding: '12px 16px 8px', fontSize: 28, lineHeight: 1.34,
        boxShadow: '0 1px 1px rgba(0,0,0,0.25)', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        textShadow: isClient ? '0 1px 1px rgba(0,0,0,0.18)' : 'none',
      }}>
        <span>{m.text}</span>
        {m.buttons ? <Buttons buttons={m.buttons} /> : null}
        <TimeRow light={isClient} withTicks={isClient} />
      </div>
    </div>
  );
}

function Typing() {
  const time = useTime();
  const dot = (i) => {
    const ph = (time * 3 + i * 0.4) % 1;
    const y = Math.sin(ph * Math.PI * 2) * 5;
    return <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: 'rgba(233,237,239,0.55)', display: 'inline-block', transform: `translateY(${y}px)` }} />;
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 22px', ...entryStyle(0.4) }}>
      <div style={{ background: BOT_BG, borderRadius: '18px 18px 18px 6px', padding: '18px 20px', display: 'flex', gap: 8, alignItems: 'center' }}>
        {[0, 1, 2].map(dot)}
      </div>
    </div>
  );
}

// ── Card messages ────────────────────────────────────────────────────────────
function CardShell({ children, local, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 22px', ...entryStyle(local) }}>
      <div style={{
        maxWidth: '84%', background: BOT_BG, color: '#e9edef', borderRadius: '18px 18px 18px 6px',
        padding: '14px 18px 10px', fontSize: 27, lineHeight: 1.4, width: '84%',
        border: highlight ? `1.5px solid ${ACCENT}` : 'none',
        boxShadow: highlight ? `0 0 0 1px rgba(242,101,34,0.25), 0 8px 26px rgba(242,101,34,0.18)` : '0 1px 1px rgba(0,0,0,0.25)',
      }}>
        {children}
      </div>
    </div>
  );
}

function ProductCard({ local }) {
  return (
    <CardShell local={local}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontWeight: 600 }}>1/4 pollo a la braza</span>
        <span style={{ color: ACCENT, fontWeight: 700, whiteSpace: 'nowrap' }}>S/ 15</span>
      </div>
      <Buttons buttons={[{ icon: '✅', label: 'Seleccionar' }]} />
      <TimeRow />
    </CardShell>
  );
}

function Line({ children, strong, color }) {
  return <div style={{ fontWeight: strong ? 700 : 400, color: color || '#e9edef', margin: '2px 0' }}>{children}</div>;
}

function CartCard({ local }) {
  return (
    <CardShell local={local}>
      <Line strong>🛒 Tu Carrito de Compras:</Line>
      <div style={{ height: 8 }} />
      <Line>📦 1x 1/4 pollo a la braza</Line>
      <Line color="rgba(233,237,239,0.75)">Precio: S/ 15.00 · Total: S/ 15.00</Line>
      <Line color="rgba(233,237,239,0.75)">🛵 Delivery: S/ 2.00</Line>
      <div style={{ height: 8, borderBottom: '1px solid rgba(255,255,255,0.1)', margin: '6px 0' }} />
      <Line strong color={ACCENT}>💰 Total a pagar: S/ 17.00</Line>
      <Buttons buttons={[{ icon: '💳', label: 'CONFIRMAR Y PAGAR' }, { icon: '➕', label: 'AGREGAR MÁS' }, { icon: '🗑', label: 'VACIAR CARRITO' }]} />
      <TimeRow />
    </CardShell>
  );
}

function ConfirmCard({ local }) {
  return (
    <CardShell local={local} highlight>
      <Line strong color={ACCENT}>🎉 ¡Pedido confirmado! 🚀</Line>
      <div style={{ height: 6 }} />
      <Line>Código: <b>PED-UVK49QMR</b></Line>
      <Line>📦 1x 1/4 pollo a la braza</Line>
      <Line color="rgba(233,237,239,0.8)">🛵 Delivery: S/ 2.00</Line>
      <Line strong>💰 Total: S/ 17.00</Line>
      <Line color="rgba(233,237,239,0.8)">💳 Pago: Yape/Plin</Line>
      <Line color="rgba(233,237,239,0.8)">📍 Referencia: Av. Tupac</Line>
      <TimeRow />
    </CardShell>
  );
}

function TrackCard({ local }) {
  return (
    <CardShell local={local}>
      <span>🛵 ¡Tu pedido <b>#PED-UVK49QMR</b> fue aceptado ✅! El repartidor <b>ENRIQUE</b> vuela hacia ti. 🚀</span>
      <div style={{ height: 8 }} />
      <div style={{ color: 'rgba(233,237,239,0.85)' }}>📍 Sigue tu pedido en vivo:</div>
      <div style={{ color: LINK, textDecoration: 'underline' }}>empresa2.pidemeya.com/tracking</div>
      <TimeRow />
    </CardShell>
  );
}

function MapCard({ m, local }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 22px', ...entryStyle(local) }}>
      <div style={{ maxWidth: '78%', width: '78%', background: GREEN, borderRadius: '18px 18px 6px 18px', padding: 5, boxShadow: '0 1px 1px rgba(0,0,0,0.25)' }}>
        <div style={{ borderRadius: 14, overflow: 'hidden', background: '#1d2c33' }}>
          {/* faux map */}
          <div style={{
            height: 168, position: 'relative',
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15)),' +
              'linear-gradient(115deg, #3a4a3f 0%, #2f3e44 45%, #384a52 100%)',
          }}>
            {/* roads */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '38%', width: 10, background: 'rgba(255,255,255,0.14)', transform: 'rotate(8deg)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: '58%', height: 9, background: 'rgba(255,255,255,0.12)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: '22%', width: 6, background: 'rgba(255,255,255,0.1)', transform: 'rotate(-12deg)' }} />
            <div style={{ position: 'absolute', left: '8%', top: '12%', width: 90, height: 70, background: 'rgba(120,170,120,0.25)', borderRadius: 6 }} />
            {/* pin */}
            <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-100%)' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', background: '#ea4335', transform: 'rotate(-45deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#fff', transform: 'rotate(45deg)' }} />
              </div>
            </div>
          </div>
          {/* footer */}
          <div style={{ padding: '12px 16px', background: '#1d2c33' }}>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 26 }}>📍 {m.text}</div>
            <div style={{ color: 'rgba(233,237,239,0.6)', fontSize: 21, marginTop: 2 }}>{m.sub}</div>
          </div>
        </div>
        <div style={{ padding: '4px 10px 2px' }}>
          <TimeRow light withTicks />
        </div>
      </div>
    </div>
  );
}

function renderMessage(m, local, key) {
  if (m.type === 'product') return <ProductCard key={key} local={local} />;
  if (m.type === 'cart') return <CartCard key={key} local={local} />;
  if (m.type === 'confirm') return <ConfirmCard key={key} local={local} />;
  if (m.type === 'track') return <TrackCard key={key} local={local} />;
  if (m.type === 'map') return <MapCard key={key} m={m} local={local} />;
  return <Bubble key={key} m={m} local={local} />;
}

// ── Bottom sheet (catalog selector) ──────────────────────────────────────────
function Sheet({ time }) {
  const a = activeSheet(time);
  if (!a) return null;
  const { local, dur, def } = a;
  const up = easeOutCubic(clamp(local / 0.5, 0, 1));
  const downStart = dur - 0.5;
  let ty, scrim;
  if (local < downStart) { ty = (1 - up) * 100; scrim = clamp(local / 0.5, 0, 1); }
  else { const d = clamp((local - downStart) / 0.5, 0, 1); ty = easeInCubic(d) * 100; scrim = 1 - d; }
  scrim *= 0.5;

  const SELECT_AT = 1.5;
  const selected = local >= SELECT_AT;
  const selPop = easeOutBack(clamp((local - SELECT_AT) / 0.32, 0, 1));
  const flash = selected ? clamp(1 - (local - SELECT_AT) / 0.55, 0, 1) : 0;
  const tap = selected ? clamp((local - SELECT_AT) / 0.45, 0, 1) : 0;

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${scrim})`, zIndex: 9 }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '49%',
        background: '#1b262c', borderRadius: '26px 26px 0 0',
        boxShadow: '0 -14px 50px rgba(0,0,0,0.5)', zIndex: 10, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transform: `translateY(${ty}%)`,
      }}>
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14 }}>
          <div style={{ width: 72, height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.28)' }} />
        </div>
        {/* header: X left, title centered */}
        <div style={{ position: 'relative', height: 78, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ position: 'absolute', left: 28, color: '#e9edef', fontSize: 40, fontWeight: 300, lineHeight: 1 }}>✕</span>
          <span style={{ color: '#fff', fontSize: 34, fontWeight: 600 }}>{def.title}</span>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
        {/* option row */}
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '26px 30px', background: `rgba(37,211,102,${flash * 0.16})`,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 31, fontWeight: 700 }}>{def.name}</div>
            <div style={{ color: 'rgba(233,237,239,0.55)', fontSize: 25, marginTop: 4 }}>{def.sub}</div>
          </div>
          <div style={{ position: 'relative', width: 50, height: 50, flexShrink: 0 }}>
            {/* tap ripple */}
            {selected ? <div style={{ position: 'absolute', left: '50%', top: '50%', width: 50, height: 50, marginLeft: -25, marginTop: -25, borderRadius: '50%', background: GREEN, opacity: 0.3 * (1 - tap), transform: `scale(${1 + tap * 1.6})` }} /> : null}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: selected ? 'none' : '3px solid rgba(255,255,255,0.4)',
              background: selected ? GREEN : 'transparent',
              transform: `scale(${selected ? (0.8 + 0.2 * selPop) : 1})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: selected ? '0 4px 14px rgba(37,211,102,0.4)' : 'none',
            }}>
              {selected ? <span style={{ color: '#fff', fontSize: 30, fontWeight: 800, transform: `scale(${selPop})` }}>✓</span> : null}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        {/* footer hint */}
        <div style={{ marginTop: 'auto', textAlign: 'center', color: 'rgba(233,237,239,0.4)', fontSize: 25, paddingBottom: 46 }}>
          Toca para seleccionar un elemento
        </div>
      </div>
    </React.Fragment>
  );
}

// ── Chat viewport with smooth scroll-follow ──────────────────────────────────
function ChatView({ time }) {
  const innerRef = React.useRef(null);
  const scrollRef = React.useRef(0);
  const initRef = React.useRef(false);

  const items = [];
  for (let i = 0; i < M.length; i++) {
    const s = SCHED[i];
    const m = M[i];
    if (m.from === 'bot' && s.typingStart != null && time >= s.typingStart && time < s.bubbleStart) {
      items.push(<Typing key={'t' + i} />);
    } else if (time >= s.bubbleStart) {
      items.push(renderMessage(m, time - s.bubbleStart, 'm' + i));
    }
  }

  React.useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const parent = inner.parentElement;
    const viewH = parent.clientHeight;
    const contentH = inner.scrollHeight;
    const target = Math.max(0, contentH - viewH);
    if (!initRef.current) { scrollRef.current = target; initRef.current = true; }
    else { scrollRef.current += (target - scrollRef.current) * 0.2; }
    inner.style.transform = `translateY(${-scrollRef.current}px)`;
  });

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: CHAT_BG }}>
      {/* subtle wallpaper texture */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1.5px, transparent 1.5px)', backgroundSize: '34px 34px' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, rgba(242,101,34,0.05), transparent 60%)' }} />
      <div ref={innerRef} style={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12, paddingBottom: 14, paddingTop: 14, willChange: 'transform' }}>
        {items}
      </div>
    </div>
  );
}

// ── Phone chrome ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: HEADER_BG, color: '#fff', flexShrink: 0 }}>
      <span style={{ fontSize: 26, fontWeight: 600 }}>10:22</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 20 }}>
          {[8, 12, 16, 20].map((h, i) => <div key={i} style={{ width: 5, height: h, background: i < 3 ? '#fff' : 'rgba(255,255,255,0.4)', borderRadius: 1 }} />)}
        </div>
        <div style={{ width: 26, height: 18, borderRadius: 4, border: '2px solid rgba(255,255,255,0.85)', position: 'relative', padding: 2 }}>
          <div style={{ width: '70%', height: '100%', background: '#fff', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function Header({ accent }) {
  return (
    <div style={{ height: 116, background: HEADER_BG, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0, borderBottom: '1px solid rgba(0,0,0,0.25)' }}>
      <span style={{ color: '#e9edef', fontSize: 40, lineHeight: 1, marginRight: -4 }}>‹</span>
      <div style={{ width: 74, height: 74, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px rgba(255,255,255,0.06)' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 38 }}>P</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: 31, fontWeight: 600 }}>PidemeYa</div>
        <div style={{ color: '#7fd99a', fontSize: 21 }}>en línea</div>
      </div>
      <div style={{ display: 'flex', gap: 26, alignItems: 'center', color: 'rgba(233,237,239,0.85)', fontSize: 30 }}>
        <span>📹</span>
        <span style={{ fontSize: 34, letterSpacing: 2 }}>⋮</span>
      </div>
    </div>
  );
}

function InputBar() {
  return (
    <div style={{ minHeight: 104, background: HEADER_BG, display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 14, flexShrink: 0 }}>
      <div style={{ flex: 1, background: '#2a3942', borderRadius: 28, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, color: 'rgba(233,237,239,0.55)', fontSize: 27 }}>
        <span style={{ fontSize: 28 }}>😊</span>
        <span style={{ flex: 1 }}>Mensaje</span>
        <span style={{ fontSize: 27, transform: 'rotate(45deg)' }}>📎</span>
        <span style={{ fontSize: 27 }}>📷</span>
      </div>
      <div style={{ width: 66, height: 66, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: '0 4px 14px rgba(37,211,102,0.35)' }}>🎤</div>
    </div>
  );
}

function Phone({ time, accent, opacity, scale, slogan }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${scale})`, width: 770, height: 1636, opacity }}>
      {/* bezel */}
      <div style={{
        width: '100%', height: '100%', borderRadius: 96, padding: 18,
        background: 'linear-gradient(150deg, #2b2b30 0%, #141416 55%, #060607 100%)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,255,255,0.06)',
        position: 'relative',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 80, overflow: 'hidden', background: CHAT_BG, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <StatusBar />
          <Header accent={accent} />
          <ChatView time={time} />
          <InputBar />
          <Sheet time={time} />
          <BrandClose time={time} accent={accent} slogan={slogan} />
          {/* dynamic island */}
          <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 128, height: 34, background: '#000', borderRadius: 20, zIndex: 5 }} />
        </div>
      </div>
    </div>
  );
}

// ── Brand close (rendered INSIDE the phone screen) ───────────────────────────
function BrandClose({ time, accent, slogan }) {
  const local = time - (CLOSE_START + 0.15);
  if (local < -0.3) return null;
  const appear = clamp(local / 0.6, 0, 1);
  const logoT = easeOutBack(clamp(local / 0.8, 0, 1));
  const sloT = clamp((local - 0.45) / 0.7, 0, 1);
  const ctaT = clamp((local - 0.9) / 0.7, 0, 1);
  const pulse = 0.5 + 0.5 * Math.sin(time * 1.1);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: appear, background: '#07090b', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 880, height: 880, borderRadius: '50%', background: `radial-gradient(circle, rgba(242,101,34,${0.24 + pulse * 0.07}) 0%, rgba(242,101,34,0.06) 40%, transparent 64%)` }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <div style={{ width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 70%)`, position: 'absolute', top: -24, filter: 'blur(8px)' }} />
        <img src="logo.png" alt="PidemeYa" style={{
          width: 460, maxWidth: '74%', display: 'block',
          transform: `scale(${0.9 + 0.1 * logoT})`, opacity: clamp(local / 0.5, 0, 1),
          filter: 'drop-shadow(0 6px 30px rgba(242,101,34,0.35)) brightness(1.18) contrast(1.02)',
        }} />
        <div style={{
          marginTop: 26, color: '#f3ede7', fontSize: 27, fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', textAlign: 'center', opacity: sloT, transform: `translateY(${(1 - sloT) * 14}px)`, padding: '0 30px',
        }}>
          {slogan || 'AUTOMATIZA · ORGANIZA · ENTREGA MEJOR'}
        </div>
        <div style={{
          marginTop: 46, display: 'flex', alignItems: 'center', gap: 14,
          background: GREEN, color: '#063', padding: '16px 30px', borderRadius: 50,
          fontSize: 26, fontWeight: 700, opacity: ctaT, transform: `translateY(${(1 - ctaT) * 16}px) scale(${0.94 + 0.06 * ctaT})`,
          boxShadow: '0 14px 40px rgba(37,211,102,0.35)', color: '#053a1c',
        }}>
          <span style={{ fontSize: 26 }}>💬</span>
          <span>Pídelo por WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
function ChatCommercial(props) {
  const accent = props.accent || ACCENT;
  const slogan = props.slogan;
  const transparent = props.transparent !== false && props.transparent !== 'false';
  const time = useTime();

  const closeProg = clamp((time - CLOSE_START) / 0.7, 0, 1);
  const phoneOpacity = 1 - closeProg;
  const phoneScale = 1 - 0.07 * easeInCubic(closeProg);
  const glow = 0.5 + 0.5 * Math.sin(time * 0.8);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'transparent', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ambient orange glow behind phone */}
      {!transparent ? <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 1150, height: 1500, borderRadius: '50%', background: `radial-gradient(ellipse at center, rgba(242,101,34,${0.16 + glow * 0.05}) 0%, rgba(242,101,34,0.04) 40%, transparent 66%)` }} /> : null}
      {!transparent ? <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(140% 100% at 50% 120%, rgba(242,101,34,0.06), transparent 55%)' }} /> : null}
      <Phone time={time} accent={accent} opacity={1} scale={1} slogan={slogan} />
    </div>
  );
}

window.ChatCommercial = ChatCommercial;

export { ChatCommercial };
export default ChatCommercial;
