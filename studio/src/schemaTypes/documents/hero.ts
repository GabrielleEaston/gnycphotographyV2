// src/schemaTypes/singletons/hero.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  // Only allow update & publish: enforce singleton behavior
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageDisplayMode',
      title: 'Image Display Mode',
      type: 'string',
      initialValue: 'background',
      options: {
        list: [
          {title: 'Background (full-hero)', value: 'background'},
          {title: 'Inline (photographer shot)', value: 'inline'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'cta',
      title: 'Call To Action (optional)',
      type: 'link',
      description: 'Optional button with title and URL',
    }),
  ],
})
