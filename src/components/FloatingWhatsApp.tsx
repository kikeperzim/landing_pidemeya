import { useEffect, useRef, useState } from 'react';

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, quiero información sobre la automatización de pedidos por WhatsApp de PidemeYa.'
);

/** Lado del botón en px (w-14 h-14) y margen mínimo contra los bordes. */
const SIZE = 56;
const MARGIN = 20;
/** Píxeles que hay que recorrer antes de considerarlo arrastre y no click. */
const DRAG_THRESHOLD = 6;
const STORAGE_KEY = 'pidemeya:whatsapp-fab-pos';

type Pos = { x: number; y: number };

const clamp = (x: number, y: number): Pos => ({
  x: Math.min(Math.max(x, MARGIN), Math.max(MARGIN, window.innerWidth - SIZE - MARGIN)),
  y: Math.min(Math.max(y, MARGIN), Math.max(MARGIN, window.innerHeight - SIZE - MARGIN)),
});

const defaultPos = (): Pos => clamp(window.innerWidth - SIZE - MARGIN, window.innerHeight - SIZE - MARGIN);

/** Posición guardada de una visita anterior, si es válida. */
const storedPos = (): Pos | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Pos>;
    if (typeof parsed?.x !== 'number' || typeof parsed?.y !== 'number') return null;
    return { x: parsed.x, y: parsed.y };
  } catch {
    return null;
  }
};

export default function FloatingWhatsApp() {
  const [pos, setPos] = useState<Pos>(() => {
    const saved = storedPos();
    return saved ? clamp(saved.x, saved.y) : defaultPos();
  });
  const [dragging, setDragging] = useState(false);

  const drag = useRef({ active: false, moved: false, dx: 0, dy: 0, startX: 0, startY: 0 });
  /** false mientras el botón siga en su esquina por defecto: así sigue al viewport al redimensionar. */
  const userPlaced = useRef(storedPos() !== null);

  useEffect(() => {
    // Mientras no lo hayan arrastrado, el botón vuelve a pegarse a la esquina
    // inferior derecha en cada cambio de tamaño.
    const onResize = () =>
      setPos((p) => (userPlaced.current ? clamp(p.x, p.y) : defaultPos()));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    drag.current = {
      active: true,
      moved: false,
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      startX: e.clientX,
      startY: e.clientY,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* el navegador puede rechazar la captura: el arrastre sigue funcionando */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    if (!d.active) return;

    if (!d.moved) {
      const dist = Math.hypot(e.clientX - d.startX, e.clientY - d.startY);
      if (dist < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true);
    }

    setPos(clamp(e.clientX - d.dx, e.clientY - d.dy));
  };

  const endDrag = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* ídem */
    }
    if (d.moved) {
      userPlaced.current = true;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
      } catch {
        /* almacenamiento no disponible: la posición sólo dura esta sesión */
      }
    }
  };

  // Tras arrastrar, el click sintético no debe abrir WhatsApp.
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  return (
    <a
      href={`https://wa.me/51904773671?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp (arrastra para mover el botón)"
      title="Escríbenos por WhatsApp · arrástralo para moverlo"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={onClick}
      onDragStart={(e) => e.preventDefault()}
      style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
      className={`group fixed z-[9998] w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_14px_40px_rgba(34,197,94,0.6)] select-none ${
        dragging
          ? 'cursor-grabbing scale-110 transition-none'
          : 'cursor-grab hover:scale-105 active:scale-95 transition-all duration-300'
      }`}
    >
      {/* Halo pulsante — se detiene mientras se arrastra */}
      {!dragging && (
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping pointer-events-none"></span>
      )}

      <svg
        className="w-7 h-7 relative z-10 pointer-events-none"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}
