import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="relative min-h-screen pt-32 pb-24">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

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

        <div className="mb-12 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-8 md:w-12 bg-primary-container"></div>
            <span className="font-label text-primary-container tracking-widest uppercase text-[10px] md:text-sm">Legal & Operativo</span>
            <div className="h-0.5 w-8 md:w-12 bg-primary-container"></div>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">Términos y Condiciones</h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl mx-auto">
            Normativas y pautas para el uso de la plataforma PidemeYa. Asegurando un servicio rápido, transparente y
            confiable.
          </p>
        </div>

        <div className="space-y-12 md:space-y-24 font-body text-on-surface/70">
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface md:sticky md:top-24">
                01.<br className="hidden md:block" /> Aceptación del Servicio
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-4 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
              <p className="text-sm md:text-base leading-relaxed">
                Al acceder a la plataforma PidemeYa o utilizar nuestros servicios de solicitud de productos a domicilio, usted
                confirma que ha leído, comprendido y aceptado estar legalmente sujeto a estos Términos y Condiciones. Si
                utiliza el servicio en nombre de una empresa (por ejemplo, para entregas comerciales), declara tener la
                autoridad para aceptar estos términos en su nombre.
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface md:sticky md:top-24">
                02.<br className="hidden md:block" /> Descripción del Servicio
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-6 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
              <p className="text-sm md:text-base leading-relaxed">
                PidemeYa es una plataforma tecnológica que facilita la logística y distribución de productos diversos. Nuestros
                servicios principales incluyen:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-primary-container material-symbols-outlined text-xl mt-1">shopping_basket</span>
                  <div className="text-sm md:text-base">
                    <strong className="text-on-surface">Pedidos a Domicilio:</strong> Solicitud de diversos tipos de productos
                    según la disponibilidad mediante la web o app.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary-container material-symbols-outlined text-xl mt-1">schedule</span>
                  <div className="text-sm md:text-base">
                    <strong className="text-on-surface">Seguimiento en Tiempo Real:</strong> Monitoreo del estatus de su pedido
                    y cercanía del repartidor.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary-container material-symbols-outlined text-xl mt-1">payments</span>
                  <div className="text-sm md:text-base">
                    <strong className="text-on-surface">Transacciones Seguras:</strong> Facilidad de pago en efectivo o métodos
                    digitales aprobados.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface md:sticky md:top-24">
                03.<br className="hidden md:block" /> Obligaciones del Usuario
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-4 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
              <p className="text-sm md:text-base leading-relaxed">
                Los clientes deben proporcionar información exacta, actual y completa respecto a su ubicación y
                requerimientos de pedido. Usted asume la responsabilidad de:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-on-surface/60 text-sm md:text-base">
                <li>Asegurar que haya una persona responsable para recibir al repartidor.</li>
                <li>
                  Garantizar que las condiciones físicas del lugar de entrega sean óptimas y seguras para la recepción de los productos.
                </li>
                <li>Mantener la confidencialidad de su cuenta en la plataforma.</li>
              </ul>
            </div>
          </div>

          {/* Block 4 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface md:sticky md:top-24">
                04.<br className="hidden md:block" /> Límites de Responsabilidad
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-4 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
              <p className="text-sm md:text-base leading-relaxed">
                PidemeYa suministra la plataforma tecnológica y coordina las entregas. Aunque nos esforzamos por la rapidez
                ("Ya"), no garantizamos tiempos exactos de entrega bajo circunstancias de fuerza mayor (tráfico atípico,
                clima extremo, o escasez de suministro).
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                En ningún caso PidemeYa será responsable por daños indirectos derivados del uso de la plataforma o
                retrasos en el suministro, limitándose nuestra responsabilidad al valor del pedido en curso.
              </p>
            </div>
          </div>

          {/* Block 5 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface md:sticky md:top-24">
                05.<br className="hidden md:block" /> Legislación y Contacto
              </h2>
            </div>
            <div className="w-full md:w-2/3 space-y-4 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
              <p className="text-sm md:text-base leading-relaxed">
                Estos Términos se rigen e interpretan según las leyes vigentes del país o estado donde PidemeYa brinda
                sus servicios. Si tiene dudas sobre nuestras normativas operativas o legales, puede contactar a nuestro
                equipo de soporte gubernamental a través de los canales oficiales habilitados en la app o sitio web.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
