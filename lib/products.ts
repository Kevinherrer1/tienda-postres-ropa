export type Category = 'postres' | 'ropa'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  tag?: string
}

export const products: Product[] = [
  {
    id: 'tarta-frambuesa',
    name: 'Tarta Frambuesa & Pistacho',
    description: 'Bizcocho de pistacho, crema de frambuesa y glaseado espejo.',
    price: 32,
    category: 'postres',
    image: '/images/hero-postres.png',
    tag: 'Favorita',
  },
  {
    id: 'sudadera-pistacho',
    name: 'Sudadera Pistacho',
    description: 'Sudadera deportiva de algodón, corte oversize y capucha.',
    price: 58,
    category: 'ropa',
    image: '/images/sudadera.png',
    tag: 'Nuevo',
  },
  {
    id: 'macarons',
    name: 'Caja de Macarons (12)',
    description: 'Pistacho, frambuesa, vainilla y chocolate. Hechos cada mañana.',
    price: 18,
    category: 'postres',
    image: '/images/macarons.png',
  },
  {
    id: 'vestido-frambuesa',
    name: 'Vestido Midi Frambuesa',
    description: 'Lino lavado, tirantes ajustables y bolsillos laterales.',
    price: 74,
    category: 'ropa',
    image: '/images/vestido.png',
  },
  {
    id: 'brownies',
    name: 'Brownies con Sal (6)',
    description: 'Chocolate 70%, centro húmedo y escamas de sal marina.',
    price: 14,
    category: 'postres',
    image: '/images/brownie.png',
  },
  {
    id: 'camiseta-cacao',
    name: 'Camiseta Cacao',
    description: 'Algodón suave con estampado de cupcake en el pecho.',
    price: 29,
    category: 'ropa',
    image: '/images/camiseta.png',
    tag: 'Edición limitada',
  },
  {
    id: 'tarta-fresa',
    name: 'Tartaleta de Fresas',
    description: 'Masa sablé, crema pastelera y fresas de temporada.',
    price: 24,
    category: 'postres',
    image: '/images/tarta-fresa.png',
  },
]

export type HeroImage = { src: string; alt: string }

export type Portada = { postres: HeroImage; ropa: HeroImage }

export const portada: Portada = {
  postres: { src: '/images/hero-postres.png', alt: 'Tarta de frambuesa y pistacho con glaseado rosa' },
  ropa: { src: '/images/hero-ropa.png', alt: 'Modelo con cárdigan frambuesa y pantalón color cacao' },
}

export function formatPrice(value: number) {
  const decimals = Number.isInteger(value) ? 0 : 2
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
