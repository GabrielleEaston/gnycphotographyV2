import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { headerQuery } from "@/sanity/lib/queries";
import SiteHeader from "./SiteHeader";

type LinkType = {
  _key: string;
  text?: string;
  linkType: "href" | "page" | "post";
  href?: string;
  page?: { slug?: { current: string } };
  post?: { slug?: { current: string } };
  openInNewTab?: boolean;
};

function resolveLink(link: LinkType): string | null {
  if (link.linkType === "href" && link.href) return link.href;
  if (link.linkType === "page" && link.page?.slug?.current) return "/" + link.page.slug.current;
  if (link.linkType === "post" && link.post?.slug?.current) return "/posts/" + link.post.slug.current;
  return null;
}

const slug = "default-header";

export default async function Header() {
  const { data } = await sanityFetch({ query: headerQuery, params: { slug } });

  const header = (data ?? {}) as {
    logoUrl?: string;
    logoText?: string; // optional future field in Studio
    links?: LinkType[];
  };

  const navLinks =
    (header.links ?? [])
      .map(l => {
        const href = resolveLink(l);
        return href && l.text
          ? { key: l._key, label: l.text, href, newTab: !!l.openInNewTab }
          : null;
      })
      .filter(Boolean) as { key: string; label: string; href: string; newTab: boolean }[];

  return (
    <SiteHeader
      logoUrl={header.logoUrl}
      logoText={header.logoText || "GNYCPHOTOGRAPHY"}
      links={navLinks}
    />
  );
}
