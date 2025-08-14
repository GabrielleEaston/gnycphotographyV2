// components/Hero.tsx
import Link from "next/link";
import { PortableText } from "@portabletext/react";

type CTA = { title: string; url: string };

export type HeroProps = {
  headline?: any;       // Portable Text value from Sanity
  heading?: string;     // Fallback plain text if no PT
  description?: string;
  cta?: CTA;
};

// Portable Text components
const ptComponents = {
  marks: {
    em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: any) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <Link
          href={href}
          target={value?.blank || isExternal ? "_blank" : undefined}
          rel={value?.blank || isExternal ? "noopener noreferrer" : undefined}
          className="hero-link"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    normal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
};

export default function Hero({
  headline,
  heading,
  description,
  cta,
}: HeroProps) {
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

        {description && (
          <p className="mt-6 max-w-3xl">{description}</p>
        )}

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
