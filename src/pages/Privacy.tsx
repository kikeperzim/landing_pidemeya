import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-on-surface">
        {/* Back button */}
        <div className="mb-8 md:mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-on-surface/50 hover:text-primary-container transition-colors font-label text-xs uppercase tracking-widest"
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
            En PidemeYa tratamos sus datos con la misma precisión y cuidado con los que gestionamos cada pedido.
            Conozca qué información recopilamos, con qué finalidad y cómo puede ejercer sus derechos.
          </p>
          <p className="font-label text-on-surface/40 text-xs uppercase tracking-widest mt-6">
            Última actualización: 13 de julio de 2026
          </p>
        </div>

        <div className="space-y-12 md:space-y-16 font-body text-on-surface/70">
          {/* Section 1 — Identidad del responsable */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">1. Identidad del Responsable</h2>
            <div className="space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-on-surface">PidemeYa es una marca registrada y operada comercialmente por
                Informatic Data Peru E.I.R.L. (RUC 20610802258)</strong>, empresa constituida en la República del Perú y responsable del
                tratamiento de los datos personales recopilados a través de esta plataforma, su sitio web y su bot de
                pedidos por WhatsApp.
              </p>
              <p>
                Para cualquier asunto relacionado con esta política o con sus datos personales, puede contactarnos en el
                correo <a href="mailto:contacto@pidemeya.com" className="text-primary-container hover:underline">contacto@pidemeya.com</a>{' '}
                o vía WhatsApp al <a href="https://wa.me/51904773671" target="_blank" rel="noreferrer" className="text-primary-container hover:underline">+51 904 773 671</a>.
              </p>
              <p>
                El presente documento describe cómo Informatic Data Peru E.I.R.L. recopila, utiliza, almacena y protege la
                información que usted nos confía, en cumplimiento de la Ley N.° 29733, Ley de Protección de Datos
                Personales del Perú, y su Reglamento (Decreto Supremo N.° 003-2013-JUS).
              </p>
            </div>
          </section>

          {/* Section 2 — Datos que recopilamos */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">2. Datos que Recopilamos</h2>
            <p className="mb-6 text-sm md:text-base">
              Para gestionar y entregar sus pedidos de forma rápida y segura, recopilamos la siguiente información:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">person</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Información de Contacto</strong>
                  Nombre, número de teléfono (incluido su número de WhatsApp) y correo electrónico, utilizados para
                  identificarle y coordinar sus pedidos.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">chat</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Mensajes de WhatsApp</strong>
                  El contenido de las conversaciones que usted mantiene con nuestro bot de pedidos (productos
                  solicitados, cantidades y preferencias), necesario para procesar su solicitud.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">location_on</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Datos de Ubicación</strong>
                  Direcciones de entrega y, cuando usted lo autoriza expresamente, coordenadas de ubicación, para asignar
                  la ruta de reparto más eficiente.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-primary-container mt-1 material-symbols-outlined">receipt_long</span>
                <div className="text-sm md:text-base">
                  <strong className="text-on-surface block mb-1">Historial de Pedidos</strong>
                  Detalle, frecuencia y monto de sus pedidos anteriores, para brindarle soporte, generar comprobantes y
                  mejorar el servicio.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 — Finalidad del tratamiento */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">3. Finalidad del Tratamiento</h2>
            <p className="mb-6 text-sm md:text-base">
              Utilizamos su información única y exclusivamente para las siguientes finalidades:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Gestión de Pedidos y Entrega</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Recibir, procesar y coordinar la entrega de sus pedidos a través del negocio afiliado y sus
                  repartidores.
                </p>
              </div>
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Atención y Soporte</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Responder consultas, resolver incidencias y mantenerle informado sobre el estado de su pedido.
                </p>
              </div>
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Comunicaciones del Servicio</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Enviarle confirmaciones, comprobantes y notificaciones operativas relacionadas con su pedido a través de
                  WhatsApp.
                </p>
              </div>
              <div>
                <h3 className="text-on-surface font-medium mb-2 text-sm md:text-base">Mejora del Servicio</h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Analizar de forma agregada el uso de la plataforma para optimizar la disponibilidad y la calidad de la
                  atención.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 — Compartición de datos */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">4. Compartición de Datos con Terceros</h2>
            <div className="space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                No vendemos ni alquilamos sus datos personales. Compartimos información únicamente con los terceros
                estrictamente necesarios para prestar el servicio:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
                <li>
                  <strong className="text-on-surface">Negocios afiliados y repartidores:</strong> reciben los datos
                  imprescindibles (nombre, dirección, teléfono y detalle del pedido) para poder preparar y entregar su
                  solicitud.
                </li>
                <li>
                  <strong className="text-on-surface">Meta Platforms, Inc. (WhatsApp):</strong> el servicio opera sobre la
                  plataforma de mensajería de WhatsApp. El uso de WhatsApp se rige adicionalmente por la propia política
                  de privacidad de Meta.
                </li>
                <li>
                  <strong className="text-on-surface">Proveedores tecnológicos:</strong> servicios de alojamiento,
                  automatización de mensajería y procesamiento de pedidos que actúan como encargados del tratamiento bajo
                  contrato y obligación de confidencialidad. En particular, utilizamos la plataforma de automatización{' '}
                  <strong className="text-on-surface">n8n</strong> para orquestar de forma automática el flujo de sus
                  pedidos entre WhatsApp y el negocio afiliado (recepción del mensaje, registro del pedido y envío de
                  confirmaciones). Estos datos se procesan únicamente para ejecutar dicho flujo y no se destinan a
                  ninguna otra finalidad.
                </li>
                <li>
                  <strong className="text-on-surface">Autoridades competentes:</strong> cuando exista un requerimiento
                  legal válido que nos obligue a ello.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 & 6 — Conservación y Seguridad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
              <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-6">5. Conservación de los Datos</h2>
              <p className="text-xs md:text-sm leading-relaxed">
                Conservamos sus datos personales mientras mantenga una relación activa con el servicio y durante los
                plazos exigidos por la normativa tributaria y comercial peruana. Cuando ya no sean necesarios, se
                eliminan o anonimizan de forma segura.
              </p>
            </section>

            <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
              <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-6">6. Seguridad de la Información</h2>
              <p className="text-xs md:text-sm leading-relaxed">
                Aplicamos medidas técnicas y organizativas para proteger su información, incluyendo cifrado en tránsito y
                control de acceso restringido al personal necesario para coordinar la entrega de su pedido.
              </p>
            </section>
          </div>

          {/* Section 7 — Derechos y eliminación */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">7. Sus Derechos y Eliminación de Datos</h2>
            <div className="space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                Conforme a la Ley N.° 29733, usted tiene derecho a acceder, rectificar, actualizar, oponerse al
                tratamiento y solicitar la cancelación (eliminación) de sus datos personales en cualquier momento.
              </p>
              <p>
                Para ejercer cualquiera de estos derechos —incluida la <strong className="text-on-surface">eliminación
                completa de sus datos</strong>— escríbanos a{' '}
                <a href="mailto:contacto@pidemeya.com" className="text-primary-container hover:underline">contacto@pidemeya.com</a>{' '}
                o envíenos un mensaje por WhatsApp al{' '}
                <a href="https://wa.me/51904773671" target="_blank" rel="noreferrer" className="text-primary-container hover:underline">+51 904 773 671</a>{' '}
                indicando su solicitud. Atenderemos su pedido dentro de los plazos que establece la normativa vigente.
              </p>
              <blockquote className="border-l-2 border-primary-container pl-4 italic text-on-surface/50 text-xs md:text-sm">
                "Su derecho a la privacidad es un pilar de nuestra plataforma."
              </blockquote>
            </div>
          </section>

          {/* Section 8 — Cambios */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-2xl border border-on-surface/5">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">8. Cambios en esta Política</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestros servicios o en la
              legislación aplicable. Publicaremos la versión vigente en esta misma página, indicando la fecha de última
              actualización. Le recomendamos revisarla periódicamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
