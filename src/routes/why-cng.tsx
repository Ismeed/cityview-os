import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Leaf, Calculator, ShieldCheck, Flame, Scale } from "lucide-react";

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
  { q: "Is CNG safe for my vehicle?", a: "Yes. CNG cylinders are manufactured from high-strength steel or carbon fiber composite, built to withstand extremely high impacts and crash conditions. They are certified to international standards and are significantly safer than traditional petrol tanks because CNG has a high ignition temperature and dissipates quickly if a leak occurs. Every conversion is safety-tested before handover." },
  { q: "Will my engine performance change after conversion?", a: "No noticeable loss of performance for daily driving. Our premium sequential gas injection systems calibrate the air-fuel mixture dynamically. Some drivers report smoother engine running, less vibration, and double the longevity of engine oil due to the clean-burning properties of natural gas." },
  { q: "Where can I refuel my CNG vehicle?", a: "Our conversions include access to CityView's expanding refueling network in Katsina and Gombe, plus partner mother-daughter stations across Northern Nigeria. The network is growing rapidly to support inter-city mobility." },
  { q: "How long does a vehicle conversion take?", a: "A standard petrol-to-CNG conversion for a private sedan or commercial minibus takes between 24 to 48 hours at our Katsina or Gombe workshops. This includes cylinder mounting, gas injector installation, ECU programming, and rigorous safety pressure testing." },
  { q: "How much does a conversion cost and what is the payback?", a: "Conversion costs range from ₦350,000 for tricycles (Kekes) up to ₦750,000–₦950,000 for sedans and commercial passenger buses. With fuel cost savings averaging 60%, most high-use commercial drivers and fleet operators recover their conversion investment within 3 to 5 months." },
  { q: "Does CNG conversion void my vehicle warranty?", a: "We install OEM-grade components and provide our own comprehensive 12-month warranty on the entire CNG system and conversion labor. For manufacturer warranties, we advise checking on a per-vehicle basis." }
];

const vehiclePresets = {
  keke: { label: "Tricycle (Keke)", consumption: 5.5, cost: 350000 },
  sedan: { label: "Sedan / SUV", consumption: 9.5, cost: 750000 },
  minibus: { label: "Commercial Minibus", consumption: 14.0, cost: 950000 },
  truck: { label: "Heavy Duty Truck", consumption: 24.0, cost: 2800000 },
};

function WhyCNG() {
  const [vehicle, setVehicle] = useState<keyof typeof vehiclePresets>("sedan");
  const [dailyKm, setDailyKm] = useState(150);
  const [petrolPrice, setPetrolPrice] = useState(950);
  const [cngPrice, setCngPrice] = useState(230);
  const [customConsumption, setCustomConsumption] = useState(9.5);

  useEffect(() => {
    setCustomConsumption(vehiclePresets[vehicle].consumption);
  }, [vehicle]);

  // Calculations
  // 1 SCM (Standard Cubic Meter) of CNG is equivalent to ~1.1 Liters of Petrol
  const monthlyKm = dailyKm * 30;
  const yearlyKm = dailyKm * 365;

  const petrolLitersPerMonth = (monthlyKm / 100) * customConsumption;
  const petrolLitersPerYear = (yearlyKm / 100) * customConsumption;
  
  const monthlyPetrolCost = petrolLitersPerMonth * petrolPrice;
  const yearlyPetrolCost = petrolLitersPerYear * petrolPrice;

  // CNG consumption is equivalent to Liters * 1.1 SCM
  const cngScmPerMonth = petrolLitersPerMonth * 1.1;
  const cngScmPerYear = petrolLitersPerYear * 1.1;

  const monthlyCngCost = cngScmPerMonth * cngPrice;
  const yearlyCngCost = cngScmPerYear * cngPrice;

  const monthlySavings = monthlyPetrolCost - monthlyCngCost;
  const yearlySavings = yearlyPetrolCost - yearlyCngCost;

  // CO2 savings (2.3kg/L petrol vs 1.9kg/SCM CNG)
  const petrolCo2PerYear = (petrolLitersPerYear * 2.3) / 1000; // in metric tons
  const cngCo2PerYear = (cngScmPerYear * 1.9) / 1000; // in metric tons
  const co2SavedPerYear = Math.max(0, petrolCo2PerYear - cngCo2PerYear);

  const conversionCost = vehiclePresets[vehicle].cost;
  const paybackMonths = monthlySavings > 0 ? conversionCost / monthlySavings : 0;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero eyebrow="Why CNG"
        title={<>The math is simple. <span className="text-gradient-emerald">CNG wins.</span></>}
        description="Cheaper per kilometer. Cleaner emissions. Longer engine life. Calculate your operational savings below." />

      {/* COMPARISON */}
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Petrol vs CNG" title="Side by side comparison" description="How the fuel sources stack up in cost, environment, and vehicle reliability." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              {
                t: "Premium Petrol",
                color: "bg-mist border-border/80",
                badge: "Traditional Fuel",
                badgeColor: "bg-muted text-muted-foreground",
                points: [
                  { label: "Fuel Price", val: `₦${petrolPrice}/L`, desc: "Subject to constant subsidy removals & price hikes" },
                  { label: "Cost Per Kilometer", val: `~₦${Math.round((customConsumption / 100) * petrolPrice)}/km`, desc: "High fuel expense reduces driver margins" },
                  { label: "CO₂ Emissions", val: "High carbon footprint", desc: "Produces ~2.3 kg of CO₂ for every liter burned" },
                  { label: "Engine Wear", val: "Standard Carbon Build-up", desc: "Dirty combustion creates soot, requiring frequent oil changes" }
                ]
              },
              {
                t: "Compressed Natural Gas (CNG)",
                color: "bg-emerald-soft/50 border-emerald/20 shadow-glow-soft",
                badge: "Recommended",
                badgeColor: "bg-emerald text-forest-deep",
                points: [
                  { label: "Fuel Price", val: `₦${cngPrice}/SCM`, desc: "Locally sourced gas, stable and heavily subsidized" },
                  { label: "Cost Per Kilometer", val: `~₦${Math.round(((customConsumption / 100) * 1.1) * cngPrice)}/km`, desc: "Save up to 60% per kilometer immediately" },
                  { label: "CO₂ Emissions", val: "25% Less CO₂", desc: "Cleaner carbon profile, zero sulfur emissions" },
                  { label: "Engine Wear", val: "3× Longer Engine Life", desc: "No residue, zero carbon build-up, extends spark plug & oil life" }
                ]
              },
            ].map((c) => (
              <div key={c.t} className={`rounded-4xl border p-8 flex flex-col justify-between ${c.color}`}>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold text-foreground">{c.t}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${c.badgeColor}`}>{c.badge}</span>
                  </div>
                  <dl className="mt-8 space-y-6">
                    {c.points.map((p, idx) => (
                      <div key={idx} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                        <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.label}</dt>
                        <dd className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <span className="font-display text-xl font-semibold text-forest-deep">{p.val}</span>
                          <span className="text-xs text-muted-foreground">{p.desc}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-mist-gradient py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>Interactive savings calculator</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Calculate your clean mobility ROI.</h2>
              <p className="mt-6 text-muted-foreground">
                Enter your average daily operations mileage and fuel prices to estimate how quickly a CityView CNG conversion will pay for itself and start contributing to your bottom line.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-border flex items-start gap-4">
                  <div className="rounded-xl bg-emerald/10 p-2 text-emerald"><Leaf className="h-6 w-6" /></div>
                  <div>
                    <div className="text-2xl font-display font-semibold text-forest-deep">{co2SavedPerYear.toFixed(1)} t</div>
                    <div className="text-xs text-muted-foreground mt-0.5">CO₂ Saved / Year</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-border flex items-start gap-4">
                  <div className="rounded-xl bg-emerald/10 p-2 text-emerald"><ShieldCheck className="h-6 w-6" /></div>
                  <div>
                    <div className="text-2xl font-display font-semibold text-forest-deep">
                      {paybackMonths > 12 ? "1 Year+" : `${Math.ceil(paybackMonths)} ${paybackMonths <= 1 ? "Month" : "Months"}`}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Conversion Payback</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-border bg-white p-8 shadow-elevated">
              <div className="flex items-center gap-2 pb-6 border-b border-border">
                <Calculator className="h-5 w-5 text-emerald" />
                <h3 className="font-display text-lg font-semibold text-foreground">Savings & Payback Estimator</h3>
              </div>

              <div className="mt-8 space-y-6">
                {/* Vehicle Selection */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">Vehicle Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(vehiclePresets).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setVehicle(key as keyof typeof vehiclePresets)}
                        className={`rounded-2xl border py-3 px-2 text-xs font-semibold text-center transition ${
                          vehicle === key
                            ? "border-forest bg-forest/5 text-forest-deep font-bold"
                            : "border-border bg-white text-muted-foreground hover:bg-mist"
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Distance */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    <span>Daily Distance Driven</span>
                    <span className="text-forest-deep font-bold">{dailyKm} km / day</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={dailyKm}
                    onChange={(e) => setDailyKm(Number(e.target.value))}
                    className="w-full accent-emerald"
                    aria-label="Daily distance"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>20 km</span>
                    <span>150 km</span>
                    <span>300 km</span>
                    <span>500 km</span>
                  </div>
                </div>

                {/* Price Customization Accordion/Toggles */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Petrol Price (₦/Liter)</label>
                    <input
                      type="number"
                      value={petrolPrice}
                      onChange={(e) => setPetrolPrice(Math.max(0, Number(e.target.value)))}
                      className="w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold text-forest-deep focus:outline-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">CNG Price (₦/SCM)</label>
                    <input
                      type="number"
                      value={cngPrice}
                      onChange={(e) => setCngPrice(Math.max(0, Number(e.target.value)))}
                      className="w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold text-forest-deep focus:outline-emerald"
                    />
                  </div>
                </div>

                {/* Consumption */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    <span>Fuel Consumption (L/100km)</span>
                    <span className="text-forest-deep font-bold">{customConsumption} Liters</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={0.5}
                    value={customConsumption}
                    onChange={(e) => setCustomConsumption(Number(e.target.value))}
                    className="w-full accent-emerald"
                    aria-label="Fuel consumption"
                  />
                </div>

                {/* Savings Summary Cards */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-border pt-6">
                  <div className="rounded-2xl bg-mist p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">Petrol / Month</span>
                    <div className="mt-1 font-display text-xl font-semibold text-foreground">₦{Math.round(monthlyPetrolCost).toLocaleString()}</div>
                  </div>
                  <div className="rounded-2xl bg-mist p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">CNG / Month</span>
                    <div className="mt-1 font-display text-xl font-semibold text-foreground">₦{Math.round(monthlyCngCost).toLocaleString()}</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-gradient p-4 text-white shadow-glow-soft">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 block">Savings / Month</span>
                    <div className="mt-1 font-display text-xl font-bold">₦{Math.round(monthlySavings).toLocaleString()}</div>
                  </div>
                </div>

                {/* Yearly Stats & CTA */}
                <div className="rounded-2xl border border-dashed border-border p-4 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground">Estimated Annual Savings:</span>
                    <div className="font-display font-semibold text-emerald text-lg">₦{Math.round(yearlySavings).toLocaleString()}</div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition">
                    Book Conversion <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="container-x mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions." align="center" />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-border bg-white transition hover:shadow-soft">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <span className="font-display text-lg font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-emerald transition duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="border-t border-border/50 bg-mist/30 p-6 text-sm leading-relaxed text-muted-foreground animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
