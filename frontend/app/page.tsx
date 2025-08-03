// app/page.tsx

import Hero from './components/Hero'
import Services from './components/Services'
import Brands from './components/Brands'
import { sanityFetch } from '@/sanity/lib/live'
import { heroQuery, categoriesQuery, servicesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

// 1) Describe the shape of each category
interface Category {
  _id: string
  title: string
  slug: string
  thumbnailUrl?: string
}

export default async function HomePage() {
  // 2a) Fetch your hero data (assumed correctly typed by Hero component)
  const { data: heroData } = await sanityFetch({ query: heroQuery })
  const hero = heroData

  // 2b) Fetch and cast your categories
  const { data: rawCategories } = await sanityFetch({ query: categoriesQuery })
  const categories = rawCategories as Category[]

  // 2c) Fetch and cast your services (you already typed ServicesProps)
  const { data: rawServices } = await sanityFetch({ query: servicesQuery })
  const services = rawServices

  return (
    <>
      {/* Hero section */}
      <Hero {...hero} />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-center text-black text-sm font-semibold tracking-widest mb-16 uppercase">
          Categories
        </h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat) => (
            <div key={cat._id} className="flex flex-col items-center">
              <Link href={`/categories/${cat.slug}`} className="block group w-full">
                <div className="aspect-square overflow-hidden">
                  {cat.thumbnailUrl && (
                    <Image
                      src={cat.thumbnailUrl}
                      alt={cat.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
              </Link>
              <Link
                href={`/categories/${cat.slug}`}
                className="mt-8 text-center text-black text-xl font-serif hover:underline"
              >
                {cat.title}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Services & Brands */}
      <Services services={services} />
      <Brands />
    </>
  )
}
