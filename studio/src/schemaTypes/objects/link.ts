import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Link Text',
      type: 'string',
      description: 'Text to display for this link (nav/CTA label)',
      validation: (R) => R.required()
    }),

    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'href',
      options: {
        layout: 'radio',
        list: [
          { title: 'Href (internal / anchor / external)', value: 'href' }, // ✅ allows /path and #anchor
          { title: 'Page', value: 'page' },
          { title: 'Post', value: 'post' },
        ],
      },
      validation: (R) => R.required(),
    }),

    // ✅ change from `url` → `string` and validate ourselves
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
      description: 'Examples: /#services, /#categories, #top, /contact, https://instagram.com/…',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (R) =>
        R.custom((value, ctx) => {
          if (ctx.parent?.linkType !== 'href') return true
          if (!value) return 'Href is required'
          const ok =
            /^#/.test(value) ||           // #anchor
            /^\/(#|[^?\s#])/.test(value) || // /path or /#anchor
            /^https?:\/\//.test(value)   // external full URL
          return ok || 'Use /path, /#anchor, #anchor, or https://…'
        }),
    }),

    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({parent}) => parent?.linkType !== 'page',
    }),

    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      hidden: ({parent}) => parent?.linkType !== 'post',
    }),

    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => ['page', 'post'].includes(parent?.linkType),
    }),
  ],

  preview: {
    select: {
      text: 'text',
      linkType: 'linkType',
      href: 'href',
      pageTitle: 'page.title',
      postTitle: 'post.title',
    },
    prepare({text, linkType, href, pageTitle, postTitle}) {
      const target =
        linkType === 'href' ? href :
        linkType === 'page' ? pageTitle :
        postTitle
      return {
        title: text || '(no text)',
        subtitle: `${linkType} → ${target || ''}`,
      }
    },
  },
})
