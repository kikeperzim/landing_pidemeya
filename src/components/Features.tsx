export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative">
            <div className="aspect-square bg-surface-container-high overflow-hidden rounded-3xl shadow-2xl">
              <img
                className="w-full h-full object-cover transition-all duration-700"
                alt="High tech minimal server room aesthetics"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLDJD5hHTZqfrac9oTGtKDvKJ31NavyPwlp0GRkXWKehHHk_pRHWLx1NfFSOyW2uU0kJ9tQ19mr9MQGYlzz_tZ5ef_8MY5WMl2CMeLOv4zwqmh-FlvE_8Ua24drU6BzteoD8sKj8oSaOH1eaR2Tv4rN8vzxHLNOSjyBgtcLMWEQsQxMe-5A5CxwaubjoyspOcVusqB1CpQZ07rVL_PEtHl25TOMb_a3g3pPHgDr2tODDs3D-w4MXd3kd86IMadW2JwzvKuKT8UpFc"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-12 -right-6 md:-right-12 bg-primary-container p-6 md:p-12 rounded-2xl shadow-2xl">
              <span className="font-headline text-4xl md:text-6xl text-on-primary">99%</span>
              <p className="font-label uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2 text-on-primary font-bold">
                Optimizacion &amp; Velocidad
              </p>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 text-center lg:text-left">
            <span className="font-label text-primary-container font-bold uppercase tracking-[0.3em] text-xs block mb-6">
              Por qué nosotros
            </span>
            <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-8 md:mb-12">Ingeniería digital sin compromisos.</h2>
            <ul className="space-y-8 md:space-y-12 text-left">
              <li className="flex gap-6">
                <span className="font-serif text-3xl md:text-4xl text-on-surface/10 group-hover:text-primary-container/20 transition-colors">01</span>
                <div>
                  <h4 className="font-ui font-bold text-on-surface text-lg md:text-xl mb-2">Velocidad Extrema</h4>
                  <p className="text-on-surface/60 font-body text-sm md:text-base">
                    Páginas optimizadas para cargar en milisegundos. El tiempo es dinero, nosotros te ahorramos ambos.
                  </p>
                </div>
              </li>

              <li className="flex gap-6">
                <span className="font-serif text-3xl md:text-4xl text-on-surface/10 group-hover:text-primary-container/20 transition-colors">02</span>
                <div>
                  <h4 className="font-ui font-bold text-on-surface text-lg md:text-xl mb-2">Automatización Nativa</h4>
                  <p className="text-on-surface/60 font-body text-sm md:text-base">
                    Tu sistema web no es solo un folleto, es una máquina de ventas que trabaja con automatizaciones de whatsapp business.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="font-serif text-3xl md:text-4xl text-on-surface/10 group-hover:text-primary-container/20 transition-colors">03</span>
                <div>
                  <h4 className="font-ui font-bold text-on-surface text-lg md:text-xl mb-2">Soporte 24/7</h4>
                  <p className="text-on-surface/60 font-body text-sm md:text-base">
                    Nuestros sistemas son críticos para tu operación. Estamos ahí cuando más nos necesitas.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
