import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'
import Image from 'next/image'

type Photo = {
  _id: string
  imageUrl?: string
  title?: string
  description?: string
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const photos = await sanityFetch<Photo[]>({
  query: photosByCategorySlugQuery,
  params: { slug },
})

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {(photos || []).map((photo: Photo) => (
        <div key={photo._id} className="overflow-hidden rounded shadow hover:shadow-lg">
          {photo.imageUrl && (
            <Image src={photo.imageUrl} alt={photo.title || ''} width={500} height={350} className="w-full h-60 object-cover" />
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
