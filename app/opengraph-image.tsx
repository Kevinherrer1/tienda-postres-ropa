import { shareImageResponse } from '@/lib/brand-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Logo de la tienda'
export const dynamic = 'force-dynamic'

export default function OpengraphImage() {
  return shareImageResponse()
}
