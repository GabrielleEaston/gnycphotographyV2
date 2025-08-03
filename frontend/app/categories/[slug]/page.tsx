// app/categories/[slug]/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'
import Image from 'next/image'

// (Optional) Your own TS interfaces
interface Photo {
  _id: string
  title?: string
  description?: string
  imageUrl?: string
}

type Props = { params: { slug: string } }

export default async function Page({ params }: Props) {
  const { slug } = params
  // Fetch all photos in this category
  const { data } = await sanityFetch({
    query: photosByCategorySlugQuery,
    params: { slug },
  })
  const photos = (data as Photo[]) || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {photos.map((photo) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded shadow hover:shadow-lg transition"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
              alt={photo.title || ''}
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
