import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// En móvil (o con "reduce motion") NO animamos los blobs: escalar/mover un
// elemento con blur enorme obliga a re-rasterizar el desenfoque cada frame,
// lo que hunde el FPS en GPUs de celular. En desktop sí mantenemos el parallax.
const isDesktop = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 768px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function MeshBackground() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isDesktop()) return;

    gsap.to(blob1.current, {
      y: 500,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 5000,
        scrub: true,
      }
    });

    gsap.to(blob2.current, {
      y: -300,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 5000,
        scrub: true,
      }
    });

    gsap.to(blob3.current, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 5000,
        scrub: true,
      }
    });
  });

  // Solo animamos el movimiento (animate-blob) en desktop.
  const blobAnim = isDesktop() ? 'animate-blob' : '';

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none bg-background overflow-hidden transition-colors duration-700">
      {/* Top Left Glow */}
      <div
        ref={blob1}
        className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FB650A]/10 blur-[140px] rounded-full ${blobAnim}`}
      ></div>

      {/* Bottom Right Glow */}
      <div
        ref={blob2}
        className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#FB650A]/8 blur-[120px] rounded-full ${blobAnim}`}
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Center Right Accent */}
      <div
        ref={blob3}
        className={`absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-[#FB650A]/5 blur-[100px] rounded-full ${blobAnim}`}
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  );
}
