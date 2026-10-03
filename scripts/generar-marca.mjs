// Prepara el logo y el ícono redondo de una tienda en marca.local/ para subirlos con `pnpm sanity:seed`.
// Uso: node scripts/generar-marca.mjs ruta/al/logo.jpg [izquierda arriba tamaño]
// Los tres números opcionales recortan la zona del logo que se usará como ícono (por defecto, el logo entero).
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'

const require = createRequire(import.meta.url)
const sharp = require(require.resolve('sharp', { paths: [require.resolve('next')] }))

const [logo, left, top, lado] = process.argv.slice(2)
if (!logo) {
  console.error('Falta la ruta del logo')
  process.exit(1)
}

const recorte = lado ? { left: Number(left), top: Number(top), width: Number(lado), height: Number(lado) } : null
const size = 256
const circulo = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
)

mkdirSync('marca.local', { recursive: true })

await sharp(logo).resize(800, 800, { fit: 'cover' }).jpeg({ quality: 88 }).toFile('marca.local/logo.jpg')

const base = recorte ? sharp(logo).extract(recorte) : sharp(logo)
const icono = await base.resize(size, size, { fit: 'cover' }).toBuffer()
await sharp(icono)
  .composite([{ input: circulo, blend: 'dest-in' }])
  .png()
  .toFile('marca.local/icono.png')

console.log('Listo: marca.local/logo.jpg y marca.local/icono.png')
