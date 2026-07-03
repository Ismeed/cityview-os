import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { Counter } from "../components/site/counter";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — CityView CNG" },
      { name: "description", content: "Vehicles converted, drivers empowered, fuel saved, CO₂ reduced. Measurable clean-mobility impact across Nigeria." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: Impact,
});

function Impact() {
  const stats = [
    { v: 650, s: "+", l: "Vehicles converted", d: "Certified petrol-to-CNG conversions across private and commercial." },
    { v: 480, s: "+", l: "Drivers empowered", d: "Keke drivers on hire-purchase paths to ownership." },
    { v: 1200000, s: "+", l: "Litres fuel saved", d: "Cumulative petrol displaced by our converted fleet." },
    { v: 4200, s: "+", l: "Tons CO₂ reduced", d: "Verified emissions avoided by moving vehicles to CNG." },
    { v: 2, s: "", l: "Cities served", d: "Katsina (head office) and Gombe (active branch)." },
    { v: 8, s: "+", l: "Years of engineering", d: "Building trust vehicle by vehicle since 2018." },
  ];
  return (
    <>
      <PageHero eyebrow="Our impact"
        title={<>Impact you can <span className="text-gradient-emerald">measure</span>. Growth you can see.</>}
        description="We don't guess. Every metric on this page is measured across our real operations." />
      <section className="bg-white py-24">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l} className="rounded-3xl border border-border bg-white p-8 shadow-soft hover-lift">
              <div className="font-display text-5xl font-semibold text-forest-deep"><Counter end={s.v} suffix={s.s} /></div>
              <div className="mt-3 text-xs uppercase tracking-[0.16em] text-emerald">{s.l}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-20">
        <div className="container-x">
          <div className="rounded-3xl bg-emerald-gradient p-10 text-white md:p-14">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">"Investors, government, corporates — let's compound this impact together." />
            </h2><p className="mt-4 max-w-2xl text-white/85">Investors, government, corporates — let's compound this impact together.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist">Contact partnerships <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
