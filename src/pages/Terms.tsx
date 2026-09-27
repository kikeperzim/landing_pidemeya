import { Link } from 'react-router-dom';
import { LegalSection as Seccion, LegalDraftBanner } from '../components/LegalSection';
import { ACTUALIZACION, BORRADOR, CONTRATO, PROVEEDOR } from '../config/legal';

/**
 * TÉRMINOS DE SERVICIO (SaaS) — PidemeYa
 * Contrato entre Informatic Data Peru E.I.R.L. y el NEGOCIO que contrata el sistema.
 *
 * No regula la relación entre el negocio afiliado y su consumidor final: PidemeYa
 * provee software, no vende productos ni intermedia pagos en ningún punto.
 *
 * Los datos pendientes de confirmación viven en src/config/legal.ts.
 */

export default function Terms() {
  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full md:w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

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
              Legal &amp; Operativo
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">
            Términos y Condiciones
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            Condiciones que rigen la contratación y el uso del sistema PidemeYa por parte de los negocios que lo
            adquieren.
          </p>
          <p className="font-label text-on-surface/40 text-xs uppercase tracking-widest mt-6">
            Última actualización: {ACTUALIZACION}
          </p>
        </div>

        {BORRADOR && <LegalDraftBanner />}

        <div className="space-y-8 md:space-y-10 font-body text-on-surface/70">
          <Seccion n={1} titulo="Identificación del Proveedor y Aceptación">
            <p>
              El sistema <strong className="text-on-surface">PidemeYa</strong> es desarrollado y operado por{' '}
              <strong className="text-on-surface">
                {PROVEEDOR.razonSocial} (RUC {PROVEEDOR.ruc})
              </strong>
              , con domicilio en {PROVEEDOR.domicilio} (en adelante, «el Proveedor»).
            </p>
            <p>
              Estos Términos regulan la relación entre el Proveedor y la persona natural con negocio o persona
              jurídica que contrata el sistema (en adelante, «el Cliente»). Al contratar un plan, activar una cuenta o
              utilizar el sistema, el Cliente declara haber leído y aceptado estos Términos, y que quien los acepta
              cuenta con facultades suficientes para obligar al Cliente.
            </p>
            <p>
              El contrato se perfecciona con la confirmación del pago por parte del Proveedor y la consiguiente
              activación de la cuenta del Cliente.
            </p>
          </Seccion>

          <Seccion n={2} titulo="Objeto del Servicio">
            <p>
              El Proveedor otorga al Cliente una licencia de uso, no exclusiva e intransferible, sobre una plataforma
              de software que permite automatizar la recepción y gestión de pedidos a través de WhatsApp, incluyendo
              el panel de administración, la gestión de sucursales y repartidores, y las notificaciones asociadas,
              según el plan contratado.
            </p>
            <p className="text-on-surface">
              <strong>Alcance y exclusiones.</strong> Para evitar toda ambigüedad, el Proveedor deja constancia de
              que:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                <strong className="text-on-surface">No vende, distribuye ni almacena productos.</strong> La venta de
                bienes al consumidor final es realizada exclusivamente por el Cliente, por cuenta y riesgo propios.
              </li>
              <li>
                <strong className="text-on-surface">No presta servicios de reparto.</strong> Los repartidores son
                personal o contratistas del Cliente; no existe vínculo laboral ni de cualquier otra naturaleza entre
                ellos y el Proveedor.
              </li>
              <li>
                <strong className="text-on-surface">
                  No procesa, retiene, custodia ni intermedia pagos de ningún tipo.
                </strong>{' '}
                Los pagos del consumidor final se realizan directamente al Cliente por los medios que este determine,
                fuera de la plataforma. El Proveedor no es parte de esa relación de compraventa ni responde por ella.
              </li>
              <li>
                <strong className="text-on-surface">No garantiza volumen de ventas ni resultados comerciales.</strong>
              </li>
            </ul>
          </Seccion>

          <Seccion n={3} titulo="Planes, Precios y Facturación">
            <p>
              Los planes vigentes, su contenido y sus precios son los publicados en el sitio web del Proveedor. Todos
              los precios están expresados en soles (S/) e <strong className="text-on-surface">incluyen IGV</strong>.
            </p>
            <p>
              El pago de la contraprestación se realiza{' '}
              <strong className="text-on-surface">fuera de la plataforma</strong>, por los medios que el Proveedor
              comunique al Cliente (transferencia bancaria, billetera digital u otros). La plataforma no cuenta con
              pasarela de pagos ni almacena datos de tarjetas o cuentas del Cliente.
            </p>
            <p>
              Por cada pago recibido, el Proveedor emitirá el comprobante de pago electrónico que corresponda conforme
              a la normativa tributaria vigente, y lo remitirá al correo electrónico registrado por el Cliente.
            </p>
            <p>
              El Proveedor podrá modificar sus precios, comunicándolo al Cliente con una anticipación no menor a
              treinta (30) días calendario. La modificación no afectará periodos ya pagados. Si el Cliente no acepta
              el nuevo precio, podrá dar por terminado el contrato al vencimiento del periodo en curso, sin
              penalidad.
            </p>
          </Seccion>

          <Seccion n={4} titulo="Periodo de Prueba">
            <p>
              El Proveedor puede ofrecer un primer mes de uso sin costo. Durante dicho periodo el Cliente accede a las
              funcionalidades del plan correspondiente sin obligación de permanencia y{' '}
              <strong className="text-on-surface">sin necesidad de registrar medio de pago alguno</strong>.
            </p>
            <p>
              Al finalizar el periodo de prueba, el servicio continuará únicamente si el Cliente efectúa el pago del
              periodo siguiente. En caso contrario, la cuenta quedará suspendida y se aplicará lo dispuesto en la
              cláusula 6 respecto de la conservación de la información.
            </p>
          </Seccion>

          <Seccion n={5} titulo="Vigencia, Renovación y Cancelación">
            <p>
              El servicio se contrata por periodos mensuales o anuales, según elija el Cliente.{' '}
              <strong className="text-on-surface">No existe permanencia mínima</strong> ni renovación automática con
              cargo: al no haber medio de pago registrado, cada periodo se renueva únicamente mediante un nuevo pago
              voluntario del Cliente.
            </p>
            <p>
              El Cliente puede cancelar en cualquier momento comunicándolo por los canales indicados en la cláusula
              14. La cancelación surte efecto al término del periodo ya pagado, durante el cual el Cliente conserva
              acceso completo al servicio.
            </p>
            <p>
              <strong className="text-on-surface">Planes anuales.</strong> Cuando el Cliente haya pagado un periodo
              anual por adelantado y decida cancelar antes de su vencimiento, {CONTRATO.reembolsoAnual}. Los meses
              iniciados no son reembolsables.
            </p>
          </Seccion>

          <Seccion n={6} titulo="Falta de Pago, Suspensión y Conservación de la Información">
            <p>
              Vencido el periodo contratado sin que se haya efectuado el pago correspondiente, el Proveedor podrá
              suspender el acceso al servicio transcurridos{' '}
              <strong className="text-on-surface">{CONTRATO.diasParaSuspension} días calendario</strong>, previa
              comunicación al Cliente.
            </p>
            <p>
              Durante la suspensión, la información del Cliente se conserva íntegra y podrá ser recuperada regularizando
              el pago. Transcurridos{' '}
              <strong className="text-on-surface">{CONTRATO.diasRetencionTrasSuspension} días calendario</strong> desde
              la suspensión sin regularización, el Proveedor podrá eliminar definitivamente la información asociada a
              la cuenta, previa comunicación al Cliente con al menos siete (7) días de anticipación, dándole la
              oportunidad de solicitar una copia de sus datos.
            </p>
          </Seccion>

          <Seccion n={7} titulo="Obligaciones del Cliente">
            <p>El Cliente se obliga a:</p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>Proporcionar información veraz y mantenerla actualizada.</li>
              <li>
                Custodiar sus credenciales de acceso y las de sus usuarios, siendo responsable de toda actividad
                realizada desde su cuenta.
              </li>
              <li>
                Utilizar el sistema conforme a la ley y a las políticas de WhatsApp y Meta Platforms, Inc.,
                absteniéndose de emplearlo para el envío de comunicaciones no solicitadas o cualquier práctica que
                pueda motivar la restricción de su línea o cuenta.
              </li>
              <li>
                <strong className="text-on-surface">Cumplir la normativa sectorial que le resulte aplicable</strong>,
                incluyendo, según su rubro, las normas sobre comercialización de bebidas alcohólicas —entre ellas la
                verificación de la mayoría de edad del comprador—, las normas sanitarias aplicables a alimentos y las
                normas sobre comercialización y transporte de GLP. El Proveedor no verifica ni asume responsabilidad
                por dicho cumplimiento.
              </li>
              <li>
                Contar con título legítimo sobre la información que incorpore al sistema y haber obtenido, cuando
                corresponda, el consentimiento de sus propios clientes para el tratamiento de sus datos personales.
              </li>
            </ul>
          </Seccion>

          <Seccion n={8} titulo="Protección de Datos Personales">
            <p>
              Respecto de los datos personales de los consumidores finales que se incorporen al sistema como
              consecuencia de la operación del negocio del Cliente, las partes reconocen que{' '}
              <strong className="text-on-surface">el Cliente actúa como responsable del tratamiento</strong> y{' '}
              <strong className="text-on-surface">el Proveedor como encargado del tratamiento</strong>, en los
              términos de la Ley N.º 29733 y su reglamento.
            </p>
            <p>
              En tal condición, el Proveedor tratará dichos datos únicamente conforme a las instrucciones del Cliente
              y para la prestación del servicio, guardará confidencialidad sobre ellos, aplicará medidas de seguridad
              adecuadas y no los destinará a finalidad distinta ni los cederá a terceros salvo mandato legal.
            </p>
            <p>
              Las condiciones detalladas del encargo —subencargados, medidas de seguridad, notificación de incidentes
              y devolución o supresión de la información al término del contrato— constan en el{' '}
              <Link to="/anexo-datos" className="text-primary-container hover:underline">
                Anexo de Encargo de Tratamiento de Datos Personales
              </Link>
              , que forma parte integrante de estos Términos.
            </p>
            <p>
              El tratamiento de los datos del propio Cliente y de quienes visitan el sitio web se rige por la{' '}
              <Link to="/privacidad" className="text-primary-container hover:underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </Seccion>

          <Seccion n={9} titulo="Propiedad Intelectual">
            <p>
              El sistema, su código fuente, interfaces, documentación, marcas y signos distintivos son de titularidad
              exclusiva del Proveedor. Estos Términos otorgan al Cliente un derecho de uso durante la vigencia del
              contrato, y no transfieren titularidad alguna.
            </p>
            <p>
              El Cliente no podrá copiar, descompilar, aplicar ingeniería inversa, sublicenciar, revender ni ceder el
              acceso al sistema a terceros sin autorización escrita del Proveedor.
            </p>
            <p>
              <strong className="text-on-surface">
                La información operativa del Cliente es y permanece de su propiedad
              </strong>{' '}
              (catálogo, pedidos, clientes y registros de operación). El Cliente podrá solicitar una copia en formato
              estructurado durante la vigencia del contrato y hasta el plazo previsto en la cláusula 6.
            </p>
          </Seccion>

          <Seccion n={10} titulo="Disponibilidad, Soporte y Mantenimiento">
            <p>
              El Proveedor realizará esfuerzos razonables para mantener el servicio disponible de forma continua, sin
              comprometer un porcentaje de disponibilidad determinado ni sujetarse a penalidades por interrupción.
            </p>
            <p>
              El servicio depende de plataformas de terceros ajenas al control del Proveedor —en particular WhatsApp y
              Meta Platforms, Inc., así como proveedores de conectividad y alojamiento—. Las interrupciones,
              restricciones o cambios de política originados en dichas plataformas no son imputables al Proveedor.
            </p>
            <p>
              El Proveedor podrá efectuar tareas de mantenimiento, procurando realizarlas en horarios de baja demanda
              y avisando con antelación razonable cuando impliquen indisponibilidad prevista.
            </p>
            <p>
              El soporte se presta por los canales indicados en la cláusula 14, en días y horarios hábiles.
            </p>
          </Seccion>

          <Seccion n={11} titulo="Limitación de Responsabilidad">
            <p>
              La responsabilidad total del Proveedor frente al Cliente, por cualquier concepto y durante toda la
              vigencia del contrato, se limita al importe efectivamente pagado por el Cliente durante los tres (3)
              meses anteriores al hecho que motive el reclamo.
            </p>
            <p>
              El Proveedor no responde por lucro cesante, pérdida de oportunidades comerciales ni daños indirectos, ni
              por los hechos descritos en la cláusula 2 como excluidos del objeto del servicio.
            </p>
            <p className="text-on-surface/50 text-xs md:text-sm italic">
              Esta limitación no alcanza los supuestos de dolo o culpa inexcusable, conforme al artículo 1328 del
              Código Civil, ni los derechos irrenunciables que la ley reconozca al Cliente cuando este califique como
              consumidor.
            </p>
          </Seccion>

          <Seccion n={12} titulo="Confidencialidad">
            <p>
              Cada parte se obliga a mantener en reserva la información no pública de la otra a la que acceda con
              ocasión del contrato, y a no divulgarla ni emplearla para fines distintos de su ejecución. Esta
              obligación subsiste por dos (2) años desde la terminación del contrato.
            </p>
          </Seccion>

          <Seccion n={13} titulo="Terminación">
            <p>
              Cualquiera de las partes podrá dar por terminado el contrato conforme a la cláusula 5. Adicionalmente,
              el Proveedor podrá resolverlo de pleno derecho, previa comunicación, cuando el Cliente incumpla
              gravemente estas condiciones, en particular las obligaciones de la cláusula 7 o cuando el uso del
              sistema ponga en riesgo la integridad del servicio o la cuenta de WhatsApp asociada.
            </p>
            <p>
              Terminado el contrato por cualquier causa, se aplicarán los plazos de conservación y eliminación de
              información previstos en la cláusula 6.
            </p>
          </Seccion>

          <Seccion n={14} titulo="Modificaciones y Comunicaciones">
            <p>
              El Proveedor podrá modificar estos Términos, publicando la versión vigente en esta página con su fecha
              de actualización. Las modificaciones sustanciales serán comunicadas al Cliente con una anticipación no
              menor a treinta (30) días calendario. Si el Cliente no las acepta, podrá terminar el contrato conforme a
              la cláusula 5.
            </p>
            <p>
              Las comunicaciones entre las partes se cursarán al correo{' '}
              <a href={`mailto:${PROVEEDOR.email}`} className="text-primary-container hover:underline">
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
              , y al correo registrado por el Cliente.
            </p>
          </Seccion>

          <Seccion n={15} titulo="Ley Aplicable y Solución de Controversias">
            <p>
              Estos Términos se rigen por las leyes de la República del Perú. Las partes procurarán resolver de buena
              fe cualquier discrepancia mediante trato directo. De no lograrse acuerdo, se someten a la jurisdicción
              de los jueces y tribunales del Distrito Judicial de Lima.
            </p>
            <p>
              Si el Cliente califica como consumidor conforme al Código de Protección y Defensa del Consumidor, podrá
              registrar su reclamo en nuestro{' '}
              <Link to="/libro-de-reclamaciones" className="text-primary-container hover:underline">
                Libro de Reclamaciones
              </Link>
              , sin perjuicio de acudir a las vías que la ley le franquea.
            </p>
          </Seccion>
        </div>
      </div>
    </div>
  );
}
