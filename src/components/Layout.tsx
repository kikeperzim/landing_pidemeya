import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MeshBackground from './MeshBackground';
import SmoothScroll from './SmoothScroll';

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

        {/* PREDME-YA PRELOADER */}
        <div
          id="preloader"
          className={`fixed inset-0 flex items-center justify-center bg-black z-[9999] transition-opacity duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
            loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-[180px] h-[180px] rounded-full absolute border-2 border-transparent border-t-[#FB650A] animate-spin shadow-[0_0_15px_rgba(251,101,10,0.2)]"></div>
            <div className="w-[150px] h-[150px] rounded-full bg-[radial-gradient(circle,rgba(251,101,10,0.15)_0%,transparent_70%)] animate-pulse-glow"></div>
            <img
              src="/icono_pidemeya.webp"
              alt="Cargando..."
              className="h-16 w-auto relative z-10 drop-shadow-[0_0_10px_rgba(251,101,10,0.4)]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
