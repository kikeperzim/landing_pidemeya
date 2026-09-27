/**
 * Datos legales compartidos por /terminos, /privacidad y /libro-de-reclamaciones.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PENDIENTE DE CONFIRMACIÓN POR GERENCIA
 * Los valores marcados con «PENDIENTE» son PROVISIONALES. Mientras BORRADOR sea
 * true, las páginas legales muestran un aviso de documento en revisión.
 * Al recibir los datos definitivos:
 *   1) reemplazar los valores marcados
 *   2) cambiar BORRADOR a false
 *   3) actualizar ACTUALIZACION
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const BORRADOR = true;

export const ACTUALIZACION = '13 de julio de 2026';

export const PROVEEDOR = {
  razonSocial: 'Informatic Data Peru E.I.R.L.',
  nombreComercial: 'PidemeYa',
  ruc: '20610802258',
  // PENDIENTE (1/3): domicilio fiscal inscrito en SUNAT.
  domicilio: 'Av. [PENDIENTE DE CONFIRMAR], Lima, Perú',
  email: 'contacto@pidemeya.com',
  whatsapp: '+51 904 773 671',
  whatsappUrl: 'https://wa.me/51904773671',
} as const;

export const CONTRATO = {
  // PENDIENTE (2/3): días tras el vencimiento antes de suspender la cuenta.
  diasParaSuspension: 7,
  // PENDIENTE (2/3 bis): días que se conservan los datos tras la suspensión antes de eliminarlos.
  diasRetencionTrasSuspension: 30,
  // PENDIENTE (3/3): política de reembolso del plan anual pagado por adelantado.
  reembolsoAnual:
    'se reembolsará el importe proporcional de los meses completos no consumidos, descontando el beneficio de descuento anual ya aplicado',
} as const;

/** Plazos de conservación declarados en la Política de Privacidad. */
export const CONSERVACION = {
  clientesAnios: 5,
  consultasWebMeses: 12,
  reclamacionesAnios: 2,
} as const;
