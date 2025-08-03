// app/categories/[slug]/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import {
  categoriesQuery,
  photosByCategorySlugQuery,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

// 1️⃣ Tell Next all your category‐slugs at build time:
export async function generateStaticParams() {
  const { data: cats } = await sanityFetch({ query: categoriesQuery });
  return cats.map((c: any) => ({ slug: c.slug }));
}

// 2️⃣ Now params is plain { slug: string }
type PageProps = { params: { slug: string } };

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;

  // 3️⃣ Fetch photos by that slug
  const { data: photos } = await sanityFetch({
    query: photosByCategorySlugQuery,
    params: { slug },
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {(photos || []).map((photo: any) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded shadow hover:shadow-lg"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
              alt={photo.title || ""}
              width={500}
              height={350}
              className="w-full h-60 object-cover"
            />
          )}
          <div className="p-2">
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            <p className="text-gray-500">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
