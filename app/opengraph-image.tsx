import { shareImageResponse } from '@/lib/brand-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Logo de la tienda'
export const revalidate = 3600

export default function OpengraphImage() {
  return shareImageResponse()
}
