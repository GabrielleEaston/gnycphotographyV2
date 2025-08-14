// components/Hero.tsx
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

type CTA = { title: string; url: string };

export type HeroProps = {
  headline?: any;       // Portable Text value from Sanity
  heading?: string;     // Fallback plain text if no PT
  description?: string;
  cta?: CTA;
};

// Portable Text components (typed)
// Keep your classes & behavior the same
const ptComponents: PortableTextComponents = {
  marks: {
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = (value as any)?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      const openNew = (value as any)?.blank || isExternal;

      return (
        <Link
          href={href}
          target={openNew ? "_blank" : undefined}
          rel={openNew ? "noopener noreferrer" : undefined}
          className="hero-link"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

export default function Hero({ headline, heading, description, cta }: HeroProps) {
  if (!headline && !heading && !description && !cta?.title) {
    return (
      <div className="py-16 text-center text-red-500">
        No Hero content found. Please fill out the Hero document in Sanity and publish.
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto w-full py-16">
        <h1 className="hero-headline">
          {headline ? (
            <PortableText value={headline} components={ptComponents} />
          ) : (
            heading
          )}
        </h1>

        {description && <p className="mt-6 max-w-3xl">{description}</p>}

        {cta?.title && cta.url && (
          <Link
            href={cta.url}
            className="inline-block mt-8 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
          >
            {cta.title}
          </Link>
        )}
      </div>
    </section>
  );
}
