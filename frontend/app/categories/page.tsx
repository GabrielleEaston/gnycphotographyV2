import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { categoriesQuery } from "@/sanity/lib/queries";
import { CornerDownRight } from "lucide-react"; // ← NEW
// Shape we want in React
type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  thumbUrl?: string;
  thumbAlt?: string;
  description?: string;
};

export default async function CategoriesPage() {
  const { data } = await sanityFetch({ query: categoriesQuery, perspective: "published" });

  // Map Sanity → props your UI needs
  const cats: Category[] = (data || []).map((c: any) => ({
    _id: c._id,
    title: c.title,
    slug: c.slug,
    thumbUrl: c.thumbnailUrl || c.coverUrl || c.imageUrl, // whatever your query returns
    thumbAlt: c.thumbnailAlt || c.title,
    description: c.description,
  }));

  // left list uses all, right grid shows first 6 (like your mock)
  const gridItems = cats.slice(0, 6);

  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        {/* Heading */}
        <h2 className="cat-heading">CATEGORIES</h2>

        {/* Two-column layout on desktop */}
        <div className="cat-layout">
          {/* Left: list with rules and arrow */}
          <nav aria-label="Categories" className="cat-list">
            <ul>
              {cats.map((c, i) => (
                <li key={c._id}>
                  <Link href={`/categories/${c.slug.current}`} className="cat-link">
                    <span>{c.title}</span>
                    <CornerDownRight aria-hidden className="arrow-icon" /> {/* ← replaced ↳ */}
                  </Link>
                  {i < cats.length - 1 && <div className="cat-rule" />}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: 3x2 square grid */}
          <div className="cat-grid">
            {gridItems.map((c) => (
              <Link
                key={c._id}
                href={`/categories/${c.slug.current}`}
                aria-label={c.title}
                className="cat-card"
              >
                <div className="cat-thumb">
                  {c.thumbUrl ? (
                    <Image
                      src={c.thumbUrl}
                      alt={c.thumbAlt || c.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 350px"
                    />
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
