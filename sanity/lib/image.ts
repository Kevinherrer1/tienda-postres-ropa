import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

type SanityImage = Parameters<typeof builder.image>[0]

export function imageUrl(source: SanityImage | null | undefined, width: number, height: number) {
  if (!source || (typeof source === 'object' && !('asset' in source && source.asset))) return null
  return builder.image(source).width(width).height(height).fit('crop').auto('format').url()
}
