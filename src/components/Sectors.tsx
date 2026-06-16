import ScrollReveal from './ScrollReveal';

const sectors = [
  {
    title: "Licorerías y Bodegas",
    description: "Bot de atención nocturna 24/7 para pedidos express de bebidas, pasarelas de cobro digital integradas y control de inventario instantáneo.",
    icon: "wine_bar"
  },
  {
    title: "Restaurantes y Cafés",
    description: "Catálogo digital visual interactivo en WhatsApp, envío de pedidos automáticos y optimización del flujo de comandas directo a cocina.",
    icon: "restaurant"
  },
  {
    title: "Distribuidoras de Gas y Agua",
    description: "Validación exacta de ubicación GPS de clientes, cálculo de costos de envío automático y asignación inteligente de rutas para tus repartidores.",
    icon: "water_drop"
  }
];

export default function Sectors() {
  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface px-6" id="sectores">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-xl">
              <div className="speed-line w-12 mb-6 bg-primary-container h-1 rounded-full"></div>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6 tracking-tight">
                Sectores en los que <span className="text-primary-container italic">automatizamos</span>
              </h2>
              <p className="text-on-surface/60 font-body text-base md:text-lg">
                Creamos soluciones personalizadas para potenciar la eficiencia y multiplicar las ventas de tu negocio.
              </p>
            </div>
            <div className="font-headline text-8xl text-on-surface/5 select-none hidden lg:block uppercase tracking-widest">SECTORS</div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sectors.map((sector, idx) => (
            <ScrollReveal key={idx} delay={0.1 * (idx + 1)}>
              <div 
                className="bg-surface-container/60 hover:bg-surface-container/80 hover:-translate-y-2 backdrop-blur-md border border-on-surface/5 p-8 group transition-all duration-300 rounded-3xl shadow-xl flex flex-col h-full justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-on-surface/5 border border-on-surface/10 flex items-center justify-center mb-8 group-hover:border-primary-container group-hover:bg-primary-container/5 transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-3xl group-hover:scale-110 transition-transform">
                      {sector.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-3xl text-on-surface mb-4 group-hover:text-primary-container transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-on-surface/60 font-body text-sm md:text-base leading-relaxed">
                    {sector.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-on-surface/5 flex items-center gap-2 text-primary-container/40 group-hover:text-primary-container transition-colors text-xs font-label uppercase tracking-wider font-bold">
                  <span>Solución Optimizada</span>
                  <div className="h-px flex-grow bg-current opacity-20"></div>
                  <span className="material-symbols-outlined text-sm">verified</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
