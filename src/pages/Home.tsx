import Hero from '../components/Hero';
import Services from '../components/Services';
import Sectors from '../components/Sectors';
import Features from '../components/Features';
import Process from '../components/Process';
import LiveDemoSection from '../components/LiveDemoSection';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Cta from '../components/Cta';

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
        <Benefits />
      </div>
      <div id="proceso">
        <Process />
      </div>
      <div id="demo">
        <LiveDemoSection />
      </div>
      <div id="resenas">
        <Testimonials />
      </div>
      <div id="precios">
        <Pricing />
      </div>
      <div id="contacto">
        <Cta />
      </div>
    </>
  );
}
