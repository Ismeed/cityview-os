import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { ArrowRight, Wrench, Gauge, Zap, Cog } from "lucide-react";
import workshopImg from "../assets/workshop.jpg";

export const Route = createFileRoute("/workshop")({
  head: () => ({
    meta: [
      { title: "Automobile Workshop — CityView CNG" },
      { name: "description", content: "Certified technicians, modern diagnostics and a documented process for every job." },
      { property: "og:url", content: "/workshop" },
    ],
    links: [{ rel: "canonical", href: "/workshop" }],
  }),
  component: Workshop,
});

function Workshop() {
  return (
    <>
      <PageHero eyebrow="Workshop"
        title={<>Engineering-grade care <span className="text-gradient-emerald">for every vehicle.</span></>}
        description="From diagnostics to full engine work, our workshop is built for accuracy, transparency and speed.">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white">Book an inspection <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="bg-white py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={workshopImg} alt="CityView CNG workshop interior" width={1600} height={1024} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">A complete service line, one workshop.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { i: Wrench, t: "Engine repairs" },
                { i: Gauge, t: "Vehicle diagnosis" },
                { i: Cog, t: "Suspension & steering" },
                { i: Zap, t: "Electrical repairs" },
                { i: Cog, t: "Transmission" },
                { i: Wrench, t: "General maintenance" },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4">
                  <s.i className="h-5 w-5 text-emerald" /><span className="text-sm font-semibold text-foreground">{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Repair process" title="Transparent, documented, engineered." />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Intake & inspection" },
              { n: "02", t: "Diagnosis report" },
              { n: "03", t: "Approved work order" },
              { n: "04", t: "Handover & warranty" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-white p-6">
                <div className="font-display text-2xl font-semibold text-emerald">{s.n}</div>
                <div className="mt-3 font-display text-lg font-semibold text-foreground">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
