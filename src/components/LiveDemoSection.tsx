import ScrollReveal from './ScrollReveal';
import LiveDemo from './LiveDemo';

// Marketing section that frames the interactive product demo. The heading follows
// the same visual language as Sectors/Features; <LiveDemo/> is the self-contained
// player showing the Admin, Repartidor and Cliente views moving in sync. The demo
// row uses a wider max-width than the copy so the three devices have room to breathe.
export default function LiveDemoSection() {
  return (
    <section className="py-20 md:py-32 bg-transparent text-on-surface px-4 md:px-6">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <div className="speed-line w-12 mb-6 mx-auto bg-primary-container h-1 rounded-full" />
            <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6 tracking-tight">
              Míralo <span className="text-primary-container italic">funcionando</span>
            </h2>
            <p className="text-on-surface/60 font-body text-base md:text-lg">
              Un pedido real, de principio a fin: el cliente ordena por WhatsApp, el
              administrador lo ve entrar en tiempo real y el repartidor lo entrega.
              Las tres pantallas, sincronizadas.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal delay={0.15}>
          <LiveDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}
