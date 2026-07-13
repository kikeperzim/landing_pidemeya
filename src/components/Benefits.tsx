import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollReveal from "./ScrollReveal";
import BenefitsCard from "./BenefitsCard";

const benefits = [
  {
    title: "Ahorras Tiempo",
    description:
      "El sistema automatizado hace el trabajo pesado por ti, eliminando tareas manuales repetitivas.",
    icon: "schedule",
  },
  {
    title: "Atiendes más rápido",
    description:
      "Tus clientes reciben respuesta e interactúan con el bot de forma inmediata, 24/7.",
    icon: "bolt",
  },
  {
    title: "Menos Errores",
    description:
      "La ubicación GPS exacta llega al sistema, eliminando confusiones y retrasos en tus despachos de delivery.",
    icon: "gps_fixed",
  },
  {
    title: "Repartidores Eficientes",
    description:
      "Gestionan sus pedidos y rutas de reparto directamente desde su móvil sin llamadas ni pérdidas de tiempo.",
    icon: "moped",
  },
  {
    title: "Vendes Más",
    description:
      "Una mejor experiencia de usuario se traduce en clientes más felices y un mayor volumen de pedidos.",
    icon: "trending_up",
  },
];

export default function Benefits() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // Parallax image container
      gsap.to(imageContainerRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax blob
      gsap.to(blobRef.current, {
        y: 100,
        x: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      ref={container}
    >
      {/* Decorative background visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-container/20 to-transparent blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="lg:w-1/2">
            <ScrollReveal direction="right">
              <div className="speed-line w-12 mb-6 bg-primary-container h-1 rounded-full"></div>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-8 leading-tight tracking-tight">
                ¿Qué gana{" "}
                <span className="text-primary-container italic">
                  tu negocio?
                </span>
              </h2>
              <p className="text-on-surface/60 font-body text-lg mb-12 max-w-xl">
                Nuestra tecnología no solo automatiza, sino que transforma la
                rentabilidad y eficiencia de tu operación diaria.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => {
                const isActive = idx === active;
                return (
                  <ScrollReveal
                    key={idx}
                    delay={0.05 * (idx + 1)}
                    direction="right"
                  >
                    <div
                      className={`flex gap-6 group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "bg-primary-container/10 border-primary-container/20 translate-x-2"
                          : "border-transparent hover:translate-x-2"
                      }`}
                      onMouseEnter={() => setActive(idx)}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-primary-container border-primary-container text-white shadow-lg shadow-primary-container/30"
                            : "bg-on-surface/5 border-on-surface/10 group-hover:border-primary-container/50 text-primary-container"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-2xl transition-colors duration-300 ${
                            isActive ? "text-white" : "text-primary-container"
                          }`}
                        >
                          {benefit.icon}
                        </span>
                      </div>
                      <div>
                        <h3
                          className={`font-headline font-bold text-xl mb-1 transition-colors duration-300 ${
                            isActive
                              ? "text-primary-container"
                              : "text-on-surface group-hover:text-primary-container"
                          }`}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className={`text-sm max-w-md transition-colors duration-300 ${
                            isActive
                              ? "text-on-surface/75"
                              : "text-on-surface/50"
                          }`}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <div className="lg:w-1/2 pt-70 relative flex justify-center w-full">
            <div
              ref={imageContainerRef}
              className="will-change-transform w-full flex justify-center"
            >
              <ScrollReveal
                direction="left"
                distance={100}
                delay={0.4}
                className="w-full flex justify-center"
              >
                <BenefitsCard active={active} setActive={setActive} />
              </ScrollReveal>
            </div>

            {/* Abstract decorative elements with parallax */}
            <div
              ref={blobRef}
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/20 blur-3xl rounded-full animate-pulse-glow z-0"
            ></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-container/10 blur-3xl rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
