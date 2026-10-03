import Image from 'next/image'
import { CakeSlice } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = { nombre: string; icono: string | null; className?: string }

export function BrandLogo({ nombre, icono, className }: Props) {
  const [primera, ...resto] = nombre.trim().split(/\s+/)
  const principal = resto.length > 0 ? resto.join(' ') : primera

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {icono ? (
        <Image src={icono} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
      ) : (
        <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
          <CakeSlice className="size-6" aria-hidden />
        </span>
      )}
      <span className="flex flex-col leading-none">
        {resto.length > 0 && (
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            {primera}
          </span>
        )}
        <span className="font-script text-3xl text-foreground">{principal}</span>
      </span>
    </span>
  )
}
