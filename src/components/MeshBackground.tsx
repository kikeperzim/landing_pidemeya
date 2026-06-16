import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MeshBackground() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none bg-background overflow-hidden transition-colors duration-700">
      {/* Top Left Glow */}
      <div 
        ref={blob1}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FB650A]/10 blur-[140px] rounded-full animate-blob" 
      ></div>
      
      {/* Bottom Right Glow */}
      <div 
        ref={blob2}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#FB650A]/8 blur-[120px] rounded-full animate-blob" 
        style={{ animationDelay: '2s' }}
      ></div>
      
      {/* Center Right Accent */}
      <div 
        ref={blob3}
        className="absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-[#FB650A]/5 blur-[100px] rounded-full animate-blob" 
        style={{ animationDelay: '4s' }}
      ></div>

      {/* Very subtle grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
