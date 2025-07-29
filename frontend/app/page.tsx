// app/page.tsx
import Hero from './components/Hero'
import Services from './components/Services'
import Brands from './components/Brands'
import { sanityFetch } from '@/sanity/lib/live'
import { heroQuery, categoriesQuery, servicesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  // Fetch hero and categories
  const { data: hero } = await sanityFetch({ query: heroQuery })
  const { data: categories } = await sanityFetch({ query: categoriesQuery })
  const { data: services } = await sanityFetch({ query: servicesQuery })

// ...in your return:

  return (
    <>
      <Hero {...hero} />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
  <h2 className="text-center text-black text-sm font-semibold tracking-widest mb-16 uppercase">
    Categories
  </h2>
  <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
    {categories?.map(cat => (
      <div key={cat._id} className="flex flex-col items-center">
        <a href={`/categories/${cat.slug}`} className="block group w-full">
          <div className="aspect-square overflow-hidden">
            <img
              src={cat.thumbnailUrl}
              alt={cat.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              style={{ aspectRatio: '1 / 1' }}
            />
          </div>
        </a>
        <a
          href={`/categories/${cat.slug}`}
          className="mt-8 text-center text-black text-xl font-serif hover:underline"
        >
          {cat.title}
        </a>
      </div>
    ))}
  </div>
</section>
<Services services={services} />
<Brands />
    </>
  )
}
