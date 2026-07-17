import ScrollReveal from './ScrollReveal';

export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <ScrollReveal direction="right" distance={100}>
            <div className="relative">
              <div className="aspect-[3/2] bg-surface-container-high overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  alt="Sistema de pedidos por WhatsApp de PidemeYa: bot, repartidor, ubicación y panel de gestión"
                  src="/por-que-pidemeya.webp"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 md:-bottom-12 -right-6 md:-right-12 bg-primary-container p-6 md:p-10 rounded-2xl shadow-2xl">
                <span className="font-headline text-4xl md:text-6xl text-on-primary">24/7</span>
                <p className="font-label uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2 text-on-primary font-bold">
                  Atención automática
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 lg:mt-0 text-center lg:text-left">
            <ScrollReveal>
              <span className="font-label text-primary-container font-bold uppercase tracking-[0.3em] text-xs block mb-6">
                Por qué PidemeYa
              </span>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-8 md:mb-12 tracking-tight">Menos llamadas, más pedidos.</h2>
            </ScrollReveal>

            <ul className="space-y-8 md:space-y-12 text-left">
              {[
                {
                  num: "01",
                  title: "Cero pedidos perdidos",
                  desc: "Tu bot atiende por WhatsApp las 24 horas: responde, toma el pedido y confirma, aunque estés ocupado o con el local cerrado."
                },
                {
                  num: "02",
                  title: "Se registra y se asigna solo",
                  desc: "Cada pedido se guarda automáticamente y se envía al repartidor disponible. Sin apuntar en papel, sin llamadas para coordinar."
                },
                {
                  num: "03",
                  title: "Soporte real cuando lo necesitas",
                  desc: "Somos parte de tu operación diaria. Cuando algo se complica, estamos ahí para resolverlo rápido."
                }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={0.1 * (idx + 1)} direction="left">
                  <li className="flex gap-6 group">
                    <span className="font-headline text-3xl md:text-4xl text-on-surface/10 group-hover:text-primary-container transition-colors">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-ui font-bold text-on-surface text-lg md:text-xl mb-2 group-hover:text-primary-container transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-on-surface/60 font-body text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
