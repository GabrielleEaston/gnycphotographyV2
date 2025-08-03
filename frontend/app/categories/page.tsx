// import { sanityFetch } from '@/sanity/lib/live'
// import { categoriesQuery } from '@/sanity/lib/queries'
// import Link from 'next/link'
// import Image from 'next/image'

// export default async function CategoriesPage() {
//   const { data: categories } = await sanityFetch({ query: categoriesQuery })

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
//       {categories?.map(cat => (
//         <Link key={cat._id} href={`/categories/${cat.slug}`}>
//           <div className="border rounded-lg overflow-hidden hover:shadow-xl transition">
//             {cat.thumbnailUrl && (
//               <Image src={cat.thumbnailUrl} alt={cat.title} width={400} height={300} className="w-full h-60 object-cover" />
//             )}
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{cat.title}</h2>
//               <p className="text-gray-600">{cat.description}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }
