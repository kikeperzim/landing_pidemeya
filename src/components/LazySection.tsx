import { Suspense, useEffect, useRef, useState } from 'react';

/**
 * Monta su contenido (que suele ser un componente cargado con React.lazy) solo
 * cuando el bloque se acerca al viewport. Así el chunk JS de las secciones
 * pesadas —p. ej. el demo interactivo— no se descarga en la carga inicial,
 * sino cuando el usuario hace scroll hacia él. Clave para el rendimiento en móvil.
 *
 * Mantiene un placeholder con altura mínima para reservar espacio y evitar
 * saltos de layout mientras el chunk se descarga.
 */
export default function LazySection({
  children,
  minHeight = '60vh',
  rootMargin = '400px',
}: {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver (muy raro): montamos directamente.
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} style={!show ? { minHeight } : undefined}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
