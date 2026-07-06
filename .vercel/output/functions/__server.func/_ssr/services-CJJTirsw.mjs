import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero } from "./section-B6sxK-Cb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Fuel, K as Gauge, Ot as ArrowRight, S as ShieldCheck, _t as ChartLine, n as Wrench, u as Truck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-CJJTirsw.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		icon: Fuel,
		t: "CNG Vehicle Conversion",
		d: "OEM-grade petrol-to-CNG conversion for private, commercial and fleet vehicles.",
		href: "/services/cng-conversion",
		bullets: [
			"Petrol to CNG",
			"Commercial vehicles",
			"Private vehicles",
			"Fleet conversion"
		]
	},
	{
		icon: Truck,
		t: "Keke Hire Purchase",
		d: "Own a CNG tricycle with flexible repayment. Empowering drivers across Nigeria.",
		href: "/hire-purchase",
		bullets: [
			"Own a CNG Keke",
			"Flexible repayment",
			"Affordable ownership",
			"Driver empowerment"
		]
	},
	{
		icon: Gauge,
		t: "Fleet Operations",
		d: "Tracking, driver management, maintenance and reporting — powered by MUVA Mobility.",
		href: "/fleet",
		bullets: [
			"Fleet management",
			"Driver management",
			"Technology & telematics",
			"Reporting"
		]
	},
	{
		icon: Wrench,
		t: "Automobile Workshop",
		d: "Professional mechanics, modern diagnostics, transparent process.",
		href: "/workshop",
		bullets: [
			"Engine repairs",
			"Vehicle diagnosis",
			"Suspension",
			"Electrical & transmission"
		]
	},
	{
		icon: ShieldCheck,
		t: "Preventive Maintenance",
		d: "Routine servicing to keep your vehicle healthy and reliable.",
		href: "/workshop",
		bullets: [
			"Routine servicing",
			"Oil changes",
			"Inspections",
			"Vehicle health reports"
		]
	},
	{
		icon: ChartLine,
		t: "Fleet Consulting",
		d: "We help fleet owners digitize operations and build sustainable businesses.",
		href: "/fleet",
		bullets: [
			"Fleet digitization",
			"Operations design",
			"Business advisory",
			"Growth strategy"
		]
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "What we do",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"An ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "integrated platform"
			}),
			" for clean mobility."
		] }),
		description: "Six connected services that make clean transportation practical, affordable and profitable across Nigeria and beyond."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x grid gap-6 md:grid-cols-2",
			children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hover-lift group flex flex-col rounded-3xl border border-border bg-white p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep group-hover:bg-emerald-gradient group-hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-display text-2xl font-semibold text-foreground",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: s.d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2",
						children: s.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald" }),
								" ",
								b
							]
						}, b))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: s.href,
						className: "mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-deep",
						children: ["Explore service ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-1" })]
					})
				]
			}, s.t))
		})
	})] });
}
//#endregion
export { Services as component };
