import { HashLink } from "react-router-hash-link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import N8nFlowAnimationHero from "./N8nFlowAnimationHero";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      const words = headlineRef.current.querySelectorAll(".word-wrapper");

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Initial states
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
      }).to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.8",
      );

      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.6",
        );
      }
    },
    { scope: container },
  );

  // Magnetic button effect (Enhanced)
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    gsap.to(el, {
      x: distanceX * 0.35,
      y: distanceY * 0.35,
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20"
      ref={container}
    >
      {/* Animación 3D isométrica de n8n actuando como fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90 dark:opacity-100 transition-opacity duration-500">
        <N8nFlowAnimationHero />
      </div>

      {/* Máscara de legibilidad central radial para integrar en modo claro y oscuro */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 46%, var(--color-surface, var(--color-background, #131313)) 92%)",
          backdropFilter: "blur(0.5px)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center text-center">
        <h1
          ref={headlineRef}
          className="font-headline text-4xl sm:text-6xl md:text-8xl text-on-surface leading-[1.1] md:leading-[1.0] max-w-5xl mb-8 md:mb-12 tracking-tight md:tracking-tighter will-change-transform"
        >
          {splitWords("Automatizamos tu WhatsApp,")}
          <br className="hidden md:block" />
          {splitWords("para responder ", true)} {splitWords("a todos tus")}{" "}
          {splitWords("clientes", true, true)}
        </h1>

        <p
          ref={textRef}
          className="font-body text-on-surface/70 text-lg md:text-2xl max-w-2xl leading-relaxed will-change-transform"
        >
          Tu bot de WhatsApp responde, registra el pedido y avisa al repartidor{" "}
          <span className="text-on-surface font-semibold">solo</span>. Vende 24/7 sin
          contestar un mensaje a mano.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <div className="w-full pt-15 sm:w-auto transform-gpu">
            <a
              href="https://wa.me/51904773671?text=Hola%2C%20quiero%20una%20demo%20del%20sistema%20de%20automatizaci%C3%B3n%20de%20pedidos%20por%20WhatsApp%20de%20PidemeYa."
              target="_blank"
              rel="noreferrer"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="font-button bg-primary-container text-on-primary text-lg md:text-xl px-10 md:px-14 py-4 md:py-6 font-bold rounded-2xl shadow-[0px_20px_40px_rgba(251,101,10,0.3)] hover:shadow-[0px_30px_60px_rgba(251,101,10,0.5)] transition-shadow duration-300 text-center flex items-center justify-center w-full relative overflow-hidden"
            >
              Solicitar demo
            </a>
          </div>

          <div className="w-full pt-15 sm:w-auto transform-gpu">
            <HashLink
              smooth
              to="/#demo"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="font-button bg-secondary-container text-on-secondary text-lg md:text-xl px-10 md:px-14 py-4 md:py-6 font-bold rounded-2xl shadow-lg text-center flex items-center justify-center border border-on-surface/5 hover:bg-on-surface/10 transition-colors duration-300 w-full"
            >
              Ver Funcionalidades
            </HashLink>
          </div>
        </div>

        {/* Métricas de valor */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl w-full">
          {[
            { value: "<5s", label: "Respuesta al cliente" },
            { value: "24/7", label: "Ventas activas" },
            { value: "0", label: "Pedidos perdidos" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center">
              <span className="font-headline font-black text-3xl md:text-5xl text-primary-container tracking-tight">
                {m.value}
              </span>
              <span className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest mt-2">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
