import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero } from "./section-B6sxK-Cb.mjs";
import { t as cng_detail_default } from "./cng-detail-DHUChgfd.mjs";
import { t as hero_default } from "./hero-DFqGf_o3.mjs";
import { t as workshop_default } from "./workshop-Dd0awOn7.mjs";
import { t as keke_fleet_default } from "./keke-fleet-DBAxAwVP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-BXFQCuHw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Gallery() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const shots = [
		{
			src: hero_default,
			alt: "CNG Refueling Depot Katsina Head Office",
			category: "facilities",
			span: "md:col-span-2 md:row-span-2"
		},
		{
			src: workshop_default,
			alt: "State-of-the-Art Workshop Facility",
			category: "facilities",
			span: ""
		},
		{
			src: cng_detail_default,
			alt: "High-Pressure CNG Cylinder Installation",
			category: "conversions",
			span: ""
		},
		{
			src: keke_fleet_default,
			alt: "CNG Tricycle Keke Fleet Handover",
			category: "vehicles",
			span: "md:col-span-2"
		},
		{
			src: workshop_default,
			alt: "Certified Engineers Performing Conversions",
			category: "workshop",
			span: ""
		},
		{
			src: cng_detail_default,
			alt: "Automotive Diagnostics and Tuning",
			category: "workshop",
			span: ""
		},
		{
			src: keke_fleet_default,
			alt: "Happy Fleet Driver Receiving Key",
			category: "customers",
			span: ""
		},
		{
			src: hero_default,
			alt: "Laying Foundation for Gombe Depot",
			category: "facilities",
			span: ""
		},
		{
			src: workshop_default,
			alt: "Grand Opening and Ribbon Cutting Event",
			category: "events",
			span: "md:col-span-2"
		}
	];
	const categories = [
		{
			value: "all",
			label: "All Photos"
		},
		{
			value: "workshop",
			label: "Workshop"
		},
		{
			value: "conversions",
			label: "Conversions"
		},
		{
			value: "vehicles",
			label: "Vehicles"
		},
		{
			value: "customers",
			label: "Customers"
		},
		{
			value: "events",
			label: "Events"
		},
		{
			value: "facilities",
			label: "Facilities"
		}
	];
	const filteredShots = filter === "all" ? shots : shots.filter((s) => s.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Gallery",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Inside the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "CityView"
			}),
			" operation."
		] }),
		description: "Facilities, fleets, technicians and the customers we serve."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-12 flex flex-wrap justify-center gap-2",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(c.value),
					className: `rounded-full px-5 py-2 text-sm font-semibold transition ${filter === c.value ? "bg-forest text-white shadow-md" : "bg-mist text-muted-foreground hover:bg-mist/85"}`,
					children: c.label
				}, c.value))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 transition-all duration-500",
				children: filteredShots.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `group relative overflow-hidden rounded-3xl ${s.span} border border-border shadow-soft`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: s.src,
							alt: s.alt,
							loading: "lazy",
							className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-6 left-6 right-6 text-white opacity-0 transition duration-300 group-hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block rounded-full bg-emerald/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-deep",
								children: s.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-2 font-display text-lg font-semibold leading-tight",
								children: s.alt
							})]
						})
					]
				}, i))
			})]
		})
	})] });
}
//#endregion
export { Gallery as component };
