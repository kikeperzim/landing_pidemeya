export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface" id="resenas">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-7xl mb-8 md:mb-12 tracking-tighter text-on-surface">
          Lo que dicen nuestros <span className="text-primary-container italic">aliados</span>
        </h2>

        <div className="max-w-4xl mx-auto bg-surface-container/30 backdrop-blur-md border border-on-surface/5 p-8 md:p-16 rounded-[30px] md:rounded-[40px] shadow-2xl relative overflow-hidden group">
          {/* Decorative accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-primary-container/20 group-hover:w-40 transition-all duration-700"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-primary-container/10 p-5 md:p-6 rounded-full border border-primary-container/20 mb-6 md:mb-8 animate-pulse">
              <span className="material-symbols-outlined text-primary-container text-4xl md:text-5xl">auto_awesome</span>
            </div>

            <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-6">
              Próximamente estaremos compartiendo nuestras historias de éxito.
            </h3>

            <p className="font-body text-on-surface/50 text-base md:text-xl leading-relaxed max-w-2xl px-4 italic">
              Estamos trabajando mano a mano con empresas líderes para transformar su futuro digital. Muy pronto
              podrás ver cómo hemos impulsado sus negocios.
            </p>

            <div className="mt-8 md:mt-12 flex gap-4 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-container/40"></div>
            </div>
          </div>

          {/* Background texture icon */}
          <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[120px] md:text-[180px] text-on-surface/5 -rotate-12 pointer-events-none select-none">
            forum
          </span>
        </div>
      </div>
    </section>
  );
}
