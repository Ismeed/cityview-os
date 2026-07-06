import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { t as cng_detail_default } from "./cng-detail-DHUChgfd.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { St as ArrowRight, it as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.cng-conversion-MZXCp29o.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "CNG Conversion",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Petrol in. ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "CNG out."
				}),
				" Same car — cheaper, cleaner."
			] }),
			description: "Certified conversion for private, commercial and fleet vehicles. Backed by warranty, safety-tested, and priced for real Nigerian operators.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-white",
					children: ["Book conversion ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/why-cng",
					className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20",
					children: "Why CNG?"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x grid items-center gap-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-3xl shadow-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cng_detail_default,
						alt: "CNG kit installation",
						width: 1200,
						height: 1200,
						loading: "lazy",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The process" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-4xl font-semibold md:text-5xl",
						children: "Four steps, one afternoon, years of savings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-4",
						children: [
							{
								n: "01",
								t: "Vehicle assessment",
								d: "We inspect and certify your vehicle for safe CNG conversion."
							},
							{
								n: "02",
								t: "Cylinder & kit fitting",
								d: "Certified cylinders and OEM-grade kits installed by trained technicians."
							},
							{
								n: "03",
								t: "Tuning & safety test",
								d: "ECU calibration, leak testing and road certification before handover."
							},
							{
								n: "04",
								t: "Aftercare",
								d: "Warranty coverage, priority servicing and refueling network access."
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-5 rounded-2xl border border-border bg-white p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-semibold text-emerald",
								children: s.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-semibold text-foreground",
								children: s.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: s.d
							})] })]
						}, s.n))
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "What's included",
					title: "Everything you need — nothing you don't."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: [
						"Certified CNG cylinder",
						"OEM-grade conversion kit",
						"Injectors & regulator",
						"ECU calibration",
						"Safety leak test",
						"Road certification",
						"12-month warranty",
						"Priority servicing",
						"Refueling network access"
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-foreground",
							children: i
						})]
					}, i))
				})]
			})
		})
	] });
}
//#endregion
export { Page as component };
