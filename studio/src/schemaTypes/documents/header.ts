// src/schemaTypes/documents/header.ts
import { defineType, defineField } from 'sanity'
import navLink from '../objects/navLink'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (for sanity UI)',
      type: 'string',
      description: 'A human-readable name; not shown on the site.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
})
