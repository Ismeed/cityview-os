import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, Eyebrow } from "../components/site/section";
import { useState } from "react";
import { ArrowRight, Activity, MapPin, Users, Wrench, BarChart3, ShieldAlert, Cpu, CheckCircle } from "lucide-react";

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

const vehiclePresets = {
  keke: { label: "Tricycle (Keke)", consumption: 5.5, cost: 350000 },
  sedan: { label: "Sedan / SUV", consumption: 9.5, cost: 750000 },
  minibus: { label: "Commercial Minibus", consumption: 14.0, cost: 950000 },
  truck: { label: "Heavy Duty Truck", consumption: 24.0, cost: 2800000 },
};

function Fleet() {
  const [activeTab, setActiveTab] = useState<"stats" | "map" | "alerts">("stats");
  
  // Fleet ROI Calculator state
  const [fleetSize, setFleetSize] = useState(15);
  const [vehicleType, setVehicleType] = useState<keyof typeof vehiclePresets>("minibus");
  const [dailyKm, setDailyKm] = useState(220);

  // Calculations
  const preset = vehiclePresets[vehicleType];
  const totalConversionCost = preset.cost * fleetSize;
  const petrolPrice = 950;
  const cngPrice = 230;

  const dailyFuelLiters = (dailyKm / 100) * preset.consumption;
  const dailyPetrolCostPerVehicle = dailyFuelLiters * petrolPrice;
  const dailyCngCostPerVehicle = dailyFuelLiters * 1.1 * cngPrice;

  const dailyPetrolFleet = dailyPetrolCostPerVehicle * fleetSize;
  const dailyCngFleet = dailyCngCostPerVehicle * fleetSize;

  const monthlySavingsFleet = (dailyPetrolFleet - dailyCngFleet) * 30;
  const annualSavingsFleet = (dailyPetrolFleet - dailyCngFleet) * 365;

  const paybackMonthsFleet = monthlySavingsFleet > 0 ? totalConversionCost / monthlySavingsFleet : 0;

  // Mock live vehicle data for dashboard map view
  const mockVehicles = [
    { id: "CV-041", model: "Toyota HiAce (Minibus)", status: "Active", loc: "Katsina Bypass Rd", fuel: "CNG: 72%", driver: "Bashir S." },
    { id: "CV-078", model: "Piaggio Ape (Keke)", status: "Active", loc: "Gombe Central Market", fuel: "CNG: 48%", driver: "Ibrahim Y." },
    { id: "CV-102", model: "Suzuki Every (Sedan)", status: "Idle", loc: "CityView Katsina Depot", fuel: "CNG: 95%", driver: "Musa A." },
    { id: "CV-015", model: "Toyota HiAce (Minibus)", status: "Maintenance", loc: "Gombe Workshop", fuel: "CNG: 10%", driver: "Unassigned" },
  ];

  return (
    <>
      <PageHero eyebrow="Fleet Operations"
        title={<>An <span className="text-gradient-emerald">operating system</span> for your fleet.</>}
        description="From telematics to maintenance, we run the software and the wrenches so your fleet performs — powered by MUVA Mobility.">
      </PageHero>

      {/* DETAILED FEATURES */}
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="Everything a modern fleet needs, in one platform." description="We deploy state-of-the-art telemetry and management systems specifically designed for the unique operational dynamics of African transportation corridors." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: MapPin, t: "Real-time vehicle tracking", d: "Satellite GPS mapping, custom geofences, and dynamic route optimization for long-distance and intracity networks." },
              { i: Users, t: "Driver management & scoring", d: "Behavioral analytics monitoring harsh braking, speeding, idle times, and calculating driver payout indexes automatically." },
              { i: Wrench, t: "Digitized maintenance logs", d: "Predictive engine diagnostic alarms, automated scheduling, and priority booking at local CityView workshops." },
              { i: BarChart3, t: "Real-time operations reporting", d: "Immediate insight into fleet utilization, fuel savings data, carbon footprint analytics, and revenue-per-km metrics." },
              { i: Activity, t: "IoT Telematics & Fuel Sensors", d: "Precision monitoring of CNG cylinder gas pressure levels and ambient temperature sensors to prevent fuel shrinkage." },
              { i: Cpu, t: "Powered by MUVA Mobility", d: "Built on top of West Africa's leading fleet digitization API, ensuring seamless mobile integration and offline capability." },
            ].map((f) => (
              <div key={f.t} className="hover-lift rounded-3xl border border-border bg-white p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep"><f.i className="h-5 w-5" /></div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DASHBOARD MOCKUP */}
      <section className="bg-mist py-24 border-y border-border">
        <div className="container-x">
          <SectionHeading eyebrow="Interactive mockup" title="See the dashboard in action" description="A preview of the CityView Fleet Portal powered by MUVA Mobility." align="center" />
          
          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-4xl border border-border bg-white shadow-elevated">
            {/* Dashboard header */}
            <div className="bg-ink px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-yellow-400" /><span className="h-3 w-3 rounded-full bg-emerald" /></div>
                <div className="text-sm font-semibold text-white">CityView Fleet Portal <span className="text-white/40 font-normal">| Katsina & Gombe</span></div>
              </div>
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                {[
                  { id: "stats", label: "Fleet Stats" },
                  { id: "map", label: "Live Tracking" },
                  { id: "alerts", label: "Alerts" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-emerald text-forest-deep shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-ink p-6 min-h-[350px] text-white">
              {activeTab === "stats" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-4 sm:grid-cols-4">
                    {[
                      { l: "Total Active Vehicles", v: "142 / 150", c: "text-emerald" },
                      { l: "Uptime (Today)", v: "99.2%", c: "text-emerald" },
                      { l: "Litres equivalent CNG used", v: "18,490 SCM", c: "text-white" },
                      { l: "Estimated Savings Today", v: "₦1,894,200", c: "text-emerald" },
                    ].map((k) => (
                      <div key={k.l} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="text-[10px] uppercase tracking-widest text-white/50">{k.l}</div>
                        <div className={`mt-2 font-display text-2xl font-bold ${k.c}`}>{k.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-display font-semibold text-lg text-white">CNG Carbon Mitigation Curve</h4>
                        <p className="text-xs text-white/50 mt-0.5">Cumulative CO₂ emission reduction (Metric Tons) over the last 6 months</p>
                      </div>
                      <span className="text-xs font-bold text-emerald">+24.5% monthly</span>
                    </div>
                    {/* SVG Chart placeholder */}
                    <div className="h-40 w-full flex items-end justify-between gap-2 pt-6">
                      {[25, 34, 45, 62, 79, 95, 115, 134, 160, 192, 230, 275].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full bg-emerald rounded-t transition-all duration-300 group-hover:bg-white" style={{ height: `${(val / 275) * 100}%` }} />
                          <span className="text-[9px] text-white/40">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][idx]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "map" && (
                <div className="grid gap-6 sm:grid-cols-[1fr_1.8fr] animate-fade-in">
                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-sm border-b border-white/10 pb-2">Active Telemetry Feed</h4>
                    {mockVehicles.map((v) => (
                      <div key={v.id} className="rounded-xl bg-white/5 p-3 border border-white/5 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-emerald">{v.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            v.status === "Active" ? "bg-emerald/10 text-emerald" :
                            v.status === "Idle" ? "bg-yellow-400/10 text-yellow-400" :
                            "bg-red-400/10 text-red-400"
                          }`}>{v.status}</span>
                        </div>
                        <div className="mt-2 text-xs font-semibold text-white/90">{v.model}</div>
                        <div className="mt-1 flex justify-between text-[10px] text-white/40">
                          <span>{v.loc}</span>
                          <span>{v.fuel}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated map graphic */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 bg-ink/90 opacity-20" />
                    {/* SVG map visual */}
                    <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 50 50 Q 150 120 250 80 T 450 200 T 600 120" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                      <path d="M 120 250 Q 250 180 320 300 T 550 150" fill="none" stroke="white" strokeWidth="1" />
                      <circle cx="250" cy="80" r="6" fill="#10B981" />
                      <circle cx="320" cy="300" r="6" fill="#FBBF24" />
                      <circle cx="450" cy="200" r="6" fill="#10B981" />
                    </svg>
                    <div className="relative bg-ink/75 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-xs max-w-[240px]">
                      <div className="font-bold text-emerald flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald animate-pulse" /> Live Tracking Active</div>
                      <p className="text-[10px] text-white/60 mt-1">Telemetry node connecting 142 vehicles. Gombe & Katsina Mother stations reporting online.</p>
                    </div>
                    <div className="relative text-[10px] text-white/40 text-right">Latitude: 12.9894° N | Longitude: 7.6033° E</div>
                  </div>
                </div>
              )}

              {activeTab === "alerts" && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-display font-semibold text-sm border-b border-white/10 pb-2">Active Operational Notifications</h4>
                  {[
                    { id: "AL-804", type: "maintenance", msg: "Toyota HiAce (CV-015) pressure sensor cylinder variance > 5%. Maintenance booking generated.", time: "12 mins ago" },
                    { id: "AL-802", type: "geofence", msg: "Piaggio Ape (CV-078) exited primary operation geofence boundary (Gombe Municipal).", time: "42 mins ago" },
                    { id: "AL-799", type: "success", msg: "Successful CNG cylinder hydrostatic testing completed for 12 tricycles in Gombe.", time: "3 hours ago" },
                  ].map((a) => (
                    <div key={a.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-4">
                      {a.type === "maintenance" ? <Wrench className="h-5 w-5 text-red-400 mt-0.5" /> :
                       a.type === "geofence" ? <ShieldAlert className="h-5 w-5 text-yellow-400 mt-0.5" /> :
                       <CheckCircle className="h-5 w-5 text-emerald mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{a.id}</span>
                          <span className="text-[10px] text-white/40 font-normal">{a.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-white/80 leading-relaxed">{a.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">Powered by <span className="font-semibold text-forest-deep">MUVA Mobility</span></p>
        </div>
      </section>

      {/* FLEET ROI CALCULATOR */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Eyebrow>Fleet ROI Calculator</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Project your operational savings.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Converting a commercial fleet to CNG yields massive compounding returns. Adjust the sliders to calculate the cumulative savings, capital conversion cost, and ROI payback timeframe for your fleet size.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-border p-4 bg-mist/30">
                  <CheckCircle className="h-5 w-5 text-emerald mt-0.5" />
                  <p className="text-xs text-muted-foreground"><span className="font-bold text-forest-deep">Immediate Payback:</span> Fuel savings cover the initial conversion cost of a commercial passenger bus in under 4 months under heavy daily use.</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border p-4 bg-mist/30">
                  <CheckCircle className="h-5 w-5 text-emerald mt-0.5" />
                  <p className="text-xs text-muted-foreground"><span className="font-bold text-forest-deep">Carbon Credits:</span> Fleet conversions generate verifiable clean energy credits integrated directly through the MUVA dashboard.</p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-border bg-white p-8 shadow-elevated">
              <h3 className="font-display text-lg font-semibold text-foreground pb-6 border-b border-border">Fleet ROI Estimator</h3>
              
              <div className="mt-8 space-y-6">
                {/* Fleet Size */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    <span>Number of Vehicles</span>
                    <span className="text-forest-deep font-bold">{fleetSize} Vehicles</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={150}
                    step={1}
                    value={fleetSize}
                    onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="w-full accent-emerald"
                    aria-label="Fleet size"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>3 Vehicles</span>
                    <span>75 Vehicles</span>
                    <span>150 Vehicles</span>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">Vehicle Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(vehiclePresets).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setVehicleType(key as keyof typeof vehiclePresets)}
                        className={`rounded-2xl border py-3 px-2 text-xs font-semibold text-center transition ${
                          vehicleType === key
                            ? "border-forest bg-forest/5 text-forest-deep font-bold"
                            : "border-border bg-white text-muted-foreground hover:bg-mist"
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avg Daily Distance */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    <span>Average Daily Distance (Per Vehicle)</span>
                    <span className="text-forest-deep font-bold">{dailyKm} km / day</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={400}
                    step={10}
                    value={dailyKm}
                    onChange={(e) => setDailyKm(Number(e.target.value))}
                    className="w-full accent-emerald"
                    aria-label="Avg daily distance"
                  />
                </div>

                {/* Output Stats */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 border-t border-border pt-6">
                  <div className="rounded-2xl bg-mist p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">Conversion Capital (CAPEX)</span>
                    <div className="mt-1 font-display text-2xl font-bold text-foreground">₦{totalConversionCost.toLocaleString()}</div>
                    <span className="text-[10px] text-muted-foreground">Estimated setup cost</span>
                  </div>
                  <div className="rounded-2xl bg-emerald-soft/50 p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">Payback Period</span>
                    <div className="mt-1 font-display text-2xl font-bold text-forest-deep">
                      {Math.ceil(paybackMonthsFleet)} Months
                    </div>
                    <span className="text-[10px] text-muted-foreground">ROI recovery horizon</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-gradient p-6 text-white shadow-glow-soft flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/80">Monthly Fleet Savings</span>
                    <div className="font-display font-bold text-3xl">₦{Math.round(monthlySavingsFleet).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 block text-right">Annualized</span>
                    <div className="font-display font-semibold text-white/90 text-sm">₦{Math.round(annualSavingsFleet).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
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
