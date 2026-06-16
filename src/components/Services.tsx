import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface px-6" id="servicios">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-xl">
              <div className="speed-line w-12 mb-6 bg-primary-container h-1 rounded-full"></div>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6 tracking-tight">
                Nuestra maestría <span className="text-primary-container">digital</span>
              </h2>
              <p className="text-on-surface/60 font-body text-base md:text-lg">
                Soluciones arquitectónicas diseñadas para la eficiencia y el alto rendimiento comercial.
              </p>
            </div>
            <div className="font-headline text-8xl text-on-surface/5 select-none hidden lg:block uppercase tracking-widest">SERVICES</div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Service 1 - Sistema Web */}
          <ScrollReveal delay={0.1}>
            <div 
              className="bg-surface-container/60 hover:bg-surface-container/80 hover:-translate-y-2 backdrop-blur-md border border-on-surface/5 p-8 group transition-all duration-300 relative overflow-hidden rounded-3xl shadow-xl flex flex-col justify-between h-full"
            >
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary-container text-5xl mb-8 group-hover:scale-110 transition-transform">language</span>
                <h3 className="font-headline text-3xl text-on-surface mb-4">Sistema Web Premium</h3>
                <p className="text-on-surface/60 font-body text-sm md:text-base leading-relaxed">
                  Interfaces minimalistas que priorizan la conversión y la experiencia de usuario de élite para tu rubro.
                </p>
              </div>
              <div className="mt-12 relative z-10">
                <Link
                  to="/proyectos"
                  className="font-button text-primary-container font-bold tracking-widest text-xs uppercase group-hover:translate-x-2 transition-transform inline-flex items-center gap-2"
                >
                  Explorar detalles <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="absolute bottom-[-10%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[180px]">devices</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Service 2 - Ventas WhatsApp */}
          <ScrollReveal delay={0.2}>
            <div 
              className="bg-surface-container/60 hover:bg-surface-container/80 hover:-translate-y-2 backdrop-blur-md border border-on-surface/5 p-8 group transition-all duration-300 rounded-3xl shadow-xl flex flex-col h-full"
            >
              <span className="material-symbols-outlined text-primary-container text-5xl mb-8 group-hover:scale-110 transition-transform">forum</span>
              <h3 className="font-headline text-3xl text-on-surface mb-4">Ventas por WhatsApp</h3>
              <p className="text-on-surface/60 font-body text-sm md:text-base leading-relaxed">
                Automatización de pedidos por WhatsApp para tus ventas de comidas, bebidas o balones, operando 24/7 con horarios personalizados.
              </p>
            </div>
          </ScrollReveal>

          {/* Service 3 - Logística Smart */}
          <ScrollReveal delay={0.3}>
            <div 
              className="bg-surface-container/60 hover:bg-surface-container/80 hover:-translate-y-2 backdrop-blur-md border border-on-surface/5 p-8 group transition-all duration-300 rounded-3xl shadow-xl flex flex-col h-full"
            >
              <span className="material-symbols-outlined text-primary-container text-5xl mb-8 group-hover:scale-110 transition-transform">water_drop</span>
              <h3 className="font-headline text-3xl text-on-surface mb-4">Logística Smart</h3>
              <p className="text-on-surface/60 font-body text-sm md:text-base leading-relaxed">
                Control de inventario, stock y despachos optimizados para el reparto a domicilio y delivery eficiente.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
