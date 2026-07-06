import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero } from "./section-B6sxK-Cb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { St as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-bv86a_oY.js
var import_jsx_runtime = require_jsx_runtime();
var posts = [
	{
		cat: "CNG Education",
		t: "A driver's guide to CNG safety in Nigeria",
		d: "Everything you should know before, during and after converting your vehicle to CNG.",
		date: "Jun 2026"
	},
	{
		cat: "Company News",
		t: "CityView opens second branch in Gombe",
		d: "Our northeastern expansion begins with a full-service workshop and conversion facility.",
		date: "May 2026"
	},
	{
		cat: "Industry",
		t: "Why fleet operators are switching to CNG faster than ever",
		d: "Fuel volatility and CO₂ targets are accelerating the move — here's how to plan it.",
		date: "Apr 2026"
	},
	{
		cat: "Maintenance",
		t: "5 preventive checks that add years to your engine",
		d: "Simple monthly habits that reduce breakdowns and total cost of ownership.",
		date: "Mar 2026"
	},
	{
		cat: "CNG Education",
		t: "The economics of a CNG keke",
		d: "How a hire-purchase model plus CNG changes a driver's weekly income.",
		date: "Feb 2026"
	},
	{
		cat: "Industry",
		t: "Northern Nigeria's clean-mobility corridor is emerging",
		d: "Katsina, Gombe, Kano — the map of Africa's next mobility hub.",
		date: "Jan 2026"
	}
];
function Blog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Insights",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Clean-mobility ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gradient-emerald",
			children: "writing worth reading."
		})] }),
		description: "Deep dives, company news, and practical guidance from the people building Africa's clean transport."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hover-lift group flex flex-col rounded-3xl border border-border bg-white p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-emerald",
							children: p.cat
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl font-semibold text-foreground",
							children: p.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm text-muted-foreground",
							children: p.d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.date }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog",
								className: "inline-flex items-center gap-1 font-semibold text-forest-deep",
								children: ["Read ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition group-hover:translate-x-1" })]
							})]
						})
					]
				}, p.t))
			})
		})
	})] });
}
//#endregion
export { Blog as component };
