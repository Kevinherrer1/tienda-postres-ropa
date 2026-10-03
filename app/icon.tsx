import { iconResponse } from '@/lib/brand-image'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'
export const revalidate = 3600

export default function Icon() {
  return iconResponse(64, true)
}
