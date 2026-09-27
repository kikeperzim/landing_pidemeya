import { Link } from 'react-router-dom';

const SUBJECT_LABELS: Record<string, string> = {
  general: 'Consulta General',
  project: 'Nuevo Proyecto Digital',
  automation: 'Automatización',
  legal: 'Dudas Legales / Privacidad',
};

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const subject = SUBJECT_LABELS[(data.get('subject') as string) || 'general'] ?? 'Consulta General';
    const message = (data.get('message') as string)?.trim();

    const lines = [
      `Hola, soy ${name || 'un interesado'}.`,
      `Asunto: ${subject}`,
      email ? `Correo: ${email}` : '',
      message ? `Mensaje: ${message}` : '',
      '',
      `— Acepté la Política de Privacidad el ${new Date().toLocaleString('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
      })}.`,
    ].filter(Boolean);

    const url = `https://wa.me/51904773671?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen pt-44 md:pt-48 pb-24 text-on-surface">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
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
            <span className="font-label text-primary-container tracking-widest uppercase text-xs md:text-sm">Legal & Studio</span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl text-on-surface mb-6 md:mb-8 tracking-tight">Contáctanos</h1>
          <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
            Estamos listos para materializar tu visión digital. Cuéntanos sobre tu proyecto o consulta cualquier duda
            sobre nuestros términos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form side */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8 bg-surface-container/30 backdrop-blur-sm p-6 md:p-12 rounded-[40px] border border-on-surface/5 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-surface-container/50 border border-on-surface/5 rounded-2xl px-5 py-3 md:py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 focus:outline-none transition-all text-sm md:text-base placeholder:text-on-surface/20"
                    placeholder="Tu nombre..."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-surface-container/50 border border-on-surface/5 rounded-2xl px-5 py-3 md:py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 focus:outline-none transition-all text-sm md:text-base placeholder:text-on-surface/20"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest">
                  Asunto
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full bg-surface-container/40 border border-on-surface/5 rounded-2xl px-5 py-3 md:py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 focus:outline-none transition-all appearance-none text-sm md:text-base cursor-pointer"
                >
                  <option value="general" className="bg-surface">Consulta General</option>
                  <option value="project" className="bg-surface">Nuevo Proyecto Digital</option>
                  <option value="automation" className="bg-surface">Automatización</option>
                  <option value="legal" className="bg-surface">Dudas Legales / Privacidad</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-label text-on-surface/50 text-[10px] md:text-xs uppercase tracking-widest">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-surface-container/50 border border-on-surface/5 rounded-2xl px-5 py-3 md:py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 focus:outline-none transition-all resize-none text-sm md:text-base placeholder:text-on-surface/20"
                  placeholder="Cuéntanos más..."
                ></textarea>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consentimiento"
                  required
                  className="mt-1 w-4 h-4 accent-[color:var(--color-primary-container)] cursor-pointer shrink-0"
                />
                <span className="text-xs md:text-sm text-on-surface/60 group-hover:text-on-surface/80 transition-colors leading-relaxed">
                  He leído y acepto la{' '}
                  <Link to="/privacidad" className="text-primary-container hover:underline">
                    Política de Privacidad
                  </Link>{' '}
                  y autorizo el tratamiento de mis datos personales por Informatic Data Peru E.I.R.L. con la única
                  finalidad de atender esta consulta. *
                </span>
              </label>

              <p className="text-[11px] text-on-surface/35 leading-relaxed">
                Al enviar, se abrirá WhatsApp con su mensaje ya redactado. Los datos viajan por WhatsApp (Meta
                Platforms, Inc.) y no se almacenan en este sitio web. Puede solicitar el acceso, rectificación o
                eliminación de sus datos en cualquier momento escribiendo a contacto@pidemeya.com.
              </p>

              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary font-button py-4 md:py-6 rounded-2xl font-bold text-base md:text-lg active:scale-95 transition-all shadow-xl shadow-primary-container/20 hover:brightness-110 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Enviar por WhatsApp
              </button>
            </form>
          </div>

          {/* Info side */}
          <div className="lg:col-span-5 space-y-10 md:space-y-12">
            <section className="space-y-6">
              <h2 className="font-headline text-2xl md:text-3xl text-on-surface">Canales Directos</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-container/10 p-3 rounded-xl border border-primary-container/20">
                    <span className="material-symbols-outlined text-primary-container">mail</span>
                  </div>
                  <div>
                    <h4 className="text-on-surface font-medium text-sm md:text-base">Email Studio</h4>
                    <p className="text-on-surface/50 text-xs md:text-sm">contacto@pidemeya.com</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/51904773671"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 group hover:bg-on-surface/5 p-2 rounded-2xl transition-all"
                >
                  <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20 group-hover:border-green-500/50 group-hover:bg-green-500/20 transition-all">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-on-surface font-medium text-sm md:text-base">WhatsApp Directo</h4>
                    <p className="text-green-500/80 text-xs md:text-sm">904 773 671</p>
                  </div>
                </a>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-headline text-2xl md:text-3xl text-on-surface">Ubicación</h2>
              <div className="bg-surface-container/30 backdrop-blur-sm p-6 rounded-2xl border border-on-surface/5">
                <p className="text-on-surface/60 text-xs md:text-sm italic leading-relaxed">
                  "Operamos bajo un modelo arquitectónico digital: presencia global, atención personalizada."
                </p>
              </div>
            </section>

            
          </div>
        </div>
      </div>
    </div>
  );
}
