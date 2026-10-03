import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'

export const producto = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Postre', value: 'postres' },
          { title: 'Ropa', value: 'ropa' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'postres',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (€)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      description: 'Mejor si es cuadrada. Puedes marcar la zona importante para que no se recorte.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'etiqueta',
      title: 'Etiqueta',
      type: 'string',
      description: 'Opcional. Por ejemplo: Nuevo, Favorita, Edición limitada.',
    }),
    defineField({
      name: 'orden',
      title: 'Orden en el catálogo',
      type: 'number',
      description: 'Opcional. Los números más bajos salen primero.',
    }),
  ],
  orderings: [
    { title: 'Orden en el catálogo', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] },
    { title: 'Nombre', name: 'nombre', by: [{ field: 'nombre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nombre', categoria: 'categoria', precio: 'precio', media: 'foto' },
    prepare({ title, categoria, precio, media }) {
      const tipo = categoria === 'ropa' ? 'Ropa' : 'Postre'
      return { title, subtitle: precio != null ? `${tipo} · ${precio} €` : tipo, media }
    },
  },
})
