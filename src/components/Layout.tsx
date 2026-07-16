import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MeshBackground from './MeshBackground';
import SmoothScroll from './SmoothScroll';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function Layout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Since we're using a native background, we don't need to wait for heavy Spine assets.
    // However, I'll simulate a brief load for the "wow" effect of the preloader.
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SmoothScroll>
      <div className={`bg-transparent text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen ${loaded ? 'loaded' : 'overflow-hidden'}`}>
        {/* NATIVE HIGH PERFORMANCE BACKGROUND */}
        <MeshBackground />

        {/* PIDEME-YA PRELOADER */}
        <div
          id="preloader"
          className={`fixed inset-0 flex items-center justify-center bg-white z-[9999] transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative flex flex-col items-center gap-8 md:gap-10">
            {/* Resplandor de marca suave */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[radial-gradient(circle,rgba(251,101,10,0.14)_0%,transparent_70%)] blur-2xl animate-pulse-glow pointer-events-none"></div>

            {/* Logo completo PidemeYa */}
            <img
              src="/images/LogoPidemeya.webp"
              alt="PidemeYa"
              className="relative z-10 h-14 md:h-20 w-auto animate-logo-breathe drop-shadow-[0_10px_30px_rgba(251,101,10,0.18)]"
              loading="eager"
              fetchPriority="high"
            />

            {/* Barra de progreso indeterminada */}
            <div className="relative z-10 w-44 md:w-56 h-1.5 rounded-full bg-[#FB650A]/15 overflow-hidden">
              <div className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#FB650A] to-[#ff9450] animate-loader-bar"></div>
            </div>
          </div>
        </div>

        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />

        <FloatingWhatsApp />
      </div>
    </SmoothScroll>
  );
}
