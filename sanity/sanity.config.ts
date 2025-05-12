import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: 'lmormq1g',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  auth: {
    providers: [
      {name: 'google', title: 'Google', url: 'https://api.sanity.io/v1/auth/login/google'},
    ]
  }
})