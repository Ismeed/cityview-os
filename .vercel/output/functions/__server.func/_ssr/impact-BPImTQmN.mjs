import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero } from "./section-B6sxK-Cb.mjs";
import { t as Counter } from "./counter-B-Gf7BFB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { yt as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impact-BPImTQmN.js
var import_jsx_runtime = require_jsx_runtime();
function Impact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Our impact",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Impact you can ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "measure"
				}),
				". Growth you can see."
			] }),
			description: "We don't guess. Every metric on this page is measured across our real operations."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						v: 650,
						s: "+",
						l: "Vehicles converted",
						d: "Certified petrol-to-CNG conversions across private and commercial."
					},
					{
						v: 480,
						s: "+",
						l: "Drivers empowered",
						d: "Keke drivers on hire-purchase paths to ownership."
					},
					{
						v: 12e5,
						s: "+",
						l: "Litres fuel saved",
						d: "Cumulative petrol displaced by our converted fleet."
					},
					{
						v: 4200,
						s: "+",
						l: "Tons CO₂ reduced",
						d: "Verified emissions avoided by moving vehicles to CNG."
					},
					{
						v: 2,
						s: "",
						l: "Cities served",
						d: "Katsina (head office) and Gombe (active branch)."
					},
					{
						v: 8,
						s: "+",
						l: "Years of engineering",
						d: "Building trust vehicle by vehicle since 2018."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-8 shadow-soft hover-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-5xl font-semibold text-forest-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
								end: s.v,
								suffix: s.s
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xs uppercase tracking-[0.16em] text-emerald",
							children: s.l
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: s.d
						})
					]
				}, s.l))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-emerald-gradient p-10 text-white md:p-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl font-semibold md:text-5xl",
							children: "Investors, government, corporates — let's compound this impact together."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-white/85",
							children: "Partner with the fastest-growing clean mobility company in Northern Nigeria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-forest-deep hover:bg-mist",
							children: ["Contact partnerships ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Impact as component };
