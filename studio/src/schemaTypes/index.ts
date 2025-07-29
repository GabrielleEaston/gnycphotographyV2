import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import navLink from './objects/navLink'
import header  from './documents/header'
import hero from './documents/hero'
import category from './documents/categoty'
import photo from './documents/photo'
import services from './documents/services'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  header,
  page,
  post,
  hero,
  person,
  category,
  photo,
  services,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
