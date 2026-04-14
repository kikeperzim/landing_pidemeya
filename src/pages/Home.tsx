import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import Process from '../components/Process';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Cta from '../components/Cta';

export default function Home() {
  return (
    <>
      <Hero />
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
