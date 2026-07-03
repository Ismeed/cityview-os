import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { CheckCircle2, ArrowRight, IdCard, FileCheck, Handshake, Wallet } from "lucide-react";
import kekeImg from "../assets/keke-fleet.jpg";

export const Route = createFileRoute("/hire-purchase")({
  head: () => ({
    meta: [
      { title: "Keke Hire Purchase — Own a CNG Tricycle | CityView CNG" },
      { name: "description", content: "Flexible hire-purchase plans to own a CNG-powered keke. Empowering drivers across Northern Nigeria." },
      { property: "og:url", content: "/hire-purchase" },
    ],
    links: [{ rel: "canonical", href: "/hire-purchase" }],
  }),
  component: HP,
});

function HP() {
  return (
    <>
      <PageHero eyebrow="Hire Purchase" title={<>Own a <span className="text-gradient-emerald">CNG keke.</span> Change your income.</>}
        description="A structured, transparent path to ownership for professional drivers. Flexible weekly repayments. Full servicing included.">
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white">Apply now <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageHero>

      <section className="bg-white py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={kekeImg} alt="CityView CNG keke fleet" width={1600} height={1000} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Four steps to ownership.</h2>
            <div className="mt-8 grid gap-4">
              {[
                { i: IdCard, t: "Apply", d: "Submit your details and preferred branch." },
                { i: FileCheck, t: "Verify", d: "We complete a light background check and driver interview." },
                { i: Handshake, t: "Sign & collect", d: "Sign your plan, pick up your CNG keke and start earning." },
                { i: Wallet, t: "Pay & own", d: "Weekly deposits automatically move you toward full ownership." },
              ].map((s) => (
                <div key={s.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep"><s.i className="h-5 w-5" /></div>
                  <div><div className="font-display text-lg font-semibold text-foreground">{s.t}</div><p className="text-sm text-muted-foreground">{s.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Requirements" title="Simple and fair." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Valid Nigerian ID", "Driver's license (Class C)", "Local guarantor", "Proof of address", "Passport photograph", "Interview with our team"].map((r) => (
              <div key={r} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5">
                <CheckCircle2 className="h-5 w-5 text-emerald" /><span className="text-sm font-medium text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Driver stories" title="Real drivers. Real ownership." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Musa I.", c: "Katsina", q: "In eight months I've saved more than in two years of renting. The keke is mine soon." },
              { n: "Aliyu B.", c: "Gombe", q: "CityView's servicing means I never lose a day. My income is steady." },
              { n: "Habiba S.", c: "Katsina", q: "I bring home more each week — for my family and my future." },
            ].map((t) => (
              <figure key={t.n} className="rounded-3xl border border-border bg-mist p-8">
                <blockquote className="text-lg leading-relaxed text-foreground">"{t.q}"</blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground"><span className="font-semibold text-forest-deep">{t.n}</span> · {t.c}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
