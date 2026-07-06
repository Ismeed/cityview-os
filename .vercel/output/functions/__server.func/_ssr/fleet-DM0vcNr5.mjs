import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as Cpu, bt as Activity, ct as ChartColumn, i as Users, j as MapPin, n as Wrench, tt as CircleCheckBig, y as ShieldAlert, yt as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fleet-DM0vcNr5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var vehiclePresets = {
	keke: {
		label: "Tricycle (Keke)",
		consumption: 5.5,
		cost: 35e4
	},
	sedan: {
		label: "Sedan / SUV",
		consumption: 9.5,
		cost: 75e4
	},
	minibus: {
		label: "Commercial Minibus",
		consumption: 14,
		cost: 95e4
	},
	truck: {
		label: "Heavy Duty Truck",
		consumption: 24,
		cost: 28e5
	}
};
function Fleet() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("stats");
	const [fleetSize, setFleetSize] = (0, import_react.useState)(15);
	const [vehicleType, setVehicleType] = (0, import_react.useState)("minibus");
	const [dailyKm, setDailyKm] = (0, import_react.useState)(220);
	const preset = vehiclePresets[vehicleType];
	const totalConversionCost = preset.cost * fleetSize;
	const petrolPrice = 950;
	const cngPrice = 230;
	const dailyFuelLiters = dailyKm / 100 * preset.consumption;
	const dailyPetrolCostPerVehicle = dailyFuelLiters * petrolPrice;
	const dailyCngCostPerVehicle = dailyFuelLiters * 1.1 * cngPrice;
	const dailyPetrolFleet = dailyPetrolCostPerVehicle * fleetSize;
	const dailyCngFleet = dailyCngCostPerVehicle * fleetSize;
	const monthlySavingsFleet = (dailyPetrolFleet - dailyCngFleet) * 30;
	const annualSavingsFleet = (dailyPetrolFleet - dailyCngFleet) * 365;
	const paybackMonthsFleet = monthlySavingsFleet > 0 ? totalConversionCost / monthlySavingsFleet : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Fleet Operations",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"An ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "operating system"
				}),
				" for your fleet."
			] }),
			description: "From telematics to maintenance, we run the software and the wrenches so your fleet performs — powered by MUVA Mobility."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Capabilities",
					title: "Everything a modern fleet needs, in one platform.",
					description: "We deploy state-of-the-art telemetry and management systems specifically designed for the unique operational dynamics of African transportation corridors."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							i: MapPin,
							t: "Real-time vehicle tracking",
							d: "Satellite GPS mapping, custom geofences, and dynamic route optimization for long-distance and intracity networks."
						},
						{
							i: Users,
							t: "Driver management & scoring",
							d: "Behavioral analytics monitoring harsh braking, speeding, idle times, and calculating driver payout indexes automatically."
						},
						{
							i: Wrench,
							t: "Digitized maintenance logs",
							d: "Predictive engine diagnostic alarms, automated scheduling, and priority booking at local CityView workshops."
						},
						{
							i: ChartColumn,
							t: "Real-time operations reporting",
							d: "Immediate insight into fleet utilization, fuel savings data, carbon footprint analytics, and revenue-per-km metrics."
						},
						{
							i: Activity,
							t: "IoT Telematics & Fuel Sensors",
							d: "Precision monitoring of CNG cylinder gas pressure levels and ambient temperature sensors to prevent fuel shrinkage."
						},
						{
							i: Cpu,
							t: "Powered by MUVA Mobility",
							d: "Built on top of West Africa's leading fleet digitization API, ensuring seamless mobile integration and offline capability."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hover-lift rounded-3xl border border-border bg-white p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.i, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl font-semibold text-foreground",
								children: f.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: f.d
							})
						]
					}, f.t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24 border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Interactive mockup",
						title: "See the dashboard in action",
						description: "A preview of the CityView Fleet Portal powered by MUVA Mobility.",
						align: "center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-14 max-w-5xl overflow-hidden rounded-4xl border border-border bg-white shadow-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-red-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-yellow-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-emerald" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-semibold text-white",
									children: ["CityView Fleet Portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/40 font-normal",
										children: "| Katsina & Gombe"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex bg-white/5 rounded-full p-1 border border-white/10",
								children: [
									{
										id: "stats",
										label: "Fleet Stats"
									},
									{
										id: "map",
										label: "Live Tracking"
									},
									{
										id: "alerts",
										label: "Alerts"
									}
								].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab(tab.id),
									className: `rounded-full px-4 py-1.5 text-xs font-semibold transition ${activeTab === tab.id ? "bg-emerald text-forest-deep shadow-md" : "text-white/60 hover:text-white"}`,
									children: tab.label
								}, tab.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink p-6 min-h-[350px] text-white",
							children: [
								activeTab === "stats" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6 animate-fade-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 sm:grid-cols-4",
										children: [
											{
												l: "Total Active Vehicles",
												v: "142 / 150",
												c: "text-emerald"
											},
											{
												l: "Uptime (Today)",
												v: "99.2%",
												c: "text-emerald"
											},
											{
												l: "Litres equivalent CNG used",
												v: "18,490 SCM",
												c: "text-white"
											},
											{
												l: "Estimated Savings Today",
												v: "₦1,894,200",
												c: "text-emerald"
											}
										].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-white/10 bg-white/5 p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase tracking-widest text-white/50",
												children: k.l
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `mt-2 font-display text-2xl font-bold ${k.c}`,
												children: k.v
											})]
										}, k.l))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-white/10 bg-white/5 p-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-display font-semibold text-lg text-white",
												children: "CNG Carbon Mitigation Curve"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-white/50 mt-0.5",
												children: "Cumulative CO₂ emission reduction (Metric Tons) over the last 6 months"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-emerald",
												children: "+24.5% monthly"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-40 w-full flex items-end justify-between gap-2 pt-6",
											children: [
												25,
												34,
												45,
												62,
												79,
												95,
												115,
												134,
												160,
												192,
												230,
												275
											].map((val, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 flex flex-col items-center gap-2 group",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-full bg-emerald rounded-t transition-all duration-300 group-hover:bg-white",
													style: { height: `${val / 275 * 100}%` }
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] text-white/40",
													children: [
														"Jan",
														"Feb",
														"Mar",
														"Apr",
														"May",
														"Jun",
														"Jul",
														"Aug",
														"Sep",
														"Oct",
														"Nov",
														"Dec"
													][idx]
												})]
											}, idx))
										})]
									})]
								}),
								activeTab === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-[1fr_1.8fr] animate-fade-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display font-semibold text-sm border-b border-white/10 pb-2",
											children: "Active Telemetry Feed"
										}), [
											{
												id: "CV-041",
												model: "Toyota HiAce (Minibus)",
												status: "Active",
												loc: "Katsina Bypass Rd",
												fuel: "CNG: 72%",
												driver: "Bashir S."
											},
											{
												id: "CV-078",
												model: "Piaggio Ape (Keke)",
												status: "Active",
												loc: "Gombe Central Market",
												fuel: "CNG: 48%",
												driver: "Ibrahim Y."
											},
											{
												id: "CV-102",
												model: "Suzuki Every (Sedan)",
												status: "Idle",
												loc: "CityView Katsina Depot",
												fuel: "CNG: 95%",
												driver: "Musa A."
											},
											{
												id: "CV-015",
												model: "Toyota HiAce (Minibus)",
												status: "Maintenance",
												loc: "Gombe Workshop",
												fuel: "CNG: 10%",
												driver: "Unassigned"
											}
										].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-white/5 p-3 border border-white/5 flex flex-col justify-between",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-emerald",
														children: v.id
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `px-2 py-0.5 rounded text-[9px] font-bold uppercase ${v.status === "Active" ? "bg-emerald/10 text-emerald" : v.status === "Idle" ? "bg-yellow-400/10 text-yellow-400" : "bg-red-400/10 text-red-400"}`,
														children: v.status
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-2 text-xs font-semibold text-white/90",
													children: v.model
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 flex justify-between text-[10px] text-white/40",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.loc }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.fuel })]
												})
											]
										}, v.id))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between relative overflow-hidden min-h-[300px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/90 opacity-20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "absolute inset-0 h-full w-full opacity-30",
												xmlns: "http://www.w3.org/2000/svg",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M 50 50 Q 150 120 250 80 T 450 200 T 600 120",
														fill: "none",
														stroke: "white",
														strokeWidth: "2",
														strokeDasharray: "5,5"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M 120 250 Q 250 180 320 300 T 550 150",
														fill: "none",
														stroke: "white",
														strokeWidth: "1"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "250",
														cy: "80",
														r: "6",
														fill: "#10B981"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "320",
														cy: "300",
														r: "6",
														fill: "#FBBF24"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "450",
														cy: "200",
														r: "6",
														fill: "#10B981"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative bg-ink/75 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-xs max-w-[240px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-emerald flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald animate-pulse" }), " Live Tracking Active"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-white/60 mt-1",
													children: "Telemetry node connecting 142 vehicles. Gombe & Katsina Mother stations reporting online."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "relative text-[10px] text-white/40 text-right",
												children: "Latitude: 12.9894° N | Longitude: 7.6033° E"
											})
										]
									})]
								}),
								activeTab === "alerts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 animate-fade-in",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-semibold text-sm border-b border-white/10 pb-2",
										children: "Active Operational Notifications"
									}), [
										{
											id: "AL-804",
											type: "maintenance",
											msg: "Toyota HiAce (CV-015) pressure sensor cylinder variance > 5%. Maintenance booking generated.",
											time: "12 mins ago"
										},
										{
											id: "AL-802",
											type: "geofence",
											msg: "Piaggio Ape (CV-078) exited primary operation geofence boundary (Gombe Municipal).",
											time: "42 mins ago"
										},
										{
											id: "AL-799",
											type: "success",
											msg: "Successful CNG cylinder hydrostatic testing completed for 12 tricycles in Gombe.",
											time: "3 hours ago"
										}
									].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-4",
										children: [a.type === "maintenance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5 text-red-400 mt-0.5" }) : a.type === "geofence" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5 text-yellow-400 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-emerald mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-white/40 font-normal",
													children: a.time
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-white/80 leading-relaxed",
												children: a.msg
											})]
										})]
									}, a.id))]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground",
						children: ["Powered by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-forest-deep",
							children: "MUVA Mobility"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[1fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Fleet ROI Calculator" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display text-4xl font-semibold md:text-5xl",
							children: "Project your operational savings."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground leading-relaxed",
							children: "Converting a commercial fleet to CNG yields massive compounding returns. Adjust the sliders to calculate the cumulative savings, capital conversion cost, and ROI payback timeframe for your fleet size."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 rounded-2xl border border-border p-4 bg-mist/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-emerald mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-forest-deep",
										children: "Immediate Payback:"
									}), " Fuel savings cover the initial conversion cost of a commercial passenger bus in under 4 months under heavy daily use."]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 rounded-2xl border border-border p-4 bg-mist/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-emerald mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-forest-deep",
										children: "Carbon Credits:"
									}), " Fleet conversions generate verifiable clean energy credits integrated directly through the MUVA dashboard."]
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl border border-border bg-white p-8 shadow-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold text-foreground pb-6 border-b border-border",
							children: "Fleet ROI Estimator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Number of Vehicles" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-forest-deep font-bold",
											children: [fleetSize, " Vehicles"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 3,
										max: 150,
										step: 1,
										value: fleetSize,
										onChange: (e) => setFleetSize(Number(e.target.value)),
										className: "w-full accent-emerald",
										"aria-label": "Fleet size"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-muted-foreground mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3 Vehicles" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "75 Vehicles" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "150 Vehicles" })
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3",
									children: "Vehicle Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
									children: Object.entries(vehiclePresets).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setVehicleType(key),
										className: `rounded-2xl border py-3 px-2 text-xs font-semibold text-center transition ${vehicleType === key ? "border-forest bg-forest/5 text-forest-deep font-bold" : "border-border bg-white text-muted-foreground hover:bg-mist"}`,
										children: value.label
									}, key))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Average Daily Distance (Per Vehicle)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-forest-deep font-bold",
										children: [dailyKm, " km / day"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 50,
									max: 400,
									step: 10,
									value: dailyKm,
									onChange: (e) => setDailyKm(Number(e.target.value)),
									className: "w-full accent-emerald",
									"aria-label": "Avg daily distance"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 grid gap-4 sm:grid-cols-2 border-t border-border pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-mist p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block",
												children: "Conversion Capital (CAPEX)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-display text-2xl font-bold text-foreground",
												children: ["₦", totalConversionCost.toLocaleString()]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: "Estimated setup cost"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-emerald-soft/50 p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block",
												children: "Payback Period"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-display text-2xl font-bold text-forest-deep",
												children: [Math.ceil(paybackMonthsFleet), " Months"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: "ROI recovery horizon"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-emerald-gradient p-6 text-white shadow-glow-soft flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-white/80",
										children: "Monthly Fleet Savings"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display font-bold text-3xl",
										children: ["₦", Math.round(monthlySavingsFleet).toLocaleString()]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-white/60 block text-right",
										children: "Annualized"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display font-semibold text-white/90 text-sm",
										children: ["₦", Math.round(annualSavingsFleet).toLocaleString()]
									})] })]
								})
							]
						})]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-emerald-gradient p-10 text-white md:p-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl font-semibold md:text-4xl",
							children: "Run your fleet like a public company."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-white/85",
							children: "Book a discovery call with our operations team and get a tailored proposal in 5 business days."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist",
							children: ["Request consultation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Fleet as component };
