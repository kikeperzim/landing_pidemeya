// GestionPedidosAdmin — React wrapper around the vanilla `<gestion-pedidos>` web
// component recovered from the original PidemeYa demo bundle. The web component
// renders the admin "Gestión de Pedidos" dashboard at a fixed 1440x900 canvas and
// animates itself off the global player clock (window.__pyMaster / window.__pyMap).
//
// We provide the two globals the component reaches for:
//   • window.lucide  — icon renderer (from the `lucide` npm package)
//   • the sidebar logo — pointed at the landing's own asset
import { useEffect, useRef } from 'react';
import { createIcons, icons } from 'lucide';
import './GestionPedidos.js'; // side-effect: registers the <gestion-pedidos> custom element

// Expose a minimal lucide shim the way the web component expects it.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).lucide = { createIcons: () => createIcons({ icons }) };
}

export default function GestionPedidosAdmin() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Point the sidebar logo at the landing asset once the element has rendered.
    const id = window.setTimeout(() => {
      const logo = host.querySelector<HTMLImageElement>('[data-logo]');
      if (logo) logo.src = '/images/LogoPidemeya.webp';
    }, 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div ref={hostRef} style={{ width: 1440, height: 900 }}>
      {/* @ts-expect-error — custom element registered by GestionPedidos.js */}
      <gestion-pedidos style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
