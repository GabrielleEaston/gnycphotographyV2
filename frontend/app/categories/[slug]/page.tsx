// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/live';
import { photosByCategorySlugQuery } from '@/sanity/lib/queries';

// 1) Define your Photo shape (or import it from your shared types file)
interface Photo {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

// 2) Tell Next exactly what props this page gets
interface PageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;

  // 3) Use sanityFetch with two generics: the query type and the data shape
  const { data: photos } = await sanityFetch<
    typeof photosByCategorySlugQuery,
    Photo[]
  >({
    query: photosByCategorySlugQuery,
    params: { slug },
  });

  // 4) If no photos, show a 404
  if (!photos || photos.length === 0) {
    notFound();
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {photos.map((photo) => (
        <div
          key={photo._id}
          className="overflow-hidden rounded shadow hover:shadow-lg"
        >
          {photo.imageUrl && (
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={500}
              height={350}
              className="w-full h-60 object-cover"
            />
          )}
          <div className="p-2">
            <h3 className="text-lg font-semibold">{photo.title}</h3>
            {photo.description && (
              <p className="text-gray-500">{photo.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
