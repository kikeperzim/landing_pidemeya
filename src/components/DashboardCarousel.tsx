import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    src: "/Dashboard.webp",
    alt: "Dashboard Principal de Pidemeya",
    title: "Dashboard",
    description: "Monitoreo logístico en tiempo real con rutas predictivas y despacho automatizado para tus negocios."
  },
  {
    id: 2,
    src: "/Gestion-pedidos.webp",
    alt: "Gestión de Pedidos de Pidemeya",
    title: "Gestión de Pedidos",
    description: "Sistema de Gestión de pedidos con monitoreo en tiempo real. Diseñado para optimizar el flujo de trabajo de los repartidores y mejorar la experiencia del cliente."
  }
];

const AUTO_PLAY_TIME = 5000; // Alterna la imagen cada 5 segundos

export default function DashboardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, AUTO_PLAY_TIME);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      className="relative overflow-hidden rounded-3xl border border-on-surface/10 shadow-2xl bg-[#07090b] w-full group/carousel"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Contenedor de la Imagen principal */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive 
                  ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto' 
                  : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
              }`}
            >
              <img
                className="w-full h-full object-cover select-none pointer-events-none block"
                alt={slide.alt}
                src={slide.src}
                fetchPriority={index === 0 ? "high" : "low"}
              />
            </div>
          );
        })}

        {/* Panel de información original superpuesto al hacer Hover */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-x-0 bottom-0 p-6 md:p-8 backdrop-blur-md bg-surface-container-lowest/80 border-t border-white/10 rounded-b-3xl transition-transform duration-500 ease-out z-10 ${
                isActive 
                  ? 'translate-y-full group-hover/carousel:translate-y-0 pointer-events-auto' 
                  : 'translate-y-full pointer-events-none'
              }`}
            >
              {/* Título de la diapositiva */}
              <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-2 font-bold tracking-tight">
                {slide.title}
              </h3>
              {/* Descripción de la diapositiva */}
              <p className="text-on-surface/80 max-w-xl font-body text-sm md:text-base leading-relaxed">
                {slide.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
