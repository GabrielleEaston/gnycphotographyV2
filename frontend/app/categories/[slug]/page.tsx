// app/categories/[slug]/page.tsx
import { sanityFetch } from "@/sanity/lib/live"
import { photosByCategorySlugQuery } from "@/sanity/lib/queries"
import Image from "next/image"

interface Photo {
  _id: string
  title: string
  description?: string
  imageUrl: string
}
// No need to re–declare Next’s PageProps; just inline it:
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // unwrap the slug
  const { slug } = await params

  // sanityFetch only takes one generic (the data shape), not two
  const { data: photos } = await sanityFetch<Photo[]>({
    query: photosByCategorySlugQuery,
    params: { slug },
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {(photos || []).map((photo) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded shadow hover:shadow-lg"
        >
          <Image
            src={photo.imageUrl}
            alt={photo.title || ""}
            width={500}
            height={350}
            className="w-full h-60 object-cover"
          />
          <div className="p-2">
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            <p className="text-gray-500">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
