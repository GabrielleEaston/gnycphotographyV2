// app/components/Services.tsx
"use client";

import { useMemo, useState } from "react";
import { CornerDownRight } from "lucide-react";

export interface Service {
  _id: string;
  title: string;
  summary?: string;      // we coalesce to description in GROQ if needed
  category?: string;     // may be missing on some docs
}

const normalize = (c?: string) => (c ?? "All").trim().toLowerCase();
const labelize = (n: string) =>
  n === "people" ? "People" :
  n === "places" ? "Places" :
  n === "brand"  ? "Brand"  :
  n === "all"    ? "All"    :
  n.charAt(0).toUpperCase() + n.slice(1);

export default function Services({
  services,
  title = "SERVICES",
}: {
  services: Service[];
  title?: string;
}) {
  // Build groups and unique, ordered tabs
  const { groups, tabs } = useMemo(() => {
    const groups: Record<string, Service[]> = {};
    let sawReal = false;

    for (const s of services ?? []) {
      const key = normalize(s.category);
      if (key !== "all") sawReal = true;
      (groups[key] ||= []).push(s);
    }

    // unique + preferred order
    const preferred = ["people", "places", "brand"];
    const uniques = Array.from(new Set(Object.keys(groups)));
    const ordered = preferred.filter((k) => groups[k]?.length);
    const extras  = uniques.filter((k) => !preferred.includes(k) && groups[k]?.length);

    const tabs = (sawReal ? [...ordered, ...extras] : ["all"]);
    return { groups, tabs };
  }, [services]);

  // ✅ Hooks must run unconditionally (no early return above)
  const [active, setActive] = useState<string>(tabs[0]);

  // Now it's safe to short-circuit render if nothing to show
  if (!services?.length) return null;

  return (
    <section id="services" className="section-pad bg-white">
      <div className="site-container container py-16">
        <h2 className="services-title">{title}</h2>

        <div className="services-layout">
          {/* LEFT: one row PER UNIQUE CATEGORY */}
          <nav aria-label="Service categories" className="services-rail">
            <ul>
              {tabs.map((cat, i) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActive(cat)}
                    className={`services-link ${active === cat ? "is-active" : ""}`}
                    aria-current={active === cat ? "page" : undefined}
                  >
                    <span>{labelize(cat)}</span>
                    <CornerDownRight aria-hidden className="arrow-icon" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT: items for active category */}
          <div className="services-list">
            <div key={active} className="services-panel services-fade">
              {(groups[active] || []).map((s) => (
                <article key={s._id} className="service-item">
                  <h3 className="service-name">{s.title}</h3>
                  {s.summary && <p className="service-desc">{s.summary}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
