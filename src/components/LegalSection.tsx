import { PROVEEDOR } from '../config/legal';

/** Sección numerada de un documento legal (/terminos, /privacidad). */
export function LegalSection({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-surface-container/30 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-on-surface/5">
      <h2 className="font-headline text-xl md:text-2xl text-on-surface mb-5 flex items-baseline gap-3">
        <span className="text-primary-container font-black text-base md:text-lg shrink-0">
          {String(n).padStart(2, '0')}
        </span>
        {titulo}
      </h2>
      <div className="space-y-4 leading-relaxed text-sm md:text-base">{children}</div>
    </section>
  );
}

/** Aviso mostrado mientras el documento espera validación legal y datos pendientes. */
export function LegalDraftBanner() {
  return (
    <div className="mb-12 flex items-start gap-4 rounded-2xl border border-primary-container/40 bg-primary-container/10 p-5 md:p-6">
      <span className="material-symbols-outlined text-primary-container mt-0.5">edit_note</span>
      <p className="text-sm md:text-base text-on-surface/80 leading-relaxed">
        <strong className="text-on-surface">Documento en revisión.</strong> Esta versión se encuentra pendiente de
        validación legal y de la confirmación de algunos datos operativos. Para consultas sobre las condiciones
        vigentes, escríbanos a{' '}
        <a href={`mailto:${PROVEEDOR.email}`} className="text-primary-container hover:underline">
          {PROVEEDOR.email}
        </a>
        .
      </p>
    </div>
  );
}
