import Image from 'next/image'
import type { Portada } from '@/lib/products'

export function Hero({ portada }: { portada: Portada }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:pt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h1 className="animate-rise font-display text-5xl font-extrabold leading-none tracking-tight text-balance md:text-7xl lg:text-8xl">
          Algo dulce
          <br />
          <span className="text-primary">para comer</span>
          <br />y para <span className="rounded-full bg-accent px-4">vestir</span>.
        </h1>
        <p
          className="animate-rise max-w-xs leading-relaxed text-muted-foreground text-pretty"
          style={{ animationDelay: '150ms' }}
        >
          Postres artesanales hechos a mano, como en casa. Y ropa para todos los estilos: deportiva, casual y mucho más.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-4 md:grid-cols-2">
        <a
          href="#catalogo"
          className="group animate-rise relative block overflow-hidden rounded-3xl"
          style={{ animationDelay: '250ms' }}
        >
          <Image
            src={portada.postres.src}
            alt={portada.postres.alt}
            width={900}
            height={900}
            preload
            loading="eager"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-square"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-background px-5 py-2 font-display text-lg font-semibold">
            Postres
          </span>
        </a>
        <a
          href="#catalogo"
          className="group animate-rise relative block overflow-hidden rounded-3xl md:mt-16"
          style={{ animationDelay: '350ms' }}
        >
          <Image
            src={portada.ropa.src}
            alt={portada.ropa.alt}
            width={900}
            height={900}
            preload
            loading="eager"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-square"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-background px-5 py-2 font-display text-lg font-semibold">
            Ropa
          </span>
        </a>
      </div>
    </section>
  )
}
