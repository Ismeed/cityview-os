import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/section-B6sxK-Cb.js
var import_jsx_runtime = require_jsx_runtime();
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 rounded-full border border-forest/15 bg-emerald-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-deep",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald" }),
			" ",
			children
		]
	});
}
function SectionHeading({ eyebrow, title, description, align = "left" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col gap-4 ${align === "center" ? "text-center items-center" : ""}`,
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eyebrow }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-balance text-base text-muted-foreground md:text-lg",
				children: description
			})
		]
	});
}
function PageHero({ eyebrow, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-hero-gradient pt-36 pb-24 text-white md:pt-44 md:pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 opacity-40",
			"aria-hidden": true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald/30 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 bottom-0 h-96 w-96 rounded-full bg-forest/40 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl animate-fade-up",
				children: [
					eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald" }),
							" ",
							eyebrow
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl",
						children: title
					}),
					description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-balance text-lg text-white/70 md:text-xl",
						children: description
					}),
					children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children
					})
				]
			})
		})]
	});
}
//#endregion
export { PageHero as n, SectionHeading as r, Eyebrow as t };
