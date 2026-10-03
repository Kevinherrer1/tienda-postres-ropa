import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  qty: number
  label: string
  onAdd: () => void
  onRemove: () => void
  size?: 'sm' | 'md'
  className?: string
}

export function QuantityStepper({ qty, label, onAdd, onRemove, size = 'md', className }: Props) {
  const button = cn(
    'flex items-center justify-center rounded-full transition-colors hover:bg-primary-foreground/20',
    size === 'sm' ? 'size-8' : 'size-11',
  )

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-full bg-primary p-0.5 text-primary-foreground',
        className,
      )}
    >
      <button onClick={onRemove} aria-label={`Quitar una unidad de ${label}`} className={button}>
        <Minus className="size-4" aria-hidden />
      </button>
      <span aria-live="polite" className={cn('min-w-6 text-center font-medium', size === 'sm' && 'text-sm')}>
        {qty}
      </span>
      <button onClick={onAdd} aria-label={`Añadir una unidad de ${label}`} className={button}>
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  )
}
