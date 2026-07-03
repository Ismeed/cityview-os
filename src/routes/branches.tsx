import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { useState } from "react";
import { MapPin, Phone, ArrowRight, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branches — CityView CNG" },
      { name: "description", content: "Head office in Katsina, active operations in Gombe, expanding across Northern Nigeria and West Africa." },
      { property: "og:url", content: "/branches" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: Branches,
});

type Branch = {
  c: string;
  tag: string;
  live: boolean;
  addr?: string;
  phone?: string;
  hours?: string;
  details?: string;
  x: number; // SVG mapping coordinates
  y: number;
};

const branches: Branch[] = [
  { 
    c: "Katsina", 
    tag: "Head office", 
    live: true, 
    addr: "No. 1 Nagogo Road Near Union Bank, GRA Katsina, Along Kofar Durbi Road.", 
    phone: "09121266900 · 08039739252",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM",
    details: "Our primary hub housing the main CNG conversion bay, diagnostics center, auto alignment, and key programming facilities.",
    x: 220, 
    y: 60 
  },
  { 
    c: "Gombe", 
    tag: "Active branch", 
    live: true, 
    addr: "Bauchi Road, Gombe State, Nigeria", 
    phone: "+234 803 765 4321",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM",
    details: "Full service station featuring dual CNG refueling nozzles, secondary conversion facilities, and local driver training.",
    x: 480, 
    y: 180 
  },
  { c: "Kano", tag: "Opening Q3 2026", live: false, details: "Conversion hub under construction. Equipment intake stage.", x: 330, y: 100 },
  { c: "Kaduna", tag: "Opening Q4 2026", live: false, details: "Refueling station site acquired. Permitting finalized.", x: 260, y: 170 },
  { c: "Bauchi", tag: "Planned 2027", live: false, details: "Feasibility study completed. Partner discussions active.", x: 410, y: 160 },
  { c: "Abuja", tag: "Planned 2027", live: false, details: "Strategic capital hub. Site scouting active.", x: 280, y: 260 },
];

function Branches() {
  const [selected, setSelected] = useState<Branch>(branches[0]);

  return (
    <>
      <PageHero eyebrow="Branches"
        title={<>Northern Nigeria today. <span className="text-gradient-emerald">Africa tomorrow.</span></>}
        description="We build slowly and permanently. Every new city gets the same engineering, the same service, the same guarantees." />

      {/* INTERACTIVE MAP SECTION */}
      <section className="bg-white py-24 border-b border-border">
        <div className="container-x">
          <SectionHeading eyebrow="Interactive map" title="Our expansion network" description="Click on any city node to view branch details, active hours, and facility capabilities." />
          
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* SVG Map Container */}
            <div className="rounded-4xl border border-border bg-mist/50 p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] shadow-soft">
              <span className="absolute top-4 left-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Nigeria Expansion Map</span>
              
              {/* Responsive SVG Map */}
              <svg className="w-full max-w-[600px] h-[320px]" viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
                {/* Background outline (Simulated Northern/Mid Nigeria boundary) */}
                <path d="M 50 40 Q 300 20 550 50 Q 580 180 500 280 Q 280 310 100 290 Q 30 180 50 40 Z" fill="#E8ECE9" stroke="#CFD5D0" strokeWidth="2" />
                
                {/* Major routes connection lines */}
                <line x1="220" y1="60" x2="330" y2="100" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                <line x1="330" y1="100" x2="480" y2="180" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                <line x1="330" y1="100" x2="260" y2="170" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="260" y1="170" x2="280" y2="260" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="410" y1="160" x2="480" y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* City nodes */}
                {branches.map((b) => (
                  <g key={b.c} className="cursor-pointer" onClick={() => setSelected(b)}>
                    {/* Ring animation for selected node */}
                    {selected.c === b.c && (
                      <circle cx={b.x} cy={b.y} r="16" fill="none" stroke={b.live ? "#10B981" : "#94A3B8"} strokeWidth="2" className="animate-pulse" />
                    )}
                    
                    {/* Inner solid node */}
                    <circle 
                      cx={b.x} 
                      cy={b.y} 
                      r={selected.c === b.c ? "8" : "6"} 
                      fill={b.live ? "#10B981" : b.tag.includes("Opening") ? "#FBBF24" : "#94A3B8"} 
                      className="transition-all duration-300 hover:scale-125"
                    />
                    
                    {/* Node text label */}
                    <text 
                      x={b.x} 
                      y={b.y - 12} 
                      textAnchor="middle" 
                      className={`text-[11px] font-display font-semibold transition ${
                        selected.c === b.c ? "fill-forest-deep font-bold scale-105" : "fill-muted-foreground"
                      }`}
                    >
                      {b.c}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="flex gap-4 mt-4 text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-t border-border/60 pt-4 w-full justify-center">
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald" /> Active Hub</div>
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Opening Soon</div>
                <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Planned corridor</div>
              </div>
            </div>

            {/* Selected Branch Card */}
            <div className="rounded-4xl border border-border bg-white p-8 shadow-elevated min-h-[380px] flex flex-col justify-between animate-fade-in">
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h3 className="font-display text-3xl font-semibold text-foreground">{selected.c}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                    selected.live ? "bg-emerald text-forest-deep" : "bg-mist text-muted-foreground"
                  }`}>
                    {selected.tag}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{selected.details}</p>

                {selected.live && (
                  <dl className="mt-6 space-y-4 text-sm">
                    {selected.addr && (
                      <div className="flex items-start gap-3 border-b border-border/50 pb-3">
                        <MapPin className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</dt>
                          <dd className="mt-1 font-medium text-foreground">{selected.addr}</dd>
                        </div>
                      </div>
                    )}
                    {selected.hours && (
                      <div className="flex items-start gap-3 border-b border-border/50 pb-3">
                        <Clock className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Opening Hours</dt>
                          <dd className="mt-1 font-medium text-foreground">{selected.hours}</dd>
                        </div>
                      </div>
                    )}
                    {selected.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</dt>
                          <dd className="mt-1 font-semibold text-forest-deep">{selected.phone}</dd>
                        </div>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              {!selected.live && (
                <div className="rounded-2xl bg-mist border border-border/60 p-4 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">This site is part of our upcoming clean mobility grid expansion. For early commercial partner inquiries, please contact headquarters.</p>
                </div>
              )}

              {selected.live && (
                <Link to="/contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition">
                  Contact this branch <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE DETAIL GRID */}
      <section className="bg-mist py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Primary Hub" title="Headquarters Katsina Map" />
          <div className="overflow-hidden rounded-4xl border border-border shadow-elevated mt-10">
            <iframe
              title="CityView CNG Katsina head office"
              src="https://www.google.com/maps?q=Katsina,Nigeria&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
