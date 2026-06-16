import { Link } from "react-router-dom";
import { NavHashLink as HashLink } from "react-router-hash-link";
import { Stage } from "../components/animations";
import { ChatCommercial } from "../components/ChatCommercial";
import N8nFlowAnimation from "../components/N8nFlowAnimation";
import DashboardCarousel from "../components/DashboardCarousel";

export default function Projects() {
  return (
    <main className="pt-44 md:pt-48 pb-24 relative overflow-hidden">
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
        <h1 className="font-headline text-6xl md:text-8xl text-on-surface leading-none mb-8 tracking-tighter">
          Galería de <br />
          <span className="italic text-primary-container">Funcionalidades</span>
        </h1>
        <p className="max-w-2xl text-lg text-on-surface/70 leading-relaxed font-body">
          Maestría digital y automatización en acción. Construimos herramientas
          de alto rendimiento que cierran la brecha entre datos complejos e
          intuición humana.
        </p>
      </header>

      {/* Bento Grid Portfolio */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 md:auto-rows-[280px]">
          {/* Card 1: Pasarela Interactiva Dashboard & Gestión de Pedidos */}
          <div className="md:col-span-8 pt-18 md:row-span-2 group relative overflow-hidden rounded-3xl bg-transparent border-none shadow-none h-fit p-0">
            <DashboardCarousel />
          </div>

          {/* Card 2: Simulación del Bot Interactiva */}
          <div className="md:col-span-4 md:row-span-2 flex flex-col items-center justify-center h-full">
            {/* Contenedor exacto del Celular (Elimina bordes negros laterales y flota limpio) */}
            <div className="w-[350px] h-[732px] relative overflow-hidden flex items-center justify-center">
              <Stage
                width={770}
                height={1636}
                duration={52}
                background="transparent"
                loop={true}
                autoplay={true}
                persistKey="pidemeya-commercial"
                showControls={false}
                scaleMode="contain"
              >
                <ChatCommercial
                  accent="#F26522"
                  slogan="AUTOMATIZA · ORGANIZA · ENTREGA MEJOR"
                />
              </Stage>
            </div>
          </div>

          {/* Card 3: Animación del Flujo n8n (Ancho Completo) */}
          <div className="md:col-span-12 md:row-span-2 group relative overflow-hidden rounded-3xl bg-transparent border-none shadow-none h-fit p-0">
            <div className="relative overflow-hidden rounded-3xl border border-on-surface/10 shadow-2xl bg-surface-container-low">
              <N8nFlowAnimation />

              {/* Panel de información superpuesto al hacer Hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 backdrop-blur-md bg-surface-container-lowest/80 border-t border-white/10 rounded-b-3xl pointer-events-none">
                <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  Flujo de Automatización n8n
                </h3>
                <p className="text-on-surface/80 max-w-xl font-body text-sm md:text-base transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                  Orquestación e integración en tiempo real del bot de WhatsApp,
                  motores de Inteligencia Artificial y la logística de despacho
                  y entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 mt-32">
        <div className="bg-surface-container-low p-16 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden border border-on-surface/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 blur-[120px] rounded-full"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-headline text-5xl text-on-surface mb-4 tracking-tight">
              ¿Listo para escalar?
            </h2>
            <p className="text-on-surface/70 font-body max-w-md">
              Convirtamos tus procesos manuales en una ventaja competitiva de
              alta velocidad con PidemeYa.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contactanos"
              className="bg-primary-container text-on-primary font-button font-bold px-10 py-4 rounded-xl shadow-lg active:scale-95 transition-all"
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
