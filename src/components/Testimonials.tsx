const trustSignals = [
  {
    icon: "redeem",
    title: "Primer mes gratis",
    description:
      "Prueba el sistema completo durante un mes, sin permanencia y sin compromiso.",
  },
  {
    icon: "verified",
    title: "Automatización real",
    description:
      "Tus pedidos por WhatsApp se registran y se asignan solos mediante nuestra automatización con n8n.",
  },
  {
    icon: "encrypted",
    title: "Datos protegidos",
    description:
      "Tratamos tu información conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú.",
  },
  {
    icon: "verified_user",
    title: "Respaldo empresarial",
    description:
      "PidemeYa es una marca operada comercialmente por Informatic Data Peru E.I.R.L.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface" id="resenas">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-7xl mb-6 md:mb-8 tracking-tighter text-on-surface">
          Por qué confiar en <span className="text-primary-container italic">PidemeYa</span>
        </h2>
        <p className="font-body text-on-surface/60 text-lg max-w-2xl mx-auto mb-16 md:mb-20">
          Un servicio transparente, con respaldo empresarial y sin riesgo para empezar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustSignals.map((signal) => (
            <div
              key={signal.title}
              className="group flex flex-col items-center text-center bg-surface-container/30 backdrop-blur-md border border-on-surface/5 hover:border-primary-container/30 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="bg-primary-container/10 p-5 rounded-2xl border border-primary-container/20 mb-6 group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary-container text-3xl">
                  {signal.icon}
                </span>
              </div>
              <h3 className="font-headline text-lg md:text-xl text-on-surface font-bold mb-3">
                {signal.title}
              </h3>
              <p className="font-body text-on-surface/60 text-sm leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
