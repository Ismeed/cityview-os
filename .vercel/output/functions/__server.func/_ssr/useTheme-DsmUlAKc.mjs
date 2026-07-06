import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTheme-DsmUlAKc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("cityview_theme");
			if (saved === "light" || saved === "dark") return saved;
			return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		return "light";
	});
	(0, import_react.useEffect)(() => {
		const root = window.document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("cityview_theme", theme);
	}, [theme]);
	const toggleTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light");
	return {
		theme,
		toggleTheme
	};
}
//#endregion
export { useTheme as t };
