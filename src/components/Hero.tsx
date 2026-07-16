import { HashLink } from "react-router-hash-link";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import N8nFlowAnimationHero from "./N8nFlowAnimationHero";

const AUTO_ADVANCE_MS = 10000;
const SLIDE_COUNT = 3;

const slideMeta = [
  { label: "La promesa" },
  { label: "El motor" },
  { label: "Tu rubro" },
];

// Sectores destacados para el slide 3 (versión compacta del bloque Sectores)
const sectors = [
  {
    title: "Licorerías",
    line: "Pedidos express 24/7 con horario nocturno y stock en vivo.",
    icon: "wine_bar",
  },
  {
    title: "Restaurantes",
    line: "Catálogo por categorías y toma de pedidos automática.",
    icon: "restaurant",
  },
  {
    title: "Distribuidoras de Agua",
    line: "Cobertura por distrito con costo de envío automático.",
    icon: "water_drop",
  },
  {
    title: "Distribuidoras de Gas",
    line: "GPS del cliente y aviso instantáneo a tus repartidores.",
    icon: "propane_tank",
  },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // La animación n8n se monta la primera vez que su slide se activa: así se
  // inicializa mientras es visible (getTotalLength/getPointAtLength necesitan
  // que el SVG no esté oculto). Luego permanece montada y se pausa con `playing`.
  const [n8nMounted, setN8nMounted] = useState(false);

  useEffect(() => {
    if (active === 1) setN8nMounted(true);
  }, [active]);

  const goTo = useCallback((i: number) => {
    setActive(((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);
  const next = useCallback(() => setActive((p) => (p + 1) % SLIDE_COUNT), []);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + SLIDE_COUNT) % SLIDE_COUNT),
    [],
  );

  // Auto-avance con control manual: el temporizador se reinicia al cambiar de
  // slide o al pausar (hover / foco), evitando saltos bruscos.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(next, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, next]);

  // Entrada del slide 1 (solo en el primer render).
  useGSAP(
    () => {
      if (!headlineRef.current) return;
      const words = headlineRef.current.querySelectorAll(".word-wrapper");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      gsap.set(words, { y: "110%", opacity: 0 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current.children, { y: 20, opacity: 0 });
      }

      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        delay: 0.5,
      }).to(textRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current.children,
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        );
      }
    },
    { scope: container },
  );

  // Magnetic button effect
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    gsap.to(el, {
      x: (e.clientX - centerX) * 0.35,
      y: (e.clientY - centerY) * 0.35,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const splitWords = (text: string, highlight?: boolean, italic?: boolean) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]"
      >
        <span
          className={`inline-block word-wrapper ${highlight ? "text-primary-container" : ""} ${italic ? "italic" : ""} whitespace-pre`}
        >
          {word}{" "}
        </span>
      </span>
    ));
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
      ref={container}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Presentación de PidemeYa"
    >
      {/* ============ SLIDES ============ */}

      {/* Slide 1 — La promesa */}
      <SlideShell active={active === 0}>
        {/* Scrim radial suave para legibilidad del texto sobre el mesh */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 45%, color-mix(in srgb, var(--color-surface) 55%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <h1
            ref={headlineRef}
            className="font-headline text-3xl sm:text-5xl md:text-7xl text-on-surface leading-[1.08] md:leading-[1.0] max-w-5xl mb-4 md:mb-6 tracking-tight md:tracking-tighter will-change-transform"
          >
            {splitWords("Automatizamos tu WhatsApp,")}
            <br className="hidden md:block" />
            {splitWords("para responder ", true)} {splitWords("a todos tus")}{" "}
            {splitWords("clientes", true, true)}
          </h1>

          <p
            ref={textRef}
            className="font-body text-on-surface/70 text-base md:text-xl max-w-2xl leading-relaxed will-change-transform"
          >
            Tu bot de WhatsApp responde, registra el pedido y avisa al
            repartidor{" "}
            <span className="text-on-surface font-semibold">solo</span>. Vende
            24/7 sin contestar un mensaje a mano.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto px-6 sm:px-0 mt-6 md:mt-8"
          >
            <div className="w-full sm:w-auto transform-gpu">
              <a
                href="https://wa.me/51904773671?text=Hola%2C%20quiero%20una%20demo%20del%20sistema%20de%20automatizaci%C3%B3n%20de%20pedidos%20por%20WhatsApp%20de%20PidemeYa."
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="font-button bg-primary-container text-on-primary text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 font-bold rounded-2xl shadow-[0px_20px_40px_rgba(251,101,10,0.3)] hover:shadow-[0px_30px_60px_rgba(251,101,10,0.5)] transition-shadow duration-300 text-center flex items-center justify-center w-full relative overflow-hidden"
              >
                Solicitar demo
              </a>
            </div>

            <div className="w-full sm:w-auto transform-gpu">
              <HashLink
                smooth
                to="/#demo"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="font-button bg-secondary-container text-on-secondary text-base md:text-lg px-8 md:px-12 py-3.5 md:py-4 font-bold rounded-2xl shadow-lg text-center flex items-center justify-center border border-on-surface/5 hover:bg-on-surface/10 transition-colors duration-300 w-full"
              >
                Ver Funcionalidades
              </HashLink>
            </div>
          </div>

          {/* Métricas de valor */}
          <div className="mt-8 md:mt-10 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl w-full">
            {[
              { value: "<5s", label: "Respuesta al cliente" },
              { value: "24/7", label: "Ventas activas" },
              { value: "0", label: "Pedidos perdidos" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center text-center"
              >
                <span className="font-headline font-black text-2xl md:text-4xl text-primary-container tracking-tight">
                  {m.value}
                </span>
                <span className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>

      {/* Slide 2 — El motor (flujo n8n) */}
      <SlideShell active={active === 1}>
        {/* La animación llena el slide */}
        <div className="absolute inset-0 z-0 opacity-90 dark:opacity-100 transition-opacity duration-500">
          {n8nMounted && <N8nFlowAnimationHero playing={active === 1} />}
        </div>

        {/* Copy superior con scrim para legibilidad */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none h-[55%]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-surface) 78%, transparent) 0%, transparent 100%)",
          }}
        />
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center -mt-[30vh] md:-mt-[34vh]">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-0.5 w-8 bg-primary-container rounded-full" />
            <span className="font-label text-primary-container tracking-widest uppercase text-[10px] md:text-xs">
              Así trabaja por ti
            </span>
            <span className="h-0.5 w-8 bg-primary-container rounded-full" />
          </div>
        </div>
      </SlideShell>

      {/* Slide 3 — Para tu rubro */}
      <SlideShell active={active === 2}>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 45%, color-mix(in srgb, var(--color-surface) 55%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-0.5 w-8 bg-primary-container rounded-full" />
            <span className="font-label text-primary-container tracking-widest uppercase text-[10px] md:text-xs">
              Para tu rubro
            </span>
            <span className="h-0.5 w-8 bg-primary-container rounded-full" />
          </div>
          <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl text-on-surface leading-[1.05] max-w-4xl tracking-tight md:tracking-tighter mb-8 md:mb-10">
            Hecho a la medida de{" "}
            <span className="text-primary-container italic">tu negocio</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full">
            {sectors.map((s) => (
              <div
                key={s.title}
                className="bg-surface-container/60 backdrop-blur-md border border-on-surface/5 rounded-3xl p-5 md:p-7 flex flex-col items-center text-center shadow-xl transition-transform duration-300 hover:-translate-y-2"
              >
                <span className="material-symbols-outlined text-primary-container text-4xl md:text-5xl mb-3 md:mb-5">
                  {s.icon}
                </span>
                <h3 className="font-headline text-lg md:text-2xl text-on-surface mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="font-body text-on-surface/60 text-xs md:text-sm leading-relaxed hidden sm:block">
                  {s.line}
                </p>
              </div>
            ))}
          </div>

          <HashLink
            smooth
            to="/#sectores"
            className="font-button text-primary-container font-bold tracking-widest text-xs uppercase mt-10 inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Ver Detalles{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </HashLink>
        </div>
      </SlideShell>

      {/* ============ CONTROLES ============ */}

      {/* Flechas laterales */}
      <button
        type="button"
        onClick={prev}
        aria-label="Anterior"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-surface-container/50 backdrop-blur-md border border-on-surface/10 text-on-surface/70 hover:text-on-surface hover:bg-surface-container/80 transition-colors"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-surface-container/50 backdrop-blur-md border border-on-surface/10 text-on-surface/70 hover:text-on-surface hover:bg-surface-container/80 transition-colors"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Indicadores (puntos + progreso) */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slideMeta.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a: ${s.label}`}
            aria-current={active === i}
            className="group relative h-2.5 flex items-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-500 ${
                active === i
                  ? "w-10 bg-primary-container"
                  : "w-2.5 bg-on-surface/25 group-hover:bg-on-surface/45"
              }`}
            >
              {active === i && !paused && (
                <span
                  key={active}
                  className="block h-full rounded-full bg-on-primary/40"
                  style={{
                    animation: `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* Contenedor de cada slide: apilado y con crossfade. Se mantiene montado
   (visibility en vez de display) para no reiniciar la animación n8n ni
   perder las mediciones de tamaño. */
function SlideShell({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-2 pt-28 md:pt-36 pb-8 md:pb-10 transition-all duration-700 ease-out ${
        active
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}
