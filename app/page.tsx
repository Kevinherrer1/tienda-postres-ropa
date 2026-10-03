import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/catalog'
import { Visit } from '@/components/visit'
import { SiteFooter } from '@/components/site-footer'
import { getAjustes, getPortada, getProducts } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [ajustes, products, portada] = await Promise.all([getAjustes(), getProducts(), getPortada()])

  return (
    <>
      <SiteHeader ajustes={ajustes} />
      <main>
        <Hero portada={portada} />
        <Catalog products={products} telefono={ajustes.telefono} />
        <Visit ajustes={ajustes} />
      </main>
      <SiteFooter ajustes={ajustes} />
    </>
  )
}
