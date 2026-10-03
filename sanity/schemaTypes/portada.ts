import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'

const fotoConTexto = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Descripción de la foto',
        type: 'string',
        description: 'Una frase corta de lo que se ve. La usan los lectores de pantalla y Google.',
      }),
    ],
  })

export const portada = defineType({
  name: 'portada',
  title: 'Portada',
  type: 'document',
  icon: HomeIcon,
  fields: [fotoConTexto('fotoPostres', 'Foto grande de postres'), fotoConTexto('fotoRopa', 'Foto grande de ropa')],
  preview: {
    prepare: () => ({ title: 'Portada' }),
  },
})
