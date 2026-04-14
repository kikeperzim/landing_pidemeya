import { Link } from 'react-router-dom';
import { NavHashLink as HashLink } from 'react-router-hash-link';

export default function Projects() {
  return (
    <main className="pt-32 pb-24 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      {/* Hero Header */}
      <header className="max-w-7xl mx-auto px-8 mb-20">
        {/* Back button */}
        <div className="mb-12">
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
        <div className="flex items-center gap-4 mb-6">
          <div className="h-0.5 w-12 bg-primary-container"></div>
          <span className="font-label text-primary-container text-xs uppercase tracking-[0.2em] font-bold">
            Showcase v.24
          </span>
        </div>
        <h1 className="font-headline text-6xl md:text-8xl text-white leading-none mb-8 tracking-tighter">
          Nuestra Galería de <br />
          <span className="italic text-primary-container">Soluciones</span>
        </h1>
        <p className="max-w-2xl text-lg text-on-surface/70 leading-relaxed font-body">
          Maestría digital y automatización en acción. Construimos herramientas de alto rendimiento que cierran la
          brecha entre datos complejos e intuición humana.
        </p>
      </header>

      {/* Bento Grid Portfolio */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 md:auto-rows-[280px]">
          {/* Card 1: Large Dashboard */}
          <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-2xl bg-surface-container-low shadow-xl transition-all border border-on-surface/5 min-h-[400px] md:min-h-0">
            <div className="absolute inset-0 z-0 flex items-start justify-center p-4">
              <img
                className="w-full h-auto object-contain rounded-xl shadow-2xl group-hover:scale-[1.02] transition-all duration-700"
                alt="Dashboard Pidemeya"
                src="/dashboard.webp"
                fetchPriority="high"
              />
            </div>
            {/* Overlay to ensure text readability only at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
            <div className="relative z-10 h-full mt-10 flex flex-col justify-end p-6 md:p-10">
              <h3 className="font-headline text-2xl md:text-4xl text-on-surface mb-2">Dashboard</h3>
              <p className="text-on-surface/60 max-w-md mb-6 font-body text-sm md:text-base">
                Monitoreo logístico en tiempo real con rutas predictivas y despacho automatizado para tus negocios.
              </p>
            </div>
          </div>

          {/* Card 2: AI Tool */}
          <div className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-2xl bg-surface-container-high border border-on-surface/5 transition-all min-h-[400px] md:min-h-0">
            <div className="flex flex-col items-center justify-center p-4">
                <img
                  className="w-full h-full rounded-xl"
                  alt="AI Interface"
                  src="/image.webp"
                  loading="lazy"
                />
                <h3 className="font-headline text-2xl mt-4 md:text-4xl text-on-surface mb-2">Funcionalidades</h3>
                <p className="text-on-surface/60 max-w-md mb-6 font-body text-sm md:text-base">
                  Descubre el funcionamiento del sistema con la automatización de procesos de pedidos con whatsapp business.
                </p>
            </div>
            
              
          </div>

          {/* Card 3: Automation Demo (Spline Full Width) */}
          <div className="md:col-span-12 md:row-span-2 group relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-on-surface/5 shadow-xl h-[350px] md:h-auto">
            <div className="absolute inset-0 z-0 bg-transparent flex items-center justify-center overflow-hidden">
                <img
                  src="/flujo.webp"
                  alt="Flujo de Automatización CRM"
                 
                  loading="lazy"
                />
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10 w-full bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent pt-32 pointer-events-none">
              <span className="px-2 py-0.5 bg-on-surface/10 text-on-surface font-label text-[10px] font-bold uppercase rounded-sm mb-2 inline-block shadow-sm">
                WhatsApp Business
              </span>
              <h4 className="text-on-surface font-headline text-2xl md:text-3xl drop-shadow-lg leading-tight">
                Flujo de Automatización
              </h4>
            </div>
          </div>

          
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 mt-32">
        <div className="bg-surface-container-low p-16 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden border border-on-surface/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 blur-[120px] rounded-full"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-headline text-5xl text-on-surface mb-4 tracking-tight">¿Listo para escalar?</h2>
            <p className="text-on-surface/70 font-body max-w-md">
              Convirtamos tus procesos manuales en una ventaja competitiva de alta velocidad con PidemeYa.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contactanos"
              className="bg-primary-container text-black font-button font-bold px-10 py-4 rounded-xl shadow-lg active:scale-95 transition-all"
            >
              Agendar Demo
            </Link>
            <HashLink
              smooth
              to="/#proceso"
              className="border border-on-surface/10 hover:bg-on-surface/5 text-on-surface font-button font-bold px-10 py-4 rounded-xl transition-all"
            >
              Nuestro Proceso
            </HashLink>
          </div>
        </div>
      </section>
    </main>
  );
}
