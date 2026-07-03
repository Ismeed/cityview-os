import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CityView CNG" },
      { name: "description", content: "Speak to our team about CNG conversion, hire purchase, fleet partnerships or careers." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  topic: z.string().max(60),
  message: z.string().trim().min(5, "Please add a bit more detail").max(1000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact"
        title={<>Let's <span className="text-gradient-emerald">move</span> together.</>}
        description="One form. Whichever team needs to reply, we route it internally and get back within one business day." />

      <section className="bg-white py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Direct channels</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">Prefer talking? So do we.</h2>
            <div className="mt-8 space-y-4">
              {[
                { i: Phone, t: "Call us", v: "+234 800 000 0000" },
                { i: MessageCircle, t: "WhatsApp", v: "+234 800 000 0000" },
                { i: Mail, t: "Email", v: "hello@cityviewcng.africa" },
                { i: MapPin, t: "Head office", v: "IBB Way, Katsina, Nigeria" },
                { i: Clock, t: "Office hours", v: "Mon–Sat · 8:00–18:00" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep"><c.i className="h-5 w-5" /></div>
                  <div><div className="text-xs uppercase tracking-widest text-muted-foreground">{c.t}</div><div className="mt-0.5 font-semibold text-foreground">{c.v}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-mist p-8 shadow-soft md:p-10">
            {sent ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-gradient text-white text-2xl">✓</div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">Message received.</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">Our team will reply within one business day. For urgent requests, WhatsApp is fastest.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" error={errors.email} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)" name="phone" error={errors.phone} />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Topic</label>
                    <select name="topic" defaultValue="CNG Conversion" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none">
                      {["CNG Conversion","Hire Purchase","Fleet Partnership","Workshop / Maintenance","Careers","Investor Enquiry","General"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea name="message" rows={5} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-forest-deep">
                  Send message
                </button>
                <p className="text-xs text-muted-foreground">By submitting you agree to our privacy policy.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input name={name} type={type} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
