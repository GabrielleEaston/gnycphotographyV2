// app/components/PhotoGallery.tsx
'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Image from 'next/image'

export interface LightboxImage {
  src: string
  title?: string
  description?: string
}

interface PhotoGalleryProps {
  images: LightboxImage[]
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <>
      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="overflow-hidden rounded shadow hover:shadow-lg focus:outline-none"
          >
            <Image
              src={img.src}
              alt={img.title}
              width={500}
              height={350}
              className="w-full h-60 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{img.title}</h3>
              {img.description && (
                <p className="text-gray-500">{img.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* The lightbox overlay */}
      {index !== null && (
        <Lightbox
          slides={images.map((img) => ({ src: img.src, title: img.title }))}
          open={index !== null}
          index={index}
          close={() => setIndex(null)}
        />
      )}
    </>
  )
}
