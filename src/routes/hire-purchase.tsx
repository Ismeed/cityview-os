import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { useState } from "react";
import { CheckCircle2, ArrowRight, IdCard, FileCheck, Handshake, Wallet, Send, CheckCircle } from "lucide-react";
import kekeImg from "../assets/keke-fleet.png";

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
  const [step, setStep] = useState<"info" | "form" | "success">("info");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    city: "Katsina",
    experience: "1-2 Years",
    guarantorName: "",
    guarantorPhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage so Admin Panel CMS can display the applications
    const existing = localStorage.getItem("cityview_hp_applications");
    const apps = existing ? JSON.parse(existing) : [];
    const newApp = {
      ...formData,
      id: `APP-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    localStorage.setItem("cityview_hp_applications", JSON.stringify([newApp, ...apps]));
    setStep("success");
  };

  return (
    <>
      <PageHero eyebrow="Hire Purchase Scheme" title={<>Own a <span className="text-gradient-emerald">CNG keke.</span> Change your income.</>}
        description="A structured, transparent path to ownership for professional drivers. Flexible weekly repayments. Full servicing included.">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStep("form")}
            className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow hover:bg-white transition cursor-pointer"
          >
            Apply online now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </PageHero>

      {/* MULTI-STEP INTERACTIVE SECTION */}
      <section className="bg-white py-24">
        <div className="container-x">
          {step === "info" && (
            <div className="grid items-center gap-14 lg:grid-cols-2 animate-fade-in">
              <div className="relative overflow-hidden rounded-4xl shadow-elevated border border-border">
                <img src={kekeImg} alt="CityView CNG keke fleet" width={1600} height={1000} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Four steps to ownership.</h2>
                <div className="mt-8 grid gap-4">
                  {[
                    { i: IdCard, t: "1. Apply online or in branch", d: "Submit your details, guarantor contacts, and choose Katsina or Gombe branch." },
                    { i: FileCheck, t: "2. Verification & Interview", d: "We review your license, guarantor status, and conduct a brief driver evaluation." },
                    { i: Handshake, t: "3. Agreement Sign-off", d: "Sign a clear, interest-stable hire-purchase agreement with zero hidden charges." },
                    { i: Wallet, t: "4. Daily operations & weekly payment", d: "Own your green CNG Keke outright at the end of your contract period." },
                  ].map((s) => (
                    <div key={s.t} className="flex gap-4 rounded-3xl border border-border bg-white p-6 transition hover:shadow-soft">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep"><s.i className="h-5 w-5" /></div>
                      <div>
                        <div className="font-display text-lg font-semibold text-foreground">{s.t}</div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition"
                >
                  Start your application <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="mx-auto max-w-2xl rounded-4xl border border-border bg-white p-8 shadow-elevated animate-fade-in">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <h2 className="font-display text-2xl font-semibold text-foreground">Hire Purchase Application</h2>
                <button onClick={() => setStep("info")} className="text-xs font-semibold text-muted-foreground hover:text-forest-deep">Back to info</button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alhaji Bello"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Preferred City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white"
                    >
                      <option value="Katsina">Katsina (Head Office)</option>
                      <option value="Gombe">Gombe Branch</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 08030000000"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="e.g. 08030000000"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Guarantor Full Name</label>
                  <input
                    type="text"
                    name="guarantorName"
                    required
                    value={formData.guarantorName}
                    onChange={handleInputChange}
                    placeholder="Guarantor's Name"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Guarantor Phone Number</label>
                    <input
                      type="tel"
                      name="guarantorPhone"
                      required
                      value={formData.guarantorPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 08030000000"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Driving Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white"
                    >
                      <option value="Less than 1 Year">Less than 1 Year</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="Over 5 Years">Over 5 Years</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("info")}
                    className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-mist transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-forest-deep hover:bg-forest hover:text-white transition shadow-glow-soft"
                  >
                    Submit Application <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === "success" && (
            <div className="mx-auto max-w-md text-center rounded-4xl border border-border bg-white p-10 shadow-elevated animate-fade-in">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-forest-deep mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">Application Received!</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Thank you, <span className="font-bold text-forest-deep">{formData.name}</span>. Your application for a CNG Keke Hire Purchase has been successfully registered. 
              </p>
              <div className="mt-6 rounded-2xl bg-mist p-4 text-xs text-left border border-border">
                <div className="font-bold text-forest-deep">What happens next?</div>
                <ul className="mt-2 space-y-1.5 list-disc list-inside text-muted-foreground">
                  <li>Our Katsina head office will review your details.</li>
                  <li>We will call you on <span className="font-semibold">{formData.phone}</span> within 24 business hours.</li>
                  <li>Please prepare your valid ID and Guarantor details.</li>
                </ul>
              </div>
              <button
                onClick={() => setStep("info")}
                className="mt-8 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition"
              >
                Back to Information
              </button>
            </div>
          )}
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="bg-mist py-24 border-y border-border">
        <div className="container-x">
          <SectionHeading eyebrow="Requirements" title="Simple and fair checklist." description="We make it direct and accessible for genuine operators." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Valid Nigerian ID card (NIN / Voter Card)",
              "Driver's license (Class C Tricycle category)",
              "Locally recognizable guarantor (Community Leader/Civil Servant)",
              "Proof of residence in Katsina or Gombe",
              "Two passport photographs",
              "Interview and road evaluation with our inspectors"
            ].map((r) => (
              <div key={r} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-emerald shrink-0" />
                <span className="text-sm font-medium text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Driver stories" title="Real drivers. Real ownership." description="Hear how the CNG Hire Purchase scheme is making local drivers self-reliant." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "Musa I.", c: "Katsina", q: "In eight months I've saved more than in two years of renting. The fuel cost is so low compared to petrol. The keke is mine soon." },
              { n: "Aliyu B.", c: "Gombe", q: "CityView's preventive servicing means my tricycle is always running. My family has a stable income now." },
              { n: "Habiba S.", c: "Katsina", q: "Operating a clean energy keke gets me more passengers. People love that it runs on gas! I bring home double each week." },
            ].map((t) => (
              <figure key={t.n} className="rounded-3xl border border-border bg-mist p-8 flex flex-col justify-between">
                <blockquote className="text-base leading-relaxed text-foreground italic">"{t.q}"</blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground border-t border-border pt-4"><span className="font-semibold text-forest-deep">{t.n}</span> · {t.c}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
