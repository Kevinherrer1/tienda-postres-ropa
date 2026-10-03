export type Ajustes = {
  nombre: string
  eslogan: string
  telefono: string
  ubicacion: string
  entregas: string
  horario: string
  logo: string | null
  icono: string | null
}

// Marca de demostración. Los datos reales de cada tienda se configuran en Sanity (Ajustes de la tienda).
export const ajustesDemo: Ajustes = {
  nombre: 'Dulce Hilo',
  eslogan: 'Postres artesanales y ropa para todos los estilos',
  telefono: '0424-000 0000',
  ubicacion: 'Centro, Tu ciudad',
  entregas: 'A domicilio en la ciudad',
  horario: 'Lun a Dom · 8:00 AM a 9:00 PM',
  logo: null,
  icono: null,
}

const CODIGO_PAIS = '58'

export function numeroWhatsapp(telefono: string) {
  const digitos = telefono.replace(/\D/g, '')
  return digitos.startsWith('0') ? CODIGO_PAIS + digitos.slice(1) : digitos
}

export function whatsappUrl(telefono: string, mensaje: string) {
  return `https://wa.me/${numeroWhatsapp(telefono)}?text=${encodeURIComponent(mensaje)}`
}
