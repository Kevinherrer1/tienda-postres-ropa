import Image from 'next/image'
import { BrandLogo } from '@/components/brand-logo'
import type { Ajustes } from '@/lib/site'

export function SiteFooter({ ajustes }: { ajustes: Ajustes }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          {ajustes.logo ? (
            <Image src={ajustes.logo} alt={ajustes.nombre} width={144} height={144} className="size-36 rounded-3xl" />
          ) : (
            <BrandLogo nombre={ajustes.nombre} icono={ajustes.icono} />
          )}
          {ajustes.eslogan && <p>{ajustes.eslogan}</p>}
        </div>
        <p>
          © {new Date().getFullYear()} {ajustes.nombre}
        </p>
      </div>
    </footer>
  )
}
