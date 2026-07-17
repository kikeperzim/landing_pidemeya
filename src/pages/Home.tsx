import { lazy } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Sectors from '../components/Sectors';
import Features from '../components/Features';
import Process from '../components/Process';
import LazySection from '../components/LazySection';

// Secciones pesadas de abajo del pliegue: su JS se descarga solo al acercarse
// por scroll (React.lazy + IntersectionObserver en LazySection). La más pesada
// es el demo interactivo (RepartidorDemo + ChatCommercial + animations).
const Benefits = lazy(() => import('../components/Benefits'));
const LiveDemoSection = lazy(() => import('../components/LiveDemoSection'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Pricing = lazy(() => import('../components/Pricing'));
const Cta = lazy(() => import('../components/Cta'));

export default function Home() {
  return (
    <>
      <Hero />
      <Sectors />
      <div id="servicios">
        <Services />
      </div>
      <div id="caracteristicas">
        <Features />
      </div>
      <div id="beneficios">
        <LazySection>
          <Benefits />
        </LazySection>
      </div>
      <div id="proceso">
        <Process />
      </div>
      <div id="demo">
        <LazySection minHeight="100vh">
          <LiveDemoSection />
        </LazySection>
      </div>
      <div id="resenas">
        <LazySection minHeight="40vh">
          <Testimonials />
        </LazySection>
      </div>
      <div id="precios">
        <LazySection minHeight="80vh">
          <Pricing />
        </LazySection>
      </div>
      <div id="contacto">
        <LazySection minHeight="50vh">
          <Cta />
        </LazySection>
      </div>
    </>
  );
}
