import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as ArrowUpRight, I as ChevronDown, b as Mail, h as Phone, n as X, v as Menu, y as MapPin } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CZDppAs2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D6mJzocv.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
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
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		label: "Services",
		children: [
			{
				to: "/services",
				label: "All Services"
			},
			{
				to: "/services/cng-conversion",
				label: "CNG Conversion"
			},
			{
				to: "/hire-purchase",
				label: "Keke Hire Purchase"
			},
			{
				to: "/fleet",
				label: "Fleet Operations"
			},
			{
				to: "/workshop",
				label: "Automobile Workshop"
			}
		]
	},
	{
		to: "/why-cng",
		label: "Why CNG"
	},
	{
		to: "/impact",
		label: "Impact"
	},
	{
		to: "/branches",
		label: "Branches"
	},
	{
		to: "/blog",
		label: "Insights"
	},
	{
		to: "/careers",
		label: "Careers"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [servicesOpen, setServicesOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass-light shadow-soft" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x flex h-16 items-center justify-between md:h-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { variant: scrolled ? "dark" : "dark" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Primary",
					children: nav.map((item) => "children" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						onMouseEnter: () => setServicesOpen(true),
						onMouseLeave: () => setServicesOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground",
							children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })]
						}), servicesOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass-light overflow-hidden rounded-2xl p-2 shadow-elevated",
								children: item.children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: c.to,
									className: "block rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition hover:bg-emerald-soft hover:text-forest-deep",
									children: c.label
								}, c.to))
							})
						})]
					}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground",
						activeProps: { className: "rounded-full px-3.5 py-2 text-sm font-semibold text-forest-deep" },
						activeOptions: { exact: true },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "rounded-full border border-forest/15 bg-white/60 px-4 py-2 text-sm font-medium text-forest-deep transition hover:bg-white",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "group inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-forest-deep",
						children: ["Request a Quote", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "transition group-hover:translate-x-0.5",
							children: "→"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-white/70 text-forest-deep lg:hidden",
					onClick: () => setOpen((o) => !o),
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-light border-t border-border/60 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "container-x flex flex-col gap-1 py-4",
				"aria-label": "Mobile",
				children: [nav.flatMap((item) => "children" in item ? item.children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: c.to,
					onClick: () => setOpen(false),
					className: "rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-emerald-soft",
					children: c.label
				}, c.to)) : [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					className: "rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 hover:bg-emerald-soft",
					children: item.label
				}, item.to)]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					onClick: () => setOpen(false),
					className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-primary-foreground",
					children: "Request a Quote"
				})]
			})
		})]
	});
}
var columns = [
	{
		title: "Company",
		links: [
			{
				to: "/about",
				label: "About"
			},
			{
				to: "/impact",
				label: "Our Impact"
			},
			{
				to: "/branches",
				label: "Branches"
			},
			{
				to: "/careers",
				label: "Careers"
			},
			{
				to: "/blog",
				label: "Insights"
			},
			{
				to: "/admin",
				label: "Admin Portal"
			}
		]
	},
	{
		title: "Services",
		links: [
			{
				to: "/services/cng-conversion",
				label: "CNG Conversion"
			},
			{
				to: "/hire-purchase",
				label: "Keke Hire Purchase"
			},
			{
				to: "/fleet",
				label: "Fleet Operations"
			},
			{
				to: "/workshop",
				label: "Workshop"
			},
			{
				to: "/services",
				label: "All Services"
			}
		]
	},
	{
		title: "Solutions",
		links: [
			{
				to: "/why-cng",
				label: "Why CNG"
			},
			{
				to: "/fleet",
				label: "Fleet Consulting"
			},
			{
				to: "/contact",
				label: "Become a Partner"
			},
			{
				to: "/contact",
				label: "Investor Enquiries"
			}
		]
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-ink text-white/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-60 bg-hero-gradient",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x relative py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-14 lg:grid-cols-[1.4fr_2fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							variant: "light",
							showTagline: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-sm text-sm leading-relaxed text-white/60",
							children: "Driving Africa's clean mobility revolution through CNG conversion, intelligent fleet operations, and world-class automotive engineering."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-white/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-emerald" }), "Head Office — Katsina, Nigeria"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-white/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-emerald" }), "+234 800 000 0000"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-white/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-emerald" }), "hello@cityviewcng.africa"]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-10 sm:grid-cols-3",
						children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white",
							children: col.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 text-sm",
							children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "inline-flex items-center gap-1 text-white/70 transition hover:text-emerald",
								children: l.label
							}) }, l.label))
						})] }, col.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.4fr_1fr] md:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-semibold text-white",
						children: "Get the CityView briefing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/60",
						children: "Quarterly updates on clean-mobility infrastructure, CNG policy, and fleet performance across Africa."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => e.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "you@company.com",
							className: "w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald focus:outline-none",
							"aria-label": "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-1 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-forest-deep transition hover:bg-white",
							children: ["Subscribe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" CityView CNG Automobile Synergy. All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/40",
								children: "Powered by MUVA Mobility"
							})
						]
					})]
				})
			]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex flex-1 items-center justify-center bg-mist-gradient px-4 pt-32 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-emerald",
							children: "404 — Page not found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-6xl font-semibold text-foreground",
							children: "Lost on the road?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "The page you're looking for doesn't exist or has been moved. Let's get you back on track."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep",
							children: "Return home →"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-forest px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-forest-deep",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution" },
			{
				name: "description",
				content: "CityView CNG Automobile Synergy delivers CNG vehicle conversion, keke hire purchase, intelligent fleet operations, and professional automobile services across Northern Nigeria."
			},
			{
				name: "author",
				content: "CityView CNG Automobile Synergy"
			},
			{
				name: "theme-color",
				content: "#0f2b1f"
			},
			{
				property: "og:site_name",
				content: "CityView CNG Automobile Synergy"
			},
			{
				property: "og:title",
				content: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution"
			},
			{
				property: "og:description",
				content: "CityView Digital HQ is the professional corporate website for a clean mobility company."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@CityViewCNG"
			},
			{
				name: "twitter:title",
				content: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution"
			},
			{
				name: "description",
				content: "CityView Digital HQ is the professional corporate website for a clean mobility company."
			},
			{
				name: "twitter:description",
				content: "CityView Digital HQ is the professional corporate website for a clean mobility company."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/395a2872-2869-4890-8d8e-6c642737f39f/id-preview-bda91282--becf2a94-5fc0-4add-a892-507b1d150cef.lovable.app-1783080749163.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/395a2872-2869-4890-8d8e-6c642737f39f/id-preview-bda91282--becf2a94-5fc0-4add-a892-507b1d150cef.lovable.app-1783080749163.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "CityView CNG Automobile Synergy",
				url: "/",
				slogan: "Driving Africa's Clean Mobility Revolution",
				description: "Clean mobility company offering CNG conversion, keke hire purchase, fleet operations, and automobile engineering.",
				address: {
					"@type": "PostalAddress",
					addressRegion: "Katsina",
					addressCountry: "NG"
				},
				areaServed: [
					"Katsina",
					"Gombe",
					"Northern Nigeria",
					"Nigeria",
					"West Africa"
				]
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
var $$splitComponentImporter$14 = () => import("./workshop-BW3by8R1.mjs");
var Route$15 = createFileRoute("/workshop")({
	head: () => ({
		meta: [
			{ title: "Automobile Workshop — CityView CNG" },
			{
				name: "description",
				content: "Certified technicians, modern diagnostics and a documented process for every job."
			},
			{
				property: "og:url",
				content: "/workshop"
			}
		],
		links: [{
			rel: "canonical",
			href: "/workshop"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./why-cng-JKb0Is4E.mjs");
var Route$14 = createFileRoute("/why-cng")({
	head: () => ({
		meta: [
			{ title: "Why CNG — Savings, Safety & Sustainability | CityView CNG" },
			{
				name: "description",
				content: "Compare petrol vs CNG. Estimate your savings, understand the environmental impact and get answers to common questions."
			},
			{
				property: "og:url",
				content: "/why-cng"
			}
		],
		links: [{
			rel: "canonical",
			href: "/why-cng"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var BASE_URL = "";
var Route$13 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/services",
				changefreq: "monthly",
				priority: "0.9"
			},
			{
				path: "/services/cng-conversion",
				changefreq: "monthly",
				priority: "0.9"
			},
			{
				path: "/why-cng",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/hire-purchase",
				changefreq: "monthly",
				priority: "0.9"
			},
			{
				path: "/fleet",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/workshop",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/impact",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/branches",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/gallery",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/blog",
				changefreq: "weekly",
				priority: "0.7"
			},
			{
				path: "/careers",
				changefreq: "weekly",
				priority: "0.7"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.8"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$12 = () => import("./services-CJJTirsw.mjs");
var Route$12 = createFileRoute("/services")({
	head: () => ({
		meta: [
			{ title: "Services — CityView CNG" },
			{
				name: "description",
				content: "CNG conversion, keke hire purchase, fleet operations, workshop, preventive maintenance and fleet consulting."
			},
			{
				property: "og:title",
				content: "CityView CNG Services"
			},
			{
				property: "og:url",
				content: "/services"
			}
		],
		links: [{
			rel: "canonical",
			href: "/services"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./impact-BPImTQmN.mjs");
var Route$11 = createFileRoute("/impact")({
	head: () => ({
		meta: [
			{ title: "Our Impact — CityView CNG" },
			{
				name: "description",
				content: "Vehicles converted, drivers empowered, fuel saved, CO₂ reduced. Measurable clean-mobility impact across Nigeria."
			},
			{
				property: "og:url",
				content: "/impact"
			}
		],
		links: [{
			rel: "canonical",
			href: "/impact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./hire-purchase-CsDYVk_1.mjs");
var Route$10 = createFileRoute("/hire-purchase")({
	head: () => ({
		meta: [
			{ title: "Keke Hire Purchase — Own a CNG Tricycle | CityView CNG" },
			{
				name: "description",
				content: "Flexible hire-purchase plans to own a CNG-powered keke. Empowering drivers across Northern Nigeria."
			},
			{
				property: "og:url",
				content: "/hire-purchase"
			}
		],
		links: [{
			rel: "canonical",
			href: "/hire-purchase"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./gallery-BiA6jc4N.mjs");
var Route$9 = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{ title: "Gallery — CityView CNG" },
			{
				name: "description",
				content: "Workshop, conversions, vehicles, customers and facilities."
			},
			{
				property: "og:url",
				content: "/gallery"
			}
		],
		links: [{
			rel: "canonical",
			href: "/gallery"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./fleet-DM0vcNr5.mjs");
var Route$8 = createFileRoute("/fleet")({
	head: () => ({
		meta: [
			{ title: "Fleet Operations & Management — CityView CNG" },
			{
				name: "description",
				content: "Vehicle tracking, driver management, maintenance and reporting. Powered by MUVA Mobility."
			},
			{
				property: "og:url",
				content: "/fleet"
			}
		],
		links: [{
			rel: "canonical",
			href: "/fleet"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./contact-BwjPV7iN.mjs");
var Route$7 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact — CityView CNG" },
			{
				name: "description",
				content: "Speak to our team about CNG conversion, hire purchase, fleet partnerships or careers."
			},
			{
				property: "og:url",
				content: "/contact"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./careers-f9MRgVjs.mjs");
var Route$6 = createFileRoute("/careers")({
	head: () => ({
		meta: [
			{ title: "Careers — CityView CNG" },
			{
				name: "description",
				content: "Build the future of clean mobility in Africa. Explore open roles at CityView CNG."
			},
			{
				property: "og:url",
				content: "/careers"
			}
		],
		links: [{
			rel: "canonical",
			href: "/careers"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./branches-qyEofQrE.mjs");
var Route$5 = createFileRoute("/branches")({
	head: () => ({
		meta: [
			{ title: "Branches — CityView CNG" },
			{
				name: "description",
				content: "Head office in Katsina, active operations in Gombe, expanding across Northern Nigeria and West Africa."
			},
			{
				property: "og:url",
				content: "/branches"
			}
		],
		links: [{
			rel: "canonical",
			href: "/branches"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./blog-bv86a_oY.mjs");
var Route$4 = createFileRoute("/blog")({
	head: () => ({
		meta: [
			{ title: "Insights — CityView CNG" },
			{
				name: "description",
				content: "News, CNG education, industry updates and maintenance tips from CityView CNG Automobile Synergy."
			},
			{
				property: "og:url",
				content: "/blog"
			}
		],
		links: [{
			rel: "canonical",
			href: "/blog"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin-92J87QfX.mjs");
var Route$3 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Portal — CityView CNG" }, {
		name: "description",
		content: "Management dashboard for CityView CNG operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./about-17IBKCN8.mjs");
var Route$2 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About — CityView CNG Automobile Synergy" },
			{
				name: "description",
				content: "Our story, vision, mission, values and leadership. A clean-mobility company built for Africa's next decade."
			},
			{
				property: "og:title",
				content: "About CityView CNG"
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-BpzhxJud.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "CityView CNG — Driving Africa's Clean Mobility Revolution" },
			{
				name: "description",
				content: "Cleaner, cheaper, smarter transportation. CNG conversion, keke hire purchase, and intelligent fleet operations across Africa."
			},
			{
				property: "og:title",
				content: "CityView CNG — Africa's Clean Mobility Company"
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./services.cng-conversion-MZXCp29o.mjs");
var Route = createFileRoute("/services/cng-conversion")({
	head: () => ({
		meta: [
			{ title: "CNG Vehicle Conversion — CityView CNG" },
			{
				name: "description",
				content: "Certified petrol-to-CNG conversion for private, commercial and fleet vehicles. Cleaner. Cheaper. Smarter."
			},
			{
				property: "og:url",
				content: "/services/cng-conversion"
			}
		],
		links: [{
			rel: "canonical",
			href: "/services/cng-conversion"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var WorkshopRoute = Route$15.update({
	id: "/workshop",
	path: "/workshop",
	getParentRoute: () => Route$16
});
var WhyCngRoute = Route$14.update({
	id: "/why-cng",
	path: "/why-cng",
	getParentRoute: () => Route$16
});
var SitemapDotxmlRoute = Route$13.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$16
});
var ServicesRoute = Route$12.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$16
});
var ImpactRoute = Route$11.update({
	id: "/impact",
	path: "/impact",
	getParentRoute: () => Route$16
});
var HirePurchaseRoute = Route$10.update({
	id: "/hire-purchase",
	path: "/hire-purchase",
	getParentRoute: () => Route$16
});
var GalleryRoute = Route$9.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$16
});
var FleetRoute = Route$8.update({
	id: "/fleet",
	path: "/fleet",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$7.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var CareersRoute = Route$6.update({
	id: "/careers",
	path: "/careers",
	getParentRoute: () => Route$16
});
var BranchesRoute = Route$5.update({
	id: "/branches",
	path: "/branches",
	getParentRoute: () => Route$16
});
var BlogRoute = Route$4.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$16
});
var AdminRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$16
});
var AboutRoute = Route$2.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$16
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var ServicesRouteChildren = { ServicesCngConversionRoute: Route.update({
	id: "/cng-conversion",
	path: "/cng-conversion",
	getParentRoute: () => ServicesRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute,
	BlogRoute,
	BranchesRoute,
	CareersRoute,
	ContactRoute,
	FleetRoute,
	GalleryRoute,
	HirePurchaseRoute,
	ImpactRoute,
	ServicesRoute: ServicesRoute._addFileChildren(ServicesRouteChildren),
	SitemapDotxmlRoute,
	WhyCngRoute,
	WorkshopRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
