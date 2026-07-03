import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { Counter } from "../components/site/counter";
import { ArrowRight, Target, Compass, Award } from "lucide-react";
import cngImg from "../assets/cng-detail.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CityView CNG Automobile Synergy" },
      { name: "description", content: "Our story, vision, mission, values and leadership. A clean-mobility company built for Africa's next decade." },
      { property: "og:title", content: "About CityView CNG" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { y: "2018", t: "Founded in Katsina", d: "CityView begins as a specialist automobile workshop serving Northern Nigeria." },
  { y: "2020", t: "First CNG conversions", d: "We pioneer petrol-to-CNG conversion for commercial fleets in the region." },
  { y: "2022", t: "Keke Hire Purchase launched", d: "Empowering hundreds of drivers to own CNG-powered tricycles." },
  { y: "2024", t: "MUVA fleet platform", d: "We integrate MUVA Mobility to run intelligent, digitized fleet operations." },
  { y: "2026", t: "West Africa expansion", d: "Gombe goes live. Kano, Kaduna and Bauchi are next." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Building the infrastructure for <span className="text-gradient-emerald">clean mobility</span> in Africa.</>}
        description="From a single workshop in Katsina to a growing clean-energy transport company operating across Northern Nigeria — with a roadmap to reach the entire continent."
      />

      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              A serious company, engineered patiently.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              CityView CNG Automobile Synergy was founded to solve one of Africa's
              hardest problems: making transportation cleaner and more affordable
              without slowing anyone down. We started with a workshop, added CNG
              conversion, then built the operations layer to run entire fleets.
              Today, we're one of the fastest-growing clean-mobility companies in
              Northern Nigeria.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { v: 8, s: "+", l: "Years" },
                { v: 2, s: "", l: "Cities" },
                { v: 60, s: "+", l: "Team members" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-mist p-5">
                  <div className="font-display text-3xl font-semibold text-forest-deep">
                    <Counter end={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={cngImg} alt="CNG engineering detail" width={1200} height={1200} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-mist-gradient py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Vision · Mission · Values" title="What guides everything we build." align="center" />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              { icon: Compass, t: "Vision", d: "To become Africa's leading clean mobility company by making transportation cleaner, cheaper, smarter, and more sustainable." },
              { icon: Target, t: "Mission", d: "Deliver innovative clean-energy transportation solutions through CNG conversion, sustainable fleet operations, smart mobility technology and customer-focused services." },
              { icon: Award, t: "Values", d: "Innovation. Integrity. Safety. Affordability. Reliability. Customer First. Sustainability. Operational Excellence. Technology Driven." },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-border bg-white p-8 shadow-soft">
                <c.icon className="h-7 w-7 text-emerald" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our journey" title="A steady, deliberate growth story." />
          <div className="mt-16 grid gap-8 md:grid-cols-5">
            {timeline.map((t, i) => (
              <div key={t.y} className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-display text-3xl font-semibold text-emerald">{t.y}</span>
                  {i < timeline.length - 1 && <span className="hidden h-px flex-1 bg-border md:block" />}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="rounded-3xl bg-emerald-gradient p-10 text-white shadow-elevated md:p-14">
            <h3 className="font-display text-3xl font-semibold md:text-4xl">Partner with the people building Africa's clean transport.</h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist">
                Talk to our team <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/careers" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20">
                Join us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
