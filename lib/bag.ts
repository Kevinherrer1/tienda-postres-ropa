'use client'

import { useEffect, useState } from 'react'

export type Bag = Record<string, number>

const STORAGE_KEY = 'tienda-bolsa'
const SENT_KEY = 'tienda-pedido-enviado'

function readBag(): Bag {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, number] => {
        const qty = entry[1]
        return typeof qty === 'number' && Number.isInteger(qty) && qty > 0
      }),
    )
  } catch {
    return {}
  }
}

export function useBag(validIds: string[]) {
  const [bag, setBag] = useState<Bag>({})
  const [sent, setSent] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const validKey = validIds.join('|')

  useEffect(() => {
    const valid = new Set(validKey.split('|'))
    const stored = readBag()
    setBag(Object.fromEntries(Object.entries(stored).filter(([id]) => valid.has(id))))
    setSent(localStorage.getItem(SENT_KEY) === '1')
    setLoaded(true)
  }, [validKey])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(bag))
  }, [bag, loaded])

  useEffect(() => {
    if (!loaded) return
    if (sent) localStorage.setItem(SENT_KEY, '1')
    else localStorage.removeItem(SENT_KEY)
  }, [sent, loaded])

  function setQuantity(id: string, qty: number) {
    setSent(false)
    setBag((current) => {
      const next = { ...current }
      if (qty > 0) next[id] = qty
      else delete next[id]
      return next
    })
  }

  return {
    bag,
    add: (id: string) => setQuantity(id, (bag[id] ?? 0) + 1),
    remove: (id: string) => setQuantity(id, (bag[id] ?? 0) - 1),
    setQuantity,
    sent,
    markSent: () => setSent(true),
    keep: () => setSent(false),
    clear: () => {
      setSent(false)
      setBag({})
    },
  }
}
