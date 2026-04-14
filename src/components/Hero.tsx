import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20">
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl text-on-surface leading-[1.1] md:leading-[0.9] max-w-5xl mb-8 md:mb-12 tracking-tight md:tracking-tighter">
          Diseñamos sistemas web modernas, <span className="text-primary-container">rápidas,</span>
          <br className="hidden md:block" />
          <span className="text-primary-container"> automatizadas</span> a la medida de cada {' '}
          <span className="text-primary-container italic">negocio</span>
        </h1>
        <p className="font-body text-on-surface/70 text-base md:text-2xl max-w-3xl mb-12 md:mb-16 leading-relaxed px-4 md:px-0">
          Creamos sistemas web con automatizaciones inteligentes para que tu negocio crezca con una presencia profesional mediante WhatsApp Business.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-6 sm:px-0">
          <Link
            to="/contactanos"
            className="font-button bg-primary-container text-on-primary text-lg md:text-xl px-10 md:px-14 py-4 md:py-6 font-bold active:scale-95 transition-all rounded-2xl shadow-[0px_20px_40px_rgba(251,101,10,0.3)] text-center flex items-center justify-center"
          >
            Solicitar demo
          </Link>
          <Link
            to="/proyectos"
            className="font-button bg-secondary-container text-on-secondary text-lg md:text-xl px-10 md:px-14 py-4 md:py-6 font-bold active:scale-95 transition-all rounded-2xl shadow-lg text-center flex items-center justify-center border border-on-surface/5 hover:bg-on-surface/5 transition-colors"
          >
            Ver proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
