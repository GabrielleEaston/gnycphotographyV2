// app/components/Header.tsx
import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/live"
import { headerQuery } from "@/sanity/lib/queries"

// Helper to resolve real URLs from your link schema
function resolveLink(link: LinkType): string | null {
  if (link.linkType === "href" && link.href) return link.href
  if (link.linkType === "page" && link.page?.slug?.current) return "/" + link.page.slug.current
  if (link.linkType === "post" && link.post?.slug?.current) return "/posts/" + link.post.slug.current
  return null
}

// Type for your link object based on your schema
type LinkType = {
  _key: string
  text?: string
  linkType: "href" | "page" | "post"
  href?: string
  page?: { slug?: { current: string } }
  post?: { slug?: { current: string } }
  openInNewTab?: boolean
}

// Slug you set in Sanity Studio
const slug = "default-header"

export default async function Header() {
  // Updated types for your links
  const { data: header } = await sanityFetch<{
    logoUrl?: string
    links: LinkType[]
  }>({
    query: headerQuery,
    params: { slug },
  })

  const links = header?.links ?? []
  const logoUrl = header?.logoUrl

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        {logoUrl && (
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logoUrl}
              alt="Site logo"
              width={200}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </Link>
        )}

        {/* Nav Links */}
        <nav>
          <ul className="flex space-x-6">
            {links.map((link) => {
              const href = resolveLink(link)
              if (!href || !link.text) return null // Skip if missing URL or label
              return (
                <li key={link._key}>
                  <Link
                    href={href}
                    className="text-gray-700 hover:text-gray-900"
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  >
                    {link.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
