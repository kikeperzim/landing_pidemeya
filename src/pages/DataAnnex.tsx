import { Link } from 'react-router-dom';
import { LegalSection, LegalDraftBanner } from '../components/LegalSection';
import { ACTUALIZACION, BORRADOR, CONTRATO, PROVEEDOR } from '../config/legal';

/**
 * ANEXO DE ENCARGO DE TRATAMIENTO DE DATOS PERSONALES
 *
 * Forma parte integrante de los Términos de Servicio (cláusula 8) y es el
 * documento que reparte responsabilidades sobre los datos de los consumidores
 * finales: el NEGOCIO AFILIADO es responsable, PidemeYa es encargado.
 *
 * Pensado para imprimirse y firmarse: las variantes `print:` ocultan la
 * decoración y el bloque de firmas queda al final.
 *
 * Los datos pendientes de confirmación viven en src/config/legal.ts.
 */

const SUBENCARGADOS = [
  {
    nombre: 'Meta Platforms, Inc.',
    servicio: 'Plataforma de mensajería WhatsApp',
    ubicacion: 'Estados Unidos',
  },
  {
    nombre: 'n8n',
    servicio: 'Automatización del flujo de pedidos',
    ubicacion: 'Unión Europea / servidor del Proveedor',
  },
  {
    nombre: 'Proveedor de alojamiento',
    servicio: 'Infraestructura de servidores y base de datos',
    ubicacion: 'Según contrato vigente',
  },
];

export default function DataAnnex() {
  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24 print:pt-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none print:hidden"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 text-on-surface">
        {/* Back button */}
        <div className="mb-8 md:mb-12 print:hidden">
          <Link
            to="/terminos"
            className="group inline-flex items-center gap-2 text-on-surface/50 hover:text-primary-container transition-colors font-label text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Volver a Términos y Condiciones
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-0.5 w-12 bg-primary-container"></div>
            <span className="font-label text-primary-container tracking-widest uppercase text-xs md:text-sm">
              Anexo Contractual
            </span>
          </div>
          <h1 className="font-headline text-3xl md:text-6xl text-on-surface mb-6 md:mb-8 tracking-tight">
            Encargo de Tratamiento de Datos Personales
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            Anexo que forma parte integrante de los{' '}
            <Link to="/terminos" className="text-primary-container hover:underline">
              Términos y Condiciones
            </Link>{' '}
            y regula el tratamiento de los datos personales de los consumidores finales del Cliente.
          </p>
          <p className="font-label text-on-surface/40 text-xs uppercase tracking-widest mt-6">
            Última actualización: {ACTUALIZACION}
          </p>
        </div>

        {BORRADOR && <LegalDraftBanner />}

        <div className="space-y-8 md:space-y-10 font-body text-on-surface/70">
          <LegalSection n={1} titulo="Partes y Objeto">
            <p>
              El presente Anexo se celebra entre{' '}
              <strong className="text-on-surface">
                {PROVEEDOR.razonSocial} (RUC {PROVEEDOR.ruc})
              </strong>
              , con domicilio en {PROVEEDOR.domicilio}, en adelante «el Encargado», y el negocio que contrata el
              sistema PidemeYa, en adelante «el Responsable».
            </p>
            <p>
              Su objeto es regular las condiciones bajo las cuales el Encargado trata, por cuenta del Responsable, los
              datos personales de los consumidores finales que este recibe a través del sistema, conforme a la Ley
              N.º 29733, Ley de Protección de Datos Personales, y su Reglamento vigente.
            </p>
            <p>
              Este Anexo forma parte integrante de los Términos y Condiciones y se entiende aceptado con la
              contratación del servicio. En caso de discrepancia entre ambos documentos respecto de la protección de
              datos personales, prevalece este Anexo.
            </p>
          </LegalSection>

          <LegalSection n={2} titulo="Roles de las Partes">
            <p>Las partes reconocen expresamente que:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="rounded-2xl border border-on-surface/10 bg-surface-container/40 p-5">
                <h3 className="font-headline text-on-surface text-base md:text-lg mb-3">
                  El <span className="text-primary-container">Responsable</span>
                </h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Es el negocio afiliado. Decide las finalidades y los medios del tratamiento, mantiene la relación
                  comercial con el consumidor final y responde frente a él y frente a la autoridad.
                </p>
              </div>
              <div className="rounded-2xl border border-primary-container/25 bg-primary-container/5 p-5">
                <h3 className="font-headline text-on-surface text-base md:text-lg mb-3">
                  El <span className="text-primary-container">Encargado</span>
                </h3>
                <p className="text-xs md:text-sm leading-relaxed">
                  Es PidemeYa. Trata los datos únicamente por cuenta y según las instrucciones del Responsable, sin
                  decidir sobre sus finalidades ni destinarlos a fin propio alguno.
                </p>
              </div>
            </div>
            <p className="pt-2">
              El Encargado no adquiere derecho alguno sobre los datos tratados, que permanecen bajo titularidad y
              control del Responsable.
            </p>
          </LegalSection>

          <LegalSection n={3} titulo="Descripción del Tratamiento">
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-xs md:text-sm border-collapse">
                <tbody className="align-top">
                  {[
                    [
                      'Naturaleza y finalidad',
                      'Recepción, registro, organización, conservación, consulta y comunicación de pedidos realizados por WhatsApp, con el único fin de que el Responsable pueda gestionarlos y entregarlos.',
                    ],
                    [
                      'Categorías de titulares',
                      'Consumidores finales que contactan al Responsable a través del canal de WhatsApp habilitado por el sistema.',
                    ],
                    [
                      'Tipos de datos',
                      'Nombre, número de WhatsApp, contenido de la conversación con el bot, dirección de entrega, datos de ubicación cuando el titular los comparte expresamente, e historial de pedidos.',
                    ],
                    [
                      'Datos sensibles',
                      'No se solicitan ni se requieren datos sensibles para la prestación del servicio.',
                    ],
                    [
                      'Duración',
                      'Mientras se encuentre vigente el contrato de servicio, más los plazos de conservación previstos en la cláusula 10.',
                    ],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-on-surface/5">
                      <th className="text-left font-label uppercase tracking-widest text-[10px] text-on-surface/50 py-3 pr-4 w-40 md:w-52 font-normal">
                        {k}
                      </th>
                      <td className="py-3 leading-relaxed">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LegalSection>

          <LegalSection n={4} titulo="Obligaciones del Encargado">
            <p>El Encargado se obliga a:</p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                Tratar los datos <strong className="text-on-surface">únicamente conforme a las instrucciones</strong>{' '}
                del Responsable y para las finalidades descritas en la cláusula 3, sin utilizarlos para fines propios
                ni cederlos a terceros distintos de los subencargados autorizados.
              </li>
              <li>
                Advertir al Responsable, sin demora, cuando considere que una instrucción recibida infringe la
                normativa de protección de datos.
              </li>
              <li>
                Garantizar que las personas autorizadas para tratar los datos se hayan comprometido a{' '}
                <strong className="text-on-surface">confidencialidad</strong>, obligación que subsiste tras el fin de
                su relación con el Encargado.
              </li>
              <li>
                Aplicar las <strong className="text-on-surface">medidas de seguridad</strong> descritas en la cláusula
                7, adecuadas al riesgo del tratamiento.
              </li>
              <li>
                No incorporar nuevos subencargados sin informar previamente al Responsable, conforme a la cláusula 6.
              </li>
              <li>
                <strong className="text-on-surface">Asistir al Responsable</strong> en la atención de las solicitudes
                de los titulares y en el cumplimiento de sus obligaciones de seguridad y notificación de incidentes.
              </li>
              <li>
                Poner a disposición del Responsable la información necesaria para acreditar el cumplimiento de este
                Anexo.
              </li>
              <li>
                <strong className="text-on-surface">Devolver o suprimir</strong> los datos al término del contrato,
                según lo previsto en la cláusula 10.
              </li>
            </ul>
          </LegalSection>

          <LegalSection n={5} titulo="Obligaciones del Responsable">
            <p>El Responsable se obliga a:</p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>
                Contar con <strong className="text-on-surface">título legítimo</strong> para tratar los datos que
                incorpora al sistema y haber obtenido, cuando corresponda, el consentimiento de los titulares.
              </li>
              <li>
                <strong className="text-on-surface">Informar a sus propios clientes</strong> sobre el tratamiento de
                sus datos, incluyendo la existencia de un encargado y la posibilidad de flujo transfronterizo, a
                través de su propia política de privacidad.
              </li>
              <li>Impartir instrucciones lícitas, documentadas y compatibles con las finalidades declaradas.</li>
              <li>
                Cumplir, cuando corresponda, con la inscripción de sus bancos de datos personales ante la autoridad
                competente.
              </li>
              <li>
                Atender, en su condición de responsable, las solicitudes de derechos que le dirijan los titulares.
              </li>
              <li>
                Custodiar las credenciales de acceso al sistema y gestionar de forma diligente las altas y bajas de
                sus usuarios y repartidores.
              </li>
            </ul>
          </LegalSection>

          <LegalSection n={6} titulo="Subencargados y Transferencias Internacionales">
            <p>
              El Responsable autoriza al Encargado a recurrir a los siguientes subencargados para la prestación del
              servicio:
            </p>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-xs md:text-sm border-collapse mt-2">
                <thead>
                  <tr className="border-b border-on-surface/10">
                    {['Subencargado', 'Servicio', 'Ubicación'].map((h) => (
                      <th
                        key={h}
                        className="text-left font-label uppercase tracking-widest text-[10px] text-on-surface/50 py-3 pr-4 font-normal"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SUBENCARGADOS.map((s) => (
                    <tr key={s.nombre} className="border-b border-on-surface/5">
                      <td className="py-3 pr-4 text-on-surface">{s.nombre}</td>
                      <td className="py-3 pr-4 leading-relaxed">{s.servicio}</td>
                      <td className="py-3 leading-relaxed text-on-surface/50">{s.ubicacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pt-2">
              El Encargado informará al Responsable de cualquier incorporación o sustitución de subencargados con una
              anticipación no menor a treinta (30) días calendario. El Responsable podrá oponerse por motivos
              fundados; de no alcanzarse una solución, podrá dar por terminado el contrato sin penalidad.
            </p>
            <p>
              El Responsable reconoce y acepta que la prestación del servicio implica{' '}
              <strong className="text-on-surface">flujo transfronterizo de datos personales</strong>, en particular
              hacia los Estados Unidos por el uso de la plataforma WhatsApp. El Encargado exige a sus subencargados
              garantías de confidencialidad y seguridad no inferiores a las de este Anexo.
            </p>
          </LegalSection>

          <LegalSection n={7} titulo="Medidas de Seguridad">
            <p>El Encargado aplica, como mínimo, las siguientes medidas:</p>
            <ul className="list-disc pl-5 space-y-2 text-on-surface/60">
              <li>Cifrado de las comunicaciones en tránsito.</li>
              <li>
                Control de acceso basado en credenciales individuales y en el principio de mínimo privilegio,
                limitado al personal que lo requiere por su función.
              </li>
              <li>Registro de la actividad relevante sobre los datos.</li>
              <li>Copias de respaldo periódicas y procedimientos de restauración.</li>
              <li>Compromisos de confidencialidad suscritos por el personal con acceso.</li>
              <li>Revisión periódica de las medidas frente a la evolución del riesgo.</li>
            </ul>
            <p className="text-on-surface/50 text-xs md:text-sm italic">
              Las partes reconocen que ninguna medida elimina por completo el riesgo, y que estas obligaciones son de
              medios y no de resultado.
            </p>
          </LegalSection>

          <LegalSection n={8} titulo="Incidentes de Seguridad">
            <p>
              El Encargado notificará al Responsable{' '}
              <strong className="text-on-surface">sin demora indebida</strong> desde que tenga conocimiento de un
              incidente de seguridad que afecte los datos objeto de este Anexo, poniendo a su disposición la
              información de que disponga sobre su naturaleza, los datos y titulares afectados, las consecuencias
              probables y las medidas adoptadas o propuestas.
            </p>
            <p>
              Corresponde al Responsable, en su condición de tal, evaluar y efectuar las comunicaciones que
              correspondan a la autoridad de protección de datos y a los titulares afectados, dentro de los plazos
              que exija la normativa vigente. El Encargado prestará la colaboración razonable que se le requiera para
              ello.
            </p>
          </LegalSection>

          <LegalSection n={9} titulo="Derechos de los Titulares y Auditoría">
            <p>
              Cuando un titular dirija al Encargado una solicitud de acceso, rectificación, actualización, inclusión,
              supresión, cancelación u oposición, este{' '}
              <strong className="text-on-surface">
                se abstendrá de resolverla y la trasladará al Responsable
              </strong>{' '}
              sin demora, informando de ello al titular. La resolución corresponde al Responsable.
            </p>
            <p>
              El Encargado facilitará al Responsable los medios técnicos razonables para atender dichas solicitudes
              dentro de los plazos legales.
            </p>
            <p>
              El Responsable podrá verificar el cumplimiento de este Anexo mediante solicitud de información
              documentada, con un preaviso razonable, sin que ello comprometa la confidencialidad de otros clientes
              del Encargado ni la seguridad de su infraestructura.
            </p>
          </LegalSection>

          <LegalSection n={10} titulo="Devolución y Supresión al Término">
            <p>
              Terminado el contrato por cualquier causa, el Responsable podrá solicitar{' '}
              <strong className="text-on-surface">una copia de los datos en formato estructurado</strong> de uso
              común, dentro del plazo de conservación previsto en los Términos y Condiciones.
            </p>
            <p>
              Transcurridos{' '}
              <strong className="text-on-surface">{CONTRATO.diasRetencionTrasSuspension} días calendario</strong> desde
              la terminación o la suspensión definitiva del servicio, el Encargado suprimirá los datos de forma
              segura, salvo aquellos que deba conservar por mandato legal, los cuales permanecerán bloqueados y
              únicamente a disposición de la autoridad competente.
            </p>
            <p>A solicitud del Responsable, el Encargado emitirá constancia escrita de la supresión efectuada.</p>
          </LegalSection>

          <LegalSection n={11} titulo="Responsabilidad y Vigencia">
            <p>
              Cada parte responde frente a la otra por los daños que le cause el incumplimiento de las obligaciones
              que este Anexo le atribuye. El Responsable mantendrá indemne al Encargado frente a reclamaciones
              derivadas de la falta de legitimidad de los datos que haya incorporado al sistema o de instrucciones
              contrarias a la normativa.
            </p>
            <p>
              Este Anexo entra en vigor con la contratación del servicio y permanece vigente mientras dure el
              tratamiento. Las obligaciones de confidencialidad y las relativas a la supresión de datos subsisten tras
              su terminación.
            </p>
          </LegalSection>
        </div>

        {/* Bloque de firmas — pensado para la versión impresa */}
        <section className="mt-12 rounded-2xl border border-on-surface/10 bg-surface-container/20 p-6 md:p-10 print:border-on-surface/40">
          <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-4">Conformidad de las Partes</h2>
          <p className="text-sm md:text-base text-on-surface/60 leading-relaxed mb-10">
            Las partes declaran haber leído y aceptado íntegramente el contenido de este Anexo. Su aceptación puede
            constar por suscripción de este documento o por la contratación del servicio conforme a los Términos y
            Condiciones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {[
              { rol: 'El Encargado', detalle: `${PROVEEDOR.razonSocial} · RUC ${PROVEEDOR.ruc}` },
              { rol: 'El Responsable', detalle: 'Razón social · RUC · Representante' },
            ].map((p) => (
              <div key={p.rol}>
                <div className="border-b border-on-surface/30 h-16"></div>
                <p className="font-label uppercase tracking-widest text-[10px] text-on-surface/50 mt-3">{p.rol}</p>
                <p className="text-xs md:text-sm text-on-surface/70 mt-1">{p.detalle}</p>
                <p className="text-[10px] text-on-surface/30 mt-3">Firma · Nombre · DNI · Fecha</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-button px-5 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:brightness-110"
          >
            <span className="material-symbols-outlined text-lg">print</span>
            Imprimir o guardar en PDF
          </button>
          <Link
            to="/terminos"
            className="inline-flex items-center gap-2 border border-on-surface/15 text-on-surface/70 font-button px-5 py-3 rounded-xl text-sm hover:bg-on-surface/5 transition-all"
          >
            Ver Términos y Condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}
