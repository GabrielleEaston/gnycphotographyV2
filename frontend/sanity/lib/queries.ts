import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const headerQuery = `
  *[_type=='header' && slug.current==$slug][0]{
    "logoUrl": logo.asset->url,
    links[]{
      _key,
      text,
      linkType,
      href,
      page->{slug},
      post->{slug}
    }
  }
`


export const heroQuery = /* groq */ `
*[_type == "hero"] | order(_updatedAt desc)[0]{
  headline,            
  heading,             
  description,
  cta { title, url }
}
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    "thumbnailUrl": thumbnail.asset->url
  }
  `

  export const photosByCategorySlugQuery = `
  *[_type == "photo" && category->slug.current == $slug]{
    _id,
    title,
    "imageUrl": image.asset->url,
    description
  }
`

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

// /sanity/lib/queries.ts
export const servicesQuery = /* groq */ `
*[_type == "service"] | order(coalesce(order, 9999) asc, title asc){
  _id,
  title,
  "summary": coalesce(summary, description),  // fall back to description if needed
  category
}
`;


const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
