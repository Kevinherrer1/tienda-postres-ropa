import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24">
        <h1 className="font-display text-3xl font-extrabold">Panel sin conectar</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Falta el Project ID de Sanity. Pon tu ID en <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> dentro del archivo{' '}
          <code>.env.local</code> y reinicia el servidor.
        </p>
      </main>
    )
  }

  return <NextStudio config={config} />
}
