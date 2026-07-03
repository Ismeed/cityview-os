import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/why-cng")({
  head: () => ({
    meta: [
      { title: "Why CNG — Savings, Safety & Sustainability | CityView CNG" },
      { name: "description", content: "Compare petrol vs CNG. Estimate your savings, understand the environmental impact and get answers to common questions." },
      { property: "og:url", content: "/why-cng" },
    ],
    links: [{ rel: "canonical", href: "/why-cng" }],
  }),
  component: WhyCNG,
});

const faqs = [
  { q: "Is CNG safe for my vehicle?", a: "Yes. CNG cylinders are certified to international standards and safer than petrol tanks in accidents due to lower explosion risk. Every conversion is safety-tested before handover." },
  { q: "Will my engine performance change?", a: "No noticeable loss of performance for daily driving. Many drivers report smoother running and reduced engine wear." },
  { q: "Where can I refuel?", a: "Our conversions include access to CityView's growing refueling network, plus partner stations across Northern Nigeria." },
  { q: "How much can I save?", a: "Most drivers see 50–60% fuel cost savings per kilometer versus petrol, paying back the conversion cost in months, not years." },
  { q: "Does CNG conversion void my warranty?", a: "We install using OEM-grade components and provide our own 12-month conversion warranty. For manufacturer coverage, we advise per vehicle." },
];

function WhyCNG() {
  const [km, setKm] = useState(3000);
  const petrolCost = km * 0.15 * 900; // rough ₦/L * L per km
  const cngCost = petrolCost * 0.4;
  const savings = petrolCost - cngCost;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero eyebrow="Why CNG"
        title={<>The math is simple. <span className="text-gradient-emerald">CNG wins.</span></>}
        description="Cheaper per kilometer. Cleaner emissions. Longer engine life. See the numbers for yourself." />

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Petrol vs CNG" title="Side by side." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { t: "Petrol", color: "bg-mist", price: "₦900/L", cpk: "~₦135/km", co2: "2.31 kg CO₂/L", life: "Standard engine wear" },
              { t: "CNG", color: "bg-emerald-soft", price: "₦230/SCM", cpk: "~₦55/km", co2: "1.9 kg CO₂/SCM", life: "3× longer engine life" },
            ].map((c) => (
              <div key={c.t} className={`rounded-3xl border border-border ${c.color} p-8`}>
                <h3 className="font-display text-3xl font-semibold text-foreground">{c.t}</h3>
                <dl className="mt-6 grid gap-3 text-sm">
                  <div className="flex justify-between border-b border-border/60 py-2"><dt className="text-muted-foreground">Fuel price</dt><dd className="font-semibold">{c.price}</dd></div>
                  <div className="flex justify-between border-b border-border/60 py-2"><dt className="text-muted-foreground">Cost per km</dt><dd className="font-semibold">{c.cpk}</dd></div>
                  <div className="flex justify-between border-b border-border/60 py-2"><dt className="text-muted-foreground">Emissions</dt><dd className="font-semibold">{c.co2}</dd></div>
                  <div className="flex justify-between py-2"><dt className="text-muted-foreground">Engine impact</dt><dd className="font-semibold">{c.life}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist-gradient py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Savings calculator</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">See what you'd save every month.</h2>
            <p className="mt-4 text-muted-foreground">Adjust your monthly kilometers to estimate savings with a CityView CNG conversion.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <label className="text-sm font-semibold text-foreground">Monthly kilometers</label>
            <input type="range" min={500} max={10000} step={100} value={km} onChange={(e) => setKm(Number(e.target.value))}
              className="mt-3 w-full accent-emerald" aria-label="Monthly kilometers" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>500</span><span className="font-semibold text-forest-deep">{km.toLocaleString()} km</span><span>10,000</span></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-mist p-5"><div className="text-xs uppercase tracking-widest text-muted-foreground">Petrol</div><div className="mt-1 font-display text-2xl font-semibold text-foreground">₦{Math.round(petrolCost).toLocaleString()}</div></div>
              <div className="rounded-2xl bg-mist p-5"><div className="text-xs uppercase tracking-widest text-muted-foreground">CNG</div><div className="mt-1 font-display text-2xl font-semibold text-foreground">₦{Math.round(cngCost).toLocaleString()}</div></div>
              <div className="rounded-2xl bg-emerald-gradient p-5 text-white"><div className="text-xs uppercase tracking-widest text-white/80">You save</div><div className="mt-1 font-display text-2xl font-semibold">₦{Math.round(savings).toLocaleString()}</div></div>
            </div>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep">Get your quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions, answered." align="center" />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-white">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                  <span className="font-display text-lg font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-emerald transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="border-t border-border p-5 text-sm text-muted-foreground">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
