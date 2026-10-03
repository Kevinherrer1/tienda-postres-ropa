import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const ajustes = defineType({
  name: 'ajustes',
  title: 'Ajustes de la tienda',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la tienda',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eslogan',
      title: 'Frase corta',
      type: 'string',
      description: 'Sale en el pie de página. Por ejemplo: Postres artesanales y ropa para todos los estilos.',
    }),
    defineField({
      name: 'telefono',
      title: 'WhatsApp para pedidos',
      type: 'string',
      description: 'Escríbelo como siempre, por ejemplo 0424-123 4567.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'ubicacion', title: 'Ubicación de la tienda', type: 'string' }),
    defineField({
      name: 'entregas',
      title: 'Entregas',
      type: 'string',
      description: 'Opcional. Por ejemplo: A domicilio en toda la ciudad.',
    }),
    defineField({ name: 'horario', title: 'Horario', type: 'string' }),
    defineField({
      name: 'logo',
      title: 'Logo completo',
      type: 'image',
      description: 'Sale en el pie de página y al compartir el enlace por WhatsApp.',
    }),
    defineField({
      name: 'icono',
      title: 'Ícono',
      type: 'image',
      description: 'Versión cuadrada y sencilla del logo. Sale arriba junto al nombre y en la pestaña del navegador.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'nombre', media: 'icono' },
    prepare: ({ title, media }) => ({ title: title || 'Ajustes de la tienda', media }),
  },
})
