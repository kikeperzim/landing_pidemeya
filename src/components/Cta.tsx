import { Link } from 'react-router-dom';

export default function Cta() {
  return (
    <section className="py-40 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          <div className="border-r border-on-surface/5"></div>
          <div className="border-r border-on-surface/5"></div>
          <div className="border-r border-on-surface/5"></div>
          <div className="border-r border-on-surface/5"></div>
          <div className="border-r border-on-surface/5"></div>
          <div className="border-r border-on-surface/5"></div>
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="font-headline text-6xl md:text-8xl text-on-surface mb-12 max-w-4xl mx-auto leading-none">
          ¿Listo para construir el futuro de tu negocio?
        </h2>
        <p className="font-body text-on-surface/60 text-xl mb-16 max-w-2xl mx-auto">
          Únete a las empresas que están transformando su presencia digital en una ventaja competitiva imparable.
        </p>
        <Link
          to="/contactanos"
          className="inline-block bg-primary-container text-on-primary font-button px-16 py-6 text-xl font-bold active:scale-95 transition-all rounded-2xl shadow-[0px_20px_40px_rgba(251,101,10,0.3)]"
        >
          Contactar Ahora
        </Link>
      </div>
    </section>
  );
}
