import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branches — CityView CNG" },
      { name: "description", content: "Head office in Katsina, active operations in Gombe, expanding across Northern Nigeria and West Africa." },
      { property: "og:url", content: "/branches" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: Branches,
});

const branches = [
  { c: "Katsina", tag: "Head office", live: true, addr: "IBB Way, Katsina", phone: "+234 800 000 0001" },
  { c: "Gombe", tag: "Active branch", live: true, addr: "Bauchi Road, Gombe", phone: "+234 800 000 0002" },
  { c: "Kano", tag: "Opening 2026", live: false },
  { c: "Kaduna", tag: "Opening 2026", live: false },
  { c: "Bauchi", tag: "Planned", live: false },
  { c: "Abuja", tag: "Planned", live: false },
];

function Branches() {
  return (
    <>
      <PageHero eyebrow="Branches"
        title={<>Northern Nigeria today. <span className="text-gradient-emerald">Africa tomorrow.</span></>}
        description="We build slowly and permanently. Every new city gets the same engineering, the same service, the same guarantees." />

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Network" title="Where to find us." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((b) => (
              <div key={b.c} className={`hover-lift rounded-3xl border border-border p-8 ${b.live ? "bg-white" : "bg-mist"}`}>
                <div className="flex items-center gap-2">
                  <MapPin className={`h-5 w-5 ${b.live ? "text-emerald" : "text-muted-foreground"}`} />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{b.tag}</span>
                </div>
                <div className="mt-4 font-display text-3xl font-semibold text-foreground">{b.c}</div>
                {b.addr && <div className="mt-2 text-sm text-muted-foreground">{b.addr}</div>}
                {b.phone && <div className="mt-2 flex items-center gap-2 text-sm text-forest-deep"><Phone className="h-4 w-4" /> {b.phone}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <iframe
              title="CityView CNG Katsina head office"
              src="https://www.google.com/maps?q=Katsina,Nigeria&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">Visit a branch <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
