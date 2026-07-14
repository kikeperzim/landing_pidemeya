import React, { useEffect, useRef, useState } from 'react';

// Easing helper
const elasticOut = (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
};

// Hex to RGBA helper
const rgba = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
};

// Rounded Manhattan path builder
const roundedPath = (pts: number[][], r: number) => {
  const p: number[][] = [];
  for (const q of pts) {
    const last = p[p.length - 1];
    if (!last || Math.hypot(q[0] - last[0], q[1] - last[1]) > 2) p.push(q);
  }
  if (p.length < 2) return '';
  let d = `M ${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const a = p[i - 1], b = p[i], c = p[i + 1];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const actualL2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
    const rr = Math.min(r, l1 / 2, actualL2 / 2);
    const v1 = [(b[0] - a[0]) / l1, (b[1] - a[1]) / l1];
    const v2 = [(c[0] - b[0]) / actualL2, (c[1] - b[1]) / actualL2];
    d += ` L ${b[0] - v1[0] * rr} ${b[1] - v1[1] * rr} Q ${b[0]} ${b[1]} ${b[0] + v2[0] * rr} ${b[1] + v2[1] * rr}`;
  }
  const last = p[p.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
};

interface NodeData {
  id: number;
  name: string;
  color: string;
  cx: number;
  cy: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isBig?: boolean;
}

export default function N8nFlowAnimationHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const trailSoftRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  // Arrays de referencias para los elementos de los nodos
  const liftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detección dinámica de modo oscuro (el modo claro se activa con la clase 'light')
  const [isDark, setIsDark] = useState(() => !document.documentElement.classList.contains('light'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const nodes: NodeData[] = [
    {
      id: 0,
      name: "WhatsApp",
      color: "#25D366",
      cx: 351,
      cy: 265,
      title: "WhatsApp",
      subtitle: "El cliente escribe",
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" style={{ color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
        </svg>
      )
    },
    {
      id: 1,
      name: "n8n",
      color: "#FF5A3C",
      cx: 741,
      cy: 259,
      title: "n8n",
      subtitle: "Motor de automatización",
      icon: (
        <svg width="58" height="58" viewBox="0 0 24 24" style={{ color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
          <path fill="currentColor" d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"></path>
        </svg>
      )
    },
    {
      id: 2,
      name: "Bot IA",
      color: "#22D3EE",
      cx: 724,
      cy: 660,
      title: "Bot IA",
      subtitle: "Responde, valida zona y arma el pedido",
      icon: (
        <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
          <rect x="4.5" y="8" width="15" height="11" rx="3"></rect>
          <path d="M12 4.6V8"></path>
          <circle cx="12" cy="3.5" r="1.3"></circle>
          <path d="M9.7 13v1.4M14.3 13v1.4"></path>
          <path d="M3 13v3M21 13v3"></path>
        </svg>
      )
    },
    {
      id: 3,
      name: "Despacho",
      color: "#5EEAD4",
      cx: 1136,
      cy: 632,
      title: "Despacho",
      subtitle: "Asigna repartidor + Google Maps",
      icon: (
        <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
          <path d="m18 14-1-3"></path>
          <path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81"></path>
          <path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5"></path>
          <circle cx="19" cy="17" r="3"></circle>
          <circle cx="5" cy="17" r="3"></circle>
        </svg>
      )
    },
    {
      id: 4,
      name: "Entrega",
      color: "#F472B6",
      cx: 1107,
      cy: 1021,
      title: "Entrega",
      subtitle: "Pedido confirmado · Pago Yape/Plin",
      isBig: true,
      icon: (
        <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}>
          <path d="M12 22V12"></path>
          <path d="m16 17 2 2 4-4"></path>
          <path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"></path>
          <path d="M3.29 7 12 12l8.71-5"></path>
          <path d="m7.5 4.27 8.997 5.148"></path>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const stage = stageRef.current;
    const trail = trailRef.current;
    const trailSoft = trailSoftRef.current;
    const comet = cometRef.current;
    const head = headRef.current;
    if (!stage || !trail || !trailSoft || !comet || !head) return;

    // Configurar color de acento
    const accentColor = '#F26522';
    trail.setAttribute('stroke', accentColor);
    trailSoft.setAttribute('stroke', accentColor);

    // Calcular la ruta
    const W = nodes.map(n => [n.cx, n.cy]);
    const pts = [[-280, W[0][1]], W[0]];
    for (let i = 1; i < W.length; i++) {
      const a = W[i - 1];
      const b = W[i];
      const mx = (a[0] + b[0]) / 2;
      pts.push([mx, a[1]], [mx, b[1]], b);
    }
    const last = W[W.length - 1];
    pts.push([1900, last[1]]);

    const d = roundedPath(pts, 34);
    trail.setAttribute('d', d);
    trailSoft.setAttribute('d', d);
    comet.setAttribute('d', d);

    const L = trail.getTotalLength();
    const cometLength = 200;

    // Calcular la fracción de la curva para cada nodo
    const nodeFractions = nodes.map(n => {
      let best = Infinity;
      let bl = 0;
      const SAMP = 800;
      for (let i = 0; i <= SAMP; i++) {
        const len = (i / SAMP) * L;
        const pt = trail.getPointAtLength(len);
        const dd = Math.pow(pt.x - n.cx, 2) + Math.pow(pt.y - n.cy, 2);
        if (dd < best) {
          best = dd;
          bl = len;
        }
      }
      return bl / L;
    });

    let scaleFactor = 1;

    // Función de ajuste de escala y posicionamiento
    const fit = () => {
      const parent = stage.parentElement;
      if (!parent) return;
      scaleFactor = Math.min(parent.clientWidth / 1920, parent.clientHeight / 1080);
      stage.style.transform = `translate(-50%,-50%) scale(${scaleFactor})`;
      placeLabels();
    };

    const placeLabels = () => {
      const s = stage.getBoundingClientRect();
      // Escala real derivada del propio rect del escenario. No se usa `scaleFactor`
      // porque las transformaciones 3D anidadas hacen que getBoundingClientRect
      // no refleje siempre la escala exterior; esto se autocorrige en cualquier caso.
      const actualScale = s.width / 1920 || 1;
      nodes.forEach((_, i) => {
        const topEl = topRefs.current[i];
        const labelEl = labelRefs.current[i];
        if (!topEl || !labelEl) return;
        const r = topEl.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - s.left) / actualScale;
        const cy = (r.top + r.height / 2 - s.top) / actualScale;
        labelEl.style.left = `${cx}px`;
        labelEl.style.top = `${cy + 72}px`;
      });
    };

    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    // Recalcular cuando el escenario alcance su tamaño final (evita etiquetas
    // descolocadas si al primer render aún no tenía su escala definitiva).
    const ro = new ResizeObserver(() => fit());
    if (stage.parentElement) ro.observe(stage.parentElement);
    // Reintentos escalonados mientras se asienta el layout y cargan las fuentes.
    const t1 = setTimeout(fit, 100);
    const t2 = setTimeout(fit, 400);
    const t3 = setTimeout(fit, 1200);

    // Bucle de animación (requestAnimationFrame)
    const cycleDuration = 7000; // 7 segundos por ciclo
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = (elapsed % cycleDuration) / cycleDuration;
      const headLen = progressRatio * L;

      // Actualizar el cable y el cometa
      trail.style.strokeDasharray = `${Math.max(headLen, 0.001)} 100000`;
      trailSoft.style.strokeDasharray = `${Math.max(headLen, 0.001)} 100000`;
      comet.style.strokeDasharray = `${cometLength} 100000`;
      comet.style.strokeDashoffset = String(cometLength - headLen);

      const trailOp = progressRatio <= 0.002 ? 0 : (progressRatio < 0.88 ? Math.min(progressRatio * 22, 1) : Math.max(0, (1 - progressRatio) / 0.12));
      trail.style.opacity = String(trailOp * 0.95);
      trailSoft.style.opacity = String(trailOp * 0.65); // Mayor visibilidad de cable difuso
      comet.style.opacity = String(trailOp);

      const hp = trail.getPointAtLength(Math.max(0, Math.min(headLen, L)));
      head.setAttribute('cx', String(hp.x));
      head.setAttribute('cy', String(hp.y));
      head.style.opacity = String(trailOp);

      const fade = Math.max(0, Math.min((1 - progressRatio) / 0.1, 1));

      // Actualizar estados visuales de los nodos
      nodes.forEach((n, i) => {
        const x = progressRatio - nodeFractions[i];
        let level = 0;
        let peak = 0;

        if (x > 0) {
          const rw = 0.05;
          const rVal = Math.min(x / rw, 1);
          if (rVal < 1) {
            const e = elasticOut(rVal);
            level = e;
            peak = e;
          } else {
            const after = Math.min((x - rw) / 0.1, 1);
            const hold = 0.72 + Math.sin(now * 0.0024 + n.cx) * 0.05;
            level = (1 - after) + after * hold;
            peak = level;
          }
        }

        level *= fade;
        peak *= fade;
        const gl = Math.max(0, Math.min(level, 1));
        const liftVal = peak * 46 * (n.isBig ? 1.22 : 1);
        const tVal = Math.min(liftVal / 56, 1);

        const liftEl = liftRefs.current[i];
        const bandEl = bandRefs.current[i];
        const topEl = topRefs.current[i];
        const glowEl = glowRefs.current[i];
        const shadowEl = shadowRefs.current[i];
        const checkEl = checkRefs.current[i];
        const labelEl = labelRefs.current[i];

        if (liftEl) liftEl.style.transform = `translateZ(${6 + liftVal}px)`;
        if (bandEl) {
          bandEl.style.opacity = String(0.22 + 0.78 * gl);
          bandEl.style.boxShadow = `0 0 ${16 + 64 * gl}px ${rgba(n.color, 0.4 + 0.55 * gl)}, 0 0 ${6 + 24 * gl}px ${rgba(n.color, 0.55 + 0.45 * gl)}`;
        }
        if (topEl) {
          topEl.style.filter = `saturate(${0.35 + 0.65 * gl}) brightness(${0.72 + 0.28 * gl})`; // Mayor contraste en modo claro
          topEl.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,.85), inset 0 0 0 2px ${rgba(n.color, 0.35 + 0.65 * gl)}, 0 0 ${6 + 34 * gl}px ${rgba(n.color, 0.5 * gl)}`;
        }
        if (glowEl) {
          glowEl.style.opacity = String(0.16 + 0.7 * gl);
          glowEl.style.transform = `translate(-50%,-50%) translateZ(0.4px) scale(${1 + 0.45 * gl})`;
        }
        if (shadowEl) {
          shadowEl.style.transform = `translate(-50%,-50%) translateZ(0.2px) scale(${1 + 0.55 * tVal})`;
          shadowEl.style.opacity = String(0.5 - 0.26 * tVal);
          shadowEl.style.filter = `blur(${7 + 11 * tVal}px)`;
        }
        if (labelEl) {
          labelEl.style.opacity = String(Math.min(gl * 1.5, 1));
        }
        if (checkEl) {
          const cs = Math.max(0, (peak - 0.6) / 0.4);
          checkEl.style.opacity = String(Math.min(cs * 1.4, 1));
          const sc = cs <= 0 ? 0 : 0.4 + 0.6 * Math.min(cs, 1);
          checkEl.style.transform = `translate(18px,-58px) translateZ(54px) scale(${sc})`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', fit);
      window.removeEventListener('load', fit);
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent"
    >
      <style>{`
        @keyframes gridDrift { to { background-position: 72px 72px; } }
        @keyframes ambient { 0%,100% { opacity: .5; } 50% { opacity: .85; } }
      `}</style>
      
      <div
        ref={stageRef}
        className="absolute left-1/2 top-1/2 w-[1920px] h-[1080px] origin-center overflow-hidden transition-all duration-500"
        style={{
          background: isDark 
            ? 'radial-gradient(ellipse 75% 65% at 50% 40%, #0a1410 0%, #060a0c 55%, #000 100%)'
            : 'radial-gradient(ellipse 75% 65% at 50% 40%, rgba(242,101,34,0.06) 0%, rgba(37,211,102,0.03) 55%, rgba(255,255,255,0) 100%)',
        }}
      >
        {/* Ambient bloom */}
        <div
          className="absolute left-1/2 top-[30%] w-[1200px] h-[520px] -translate-x-1/2 pointer-events-none blur-[50px]"
          style={{
            background: isDark 
              ? 'radial-gradient(ellipse at center, rgba(45,212,160,.09), transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(45,212,160,.035), transparent 70%)',
            animation: 'ambient 9s ease-in-out infinite',
          }}
        />

        {/* ISO WORLD */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '2600px',
          }}
        >
          <div
            className="relative w-[1600px] h-[1120px]"
            style={{
              transform: 'rotateX(57deg) rotateZ(-45deg) scale(1.18)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Floor Grid */}
            <div
              className="absolute -left-[500px] -top-[500px] w-[2600px] h-[2600px]"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(rgba(120,255,205,.085) 1px,transparent 1px),linear-gradient(90deg,rgba(120,255,205,.085) 1px,transparent 1px)'
                  : 'linear-gradient(rgba(0,0,0,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.08) 1px,transparent 1px)',
                backgroundSize: '72px 72px',
                WebkitMaskImage: 'radial-gradient(ellipse 42% 42% at 50% 50%,#000 38%,transparent 82%)',
                maskImage: 'radial-gradient(ellipse 42% 42% at 50% 50%,#000 38%,transparent 82%)',
                animation: 'gridDrift 9s linear infinite',
              }}
            />

            {/* Cables / Pulse Trail */}
            <svg
              viewBox="0 0 1600 1120"
              className="absolute left-0 top-0 w-[1600px] h-[1120px] overflow-visible"
              style={{ transform: 'translateZ(1px)' }}
            >
              <defs>
                <filter id="pglow" x="-90%" y="-90%" width="280%" height="280%">
                  <feGaussianBlur stdDeviation="7" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={trailSoftRef}
                fill="none"
                strokeWidth="17"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pglow)"
                style={{ opacity: 0 }}
              />
              <path
                ref={trailRef}
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pglow)"
                style={{ opacity: 0 }}
              />
              <path
                ref={cometRef}
                fill="none"
                stroke="#FFC79A"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pglow)"
                style={{ opacity: 0 }}
              />
              <circle
                ref={headRef}
                cx="-400"
                cy="0"
                r="9"
                fill="#FFEDDD"
                filter="url(#pglow)"
                style={{ opacity: 0 }}
              />
            </svg>

            {/* Nodes */}
            {nodes.map((n, i) => (
              <div
                key={n.id}
                style={{
                  position: 'absolute',
                  left: `${n.cx}px`,
                  top: `${n.cy}px`,
                  width: 0,
                  height: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Real 3D shadow base */}
                <div
                  ref={el => { shadowRefs.current[i] = el; }}
                  className="absolute left-0 top-0 w-[158px] h-[158px] rounded-[30px]"
                  style={{
                    background: 'radial-gradient(closest-side, rgba(0,0,0,.6), transparent 72%)',
                    transform: 'translate(-50%, -50%) translateZ(0.2px)',
                    filter: 'blur(7px)',
                    opacity: 0.5,
                  }}
                />

                {/* Glow base */}
                <div
                  ref={el => { glowRefs.current[i] = el; }}
                  className="absolute left-0 top-0 w-[188px] h-[188px] rounded-[40px]"
                  style={{
                    background: `radial-gradient(closest-side, ${n.color}, transparent 70%)`,
                    transform: 'translate(-50%, -50%) translateZ(0.4px)',
                    opacity: 0.06,
                  }}
                />
                
                {/* 3D Lift container */}
                <div
                  ref={el => { liftRefs.current[i] = el; }}
                  className="absolute left-0 top-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(6px)',
                  }}
                >
                  {/* Bottom shadow base */}
                  <div
                    className="absolute left-0 top-0 w-[122px] h-[122px] rounded-[22px]"
                    style={{
                      background: 'linear-gradient(180deg,#d8dbdf,#494d53)',
                      boxShadow: '0 3px 7px rgba(0,0,0,.55)',
                      transform: 'translate(-50%, -50%) translateZ(0px)',
                    }}
                  />
                  {/* Glowing core band */}
                  <div
                    ref={el => { bandRefs.current[i] = el; }}
                    className="absolute left-0 top-0 w-[122px] h-[122px] rounded-[22px]"
                    style={{
                      background: n.color,
                      transform: 'translate(-50%, -50%) translateZ(15px)',
                      opacity: 0.12,
                    }}
                  />
                  {/* Glassmorphic Top Cap */}
                  <div
                    ref={el => { topRefs.current[i] = el; }}
                    className="absolute left-0 top-0 w-[122px] h-[122px] rounded-[22px] border border-white/55 flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(150deg,rgba(255,255,255,.34),rgba(255,255,255,.07))',
                      transform: 'translate(-50%, -50%) translateZ(31px)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8)',
                      filter: isDark ? 'saturate(.2) brightness(.62)' : 'saturate(.4) brightness(.85)', // Cap más visible en claro
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '22px', background: 'linear-gradient(135deg,rgba(255,255,255,.6) 0%,rgba(255,255,255,.08) 36%,transparent 58%)', pointerEvents: 'none' }} />
                    {n.icon}
                  </div>

                  {/* Success Badge (Solo para el nodo de entrega final) */}
                  {n.isBig && (
                    <div
                      ref={el => { checkRefs.current[i] = el; }}
                      className="absolute left-0 top-0 w-[40px] h-[40px] rounded-full bg-[#22c55e] flex items-center justify-center"
                      style={{
                        transform: 'translate(18px,-58px) translateZ(54px) scale(0)',
                        opacity: 0,
                        boxShadow: '0 0 18px #22c55e',
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5 10 17.5 19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* vignette / depth of field overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 66% 68% at 50% 45%, transparent 40%, rgba(0,0,0,.4) 78%, rgba(0,0,0,.72) 100%)'
              : 'radial-gradient(ellipse 66% 68% at 50% 45%, transparent 50%, rgba(255,255,255,.3) 82%, rgba(255,255,255,.65) 100%)'
          }}
        />

        {/* Screen-space Floating Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {nodes.map((n, i) => (
            <div
              key={n.id}
              ref={el => { labelRefs.current[i] = el; }}
              className="absolute -translate-x-1/2 w-[250px] text-center opacity-0 transition-opacity duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <div className={`font-bold text-[19px] tracking-tight drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] transition-colors duration-500 ${isDark ? 'text-white' : 'text-neutral-900 font-extrabold'}`}>
                {n.title}
              </div>
              <div className={`mt-1 font-medium text-[13.5px] leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)] transition-colors duration-500 ${isDark ? 'text-white/56' : 'text-neutral-600 font-semibold'}`}>
                {n.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
