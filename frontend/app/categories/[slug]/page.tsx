import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'
import Image from 'next/image'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Await params per Next.js 15+ App Router server component signature
  const { slug } = await params

  const { data: photos } = await sanityFetch({
    query: photosByCategorySlugQuery,
    params: { slug },
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {(photos || []).map(photo => (
        <div key={photo._id} className="overflow-hidden rounded shadow hover:shadow-lg">
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
            <h3 className="text-lg">{photo.title}</h3>
            <p className="text-gray-500">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
