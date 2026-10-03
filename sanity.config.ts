'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { esESLocale } from '@sanity/locale-es-es'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

const singletonTypes = new Set(['portada', 'ajustes'])

export default defineConfig({
  name: 'default',
  title: 'Panel de la tienda',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Ajustes de la tienda')
              .id('ajustes')
              .schemaType('ajustes')
              .child(S.document().schemaType('ajustes').documentId('ajustes')),
            S.listItem()
              .title('Portada')
              .id('portada')
              .schemaType('portada')
              .child(S.document().schemaType('portada').documentId('portada')),
            S.divider(),
            S.documentTypeListItem('producto').title('Productos'),
          ]),
    }),
    esESLocale(),
  ],
  apiVersion,
})
