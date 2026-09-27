import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROVEEDOR } from '../config/legal';

/**
 * Libro de Reclamaciones Virtual — Hoja de Reclamación
 * Estructura exigida por el D.S. 011-2011-PCM (Reglamento del Libro de Reclamaciones
 * del Código de Protección y Defensa del Consumidor, Ley N.º 29571).
 *
 * PENDIENTE DE BACKEND: el correlativo, la conservación por 2 años y el envío
 * automático de copia al consumidor deben ejecutarse en servidor.
 * Los datos del proveedor viven en src/config/legal.ts.
 */

const TIPO_DOC = ['DNI', 'Carné de extranjería', 'Pasaporte', 'RUC'] as const;

type Registro = {
  codigo: string;
  fecha: string;
  texto: string;
};

/** Correlativo provisional client-side. El definitivo lo debe emitir el backend. */
function generarCodigo(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `LR-${stamp}-${rand}`;
}

export default function Complaints() {
  const [esMenor, setEsMenor] = useState(false);
  const [registro, setRegistro] = useState<Registro | null>(null);
  const [copiado, setCopiado] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => ((f.get(k) as string) || '').trim();

    const codigo = generarCodigo();
    const fecha = new Date().toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'short' });

    const bloques: string[] = [
      `HOJA DE RECLAMACIÓN N.º ${codigo}`,
      `Fecha y hora de registro: ${fecha}`,
      '',
      '1. IDENTIFICACIÓN DEL PROVEEDOR',
      `Razón social: ${PROVEEDOR.razonSocial} (${PROVEEDOR.nombreComercial})`,
      `RUC: ${PROVEEDOR.ruc}`,
      `Domicilio: ${PROVEEDOR.domicilio}`,
      '',
      '2. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE',
      `Nombres y apellidos: ${get('nombre')}`,
      `Documento: ${get('tipoDoc')} ${get('numDoc')}`,
      `Domicilio: ${get('domicilio')}`,
      `Teléfono: ${get('telefono')}`,
      `Correo electrónico: ${get('email')}`,
      `¿Es menor de edad?: ${esMenor ? 'Sí' : 'No'}`,
    ];

    if (esMenor) {
      bloques.push(
        `Padre o apoderado: ${get('apoderadoNombre')}`,
        `Documento del apoderado: ${get('apoderadoDoc')}`,
      );
    }

    bloques.push(
      '',
      '3. IDENTIFICACIÓN DEL BIEN CONTRATADO',
      `Tipo: ${get('tipoBien')}`,
      `Monto reclamado: ${get('monto') ? `S/ ${get('monto')}` : 'No aplica'}`,
      `Descripción: ${get('descripcionBien')}`,
      '',
      '4. DETALLE DE LA RECLAMACIÓN',
      `Tipo: ${get('tipoReclamo')}`,
      `Detalle: ${get('detalle')}`,
      `Pedido del consumidor: ${get('pedido')}`,
      '',
      '5. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR',
      '(A completar por el proveedor dentro del plazo de ley.)',
    );

    const texto = bloques.join('\n');

    setRegistro({ codigo, fecha, texto });
    setCopiado(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const asunto = `Libro de Reclamaciones ${codigo} — ${get('tipoReclamo')}`;
    window.location.href = `mailto:${PROVEEDOR.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(texto)}`;
  };

  const copiar = async () => {
    if (!registro) return;
    try {
      await navigator.clipboard.writeText(registro.texto);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  const inputClass =
    'w-full bg-surface-container/50 border border-on-surface/5 rounded-2xl px-5 py-3 md:py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 focus:outline-none transition-all text-sm md:text-base placeholder:text-on-surface/20';
  const labelClass =
    'font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest';

  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24 text-on-surface">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
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
              Libro de Reclamaciones
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">
            Hoja de Reclamación
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N.º 29571), este
            establecimiento cuenta con un Libro de Reclamaciones virtual a su disposición.
          </p>
        </div>

        {/* Confirmación de registro */}
        {registro && (
          <div className="mb-12 bg-primary-container/10 border border-primary-container/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="material-symbols-outlined text-primary-container mt-1">task_alt</span>
              <div>
                <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-2">
                  Su reclamación fue registrada
                </h2>
                <p className="text-sm md:text-base text-on-surface/70 leading-relaxed">
                  Código de reclamación:{' '}
                  <strong className="text-primary-container font-mono">{registro.codigo}</strong>
                  <br />
                  Fecha: {registro.fecha}
                </p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-on-surface/60 leading-relaxed mb-6">
              Se abrió su gestor de correo con una copia de la hoja. Si no se abrió, use el botón de abajo para copiar
              el detalle y envíelo a{' '}
              <a href={`mailto:${PROVEEDOR.email}`} className="text-primary-container hover:underline">
                {PROVEEDOR.email}
              </a>
              . Conserve este código: es su constancia del registro.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copiar}
                className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-button px-5 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:brightness-110"
              >
                <span className="material-symbols-outlined text-lg">
                  {copiado ? 'check' : 'content_copy'}
                </span>
                {copiado ? 'Copiado' : 'Copiar mi hoja de reclamación'}
              </button>
              <button
                onClick={() => setRegistro(null)}
                className="inline-flex items-center gap-2 border border-on-surface/15 text-on-surface/70 font-button px-5 py-3 rounded-xl text-sm hover:bg-on-surface/5 transition-all"
              >
                Registrar otra
              </button>
            </div>
          </div>
        )}

        {/* Datos del proveedor */}
        <section className="mb-10 bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5">
          <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-5">1. Identificación del Proveedor</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm md:text-base">
            <div>
              <dt className={labelClass}>Razón social</dt>
              <dd className="text-on-surface/80 mt-1">{PROVEEDOR.razonSocial}</dd>
            </div>
            <div>
              <dt className={labelClass}>Nombre comercial</dt>
              <dd className="text-on-surface/80 mt-1">{PROVEEDOR.nombreComercial}</dd>
            </div>
            <div>
              <dt className={labelClass}>RUC</dt>
              <dd className="text-on-surface/80 mt-1">{PROVEEDOR.ruc}</dd>
            </div>
            <div>
              <dt className={labelClass}>Domicilio</dt>
              <dd className="text-on-surface/80 mt-1">{PROVEEDOR.domicilio}</dd>
            </div>
          </dl>
        </section>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* 2. Consumidor */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5 space-y-6">
            <h2 className="font-headline text-xl md:text-2xl text-on-surface">
              2. Identificación del Consumidor Reclamante
            </h2>

            <div className="space-y-2">
              <label htmlFor="nombre" className={labelClass}>Nombres y apellidos *</label>
              <input id="nombre" name="nombre" type="text" required className={inputClass} placeholder="Tal como figura en su documento" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="tipoDoc" className={labelClass}>Tipo de documento *</label>
                <select id="tipoDoc" name="tipoDoc" required className={`${inputClass} appearance-none cursor-pointer`}>
                  {TIPO_DOC.map((t) => (
                    <option key={t} value={t} className="bg-surface">{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="numDoc" className={labelClass}>Número de documento *</label>
                <input id="numDoc" name="numDoc" type="text" required className={inputClass} placeholder="00000000" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="domicilio" className={labelClass}>Domicilio *</label>
              <input id="domicilio" name="domicilio" type="text" required className={inputClass} placeholder="Dirección, distrito, provincia" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="telefono" className={labelClass}>Teléfono *</label>
                <input id="telefono" name="telefono" type="tel" required className={inputClass} placeholder="999 999 999" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder="ejemplo@correo.com" />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={esMenor}
                onChange={(e) => setEsMenor(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[color:var(--color-primary-container)] cursor-pointer shrink-0"
              />
              <span className="text-sm text-on-surface/70 group-hover:text-on-surface/90 transition-colors">
                El consumidor reclamante es menor de edad
              </span>
            </label>

            {esMenor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label htmlFor="apoderadoNombre" className={labelClass}>Nombre del padre o apoderado *</label>
                  <input id="apoderadoNombre" name="apoderadoNombre" type="text" required className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="apoderadoDoc" className={labelClass}>Documento del apoderado *</label>
                  <input id="apoderadoDoc" name="apoderadoDoc" type="text" required className={inputClass} />
                </div>
              </div>
            )}
          </section>

          {/* 3. Bien contratado */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5 space-y-6">
            <h2 className="font-headline text-xl md:text-2xl text-on-surface">
              3. Identificación del Bien Contratado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="tipoBien" className={labelClass}>Tipo *</label>
                <select id="tipoBien" name="tipoBien" required className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="Servicio" className="bg-surface">Servicio</option>
                  <option value="Producto" className="bg-surface">Producto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="monto" className={labelClass}>Monto reclamado (S/)</label>
                <input id="monto" name="monto" type="number" min="0" step="0.01" className={inputClass} placeholder="Opcional" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="descripcionBien" className={labelClass}>Descripción del producto o servicio *</label>
              <textarea
                id="descripcionBien"
                name="descripcionBien"
                rows={3}
                required
                className={`${inputClass} resize-none`}
                placeholder="Indique el plan contratado, el pedido o el servicio al que se refiere."
              ></textarea>
            </div>
          </section>

          {/* 4. Detalle */}
          <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-on-surface/5 space-y-6">
            <h2 className="font-headline text-xl md:text-2xl text-on-surface">4. Detalle de la Reclamación</h2>

            <div className="space-y-2">
              <label htmlFor="tipoReclamo" className={labelClass}>Tipo *</label>
              <select id="tipoReclamo" name="tipoReclamo" required className={`${inputClass} appearance-none cursor-pointer`}>
                <option value="Reclamo" className="bg-surface">Reclamo</option>
                <option value="Queja" className="bg-surface">Queja</option>
              </select>
              <p className="text-xs text-on-surface/50 leading-relaxed pt-2">
                <strong className="text-on-surface/70">Reclamo:</strong> disconformidad relacionada con el producto o
                servicio contratado.{' '}
                <strong className="text-on-surface/70">Queja:</strong> disconformidad no relacionada con el producto o
                servicio, o malestar respecto de la atención al público.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="detalle" className={labelClass}>Detalle *</label>
              <textarea
                id="detalle"
                name="detalle"
                rows={5}
                required
                className={`${inputClass} resize-none`}
                placeholder="Describa lo ocurrido con el mayor detalle posible."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="pedido" className={labelClass}>Pedido del consumidor *</label>
              <textarea
                id="pedido"
                name="pedido"
                rows={3}
                required
                className={`${inputClass} resize-none`}
                placeholder="Indique qué solución solicita."
              ></textarea>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consentimiento"
                required
                className="mt-1 w-4 h-4 accent-[color:var(--color-primary-container)] cursor-pointer shrink-0"
              />
              <span className="text-sm text-on-surface/70 group-hover:text-on-surface/90 transition-colors leading-relaxed">
                Declaro que la información proporcionada es veraz y autorizo el tratamiento de mis datos personales
                para la atención de esta reclamación, conforme a la{' '}
                <Link to="/privacidad" className="text-primary-container hover:underline">
                  Política de Privacidad
                </Link>
                . *
              </span>
            </label>
          </section>

          <button
            type="submit"
            className="w-full bg-primary-container text-on-primary font-button py-4 md:py-6 rounded-2xl font-bold text-base md:text-lg active:scale-95 transition-all shadow-xl shadow-primary-container/20 hover:brightness-110 flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">send</span>
            Enviar hoja de reclamación
          </button>
        </form>

        {/* Avisos legales */}
        <section className="mt-12 bg-surface-container/20 border border-on-surface/5 rounded-2xl p-6 md:p-8 space-y-4 text-xs md:text-sm text-on-surface/60 leading-relaxed">
          <h2 className="font-headline text-lg md:text-xl text-on-surface">Información importante</h2>
          <p>
            El proveedor debe dar respuesta al reclamo en un plazo no mayor a{' '}
            <strong className="text-on-surface/80">quince (15) días hábiles</strong>, plazo que puede ser extendido por
            un periodo igual cuando la naturaleza del reclamo lo justifique, previa comunicación al consumidor.
          </p>
          <p>
            La formulación de un reclamo{' '}
            <strong className="text-on-surface/80">no impide acudir a otras vías de solución de controversias</strong>{' '}
            ni constituye requisito previo para interponer una denuncia ante el INDECOPI.
          </p>
          <p>
            Los datos consignados en esta hoja se conservarán por el plazo mínimo de dos (2) años que exige la
            normativa aplicable, y serán tratados únicamente para la atención de su reclamación.
          </p>
        </section>
      </div>
    </div>
  );
}
