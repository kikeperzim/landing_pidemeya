import ScrollReveal from './ScrollReveal';

export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <ScrollReveal direction="right" distance={100}>
            <div className="relative">
              <div className="aspect-square bg-surface-container-high overflow-hidden rounded-3xl shadow-2xl">
                <img
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  alt="High tech minimal server room aesthetics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLDJD5hHTZqfrac9oTGtKDvKJ31NavyPwlp0GRkXWKehHHk_pRHWLx1NfFSOyW2uU0kJ9tQ19mr9MQGYlzz_tZ5ef_8MY5WMl2CMeLOv4zwqmh-FlvE_8Ua24drU6BzteoD8sKj8oSaOH1eaR2Tv4rN8vzxHLNOSjyBgtcLMWEQsQxMe-5A5CxwaubjoyspOcVusqB1CpQZ07rVL_PEtHl25TOMb_a3g3pPHgDr2tODDs3D-w4MXd3kd86IMadW2JwzvKuKT8UpFc"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 md:-bottom-12 -right-6 md:-right-12 bg-primary-container p-6 md:p-12 rounded-2xl shadow-2xl">
                <span className="font-headline text-4xl md:text-6xl text-on-primary">99%</span>
                <p className="font-label uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2 text-on-primary font-bold">
                  Optimización &amp; Velocidad
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 lg:mt-0 text-center lg:text-left">
            <ScrollReveal>
              <span className="font-label text-primary-container font-bold uppercase tracking-[0.3em] text-xs block mb-6">
                Por qué nosotros
              </span>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-8 md:mb-12 tracking-tight">Ingeniería digital sin compromisos.</h2>
            </ScrollReveal>
            
            <ul className="space-y-8 md:space-y-12 text-left">
              {[
                {
                  num: "01",
                  title: "Velocidad Extrema",
                  desc: "Páginas optimizadas para cargar en milisegundos. El tiempo es dinero, nosotros te ahorramos ambos."
                },
                {
                  num: "02",
                  title: "Automatización Nativa",
                  desc: "Tu sistema web no es solo un folleto, es una máquina de ventas que trabaja con automatizaciones de whatsapp business."
                },
                {
                  num: "03",
                  title: "Soporte 24/7",
                  desc: "Nuestros sistemas son críticos para tu operación. Estamos ahí cuando más nos necesitas."
                }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={0.1 * (idx + 1)} direction="left">
                  <li className="flex gap-6 group">
                    <span className="font-serif text-3xl md:text-4xl text-on-surface/10 group-hover:text-primary-container transition-colors">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-ui font-bold text-on-surface text-lg md:text-xl mb-2 group-hover:text-primary-container transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-on-surface/60 font-body text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
