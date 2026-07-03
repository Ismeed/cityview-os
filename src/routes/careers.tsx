import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { ArrowRight, Briefcase } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — CityView CNG" },
      { name: "description", content: "Build the future of clean mobility in Africa. Explore open roles at CityView CNG." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

const roles = [
  { t: "Senior CNG Conversion Engineer", loc: "Katsina", type: "Full-time" },
  { t: "Fleet Operations Manager", loc: "Gombe", type: "Full-time" },
  { t: "Automotive Technician (Level II)", loc: "Katsina", type: "Full-time" },
  { t: "Driver Success Officer", loc: "Katsina · Gombe", type: "Full-time" },
  { t: "Product Manager — MUVA integration", loc: "Remote (Nigeria)", type: "Full-time" },
  { t: "Finance Analyst", loc: "Katsina", type: "Full-time" },
];

function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Build Africa's <span className="text-gradient-emerald">clean transport</span> future.</>}
        description="We're a small team doing serious work. If you want ownership, engineering standards and real-world impact — talk to us." />
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Culture" title="What it's like to work at CityView." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { t: "Engineering-led", d: "We ship measurable improvements, not opinions." },
              { t: "Owner-operators", d: "Everyone is trusted to make consequential decisions." },
              { t: "Investors in people", d: "Training, mentorship and a real path to ownership." },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-border bg-mist p-8"><h3 className="font-display text-xl font-semibold text-foreground">{c.t}</h3><p className="mt-2 text-sm text-muted-foreground">{c.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Open roles" title="We're hiring." />
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white">
            {roles.map((r) => (
              <div key={r.t} className="flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep"><Briefcase className="h-5 w-5" /></div>
                  <div>
                    <div className="font-display text-lg font-semibold text-foreground">{r.t}</div>
                    <div className="text-sm text-muted-foreground">{r.loc} · {r.type}</div>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">Apply <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
