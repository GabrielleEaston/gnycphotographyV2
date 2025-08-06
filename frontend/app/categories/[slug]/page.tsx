// app/categories/[slug]/page.tsx
import { notFound } from "next/navigation"
import { sanityFetch } from "@/sanity/lib/live"
import { photosByCategorySlugQuery } from "@/sanity/lib/queries"
import PhotoGallery, { LightboxImage } from "./PhotoGallery"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  // 1) unwrap the slug
  const { slug } = await params

  // 2) fetch
  const { data } = await sanityFetch({
    query: photosByCategorySlugQuery,
    params: { slug },
  })

  // 3) cast & 404
  const photos = (data as any[]).map((p) => ({
    src: p.imageUrl!,
    title: p.title,
    description: p.description,
  })) as LightboxImage[]

  if (!photos.length) {
    notFound()
  }

  // 4) render client gallery
  return <PhotoGallery images={photos} />
}
