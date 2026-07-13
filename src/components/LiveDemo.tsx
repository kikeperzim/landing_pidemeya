// LiveDemo — native React port of the "PidemeYa · Demo en vivo" player.
//
// Shows the three synchronised views of the system (Admin dashboard, Repartidor
// app, Cliente WhatsApp chat) inside a mock player with a play/pause button and a
// scrubber. A single MASTER clock drives everything:
//   • window.__pyMaster = { time, progress, duration, playing }  — source of truth
//   • window.__pyMap(masterTime, key) — maps master seconds → each view's local time
// Each view reads these globals (Stage/ChatCommercial via the Stage timeline,
// RepartidorDemo + the <gestion-pedidos> web component read them directly), so one
// timeline keeps the whole scene in lockstep and loops together.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Stage } from './animations.jsx';
import ChatCommercial from './ChatCommercial.jsx';
import RepartidorDemo from './RepartidorDemo.jsx';
import GestionPedidosAdmin from './demo/GestionPedidosAdmin';

const ACCENT = '#F26522';
const DURATION = 58; // master seconds

// master seconds → local time per view. Anchored to each animation's real beats.
// (admin values are in milliseconds, its own internal unit.)
const MAPS: Record<string, number[][]> = {
  'pidemeya-cliente': [[0, 0], [26, 40.3], [30, 44.5], [58, 44.5]],
  'pidemeya-demo': [[0, 3.0], [26, 3.1], [30, 7.0], [52, 30.95], [55, 33.0], [58, 33.0]],
  admin: [[0, 0], [26, 1900], [30, 5200], [49, 5700], [52.5, 8900], [58, 9100]],
};

function pyMap(mt: number, key: string): number | null {
  const kf = MAPS[key];
  if (!kf) return null;
  if (mt <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) {
    if (mt <= kf[i][0]) {
      const [t0, v0] = kf[i - 1];
      const [t1, v1] = kf[i];
      const r = t1 === t0 ? 0 : (mt - t0) / (t1 - t0);
      return v0 + (v1 - v0) * r;
    }
  }
  return kf[kf.length - 1][1];
}

function fmt(s: number) {
  s = Math.max(0, Math.floor(s));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

export default function LiveDemo() {
  const [playing, setPlaying] = useState(true);

  const tRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const playingRef = useRef(true);

  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const laptopSlot = useRef<HTMLDivElement>(null);
  const dashScale = useRef<HTMLDivElement>(null);
  const repSlot = useRef<HTMLDivElement>(null);
  const repScale = useRef<HTMLDivElement>(null);

  const updateUI = useCallback(() => {
    const p = Math.min(1, tRef.current / DURATION);
    if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
    if (thumbRef.current) thumbRef.current.style.left = `${p * 100}%`;
    if (timeRef.current) timeRef.current.textContent = `${fmt(tRef.current)} / ${fmt(DURATION)}`;
    // publish the master clock the three views read
    const w = window as unknown as { __pyMaster?: Record<string, number | boolean> };
    const m = (w.__pyMaster = w.__pyMaster || {});
    m.progress = p;
    m.time = tRef.current;
    m.duration = DURATION;
    m.playing = playingRef.current;
  }, []);

  // install the shared master-map + a first UI paint
  useEffect(() => {
    (window as unknown as { __pyMap?: typeof pyMap }).__pyMap = pyMap;
    updateUI();
  }, [updateUI]);

  // master RAF clock
  useEffect(() => {
    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      if (playingRef.current) {
        tRef.current += dt;
        if (tRef.current >= DURATION) tRef.current %= DURATION; // synced loop
        updateUI();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateUI]);

  // scrubber drag
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) seekClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fit the fixed-size views (admin 1440-wide, repartidor 640-wide) into their slots
  useEffect(() => {
    const fit = () => {
      if (laptopSlot.current && dashScale.current) {
        dashScale.current.style.transform = `scale(${laptopSlot.current.clientWidth / 1440})`;
      }
      if (repSlot.current && repScale.current) {
        repScale.current.style.transform = `scale(${repSlot.current.clientWidth / 640})`;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (laptopSlot.current) ro.observe(laptopSlot.current);
    if (repSlot.current) ro.observe(repSlot.current);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  function seekClientX(x: number) {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (x - r.left) / r.width));
    tRef.current = ratio * DURATION;
    updateUI();
  }

  const togglePlay = () => {
    setPlaying((prev) => {
      const next = !prev;
      playingRef.current = next;
      lastRef.current = null;
      return next;
    });
  };

  const onTrackDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    seekClientX(e.clientX);
  };

  const chip = (): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
    padding: '5px 12px', borderRadius: 999,
    background: `color-mix(in oklab, ${ACCENT} 16%, #16161a)`,
    border: `1px solid color-mix(in oklab, ${ACCENT} 35%, transparent)`,
    fontSize: 10, fontWeight: 700, letterSpacing: '.6px', color: '#fff',
    textTransform: 'uppercase',
  });

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1360, margin: '0 auto' }}>
      {/* orange glow behind the frame */}
      <div style={{ position: 'absolute', inset: '-6% -4%', zIndex: 0, background: `radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, ${ACCENT} 45%, transparent), transparent 70%)`, filter: 'blur(70px)', animation: 'pulse-glow 6s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(180deg,#141417 0%,#0e0e11 100%)', border: '1px solid rgba(255,255,255,.07)', boxShadow: '0 1px 0 rgba(255,255,255,.05) inset, 0 40px 90px -30px rgba(0,0,0,.8), 0 0 0 1px rgba(0,0,0,.4)' }}>
        {/* title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.015)' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '0 auto', transform: 'translateX(-22px)' }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: ACCENT, boxShadow: `0 0 10px color-mix(in oklab, ${ACCENT} 70%, transparent)` }} />
            <span style={{ color: '#f2f2f4', fontSize: 13, fontWeight: 600 }}>PidemeYa</span>
            <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 13 }}>·</span>
            <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 13, fontWeight: 500 }}>Demo en vivo</span>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: '.4px', color: '#ff5f57', textTransform: 'uppercase' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', boxShadow: '0 0 8px #ff5f57' }} />REC
          </span>
        </div>

        {/* scene */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9.5', overflow: 'hidden', background: 'radial-gradient(80% 70% at 50% 30%, #1b1b20 0%, #0c0c0f 70%)' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%', background: `linear-gradient(180deg, transparent, color-mix(in oklab, ${ACCENT} 6%, transparent))`, pointerEvents: 'none' }} />

          {/* laptop — admin (protagonist) */}
          <div style={{ position: 'absolute', left: '50%', top: '4%', transform: 'translateX(-50%)', width: '48%', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: 12, ...chip(), background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', color: 'rgba(255,255,255,.78)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 1, background: ACCENT }} />
              <span>Vista del administrador</span>
            </div>
            <div style={{ width: '100%', padding: '11px 11px 12px', borderRadius: '14px 14px 6px 6px', background: 'linear-gradient(180deg,#2a2a30,#16161a)', border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 30px 60px -25px rgba(0,0,0,.9)' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0c0c0f', margin: '0 auto 8px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)' }} />
              <div ref={laptopSlot} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: 5, overflow: 'hidden', background: '#f4f5f9' }}>
                <div ref={dashScale} style={{ position: 'absolute', top: 0, left: 0, transformOrigin: 'top left', willChange: 'transform' }}>
                  <GestionPedidosAdmin />
                </div>
              </div>
            </div>
            <div style={{ width: '118%', height: 16, clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)', background: 'linear-gradient(180deg,#3a3a42,#1d1d22)', boxShadow: '0 18px 30px -12px rgba(0,0,0,.8)' }} />
            <div style={{ width: '16%', height: 5, marginTop: -16, borderRadius: '0 0 6px 6px', background: '#0c0c0f' }} />
          </div>

          {/* left phone — repartidor */}
          <div style={{ position: 'absolute', left: '3%', bottom: '7%', width: '21%', zIndex: 3, transform: 'rotate(-4deg)', transformOrigin: 'bottom center' }}>
            <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12, zIndex: 4, ...chip() }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
              <span>Vista del repartidor</span>
            </div>
            <div style={{ position: 'absolute', left: '6%', right: '6%', top: '3%', bottom: '-3%', borderRadius: 30, background: 'rgba(0,0,0,.6)', filter: 'blur(26px)', zIndex: 0, pointerEvents: 'none' }} />
            {/* scaled 640×1330 canvas */}
            <div ref={repSlot} style={{ position: 'relative', width: '100%', zIndex: 1 }}>
              <div style={{ width: '100%', paddingBottom: `${(1330 / 640) * 100}%` }} />
              <div ref={repScale} style={{ position: 'absolute', top: 0, left: 0, width: 640, height: 1330, transformOrigin: 'top left', willChange: 'transform' }}>
                <RepartidorDemo />
              </div>
            </div>
          </div>

          {/* right phone — cliente */}
          <div style={{ position: 'absolute', right: '3%', bottom: '7%', width: '21%', zIndex: 3, transform: 'rotate(4deg)', transformOrigin: 'bottom center' }}>
            <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12, zIndex: 4, ...chip() }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
              <span>Vista del cliente</span>
            </div>
            <div style={{ position: 'absolute', left: '6%', right: '6%', top: '3%', bottom: '-3%', borderRadius: 30, background: 'rgba(0,0,0,.6)', filter: 'blur(26px)', zIndex: 0, pointerEvents: 'none' }} />
            {/* canvas sized to the phone (770×1636) so no empty margin shrinks the UI */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '770 / 1636', zIndex: 1 }}>
              <Stage width={770} height={1636} duration={52} background="transparent" controls={false} loop persistKey="pidemeya-cliente">
                <ChatCommercial accent={ACCENT} transparent />
              </Stage>
            </div>
          </div>
        </div>

        {/* controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 22px', borderTop: '1px solid rgba(255,255,255,.06)', background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.2))' }}>
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'} style={{ flex: 'none', width: 46, height: 46, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ACCENT, boxShadow: `0 6px 20px -4px color-mix(in oklab, ${ACCENT} 75%, transparent)` }}>
            {playing ? (
              <span style={{ display: 'flex', gap: 4 }}>
                <span style={{ width: 4, height: 15, background: '#fff', borderRadius: 1 }} />
                <span style={{ width: 4, height: 15, background: '#fff', borderRadius: 1 }} />
              </span>
            ) : (
              <span style={{ display: 'block', width: 0, height: 0, borderStyle: 'solid', borderWidth: '8px 0 8px 13px', borderColor: 'transparent transparent transparent #fff', marginLeft: 3 }} />
            )}
          </button>

          <div onPointerDown={onTrackDown} style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div ref={trackRef} style={{ position: 'relative', width: '100%', height: 6, borderRadius: 999, background: 'rgba(255,255,255,.13)' }}>
              <div ref={fillRef} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '0%', borderRadius: 999, background: ACCENT }} />
              <div ref={thumbRef} style={{ position: 'absolute', left: '0%', top: '50%', width: 15, height: 15, borderRadius: '50%', background: '#fff', transform: 'translate(-50%,-50%)', boxShadow: '0 2px 6px rgba(0,0,0,.5)' }} />
            </div>
          </div>

          <span ref={timeRef} style={{ flex: 'none', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.72)', letterSpacing: '.5px', minWidth: 96, textAlign: 'right' }}>00:00 / 00:58</span>
        </div>
      </div>
    </div>
  );
}
