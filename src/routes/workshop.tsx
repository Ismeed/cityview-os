import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { useState } from "react";
import { ArrowRight, Wrench, Gauge, Zap, Cog, Calendar, Clock, MapPin, CheckCircle, Send } from "lucide-react";
import workshopImg from "../assets/workshop.png";

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
  const [bookingStep, setBookingStep] = useState<"info" | "form" | "success">("info");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "CNG Conversion Consultation",
    vehicleModel: "",
    location: "Katsina",
    date: "",
    time: "09:00",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = localStorage.getItem("cityview_workshop_bookings");
    const bookings = existing ? JSON.parse(existing) : [];
    const newBooking = {
      ...formData,
      id: `BK-${Date.now().toString().slice(-4)}`,
      status: "Confirmed",
      dateCreated: new Date().toLocaleDateString(),
    };
    localStorage.setItem("cityview_workshop_bookings", JSON.stringify([newBooking, ...bookings]));
    setBookingStep("success");
  };

  return (
    <>
      <PageHero eyebrow="Workshop"
        title={<>Engineering-grade care <span className="text-gradient-emerald">for every vehicle.</span></>}
        description="From diagnostics to full engine work, our workshop is built for accuracy, transparency and speed.">
        <button
          onClick={() => setBookingStep("form")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow hover:bg-white transition cursor-pointer"
        >
          Book inspection / conversion <ArrowRight className="h-4 w-4" />
        </button>
      </PageHero>

      {/* DETAILED CONTENT SECTION */}
      <section className="bg-white py-24">
        <div className="container-x">
          {bookingStep === "info" && (
            <div className="grid items-center gap-14 lg:grid-cols-2 animate-fade-in">
              <div className="relative overflow-hidden rounded-4xl shadow-elevated border border-border">
                <img src={workshopImg} alt="CityView CNG workshop interior" width={1600} height={1024} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <Eyebrow>What we do</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">A complete service line, one workshop.</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our service hubs are equipped with modern Italian and German engine diagnostic equipment. Our staff consists of certified alternative-energy auto mechanics who undergo rigorous continuous training.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { i: Wrench, t: "Engine repairs" },
                    { i: Gauge, t: "Vehicle diagnosis" },
                    { i: Cog, t: "Suspension & steering" },
                    { i: Zap, t: "Electrical repairs" },
                    { i: Cog, t: "Transmission" },
                    { i: Wrench, t: "General maintenance" },
                  ].map((s) => (
                    <div key={s.t} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
                      <s.i className="h-5 w-5 text-emerald" />
                      <span className="text-sm font-semibold text-foreground">{s.t}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingStep("form")}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition"
                >
                  Schedule an appointment <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {bookingStep === "form" && (
            <div className="mx-auto max-w-2xl rounded-4xl border border-border bg-white p-8 shadow-elevated animate-fade-in">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <h2 className="font-display text-2xl font-semibold text-foreground">Schedule Workshop Service</h2>
                <button onClick={() => setBookingStep("info")} className="text-xs font-semibold text-muted-foreground hover:text-forest-deep">Back to info</button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alhaji Mustapha"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
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
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Service Required</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white"
                    >
                      <option value="CNG Conversion Consultation">CNG Conversion Consultation</option>
                      <option value="Vehicle Diagnostic Inspection">Vehicle Diagnostic Inspection</option>
                      <option value="Routine Maintenance Check">Routine Maintenance Check</option>
                      <option value="Engine / Mechanical Repairs">Engine / Mechanical Repairs</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Vehicle Make & Model</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      required
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="e.g. Toyota HiAce 2018"
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Location</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white"
                    >
                      <option value="Katsina">Katsina (Head Office)</option>
                      <option value="Gombe">Gombe Branch</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Preferred Time</label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingStep("info")}
                    className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-mist transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-forest-deep hover:bg-forest hover:text-white transition shadow-glow-soft"
                  >
                    Confirm Booking <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {bookingStep === "success" && (
            <div className="mx-auto max-w-md text-center rounded-4xl border border-border bg-white p-10 shadow-elevated animate-fade-in">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-forest-deep mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">Booking Confirmed!</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Thank you, <span className="font-bold text-forest-deep">{formData.name}</span>. Your service booking for your <span className="font-semibold text-forest-deep">{formData.vehicleModel}</span> has been confirmed.
              </p>
              <div className="mt-6 rounded-2xl bg-mist p-4 text-xs text-left border border-border space-y-2">
                <div className="font-bold text-forest-deep">Appointment Summary:</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 text-emerald" /> <span>{formData.date} at {formData.time}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-emerald" /> <span>CityView Workshop, {formData.location}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Wrench className="h-4 w-4 text-emerald" /> <span>{formData.serviceType}</span></div>
              </div>
              <button
                onClick={() => setBookingStep("info")}
                className="mt-8 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition"
              >
                Back to Information
              </button>
            </div>
          )}
        </div>
      </section>

      {/* REPAIR PROCESS */}
      <section className="bg-mist py-24 border-y border-border">
        <div className="container-x">
          <SectionHeading eyebrow="Repair process" title="Transparent, documented, engineered." description="Our 4-step process builds customer confidence and ensures engineering excellence." />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Intake & digital diagnostics", d: "Cylinder gas leak scans, exhaust sensor profiling, and mechanical inspection logged digitally." },
              { n: "02", t: "Detailed diagnostic report", d: "A clear cost estimate and telemetry diagnostics report sent to your phone before any work begins." },
              { n: "03", t: "Approved work order", d: "Our certified engineers execute conversions or mechanical adjustments matching precise OEM specifications." },
              { n: "04", t: "Safety testing & handover", d: "hydrostatic gas tests, ECU calibration, road trials, and a 12-month conversion warranty sign-off." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border border-border bg-white p-6 shadow-soft hover:shadow-medium transition">
                <div className="font-display text-3xl font-bold text-emerald">{s.n}</div>
                <div className="mt-4 font-display text-lg font-bold text-foreground">{s.t}</div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
