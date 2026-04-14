import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="relative min-h-screen pt-32 pb-24">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-on-surface">
        {/* Back button */}
        <div className="mb-8 md:mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-primary-container transition-colors font-label text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Regresar a Inicio
          </Link>
        </div>

        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-primary-container"></div>
            <span className="font-label text-primary-container tracking-widest uppercase text-xs md:text-sm">
              Política de Privacidad
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">Privacidad y Seguridad</h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            En PidemeYa, tratamos sus datos con la misma precisión y cuidado con los que entregamos productos a su puerta.
            Conozca cómo protegemos su información.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16 font-body text-on-surface/70">
          {/* Section 1 */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">1. Introducción</h2>
            <div className="space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                Bienvenido a PidemeYa. Somos la plataforma líder en distribución y entrega rápida de productos, diseñada
                para llevar conveniencia a su vida de manera segura y eficiente.
              </p>
              <p>
                Su privacidad es fundamental para nuestra filosofía de servicio. Esta política describe cómo
                recopilamos, protegemos y utilizamos los datos que nos confía al hacer uso de nuestra aplicación y red de
                distribución.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">2. Recopilación de Datos</h2>
            <p className="mb-6 text-sm md:text-base">
              Para garantizar entregas rápidas y seguras ("Ya"), recopilamos la siguiente información vital:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">person</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Información de Contacto</strong>
                  Nombres, números de teléfono y correo electrónico utilizados al registrarse para coordinar las
                  entregas.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">location_on</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Datos de Ubicación</strong>
                  Direcciones de entrega y coordenadas GPS (cuando se autoriza) para enviar a nuestros repartidores por la
                  ruta más eficiente.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">analytics</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Historial de Consumo</strong>
                  Frecuencia de pedidos y volúmenes requeridos para garantizar disponibilidad y predecir sus
                  necesidades futuras.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">3. Uso de la Información</h2>
            <p className="mb-6 text-sm md:text-base">
              Sus datos son procesados por nuestros sistemas inteligentes exclusivamente para:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Logística y Entrega</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Optimizar las rutas de nuestros repartidores para asegurar que su pedido llegue a su domicilio sin demoras.
                </p>
              </div>
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Soporte y Predicción</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Analizar patrones de consumo para recordarle cuándo podría necesitar su próximo pedido de productos.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 & 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
              <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-6">4. Seguridad de Datos</h2>
              <p className="text-xs md:text-sm leading-relaxed">
                Tratamos la seguridad de sus datos con los más altos estándares. Toda la información personal y de
                ubicación está encriptada mediante protocolos AES-256. El acceso a estos datos está estrictamente
                limitado al personal necesario para coordinar su entrega de pedidos.
              </p>
            </section>

            <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
              <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-6">5. Sus Derechos</h2>
              <p className="text-xs md:text-sm leading-relaxed mb-4">
                Usted mantiene control absoluto sobre su cuenta. Puede solicitar acceso, corrección o eliminación de sus
                datos personales y direcciones de envío en cualquier momento desde la app o contactando a soporte
                técnico.
              </p>
              <blockquote className="border-l-2 border-primary-container pl-4 italic text-white/50 text-xs md:text-sm">
                "Su derecho a la privacidad es un pilar de nuestra plataforma."
              </blockquote>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
