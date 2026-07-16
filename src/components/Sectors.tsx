import ScrollReveal from "./ScrollReveal";

const sectors = [
  {
    title: "Licorerías",
    description:
      "Bot de atención 24/7 para pedidos express de bebidas, con horario nocturno personalizable, control de stock en tiempo real y pago flexible: Yape/Plin, tarjeta (POS) o efectivo.",
    icon: "wine_bar",
    image: "/licoreria.webp",
  },
  {
    title: "Restaurantes",
    description:
      "Catálogo visual por categorías en WhatsApp, toma de pedidos automática y gestión de pedidos en tiempo real desde el panel del administrador.",
    icon: "restaurant",
    image: "/restaurante.webp",
  },
  {
    title: "Distribuidoras de Agua",
    description:
      "Cobertura por distrito con cálculo automático del costo de envío, validación de ubicación GPS y pedidos a domicilio sin llamadas.",
    icon: "water_drop",
    image: "/agua.webp",
  },
  {
    title: "Distribuidoras de Gas",
    description:
      "Ubicación GPS exacta del cliente, aviso instantáneo a todos tus repartidores y seguimiento en vivo de la entrega con ruta y ETA en el mapa.",
    icon: "propane_tank",
    image: "/gas.webp",
  },
];

export default function Sectors() {
  return (
    <section
      className="py-20 md:py-32 bg-transparent text-on-surface px-6"
      id="sectores"
    >
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-xl">
              <div className="speed-line w-12 mb-6 bg-primary-container h-1 rounded-full"></div>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6 tracking-tight">
                Sectores en los que{" "}
                <span className="text-primary-container italic">
                  automatizamos
                </span>
              </h2>
              <p className="text-on-surface/60 font-body text-base md:text-lg">
                Creamos soluciones personalizadas para potenciar la eficiencia y
                multiplicar las ventas de tu negocio.
              </p>
            </div>
            <div className="font-headline text-8xl text-on-surface/5 select-none hidden lg:block uppercase tracking-widest">
              SECTORS
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sectors.map((sector, idx) => (
            <ScrollReveal key={idx} delay={0.1 * (idx + 1)}>
              <div className="bg-surface-container/60 hover:bg-surface-container/80 hover:-translate-y-2 backdrop-blur-md border border-on-surface/5 group transition-all duration-300 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
                {/* Render 3D del rubro */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={sector.image}
                    alt={`Render de ${sector.title}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Fundido inferior hacia el cuerpo de la tarjeta */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-container to-transparent"></div>
                  {/* Chip de ícono del rubro */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">
                      {sector.icon}
                    </span>
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="p-7 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-4 group-hover:text-primary-container transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-on-surface/60 font-body text-sm md:text-base leading-relaxed flex-grow">
                    {sector.description}
                  </p>

                  <div className="mt-8 pt-4 border-t border-on-surface/5 flex items-center gap-2 text-primary-container/40 group-hover:text-primary-container transition-colors text-xs font-label uppercase tracking-wider font-bold">
                    <span>Solución Optimizada</span>
                    <div className="h-px flex-grow bg-current opacity-20"></div>
                    <span className="material-symbols-outlined text-sm">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
