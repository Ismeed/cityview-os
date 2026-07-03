import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { ArrowRight, Fuel, Truck, Gauge, Wrench, ShieldCheck, LineChart } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CityView CNG" },
      { name: "description", content: "CNG conversion, keke hire purchase, fleet operations, workshop, preventive maintenance and fleet consulting." },
      { property: "og:title", content: "CityView CNG Services" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const items = [
  { icon: Fuel, t: "CNG Vehicle Conversion", d: "OEM-grade petrol-to-CNG conversion for private, commercial and fleet vehicles.", href: "/services/cng-conversion",
    bullets: ["Petrol to CNG", "Commercial vehicles", "Private vehicles", "Fleet conversion"] },
  { icon: Truck, t: "Keke Hire Purchase", d: "Own a CNG tricycle with flexible repayment. Empowering drivers across Nigeria.", href: "/hire-purchase",
    bullets: ["Own a CNG Keke", "Flexible repayment", "Affordable ownership", "Driver empowerment"] },
  { icon: Gauge, t: "Fleet Operations", d: "Tracking, driver management, maintenance and reporting — powered by MUVA Mobility.", href: "/fleet",
    bullets: ["Fleet management", "Driver management", "Technology & telematics", "Reporting"] },
  { icon: Wrench, t: "Automobile Workshop", d: "Professional mechanics, modern diagnostics, transparent process.", href: "/workshop",
    bullets: ["Engine repairs", "Vehicle diagnosis", "Suspension", "Electrical & transmission"] },
  { icon: ShieldCheck, t: "Preventive Maintenance", d: "Routine servicing to keep your vehicle healthy and reliable.", href: "/workshop",
    bullets: ["Routine servicing", "Oil changes", "Inspections", "Vehicle health reports"] },
  { icon: LineChart, t: "Fleet Consulting", d: "We help fleet owners digitize operations and build sustainable businesses.", href: "/fleet",
    bullets: ["Fleet digitization", "Operations design", "Business advisory", "Growth strategy"] },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={<>An <span className="text-gradient-emerald">integrated platform</span> for clean mobility.</>}
        description="Six connected services that make clean transportation practical, affordable and profitable across Nigeria and beyond."
      />
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {items.map((s) => (
            <div key={s.t} className="hover-lift group flex flex-col rounded-3xl border border-border bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep group-hover:bg-emerald-gradient group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald" /> {b}</li>
                ))}
              </ul>
              <Link to={s.href} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-deep">
                Explore service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
