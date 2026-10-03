'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Plus, ShoppingBag } from 'lucide-react'
import { formatPrice, type Category, type Product } from '@/lib/products'
import { useBag } from '@/lib/bag'
import { cn } from '@/lib/utils'
import { BagSheet, type BagLine } from '@/components/bag-sheet'
import { QuantityStepper } from '@/components/quantity-stepper'

const filters: { value: Category | 'todo'; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'postres', label: 'Postres' },
  { value: 'ropa', label: 'Ropa' },
]

export function Catalog({ products, telefono }: { products: Product[]; telefono: string }) {
  const [active, setActive] = useState<Category | 'todo'>('todo')
  const [bagOpen, setBagOpen] = useState(false)
  const { bag, add, remove, clear, sent, markSent, keep } = useBag(products.map((p) => p.id))
  const closeBag = useCallback(() => setBagOpen(false), [])

  const visible = active === 'todo' ? products : products.filter((p) => p.category === active)
  const lines: BagLine[] = products.filter((p) => bag[p.id]).map((product) => ({ product, qty: bag[product.id] }))
  const count = lines.reduce((sum, line) => sum + line.qty, 0)
  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)

  return (
    <section id="catalogo" className="scroll-mt-20 bg-card py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">Catálogo</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Postres hechos a mano y ropa seleccionada para ti. Elige lo que quieras y pídelo por WhatsApp.
            </p>
          </div>
          <div role="tablist" aria-label="Filtrar productos" className="flex gap-2 rounded-full bg-secondary p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={active === f.value}
                onClick={() => setActive(f.value)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  active === f.value ? 'bg-foreground text-background' : 'hover:text-primary',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => {
            const qty = bag[product.id] ?? 0
            return (
              <li key={product.id} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-3xl bg-secondary">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide">
                    {product.category === 'postres' ? 'Postre' : 'Ropa'}
                  </span>
                  {product.tag && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
                </div>
                {qty > 0 ? (
                  <QuantityStepper
                    qty={qty}
                    label={product.name}
                    onAdd={() => add(product.id)}
                    onRemove={() => remove(product.id)}
                    className="mt-4"
                  />
                ) : (
                  <button
                    onClick={() => add(product.id)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-full border border-foreground px-4 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Plus className="size-4" aria-hidden />
                    Añadir a la bolsa
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {count > 0 && !bagOpen && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-foreground py-2 pl-6 pr-2 text-background shadow-xl"
        >
          <span className="text-sm">
            {sent ? '¿Ya enviaste tu pedido?' : `${count} ${count === 1 ? 'artículo' : 'artículos'} · ${formatPrice(total)}`}
          </span>
          <button
            onClick={() => setBagOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            <ShoppingBag className="size-4" aria-hidden />
            {sent ? 'Responder' : 'Ver bolsa y pedir'}
          </button>
        </div>
      )}

      <BagSheet
        open={bagOpen}
        lines={lines}
        total={total}
        telefono={telefono}
        sent={sent}
        onClose={closeBag}
        onAdd={add}
        onRemove={remove}
        onSend={markSent}
        onKeep={keep}
        onClear={() => {
          clear()
          setBagOpen(false)
        }}
      />
    </section>
  )
}
