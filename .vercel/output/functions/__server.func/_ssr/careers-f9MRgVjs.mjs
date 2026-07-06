import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading } from "./section-B6sxK-Cb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Tt as ArrowRight, yt as Briefcase } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-f9MRgVjs.js
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	{
		t: "Senior CNG Conversion Engineer",
		loc: "Katsina",
		type: "Full-time"
	},
	{
		t: "Fleet Operations Manager",
		loc: "Gombe",
		type: "Full-time"
	},
	{
		t: "Automotive Technician (Level II)",
		loc: "Katsina",
		type: "Full-time"
	},
	{
		t: "Driver Success Officer",
		loc: "Katsina · Gombe",
		type: "Full-time"
	},
	{
		t: "Product Manager — MUVA integration",
		loc: "Remote (Nigeria)",
		type: "Full-time"
	},
	{
		t: "Finance Analyst",
		loc: "Katsina",
		type: "Full-time"
	}
];
function Careers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Careers",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Build Africa's ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "clean transport"
				}),
				" future."
			] }),
			description: "We're a small team doing serious work. If you want ownership, engineering standards and real-world impact — talk to us."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Culture",
					title: "What it's like to work at CityView."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-4 md:grid-cols-3",
					children: [
						{
							t: "Engineering-led",
							d: "We ship measurable improvements, not opinions."
						},
						{
							t: "Owner-operators",
							d: "Everyone is trusted to make consequential decisions."
						},
						{
							t: "Investors in people",
							d: "Training, mentorship and a real path to ownership."
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-mist p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold text-foreground",
							children: c.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: c.d
						})]
					}, c.t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Open roles",
					title: "We're hiring."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white",
					children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-semibold text-foreground",
								children: r.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: [
									r.loc,
									" · ",
									r.type
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-forest-deep",
							children: ["Apply ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}, r.t))
				})]
			})
		})
	] });
}
//#endregion
export { Careers as component };
