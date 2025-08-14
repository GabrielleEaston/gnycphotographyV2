// app/page.tsx

import Hero from './components/Hero'
import Services from './components/Services'
import { sanityFetch } from '@/sanity/lib/live'
import { heroQuery, categoriesQuery, servicesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import { CornerDownRight } from "lucide-react"; // ← NEW

// 1) Describe the shape of each category
interface Category {
  _id: string
  title: string
  slug: string
  thumbnailUrl?: string
}

export default async function HomePage() {
  // 2a) Fetch your hero data (assumed correctly typed by Hero component)
   const { data: hero } = await sanityFetch({
    query: heroQuery,
    // keep it fresh while you’re iterating:
    stega: false,
    perspective: "published",
  });

  // 2b) Fetch and cast your categories
  const { data: rawCategories } = await sanityFetch({ query: categoriesQuery })
  const categories = rawCategories as Category[]

  // 2c) Fetch and cast your services (you already typed ServicesProps)
  const { data: services } = await sanityFetch({ query: servicesQuery, perspective: "published", revalidate: 0 });



  return (
    <>
      {/* Hero section */}
        <Hero
        headline={hero?.headline}      // PT array
        heading={hero?.heading}        // plain string fallback
        description={hero?.description}
        cta={hero?.cta}
      />

      {/* Categories Section */}
      <section id="work" className="section-pad bg-white">
  <div className="site-container container py-16">
    <h2 className="cat-heading">CATEGORIES</h2>

    <div className="cat-layout">
      {/* Left: list with rules + arrow */}
      <nav aria-label="Categories" className="cat-list">
        <ul>
          {categories.map((c, i) => (
            <li key={c._id}>
              <Link href={`/categories/${c.slug}`} className="categories-link">
                <span>{c.title}</span>
                <CornerDownRight aria-hidden className="arrow-icon" />
              </Link>
              {i < categories.length - 1 && <div className="cat-rule" />}
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: grid of square thumbs (3×2 on desktop, 2× on mobile) */}
      <div className="cat-grid">
        {categories.slice(0, 6).map((c) => (
          <Link
            key={c._id}
            href={`/categories/${c.slug}`}
            aria-label={c.title}
            className="cat-card"
          >
            <div className="cat-thumb">
              {c.thumbnailUrl && (
                <Image
                  src={c.thumbnailUrl}
                  alt={c.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 350px"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Services & Brands */}
      <Services services={services ?? []} />
    </>
  )
}
