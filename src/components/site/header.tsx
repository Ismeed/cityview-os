import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { to: "/services", label: "All Services" },
      { to: "/services/cng-conversion", label: "CNG Conversion" },
      { to: "/hire-purchase", label: "Keke Hire Purchase" },
      { to: "/fleet", label: "Fleet Operations" },
      { to: "/workshop", label: "Automobile Workshop" },
    ],
  },
  { to: "/why-cng", label: "Why CNG" },
  { to: "/impact", label: "Impact" },
  { to: "/branches", label: "Branches" },
  { to: "/blog", label: "Insights" },
  { to: "/careers", label: "Careers" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-light shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo variant={scrolled ? "dark" : "dark"} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3">
                    <div className="glass-light overflow-hidden rounded-2xl p-2 shadow-elevated">
                      {item.children!.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="block rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition hover:bg-emerald-soft hover:text-forest-deep"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
                activeProps={{ className: "rounded-full px-3.5 py-2 text-sm font-semibold text-forest-deep" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-full border border-forest/15 bg-white/60 px-4 py-2 text-sm font-medium text-forest-deep transition hover:bg-white"
          >
            Staff Portal
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-forest-deep"
          >
            Request a Quote
            <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest-deep lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="glass-light border-t border-border/60 lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.flatMap((item) =>
              "children" in item
                ? item.children!.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-emerald-soft"
                    >
                      {c.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-emerald-soft"
                    >
                      {item.label}
                    </Link>,
                  ]
            )}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-forest/15 bg-white px-4 py-3 text-sm font-semibold text-forest-deep"
            >
              Staff Portal Login
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}