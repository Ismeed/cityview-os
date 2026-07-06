import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { t as Counter } from "./counter-B-Gf7BFB.mjs";
import { t as cng_detail_default } from "./cng-detail-DHUChgfd.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { St as ArrowRight, bt as Award, et as Compass, m as Target } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-17IBKCN8.js
var import_jsx_runtime = require_jsx_runtime();
var timeline = [
	{
		y: "2018",
		t: "Founded in Katsina",
		d: "CityView begins as a specialist automobile workshop serving Northern Nigeria."
	},
	{
		y: "2020",
		t: "First CNG conversions",
		d: "We pioneer petrol-to-CNG conversion for commercial fleets in the region."
	},
	{
		y: "2022",
		t: "Keke Hire Purchase launched",
		d: "Empowering hundreds of drivers to own CNG-powered tricycles."
	},
	{
		y: "2024",
		t: "MUVA fleet platform",
		d: "We integrate MUVA Mobility to run intelligent, digitized fleet operations."
	},
	{
		y: "2026",
		t: "West Africa expansion",
		d: "Gombe goes live. Katsina head office expanded. Kano, Kaduna and Bauchi are next."
	}
];
var leaders = [
	{
		name: "Alhaji Mustapha Ibrahim",
		role: "Founder & Managing Director",
		bio: "Over 15 years of experience in transportation operations and strategic investments in Northern Nigeria."
	},
	{
		name: "Engr. Yusuf Bello",
		role: "Head of CNG Engineering",
		bio: "Certified automotive engineer specialized in alternative energy conversions with over 8 years in CNG systems."
	},
	{
		name: "Dr. Grace Olamide",
		role: "Director of Fleet Operations",
		bio: "Expert in transit logistics and smart mobility technologies, leading our integration with the MUVA platform."
	},
	{
		name: "Mariam Katsina",
		role: "Head of Finance & Partnerships",
		bio: "Ex-investment banker focused on sustainable growth, hire-purchase operations, and corporate partnerships."
	}
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "About us",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Building the infrastructure for ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "clean mobility"
				}),
				" in Africa."
			] }),
			description: "From a single workshop in Katsina to a growing clean-energy transport company operating across Northern Nigeria — with a roadmap to reach the entire continent."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid gap-16 lg:grid-cols-[1.1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Our story" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl",
						children: "A serious company, engineered patiently."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground",
						children: "CityView CNG Automobile Synergy was founded to solve one of Africa's hardest problems: making transportation cleaner and more affordable without slowing anyone down. We started with a workshop, added CNG conversion, then built the operations layer to run entire fleets. Today, we're one of the fastest-growing clean-mobility companies in Northern Nigeria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-3",
						children: [
							{
								v: 8,
								s: "+",
								l: "Years"
							},
							{
								v: 2,
								s: "",
								l: "Cities"
							},
							{
								v: 60,
								s: "+",
								l: "Team members"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-mist p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-semibold text-forest-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									end: s.v,
									suffix: s.s
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground",
								children: s.l
							})]
						}, s.l))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-3xl shadow-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cng_detail_default,
						alt: "CNG engineering detail",
						width: 1200,
						height: 1200,
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist-gradient py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Vision · Mission · Values",
					title: "What guides everything we build.",
					align: "center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3",
					children: [
						{
							icon: Compass,
							t: "Vision",
							d: "To become Africa's leading clean mobility company by making transportation cleaner, cheaper, smarter, and more sustainable."
						},
						{
							icon: Target,
							t: "Mission",
							d: "Deliver innovative clean-energy transportation solutions through CNG conversion, sustainable fleet operations, smart mobility technology and customer-focused services."
						},
						{
							icon: Award,
							t: "Values",
							d: "Innovation. Integrity. Safety. Affordability. Reliability. Customer First. Sustainability. Operational Excellence. Technology Driven."
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-8 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-7 w-7 text-emerald" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-2xl font-semibold text-foreground",
								children: c.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: c.d
							})
						]
					}, c.t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Our journey",
					title: "A steady, deliberate growth story."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-8 md:grid-cols-5",
					children: timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl font-semibold text-emerald",
									children: t.y
								}), i < timeline.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden h-px flex-1 bg-border md:block" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold text-foreground",
								children: t.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: t.d
							})
						]
					}, t.y))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24 md:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Leadership",
					title: "Driven by industry pioneers.",
					description: "Our team combines engineering excellence with local operational expertise to build Africa's clean energy mobility corridor."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: leaders.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hover-lift rounded-3xl border border-border bg-white p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-forest-deep font-display font-semibold text-lg",
								children: l.name.split(" ").map((n) => n[0]).join("")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-semibold text-foreground",
								children: l.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wider text-emerald mt-1",
								children: l.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground",
								children: l.bio
							})
						]
					}, l.name))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-emerald-gradient p-10 text-white shadow-elevated md:p-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl font-semibold md:text-4xl",
						children: "Partner with the people building Africa's clean transport."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist",
							children: ["Talk to our team ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/careers",
							className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20",
							children: "Join us"
						})]
					})]
				})
			})
		})
	] });
}
//#endregion
export { About as component };
