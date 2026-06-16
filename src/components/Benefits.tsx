import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollReveal from './ScrollReveal';

const benefits = [
  {
    title: "Ahorras Tiempo",
    description: "El sistema automatizado hace el trabajo pesado por ti, eliminando tareas manuales repetitivas.",
    icon: "schedule"
  },
  {
    title: "Atiendes más rápido",
    description: "Tus clientes reciben respuesta e interactúan con el bot de forma inmediata, 24/7.",
    icon: "bolt"
  },
  {
    title: "Menos Errores",
    description: "La ubicación GPS exacta llega al sistema, eliminando confusiones y retrasos en tus despachos de delivery.",
    icon: "gps_fixed"
  },
  {
    title: "Repartidores Eficientes",
    description: "Gestionan sus pedidos y rutas de reparto directamente desde su móvil sin llamadas ni pérdidas de tiempo.",
    icon: "moped"
  },
  {
    title: "Vendes Más",
    description: "Una mejor experiencia de usuario se traduce en clientes más felices y un mayor volumen de pedidos.",
    icon: "trending_up"
  }
];

export default function Benefits() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax image
    gsap.to(imageContainerRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
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
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" ref={container}>
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
                ¿Qué gana <span className="text-primary-container italic">tu negocio?</span>
              </h2>
              <p className="text-on-surface/60 font-body text-lg mb-12 max-w-xl">
                Nuestra tecnología no solo automatiza, sino que transforma la rentabilidad y eficiencia de tu operación diaria.
              </p>
            </ScrollReveal>
            
            <div className="space-y-8">
              {benefits.map((benefit, idx) => (
                <ScrollReveal key={idx} delay={0.1 * (idx + 1)} direction="right">
                  <div 
                    className="flex gap-6 group cursor-default hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-on-surface/5 border border-on-surface/10 flex items-center justify-center group-hover:border-primary-container transition-colors">
                      <span className="material-symbols-outlined text-primary-container text-2xl">
                        {benefit.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-on-surface font-bold text-xl mb-2 group-hover:text-primary-container transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-on-surface/50 text-sm max-w-md">{benefit.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div ref={imageContainerRef} className="will-change-transform">
              <ScrollReveal direction="left" distance={100} delay={0.4}>
                <div className="relative z-10 rounded-3xl overflow-hidden border border-on-surface/10 shadow-xl bg-surface-container/40 backdrop-blur-md p-2">
                  <img 
                    src="/benefits.webp" 
                    alt="Beneficios del sistema" 
                    className="w-full h-auto rounded-2xl opacity-90 hover:scale-105 transition-transform duration-1000"
                  />
                </div>
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

