import type { Metadata, Viewport } from 'next'
import { Allura, Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import { getAjustes } from '@/lib/content'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-bricolage',
})
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const script = Allura({ subsets: ['latin'], weight: '400', variable: '--font-allura' })

const description =
  'Postres artesanales hechos a mano y ropa para todos los estilos: deportiva, casual y más. Haz tu pedido por WhatsApp.'

export async function generateMetadata(): Promise<Metadata> {
  const [{ nombre }, encabezados] = await Promise.all([getAjustes(), headers()])
  const host = encabezados.get('host') ?? 'localhost:3000'
  const protocolo = host.startsWith('localhost') ? 'http' : 'https'
  const title = `${nombre} — Postres y Ropa`
  return {
    metadataBase: new URL(`${protocolo}://${host}`),
    title,
    description,
    openGraph: { title, description, locale: 'es_VE', type: 'website' },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf6f3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${script.variable} bg-background`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
