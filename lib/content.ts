import { cache } from 'react'
import { client } from '@/sanity/lib/client'
import { imageUrl } from '@/sanity/lib/image'
import { ajustesQuery, portadaQuery, productosQuery } from '@/sanity/lib/queries'
import { isSanityConfigured } from '@/sanity/env'
import { ajustesDemo, type Ajustes } from '@/lib/site'
import {
  portada as localPortada,
  products as localProducts,
  type Category,
  type Portada,
  type Product,
} from '@/lib/products'

export const REVALIDATE_SECONDS = 60

type SanityImage = Parameters<typeof imageUrl>[0]

type ProductoDoc = {
  id: string
  nombre: string | null
  descripcion: string | null
  precio: number | null
  categoria: Category | null
  etiqueta: string | null
  foto: SanityImage
}

type PortadaDoc = {
  fotoPostres: (NonNullable<SanityImage> & { alt?: string }) | null
  fotoRopa: (NonNullable<SanityImage> & { alt?: string }) | null
} | null

type AjustesDoc = {
  nombre: string | null
  eslogan: string | null
  telefono: string | null
  ubicacion: string | null
  entregas: string | null
  horario: string | null
  logo: SanityImage
  icono: SanityImage
} | null

async function fetchSanity<T>(query: string): Promise<T> {
  return client.fetch<T>(query, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

export const getAjustes = cache(async (): Promise<Ajustes> => {
  if (!isSanityConfigured) return ajustesDemo

  const doc = await fetchSanity<AjustesDoc>(ajustesQuery)
  if (!doc) return ajustesDemo
  return {
    nombre: doc.nombre || ajustesDemo.nombre,
    eslogan: doc.eslogan ?? '',
    telefono: doc.telefono || ajustesDemo.telefono,
    ubicacion: doc.ubicacion ?? '',
    entregas: doc.entregas ?? '',
    horario: doc.horario ?? '',
    logo: imageUrl(doc.logo, 800, 800),
    icono: imageUrl(doc.icono, 256, 256),
  }
})

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return localProducts

  const docs = await fetchSanity<ProductoDoc[]>(productosQuery)
  return docs.map((doc) => ({
    id: doc.id,
    name: doc.nombre ?? '',
    description: doc.descripcion ?? '',
    price: doc.precio ?? 0,
    category: doc.categoria ?? 'postres',
    image: imageUrl(doc.foto, 600, 600) ?? '',
    tag: doc.etiqueta ?? undefined,
  }))
}

export async function getPortada(): Promise<Portada> {
  if (!isSanityConfigured) return localPortada

  const doc = await fetchSanity<PortadaDoc>(portadaQuery)
  return {
    postres: {
      src: imageUrl(doc?.fotoPostres, 900, 900) ?? localPortada.postres.src,
      alt: doc?.fotoPostres?.alt || localPortada.postres.alt,
    },
    ropa: {
      src: imageUrl(doc?.fotoRopa, 900, 900) ?? localPortada.ropa.src,
      alt: doc?.fotoRopa?.alt || localPortada.ropa.alt,
    },
  }
}
