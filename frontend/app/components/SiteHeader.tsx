"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

type NavLink = { key: string; label: string; href: string; newTab?: boolean };

export default function SiteHeader({
  logoUrl,
  logoText,
  links,
}: {
  logoUrl?: string;
  logoText: string;
  links: NavLink[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pendingHash = useRef<string | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Normalize hrefs so anchors always work from any page
  const normalized = useMemo(() => {
    return (links || []).map((l) => {
      let href = (l.href || "/").trim();
      if (href.startsWith("#")) href = "/" + href; // "#services" -> "/#services"
      return { ...l, href };
    });
  }, [links]);

  const isExternal = (href: string) =>
    /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

  // After route changes, if we have a pending hash, scroll to it
  useEffect(() => {
    if (!pendingHash.current) return;
    const tryScroll = () => {
      const id = pendingHash.current!;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        pendingHash.current = null;
      } else {
        // retry shortly in case content hasn't painted yet
        setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
  }, [pathname]);

  // Handle mobile click: route + scroll for hashes, then close
  const handleMobileClick = (e: React.MouseEvent, href: string, newTab?: boolean) => {
    if (isExternal(href)) {
      // let the browser handle external links (but close the panel)
      setOpen(false);
      return;
    }

    e.preventDefault();

    // split base path and hash
    const [base, hash] = href.split("#");
    const basePath = base || "/";

    if (hash) {
      pendingHash.current = hash;
    } else {
      pendingHash.current = null;
    }

    // Push the route (works both for / and /#hash). Next will handle same-path + hash.
    router.push(href, { scroll: !hash }); // for hash, we'll do smooth scroll manually
    setOpen(false);

    // If we are already on the same base path and only the hash changes,
    // pathname won't change -> manually attempt scroll quickly.
    if (hash && (pathname === basePath || (pathname === "/" && basePath === "/"))) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  return (
    <header className="bg-white">
      {/* Outer container with side padding */}
      <div className="mx-auto w-full px-[clamp(16px,3vw,40px)]">
        <div className="relative z-50 flex items-center justify-between py-4 border-b border-black">
          {/* Logo */}
          {logoUrl ? (
            <Link href="/" className="block">
              <Image
                src={logoUrl}
                alt="Site logo"
                width={180}
                height={48}
                style={{ objectFit: "contain" }}
              />
            </Link>
          ) : (
            <Link href="/" className="nav-logo">
              {logoText}
            </Link>
          )}

          {/* Desktop nav — visible >= md (Option B) */}
          <nav className="hidden md:block">
            <ul className="nav-links">
              {normalized.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(l.href.replace(/#.*$/, ""));
                const cls = `nav-link ${active ? "underline" : ""}`;
                return (
                  <li key={l.key}>
                    {isExternal(l.href) ? (
                      <a
                        href={l.href}
                        target={l.newTab ? "_blank" : undefined}
                        rel={l.newTab ? "noopener noreferrer" : undefined}
                        className={cls}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={cls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Hamburger — visible < md (Option B) */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 -mr-2 text-black"
            >
              {open ? <CloseIcon size={24} strokeWidth={1.5} /> : <MenuIcon size={24} strokeWidth={1.5} />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel (white, no colored overlay) */}
      <div
        id="mobile-menu"
        className={`
          md:hidden overflow-hidden border-b border-black/10 bg-white
          transition-all duration-300 ease-in-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        style={{ zIndex: 45 }}
      >
        <div className="mx-auto w-full px-[clamp(16px,3vw,40px)] py-3">
          <ul className="flex flex-col gap-3">
            {normalized.map((l) => (
              <li key={l.key}>
                {isExternal(l.href) ? (
                  <a
                    href={l.href}
                    target={l.newTab ? "_blank" : undefined}
                    rel={l.newTab ? "noopener noreferrer" : undefined}
                    className="nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <a
                    href={l.href}
                    className="nav-link"
                    onClick={(e) => handleMobileClick(e, l.href, l.newTab)}
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
