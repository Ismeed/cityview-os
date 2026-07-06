import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-CvAI6anB.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ variant = "dark", showTagline = false }) {
	const isLightBg = variant === "dark";
	const cityColor = isLightBg ? "text-[#0D47A1]" : "text-white";
	const viewColor = "text-[#2ECC71]";
	const subtextColor = isLightBg ? "text-[#4B5563]" : "text-[#E5E7EB]/80";
	const taglineColor = "text-[#2ECC71]";
	const dividerColor = isLightBg ? "border-[#E5E7EB]" : "border-white/10";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "group flex flex-col items-start gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-11 w-11 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 40 40",
					className: "h-full w-full",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 33,20 C 33,8.5 25.5,4 17,4 C 8.5,4 3,11 3,20 C 3,28.5 9,33.5 17.5,33.5",
							stroke: "#0E8A3E",
							strokeWidth: "2",
							strokeLinecap: "round",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "10",
							y: "11",
							width: "3.5",
							height: "11",
							fill: "#2ECC71",
							rx: "0.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "14.5",
							y: "7",
							width: "4.5",
							height: "15",
							fill: "#0E8A3E",
							rx: "0.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "20",
							y: "13",
							width: "3.5",
							height: "9",
							fill: "#2ECC71",
							rx: "0.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
							points: "33,12 37,15.5 33,19 29,15.5",
							fill: isLightBg ? "#FFFFFF" : "#0D47A1",
							stroke: "#0E8A3E",
							strokeWidth: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: "33",
							y: "17.2",
							fontSize: "3.8",
							fontFamily: "sans-serif",
							fontWeight: "900",
							fill: "#0E8A3E",
							textAnchor: "middle",
							children: "CNG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 5,23 C 11,31.5 22.5,34 32.5,28 C 26.5,30 16.5,28.5 11.5,22.5 Z",
							fill: "#0D47A1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 12,29.5 C 18,33 27.5,32 33.5,24.5 C 27.5,28.5 18,27.5 13,23 Z",
							fill: "#2ECC71"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 13.5,22 L 13.5,17 C 13.5,15 15,14 18,14 C 21,14 22.5,15 22.5,17 L 22.5,22 Z",
							fill: isLightBg ? "#0D47A1" : "#FFFFFF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 14.5,18 L 21.5,18 L 20.5,22 L 15.5,22 Z",
							fill: "#0E8A3E"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "15",
							y: "15",
							width: "6",
							height: "2.5",
							fill: "#E5E7EB",
							rx: "0.3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "15.5",
							cy: "20.5",
							r: "0.75",
							fill: "#FBBF24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "20.5",
							cy: "20.5",
							r: "0.75",
							fill: "#FBBF24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "17.2",
							y: "19",
							width: "1.6",
							height: "2",
							fill: "#1F2937",
							rx: "0.2"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col leading-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-[22px] font-black tracking-tight flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cityColor,
						children: "CITY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: viewColor,
						children: "VIEW"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-[8.5px] font-bold uppercase tracking-[0.2em] mt-1 ${subtextColor}`,
					children: "CNG AUTOMOBILE SYNERGY"
				})]
			})]
		}), showTagline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mt-2 w-full pt-1.5 border-t ${dividerColor} flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.22em] ${taglineColor}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLEANER" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/40",
					children: "•"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHEAPER" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/40",
					children: "•"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SMARTER" })
			]
		})]
	});
}
//#endregion
export { Logo as t };
