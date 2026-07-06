import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Mail, P as Lock, _ as Shield, c as UserCheck, ft as Building2, yt as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as mockUsers } from "./mockData-GGYQI-9Q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Logo } from "./logo-CvAI6anB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-B9qfFDEj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cityview_user_session")) navigate({ to: "/admin" });
		}
	}, [navigate]);
	const handleLogin = (e) => {
		if (e) e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password);
			if (user) {
				localStorage.setItem("cityview_user_session", JSON.stringify(user));
				toast.success("Access Granted", { description: `Logged in as ${user.name} (${user.role})` });
				navigate({ to: "/admin" });
			} else toast.error("Authentication Failed", { description: "Invalid email address or password. Please try again." });
			setLoading(false);
		}, 600);
	};
	const selectDemoAccount = (user) => {
		setEmail(user.email);
		setPassword(user.passwordHash);
		toast.info("Demo credentials selected", { description: `Auto-filled form for ${user.role} (${user.branchName})` });
		setTimeout(() => {
			setLoading(true);
			localStorage.setItem("cityview_user_session", JSON.stringify(user));
			toast.success("Access Granted", { description: `Logged in as ${user.name} (${user.role})` });
			navigate({ to: "/admin" });
			setLoading(false);
		}, 400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-[100svh] flex flex-col justify-center items-center bg-ink text-white/90 overflow-hidden font-sans p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-hero-gradient opacity-60 z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -left-40 w-96 h-96 bg-emerald/10 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -right-40 w-96 h-96 bg-forest/20 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 flex flex-col justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald tracking-wide",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), "Role-Based Access Control Active"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight",
								children: [
									"CityView Operations ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-emerald to-green-400 bg-clip-text text-transparent",
										children: "Control Center"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/60 max-w-xl",
								children: "Internal Enterprise Resource Planning (ERP) platform for vehicle tracking, CNG conversions, workshop repairs, and fleet hire purchase operations."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-white/15 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display font-bold text-lg text-white flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-5 w-5 text-emerald" }), "UAT Demo Credentials"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-white/40",
								children: "Click any account below to instantly auto-fill and log in"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono bg-emerald/20 text-emerald-light border border-emerald/30 px-2 py-0.5 rounded-full",
								children: "V1.0 Ready"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
							children: mockUsers.map((user) => {
								const isSuperAdmin = user.role === "Super Admin";
								const isFleet = user.department.includes("Fleet");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => selectDemoAccount(user),
									className: "flex flex-col text-left p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-emerald/40 transition-all duration-300 group cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xs font-bold ${isSuperAdmin ? "text-amber-400" : isFleet ? "text-blue-400" : "text-emerald-400"}`,
												children: user.role
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60",
												children: user.branchName
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-white mt-1 group-hover:text-emerald transition",
											children: user.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-white/50 font-mono mt-0.5 block break-all",
											children: user.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] text-white/30 font-mono mt-1",
											children: ["Password: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/60",
												children: user.passwordHash
											})]
										})
									]
								}, user.email);
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md bg-white/[0.04] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center text-center space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
										variant: "light",
										showTagline: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-bold text-white mt-4",
										children: "Operational Portal Access"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/50",
										children: "Enter credentials assigned to your department"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleLogin,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-bold uppercase tracking-wider text-white/60 block",
											children: "Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-4 top-3.5 h-4 w-4 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												required: true,
												placeholder: "name@cityview.ng",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												className: "w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald focus:outline-none transition-all duration-300"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] font-bold uppercase tracking-wider text-white/60 block",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-4 top-3.5 h-4 w-4 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												required: true,
												placeholder: "••••••••",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												className: "w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald focus:outline-none transition-all duration-300"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: loading,
										className: "w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald hover:bg-emerald-light text-forest-deep py-3.5 text-sm font-bold shadow-lg shadow-emerald/10 hover:shadow-emerald/20 transition-all duration-300 disabled:opacity-50 cursor-pointer",
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-4 h-4 border-2 border-forest-deep border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign In to Portal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 text-xs text-white/40 border-t border-white/5 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CityView CNG Automobile Synergy Ltd." })]
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
