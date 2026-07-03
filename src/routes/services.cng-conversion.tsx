import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { CheckCircle2, ArrowRight } from "lucide-react";
import cngImg from "../assets/cng-detail.jpg";

export const Route = createFileRoute("/services/cng-conversion")({
  head: () => ({
    meta: [
      { title: "CNG Vehicle Conversion — CityView CNG" },
      { name: "description", content: "Certified petrol-to-CNG conversion for private, commercial and fleet vehicles. Cleaner. Cheaper. Smarter." },
      { property: "og:url", content: "/services/cng-conversion" },
    ],
    links: [{ rel: "canonical", href: "/services/cng-conversion" }],
  }),
  component: Page,
});

function Page() {
  const steps = [
    { n: "01", t: "Vehicle assessment", d: "We inspect and certify your vehicle for safe CNG conversion." },
    { n: "02", t: "Cylinder & kit fitting", d: "Certified cylinders and OEM-grade kits installed by trained technicians." },
    { n: "03", t: "Tuning & safety test", d: "ECU calibration, leak testing and road certification before handover." },
    { n: "04", t: "Aftercare", d: "Warranty coverage, priority servicing and refueling network access." },
  ];
  return (
    <>
      <PageHero eyebrow="CNG Conversion" title={<>Petrol in. <span className="text-gradient-emerald">CNG out.</span> Same car — cheaper, cleaner.</>}
        description="Certified conversion for private, commercial and fleet vehicles. Backed by warranty, safety-tested, and priced for real Nigerian operators.">
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white">Book conversion <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/why-cng" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20">Why CNG?</Link>
        </div>
      </PageHero>

      <section className="bg-white py-24">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={cngImg} alt="CNG kit installation" width={1200} height={1200} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <Eyebrow>The process</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Four steps, one afternoon, years of savings.</h2>
            <div className="mt-8 space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5 rounded-2xl border border-border bg-white p-5">
                  <div className="font-display text-2xl font-semibold text-emerald">{s.n}</div>
                  <div>
                    <div className="font-display text-lg font-semibold text-foreground">{s.t}</div>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What's included" title="Everything you need — nothing you don't." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Certified CNG cylinder", "OEM-grade conversion kit", "Injectors & regulator", "ECU calibration", "Safety leak test", "Road certification", "12-month warranty", "Priority servicing", "Refueling network access"].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-emerald" /><span className="text-sm font-medium text-foreground">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
