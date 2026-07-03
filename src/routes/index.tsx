import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/hero.jpg";
import workshopImg from "../assets/workshop.jpg";
import cngImg from "../assets/cng-detail.jpg";
import kekeImg from "../assets/keke-fleet.jpg";
import { SectionHeading, Eyebrow } from "../components/site/section";
import { Counter } from "../components/site/counter";
import {
  ArrowRight,
  Fuel,
  Wrench,
  Gauge,
  Users2,
  Leaf,
  ShieldCheck,
  Cpu,
  Truck,
  Building2,
  Sparkles,
  LineChart,
  MapPin,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CityView CNG — Driving Africa's Clean Mobility Revolution" },
      {
        name: "description",
        content:
          "Cleaner, cheaper, smarter transportation. CNG conversion, keke hire purchase, and intelligent fleet operations across Africa.",
      },
      { property: "og:title", content: "CityView CNG — Africa's Clean Mobility Company" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  {
    icon: Fuel,
    title: "CNG Vehicle Conversion",
    desc: "OEM-grade petrol-to-CNG conversion for private, commercial, and fleet vehicles.",
    href: "/services/cng-conversion",
  },
  {
    icon: Truck,
    title: "Keke Hire Purchase",
    desc: "Own a CNG tricycle with flexible repayment. Driver empowerment at scale.",
    href: "/hire-purchase",
  },
  {
    icon: Gauge,
    title: "Fleet Operations",
    desc: "Vehicle tracking, driver management, maintenance and reporting — powered by MUVA.",
    href: "/fleet",
  },
  {
    icon: Wrench,
    title: "Automobile Workshop",
    desc: "Diagnostics, engine, transmission, suspension and electrical repairs.",
    href: "/workshop",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Maintenance",
    desc: "Routine servicing, inspection and vehicle health programs for peace of mind.",
    href: "/workshop",
  },
  {
    icon: LineChart,
    title: "Fleet Consulting",
    desc: "Digitization, operations design and business advisory for fleet owners.",
    href: "/fleet",
  },
];

const values = [
  { icon: Sparkles, label: "Innovation" },
  { icon: ShieldCheck, label: "Safety" },
  { icon: Users2, label: "Customer First" },
  { icon: Leaf, label: "Sustainability" },
  { icon: Cpu, label: "Technology Driven" },
  { icon: Building2, label: "Operational Excellence" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
        <img
          src={heroImg}
          alt="CNG fleet at a CityView refueling depot at dusk"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" aria-hidden />
        <div className="absolute inset-0 bg-hero-gradient opacity-70" aria-hidden />

        <div className="container-x relative flex min-h-[100svh] flex-col justify-end pt-40 pb-16 md:justify-center md:pb-24">
          <div className="max-w-4xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Katsina · Gombe · Expanding across Africa
            </span>
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
              Driving Africa's <span className="text-gradient-emerald">clean mobility</span> revolution.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg text-white/75 md:text-xl">
              Cleaner. Cheaper. Smarter. CityView CNG delivers innovative
              clean-energy transportation through CNG conversion, sustainable
              fleet operations and world-class automotive engineering.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow transition hover:bg-white"
              >
                Explore our services
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                Become a fleet partner
              </Link>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white backdrop-blur md:grid-cols-5">
            {[
              { v: 8, s: "+", l: "Years engineering" },
              { v: 1200, s: "+", l: "Vehicles serviced" },
              { v: 650, s: "+", l: "CNG conversions" },
              { v: 2, s: "", l: "Active cities" },
              { v: 3400, s: "+", l: "Customers empowered" },
            ].map((s) => (
              <div key={s.l} className="bg-ink/40 p-6 md:p-8">
                <div className="font-display text-3xl font-semibold text-white md:text-4xl">
                  <Counter end={s.v} suffix={s.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY / INTRO */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
              A serious clean-mobility company, built for the next decade of African transport.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              From our headquarters in Katsina, we design and operate the
              systems that make transportation cleaner and more affordable —
              CNG conversion, hire-purchase ownership, intelligent fleets and
              professional workshops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/impact" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-mist">
                See our impact
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elevated">
              <img src={cngImg} alt="CNG cylinder installation detail" width={1200} height={1200} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-elevated md:block">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">CO₂ reduced</div>
              <div className="mt-1 font-display text-3xl font-semibold text-foreground">
                <Counter end={4200} suffix=" t" />
              </div>
              <div className="text-xs text-muted-foreground">across our converted fleet</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-mist-gradient py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title={<>Six services. One integrated <span className="text-gradient-emerald">clean-mobility</span> platform.</>}
              description="Every service is engineered to work together — from converting your first vehicle to running a fleet of thousands."
            />
            <Link to="/services" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/70">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.href}
                className="group hover-lift relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep transition group-hover:bg-emerald-gradient group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-deep">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT BANNER */}
      <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" aria-hidden />
        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow><span className="text-white">Our impact</span></Eyebrow>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Every conversion moves Africa closer to a cleaner, cheaper, smarter future.
              </h2>
              <p className="mt-6 max-w-xl text-white/70">
                We measure success by the fuel saved, the drivers empowered, and
                the tons of CO₂ removed from our cities.
              </p>
              <Link to="/impact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-forest-deep hover:bg-white">
                Read the full report <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              {[
                { l: "Vehicles converted", v: 650, s: "+" },
                { l: "Drivers empowered", v: 480, s: "+" },
                { l: "Litres fuel saved", v: 1200000, s: "+" },
                { l: "Tons CO₂ reduced", v: 4200, s: "+" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <div className="font-display text-4xl font-semibold">
                    <Counter end={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CNG */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={kekeImg} alt="CityView CNG keke fleet lined up" width={1600} height={1000} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <Eyebrow>Why CNG</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Up to <span className="text-gradient-emerald">60% cheaper</span> per kilometer than petrol.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              CNG burns cleaner, costs less and extends engine life. For fleet
              operators and everyday drivers, it's the most credible path to
              affordable, sustainable transport.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { k: "60%", v: "Fuel cost savings" },
                { k: "25%", v: "Less CO₂ emissions" },
                { k: "3×", v: "Longer engine life" },
                { k: "0", v: "Loss of performance" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-mist p-5">
                  <div className="font-display text-3xl font-semibold text-forest-deep">{s.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
            <Link to="/why-cng" className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">
              Compare petrol vs CNG <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WORKSHOP */}
      <section className="relative overflow-hidden bg-mist py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Automobile Workshop</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Engineering-grade care for every vehicle we touch.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Certified technicians, modern diagnostic equipment and a
              documented process for every job. Whether it's routine servicing
              or a full engine overhaul.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Engine repairs",
                "Vehicle diagnosis",
                "Suspension & steering",
                "Electrical repairs",
                "Transmission",
                "General maintenance",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-foreground shadow-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> {i}
                </li>
              ))}
            </ul>
            <Link to="/workshop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">
              Book an inspection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={workshopImg} alt="CityView CNG automobile workshop" width={1600} height={1024} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our values"
            title="Built on the values investors, governments and customers can trust."
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.label} className="hover-lift group flex items-center gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-lg font-semibold text-foreground">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="bg-mist-gradient py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where we operate"
            title="Growing from Northern Nigeria across the continent."
            description="Head office in Katsina, active operations in Gombe, and a roadmap that reaches every clean-mobility corridor in West Africa."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { c: "Katsina", tag: "Head office", live: true },
              { c: "Gombe", tag: "Active branch", live: true },
              { c: "Kano · Kaduna · Bauchi", tag: "Coming next", live: false },
            ].map((b) => (
              <div key={b.c} className="hover-lift rounded-3xl border border-border bg-white p-8">
                <MapPin className={`h-6 w-6 ${b.live ? "text-emerald" : "text-muted-foreground"}`} />
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{b.tag}</div>
                <div className="mt-1 font-display text-2xl font-semibold text-foreground">{b.c}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/branches" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/70">
              View all branches <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-4xl bg-emerald-gradient px-8 py-16 text-white shadow-elevated md:px-16 md:py-20">
            <div className="absolute inset-0 opacity-30" aria-hidden>
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
            </div>
            <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="font-display text-4xl font-semibold md:text-5xl">
                  Ready to run cleaner, cheaper, smarter?
                </h2>
                <p className="mt-4 max-w-xl text-white/85">
                  Convert your vehicle, own a CNG keke, or partner with us on a
                  full fleet. Our team responds within one business day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist">
                  Request a quotation
                </Link>
                <Link to="/hire-purchase" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20">
                  Apply for hire purchase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
