// app/categories/[slug]/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'
import Image from 'next/image'

// 1. Define your Photo shape
type Photo = {
  _id: string
  title: string
  imageUrl: string
  description: string
}

export default async function CategoryPage({
  params,
}: {
  // 2. Next.js now passes params as a Promise
  params: Promise<{ slug: string }>
}) {
  // 3. Await the params before you destructure
  const { slug } = await params

  // 4. Fetch typed data directly as Photo[]
  const photos = await sanityFetch<Photo[]>({
    query: photosByCategorySlugQuery,
    params: { slug },
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {photos.map((photo) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded shadow hover:shadow-lg"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={500}
              height={350}
              className="w-full h-60 object-cover"
            />
          )}
          <div className="p-2">
            <h3 className="text-lg">{photo.title}</h3>
            <p className="text-gray-500">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
