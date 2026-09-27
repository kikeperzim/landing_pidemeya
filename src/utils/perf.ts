/**
 * Heurística de "equipo con poca potencia gráfica".
 *
 * Las animaciones continuas de la landing (blobs con blur enorme, el flujo n8n
 * del hero) re-rasterizan superficies grandes cada frame. En laptops de 4 GB con
 * GPU integrada eso hunde el FPS de toda la página, no solo de la animación.
 *
 * Se evalúa una sola vez por carga: no queremos que un cambio de tamaño de
 * ventana haga aparecer y desaparecer animaciones.
 */

type NavigatorWithHints = Navigator & { deviceMemory?: number };

let cached: boolean | null = null;

export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;
  if (cached !== null) return cached;

  const nav = navigator as NavigatorWithHints;

  // 0. Override manual para probar ambos modos en cualquier equipo:
  //    ?perf=low  fuerza el modo ligero, ?perf=high fuerza las animaciones.
  const override = new URLSearchParams(window.location.search).get('perf');
  if (override === 'low' || override === 'high') {
    cached = override === 'low';
    return cached;
  }

  // 1. Preferencia explícita del usuario: siempre manda.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cached = true;
    return cached;
  }

  // 2. RAM declarada (Chrome/Edge; ausente en Firefox y Safari).
  //    navigator.deviceMemory se redondea hacia abajo a 0.25/0.5/1/2/4/8.
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) {
    cached = true;
    return cached;
  }

  // 3. Núcleos lógicos. En 2026, 4 o menos hilos indica equipo de gama baja.
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) {
    cached = true;
    return cached;
  }

  cached = false;
  return cached;
}

/** Redondea a pasos discretos para evitar escrituras de estilo redundantes. */
export const quantize = (value: number, step: number) => Math.round(value / step) * step;
