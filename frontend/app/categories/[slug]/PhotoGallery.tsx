'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

export interface LightboxImage {
  src: string
  title: string
  description?: string
}

interface PhotoGalleryProps {
  images: LightboxImage[]
  title?: string
  id?: string            // optional anchor id for header linking
}

export default function PhotoGallery({ images, title, id = 'work' }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => setIndex(i)
  const close = () => setIndex(null)

  return (
    <section id={id} className="section-pad anchor-target">
      <div className="container">
        {title && <h2 className="page-title mb-8">{title}</h2>}

        {/* Grid */}
        <div
          className="
            grid gap-x-8 gap-y-10
            grid-cols-2 md:grid-cols-3 xl:grid-cols-4
          "
        >
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => open(i)}
              className="
                group relative block aspect-square overflow-hidden
                border border-black
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                cursor-pointer
              "
              aria-label={img.title || 'Open image'}
              title={img.title}
            >
              {/* image */}
              <Image
                src={img.src}
                alt={img.title ?? ''}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="
                  object-cover
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-[1.03]
                "
                priority={i < 4}
              />

              {/* caption bar */}
              {(img.title || img.description) && (
                <div
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0
                    translate-y-full group-hover:translate-y-0
                    transition-transform duration-300 ease-in-out
                    bg-white/90 text-black
                    px-3 py-2
                  "
                >
                  {img.title && (
                    <div className="font-medium leading-tight">{img.title}</div>
                  )}
                  {img.description && (
                    <div className="text-sm opacity-80">{img.description}</div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {index !== null && (
          <Lightbox
            open={index !== null}
            index={index ?? 0}
            close={close}
            slides={images.map((img) => ({
              src: img.src,
              title: img.title,
              description: img.description,
            }))}
          />
        )}
      </div>
    </section>
  )
}
