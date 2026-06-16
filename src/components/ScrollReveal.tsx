import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  distance = 50,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const directions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    gsap.fromTo(
      containerRef.current,
      { 
        ...directions[direction],
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, { dependencies: [direction, delay, duration, distance] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
