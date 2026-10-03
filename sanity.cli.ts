import { defineCliConfig } from 'sanity/cli'

try {
  process.loadEnvFile('.env.local')
} catch {}

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
