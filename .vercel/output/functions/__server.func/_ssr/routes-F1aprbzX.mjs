import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { t as Counter } from "./counter-B-Gf7BFB.mjs";
import { t as cng_detail_default } from "./cng-detail-DHUChgfd.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as MapPin, J as Fuel, K as Gauge, Ot as ArrowRight, S as ShieldCheck, _t as ChartLine, a as UsersRound, b as Sparkles, it as Cpu, n as Wrench, u as Truck, xt as Building2, z as Leaf } from "../_libs/lucide-react.mjs";
import { t as hero_default } from "./hero-DFqGf_o3.mjs";
import { t as workshop_default } from "./workshop-Dd0awOn7.mjs";
import { t as keke_fleet_default } from "./keke-fleet-DBAxAwVP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-F1aprbzX.js
var import_jsx_runtime = require_jsx_runtime();
var services = [
	{
		icon: Fuel,
		title: "CNG Vehicle Conversion",
		desc: "OEM-grade petrol-to-CNG conversion for private, commercial, and fleet vehicles.",
		href: "/services/cng-conversion"
	},
	{
		icon: Truck,
		title: "Keke Hire Purchase",
		desc: "Own a CNG tricycle with flexible repayment. Driver empowerment at scale.",
		href: "/hire-purchase"
	},
	{
		icon: Gauge,
		title: "Fleet Operations",
		desc: "Vehicle tracking, driver management, maintenance and reporting — powered by MUVA.",
		href: "/fleet"
	},
	{
		icon: Wrench,
		title: "Automobile Workshop",
		desc: "Diagnostics, engine, transmission, suspension and electrical repairs.",
		href: "/workshop"
	},
	{
		icon: ShieldCheck,
		title: "Preventive Maintenance",
		desc: "Routine servicing, inspection and vehicle health programs for peace of mind.",
		href: "/workshop"
	},
	{
		icon: ChartLine,
		title: "Fleet Consulting",
		desc: "Digitization, operations design and business advisory for fleet owners.",
		href: "/fleet"
	}
];
var values = [
	{
		icon: Sparkles,
		label: "Innovation"
	},
	{
		icon: ShieldCheck,
		label: "Safety"
	},
	{
		icon: UsersRound,
		label: "Customer First"
	},
	{
		icon: Leaf,
		label: "Sustainability"
	},
	{
		icon: Cpu,
		label: "Technology Driven"
	},
	{
		icon: Building2,
		label: "Operational Excellence"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[100svh] overflow-hidden bg-ink text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "CNG fleet at a CityView refueling depot at dusk",
					width: 1920,
					height: 1080,
					className: "absolute inset-0 h-full w-full object-cover opacity-55",
					fetchPriority: "high"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-hero-gradient opacity-70",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-x relative flex min-h-[100svh] flex-col justify-end pt-40 pb-16 md:justify-center md:pb-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-4xl animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2 w-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald" })]
								}), "Katsina · Gombe · Expanding across Africa"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]",
								children: [
									"Driving Africa's ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-emerald",
										children: "clean mobility"
									}),
									" revolution."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-2xl text-balance text-lg text-white/75 md:text-xl",
								children: "Cleaner. Cheaper. Smarter. CityView CNG delivers innovative clean-energy transportation through CNG conversion, sustainable fleet operations and world-class automotive engineering."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/services",
									className: "group inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow transition hover:bg-white",
									children: ["Explore our services", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10",
									children: "Become a fleet partner"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white backdrop-blur md:grid-cols-5",
						children: [
							{
								v: 8,
								s: "+",
								l: "Years engineering"
							},
							{
								v: 1200,
								s: "+",
								l: "Vehicles serviced"
							},
							{
								v: 650,
								s: "+",
								l: "CNG conversions"
							},
							{
								v: 2,
								s: "",
								l: "Active cities"
							},
							{
								v: 3400,
								s: "+",
								l: "Customers empowered"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-ink/40 p-6 md:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-semibold text-white md:text-4xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									end: s.v,
									suffix: s.s
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs uppercase tracking-[0.18em] text-white/50",
								children: s.l
							})]
						}, s.l))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid gap-16 lg:grid-cols-2 lg:gap-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Who we are" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl",
						children: "A serious clean-mobility company, built for the next decade of African transport."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "From our headquarters in Katsina, we design and operate the systems that make transportation cleaner and more affordable — CNG conversion, hire-purchase ownership, intelligent fleets and professional workshops."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/about",
							className: "inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep",
							children: ["Our story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/impact",
							className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-mist",
							children: "See our impact"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-3xl shadow-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cng_detail_default,
							alt: "CNG cylinder installation detail",
							width: 1200,
							height: 1200,
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-elevated md:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[0.14em] text-emerald",
								children: "CO₂ reduced"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-3xl font-semibold text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									end: 4200,
									suffix: " t"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "across our converted fleet"
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative bg-mist-gradient py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "What we do",
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Six services. One integrated ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-emerald",
								children: "clean-mobility"
							}),
							" platform."
						] }),
						description: "Every service is engineered to work together — from converting your first vehicle to running a fleet of thousands."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/services",
						className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/70",
						children: ["All services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: s.href,
						className: "group hover-lift relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep transition group-hover:bg-emerald-gradient group-hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-semibold text-foreground",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: s.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-deep",
								children: ["Learn more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-1" })]
							})
						]
					}, s.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-ink py-24 text-white md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-hero-gradient opacity-90",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white",
							children: "Our impact"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl",
							children: "Every conversion moves Africa closer to a cleaner, cheaper, smarter future."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-white/70",
							children: "We measure success by the fuel saved, the drivers empowered, and the tons of CO₂ removed from our cities."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/impact",
							className: "mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-forest-deep hover:bg-white",
							children: ["Read the full report ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4 md:grid-cols-2",
						children: [
							{
								l: "Vehicles converted",
								v: 650,
								s: "+"
							},
							{
								l: "Drivers empowered",
								v: 480,
								s: "+"
							},
							{
								l: "Litres fuel saved",
								v: 12e5,
								s: "+"
							},
							{
								l: "Tons CO₂ reduced",
								v: 4200,
								s: "+"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-4xl font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									end: s.v,
									suffix: s.s
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs uppercase tracking-[0.16em] text-white/50",
								children: s.l
							})]
						}, s.l))
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid items-center gap-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-3xl shadow-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: keke_fleet_default,
						alt: "CityView CNG keke fleet lined up",
						width: 1600,
						height: 1e3,
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Why CNG" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl",
						children: [
							"Up to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-emerald",
								children: "60% cheaper"
							}),
							" per kilometer than petrol."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "CNG burns cleaner, costs less and extends engine life. For fleet operators and everyday drivers, it's the most credible path to affordable, sustainable transport."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: [
							{
								k: "60%",
								v: "Fuel cost savings"
							},
							{
								k: "25%",
								v: "Less CO₂ emissions"
							},
							{
								k: "3×",
								v: "Longer engine life"
							},
							{
								k: "0",
								v: "Loss of performance"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-mist p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-semibold text-forest-deep",
								children: s.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: s.v
							})]
						}, s.v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/why-cng",
						className: "mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep",
						children: ["Compare petrol vs CNG ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden bg-mist py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid gap-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Automobile Workshop" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl",
						children: "Engineering-grade care for every vehicle we touch."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "Certified technicians, modern diagnostic equipment and a documented process for every job. Whether it's routine servicing or a full engine overhaul."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 grid gap-3 sm:grid-cols-2",
						children: [
							"Engine repairs",
							"Vehicle diagnosis",
							"Suspension & steering",
							"Electrical repairs",
							"Transmission",
							"General maintenance"
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-foreground shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald" }),
								" ",
								i
							]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/workshop",
						className: "mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep",
						children: ["Book an inspection ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-3xl shadow-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: workshop_default,
						alt: "CityView CNG automobile workshop",
						width: 1600,
						height: 1024,
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Our values",
					title: "Built on the values investors, governments and customers can trust.",
					align: "center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hover-lift group flex items-center gap-4 rounded-2xl border border-border bg-white p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold text-foreground",
							children: v.label
						})]
					}, v.label))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist-gradient py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Where we operate",
						title: "Growing from Northern Nigeria across the continent.",
						description: "Head office in Katsina, active operations in Gombe, and a roadmap that reaches every clean-mobility corridor in West Africa."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-5 md:grid-cols-3",
						children: [
							{
								c: "Katsina",
								tag: "Head office",
								live: true
							},
							{
								c: "Gombe",
								tag: "Active branch",
								live: true
							},
							{
								c: "Kano · Kaduna · Bauchi",
								tag: "Coming next",
								live: false
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hover-lift rounded-3xl border border-border bg-white p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: `h-6 w-6 ${b.live ? "text-emerald" : "text-muted-foreground"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground",
									children: b.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-display text-2xl font-semibold text-foreground",
									children: b.c
								})
							]
						}, b.c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/branches",
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/70",
							children: ["View all branches ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden py-20 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-4xl bg-emerald-gradient px-8 py-16 text-white shadow-elevated md:px-16 md:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-30",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl font-semibold md:text-5xl",
							children: "Ready to run cleaner, cheaper, smarter?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-white/85",
							children: "Convert your vehicle, own a CNG keke, or partner with us on a full fleet. Our team responds within one business day."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3 md:justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist",
								children: "Request a quotation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hire-purchase",
								className: "inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20",
								children: "Apply for hire purchase"
							})]
						})]
					})]
				})
			})
		})
	] });
}
//#endregion
export { Home as component };
