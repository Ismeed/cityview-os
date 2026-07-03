import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ChevronDown, K as ArrowRight, V as Calculator, d as ShieldCheck, x as Leaf } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/why-cng-JKb0Is4E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var faqs = [
	{
		q: "Is CNG safe for my vehicle?",
		a: "Yes. CNG cylinders are manufactured from high-strength steel or carbon fiber composite, built to withstand extremely high impacts and crash conditions. They are certified to international standards and are significantly safer than traditional petrol tanks because CNG has a high ignition temperature and dissipates quickly if a leak occurs. Every conversion is safety-tested before handover."
	},
	{
		q: "Will my engine performance change after conversion?",
		a: "No noticeable loss of performance for daily driving. Our premium sequential gas injection systems calibrate the air-fuel mixture dynamically. Some drivers report smoother engine running, less vibration, and double the longevity of engine oil due to the clean-burning properties of natural gas."
	},
	{
		q: "Where can I refuel my CNG vehicle?",
		a: "Our conversions include access to CityView's expanding refueling network in Katsina and Gombe, plus partner mother-daughter stations across Northern Nigeria. The network is growing rapidly to support inter-city mobility."
	},
	{
		q: "How long does a vehicle conversion take?",
		a: "A standard petrol-to-CNG conversion for a private sedan or commercial minibus takes between 24 to 48 hours at our Katsina or Gombe workshops. This includes cylinder mounting, gas injector installation, ECU programming, and rigorous safety pressure testing."
	},
	{
		q: "How much does a conversion cost and what is the payback?",
		a: "Conversion costs range from ₦350,000 for tricycles (Kekes) up to ₦750,000–₦950,000 for sedans and commercial passenger buses. With fuel cost savings averaging 60%, most high-use commercial drivers and fleet operators recover their conversion investment within 3 to 5 months."
	},
	{
		q: "Does CNG conversion void my vehicle warranty?",
		a: "We install OEM-grade components and provide our own comprehensive 12-month warranty on the entire CNG system and conversion labor. For manufacturer warranties, we advise checking on a per-vehicle basis."
	}
];
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
function WhyCNG() {
	const [vehicle, setVehicle] = (0, import_react.useState)("sedan");
	const [dailyKm, setDailyKm] = (0, import_react.useState)(150);
	const [petrolPrice, setPetrolPrice] = (0, import_react.useState)(950);
	const [cngPrice, setCngPrice] = (0, import_react.useState)(230);
	const [customConsumption, setCustomConsumption] = (0, import_react.useState)(9.5);
	(0, import_react.useEffect)(() => {
		setCustomConsumption(vehiclePresets[vehicle].consumption);
	}, [vehicle]);
	const monthlyKm = dailyKm * 30;
	const yearlyKm = dailyKm * 365;
	const petrolLitersPerMonth = monthlyKm / 100 * customConsumption;
	const petrolLitersPerYear = yearlyKm / 100 * customConsumption;
	const monthlyPetrolCost = petrolLitersPerMonth * petrolPrice;
	const yearlyPetrolCost = petrolLitersPerYear * petrolPrice;
	const cngScmPerMonth = petrolLitersPerMonth * 1.1;
	const cngScmPerYear = petrolLitersPerYear * 1.1;
	const monthlyCngCost = cngScmPerMonth * cngPrice;
	const yearlyCngCost = cngScmPerYear * cngPrice;
	const monthlySavings = monthlyPetrolCost - monthlyCngCost;
	const yearlySavings = yearlyPetrolCost - yearlyCngCost;
	const petrolCo2PerYear = petrolLitersPerYear * 2.3 / 1e3;
	const cngCo2PerYear = cngScmPerYear * 1.9 / 1e3;
	const co2SavedPerYear = Math.max(0, petrolCo2PerYear - cngCo2PerYear);
	const conversionCost = vehiclePresets[vehicle].cost;
	const paybackMonths = monthlySavings > 0 ? conversionCost / monthlySavings : 0;
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Why CNG",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The math is simple. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "CNG wins."
			})] }),
			description: "Cheaper per kilometer. Cleaner emissions. Longer engine life. Calculate your operational savings below."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Petrol vs CNG",
					title: "Side by side comparison",
					description: "How the fuel sources stack up in cost, environment, and vehicle reliability."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-6 lg:grid-cols-2",
					children: [{
						t: "Premium Petrol",
						color: "bg-mist border-border/80",
						badge: "Traditional Fuel",
						badgeColor: "bg-muted text-muted-foreground",
						points: [
							{
								label: "Fuel Price",
								val: `₦${petrolPrice}/L`,
								desc: "Subject to constant subsidy removals & price hikes"
							},
							{
								label: "Cost Per Kilometer",
								val: `~₦${Math.round(customConsumption / 100 * petrolPrice)}/km`,
								desc: "High fuel expense reduces driver margins"
							},
							{
								label: "CO₂ Emissions",
								val: "High carbon footprint",
								desc: "Produces ~2.3 kg of CO₂ for every liter burned"
							},
							{
								label: "Engine Wear",
								val: "Standard Carbon Build-up",
								desc: "Dirty combustion creates soot, requiring frequent oil changes"
							}
						]
					}, {
						t: "Compressed Natural Gas (CNG)",
						color: "bg-emerald-soft/50 border-emerald/20 shadow-glow-soft",
						badge: "Recommended",
						badgeColor: "bg-emerald text-forest-deep",
						points: [
							{
								label: "Fuel Price",
								val: `₦${cngPrice}/SCM`,
								desc: "Locally sourced gas, stable and heavily subsidized"
							},
							{
								label: "Cost Per Kilometer",
								val: `~₦${Math.round(customConsumption / 100 * 1.1 * cngPrice)}/km`,
								desc: "Save up to 60% per kilometer immediately"
							},
							{
								label: "CO₂ Emissions",
								val: "25% Less CO₂",
								desc: "Cleaner carbon profile, zero sulfur emissions"
							},
							{
								label: "Engine Wear",
								val: "3× Longer Engine Life",
								desc: "No residue, zero carbon build-up, extends spark plug & oil life"
							}
						]
					}].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-4xl border p-8 flex flex-col justify-between ${c.color}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-semibold text-foreground",
								children: c.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${c.badgeColor}`,
								children: c.badge
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-8 space-y-6",
							children: c.points.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border/50 pb-4 last:border-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: p.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl font-semibold text-forest-deep",
										children: p.val
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: p.desc
									})]
								})]
							}, idx))
						})] })
					}, c.t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist-gradient py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[0.9fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Interactive savings calculator" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display text-4xl font-semibold md:text-5xl",
							children: "Calculate your clean mobility ROI."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground",
							children: "Enter your average daily operations mileage and fuel prices to estimate how quickly a CityView CNG conversion will pay for itself and start contributing to your bottom line."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white p-5 border border-border flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl bg-emerald/10 p-2 text-emerald",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-2xl font-display font-semibold text-forest-deep",
									children: [co2SavedPerYear.toFixed(1), " t"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "CO₂ Saved / Year"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white p-5 border border-border flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl bg-emerald/10 p-2 text-emerald",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-display font-semibold text-forest-deep",
									children: paybackMonths > 12 ? "1 Year+" : `${Math.ceil(paybackMonths)} ${paybackMonths <= 1 ? "Month" : "Months"}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Conversion Payback"
								})] })]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl border border-border bg-white p-8 shadow-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pb-6 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-foreground",
								children: "Savings & Payback Estimator"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3",
									children: "Vehicle Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
									children: Object.entries(vehiclePresets).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setVehicle(key),
										className: `rounded-2xl border py-3 px-2 text-xs font-semibold text-center transition ${vehicle === key ? "border-forest bg-forest/5 text-forest-deep font-bold" : "border-border bg-white text-muted-foreground hover:bg-mist"}`,
										children: value.label
									}, key))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily Distance Driven" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-forest-deep font-bold",
											children: [dailyKm, " km / day"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 20,
										max: 500,
										step: 10,
										value: dailyKm,
										onChange: (e) => setDailyKm(Number(e.target.value)),
										className: "w-full accent-emerald",
										"aria-label": "Daily distance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-muted-foreground mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "20 km" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "150 km" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "300 km" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "500 km" })
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "Petrol Price (₦/Liter)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: petrolPrice,
										onChange: (e) => setPetrolPrice(Math.max(0, Number(e.target.value))),
										className: "w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold text-forest-deep focus:outline-emerald"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1",
										children: "CNG Price (₦/SCM)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: cngPrice,
										onChange: (e) => setCngPrice(Math.max(0, Number(e.target.value))),
										className: "w-full rounded-xl border border-border px-3 py-2 text-sm font-semibold text-forest-deep focus:outline-emerald"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fuel Consumption (L/100km)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-forest-deep font-bold",
										children: [customConsumption, " Liters"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 3,
									max: 30,
									step: .5,
									value: customConsumption,
									onChange: (e) => setCustomConsumption(Number(e.target.value)),
									className: "w-full accent-emerald",
									"aria-label": "Fuel consumption"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 grid gap-4 sm:grid-cols-3 border-t border-border pt-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-mist p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block",
												children: "Petrol / Month"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-display text-xl font-semibold text-foreground",
												children: ["₦", Math.round(monthlyPetrolCost).toLocaleString()]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-mist p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block",
												children: "CNG / Month"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-display text-xl font-semibold text-foreground",
												children: ["₦", Math.round(monthlyCngCost).toLocaleString()]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-emerald-gradient p-4 text-white shadow-glow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold uppercase tracking-wider text-white/80 block",
												children: "Savings / Month"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-display text-xl font-bold",
												children: ["₦", Math.round(monthlySavings).toLocaleString()]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-dashed border-border p-4 flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Estimated Annual Savings:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display font-semibold text-emerald text-lg",
										children: ["₦", Math.round(yearlySavings).toLocaleString()]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/contact",
										className: "inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition",
										children: ["Book Conversion ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
									})]
								})
							]
						})]
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x mx-auto max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "FAQ",
					title: "Frequently asked questions.",
					align: "center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 space-y-3",
					children: faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-3xl border border-border bg-white transition hover:shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpen(open === i ? null : i),
							className: "flex w-full items-center justify-between gap-4 p-6 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold text-foreground",
								children: f.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-5 w-5 text-emerald transition duration-300 ${open === i ? "rotate-180" : ""}` })]
						}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border/50 bg-mist/30 p-6 text-sm leading-relaxed text-muted-foreground animate-fade-in",
							children: f.a
						})]
					}, i))
				})]
			})
		})
	] });
}
//#endregion
export { WhyCNG as component };
