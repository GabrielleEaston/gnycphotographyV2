// components/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'

type CTA = { title: string; url: string }

export type HeroProps = {
  heading?: string
  description?: string
  imageUrl?: string
  imageDisplayMode?: 'background' | 'inline'
  cta?: CTA
}

export default function Hero({
  heading,
  description,
  imageUrl,
  imageDisplayMode = 'background',
  cta,
}: HeroProps) {
  if (!heading && !description && !imageUrl && !cta?.title) {
    return (
      <div className="py-16 text-center text-red-500">
        No Hero content found. Please ensure you have filled out the Hero document fields in Sanity (heading, description, image, or CTA) and published the document.
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background mode */}
      {imageUrl && imageDisplayMode === 'background' && (
        <>  
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={heading || 'Hero background'}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative container mx-auto py-32 px-6 text-center text-white">
            {heading && <h1 className="text-5xl font-light mb-6">{heading}</h1>}
            {description && <p className="max-w-2xl mx-auto mb-8">{description}</p>}
            {cta?.title && cta.url && (
              <Link
                href={cta.url}
                className="inline-block bg-white text-black py-3 px-6 rounded-md hover:bg-gray-200"
              >
                {cta.title}
              </Link>
            )}
          </div>
        </>
      )}

      {/* Inline mode */}
      {imageUrl && imageDisplayMode === 'inline' && (
        <div className="container mx-auto py-16 px-6 flex flex-col items-center">
          {heading && <h1 className="text-4xl font-light mb-4">{heading}</h1>}
          <div className="w-full sm:w-3/4 lg:w-1/2 mb-6">
            <Image
              src={imageUrl}
              alt={heading || 'Hero image'}
              width={800}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          {description && <p className="text-center mb-6 max-w-2xl">{description}</p>}
          {cta?.title && cta.url && (
            <Link
              href={cta.url}
              className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
            >
              {cta.title}
            </Link>
          )}
        </div>
      )}

      {/* No image mode */}
      {!imageUrl && (
        <div className="container mx-auto py-32 px-6 text-center">
          {heading && <h1 className="text-5xl font-light mb-6">{heading}</h1>}
          {description && <p className="max-w-2xl mx-auto mb-8">{description}</p>}
          {cta?.title && cta.url && (
            <Link
              href={cta.url}
              className="inline-block bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
            >
              {cta.title}
            </Link>
          )}
        </div>
      )}
    </section>
  )
}
