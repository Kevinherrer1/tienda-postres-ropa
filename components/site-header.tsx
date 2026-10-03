import Link from 'next/link'
import { BrandLogo } from '@/components/brand-logo'
import type { Ajustes } from '@/lib/site'

const links = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#visitanos', label: 'Visítanos' },
]

export function SiteHeader({ ajustes }: { ajustes: Ajustes }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link href="/" aria-label={`${ajustes.nombre}, inicio`} className="min-w-0">
          <BrandLogo nombre={ajustes.nombre} icono={ajustes.icono} />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#catalogo"
          className="shrink-0 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <span className="sm:hidden">Pedir</span>
          <span className="hidden sm:inline">Hacer pedido</span>
        </a>
      </div>
    </header>
  )
}
