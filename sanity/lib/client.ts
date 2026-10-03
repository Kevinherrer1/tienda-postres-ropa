import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: projectId || 'sin-configurar',
  dataset,
  apiVersion,
  useCdn: true,
})
