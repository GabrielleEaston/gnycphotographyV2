// app/categories/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'

// 1) Your Photo interface
interface Photo {
  _id: string
  title: string
  description?: string
  imageUrl?: string
}

// 2) PageProps now declares params as a Promise
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  // 3) Await the params promise
  const { slug } = await params

  // 4) Fetch with your typed helper
  const { data: photos } = await sanityFetch<
    typeof photosByCategorySlugQuery,
    Photo[]
  >({
    query: photosByCategorySlugQuery,
    params: { slug },
  })

  // 5) 404 if nothing comes back
  if (!photos || photos.length === 0) {
    notFound()
  }

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
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            {photo.description && (
              <p className="text-gray-500">{photo.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
