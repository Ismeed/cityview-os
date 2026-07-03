import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/site/section";
import heroImg from "../assets/hero.png";
import workshopImg from "../assets/workshop.png";
import cngImg from "../assets/cng-detail.png";
import kekeImg from "../assets/keke-fleet.png";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CityView CNG" },
      { name: "description", content: "Workshop, conversions, vehicles, customers and facilities." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

type Shot = {
  src: string;
  alt: string;
  category: "workshop" | "conversions" | "vehicles" | "customers" | "events" | "facilities";
  span: string;
};

function Gallery() {
  const [filter, setFilter] = useState<string>("all");

  const shots: Shot[] = [
    { src: heroImg, alt: "CNG Refueling Depot Katsina Head Office", category: "facilities", span: "md:col-span-2 md:row-span-2" },
    { src: workshopImg, alt: "State-of-the-Art Workshop Facility", category: "facilities", span: "" },
    { src: cngImg, alt: "High-Pressure CNG Cylinder Installation", category: "conversions", span: "" },
    { src: kekeImg, alt: "CNG Tricycle Keke Fleet Handover", category: "vehicles", span: "md:col-span-2" },
    { src: workshopImg, alt: "Certified Engineers Performing Conversions", category: "workshop", span: "" },
    { src: cngImg, alt: "Automotive Diagnostics and Tuning", category: "workshop", span: "" },
    { src: kekeImg, alt: "Happy Fleet Driver Receiving Key", category: "customers", span: "" },
    { src: heroImg, alt: "Laying Foundation for Gombe Depot", category: "facilities", span: "" },
    { src: workshopImg, alt: "Grand Opening and Ribbon Cutting Event", category: "events", span: "md:col-span-2" },
  ];

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "workshop", label: "Workshop" },
    { value: "conversions", label: "Conversions" },
    { value: "vehicles", label: "Vehicles" },
    { value: "customers", label: "Customers" },
    { value: "events", label: "Events" },
    { value: "facilities", label: "Facilities" },
  ];

  const filteredShots = filter === "all" ? shots : shots.filter(s => s.category === filter);

  return (
    <>
      <PageHero eyebrow="Gallery" title={<>Inside the <span className="text-gradient-emerald">CityView</span> operation.</>}
        description="Facilities, fleets, technicians and the customers we serve." />
      <section className="bg-white py-24">
        <div className="container-x">
          {/* Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  filter === c.value
                    ? "bg-forest text-white shadow-md"
                    : "bg-mist text-muted-foreground hover:bg-mist/85"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 transition-all duration-500">
            {filteredShots.map((s, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-3xl ${s.span} border border-border shadow-soft`}>
                <img src={s.src} alt={s.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="inline-block rounded-full bg-emerald/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-deep">
                    {s.category}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-semibold leading-tight">{s.alt}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
