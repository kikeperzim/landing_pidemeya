import { useEffect, useState, useRef } from 'react';

interface BenefitsCardProps {
  active: number;
  setActive: (index: number) => void;
}

export default function BenefitsCard({ active, setActive }: BenefitsCardProps) {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActive((active + 1) % 5);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, isPaused, setActive]);

  const o = (i: number) => (i === active ? 1 : 0);
  const t = (i: number) => (i === active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(.97)');

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-[480px] min-h-[530px] mx-auto bg-surface-container-lowest rounded-[30px] p-[32px_28px_32px] border border-on-surface/5 shadow-[0_32px_64px_-30px_rgba(251,101,10,0.15),_0_12px_32px_-20px_rgba(0,0,0,0.25)] flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_40px_80px_-25px_rgba(251,101,10,0.22),_0_16px_40px_-15px_rgba(0,0,0,0.35)]"
    >
      {/* Estilos CSS locales para mantener la modularidad */}
      <style>{`
        @keyframes spin-min { to { transform: rotate(360deg) } }
        @keyframes spin-hr { to { transform: rotate(360deg) } }
        @keyframes tpop { 0%, 8% { opacity:0; transform: scale(.5) translateY(4px) } 22% { opacity:1; transform: scale(1.12) translateY(0) } 32% { transform: scale(1) } 86% { opacity:1; transform: scale(1) } 100% { opacity:0; transform: scale(.9) } }
        @keyframes bub-in { 0% { opacity:0; transform: translateX(-22px) scale(.9) } 14% { opacity:1; transform: translateX(0) scale(1) } 100% { opacity:1 } }
        @keyframes bub-out { 0%, 34% { opacity:0; transform: translateX(22px) scale(.9) } 48% { opacity:1; transform: translateX(0) scale(1.06) } 56% { transform: scale(1) } 100% { opacity:1 } }
        @keyframes flash { 0%, 30% { opacity:0; transform: scale(.6) rotate(-8deg) } 40% { opacity:1; transform: scale(1.25) rotate(0) } 54% { opacity:0; transform: scale(1) } 100% { opacity:0 } }
        @keyframes pin-drop { 0% { transform: translate(-50%, -150px); opacity:0 } 10% { opacity:1 } 40% { transform: translate(-50%, -38px) } 50% { transform: translate(-50%, -50px) } 60% { transform: translate(-50%, -38px) } 84% { opacity:1; transform: translate(-50%, -38px) } 100% { opacity:0; transform: translate(-50%, -38px) } }
        @keyframes check-pop { 0%, 52% { opacity:0; transform: translate(-50%, -50%) scale(.3) } 62% { opacity:1; transform: translate(-50%, -50%) scale(1.25) } 72% { transform: translate(-50%, -50%) scale(1) } 94% { opacity:1 } 100% { opacity:0; transform: translate(-50%, -50%) scale(1) } }
        @keyframes route-draw { 0%, 4% { stroke-dashoffset: 340 } 72% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: 0 } }
        @keyframes scoot { 0% { transform: translate(10px, 132px) rotate(-8deg); opacity:0 } 7% { opacity:1 } 25% { transform: translate(48px, 124px) rotate(-15deg) } 50% { transform: translate(89px, 94px) rotate(-27deg) } 75% { transform: translate(141px, 60px) rotate(-20deg) } 93% { transform: translate(208px, 36px) rotate(-12deg); opacity:1 } 100% { opacity:0; transform: translate(208px, 36px) rotate(-12deg) } }
        @keyframes dest-pulse { 0%, 68% { transform: translate(-50%, -100%) scale(1) } 80% { transform: translate(-50%, -100%) scale(1.28) } 90% { transform: translate(-50%, -100%) scale(1) } 100% { transform: translate(-50%, -100%) scale(1) } }
        @keyframes bar-grow { 0% { transform: scaleY(.04) } 55% { transform: scaleY(1.07) } 68% { transform: scaleY(1) } 100% { transform: scaleY(1) } }
        @keyframes line-draw { 0%, 18% { stroke-dashoffset: 300 } 74% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: 0 } }
        @keyframes arrow-pop { 0%, 66% { opacity:0; transform: scale(.4) } 78% { opacity:1; transform: scale(1.25) } 88% { transform: scale(1) } 100% { opacity:1 } }
        @keyframes gain { 0%, 28% { opacity:0; transform: translateY(6px) scale(.6) } 44% { opacity:1; transform: translateY(0) scale(1.12) } 54% { transform: scale(1) } 90% { opacity:1 } 100% { opacity:0 } }
      `}</style>

      {/* Cabecera de la tarjeta con indicadores (dots) */}
      <div className="flex flex-col items-center gap-[12px] flex-none">
        <div className="text-[11px] font-bold tracking-[.16em] uppercase text-primary-container font-headline select-none">
          ¿Qué gana tu negocio?
        </div>
        <div className="flex gap-[7px] items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              onClick={() => setActive(i)}
              className="h-[7px] rounded-[99px] transition-[width,_background-color] duration-[450ms] ease-[cubic-bezier(0.34,1.5,0.5,1)] cursor-pointer"
              style={{
                width: i === active ? '24px' : '7px',
                backgroundColor: i === active ? 'var(--color-primary-container)' : 'var(--color-surface-container-highest)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenedor central de las animaciones */}
      <div className="relative flex-1 min-h-[380px] mt-[16px]">
        
        {/* 1. AHORRAS TIEMPO */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-[6px_6px_4px] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ 
            opacity: o(0), 
            transform: t(0), 
            display: active === 0 ? 'flex' : 'none',
            pointerEvents: active === 0 ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-[260px] h-[190px] flex items-center justify-center">
            <div className="relative w-[142px] h-[142px] rounded-full bg-surface-container-lowest border-[6px] border-surface-container shadow-[0_16px_32px_-18px_rgba(251,101,10,0.25),_inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-on-surface/20"></div>
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-on-surface/20"></div>
              <div className="absolute left-[8px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-on-surface/20"></div>
              <div className="absolute right-[8px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-on-surface/20"></div>
              <div className="absolute left-[calc(50%-2px)] bottom-1/2 w-[4px] h-[50px] rounded-[4px] bg-on-surface origin-[50%_100%] animate-[spin-min_1.4s_linear_infinite]"></div>
              <div className="absolute left-[calc(50%-2.5px)] bottom-1/2 w-[5px] h-[36px] rounded-[4px] bg-primary-container origin-[50%_100%] animate-[spin-hr_2.8s_linear_infinite]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full bg-on-surface z-10"></div>
            </div>
            <div className="absolute top-[6px] right-[2px] bg-primary-container text-white font-extrabold text-[14px] p-[7px_11px] rounded-full shadow-[0_10px_20px_-8px_rgba(251,101,10,0.5)] animate-[tpop_2.5s_ease_infinite]">−70%</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-[24px]">
            <div className="font-bold text-[24px] leading-[1.1] text-on-surface tracking-[-.01em] font-headline">Ahorras Tiempo</div>
            <div className="font-medium text-[14px] leading-[1.4] text-on-surface/60 mt-[6px]">Menos tiempo en cada pedido</div>
          </div>
        </div>

        {/* 2. ATIENDES MÁS RÁPIDO */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-[6px_6px_4px] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ 
            opacity: o(1), 
            transform: t(1), 
            display: active === 1 ? 'flex' : 'none',
            pointerEvents: active === 1 ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-[260px] h-[190px] flex items-center justify-center">
            <div className="relative w-[230px] h-[152px] rounded-[24px] bg-surface-container shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),_0_16px_32px_-22px_rgba(0,0,0,0.3)] p-[20px] box-border flex flex-col justify-center gap-[14px] overflow-hidden">
              <div className="self-start bg-surface-container-high rounded-[15px_15px_15px_5px] p-[11px_13px] flex flex-col gap-[6px] animate-[bub-in_2.5s_ease_infinite]">
                <div className="w-[74px] h-[6px] rounded-[3px] bg-on-surface/20"></div>
                <div className="w-[48px] h-[6px] rounded-[3px] bg-on-surface/20"></div>
              </div>
              <div className="self-end bg-primary-container rounded-[15px_15px_5px_15px] p-[11px_13px] flex items-center gap-[8px] animate-[bub-out_2.5s_ease_infinite] shadow-[0_8px_18px_-8px_rgba(251,101,10,0.4)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <div className="w-[54px] h-[6px] rounded-[3px] bg-white/80"></div>
              </div>
              <div className="absolute top-[14px] right-[16px] animate-[flash_2.5s_ease_infinite]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-primary-container)" stroke="var(--color-primary-container)" strokeWidth="1.4" strokeLinejoin="round"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-[24px]">
            <div className="font-bold text-[24px] leading-[1.1] text-on-surface tracking-[-.01em] font-headline">Atiendes más rápido</div>
            <div className="font-medium text-[14px] leading-[1.4] text-on-surface/60 mt-[6px]">Respuestas al instante, 24/7</div>
          </div>
        </div>

        {/* 3. MENOS ERRORES */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-[6px_6px_4px] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ 
            opacity: o(2), 
            transform: t(2), 
            display: active === 2 ? 'flex' : 'none',
            pointerEvents: active === 2 ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-[200px] h-[190px] mx-auto flex items-center justify-center">
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[132px] h-[132px] rounded-full bg-primary-container/10"></div>
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[94px] h-[94px] rounded-full bg-primary-container/20"></div>
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[58px] h-[58px] rounded-full bg-primary-container/35"></div>
            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-primary-container"></div>
            <div className="absolute left-1/2 top-[58%] animate-[pin-drop_2.5s_ease_infinite]">
              <div className="w-[30px] h-[30px] rounded-[50%_50%_50%_0] bg-primary-container rotate-[45deg] shadow-[0_10px_18px_-8px_rgba(251,101,10,0.5)] flex items-center justify-center">
                <div className="w-[11px] h-[11px] rounded-full bg-surface-container-lowest -rotate-[45deg]"></div>
              </div>
            </div>
            <div className="absolute left-[67%] top-[42%] w-[30px] h-[30px] rounded-full bg-[#1FA971] flex items-center justify-center shadow-[0_8px_16px_-6px_rgba(31,169,113,0.5)] animate-[check-pop_2.5s_ease_infinite]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-[24px]">
            <div className="font-bold text-[24px] leading-[1.1] text-on-surface tracking-[-.01em] font-headline">Menos Errores</div>
            <div className="font-medium text-[14px] leading-[1.4] text-on-surface/60 mt-[6px]">Ubicación exacta, cero confusiones</div>
          </div>
        </div>

        {/* 4. REPARTIDORES EFICIENTES */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-[6px_6px_4px] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ 
            opacity: o(3), 
            transform: t(3), 
            display: active === 3 ? 'flex' : 'none',
            pointerEvents: active === 3 ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-[240px] h-[185px] mx-auto">
            <svg width="240" height="185" viewBox="0 0 240 185" fill="none" className="absolute inset-0">
              <path d="M28 152 C 80 162, 120 70, 230 54" stroke="var(--color-primary-container)" strokeWidth="6" strokeLinecap="round" opacity="0.15"/>
              <path d="M28 152 C 80 162, 120 70, 230 54" stroke="var(--color-primary-container)" strokeWidth="6" strokeLinecap="round" strokeDasharray="340" className="animate-[route-draw_2.5s_ease_infinite]"/>
              <circle cx="28" cy="152" r="7" fill="var(--color-on-surface)"/>
              <circle cx="28" cy="152" r="3" fill="var(--color-surface-container-lowest)"/>
            </svg>
            <div className="absolute left-[230px] top-[54px] animate-[dest-pulse_2.5s_ease_infinite]">
              <div className="w-[28px] h-[28px] rounded-[50%_50%_50%_0] bg-on-surface rotate-[45deg] shadow-[0_8px_16px_-7px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-primary-container -rotate-[45deg]"></div>
              </div>
            </div>
            <div className="absolute left-0 top-0 w-[34px] h-[34px] rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3),_inset_0_0_0_1px_rgba(241,101,10,0.2)] animate-[scoot_2.5s_ease_infinite]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-container)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="17" r="2.6"/><circle cx="18" cy="17" r="2.6"/><path d="M6 17h7l3-8h3"/><path d="M18 17l-2.5-8"/></svg>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-[24px]">
            <div className="font-bold text-[24px] leading-[1.1] text-on-surface tracking-[-.01em] font-headline">Repartidores Eficientes</div>
            <div className="font-medium text-[14px] leading-[1.4] text-on-surface/60 mt-[6px]">Rutas directas de A a B</div>
          </div>
        </div>

        {/* 5. VENDES MÁS */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-[6px_6px_4px] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{ 
            opacity: o(4), 
            transform: t(4), 
            display: active === 4 ? 'flex' : 'none',
            pointerEvents: active === 4 ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-[236px] h-[185px] mx-auto">
            <div className="absolute left-[18px] right-[18px] bottom-[30px] h-[2px] bg-on-surface/10"></div>
            <div className="absolute left-0 right-0 bottom-[32px] flex items-end justify-center gap-[16px]">
              <div className="w-[30px] h-[58px] rounded-[9px_9px_3px_3px] bg-primary-container/20 origin-bottom animate-[bar-grow_2.5s_cubic-bezier(.34,1.5,.5,1)_infinite]"></div>
              <div className="w-[30px] h-[90px] rounded-[9px_9px_3px_3px] bg-primary-container/40 origin-bottom animate-[bar-grow_2.5s_cubic-bezier(.34,1.5,.5,1)_infinite] delay-[120ms]"></div>
              <div className="w-[30px] h-[74px] rounded-[9px_9px_3px_3px] bg-primary-container/60 origin-bottom animate-[bar-grow_2.5s_cubic-bezier(.34,1.5,.5,1)_infinite] delay-[240ms]"></div>
              <div className="w-[30px] h-[120px] rounded-[9px_9px_3px_3px] bg-primary-container origin-bottom animate-[bar-grow_2.5s_cubic-bezier(.34,1.5,.5,1)_infinite] delay-[360ms] shadow-[0_10px_20px_-10px_rgba(241,101,10,0.5)]"></div>
            </div>
            <svg width="236" height="185" viewBox="0 0 236 185" fill="none" className="absolute inset-0 pointer-events-none">
              <polyline points="22 132 78 108 134 88 206 34" stroke="var(--color-on-surface)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="300" className="animate-[line-draw_2.5s_ease_infinite]"/>
            </svg>
            <div className="absolute left-[194px] top-[18px] w-[26px] h-[26px] rounded-full bg-on-surface flex items-center justify-center animate-[arrow-pop_2.5s_ease_infinite]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-surface-container-lowest)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
            </div>
            <div className="absolute top-[2px] right-[2px] bg-primary-container text-white font-extrabold text-[14px] p-[7px_11px] rounded-full shadow-[0_10px_20px_-8px_rgba(241,101,10,0.5)] animate-[gain_2.5s_ease_infinite]">+42%</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-[24px]">
            <div className="font-bold text-[24px] leading-[1.1] text-on-surface tracking-[-.01em] font-headline">Vendes Más</div>
            <div className="font-medium text-[14px] leading-[1.4] text-on-surface/60 mt-[6px]">Más pedidos, más ingresos</div>
          </div>
        </div>

      </div>
    </div>
  );
}
