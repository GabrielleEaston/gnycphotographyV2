// /sanity/schemaTypes/documents/photo.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photo',
  type: 'document',
  title: 'Photo',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Category',
    }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
})
