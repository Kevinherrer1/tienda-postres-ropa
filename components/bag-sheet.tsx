'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { CircleCheck, MessageCircle, X } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { whatsappUrl } from '@/lib/site'
import { QuantityStepper } from '@/components/quantity-stepper'

export type BagLine = { product: Product; qty: number }

export function buildOrderMessage(lines: BagLine[], total: number) {
  const items = lines.map(
    ({ product, qty }) => `• ${qty} x ${product.name} — ${formatPrice(product.price * qty)}`,
  )
  return ['¡Hola! Quiero hacer este pedido:', '', ...items, '', `Total: ${formatPrice(total)}`].join('\n')
}

type Props = {
  open: boolean
  lines: BagLine[]
  total: number
  telefono: string
  sent: boolean
  onClose: () => void
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onSend: () => void
  onKeep: () => void
  onClear: () => void
}

export function BagSheet({
  open,
  lines,
  total,
  telefono,
  sent,
  onClose,
  onAdd,
  onRemove,
  onSend,
  onKeep,
  onClear,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button aria-label="Cerrar bolsa" onClick={onClose} className="absolute inset-0 bg-foreground/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bolsa-titulo"
        className="relative flex max-h-[85vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 id="bolsa-titulo" className="font-display text-2xl font-extrabold">
            Tu bolsa
          </h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-secondary">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <p className="px-6 py-10 text-center text-muted-foreground">Tu bolsa está vacía.</p>
        ) : sent ? (
          <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
            <CircleCheck className="size-12 text-primary" aria-hidden />
            <h3 className="font-display text-2xl font-extrabold">¿Ya enviaste tu pedido?</h3>
            <p className="leading-relaxed text-muted-foreground">
              Si ya lo mandaste por WhatsApp, vaciamos la bolsa para la próxima vez. Si no, la guardamos tal cual.
            </p>
            <div className="mt-3 flex w-full flex-col gap-2">
              <button
                onClick={onClear}
                className="rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Sí, vaciar bolsa
              </button>
              <button
                onClick={onKeep}
                className="rounded-full border border-foreground px-5 py-3 font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                Todavía no
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-4 py-4">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-2xl bg-secondary object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(product.price * qty)}</p>
                  </div>
                  <QuantityStepper
                    qty={qty}
                    label={product.name}
                    onAdd={() => onAdd(product.id)}
                    onRemove={() => onRemove(product.id)}
                    size="sm"
                  />
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 border-t border-border px-6 py-5">
              <p className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-extrabold text-primary">{formatPrice(total)}</span>
              </p>
              <a
                href={whatsappUrl(telefono, buildOrderMessage(lines, total))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSend}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-5" aria-hidden />
                Enviar pedido por WhatsApp
              </a>
              <button onClick={onClear} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Vaciar bolsa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
