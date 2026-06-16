import { type FC } from 'react';
import ScrollReveal from './ScrollReveal';

interface FeatureGroupProps {
  title: string;
  icon: string;
  features: string[];
}

const FeatureGroup: FC<FeatureGroupProps> = ({ title, icon, features }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-primary-container text-xl">{icon}</span>
      <h4 className="font-headline text-on-surface font-bold text-sm uppercase tracking-wider">{title}</h4>
    </div>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2 text-on-surface/70 text-sm">
          <span className="material-symbols-outlined text-primary-container/60 text-xs mt-1">check_circle</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function Pricing() {
  const plans = [
    {
      name: "PLAN BÁSICO",
      tagline: "El plan ideal para empezar",
      price: "49",
      features: [
        "1 Sucursal",
        "1 usuario administrador",
        "Panel de gestión de pedidos",
        "Registro manual de pedidos",
        "Gestión básica de clientes",
        "Notificaciones push para los repartidores"
      ]
    },
    {
      name: "PLAN ESTANDAR",
      tagline: "Automatiza tus pedidos y vende sin interrupciones",
      price: "69",
      popular: true,
      groups: [
        {
          title: "Operación",
          icon: "inventory_2",
          features: [
            "Hasta 2 sucursales",
            "2 usuarios administradores",
            "Hasta 3 repartidores por sucursal"
          ]
        },
        {
          title: "Automatización",
          icon: "smart_toy",
          features: [
            "Automatización de pedidos por WhatsApp",
            "Registro automático de clientes por WhatsApp",
            "Recepción de ubicación del cliente",
            "Notificación automática a repartidores",
            "Aceptación de pedidos por repartidores"
          ]
        },
        {
          title: "Gestión",
          icon: "leaderboard",
          features: [
            "Panel de gestión de pedidos",
            "Gestión de clientes y pedidos en tiempo real"
          ]
        }
      ]
    },
    {
      name: "PLAN PREMIUM",
      tagline: "Automatiza todas tus sucursales",
      price: "130",
      groups: [
        {
          title: "Operación",
          icon: "inventory_2",
          features: [
            "Hasta 3 sucursales",
            "3 usuarios administradores",
            "Hasta 5 repartidores por sucursal",
            "Sucursal adicional: S/ 35",
            "Repartidor adicional: S/ 5"
          ]
        },
        {
          title: "Automatización",
          icon: "smart_toy",
          features: [
            "Automatización completa de pedidos por WhatsApp",
            "Registro automático de clientes y geolocalización",
            "Flujo automático de pedidos y asignación",
            "Notificación en tiempo real a repartidores",
            "Confirmación automática al cliente"
          ]
        },
        {
          title: "Gestión",
          icon: "leaderboard",
          features: [
            "Panel de gestión de pedidos",
            "Gestión centralizada de clientes y pedidos en tiempo real",
            "Control de múltiples sucursales"
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface" id="planes">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="speed-line w-24 mx-auto mb-6 bg-primary-container h-1 rounded-full"></div>
            <h2 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 tracking-tight">Nuestros Planes</h2>
            <p className="text-on-surface/60 font-body text-lg max-w-2xl mx-auto">
              Escoge la potencia que tu negocio necesita para escalar al siguiente nivel.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx} direction="up">
              <div 
                className={`h-full relative flex flex-col p-8 md:p-10 rounded-3xl transition-all duration-500 border shadow-2xl hover:-translate-y-2 ${
                  plan.popular 
                  ? 'bg-surface-container/80 backdrop-blur-xl border-primary-container/50 scale-[1.03] z-10 hover:scale-[1.05]' 
                  : 'bg-surface-container/40 backdrop-blur-md border-on-surface/5 hover:border-on-surface/10 hover:scale-[1.03]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="font-headline font-bold text-xs uppercase tracking-tighter">MÁS POPULAR</span>
                  </div>
                )}

                <div className="text-center mb-10">
                  <h3 className="font-headline text-on-surface text-2xl font-bold mb-2 uppercase">{plan.name}</h3>
                  <p className="text-on-surface/50 text-xs mb-6 h-10 flex items-center justify-center italic">
                    {plan.tagline}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-on-surface/60 text-xl font-bold italic">S/</span>
                    <span className="text-5xl md:text-6xl font-headline font-black text-on-surface">{plan.price}</span>
                    <span className="text-on-surface/40 text-sm italic">/mes</span>
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  {plan.features ? (
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-on-surface/70 text-sm">
                          <span className="material-symbols-outlined text-primary-container text-lg">check_circle</span>
                          {feature}
                        </li>
                      ))}
                      <li className="pt-4 border-t border-on-surface/5 text-[10px] text-on-surface/30 italic">
                        Escalabilidad de sucursales disponible en Plan Premium
                      </li>
                      <li className="text-[10px] text-on-surface/30 italic">
                        Automatización de WhatsApp disponible en Plan Estándar
                      </li>
                    </ul>
                  ) : (
                    plan.groups?.map((group, gIdx) => (
                      <FeatureGroup key={gIdx} title={group.title} icon={group.icon} features={group.features} />
                    ))
                  )}
                </div>
                <a 
                  href={`https://wa.me/51904773671?text=${encodeURIComponent(`Hola, quiero más información sobre el ${plan.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`block text-center w-full mt-10 py-4 font-headline font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    plan.popular 
                    ? 'bg-primary-container text-on-primary shadow-[0_0_20px_rgba(251,101,10,0.3)] hover:bg-primary-container/90' 
                    : 'bg-on-surface/10 text-on-surface hover:bg-on-surface/20'
                }`}>
                  Empezar Ahora
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
