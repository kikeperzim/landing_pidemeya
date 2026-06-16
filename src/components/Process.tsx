import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: "1",
    title: "El Cliente Escribe",
    description: "El cliente escribe por WhatsApp para solicitar su pedido de manera rápida.",
    icon: "chat"
  },
  {
    number: "2",
    title: "El Sistema Responde",
    description: "Respuesta automática instantánea que registra al cliente en la base de datos.",
    icon: "smart_toy"
  },
  {
    number: "3",
    title: "Comparte Ubicación",
    description: "El cliente envía su GPS exacto para evitar confusiones en la entrega.",
    icon: "location_on"
  },
  {
    number: "4",
    title: "Notificación Push",
    description: "Los repartidores reciben el aviso inmediato con todos los detalles del pedido.",
    icon: "notifications_active"
  },
  {
    number: "5",
    title: "Acepta y Entrega",
    description: "El repartidor acepta el pedido y sigue la ruta optimizada en el mapa.",
    icon: "directions_bike"
  },
  {
    number: "6",
    title: "Confirmación Final",
    description: "El cliente recibe la confirmación de que su pedido está en camino.",
    icon: "check_circle"
  }
];

export default function Process() {
  return (
    <section className="py-20 md:py-32 bg-transparent" id="proceso">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="speed-line w-24 mx-auto mb-6 bg-primary-container h-1 rounded-full"></div>
            <h2 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 tracking-tight">¿Cómo funciona?</h2>
            <p className="text-on-surface/60 font-body text-lg max-w-2xl mx-auto">
              Automatizamos el flujo completo desde que el cliente escribe hasta que recibe su producto.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx} distance={30}>
              <div 
                className="group relative bg-surface-container/40 backdrop-blur-md border border-on-surface/5 p-8 rounded-3xl hover:-translate-y-1 hover:bg-surface-container/60 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="absolute -right-4 -top-4 text-9xl font-headline font-black text-on-surface/5 group-hover:text-primary-container/10 transition-colors pointer-events-none">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary-container/20 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-primary-container transition-colors duration-500">
                    <span className="material-symbols-outlined text-primary-container group-hover:text-on-primary transition-colors duration-500 text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl text-on-surface font-bold mb-4">{step.title}</h3>
                  <p className="text-on-surface/50 font-body text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
