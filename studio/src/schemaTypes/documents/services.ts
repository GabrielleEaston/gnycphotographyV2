// /sanity/schemaTypes/documents/service.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'icon', type: 'image', title: 'Icon (optional)' }),
    // add more fields as needed
  ]
})
