import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/impact", label: "Our Impact" },
      { to: "/branches", label: "Branches" },
      { to: "/careers", label: "Careers" },
      { to: "/blog", label: "Insights" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services/cng-conversion", label: "CNG Conversion" },
      { to: "/hire-purchase", label: "Keke Hire Purchase" },
      { to: "/fleet", label: "Fleet Operations" },
      { to: "/workshop", label: "Workshop" },
      { to: "/services", label: "All Services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { to: "/why-cng", label: "Why CNG" },
      { to: "/fleet", label: "Fleet Consulting" },
      { to: "/contact", label: "Become a Partner" },
      { to: "/contact", label: "Investor Enquiries" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/80">
      <div className="absolute inset-0 opacity-60 bg-hero-gradient" aria-hidden />
      <div className="container-x relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Driving Africa's clean mobility revolution through CNG conversion,
              intelligent fleet operations, and world-class automotive
              engineering.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-4 w-4 text-emerald" />
                Head Office — Katsina, Nigeria
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="h-4 w-4 text-emerald" />
                +234 800 000 0000
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="h-4 w-4 text-emerald" />
                hello@cityviewcng.africa
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="inline-flex items-center gap-1 text-white/70 transition hover:text-emerald"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">
              Get the CityView briefing
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Quarterly updates on clean-mobility infrastructure, CNG policy,
              and fleet performance across Africa.
            </p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald focus:outline-none"
              aria-label="Email address"
            />
            <button className="inline-flex items-center gap-1 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-forest-deep transition hover:bg-white">
              Subscribe <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} CityView CNG Automobile Synergy. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <span className="text-white/40">Powered by MUVA Mobility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}