import { Link } from 'react-router-dom';
import { LegalSection, LegalDraftBanner } from '../components/LegalSection';
import { ACTUALIZACION, BORRADOR, CONSERVACION, CONTRATO, PROVEEDOR } from '../config/legal';

/**
 * POLÍTICA DE PRIVACIDAD — PidemeYa
 *
 * Distingue los dos roles del negocio, que antes estaban fundidos en uno:
 *  · RESPONSABLE  → datos de los negocios que contratan y de quien visita la web.
 *  · ENCARGADO    → datos de los consumidores finales que pasan por el bot; el
 *                   responsable de esos datos es el negocio afiliado, no PidemeYa.
 *
 * Los datos pendientes de confirmación viven en src/config/legal.ts.
 */

export default function Privacy() {
  const mailto = `mailto:${PROVEEDOR.email}`;

  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

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

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-primary-container"></div>
            <span className="font-label text-primary-container tracking-widest uppercase text-xs md:text-sm">
              Legal &amp; Datos
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            Qué información tratamos, con qué finalidad, con quién la compartimos y cómo puede ejercer sus derechos.
          </p>
          <p className="font-label text-on-surface/40 text-xs uppercase tracking-widest mt-6">
            Última actualización: {ACTUALIZACION}
          </p>
        </div>

        {BORRADOR && <LegalDraftBanner />}

        <div className="space-y-8 md:space-y-10 font-body text-on-surface/70">
          <LegalSection n={1} titulo="Quiénes Somos">
            <p>
              <strong className="text-on-surface">{PROVEEDOR.nombreComercial}</strong> es un sistema desarrollado y
              operado por{' '}
              <strong className="text-on-surface">
                {PROVEEDOR.razonSocial} (RUC {PROVEEDOR.ruc})
              </strong>
              , con domicilio en {PROVEEDOR.domicilio}.
            </p>
            <p>
              Nuestro servicio consiste en{' '}
              <strong className="text-on-surface">
                software que automatiza la recepción de pedidos por WhatsApp
              </strong>{' '}
              para negocios como licorerías, restaurantes y distribuidoras de agua y gas. No vendemos productos, no
              realizamos repartos y no intermediamos pagos.
            </p>
            <p>
              Para cualquier asunto relativo a esta política o a sus datos personales, escríbanos a{' '}
              <a href={mailto} className="text-primary-container hover:underline">
                {PROVEEDOR.email}
              </a>{' '}
              o por WhatsApp al{' '}
              <a
                href={PROVEEDOR.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-container hover:underline"
              >
                {PROVEEDOR.whatsapp}
              </a>
              .
            </p>
            <p>
              Tratamos los datos personales conforme a la{' '}
              <strong className="text-on-surface">Ley N.º 29733</strong>, Ley de Protección de Datos Personales, y su
              Reglamento vigente.
            </p>
          </LegalSection>

          <LegalSection n={2} titulo="Nuestros Dos Roles: Lea Esto Primero">
            <p>
              Según de quién sean los datos, actuamos de dos maneras distintas. Esta distinción determina a quién debe
              dirigirse para ejercer sus derechos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="rounded-2xl border border-primary-container/25 bg-primary-container/5 p-5">
                <h3 className="font-headline text-on-surface text-base md:text-lg mb-3">
                  Somos <span className="text-primary-container">responsables</span>
                </h3>
                <p className="text-xs md:text-sm leading-relaxed mb-3">
                  De los datos de los <strong className="text-on-surface">negocios que contratan el sistema</strong> y
                  de quienes <strong className="text-on-surface">visitan este sitio web</strong> o nos escriben.
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-on-surface/50">
                  Nosotros decidimos para qué se usan. Diríjase a nosotros directamente.
                </p>
              </div>

              <div className="rounded-2xl border border-on-surface/10 bg-surface-container/40 p-5">
                <h3 className="font-headline text-on-surface text-base md:text-lg mb-3">
                  Somos <span className="text-primary-container">encargados</span>
                </h3>
                <p className="text-xs md:text-sm leading-relaxed mb-3">
                  De los datos de los{' '}
                  <strong className="text-on-surface">consumidores finales que hacen un pedido</strong> al WhatsApp de
                  un negocio que usa nuestro sistema.
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-on-surface/50">
                  El responsable es ese negocio, no nosotros. Nosotros solo procesamos según sus instrucciones.
                </p>
              </div>
            </div>

            <p className="pt-2">
              <strong className="text-on-surface">Si usted es un consumidor</strong> que hizo un pedido por WhatsApp a
              una licorería, restaurante o distribuidora, su relación es con ese negocio: él decide qué datos le pide
              y para qué los usa. Puede dirigir su solicitud directamente a él, o a nosotros, en cuyo caso la
              trasladaremos al negocio correspondiente y le informaremos de ello.
            </p>
          </LegalSection>

          <LegalSection n={3} titulo="Qué Datos Tratamos">
            <h3 className="text-on-surface font-medium">Como responsables</h3>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">Negocios clientes:</strong> nombre y datos de contacto del titular
                o representante, razón social, RUC, domicilio, correo, teléfono, datos de facturación, credenciales de
                acceso al panel y registros de uso del sistema.
              </li>
              <li>
                <strong className="text-on-surface">Consultas por la web:</strong> nombre, correo, asunto y contenido
                del mensaje que nos envía desde el formulario de contacto.
              </li>
              <li>
                <strong className="text-on-surface">Libro de Reclamaciones:</strong> los datos que exige la hoja de
                reclamación, tratados únicamente para atenderla.
              </li>
              <li>
                <strong className="text-on-surface">Navegación:</strong> datos técnicos como dirección IP, tipo de
                dispositivo y navegador, generados al cargar el sitio.
              </li>
            </ul>

            <h3 className="text-on-surface font-medium pt-2">Como encargados</h3>
            <p>
              Por cuenta del negocio afiliado se procesan los datos que el consumidor final entrega al hacer su pedido:
              nombre, número de WhatsApp, contenido de la conversación con el bot, dirección de entrega y —cuando el
              consumidor la comparte expresamente— su ubicación, además del historial de pedidos.
            </p>
            <p>
              Las condiciones de este tratamiento constan en el{' '}
              <Link to="/anexo-datos" className="text-primary-container hover:underline">
                Anexo de Encargo de Tratamiento de Datos Personales
              </Link>{' '}
              suscrito con cada negocio afiliado.
            </p>
            <p className="text-on-surface/50 text-xs md:text-sm italic">
              No solicitamos datos sensibles. Le pedimos no incluirlos en sus mensajes.
            </p>
          </LegalSection>

          <LegalSection n={4} titulo="Para Qué los Usamos">
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">Ejecutar el contrato:</strong> activar y mantener la cuenta,
                prestar soporte, emitir comprobantes de pago y gestionar cobranzas.
              </li>
              <li>
                <strong className="text-on-surface">Prestar el servicio automatizado:</strong> recibir el pedido por
                WhatsApp, registrarlo, notificar al negocio y a sus repartidores y confirmar al consumidor. Esto lo
                hacemos siguiendo las instrucciones del negocio afiliado.
              </li>
              <li>
                <strong className="text-on-surface">Atender consultas y reclamaciones</strong> recibidas por la web,
                el correo o el Libro de Reclamaciones.
              </li>
              <li>
                <strong className="text-on-surface">Cumplir obligaciones legales</strong> de orden tributario,
                contable y de protección al consumidor.
              </li>
              <li>
                <strong className="text-on-surface">Mejorar el servicio</strong> mediante análisis agregados que no
                identifican a personas concretas.
              </li>
            </ul>
            <p>
              No usamos sus datos para publicidad de terceros, no elaboramos perfiles con efectos jurídicos sobre
              usted y{' '}
              <strong className="text-on-surface">no vendemos ni alquilamos datos personales a nadie</strong>.
            </p>
          </LegalSection>

          <LegalSection n={5} titulo="Cookies y Almacenamiento Local">
            <p>
              Este sitio <strong className="text-on-surface">no utiliza cookies de publicidad ni de seguimiento</strong>{' '}
              de terceros.
            </p>
            <p>
              Empleamos únicamente almacenamiento local del navegador para recordar su preferencia de tema visual
              (claro u oscuro). Es información técnica que permanece en su dispositivo, no nos es enviada y puede
              borrarla desde la configuración de su navegador sin afectar el funcionamiento del sitio.
            </p>
          </LegalSection>

          <LegalSection n={6} titulo="Con Quién Compartimos Información">
            <p>Compartimos datos solo con quien es necesario para prestar el servicio:</p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">Negocio afiliado y sus repartidores:</strong> reciben lo
                imprescindible para preparar y entregar el pedido. El negocio es el responsable de esos datos.
              </li>
              <li>
                <strong className="text-on-surface">Meta Platforms, Inc. (WhatsApp):</strong> el servicio funciona
                sobre su plataforma de mensajería. El uso de WhatsApp se rige además por las políticas de Meta.
              </li>
              <li>
                <strong className="text-on-surface">Proveedores tecnológicos:</strong> alojamiento y la plataforma de
                automatización <strong className="text-on-surface">n8n</strong>, que orquesta el flujo del pedido
                entre WhatsApp y el negocio. Actúan como subencargados, bajo contrato y deber de confidencialidad, y
                no pueden usar los datos para otro fin.
              </li>
              <li>
                <strong className="text-on-surface">Autoridades competentes:</strong> únicamente ante un requerimiento
                legal válido.
              </li>
            </ul>
          </LegalSection>

          <LegalSection n={7} titulo="Transferencias Internacionales">
            <p>
              Parte de la infraestructura que hace funcionar el servicio se encuentra fuera del Perú, por lo que
              existe <strong className="text-on-surface">flujo transfronterizo de datos personales</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">Meta Platforms, Inc.</strong> (Estados Unidos), como operador de
                WhatsApp.
              </li>
              <li>
                <strong className="text-on-surface">Proveedores de alojamiento y automatización</strong>, cuyos
                servidores pueden ubicarse fuera del territorio nacional.
              </li>
              <li>
                <strong className="text-on-surface">Recursos del sitio web</strong> servidos desde redes de
                distribución de contenido internacionales (tipografías y componentes visuales), que al cargarse
                reciben la dirección IP de quien visita el sitio.
              </li>
            </ul>
            <p>
              En todos los casos exigimos a estos proveedores garantías de confidencialidad y seguridad equivalentes a
              las que aplicamos nosotros.
            </p>
          </LegalSection>

          <LegalSection n={8} titulo="Cuánto Tiempo los Conservamos">
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">Negocios clientes:</strong> durante la vigencia del contrato y
                hasta {CONSERVACION.clientesAnios} años después, por obligaciones tributarias y contables.
              </li>
              <li>
                <strong className="text-on-surface">Datos operativos en el sistema:</strong> si la cuenta se suspende
                por falta de pago, se conservan {CONTRATO.diasRetencionTrasSuspension} días calendario antes de su
                eliminación, según la cláusula 6 de los{' '}
                <Link to="/terminos" className="text-primary-container hover:underline">
                  Términos y Condiciones
                </Link>
                .
              </li>
              <li>
                <strong className="text-on-surface">Consultas por la web:</strong> hasta{' '}
                {CONSERVACION.consultasWebMeses} meses desde la última comunicación.
              </li>
              <li>
                <strong className="text-on-surface">Reclamaciones:</strong> {CONSERVACION.reclamacionesAnios} años,
                conforme a la normativa de protección al consumidor.
              </li>
              <li>
                <strong className="text-on-surface">Datos tratados como encargados:</strong> mientras lo indique el
                negocio responsable, y al término del contrato se devuelven o eliminan según sus instrucciones.
              </li>
            </ul>
            <p>Vencidos estos plazos, la información se elimina o se anonimiza de forma irreversible.</p>
          </LegalSection>

          <LegalSection n={9} titulo="Seguridad e Incidentes">
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger la información: cifrado en tránsito,
              control de acceso limitado al personal que lo necesita, credenciales individuales y registro de
              actividad.
            </p>
            <p>
              Ningún sistema es infalible. Si ocurriera un incidente de seguridad que afecte datos personales,
              <strong className="text-on-surface">
                {' '}
                lo comunicaremos a la autoridad de protección de datos y a los afectados
              </strong>{' '}
              en los plazos y condiciones que exige la normativa vigente. Cuando actuemos como encargados,
              notificaremos sin demora al negocio responsable para que este cumpla sus propias obligaciones.
            </p>
          </LegalSection>

          <LegalSection n={10} titulo="Menores de Edad">
            <p>
              El sistema está dirigido a negocios y a personas mayores de edad. No recopilamos deliberadamente datos
              de menores de catorce (14) años; de hacerlo, se requiere el consentimiento de sus padres o tutores.
            </p>
            <p>
              Tratándose de pedidos de <strong className="text-on-surface">bebidas alcohólicas</strong>, la
              verificación de la mayoría de edad del comprador corresponde al negocio afiliado y a su repartidor,
              conforme a la normativa aplicable.
            </p>
            <p>
              Si detecta que un menor nos ha proporcionado datos sin la autorización correspondiente, escríbanos y
              procederemos a eliminarlos.
            </p>
          </LegalSection>

          <LegalSection n={11} titulo="Sus Derechos">
            <p>
              La ley le reconoce los derechos de{' '}
              <strong className="text-on-surface">
                información, acceso, actualización, inclusión, rectificación, supresión o cancelación, y oposición
              </strong>{' '}
              respecto de sus datos personales, así como el derecho a revocar en cualquier momento el consentimiento
              que hubiera otorgado.
            </p>
            <p>
              Para ejercerlos, escríbanos a{' '}
              <a href={mailto} className="text-primary-container hover:underline">
                {PROVEEDOR.email}
              </a>{' '}
              o por WhatsApp al{' '}
              <a
                href={PROVEEDOR.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-container hover:underline"
              >
                {PROVEEDOR.whatsapp}
              </a>
              , indicando su solicitud y adjuntando copia de su documento de identidad para verificar que es usted.
              Atenderemos su pedido dentro de los plazos legales.
            </p>
            <p>
              Si su solicitud se refiere a datos que tratamos{' '}
              <strong className="text-on-surface">como encargados</strong> —es decir, si usted es consumidor final de
              un negocio afiliado— la trasladaremos al negocio responsable y se lo comunicaremos, ya que es él quien
              debe resolverla.
            </p>
            <p>
              Si considera que sus derechos no han sido debidamente atendidos, puede presentar un reclamo ante la{' '}
              <strong className="text-on-surface">
                Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos
              </strong>
              .
            </p>
          </LegalSection>

          <LegalSection n={12} titulo="Cambios en esta Política">
            <p>
              Podemos actualizar esta política para reflejar cambios en el servicio o en la legislación aplicable.
              Publicaremos la versión vigente en esta página con su fecha de actualización, y cuando el cambio sea
              sustancial lo comunicaremos por los canales de contacto registrados.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
