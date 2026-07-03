import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { ArrowRight, Activity, MapPin, Users, Wrench, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Fleet Operations & Management — CityView CNG" },
      { name: "description", content: "Vehicle tracking, driver management, maintenance and reporting. Powered by MUVA Mobility." },
      { property: "og:url", content: "/fleet" },
    ],
    links: [{ rel: "canonical", href: "/fleet" }],
  }),
  component: Fleet,
});

function Fleet() {
  return (
    <>
      <PageHero eyebrow="Fleet Operations"
        title={<>An <span className="text-gradient-emerald">operating system</span> for your fleet.</>}
        description="From telematics to maintenance, we run the software and the wrenches so your fleet performs — powered by MUVA Mobility.">
      </PageHero>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="Everything a modern fleet needs, in one platform." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: MapPin, t: "Real-time vehicle tracking", d: "Live location, geofencing and route history for every vehicle." },
              { i: Users, t: "Driver management", d: "Profiles, performance scoring, incidents and payroll integration." },
              { i: Wrench, t: "Maintenance scheduling", d: "Predictive alerts and one-tap workshop bookings." },
              { i: BarChart3, t: "Operations reporting", d: "Dashboards on utilization, fuel spend, uptime and revenue." },
              { i: Activity, t: "Telematics & sensors", d: "CNG level, engine health, harsh events and idle time." },
              { i: Users, t: "Business advisory", d: "We help you design SOPs, pricing and driver programs that scale." },
            ].map((f) => (
              <div key={f.t} className="hover-lift rounded-3xl border border-border bg-white p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep"><f.i className="h-5 w-5" /></div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-elevated">
            <div className="rounded-2xl bg-ink p-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald" /></div>
                <div className="ml-4 text-xs text-white/50">fleet.muva.mobility · Live</div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {[
                  { l: "Active vehicles", v: "142" },
                  { l: "Uptime", v: "98.4%" },
                  { l: "Trips today", v: "1,864" },
                  { l: "Fuel saved", v: "₦3.2M" },
                ].map((k) => (
                  <div key={k.l} className="rounded-xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] uppercase tracking-widest text-white/50">{k.l}</div><div className="mt-1 font-display text-xl font-semibold text-white">{k.v}</div></div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-end justify-between">
                  <div className="text-[10px] uppercase tracking-widest text-white/50">Weekly trips</div>
                  <div className="text-xs text-emerald">+12.4%</div>
                </div>
                <div className="mt-3 flex h-24 items-end gap-1.5">
                  {[35, 48, 42, 61, 55, 78, 84, 72, 90, 88, 96, 82].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-emerald" style={{ height: `${h}%`, opacity: 0.4 + (h/100)*0.6 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">Powered by <span className="font-semibold text-forest-deep">MUVA Mobility</span></p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="rounded-3xl bg-emerald-gradient p-10 text-white md:p-14">
            <h3 className="font-display text-3xl font-semibold md:text-4xl">Run your fleet like a public company.</h3>
            <p className="mt-3 max-w-2xl text-white/85">Book a discovery call with our operations team and get a tailored proposal in 5 business days.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist">Request consultation <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
