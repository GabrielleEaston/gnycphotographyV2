// app/categories/[slug]/page.tsx

import { sanityFetch } from '@/sanity/lib/live'
import { photosByCategorySlugQuery } from '@/sanity/lib/queries'
import Image from 'next/image'
import React from 'react'

// adjust this to wherever your Photo type lives
type Photo = {
  _id: string
  title: string
  imageUrl: string
  description?: string
}

export default async function CategoryPage({
  params,
}: {
  // In RSC dynamic routes, Next.js passes params as a Promise
  params: Promise<{ slug: string }>
}) {
  // await the params before destructuring
  const { slug } = await params

  // fetch with two generics: <ParamsShape, DataShape>
  const { data: photos } = await sanityFetch<
    { slug: string },  // params type
    Photo[]            // data type
  >({
    query:   photosByCategorySlugQuery,
    params:  { slug },
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {(photos || []).map((photo) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded-lg shadow hover:shadow-lg transition"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
              alt={photo.title || ''}
              width={500}
              height={350}
              className="w-full h-60 object-cover"
              priority={false}
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            {photo.description && (
              <p className="mt-2 text-gray-500">{photo.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
