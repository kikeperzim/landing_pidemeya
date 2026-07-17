import ScrollReveal from './ScrollReveal';

export default function Cta() {
  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[38rem] h-[38rem] max-w-full bg-primary-container/20 rounded-full blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 p-8 md:p-12 rounded-[2rem] bg-surface-container/40 backdrop-blur-xl border border-primary-container/20 shadow-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-primary-container/10 border border-primary-container/30 text-primary-container font-label text-[11px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-sm">bolt</span>
              Activación inmediata
            </span>

            {/* Título compacto */}
            <h2 className="font-headline text-3xl md:text-5xl text-on-surface leading-[1.05] tracking-tight">
              ¡No esperes más!{' '}
              <span className="text-primary-container">Hazlo ahora</span>
            </h2>

            <p className="text-on-surface/60 font-body text-sm md:text-base max-w-md">
              Empieza a automatizar tus pedidos por WhatsApp hoy mismo. Tu primer mes es gratis y sin permanencia.
            </p>

            {/* Botón con anillo pulsante */}
            <div className="relative mt-2">
              <span className="absolute inset-0 rounded-2xl bg-primary-container/40 blur-md animate-pulse-glow pointer-events-none"></span>
              <a
                href="https://wa.me/51904773671?text=Hola%2C%20quiero%20activar%20mi%20mes%20gratis%20de%20PidemeYa%20y%20automatizar%20mi%20negocio."
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-3 bg-primary-container text-on-primary font-button px-10 py-5 text-base md:text-lg font-bold rounded-2xl shadow-[0px_20px_40px_rgba(251,101,10,0.35)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-2xl">chat</span>
                Contactar por WhatsApp
              </a>
            </div>

            {/* Señales de confianza */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-on-surface/50 text-xs mt-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-base">check_circle</span>
                Primer mes gratis
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-base">block</span>
                Sin permanencia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-base">credit_card_off</span>
                Sin tarjeta
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
