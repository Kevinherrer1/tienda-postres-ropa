import { iconResponse } from '@/lib/brand-image'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'
export const dynamic = 'force-dynamic'

export default function Icon() {
  return iconResponse(64, true)
}
