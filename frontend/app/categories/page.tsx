// app/categories/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { categoriesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

// (Optional) Your own TS interfaces for stronger typing
interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  thumbnailUrl?: string
}

export default async function Page() {
  // Fetch from Sanity
  const { data } = await sanityFetch({ query: categoriesQuery })
  // Tell TS “this is our shape”
  const categories = (data as Category[]) || []

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {categories.map((cat) => (
        <li key={cat._id}>
          <Link
            href={`/categories/${cat.slug}`}
            className="block border rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {cat.thumbnailUrl && (
              <Image
                src={cat.thumbnailUrl}
                alt={cat.title}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{cat.title}</h2>
              {cat.description && (
                <p className="text-gray-600">{cat.description}</p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
