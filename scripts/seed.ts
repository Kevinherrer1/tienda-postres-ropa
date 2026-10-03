import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { getCliClient } from 'sanity/cli'
import { portada, products } from '../lib/products'

const client = getCliClient({ apiVersion: '2026-09-01' })

const uploaded = new Map<string, string>()

async function uploadImage(publicPath: string, folder = 'public') {
  const file = join(process.cwd(), folder, publicPath)
  if (!existsSync(file)) {
    console.log(`  (sin foto: ${publicPath} no existe, se puede subir luego desde el panel)`)
    return undefined
  }
  let assetId = uploaded.get(file)
  if (!assetId) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) })
    assetId = asset._id
    uploaded.set(file, assetId)
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

async function main() {
  for (const [index, p] of products.entries()) {
    console.log(`Producto: ${p.name}`)
    await client.createIfNotExists({
      _id: `producto-${p.id}`,
      _type: 'producto',
      nombre: p.name,
      descripcion: p.description,
      precio: p.price,
      categoria: p.category,
      etiqueta: p.tag,
      orden: (index + 1) * 10,
      foto: await uploadImage(p.image),
    })
  }

  console.log('Portada')
  const [fotoPostres, fotoRopa] = await Promise.all([
    uploadImage(portada.postres.src),
    uploadImage(portada.ropa.src),
  ])
  await client.createIfNotExists({
    _id: 'portada',
    _type: 'portada',
    fotoPostres: fotoPostres && { ...fotoPostres, alt: portada.postres.alt },
    fotoRopa: fotoRopa && { ...fotoRopa, alt: portada.ropa.alt },
  })

  const marca = join(process.cwd(), 'marca.local', 'ajustes.json')
  if (existsSync(marca)) {
    console.log('Ajustes de la tienda (marca.local)')
    const { logo, icono, ...datos } = JSON.parse(readFileSync(marca, 'utf8'))
    await client.createIfNotExists({
      _id: 'ajustes',
      _type: 'ajustes',
      ...datos,
      logo: logo ? await uploadImage(logo, 'marca.local') : undefined,
      icono: icono ? await uploadImage(icono, 'marca.local') : undefined,
    })
  } else {
    console.log('Sin marca.local/ajustes.json: los ajustes de la tienda se completan desde el panel')
  }

  console.log('\nListo. Abre /studio para ver y editar el contenido.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
