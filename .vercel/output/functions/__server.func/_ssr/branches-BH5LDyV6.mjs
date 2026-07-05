import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading } from "./section-B6sxK-Cb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Phone, Z as Clock, j as MapPin, v as ShieldCheck, vt as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/branches-BH5LDyV6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var branches = [
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
	{
		c: "Kano",
		tag: "Opening Q3 2026",
		live: false,
		details: "Conversion hub under construction. Equipment intake stage.",
		x: 330,
		y: 100
	},
	{
		c: "Kaduna",
		tag: "Opening Q4 2026",
		live: false,
		details: "Refueling station site acquired. Permitting finalized.",
		x: 260,
		y: 170
	},
	{
		c: "Bauchi",
		tag: "Planned 2027",
		live: false,
		details: "Feasibility study completed. Partner discussions active.",
		x: 410,
		y: 160
	},
	{
		c: "Abuja",
		tag: "Planned 2027",
		live: false,
		details: "Strategic capital hub. Site scouting active.",
		x: 280,
		y: 260
	}
];
function Branches() {
	const [selected, setSelected] = (0, import_react.useState)(branches[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Branches",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Northern Nigeria today. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "Africa tomorrow."
			})] }),
			description: "We build slowly and permanently. Every new city gets the same engineering, the same service, the same guarantees."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24 border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Interactive map",
					title: "Our expansion network",
					description: "Click on any city node to view branch details, active hours, and facility capabilities."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl border border-border bg-mist/50 p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-4 left-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
								children: "Nigeria Expansion Map"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "w-full max-w-[600px] h-[320px]",
								viewBox: "0 0 600 320",
								xmlns: "http://www.w3.org/2000/svg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M 50 40 Q 300 20 550 50 Q 580 180 500 280 Q 280 310 100 290 Q 30 180 50 40 Z",
										fill: "#E8ECE9",
										stroke: "#CFD5D0",
										strokeWidth: "2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "220",
										y1: "60",
										x2: "330",
										y2: "100",
										stroke: "#10B981",
										strokeWidth: "2",
										strokeDasharray: "5,5",
										opacity: "0.6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "330",
										y1: "100",
										x2: "480",
										y2: "180",
										stroke: "#10B981",
										strokeWidth: "2",
										strokeDasharray: "5,5",
										opacity: "0.6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "330",
										y1: "100",
										x2: "260",
										y2: "170",
										stroke: "#94A3B8",
										strokeWidth: "1",
										strokeDasharray: "3,3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "260",
										y1: "170",
										x2: "280",
										y2: "260",
										stroke: "#94A3B8",
										strokeWidth: "1",
										strokeDasharray: "3,3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "410",
										y1: "160",
										x2: "480",
										y2: "180",
										stroke: "#94A3B8",
										strokeWidth: "1",
										strokeDasharray: "3,3"
									}),
									branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										className: "cursor-pointer",
										onClick: () => setSelected(b),
										children: [
											selected.c === b.c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: b.x,
												cy: b.y,
												r: "16",
												fill: "none",
												stroke: b.live ? "#10B981" : "#94A3B8",
												strokeWidth: "2",
												className: "animate-pulse"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: b.x,
												cy: b.y,
												r: selected.c === b.c ? "8" : "6",
												fill: b.live ? "#10B981" : b.tag.includes("Opening") ? "#FBBF24" : "#94A3B8",
												className: "transition-all duration-300 hover:scale-125"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
												x: b.x,
												y: b.y - 12,
												textAnchor: "middle",
												className: `text-[11px] font-display font-semibold transition ${selected.c === b.c ? "fill-forest-deep font-bold scale-105" : "fill-muted-foreground"}`,
												children: b.c
											})
										]
									}, b.c))
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 mt-4 text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-t border-border/60 pt-4 w-full justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald" }), " Active Hub"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400" }), " Opening Soon"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-slate-400" }), " Planned corridor"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl border border-border bg-white p-8 shadow-elevated min-h-[380px] flex flex-col justify-between animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-3xl font-semibold text-foreground",
										children: selected.c
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${selected.live ? "bg-emerald text-forest-deep" : "bg-mist text-muted-foreground"}`,
										children: selected.tag
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-sm leading-relaxed text-muted-foreground",
									children: selected.details
								}),
								selected.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-6 space-y-4 text-sm",
									children: [
										selected.addr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 border-b border-border/50 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-emerald shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-medium text-foreground",
												children: selected.addr
											})] })]
										}),
										selected.hours && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3 border-b border-border/50 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-emerald shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Opening Hours"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-medium text-foreground",
												children: selected.hours
											})] })]
										}),
										selected.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-emerald shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: "Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-semibold text-forest-deep",
												children: selected.phone
											})] })]
										})
									]
								})
							] }),
							!selected.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-mist border border-border/60 p-4 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "This site is part of our upcoming clean mobility grid expansion. For early commercial partner inquiries, please contact headquarters."
								})]
							}),
							selected.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								className: "mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition",
								children: ["Contact this branch ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Primary Hub",
					title: "Headquarters Katsina Map"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-4xl border border-border shadow-elevated mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "CityView CNG Katsina head office",
						src: "https://www.google.com/maps?q=Katsina,Nigeria&output=embed",
						className: "h-[420px] w-full border-0",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					})
				})]
			})
		})
	] });
}
//#endregion
export { Branches as component };
