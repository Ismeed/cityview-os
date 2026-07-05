import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/counter-B-Gf7BFB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Counter({ end, suffix = "", prefix = "", duration = 1800 }) {
	const [value, setValue] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting && !started.current) {
					started.current = true;
					const start = performance.now();
					const step = (t) => {
						const p = Math.min(1, (t - start) / duration);
						const eased = 1 - Math.pow(1 - p, 3);
						setValue(Math.round(eased * end));
						if (p < 1) requestAnimationFrame(step);
					};
					requestAnimationFrame(step);
				}
			});
		}, { threshold: .3 });
		io.observe(ref.current);
		return () => io.disconnect();
	}, [end, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "tabular-nums",
		children: [
			prefix,
			value.toLocaleString(),
			suffix
		]
	});
}
//#endregion
export { Counter as t };
