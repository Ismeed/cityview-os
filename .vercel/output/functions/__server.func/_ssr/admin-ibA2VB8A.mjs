import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Database, A as MonitorSmartphone, B as Info, C as Send, Ct as ArrowRight, D as Plus, E as RefreshCw, F as LogOut, G as Funnel, H as History, J as FileSpreadsheet, K as Fuel, M as Menu, N as MapPin, O as Phone, Q as DollarSign, R as LayoutDashboard, S as Settings2, T as Save, X as FileDown, Y as FilePenLine, _ as Sparkles, at as CircleCheck, b as ShieldAlert, bt as Barcode, c as UserCheck, ct as ChevronRight, d as TriangleAlert, dt as Check, f as TrendingUp, g as SquareUserRound, gt as Building2, h as Sun, ht as Calculator, i as Users, it as ClipboardList, k as Moon, l as Upload, lt as ChevronLeft, mt as Calendar, n as Wrench, o as User, ot as CircleCheckBig, p as TrendingDown, q as FileText, r as Wallet, rt as Clock, s as UserPlus, st as CircleAlert, t as X, u as Truck, ut as ChevronDown, v as Shield, vt as Boxes, w as Search, x as Settings, y as ShieldCheck, yt as Bell } from "../_libs/lucide-react.mjs";
import { t as useTheme } from "./useTheme-DsmUlAKc.mjs";
import { t as ERPStore } from "./mockData-CJlJNbCg.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ibA2VB8A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sidebar({ activeTab, setActiveTab, selectedRole, mobileOpen, setMobileOpen }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const navigationItems = [
		{
			id: "overview",
			label: "Executive Board",
			icon: LayoutDashboard,
			category: "Executive",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"System Administrator",
				"Super Admin"
			]
		},
		{
			id: "branches",
			label: "Branch Network",
			icon: MapPin,
			category: "Executive",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"HR Manager",
				"System Administrator",
				"Super Admin"
			]
		},
		{
			id: "employees",
			label: "Staff & HR",
			icon: Users,
			category: "Executive",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"HR Manager",
				"System Administrator",
				"Super Admin"
			]
		},
		{
			id: "fleet",
			label: "Vehicles Catalog",
			icon: Truck,
			category: "Operations",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Fleet Manager",
				"Workshop Manager",
				"Technician",
				"System Administrator",
				"Super Admin",
				"Branch Operations Officer"
			]
		},
		{
			id: "drivers",
			label: "Drivers Directory",
			icon: Users,
			category: "Operations",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Fleet Manager",
				"Customer Service",
				"System Administrator",
				"Super Admin",
				"Branch Operations Officer",
				"Receptionist"
			]
		},
		{
			id: "shifts",
			label: "Daily Remittances",
			icon: Wallet,
			category: "Operations",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Fleet Manager",
				"Cashier",
				"System Administrator",
				"Super Admin",
				"Branch Operations Officer"
			]
		},
		{
			id: "hp",
			label: "Hire Purchase Ledger",
			icon: FilePenLine,
			category: "Operations",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Fleet Manager",
				"Cashier",
				"Accountant",
				"Customer Service",
				"System Administrator",
				"Super Admin",
				"Branch Operations Officer",
				"Workshop & CNG Operations Officer",
				"Receptionist"
			]
		},
		{
			id: "frontdesk",
			label: "Front Desk",
			icon: MonitorSmartphone,
			category: "Operations",
			allowedRoles: ["Receptionist"]
		},
		{
			id: "workshop",
			label: "Workshop & CNG",
			icon: Wrench,
			category: "Technical",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Workshop Manager",
				"Technician",
				"Customer Service",
				"System Administrator",
				"Super Admin",
				"Workshop & CNG Operations Officer",
				"Receptionist"
			]
		},
		{
			id: "inventory",
			label: "Inventory & Supply",
			icon: Boxes,
			category: "Technical",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Workshop Manager",
				"Inventory Officer",
				"Accountant",
				"System Administrator",
				"Super Admin",
				"Workshop & CNG Operations Officer"
			]
		},
		{
			id: "finance",
			label: "General Ledger",
			icon: Wallet,
			category: "Finance",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Cashier",
				"Accountant",
				"System Administrator",
				"Super Admin"
			]
		},
		{
			id: "crm",
			label: "CRM Portal",
			icon: SquareUserRound,
			category: "Finance",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"Branch Manager",
				"Operations Manager",
				"Customer Service",
				"Cashier",
				"System Administrator",
				"Super Admin",
				"Receptionist"
			]
		},
		{
			id: "settings",
			label: "System Settings",
			icon: Settings,
			category: "System",
			allowedRoles: [
				"Managing Director (CEO)",
				"Executive Director",
				"System Administrator",
				"Super Admin"
			]
		}
	];
	const isAllowed = (allowedRoles) => {
		return allowedRoles.includes(selectedRole);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden",
		onClick: () => setMobileOpen?.(false)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-charcoal text-white transition-all duration-300
        md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-20" : "md:w-72"} w-72`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-20 items-center justify-between border-b border-white/5 px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-forest text-forest-deep shadow-glow-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5 text-white" })
					}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-bold tracking-tight text-white block",
							children: "CITYVIEW"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-bold text-emerald tracking-[0.2em] uppercase",
							children: "Digital Hub"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCollapsed(!collapsed),
					className: "absolute -right-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-charcoal hover:bg-mist shadow-soft transition md:flex z-50 cursor-pointer",
					children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3 w-3" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-4 py-6 space-y-6",
				children: [
					{
						name: "Executive",
						label: "Administration"
					},
					{
						name: "Operations",
						label: "Operations"
					},
					{
						name: "Technical",
						label: "Technical & Conversions"
					},
					{
						name: "Finance",
						label: "Finance & Accounts"
					},
					{
						name: "System",
						label: "Configuration"
					}
				].map((cat) => {
					const catItems = navigationItems.filter((item) => item.category === cat.name && isAllowed(item.allowedRoles));
					if (catItems.length === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2",
							children: cat.label
						}), catItems.map((item) => {
							const ActiveIcon = item.icon;
							const isActive = activeTab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setActiveTab(item.id);
									setMobileOpen?.(false);
								},
								className: `group w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition ${isActive ? "bg-forest text-white shadow-glow-soft" : "text-white/70 hover:bg-white/5 hover:text-white"}`,
								title: collapsed ? item.label : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveIcon, { className: `h-4.5 w-4.5 shrink-0 ${isActive ? "text-emerald" : "text-white/60 group-hover:text-white"}` }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}, item.id);
						})]
					}, cat.name);
				})
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/5 p-4 bg-ink/30 text-center text-[10px] text-white/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "CityView CNG Automobile Synergy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 font-mono text-[9px]",
					children: "v1.2.0-Prod · Katsina, NG"
				})]
			})
		]
	})] });
}
function Header({ selectedBranch, setSelectedBranch, selectedRole, setSelectedRole, currentUser, onLogout, onToggleMobileSidebar }) {
	const [currentTime, setCurrentTime] = (0, import_react.useState)("");
	const [showNotifications, setShowNotifications] = (0, import_react.useState)(false);
	const [showRoleSelector, setShowRoleSelector] = (0, import_react.useState)(false);
	const [showBranchSelector, setShowBranchSelector] = (0, import_react.useState)(false);
	const { theme, toggleTheme } = useTheme();
	const [deferredPrompt, setDeferredPrompt] = (0, import_react.useState)(null);
	const [isInstallable, setIsInstallable] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setIsInstallable(true);
		};
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		if (typeof window !== "undefined" && window.matchMedia("(display-mode: standalone)").matches) setIsInstallable(false);
		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);
	const handleInstallPWA = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") setIsInstallable(false);
				setDeferredPrompt(null);
			});
		} else toast.info("PWA Installation Guide", { description: "To install CityView ERP, click the share/options menu button in your browser and select 'Add to Home Screen' or 'Install'." });
	};
	const isSuperOrAdmin = currentUser?.role === "Super Admin" || currentUser?.role === "Managing Director (CEO)" || currentUser?.role === "System Administrator" || currentUser?.role === "Executive Director";
	const inventory = ERPStore.getInventory();
	const lowStockCount = inventory.filter((i) => i.stockLevel <= i.minStockLevel).length;
	const hpContracts = ERPStore.getHPContracts();
	const totalAlerts = lowStockCount + hpContracts.filter((c) => c.status === "Missed Remittance").length;
	(0, import_react.useEffect)(() => {
		const updateTime = () => {
			setCurrentTime(new Intl.DateTimeFormat("en-US", {
				timeZone: "Africa/Lagos",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true
			}).format(/* @__PURE__ */ new Date()));
		};
		updateTime();
		const interval = setInterval(updateTime, 1e3);
		return () => clearInterval(interval);
	}, []);
	const roles = [
		"Managing Director (CEO)",
		"Executive Director",
		"Branch Manager",
		"Operations Manager",
		"Workshop Manager",
		"Fleet Manager",
		"Cashier",
		"Accountant",
		"HR Manager",
		"Customer Service",
		"Inventory Officer",
		"Technician",
		"System Administrator",
		"Branch Operations Officer",
		"Workshop & CNG Operations Officer",
		"Receptionist"
	];
	const branches = [
		{
			id: "ALL",
			name: "Global Enterprise"
		},
		{
			id: "BR-KT",
			name: "Katsina HQ"
		},
		{
			id: "BR-GB",
			name: "Gombe Hub"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-border bg-card px-8 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onToggleMobileSidebar,
				className: "flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card hover:bg-mist/30 dark:hover:bg-white/5 transition text-foreground cursor-pointer md:hidden mr-1",
				"aria-label": "Open Navigation Sidebar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-bold text-foreground",
				children: "CityView Digital HQ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground",
				children: "Enterprise Operations System (ERP)"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 rounded-2xl bg-mist/60 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-foreground md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-forest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Katsina/Lagos: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-forest-deep dark:text-emerald",
						children: currentTime
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: isSuperOrAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setShowBranchSelector(!showBranchSelector);
							setShowRoleSelector(false);
							setShowNotifications(false);
						},
						className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-mist/40 dark:hover:bg-white/5 transition cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-emerald" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBranch === "ALL" ? "Global Hubs" : branches.find((b) => b.id === selectedBranch)?.name || selectedBranch }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
						]
					}), showBranchSelector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-elevated animate-fade-down z-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1",
							children: "Select Active Hub"
						}), branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSelectedBranch(b.id);
								setShowBranchSelector(false);
							},
							className: `w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition ${selectedBranch === b.id ? "bg-forest-deep text-white" : "text-muted-foreground hover:bg-mist hover:text-foreground"}`,
							children: b.name
						}, b.id))]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/80 select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-emerald/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedBranch === "ALL" ? "Global Hubs" : branches.find((b) => b.id === selectedBranch)?.name || selectedBranch })]
					})
				}),
				isSuperOrAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setShowRoleSelector(!showRoleSelector);
							setShowBranchSelector(false);
							setShowNotifications(false);
						},
						className: "flex items-center gap-2 rounded-2xl bg-emerald-soft/60 px-4 py-2 text-xs font-bold text-forest-deep hover:bg-emerald-soft transition border border-emerald/15 cursor-pointer",
						className: "flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 transition border border-emerald-500/20 cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-emerald-600" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Role: ", selectedRole] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 text-emerald-700" })
						]
					}), showRoleSelector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-lg z-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1",
							children: "Simulate System Permission"
						}), roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSelectedRole(r);
								setShowRoleSelector(false);
								ERPStore.addAuditLog("System Admin", "Super Administrator", "RBAC Change Simulation", `Changed active simulation role to: ${r}`);
							},
							className: `w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition ${selectedRole === r ? "bg-emerald text-forest-deep font-bold" : "text-muted-foreground hover:bg-mist hover:text-foreground"}`,
							children: r
						}, r))]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-2xl bg-emerald-soft/30 px-4 py-2 text-xs font-semibold text-forest border border-emerald/10 select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-forest/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Role: ", selectedRole] })]
				}),
				isInstallable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleInstallPWA,
					className: "hidden sm:flex items-center gap-1.5 rounded-2xl border border-border bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2 text-xs font-bold text-emerald transition cursor-pointer",
					title: "Install Web App (PWA)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
					}), "Install App"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: toggleTheme,
					className: "flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card hover:bg-mist/30 dark:hover:bg-white/5 transition text-foreground cursor-pointer",
					"aria-label": "Toggle Theme",
					children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4.5 w-4.5 text-amber-400 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4.5 w-4.5 text-forest" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setShowNotifications(!showNotifications);
							setShowBranchSelector(false);
							setShowRoleSelector(false);
						},
						className: "relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card hover:bg-mist/30 dark:hover:bg-white/5 transition text-foreground cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), totalAlerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-md animate-pulse",
							children: totalAlerts
						})]
					}), showNotifications && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 mt-2 w-80 rounded-3xl border border-border bg-card p-4 shadow-elevated animate-fade-down z-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-foreground",
								children: "Critical Operations Alerts"
							}), totalAlerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600",
								children: [totalAlerts, " Action items"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-60 overflow-y-auto space-y-2.5",
							children: totalAlerts === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-6 text-center text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-emerald mx-auto mb-2 opacity-50" }), "All operational loops are clean."]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [inventory.filter((i) => i.stockLevel <= i.minStockLevel).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-red-50/40 border border-red-100 p-2.5 text-xs text-foreground flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-red-500 mt-1 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: "Low Stock Warning"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: [
										item.name,
										" is down to ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-red-600",
											children: [item.stockLevel, " units"]
										}),
										" (min: ",
										item.minStockLevel,
										")."
									]
								})] })]
							}, item.id)), hpContracts.filter((c) => c.status === "Missed Remittance").map((c) => {
								const driver = ERPStore.getDrivers().find((d) => d.id === c.driverId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-amber-50/40 border border-amber-100 p-2.5 text-xs text-foreground flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-amber-500 mt-1 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold",
										children: "Missed HP Remittance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: [
											"Driver ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: driver?.name || c.driverId
											}),
											" (",
											c.id,
											") missed yesterday's daily target."
										]
									})] })]
								}, c.id);
							})] })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-l border-border pl-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden text-right md:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold text-foreground",
							children: currentUser?.name || "Admin Desk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[9px] font-bold text-emerald uppercase tracking-wider",
							children: currentUser?.email || "CityView Synergy"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onLogout,
						className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 hover:bg-ink/10 transition text-muted-foreground hover:text-red-500 cursor-pointer",
						title: "Log Out",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4.5 w-4.5" })
					})]
				})
			]
		})]
	});
}
function ExecutiveDashboard({ branchId }) {
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const rawTransactions = ERPStore.getTransactions();
	const rawVehicles = ERPStore.getVehicles();
	const rawConversions = ERPStore.getConversions();
	const rawContracts = ERPStore.getHPContracts();
	ERPStore.getEmployees();
	ERPStore.getBranches();
	const transactions = branchId === "ALL" ? rawTransactions : rawTransactions.filter((t) => t.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub"));
	const vehicles = branchId === "ALL" ? rawVehicles : rawVehicles.filter((v) => v.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub"));
	const conversions = branchId === "ALL" ? rawConversions : rawConversions.filter((c) => {
		const vehicle = rawVehicles.find((v) => v.plateNumber === c.vehiclePlate);
		return vehicle ? vehicle.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub") : true;
	});
	const hpContracts = branchId === "ALL" ? rawContracts : rawContracts.filter((c) => {
		const vehicle = rawVehicles.find((v) => v.id === c.vehicleId);
		return vehicle ? vehicle.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub") : true;
	});
	const auditLogs = ERPStore.getAuditLogs();
	const revenueVal = transactions.filter((t) => t.type === "Revenue").reduce((acc, curr) => acc + curr.amount, 0);
	const expenseVal = transactions.filter((t) => t.type === "Expense").reduce((acc, curr) => acc + curr.amount, 0);
	const netProfit = revenueVal - expenseVal;
	const margin = revenueVal > 0 ? netProfit / revenueVal * 100 : 0;
	const onRoadCount = vehicles.filter((v) => v.status === "On Road").length;
	const inWorkshopCount = vehicles.filter((v) => v.status === "In Workshop").length;
	const totalConversions = conversions.length;
	const totalHPOustanding = hpContracts.filter((c) => c.status !== "Completed").reduce((acc, curr) => acc + (curr.totalAmount - curr.balancePaid), 0);
	const formatNaira = (value) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0
		}).format(value);
	};
	const monthlyData = [
		{
			name: "Feb",
			Revenue: 21e5,
			Expense: 13e5
		},
		{
			name: "Mar",
			Revenue: 28e5,
			Expense: 17e5
		},
		{
			name: "Apr",
			Revenue: 34e5,
			Expense: 21e5
		},
		{
			name: "May",
			Revenue: 42e5,
			Expense: 23e5
		},
		{
			name: "Jun",
			Revenue: 51e5,
			Expense: 29e5
		},
		{
			name: "Jul",
			Revenue: revenueVal,
			Expense: expenseVal
		}
	];
	const branchData = [{
		name: "Katsina HQ",
		Revenue: rawTransactions.filter((t) => t.branch === "Katsina HQ" && t.type === "Revenue").reduce((a, b) => a + b.amount, 0),
		Expense: rawTransactions.filter((t) => t.branch === "Katsina HQ" && t.type === "Expense").reduce((a, b) => a + b.amount, 0)
	}, {
		name: "Gombe Hub",
		Revenue: rawTransactions.filter((t) => t.branch === "Gombe Hub" && t.type === "Revenue").reduce((a, b) => a + b.amount, 0),
		Expense: rawTransactions.filter((t) => t.branch === "Gombe Hub" && t.type === "Expense").reduce((a, b) => a + b.amount, 0)
	}];
	const handleExport = (format) => {
		setExporting(true);
		setTimeout(() => {
			setExporting(false);
			toast.success(`Executive Report Exported`, { description: `Successfully compiled and downloaded CityView_Executive_Summary.${format.toLowerCase()}` });
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Executive Boardroom"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Real-time financial status, branch efficiency levels, and clean mobility performance indicators."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleExport("PDF"),
						disabled: exporting,
						className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4 text-muted-foreground" }), "Export Board PDF"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleExport("CSV"),
						disabled: exporting,
						className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" }), "Download CSV Ledger"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Total Revenue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-emerald-soft flex items-center justify-center text-forest-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-forest" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: formatNaira(revenueVal)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-[10px] font-bold text-emerald mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+18.4% from June" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Total Expenses"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: formatNaira(expenseVal)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-[10px] font-bold text-red-500 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "-4.2% from June" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Net Cash Flow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: formatNaira(netProfit)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 mt-2 bg-indigo-50/50 rounded px-1.5 py-0.5 w-fit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Profit Margin: ",
									margin.toFixed(1),
									"%"
								] })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Outstanding HP Balance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: formatNaira(totalHPOustanding)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [hpContracts.length, " Active Contracts"] })
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-forest-deep shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-6 w-6 text-forest" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Vehicles on Road"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-xl font-bold text-foreground",
							children: [
								onRoadCount,
								" / ",
								vehicles.length
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-6 w-6 text-amber-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Vehicles in Workshop"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl font-bold text-foreground",
							children: inWorkshopCount
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-blue-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Total Conversions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-xl font-bold text-foreground",
							children: [totalConversions, " Completed"]
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-base text-foreground",
							children: "Monthly Financial Performance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Monthly flow comparison of revenues and operating expenses."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-soft text-forest-deep uppercase",
							children: "Nigeria Ledger"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-80 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: monthlyData,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorRev",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "var(--color-forest)",
											stopOpacity: .2
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "var(--color-forest)",
											stopOpacity: 0
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorExp",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "#ef4444",
											stopOpacity: .15
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "#ef4444",
											stopOpacity: 0
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "white",
											borderRadius: "16px",
											border: "1px solid var(--color-border)",
											fontSize: "12px"
										},
										formatter: (val) => [`₦${(Number(val) / 1e3).toFixed(0)}k`, ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconType: "circle",
										wrapperStyle: {
											fontSize: "11px",
											paddingTop: "15px"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Revenue",
										stroke: "var(--color-forest)",
										strokeWidth: 2.5,
										fillOpacity: 1,
										fill: "url(#colorRev)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Expense",
										stroke: "#ef4444",
										strokeWidth: 2.5,
										fillOpacity: 1,
										fill: "url(#colorExp)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-base text-foreground",
							children: "Hub Revenue Comparison"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Katsina HQ vs Gombe Hub financial comparison."
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-80 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: branchData,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "white",
											borderRadius: "16px",
											border: "1px solid var(--color-border)",
											fontSize: "12px"
										},
										formatter: (val) => [`₦${(Number(val) / 1e3).toFixed(0)}k`, ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconType: "circle",
										wrapperStyle: {
											fontSize: "11px",
											paddingTop: "15px"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "Revenue",
										fill: "var(--color-forest)",
										radius: [
											8,
											8,
											0,
											0
										],
										barSize: 25
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "Expense",
										fill: "#9ca3af",
										radius: [
											8,
											8,
											0,
											0
										],
										barSize: 25
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Performance Rankings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Ranking of hubs and field technicians based on output."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/50 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2.5",
								children: "Branch Yield Rating"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: [
									{
										name: "Katsina HQ (Active)",
										revenue: 3824e3,
										pct: 100
									},
									{
										name: "Gombe Hub (Active)",
										revenue: 1912500,
										pct: 50
									},
									{
										name: "Kano (Upcoming Q3)",
										revenue: 0,
										pct: 0
									}
								].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-1/3 font-semibold text-foreground",
											children: item.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-1/2 bg-mist/60 h-2 rounded-full overflow-hidden mx-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-forest h-full rounded-full",
												style: { width: `${item.pct}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-1/6 text-right font-bold text-forest-deep",
											children: item.revenue > 0 ? formatNaira(item.revenue) : "TBD"
										})
									]
								}, item.name))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2.5",
							children: "Top Performing Technicians"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: [{
								name: "Chidi Nwachukwu",
								role: "Senior Technician",
								branch: "Katsina HQ",
								rating: "★★★★★",
								jobs: 18
							}, {
								name: "Bala Mohammed",
								role: "Technician",
								branch: "Gombe Hub",
								rating: "★★★★☆",
								jobs: 12
							}].map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs rounded-xl border border-border/40 p-2.5 hover:bg-mist/30 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 rounded-full bg-emerald-soft flex items-center justify-center font-bold text-forest-deep text-[11px]",
										children: tech.name.split(" ").map((n) => n[0]).join("")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground",
										children: tech.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground",
										children: [
											tech.role,
											" · ",
											tech.branch
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-forest",
										children: [tech.jobs, " Jobs"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-amber-500 text-[10px]",
										children: tech.rating
									})]
								})]
							}, tech.name))
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-base text-foreground",
							children: "Operational Audit Log"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Historical records of operations entries (Last 4 actions)."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-[10px] font-bold text-emerald border border-emerald/20 rounded px-1.5 py-0.5 bg-emerald-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Secure"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3.5",
						children: auditLogs.slice(0, 4).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs border-b border-border/50 pb-3 last:border-0 last:pb-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[10px] text-muted-foreground font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: log.timestamp }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono bg-mist px-1.5 py-0.5 rounded text-charcoal",
										children: log.id
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 font-semibold text-foreground",
									children: [
										log.user,
										" (",
										log.role,
										") — ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-forest-deep",
											children: log.action
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-muted-foreground text-[11px] leading-relaxed",
									children: log.details
								})
							]
						}, log.id))
					})] })
				})]
			})
		]
	});
}
function BranchManagement() {
	const [branches, setBranches] = (0, import_react.useState)(ERPStore.getBranches());
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newBranch, setNewBranch] = (0, import_react.useState)({
		name: "",
		location: "",
		manager: "",
		status: "Upcoming"
	});
	const handleAddBranch = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `BR-${newBranch.name.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-3)}`,
			name: newBranch.name,
			location: newBranch.location,
			manager: newBranch.manager || "TBD",
			status: newBranch.status
		};
		const updated = [...branches, newEntry];
		setBranches(updated);
		ERPStore.saveBranches(updated);
		ERPStore.addAuditLog("Admin", "Super Administrator", "Create Branch", `Created new branch "${newBranch.name}" in ${newBranch.location}`);
		toast.success("Branch Added Successfully", { description: `${newBranch.name} is now registered in the network.` });
		setNewBranch({
			name: "",
			location: "",
			manager: "",
			status: "Upcoming"
		});
		setShowAddForm(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Branch Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1 font-sans",
					children: "Add hubs, assign managers, and monitor regional performance indicators as CityView expands."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(!showAddForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Initialize Hub"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddBranch,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Initialize New Operating Branch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Branch Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newBranch.name,
								onChange: (e) => setNewBranch((prev) => ({
									...prev,
									name: e.target.value
								})),
								placeholder: "e.g. Kano Hub",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Geographic Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newBranch.location,
								onChange: (e) => setNewBranch((prev) => ({
									...prev,
									location: e.target.value
								})),
								placeholder: "e.g. Kano State, Nigeria",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Branch Manager Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: newBranch.manager,
								onChange: (e) => setNewBranch((prev) => ({
									...prev,
									manager: e.target.value
								})),
								placeholder: "e.g. Yusuf Mohammed",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Launch Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newBranch.status,
								onChange: (e) => setNewBranch((prev) => ({
									...prev,
									status: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Upcoming",
									children: "Upcoming / Planning"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Active",
									children: "Active Operations"
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Confirm Setup"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: branches.map((b) => {
					const isActive = b.status === "Active";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border p-6 bg-white shadow-soft relative overflow-hidden transition-all duration-300 hover-lift ${isActive ? "border-emerald/30" : "border-border opacity-75"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-8 w-8 rounded-lg flex items-center justify-center ${isActive ? "bg-emerald-soft text-forest-deep" : "bg-mist text-muted-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4.5 w-4.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-bold text-base text-foreground",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground font-mono font-semibold",
										children: b.id
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${isActive ? "bg-emerald-soft text-forest-deep" : "bg-amber-100 text-amber-600"}`,
									children: [isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-2.5 w-2.5" }), b.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.location })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Manager: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: b.manager
									})] })]
								})]
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-mist/35 rounded-xl p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-semibold text-muted-foreground uppercase",
										children: "Staff count"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-sm font-bold text-forest-deep",
										children: [ERPStore.getEmployees().filter((e) => e.branch === b.name).length, " Employees"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-mist/35 rounded-xl p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-semibold text-muted-foreground uppercase",
										children: "Fleet size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-sm font-bold text-forest-deep",
										children: [ERPStore.getVehicles().filter((v) => v.branch === b.name).length, " Vehicles"]
									})]
								})]
							})
						]
					}, b.id);
				})
			})
		]
	});
}
function EmployeeManagement() {
	const [employees, setEmployees] = (0, import_react.useState)(ERPStore.getEmployees());
	const [search, setSearch] = (0, import_react.useState)("");
	const [branchFilter, setBranchFilter] = (0, import_react.useState)("ALL");
	const [deptFilter, setDeptFilter] = (0, import_react.useState)("ALL");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newEmp, setNewEmp] = (0, import_react.useState)({
		name: "",
		email: "",
		role: "Technician",
		department: "Technical",
		branch: "Katsina HQ",
		salary: 2e5
	});
	const handleAddEmployee = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `EMP-${(employees.length + 1).toString().padStart(2, "0")}`,
			name: newEmp.name,
			email: newEmp.email,
			role: newEmp.role,
			department: newEmp.department,
			branch: newEmp.branch,
			salary: Number(newEmp.salary),
			status: "Active",
			attendanceToday: "Present"
		};
		const updated = [...employees, newEntry];
		setEmployees(updated);
		ERPStore.saveEmployees(updated);
		ERPStore.addAuditLog("HR Admin", "HR Manager", "Register Employee", `Registered employee ${newEmp.name} in department ${newEmp.department}`);
		toast.success("Employee Registered", { description: `${newEmp.name} has been added to payroll and personnel rosters.` });
		setNewEmp({
			name: "",
			email: "",
			role: "Technician",
			department: "Technical",
			branch: "Katsina HQ",
			salary: 2e5
		});
		setShowAddForm(false);
	};
	const toggleAttendance = (id, current) => {
		let next = "Present";
		if (current === "Present") next = "Late";
		else if (current === "Late") next = "Leave";
		else if (current === "Leave") next = "Absent";
		else next = "Present";
		const updated = employees.map((emp) => emp.id === id ? {
			...emp,
			attendanceToday: next
		} : emp);
		setEmployees(updated);
		ERPStore.saveEmployees(updated);
		toast.info("Attendance Updated", { description: `Logged daily status as: ${next}` });
	};
	const filtered = employees.filter((emp) => {
		const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.role.toLowerCase().includes(search.toLowerCase()) || emp.id.toLowerCase().includes(search.toLowerCase());
		const matchesBranch = branchFilter === "ALL" || emp.branch === (branchFilter === "BR-KT" ? "Katsina HQ" : "Gombe Hub");
		const matchesDept = deptFilter === "ALL" || emp.department === deptFilter;
		return matchesSearch && matchesBranch && matchesDept;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Staff & HR Center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Maintain employee records, clock-in sheets, payroll details, and structural department roles."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(!showAddForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Onboard Staff"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddEmployee,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Onboard New Team Member"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newEmp.name,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									name: e.target.value
								})),
								placeholder: "Muhammadu Bello",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Corporate Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: newEmp.email,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									email: e.target.value
								})),
								placeholder: "m.bello@cityviewcng.com",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Assigned Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newEmp.role,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									role: e.target.value
								})),
								placeholder: "e.g. Lead Mechanic",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newEmp.department,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									department: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Technical",
										children: "Technical (Workshop/CNG)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Operations",
										children: "Operations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Finance",
										children: "Finance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Executive",
										children: "Executive"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Support",
										children: "Support / CRM"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Hub Branch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newEmp.branch,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									branch: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Katsina HQ",
									children: "Katsina HQ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Gombe Hub",
									children: "Gombe Hub"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Basic Monthly Salary (₦)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newEmp.salary,
								onChange: (e) => setNewEmp((prev) => ({
									...prev,
									salary: Number(e.target.value)
								})),
								placeholder: "Salary in Naira",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Onboard Staff"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-3 items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full md:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search staff by name or role...",
							className: "w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 w-full md:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: branchFilter,
							onChange: (e) => setBranchFilter(e.target.value),
							className: "rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Branches"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "BR-KT",
									children: "Katsina HQ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "BR-GB",
									children: "Gombe Hub"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: deptFilter,
							onChange: (e) => setDeptFilter(e.target.value),
							className: "rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Departments"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Technical",
									children: "Technical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Operations",
									children: "Operations"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Finance",
									children: "Finance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Executive",
									children: "Executive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Support",
									children: "Support"
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border border-border/70 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Name / Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Department & Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Branch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Monthly Salary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-center",
									children: "Attendance (Today)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Verification Files"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "p-8 text-center text-muted-foreground",
								children: "No employees matched the query."
							}) }) : filtered.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-mist/10 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono font-bold text-forest",
										children: emp.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-foreground",
											children: emp.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: emp.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground",
											children: emp.role
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block rounded bg-mist px-1.5 py-0.5 text-[9px] text-charcoal font-semibold mt-1",
											children: emp.department
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-semibold text-foreground",
										children: emp.branch
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-4 text-right font-mono font-bold text-forest-deep",
										children: ["₦", emp.salary.toLocaleString()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => toggleAttendance(emp.id, emp.attendanceToday),
											className: `inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold text-[9px] uppercase cursor-pointer hover:opacity-85 transition ${emp.attendanceToday === "Present" ? "bg-emerald-soft text-forest-deep" : emp.attendanceToday === "Late" ? "bg-amber-100 text-amber-600" : emp.attendanceToday === "Leave" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-500"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-2.5 w-2.5" }), emp.attendanceToday || "Unset"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block rounded-full px-2.5 py-0.5 font-bold uppercase text-[9px] ${emp.status === "Active" ? "bg-emerald-soft text-forest-deep" : "bg-red-100 text-red-500"}`,
											children: emp.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1.5 justify-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition",
												title: "View Employment Contract",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition",
												title: "View Credentials Check",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" })
											})]
										})
									})
								]
							}, emp.id))
						})]
					})
				})]
			})
		]
	});
}
function DriverManagement({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [drivers, setDrivers] = (0, import_react.useState)(ERPStore.getDrivers());
	const [search, setSearch] = (0, import_react.useState)("");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newDriver, setNewDriver] = (0, import_react.useState)({
		name: "",
		phone: "",
		license: "",
		guarantorName: "",
		guarantorPhone: "",
		branch: activeBranchName || "Katsina HQ",
		remittanceRate: 12e3
	});
	(0, import_react.useEffect)(() => {
		if (activeBranchName) setNewDriver((prev) => ({
			...prev,
			branch: activeBranchName
		}));
	}, [activeBranchName]);
	const handleRegisterDriver = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `DRV-${Date.now().toString().slice(-3)}`,
			name: newDriver.name,
			phone: newDriver.phone,
			license: newDriver.license,
			guarantorName: newDriver.guarantorName,
			guarantorPhone: newDriver.guarantorPhone,
			branch: newDriver.branch,
			status: "Pending Approval",
			remittanceRate: Number(newDriver.remittanceRate)
		};
		const updated = [...drivers, newEntry];
		setDrivers(updated);
		ERPStore.saveDrivers(updated);
		ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Register Driver", `Registered driver candidate ${newDriver.name} with guarantor details.`);
		toast.success("Driver Candidate Registered", { description: `${newDriver.name} has been added for guarantor check & approval.` });
		setNewDriver({
			name: "",
			phone: "",
			license: "",
			guarantorName: "",
			guarantorPhone: "",
			branch: activeBranchName || "Katsina HQ",
			remittanceRate: 12e3
		});
		setShowAddForm(false);
	};
	const approveDriverStatus = (id, newStatus) => {
		const updated = drivers.map((d) => d.id === id ? {
			...d,
			status: newStatus
		} : d);
		setDrivers(updated);
		ERPStore.saveDrivers(updated);
		ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Update Driver Status", `Set status of driver ID ${id} to ${newStatus}`);
		toast.success("Driver status updated", { description: `Active operations status modified to ${newStatus}` });
	};
	const filtered = drivers.filter((d) => (activeBranchName ? d.branch === activeBranchName : true) && (d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search)));
	const rawContracts = ERPStore.getHPContracts();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Driver Operations Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Track registered tricycle drivers, check guarantor credit checks, review active licenses and approval statuses."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(!showAddForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Register Driver"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleRegisterDriver,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Register Driver & Guarantor Details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Driver Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newDriver.name,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									name: e.target.value
								})),
								placeholder: "Muhammadu Haruna",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newDriver.phone,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									phone: e.target.value
								})),
								placeholder: "0803XXXXXXX",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Driver's License ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newDriver.license,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									license: e.target.value
								})),
								placeholder: "e.g. NGA-KT-XXXXX",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Guarantor Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newDriver.guarantorName,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									guarantorName: e.target.value
								})),
								placeholder: "Alhaji Bello Katsina",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Guarantor Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newDriver.guarantorPhone,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									guarantorPhone: e.target.value
								})),
								placeholder: "0803XXXXXXX",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Operation Branch Hub"
							}), activeBranchName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								readOnly: true,
								value: activeBranchName,
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-mist/30 text-muted-foreground focus:outline-none"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newDriver.branch,
								onChange: (e) => setNewDriver((prev) => ({
									...prev,
									branch: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Katsina HQ",
									children: "Katsina HQ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Gombe Hub",
									children: "Gombe Hub"
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Register Candidate"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full md:w-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search drivers by name or phone...",
						className: "w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((d) => {
						const hasContract = rawContracts.find((c) => c.driverId === d.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display font-bold text-base text-foreground",
									children: d.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-mono font-semibold",
									children: [
										d.id,
										" · ",
										d.branch
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${d.status === "Active" ? "bg-emerald-soft text-forest-deep" : d.status === "Suspended" ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-600"}`,
									children: d.status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5 text-xs text-muted-foreground mb-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.phone })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["License: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: d.license
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-mist/40 p-3 border border-border/50 mt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground",
												children: "Guarantor Profile"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground mt-0.5",
												children: d.guarantorName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] mt-0.5",
												children: d.guarantorPhone
											})
										]
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-border/50 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold text-charcoal",
										children: hasContract ? `Contract: ${hasContract.id}` : "No Active Contract"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: d.status === "Pending Approval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => approveDriverStatus(d.id, "Active"),
										className: "rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer",
										children: "Approve Candidate"
									}) : d.status === "Active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => approveDriverStatus(d.id, "Suspended"),
										className: "rounded-lg bg-red-100 text-red-500 px-3 py-1.5 text-[10px] font-bold hover:bg-red-500 hover:text-white transition cursor-pointer",
										children: "Suspend Driver"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => approveDriverStatus(d.id, "Active"),
										className: "rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer",
										children: "Re-activate"
									})
								})]
							})]
						}, d.id);
					})
				})]
			})
		]
	});
}
function FleetManagement({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [vehicles, setVehicles] = (0, import_react.useState)(ERPStore.getVehicles());
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [conversionFilter, setConversionFilter] = (0, import_react.useState)("ALL");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newVeh, setNewVeh] = (0, import_react.useState)({
		plateNumber: "",
		type: "Tricycle",
		fuelType: "CNG",
		conversionStatus: "Converted",
		branch: activeBranchName || "Katsina HQ"
	});
	(0, import_react.useEffect)(() => {
		if (activeBranchName) setNewVeh((prev) => ({
			...prev,
			branch: activeBranchName
		}));
	}, [activeBranchName]);
	const handleAddVehicle = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `VEH-${newVeh.type}-${Date.now().toString().slice(-3)}`,
			plateNumber: newVeh.plateNumber.toUpperCase(),
			type: newVeh.type,
			fuelType: newVeh.fuelType,
			conversionStatus: newVeh.conversionStatus,
			branch: newVeh.branch,
			status: "Available",
			lastServiceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
		};
		const updated = [...vehicles, newEntry];
		setVehicles(updated);
		ERPStore.saveVehicles(updated);
		ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Add Fleet Vehicle", `Registered vehicle ${newVeh.plateNumber} into operations catalog.`);
		toast.success("Vehicle Registered", { description: `${newVeh.type} (${newVeh.plateNumber}) added to ${newVeh.branch} inventory.` });
		setNewVeh({
			plateNumber: "",
			type: "Tricycle",
			fuelType: "CNG",
			conversionStatus: "Converted",
			branch: activeBranchName || "Katsina HQ"
		});
		setShowAddForm(false);
	};
	const updateVehicleStatus = (id, newStatus) => {
		const updated = vehicles.map((v) => v.id === id ? {
			...v,
			status: newStatus
		} : v);
		setVehicles(updated);
		ERPStore.saveVehicles(updated);
		ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Modify Vehicle Status", `Set status of vehicle ID ${id} to ${newStatus}`);
		toast.success("Vehicle Status Modified", { description: `State changed to ${newStatus}` });
	};
	const filtered = vehicles.filter((v) => {
		const matchesSearch = v.plateNumber.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
		const matchesConv = conversionFilter === "ALL" || v.conversionStatus === conversionFilter;
		const matchesBranch = !activeBranchName || v.branch === activeBranchName;
		return matchesSearch && matchesStatus && matchesConv && matchesBranch;
	});
	const rawDrivers = ERPStore.getDrivers();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Fleet Logistics Catalog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Oversee company-owned clean mobility vehicles, monitor conversions, assign drivers and check service schedules."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(!showAddForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Onboard Vehicle"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddVehicle,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Register Vehicle Assets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Plate Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newVeh.plateNumber,
								onChange: (e) => setNewVeh((prev) => ({
									...prev,
									plateNumber: e.target.value
								})),
								placeholder: "e.g. KT-902-A10",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Classification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newVeh.type,
								onChange: (e) => setNewVeh((prev) => ({
									...prev,
									type: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Tricycle",
										children: "Tricycle (Keke)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Mini Bus",
										children: "Mini Bus"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Car",
										children: "Sedan / Hatchback"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Truck",
										children: "Heavy Duty Truck"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Fuel Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newVeh.fuelType,
								onChange: (e) => setNewVeh((prev) => ({
									...prev,
									fuelType: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CNG",
										children: "Compressed Natural Gas (CNG)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Petrol",
										children: "Petrol Only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Hybrid",
										children: "Petrol + CNG Dual Fuel"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "CNG Conversion Progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newVeh.conversionStatus,
								onChange: (e) => setNewVeh((prev) => ({
									...prev,
									conversionStatus: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Converted",
										children: "Converted to CNG"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Petrol Only",
										children: "No CNG Kit (Petrol Only)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "In-Progress",
										children: "Active Kit Conversion In-Progress"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Operating Hub Branch"
							}), activeBranchName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								readOnly: true,
								value: activeBranchName,
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-mist/30 text-muted-foreground focus:outline-none"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newVeh.branch,
								onChange: (e) => setNewVeh((prev) => ({
									...prev,
									branch: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Katsina HQ",
									children: "Katsina HQ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Gombe Hub",
									children: "Gombe Hub"
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Onboard Asset"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-3 items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full md:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search by plate number or ID...",
							className: "w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 w-full md:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							className: "rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Available",
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "On Road",
									children: "On Road"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "In Workshop",
									children: "In Workshop"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: conversionFilter,
							onChange: (e) => setConversionFilter(e.target.value),
							className: "rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All Conversions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Converted",
									children: "Converted to CNG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Petrol Only",
									children: "Petrol Only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "In-Progress",
									children: "In-Progress"
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((v) => {
						const driver = rawDrivers.find((d) => d.id === v.assignedDriverId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display font-bold text-base text-foreground",
									children: v.plateNumber
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-mono font-semibold",
									children: [
										v.id,
										" · ",
										v.branch
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${v.status === "Available" ? "bg-emerald-soft text-forest-deep" : v.status === "On Road" ? "bg-blue-100 text-blue-600" : v.status === "In Workshop" ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-500"}`,
									children: v.status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 text-xs text-muted-foreground mb-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Class: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: v.type
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Fuel System: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [
												v.fuelType,
												" (",
												v.conversionStatus,
												")"
											]
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground/75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Active Driver: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: driver ? driver.name : "Unassigned"
										})] })]
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-border/50 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-semibold",
									children: ["Last service: ", v.lastServiceDate || "N/A"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: v.status,
										onChange: (e) => updateVehicleStatus(v.id, e.target.value),
										className: "rounded-lg border border-border bg-white px-2 py-1 text-[10px] font-bold focus:outline-emerald",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Available",
												children: "Set Available"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "On Road",
												children: "Set On Road"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "In Workshop",
												children: "Set Workshop"
											})
										]
									})
								})]
							})]
						}, v.id);
					})
				})]
			})
		]
	});
}
function RemittanceTracker({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [selectedDate, setSelectedDate] = (0, import_react.useState)("2026-07-06");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [contracts, setContracts] = (0, import_react.useState)(() => ERPStore.getHPContracts());
	const [drivers, setDrivers] = (0, import_react.useState)(() => ERPStore.getDrivers());
	const [recordingContract, setRecordingContract] = (0, import_react.useState)(null);
	const [recordingAmount, setRecordingAmount] = (0, import_react.useState)("12000");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("Bank Transfer");
	const [paymentNotes, setPaymentNotes] = (0, import_react.useState)("");
	const [activeHistoryDriver, setActiveHistoryDriver] = (0, import_react.useState)(null);
	const refreshData = () => {
		setContracts(ERPStore.getHPContracts());
		setDrivers(ERPStore.getDrivers());
	};
	const filteredContracts = contracts.filter((c) => {
		const driver = drivers.find((d) => d.id === c.driverId);
		if (!driver) return false;
		if (activeBranchName && driver.branch !== activeBranchName) return false;
		return true;
	});
	const stats = (() => {
		let expected = 0;
		let collected = 0;
		let paidCount = 0;
		let partialCount = 0;
		let unpaidCount = 0;
		filteredContracts.forEach((c) => {
			expected += c.dailyTarget;
			const paymentToday = c.paymentHistory?.find((p) => p.date === selectedDate);
			if (paymentToday) {
				collected += paymentToday.amount;
				if (paymentToday.amount >= c.dailyTarget) paidCount++;
				else if (paymentToday.amount > 0) partialCount++;
				else unpaidCount++;
			} else unpaidCount++;
		});
		const complianceRate = expected > 0 ? collected / expected * 100 : 0;
		return {
			expected,
			collected,
			paidCount,
			partialCount,
			unpaidCount,
			complianceRate
		};
	})();
	const displayedItems = filteredContracts.map((c) => {
		const driver = drivers.find((d) => d.id === c.driverId);
		const paymentToday = c.paymentHistory?.find((p) => p.date === selectedDate);
		const amountPaid = paymentToday ? paymentToday.amount : 0;
		let status = "UNPAID";
		if (amountPaid >= c.dailyTarget) status = "PAID";
		else if (amountPaid > 0) status = "PARTIAL";
		return {
			contract: c,
			driver,
			amountPaid,
			status
		};
	}).filter((item) => {
		const nameMatch = item.driver?.name.toLowerCase().includes(searchQuery.toLowerCase());
		const plateMatch = item.contract.vehicleId.toLowerCase().includes(searchQuery.toLowerCase());
		const idMatch = item.contract.id.toLowerCase().includes(searchQuery.toLowerCase());
		const searchMatch = nameMatch || plateMatch || idMatch;
		const statusMatch = statusFilter === "ALL" || item.status === statusFilter;
		return searchMatch && statusMatch;
	});
	const handleRecordPaymentSubmit = (e) => {
		e.preventDefault();
		if (!recordingContract) return;
		const amount = Number(recordingAmount);
		if (isNaN(amount) || amount <= 0) {
			toast.error("Invalid Amount", { description: "Please enter a valid remittance amount." });
			return;
		}
		const updatedContracts = contracts.map((c) => {
			if (c.id === recordingContract.id) {
				const cleanedHistory = (c.paymentHistory ? [...c.paymentHistory] : []).filter((p) => p.date !== selectedDate);
				return {
					...c,
					balancePaid: c.balancePaid + amount,
					status: c.balancePaid + amount >= c.totalAmount ? "Completed" : c.status,
					paymentHistory: [...cleanedHistory, {
						date: selectedDate,
						amount
					}]
				};
			}
			return c;
		});
		ERPStore.saveHPContracts(updatedContracts);
		const transactions = ERPStore.getTransactions();
		const driver = drivers.find((d) => d.id === recordingContract.driverId);
		const newTransaction = {
			id: `TR-${Date.now().toString().slice(-4)}`,
			type: "Revenue",
			amount,
			category: "Hire Purchase",
			description: `Daily HP Remittance - ${driver?.name || "Driver"} (${recordingContract.vehicleId}) - Channel: ${paymentMethod}`,
			branch: driver?.branch || "Katsina HQ",
			date: selectedDate
		};
		ERPStore.saveTransactions([newTransaction, ...transactions]);
		ERPStore.addAuditLog(driver?.name || "Operations Officer", "Branch Operations Officer", "Record Remittance", `Logged daily HP remittance of ₦${amount.toLocaleString()} for vehicle ${recordingContract.vehicleId} on date ${selectedDate}.`);
		toast.success("Remittance Recorded Successfully", { description: `Logged ₦${amount.toLocaleString()} for ${driver?.name}. Balance updated.` });
		setRecordingContract(null);
		setPaymentNotes("");
		refreshData();
	};
	const handleSendReminder = (driver, contract) => {
		toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
			loading: `Formatting alert for ${driver.name}...`,
			success: () => {
				return `SMS Warning dispatched to ${driver.name} (Guarantor: ${driver.guarantorName} - ${driver.guarantorPhone})`;
			},
			error: "SMS gateway error. Please try again."
		});
	};
	const formatNaira = (value) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0
		}).format(value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Daily Remittance Board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Log and review Hire Purchase payments, track branch collection stats, and dispatch late payment warnings."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-emerald" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground mr-1",
								children: "Date:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: selectedDate,
								onChange: (e) => setSelectedDate(e.target.value),
								className: "bg-transparent text-foreground focus:outline-none border-none font-mono cursor-pointer"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							toast.success("Remittance CSV Compiled", { description: `Successfully exported remittance checklist for date ${selectedDate}` });
						},
						className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold hover:bg-muted transition cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4 text-muted-foreground" }), "Export Day Checklist"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Expected Collection"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-forest-deep/10 dark:bg-forest/20 flex items-center justify-center text-forest",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold",
								children: formatNaira(stats.expected)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-muted-foreground mt-2",
								children: [
									"For ",
									filteredContracts.length,
									" active HP tricycles"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Collected Today"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-emerald",
								children: formatNaira(stats.collected)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-muted-foreground mt-2",
								children: ["Progress: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-emerald",
									children: [stats.complianceRate.toFixed(1), "%"]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Compliance Target"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-blue-accent/10 flex items-center justify-center text-blue-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-2xl font-bold",
								children: [stats.complianceRate.toFixed(1), "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-emerald h-1.5 rounded-full transition-all duration-500",
									style: { width: `${Math.min(stats.complianceRate, 100)}%` }
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Pending Drivers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-red-500",
								children: stats.unpaidCount
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-2",
								children: "Requires payment callback alerts"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card shadow-soft overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-3.5 h-4.5 w-4.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search by driver name or vehicle plate...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 py-3 text-sm focus:border-emerald focus:outline-none transition-all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground flex items-center gap-1 mr-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5" }), " Filter:"]
						}), [
							{
								id: "ALL",
								label: "All Drivers"
							},
							{
								id: "PAID",
								label: "Paid"
							},
							{
								id: "PARTIAL",
								label: "Partial"
							},
							{
								id: "UNPAID",
								label: "Yet to Remit"
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStatusFilter(f.id),
							className: `px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${statusFilter === f.id ? "bg-forest text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
							children: f.label
						}, f.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: displayedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-12 text-center text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-10 w-10 mx-auto text-muted-foreground/40 mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "No contracts match your query and criteria."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground/60 mt-1",
								children: "Try relaxing filters or search terms."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-muted/10 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4",
									children: "Driver Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4",
									children: "HP Vehicle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4",
									children: "Daily Rate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4",
									children: "Collected Today"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4",
									children: "Remittance Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: displayedItems.map((item) => {
								const driverName = item.driver?.name || "Unknown Driver";
								const driverPhone = item.driver?.phone || "No Phone";
								const isPaid = item.status === "PAID";
								const isPartial = item.status === "PARTIAL";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/5 transition duration-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-10 w-10 shrink-0 rounded-full bg-emerald/10 text-emerald font-bold flex items-center justify-center text-sm border border-emerald/20",
													children: driverName.charAt(0)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-sm",
													children: driverName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground font-mono mt-0.5",
													children: driverPhone
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold text-foreground",
												children: item.contract.vehicleId
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5",
												children: ["HP Contract: ", item.contract.id]
											})] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-bold font-mono text-foreground",
												children: formatNaira(item.contract.dailyTarget)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-bold font-mono text-foreground",
												children: formatNaira(item.amountPaid)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald/10 text-emerald border border-emerald/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Full Remitted"]
											}) : isPartial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 animate-pulse" }),
													" Partial (₦",
													item.amountPaid.toLocaleString(),
													")"
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }), " Yet to Remit"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															setRecordingContract(item.contract);
															setRecordingAmount(item.contract.dailyTarget.toString());
															setPaymentNotes("");
														},
														className: "inline-flex h-8 items-center gap-1 rounded-xl bg-forest px-3 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5" }), " Record Payment"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setActiveHistoryDriver({
															contract: item.contract,
															driver: item.driver
														}),
														className: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition cursor-pointer",
														title: "View Payments History",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" })
													}),
													!isPaid && item.driver && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleSendReminder(item.driver, item.contract),
														className: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition cursor-pointer",
														title: "Send SMS Reminder",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
													})
												]
											})
										})
									]
								}, item.contract.id);
							})
						})]
					})
				})]
			}),
			recordingContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-bold text-lg text-foreground",
							children: "Record Daily Remittance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRecordingContract(null),
							className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleRecordPaymentSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-muted/30 border border-border p-3 flex gap-3 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-emerald/10 text-emerald flex items-center justify-center font-bold",
									children: drivers.find((d) => d.id === recordingContract.driverId)?.name.charAt(0) || "D"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: drivers.find((d) => d.id === recordingContract.driverId)?.name || "Driver"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-muted-foreground font-mono",
									children: [
										"Vehicle Plate: ",
										recordingContract.vehicleId,
										" | Target: ₦",
										recordingContract.dailyTarget.toLocaleString(),
										"/day"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Remittance Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-2xl border border-border bg-muted/10 px-4 py-3 text-sm font-mono text-muted-foreground",
									children: selectedDate
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Amount Collected (NGN)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-4 top-3 text-sm font-bold text-muted-foreground",
										children: "₦"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: recordingAmount,
										onChange: (e) => setRecordingAmount(e.target.value),
										className: "w-full rounded-2xl border border-border bg-muted/20 pl-8 pr-4 py-3 text-sm font-bold focus:border-emerald focus:outline-none",
										placeholder: "e.g. 12000"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Payment Method"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										"Bank Transfer",
										"Cash",
										"POS"
									].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPaymentMethod(method),
										className: `py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${paymentMethod === method ? "bg-forest/10 border-forest text-forest dark:text-emerald" : "border-border hover:bg-muted text-muted-foreground"}`,
										children: method
									}, method))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
									children: "Remittance Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: paymentNotes,
									onChange: (e) => setPaymentNotes(e.target.value),
									placeholder: "Optional note e.g. paid half due to flat tyre...",
									className: "w-full rounded-2xl border border-border bg-muted/20 px-4 py-3 text-xs focus:border-emerald focus:outline-none h-16 resize-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRecordingContract(null),
									className: "flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-3 rounded-2xl bg-forest hover:bg-forest-deep text-xs font-semibold text-white transition cursor-pointer shadow-glow-soft",
									children: "Save Remittance"
								})]
							})
						]
					})]
				})
			}),
			activeHistoryDriver && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-card border-l border-border h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-left text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display font-bold text-lg flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5 text-emerald" }), "Payment Ledger History"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveHistoryDriver(null),
									className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer",
									children: "✕"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl bg-muted/20 border border-border space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-full bg-emerald/10 text-emerald flex items-center justify-center font-bold text-lg",
										children: activeHistoryDriver.driver.name.charAt(0)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-base",
										children: activeHistoryDriver.driver.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Keke: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-foreground font-bold",
											children: activeHistoryDriver.contract.vehicleId
										})]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-bold text-muted-foreground block",
										children: "Balance Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold font-mono",
										children: formatNaira(activeHistoryDriver.contract.balancePaid)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] uppercase font-bold text-muted-foreground block",
										children: "Total Contract"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold font-mono",
										children: formatNaira(activeHistoryDriver.contract.totalAmount)
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-xs uppercase tracking-wider text-muted-foreground",
									children: "Recent Payments Logs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 max-h-[50vh] overflow-y-auto",
									children: activeHistoryDriver.contract.paymentHistory && activeHistoryDriver.contract.paymentHistory.length > 0 ? [...activeHistoryDriver.contract.paymentHistory].reverse().map((pay, i) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center p-3 rounded-xl border border-border bg-muted/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [pay.amount >= activeHistoryDriver.contract.dailyTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-5 w-5 rounded-full bg-emerald/10 text-emerald flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-5 w-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-mono font-bold text-foreground",
													children: pay.date
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[9px] text-muted-foreground mt-0.5",
													children: "Recorded by operations officer"
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-bold font-mono",
												children: formatNaira(pay.amount)
											})]
										}, i);
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-8 text-center text-xs text-muted-foreground/60",
										children: "No payment history logged for this contract yet."
									})
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveHistoryDriver(null),
						className: "w-full py-3 rounded-2xl bg-muted border border-border hover:bg-muted/80 text-xs font-semibold transition cursor-pointer",
						children: "Close History Drawer"
					})]
				})
			})
		]
	});
}
function HirePurchase({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [contracts, setContracts] = (0, import_react.useState)(() => ERPStore.getHPContracts());
	const [drivers, setDrivers] = (0, import_react.useState)(() => ERPStore.getDrivers());
	const [vehicles, setVehicles] = (0, import_react.useState)(() => ERPStore.getVehicles());
	const [search, setSearch] = (0, import_react.useState)("");
	const [showCreateForm, setShowCreateForm] = (0, import_react.useState)(false);
	const [newContract, setNewContract] = (0, import_react.useState)({
		driverId: "",
		vehicleId: "",
		totalAmount: 475e4,
		dailyTarget: 12e3,
		startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		endDateExpected: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0]
	});
	const [calcData, setCalcData] = (0, import_react.useState)({
		vehicleValue: 475e4,
		dailyRemittance: 12e3
	});
	const [showCalculator, setShowCalculator] = (0, import_react.useState)(false);
	const syncData = () => {
		setContracts(ERPStore.getHPContracts());
		setDrivers(ERPStore.getDrivers());
		setVehicles(ERPStore.getVehicles());
	};
	const activeContractsDriverIds = contracts.filter((c) => c.status !== "Completed").map((c) => c.driverId);
	const availableDrivers = drivers.filter((d) => d.status === "Active" && !activeContractsDriverIds.includes(d.id) && (!activeBranchName || d.branch === activeBranchName));
	const activeContractsVehicleIds = contracts.filter((c) => c.status !== "Completed").map((c) => c.vehicleId);
	const availableVehicles = vehicles.filter((v) => v.status === "Available" && !activeContractsVehicleIds.includes(v.id) && (!activeBranchName || v.branch === activeBranchName));
	const filtered = contracts.filter((c) => {
		const driver = drivers.find((d) => d.id === c.driverId);
		const matchesBranch = !activeBranchName || c.branch === activeBranchName;
		return (c.id.toLowerCase().includes(search.toLowerCase()) || driver && driver.name.toLowerCase().includes(search.toLowerCase()) || c.vehicleId.toLowerCase().includes(search.toLowerCase())) && matchesBranch;
	});
	const calculatedDays = Math.ceil(calcData.vehicleValue / calcData.dailyRemittance);
	const calculatedWeeks = (calculatedDays / 6).toFixed(1);
	const calculatedMonths = (calculatedDays / 26).toFixed(1);
	const triggerDefaultAlert = (id) => {
		const updated = contracts.map((c) => {
			if (c.id === id) {
				const nextStatus = c.status === "Missed Remittance" ? "Defaulted" : "Missed Remittance";
				return {
					...c,
					status: nextStatus
				};
			}
			return c;
		});
		setContracts(updated);
		ERPStore.saveHPContracts(updated);
		toast.warning("Contract Status Flagged", { description: `Contract ID ${id} alert status changed.` });
	};
	const handleCreateContractSubmit = (e) => {
		e.preventDefault();
		if (!newContract.driverId || !newContract.vehicleId) {
			toast.error("Selection Error", { description: "Please select both a driver and a vehicle." });
			return;
		}
		const driver = drivers.find((d) => d.id === newContract.driverId);
		const vehicle = vehicles.find((v) => v.id === newContract.vehicleId);
		const newHP = {
			id: `HP-${Date.now().toString().slice(-3)}`,
			driverId: newContract.driverId,
			vehicleId: newContract.vehicleId,
			branch: activeBranchName || driver?.branch || "Katsina HQ",
			totalAmount: Number(newContract.totalAmount),
			balancePaid: 0,
			dailyTarget: Number(newContract.dailyTarget),
			startDate: newContract.startDate,
			endDateExpected: newContract.endDateExpected,
			status: "Active",
			paymentHistory: []
		};
		const updatedContracts = [newHP, ...contracts];
		setContracts(updatedContracts);
		ERPStore.saveHPContracts(updatedContracts);
		const updatedVehicles = vehicles.map((v) => v.id === newContract.vehicleId ? {
			...v,
			status: "On Road",
			assignedDriverId: newContract.driverId
		} : v);
		setVehicles(updatedVehicles);
		ERPStore.saveVehicles(updatedVehicles);
		ERPStore.addAuditLog(driver?.name || "Operations Desk", "Branch Operations Officer", "Create HP Lease", `Created lease contract ${newHP.id} for driver ${driver?.name} on vehicle ${vehicle?.plateNumber}.`);
		toast.success("HP Lease Initiated", { description: `Lease contract ${newHP.id} registered. Vehicle ${vehicle?.plateNumber} set to active.` });
		setNewContract({
			driverId: "",
			vehicleId: "",
			totalAmount: 475e4,
			dailyTarget: 12e3,
			startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			endDateExpected: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0]
		});
		setShowCreateForm(false);
		syncData();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Hire Purchase Portfolio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Log lease-to-own contracts for CNG tricycles, check driver payments, monitor progress percentages and flag defaults."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowCreateForm(true),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-4 w-4" }), "New HP Lease"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowCalculator(!showCalculator),
						className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4 text-muted-foreground" }), "HP Repayment Calculator"]
					})]
				})]
			}),
			showCalculator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-emerald/30 bg-emerald-500/5 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-display font-bold text-base text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5 text-emerald" }), "Hire Purchase Repayment Schedule Calculator"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "CNG Tricycle Total Value (₦)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: calcData.vehicleValue,
							onChange: (e) => setCalcData((prev) => ({
								...prev,
								vehicleValue: Number(e.target.value)
							})),
							className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono font-bold"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
							children: "Daily Target Remittance (₦)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: calcData.dailyRemittance,
							onChange: (e) => setCalcData((prev) => ({
								...prev,
								dailyRemittance: Number(e.target.value)
							})),
							className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono font-bold"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 grid-cols-1 sm:grid-cols-3 pt-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-2xl border border-border p-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-semibold text-muted-foreground uppercase",
									children: "Repayment Days"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-xl font-bold text-emerald mt-1",
									children: [calculatedDays, " Shifts"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-2xl border border-border p-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-semibold text-muted-foreground uppercase",
									children: "Estimated Weeks (6 days/wk)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-xl font-bold text-emerald mt-1",
									children: [calculatedWeeks, " Weeks"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-2xl border border-border p-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-semibold text-muted-foreground uppercase",
									children: "Estimated Months"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-xl font-bold text-emerald mt-1",
									children: [calculatedMonths, " Months"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full md:w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search contracts by driver name, plate, or ID...",
					className: "w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-card"
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-12 text-center text-muted-foreground bg-card border border-border rounded-3xl shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-10 w-10 mx-auto text-muted-foreground/45 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "No lease contracts registered in this branch."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground/60 mt-1",
						children: "Initiate a contract to start lease tracker ledger operations."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: filtered.map((contract) => {
					const driver = drivers.find((d) => d.id === contract.driverId);
					const vehicle = vehicles.find((v) => v.id === contract.vehicleId);
					const progressPercent = contract.balancePaid / contract.totalAmount * 100;
					const outstanding = contract.totalAmount - contract.balancePaid;
					const isWarning = contract.status === "Missed Remittance" || contract.status === "Defaulted";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border p-6 bg-card shadow-soft relative overflow-hidden transition-all duration-300 hover-lift ${isWarning ? "border-amber-300" : "border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border pb-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-display font-bold text-base text-foreground",
									children: ["Contract: ", contract.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-mono font-semibold",
									children: [
										"Driver: ",
										driver?.name || contract.driverId,
										" (",
										driver?.id || "N/A",
										")"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${contract.status === "Active" ? "bg-emerald-500/10 text-emerald" : contract.status === "Completed" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500 animate-pulse"}`,
									children: [contract.status === "Completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-2.5 w-2.5" }), contract.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 text-xs mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] uppercase tracking-wider text-muted-foreground block",
									children: "Leased Vehicle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [
										vehicle?.plateNumber || contract.vehicleId,
										" [",
										vehicle?.type || "Tricycle",
										"]"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] uppercase tracking-wider text-muted-foreground block",
									children: "Daily Repayment Target"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono font-bold text-emerald",
									children: ["₦", contract.dailyTarget.toLocaleString()]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 mb-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Repayment Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progressPercent.toFixed(1), "%"] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-muted h-2.5 rounded-full overflow-hidden border border-border/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-full rounded-full transition-all duration-500 ${isWarning ? "bg-amber-500" : "bg-emerald"}`,
											style: { width: `${Math.min(progressPercent, 100)}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Paid: ₦", contract.balancePaid.toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Outstanding: ₦", outstanding.toLocaleString()] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t border-border flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Completion: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: contract.endDateExpected
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => triggerDefaultAlert(contract.id),
										className: "rounded-lg border border-border bg-card hover:bg-muted px-2.5 py-1.5 text-[10px] font-bold transition cursor-pointer",
										children: "Simulate Default Alert"
									})
								})]
							})
						]
					}, contract.id);
				})
			}),
			showCreateForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-bold text-lg text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-5 w-5 text-emerald" }), "Register New HP Lease Agreement"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowCreateForm(false),
							className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateContractSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
										children: [
											"Select Driver (",
											activeBranchName || "All Hubs",
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										required: true,
										value: newContract.driverId,
										onChange: (e) => setNewContract((prev) => ({
											...prev,
											driverId: e.target.value
										})),
										className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Driver --"
										}), availableDrivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: d.id,
											children: [
												d.name,
												" (",
												d.id,
												")"
											]
										}, d.id))]
									}),
									availableDrivers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-red-500 block mt-1",
										children: "⚠️ No drivers available without active contracts in this branch."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
										children: [
											"Select Tricycle (",
											activeBranchName || "All Hubs",
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										required: true,
										value: newContract.vehicleId,
										onChange: (e) => setNewContract((prev) => ({
											...prev,
											vehicleId: e.target.value
										})),
										className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- Choose Vehicle --"
										}), availableVehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: v.id,
											children: [
												v.id,
												" (",
												v.plateNumber,
												")"
											]
										}, v.id))]
									}),
									availableVehicles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-red-500 block mt-1",
										children: "⚠️ No available vehicles in this branch."
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Total Lease Target (₦)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: newContract.totalAmount,
									onChange: (e) => setNewContract((prev) => ({
										...prev,
										totalAmount: Number(e.target.value)
									})),
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Daily Remittance Target (₦)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: newContract.dailyTarget,
									onChange: (e) => setNewContract((prev) => ({
										...prev,
										dailyTarget: Number(e.target.value)
									})),
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Agreement Start Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									required: true,
									value: newContract.startDate,
									onChange: (e) => setNewContract((prev) => ({
										...prev,
										startDate: e.target.value
									})),
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Agreement End Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									required: true,
									value: newContract.endDateExpected,
									onChange: (e) => setNewContract((prev) => ({
										...prev,
										endDateExpected: e.target.value
									})),
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-muted/30 border border-border p-3 text-xs flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0 text-emerald mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground text-[10px]",
									children: [
										"Creating this agreement will set the selected tricycle's status to ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\"On Road\"" }),
										" and auto-assign the driver in the fleet register. Audit trails will log this transaction."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowCreateForm(false),
									className: "flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: availableDrivers.length === 0 || availableVehicles.length === 0,
									className: "flex-1 py-3 rounded-2xl bg-forest hover:bg-forest-deep text-xs font-semibold text-white transition cursor-pointer shadow-glow-soft disabled:opacity-40",
									children: "Onboard Contract"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
function WorkshopConversions({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [jobCards, setJobCards] = (0, import_react.useState)(ERPStore.getJobCards());
	const [conversions, setConversions] = (0, import_react.useState)(ERPStore.getConversions());
	const [techSection, setTechSection] = (0, import_react.useState)("job-cards");
	const [showJobForm, setShowJobForm] = (0, import_react.useState)(false);
	const [newJob, setNewJob] = (0, import_react.useState)({
		customerName: "",
		customerPhone: "",
		vehiclePlate: "",
		vehicleModel: "",
		issueDescription: "",
		assignedTechnicianId: "EMP-05",
		laborCharges: 8e3
	});
	const [showConvForm, setShowConvForm] = (0, import_react.useState)(false);
	const [newConv, setNewConv] = (0, import_react.useState)({
		customerName: "",
		vehiclePlate: "",
		vehicleModel: "",
		cngKitType: "Sequential 4-Cylinder Kit",
		cylinderSize: "60L Seamless Steel CNG Cylinder",
		cost: 75e4,
		assignedEngineerId: "EMP-04"
	});
	const technicians = ERPStore.getEmployees().filter((e) => e.department === "Technical" && (activeBranchName ? e.branch === activeBranchName : true));
	ERPStore.getInventory();
	(0, import_react.useEffect)(() => {
		if (technicians.length > 0) {
			setNewJob((prev) => ({
				...prev,
				assignedTechnicianId: technicians[0].id
			}));
			setNewConv((prev) => ({
				...prev,
				assignedEngineerId: technicians[0].id
			}));
		}
	}, [selectedBranch]);
	const handleCreateJobCard = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `JB-${Date.now().toString().slice(-4)}`,
			customerName: newJob.customerName,
			customerPhone: newJob.customerPhone,
			vehiclePlate: newJob.vehiclePlate.toUpperCase(),
			vehicleModel: newJob.vehicleModel,
			issueDescription: newJob.issueDescription,
			assignedTechnicianId: newJob.assignedTechnicianId,
			laborCharges: Number(newJob.laborCharges),
			partsUsed: [],
			status: "Inspecting",
			branch: activeBranchName || "Katsina HQ",
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
		};
		const updated = [newEntry, ...jobCards];
		setJobCards(updated);
		ERPStore.saveJobCards(updated);
		const fleetVehicles = ERPStore.getVehicles();
		if (fleetVehicles.some((v) => v.plateNumber === newJob.vehiclePlate.toUpperCase())) {
			const updatedVeh = fleetVehicles.map((v) => v.plateNumber === newJob.vehiclePlate.toUpperCase() ? {
				...v,
				status: "In Workshop"
			} : v);
			ERPStore.saveVehicles(updatedVeh);
		}
		const techName = technicians.find((t) => t.id === newJob.assignedTechnicianId)?.name || "Unassigned";
		ERPStore.addAuditLog("Workshop Manager", "Workshop Manager", "Create Job Card", `Created repair card ${newEntry.id} for ${newJob.vehiclePlate}. Tech: ${techName}`);
		toast.success("Job Card Logged", { description: `Job card ${newEntry.id} assigned to ${techName}.` });
		setNewJob({
			customerName: "",
			customerPhone: "",
			vehiclePlate: "",
			vehicleModel: "",
			issueDescription: "",
			assignedTechnicianId: technicians[0]?.id || "EMP-05",
			laborCharges: 8e3
		});
		setShowJobForm(false);
	};
	const handleCreateConversion = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `CNG-${Date.now().toString().slice(-4)}`,
			customerName: newConv.customerName,
			vehiclePlate: newConv.vehiclePlate.toUpperCase(),
			vehicleModel: newConv.vehicleModel,
			cngKitType: newConv.cngKitType,
			cylinderSize: newConv.cylinderSize,
			cost: Number(newConv.cost),
			status: "Inspection",
			assignedEngineers: [technicians.find((t) => t.id === newConv.assignedEngineerId)?.name || "Engr. Yusuf Bello"],
			branch: activeBranchName || "Katsina HQ",
			dateStarted: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
		};
		const updated = [newEntry, ...conversions];
		setConversions(updated);
		ERPStore.saveConversions(updated);
		const fleetVehicles = ERPStore.getVehicles();
		if (fleetVehicles.find((v) => v.plateNumber === newConv.vehiclePlate.toUpperCase())) {
			const updatedVeh = fleetVehicles.map((v) => v.plateNumber === newConv.vehiclePlate.toUpperCase() ? {
				...v,
				conversionStatus: "In-Progress",
				status: "In Workshop"
			} : v);
			ERPStore.saveVehicles(updatedVeh);
		}
		ERPStore.addAuditLog("CNG Operations", "Operations Manager", "Start CNG Conversion", `Registered conversion ${newEntry.id} for vehicle ${newConv.vehiclePlate}.`);
		toast.success("Conversion Logged", { description: `CNG conversion project ${newEntry.id} initialized.` });
		setNewConv({
			customerName: "",
			vehiclePlate: "",
			vehicleModel: "",
			cngKitType: "Sequential 4-Cylinder Kit",
			cylinderSize: "60L Seamless Steel CNG Cylinder",
			cost: 75e4,
			assignedEngineerId: "EMP-04"
		});
		setShowConvForm(false);
	};
	const advanceConversionStep = (id, currentStep) => {
		const stepsOrder = [
			"Inspection",
			"Quotation Approved",
			"Installation",
			"Testing & Calibration",
			"Certification",
			"Handed Over"
		];
		const idx = stepsOrder.indexOf(currentStep);
		if (idx === -1 || idx === stepsOrder.length - 1) return;
		const nextStep = stepsOrder[idx + 1];
		const updated = conversions.map((c) => {
			if (c.id === id) {
				const entry = {
					...c,
					status: nextStep
				};
				if (nextStep === "Handed Over") {
					entry.dateCompleted = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
					const transactions = ERPStore.getTransactions();
					const newTransaction = {
						id: `TR-${Date.now().toString().slice(-4)}`,
						type: "Revenue",
						amount: c.cost,
						category: "CNG Conversion",
						description: `CNG conversion completion payout: ${c.vehiclePlate} (${c.customerName})`,
						branch: c.branch,
						date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
					};
					ERPStore.saveTransactions([newTransaction, ...transactions]);
					const fleetVehicles = ERPStore.getVehicles();
					if (fleetVehicles.find((v) => v.plateNumber === c.vehiclePlate)) {
						const updatedVeh = fleetVehicles.map((v) => v.plateNumber === c.vehiclePlate ? {
							...v,
							conversionStatus: "Converted",
							fuelType: "CNG",
							status: "Available"
						} : v);
						ERPStore.saveVehicles(updatedVeh);
					}
				}
				return entry;
			}
			return c;
		});
		setConversions(updated);
		ERPStore.saveConversions(updated);
		ERPStore.addAuditLog("Technical Dept", "Workshop Manager", "CNG Status Update", `Conversion ${id} advanced to: ${nextStep}`);
		toast.success("Conversion Project Updated", { description: `Advanced to: ${nextStep}` });
	};
	const markJobCardHandedOver = (id) => {
		const updated = jobCards.map((jb) => {
			if (jb.id === id) {
				const totalInvoice = jb.laborCharges + jb.partsUsed.reduce((sum, p) => sum + p.cost, 0);
				const transactions = ERPStore.getTransactions();
				const newTransaction = {
					id: `TR-${Date.now().toString().slice(-4)}`,
					type: "Revenue",
					amount: totalInvoice,
					category: "Workshop Repairs",
					description: `Workshop invoice collection: Job card ${jb.id} (${jb.customerName})`,
					branch: jb.branch,
					date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
				};
				ERPStore.saveTransactions([newTransaction, ...transactions]);
				const fleetVehicles = ERPStore.getVehicles();
				if (fleetVehicles.find((v) => v.plateNumber === jb.vehiclePlate)) {
					const updatedVeh = fleetVehicles.map((v) => v.plateNumber === jb.vehiclePlate ? {
						...v,
						status: "Available"
					} : v);
					ERPStore.saveVehicles(updatedVeh);
				}
				return {
					...jb,
					status: "Handed Over"
				};
			}
			return jb;
		});
		setJobCards(updated);
		ERPStore.saveJobCards(updated);
		ERPStore.addAuditLog("Technical Dept", "Workshop Manager", "Close Job Card", `Closed card ID ${id} and collected final payments.`);
		toast.success("Invoice Paid & Vehicle Dispatched", { description: `Job card has been archived as completed/paid.` });
	};
	const advanceJobStatus = (id, current) => {
		const stages = [
			"Inspecting",
			"Diagnostics",
			"Awaiting Approval",
			"Repairing",
			"Completed",
			"Handed Over"
		];
		const nextIdx = stages.indexOf(current) + 1;
		if (nextIdx >= stages.length) return;
		const nextStage = stages[nextIdx];
		const updated = jobCards.map((jb) => jb.id === id ? {
			...jb,
			status: nextStage
		} : jb);
		setJobCards(updated);
		ERPStore.saveJobCards(updated);
		toast.success("Job Card Progressed", { description: `Status advanced to ${nextStage}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTechSection("job-cards"),
						className: `flex items-center gap-2 font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${techSection === "job-cards" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5" }), "Repair Job Cards"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTechSection("cng-conversions"),
						className: `flex items-center gap-2 font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${techSection === "cng-conversions" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-5 w-5" }), "CNG Conversions"]
					})]
				}), techSection === "job-cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowJobForm(!showJobForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Create Job Card"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowConvForm(!showConvForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Schedule CNG Conversion"]
				})]
			}),
			techSection === "job-cards" && showJobForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreateJobCard,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Create Diagnostics Repair Card"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Customer Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newJob.customerName,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									customerName: e.target.value
								})),
								placeholder: "Usman Dangote",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newJob.customerPhone,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									customerPhone: e.target.value
								})),
								placeholder: "0803XXXXXXX",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Plate Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newJob.vehiclePlate,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									vehiclePlate: e.target.value
								})),
								placeholder: "e.g. KT-124-AAA",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Model / Year"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newJob.vehicleModel,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									vehicleModel: e.target.value
								})),
								placeholder: "e.g. Toyota Corolla 2012",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Assign Mechanic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newJob.assignedTechnicianId,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									assignedTechnicianId: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: technicians.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: t.id,
									children: [
										t.name,
										" (",
										t.role,
										")"
									]
								}, t.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Est. Labour Charge (₦)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newJob.laborCharges,
								onChange: (e) => setNewJob((prev) => ({
									...prev,
									laborCharges: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
						children: "Vehicle Issue Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: newJob.issueDescription,
						onChange: (e) => setNewJob((prev) => ({
							...prev,
							issueDescription: e.target.value
						})),
						placeholder: "e.g. Excessive fuel consumption, rough gear transitions...",
						className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white h-20"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowJobForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Log Card"
						})]
					})
				]
			}),
			techSection === "cng-conversions" && showConvForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreateConversion,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Schedule CNG Conversion Operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Customer / Organization Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newConv.customerName,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									customerName: e.target.value
								})),
								placeholder: "e.g. Dangote Cement Logistics",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Plate Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newConv.vehiclePlate,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									vehiclePlate: e.target.value
								})),
								placeholder: "e.g. KT-901-TRC",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newConv.vehicleModel,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									vehicleModel: e.target.value
								})),
								placeholder: "e.g. Suzuki Every Bus",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "CNG Kit Class"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newConv.cngKitType,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									cngKitType: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Sequential 4-Cylinder Kit",
										children: "Sequential 4-Cylinder Kit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Sequential 6-Cylinder Kit",
										children: "Sequential 6-Cylinder Kit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Direct Injection Kit",
										children: "Direct Injection Kit"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Cylinder Size Specification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newConv.cylinderSize,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									cylinderSize: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "60L Seamless Steel Cylinder",
										children: "60L Seamless Steel Cylinder"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "90L Seamless Steel Cylinder",
										children: "90L Seamless Steel Cylinder"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "60L Lightweight Composite Cylinder",
										children: "60L Lightweight Composite Cylinder"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Contract Conversion Cost (₦)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newConv.cost,
								onChange: (e) => setNewConv((prev) => ({
									...prev,
									cost: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowConvForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Schedule Conversion"
						})]
					})
				]
			}),
			techSection === "job-cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: jobCards.filter((jb) => activeBranchName ? jb.branch === activeBranchName : true).map((jb) => {
					technicians.find((t) => t.id === jb.assignedTechnicianId);
					const totalInvoice = jb.laborCharges + jb.partsUsed.reduce((sum, p) => sum + p.cost * p.quantity, 0);
					const isClosed = jb.status === "Handed Over";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col justify-between hover-lift",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-display font-bold text-base text-foreground",
									children: ["Job Card: ", jb.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground font-mono font-semibold",
									children: jb.date
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${jb.status === "Handed Over" ? "bg-slate-100 text-muted-foreground" : "bg-emerald-soft text-forest-deep"}`,
									children: jb.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs text-muted-foreground mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"Customer: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: jb.customerName
										}),
										" (",
										jb.customerPhone,
										")"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Vehicle: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-charcoal",
										children: [
											jb.vehiclePlate,
											" (",
											jb.vehicleModel,
											")"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-mist/40 p-3 border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] font-bold uppercase tracking-wider text-muted-foreground",
											children: "Diagnostics report"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-foreground leading-relaxed",
											children: jb.issueDescription
										})]
									})
								]
							}),
							jb.partsUsed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border/60 rounded-xl overflow-hidden text-[10px] mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-mist p-2 font-bold uppercase tracking-wider text-muted-foreground",
									children: "Parts log"
								}), jb.partsUsed.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										part.name,
										" (x",
										part.quantity,
										")"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: ["₦", (part.cost * part.quantity).toLocaleString()]
									})]
								}, part.partId))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-xs font-semibold border-t border-border/50 pt-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Labour Charge: ₦", jb.laborCharges.toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-forest-deep",
									children: ["Total Invoice: ₦", totalInvoice.toLocaleString()]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: !isClosed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: jb.status !== "Completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => advanceJobStatus(jb.id, jb.status),
								className: "rounded-lg border border-border bg-white hover:bg-mist px-3 py-1.5 text-[10px] font-bold text-charcoal transition cursor-pointer",
								children: "Progress Stage"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => markJobCardHandedOver(jb.id),
								className: "rounded-lg bg-emerald text-forest-deep px-3.5 py-1.5 text-[10px] font-bold hover:bg-forest-deep hover:text-white transition cursor-pointer",
								children: "Receive Cash & Handover"
							}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground font-semibold",
								children: "Archived (Closed & Paid)"
							})
						})]
					}, jb.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: conversions.filter((c) => activeBranchName ? c.branch === activeBranchName : true).map((c) => {
					const steps = [
						"Inspection",
						"Quotation Approved",
						"Installation",
						"Testing & Calibration",
						"Certification",
						"Handed Over"
					];
					const activeIdx = steps.indexOf(c.status);
					const isCompleted = c.status === "Handed Over";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border/50 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-display font-bold text-lg text-foreground",
									children: [
										c.vehiclePlate,
										" (",
										c.vehicleModel,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										"Client: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: c.customerName
										}),
										" · Project: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-forest",
											children: c.id
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground font-semibold",
										children: ["Engineers: ", c.assignedEngineers.join(", ")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-mono font-bold text-forest-deep mt-0.5",
										children: ["Cost: ₦", c.cost.toLocaleString()]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-4 sm:grid-cols-6 items-center text-center",
								children: steps.map((step, idx) => {
									const isDone = idx < activeIdx;
									const isCurrent = idx === activeIdx;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ${isDone ? "bg-forest text-white" : isCurrent ? "bg-emerald text-forest-deep animate-pulse shadow-glow-soft" : "bg-mist text-muted-foreground border border-border"}`,
											children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : idx + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[9px] font-bold uppercase tracking-wider block ${isCurrent ? "text-forest-deep font-bold" : "text-muted-foreground"}`,
											children: step.replace(" & Calibration", "").replace(" Approved", "")
										})]
									}, step);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end items-center gap-3 pt-2",
								children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-emerald bg-emerald-soft/50 rounded px-2.5 py-1",
									children: "Conversion Complete (Handed Over & Invoiced)"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => advanceConversionStep(c.id, c.status),
									className: "inline-flex items-center gap-1 rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
									children: ["Advance to Next Step", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})
						]
					}, c.id);
				})
			})
		]
	});
}
function Inventory({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [inventory, setInventory] = (0, import_react.useState)(ERPStore.getInventory());
	const [search, setSearch] = (0, import_react.useState)("");
	const [catFilter, setCatFilter] = (0, import_react.useState)("ALL");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newItem, setNewItem] = (0, import_react.useState)({
		name: "",
		category: "CNG Kits",
		stockLevel: 10,
		minStockLevel: 5,
		unitPrice: 15e3,
		supplier: ""
	});
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const handleAddItem = (e) => {
		e.preventDefault();
		const newEntry = {
			id: `INV-${newItem.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
			name: newItem.name,
			category: newItem.category,
			stockLevel: Number(newItem.stockLevel),
			minStockLevel: Number(newItem.minStockLevel),
			unitPrice: Number(newItem.unitPrice),
			supplier: newItem.supplier || "Local Vendor"
		};
		const updated = [...inventory, newEntry];
		setInventory(updated);
		ERPStore.saveInventory(updated);
		ERPStore.addAuditLog("Inventory Officer", "Inventory Officer", "Create Inventory Item", `Added new stock item ${newItem.name} into registry.`);
		toast.success("Item Added", { description: `${newItem.name} registered under ${newItem.category}.` });
		setNewItem({
			name: "",
			category: "CNG Kits",
			stockLevel: 10,
			minStockLevel: 5,
			unitPrice: 15e3,
			supplier: ""
		});
		setShowAddForm(false);
	};
	const restockItem = (id, qty) => {
		const updated = inventory.map((item) => {
			if (item.id === id) {
				const expenseCost = item.unitPrice * .7 * qty;
				const transactions = ERPStore.getTransactions();
				const newTransaction = {
					id: `TR-${Date.now().toString().slice(-4)}`,
					type: "Expense",
					amount: expenseCost,
					category: "Parts Purchase",
					description: `Restocked ${qty} units of ${item.name} from ${item.supplier}`,
					branch: activeBranchName || "Katsina HQ",
					date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
				};
				ERPStore.saveTransactions([newTransaction, ...transactions]);
				return {
					...item,
					stockLevel: item.stockLevel + qty
				};
			}
			return item;
		});
		setInventory(updated);
		ERPStore.saveInventory(updated);
		ERPStore.addAuditLog("Inventory Officer", "Inventory Officer", "Restock Item", `Restocked item ID ${id} with ${qty} units.`);
		toast.success("Inventory Restocked", { description: `Stock level successfully incremented and expense transaction logged.` });
	};
	const simulateBarcodeScan = () => {
		setScanning(true);
		setTimeout(() => {
			setScanning(false);
			const randomItem = inventory[Math.floor(Math.random() * inventory.length)];
			toast.success("Barcode Scanned Successfully", { description: `Recognized product: ${randomItem.name} (${randomItem.id}). Stock: ${randomItem.stockLevel} units remaining.` });
		}, 1500);
	};
	const filtered = inventory.filter((item) => {
		const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
		const matchesCat = catFilter === "ALL" || item.category === catFilter;
		return matchesSearch && matchesCat;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Inventory & Supply Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Track spare parts, CNG sequential kits, cylinders, engine oils, reorder alerts, and simulate barcode scanning."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: simulateBarcodeScan,
						disabled: scanning,
						className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition disabled:opacity-50 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, { className: "h-4 w-4 text-muted-foreground" }), scanning ? "Scanning..." : "Scan Barcode"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddForm(!showAddForm),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Register Stock Item"]
					})]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddItem,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Register New Inventory Asset"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Item Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newItem.name,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									name: e.target.value
								})),
								placeholder: "e.g. 90L Lightweight Cylinders",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newItem.category,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									category: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CNG Kits",
										children: "CNG Sequential Kits"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Cylinders",
										children: "Seamless Cylinders"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Spare Parts",
										children: "Spare Parts (Brakes, Cables)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Engine Oil",
										children: "Engine Oil & Lubricants"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Tyres",
										children: "Heavy Tyres"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Filters",
										children: "Filters (Air, Oil, Gas)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Tools",
										children: "Workshop Tools"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Initial Stock Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newItem.stockLevel,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									stockLevel: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Minimum Alert Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newItem.minStockLevel,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									minStockLevel: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Retail Unit Price (₦)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newItem.unitPrice,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									unitPrice: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Default Supplier Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newItem.supplier,
								onChange: (e) => setNewItem((prev) => ({
									...prev,
									supplier: e.target.value
								})),
								placeholder: "e.g. TVS Parts Lagos",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Add Stock"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-3 items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full md:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search by part name or item ID...",
							className: "w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: catFilter,
						onChange: (e) => setCatFilter(e.target.value),
						className: "rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white w-full md:w-48",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Categories"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CNG Kits",
								children: "CNG Sequential Kits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Cylinders",
								children: "Seamless Cylinders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Spare Parts",
								children: "Spare Parts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Engine Oil",
								children: "Engine Oil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Tyres",
								children: "Heavy Tyres"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Filters",
								children: "Filters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Tools",
								children: "Workshop Tools"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border border-border/70 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Item ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Item Name / Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Current Stock Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Min Alert Threshold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Retail Unit Cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Supplier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-center",
									children: "Alert Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-right",
									children: "Quick Restock Order"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: filtered.map((item) => {
								const isLow = item.stockLevel <= item.minStockLevel;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-mist/10 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-4 font-mono font-bold text-forest",
											children: item.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-foreground",
												children: item.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: item.category
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-4 text-right font-semibold font-mono",
											children: [item.stockLevel, " units"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-4 text-right font-mono text-muted-foreground",
											children: [item.minStockLevel, " units"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-4 text-right font-mono font-bold text-forest-deep",
											children: ["₦", item.unitPrice.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-4 text-muted-foreground font-semibold",
											children: item.supplier
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-4 text-center",
											children: isLow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 uppercase tracking-wider animate-pulse",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-2.5 w-2.5" }), " Low Stock"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex items-center gap-1 rounded bg-emerald-soft text-forest-deep px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
												children: "Healthy"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1.5 justify-end",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => restockItem(item.id, 10),
													className: "rounded-lg bg-emerald-soft text-forest-deep hover:bg-emerald hover:text-white px-2.5 py-1 text-[10px] font-bold transition cursor-pointer",
													children: "Order +10"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => restockItem(item.id, 50),
													className: "rounded-lg border border-border bg-white hover:bg-mist px-2.5 py-1 text-[10px] font-bold text-charcoal transition cursor-pointer",
													children: "Bulk Order"
												})]
											})
										})
									]
								}, item.id);
							})
						})]
					})
				})]
			})
		]
	});
}
function Finance({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch];
	const [transactions, setTransactions] = (0, import_react.useState)(ERPStore.getTransactions());
	const [search, setSearch] = (0, import_react.useState)("");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("ALL");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [newTrans, setNewTrans] = (0, import_react.useState)({
		type: "Revenue",
		amount: 15e3,
		category: "Other",
		description: "",
		branch: activeBranchName || "Katsina HQ"
	});
	(0, import_react.useEffect)(() => {
		if (activeBranchName) setNewTrans((prev) => ({
			...prev,
			branch: activeBranchName
		}));
	}, [activeBranchName]);
	const handleAddTransaction = (e) => {
		e.preventDefault();
		const updated = [{
			id: `TR-${Date.now().toString().slice(-4)}`,
			type: newTrans.type,
			amount: Number(newTrans.amount),
			category: newTrans.category,
			description: newTrans.description,
			branch: newTrans.branch,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
		}, ...transactions];
		setTransactions(updated);
		ERPStore.saveTransactions(updated);
		ERPStore.addAuditLog("Accounting Team", "Accountant", "Log Transaction", `Recorded ${newTrans.type} of ₦${newTrans.amount} under ${newTrans.category}.`);
		toast.success("Transaction Logged", { description: `${newTrans.category} entry successfully registered in ledger.` });
		setNewTrans({
			type: "Revenue",
			amount: 15e3,
			category: "Other",
			description: "",
			branch: activeBranchName || "Katsina HQ"
		});
		setShowAddForm(false);
	};
	const branchTransactions = activeBranchName ? transactions.filter((t) => t.branch === activeBranchName) : transactions;
	const revenueSources = [
		{
			name: "CNG Conversions",
			value: branchTransactions.filter((t) => t.type === "Revenue" && t.category === "CNG Conversion").reduce((sum, t) => sum + t.amount, 0)
		},
		{
			name: "Hire Purchase",
			value: branchTransactions.filter((t) => t.type === "Revenue" && t.category === "Hire Purchase").reduce((sum, t) => sum + t.amount, 0)
		},
		{
			name: "Workshop Repairs",
			value: branchTransactions.filter((t) => t.type === "Revenue" && t.category === "Workshop Repairs").reduce((sum, t) => sum + t.amount, 0)
		},
		{
			name: "Fleet Remittances",
			value: branchTransactions.filter((t) => t.type === "Revenue" && (t.category === "Fleet Remittance" || t.category === "Other")).reduce((sum, t) => sum + t.amount, 0)
		}
	].filter((source) => source.value > 0);
	const COLORS = [
		"var(--color-forest)",
		"var(--color-emerald)",
		"var(--color-blue-accent)",
		"#f59e0b"
	];
	const totalRevenue = branchTransactions.filter((t) => t.type === "Revenue").reduce((sum, t) => sum + t.amount, 0);
	const totalExpense = branchTransactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
	const netProfit = totalRevenue - totalExpense;
	const filtered = branchTransactions.filter((t) => {
		const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
		const matchesType = typeFilter === "ALL" || t.type === typeFilter;
		return matchesSearch && matchesType;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "General Ledger & Accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Revenues, operating costs, branch cash flow distributions, and double-entry transaction record logs."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(!showAddForm),
					className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Record Entry"]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddTransaction,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Record Financial Entry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Transaction Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newTrans.type,
								onChange: (e) => setNewTrans((prev) => ({
									...prev,
									type: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Revenue",
									children: "Revenue (Incoming Cash)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Expense",
									children: "Expense (Outgoing Cost)"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Transaction Value (₦)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: newTrans.amount,
								onChange: (e) => setNewTrans((prev) => ({
									...prev,
									amount: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Transaction Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: newTrans.category,
								onChange: (e) => setNewTrans((prev) => ({
									...prev,
									category: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: newTrans.type === "Revenue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CNG Conversion",
										children: "CNG Conversion"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Hire Purchase",
										children: "Hire Purchase"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Workshop Repairs",
										children: "Workshop Repairs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Fleet Remittance",
										children: "Fleet Remittance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Other",
										children: "Other Revenue"
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Salaries",
										children: "Salaries & Wages"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Parts Purchase",
										children: "Parts Restock"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Fuel",
										children: "Generator / Patrol Fuel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Rent & Utilities",
										children: "Rent / Utilities"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Other",
										children: "Other Expenses"
									})
								] })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Operating Hub Branch"
							}), activeBranchName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								readOnly: true,
								value: activeBranchName,
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-mist/30 text-muted-foreground focus:outline-none"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newTrans.branch,
								onChange: (e) => setNewTrans((prev) => ({
									...prev,
									branch: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Katsina HQ",
									children: "Katsina HQ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Gombe Hub",
									children: "Gombe Hub"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
									children: "Narration / Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: newTrans.description,
									onChange: (e) => setNewTrans((prev) => ({
										...prev,
										description: e.target.value
									})),
									placeholder: "e.g. Completed petrol to CNG cylinder sequential conversion deposit...",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: "Post Transaction"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Revenues (Ledger Total)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-forest" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl font-bold text-foreground mt-4",
							children: ["₦", totalRevenue.toLocaleString()]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Expenses (Ledger Total)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5 text-red-500" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl font-bold text-foreground mt-4",
							children: ["₦", totalExpense.toLocaleString()]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Net P&L Balance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5 text-indigo-500" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: `font-display text-2xl font-bold mt-4 ${netProfit >= 0 ? "text-forest-deep" : "text-red-500"}`,
							children: ["₦", netProfit.toLocaleString()]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full text-left mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-base text-foreground",
							children: "Revenue Stream Contributions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Percentage contributions of operating channels."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 w-full relative",
						children: revenueSources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center text-xs text-muted-foreground",
							children: "No revenues logged"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: revenueSources,
									cx: "50%",
									cy: "50%",
									innerRadius: 55,
									outerRadius: 75,
									paddingAngle: 3,
									dataKey: "value",
									children: revenueSources.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value) => `₦${Number(value).toLocaleString()}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									iconType: "circle",
									wrapperStyle: {
										fontSize: "11px",
										paddingTop: "10px"
									}
								})
							] })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row justify-between sm:items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-base text-foreground",
							children: "Double-Entry Ledger Records"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Chronological postings of incoming/outgoing flows."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Search ledger...",
									className: "rounded-full border border-border pl-8 pr-3 py-1.5 text-[10px] focus:outline-emerald bg-white"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: typeFilter,
								onChange: (e) => setTypeFilter(e.target.value),
								className: "rounded-xl border border-border px-2.5 py-1 text-[10px] focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ALL",
										children: "All Entries"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Revenue",
										children: "Revenues"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Expense",
										children: "Expenses"
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto border border-border/70 rounded-2xl max-h-80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-[11px] border-collapse",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Narration / Branch"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Amount"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60",
								children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-mist/10 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-mono font-bold text-forest",
											children: t.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-muted-foreground font-semibold",
											children: t.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: t.description
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[9px] text-muted-foreground mt-0.5",
												children: t.branch
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block rounded bg-mist px-1.5 py-0.5 text-[9px] font-bold text-charcoal",
												children: t.category
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: `p-3 text-right font-mono font-bold ${t.type === "Revenue" ? "text-forest-deep" : "text-red-500"}`,
											children: [
												t.type === "Revenue" ? "+" : "-",
												"₦",
												t.amount.toLocaleString()
											]
										})
									]
								}, t.id))
							})]
						})
					})]
				})]
			})
		]
	});
}
var initialCustomers = [
	{
		id: "CUST-101",
		name: "Alhaji Shehu",
		phone: "08031234567",
		type: "Individual",
		branch: "Katsina HQ"
	},
	{
		id: "CUST-102",
		name: "Katsina Transport Authority",
		phone: "09012345678",
		type: "Government",
		branch: "Katsina HQ",
		notes: "Fleet of 15 buses pending CNG Conversion"
	},
	{
		id: "CUST-103",
		name: "Gombe Courier Express",
		phone: "08176543210",
		type: "Corporate",
		branch: "Gombe Hub",
		notes: "Delivery tricycle logistics partner"
	}
];
var initialAppointments = [{
	id: "APP-501",
	customerName: "Bello Lawal",
	phone: "08033334444",
	vehicleModel: "Toyota Sienna 2010",
	serviceType: "CNG Conversion Consultation",
	date: "2026-07-06",
	time: "10:30",
	status: "Scheduled"
}, {
	id: "APP-502",
	customerName: "Amina Yusuf",
	phone: "07066667777",
	vehicleModel: "Suzuki Every Bus",
	serviceType: "Vehicle Diagnostics Service",
	date: "2026-07-06",
	time: "14:00",
	status: "Scheduled"
}];
var initialTickets = [{
	id: "TCK-801",
	customerName: "Alhaji Shehu",
	subject: "CNG regulator pressure warning light flashing",
	priority: "High",
	status: "Open",
	dateCreated: "2026-07-05"
}, {
	id: "TCK-802",
	customerName: "Gombe Courier Express",
	subject: "Tricycle clutch cable replacement inquiry",
	priority: "Medium",
	status: "In-Progress",
	dateCreated: "2026-07-04"
}];
function CRM() {
	const [customers, setCustomers] = (0, import_react.useState)(initialCustomers);
	const [appointments, setAppointments] = (0, import_react.useState)(initialAppointments);
	const [tickets, setTickets] = (0, import_react.useState)(initialTickets);
	const [search, setSearch] = (0, import_react.useState)("");
	const [section, setSection] = (0, import_react.useState)("clients");
	const [showClientForm, setShowClientForm] = (0, import_react.useState)(false);
	const [newClient, setNewClient] = (0, import_react.useState)({
		name: "",
		phone: "",
		type: "Individual",
		branch: "Katsina HQ",
		notes: ""
	});
	const [showApptForm, setShowApptForm] = (0, import_react.useState)(false);
	const [newAppt, setNewAppt] = (0, import_react.useState)({
		customerName: "",
		phone: "",
		vehicleModel: "",
		serviceType: "CNG Conversion Consultation",
		date: "",
		time: ""
	});
	const handleAddClient = (e) => {
		e.preventDefault();
		const entry = {
			id: `CUST-${Date.now().toString().slice(-3)}`,
			name: newClient.name,
			phone: newClient.phone,
			type: newClient.type,
			branch: newClient.branch,
			notes: newClient.notes
		};
		setCustomers([...customers, entry]);
		toast.success("Client Registered", { description: `${newClient.name} added to CRM system.` });
		setNewClient({
			name: "",
			phone: "",
			type: "Individual",
			branch: "Katsina HQ",
			notes: ""
		});
		setShowClientForm(false);
	};
	const handleAddAppt = (e) => {
		e.preventDefault();
		const entry = {
			id: `APP-${Date.now().toString().slice(-3)}`,
			customerName: newAppt.customerName,
			phone: newAppt.phone,
			vehicleModel: newAppt.vehicleModel,
			serviceType: newAppt.serviceType,
			date: newAppt.date,
			time: newAppt.time,
			status: "Scheduled"
		};
		setAppointments([...appointments, entry]);
		toast.success("Appointment Scheduled", { description: `Booked for ${newAppt.date} at ${newAppt.time}` });
		setShowApptForm(false);
	};
	const resolveTicket = (id) => {
		setTickets(tickets.map((t) => t.id === id ? {
			...t,
			status: "Resolved"
		} : t));
		toast.success("Ticket Resolved", { description: "CRM issue ticket marked closed." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSection("clients"),
								className: `font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${section === "clients" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"}`,
								children: "Client Directory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSection("appointments"),
								className: `font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${section === "appointments" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"}`,
								children: "Appointments"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSection("tickets"),
								className: `font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${section === "tickets" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"}`,
								children: "Tickets"
							})
						]
					}),
					section === "clients" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowClientForm(!showClientForm),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Register Customer"]
					}),
					section === "appointments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowApptForm(!showApptForm),
						className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Book Appointment"]
					})
				]
			}),
			section === "clients" && showClientForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddClient,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Register Client Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Client Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newClient.name,
								onChange: (e) => setNewClient((prev) => ({
									...prev,
									name: e.target.value
								})),
								placeholder: "Muhammadu Haruna",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newClient.phone,
								onChange: (e) => setNewClient((prev) => ({
									...prev,
									phone: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Client Classification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newClient.type,
								onChange: (e) => setNewClient((prev) => ({
									...prev,
									type: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Individual",
										children: "Individual driver"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Corporate",
										children: "Private Company"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Fleet Owner",
										children: "Fleet partner"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Government",
										children: "Government / Agency"
									})
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
						children: "Notes / Fleet description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: newClient.notes,
						onChange: (e) => setNewClient((prev) => ({
							...prev,
							notes: e.target.value
						})),
						placeholder: "e.g. Inquiries regarding CNG microbus conversions",
						className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowClientForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-glow-soft",
							children: "Register"
						})]
					})
				]
			}),
			section === "appointments" && showApptForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddAppt,
				className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display font-bold text-base text-foreground",
						children: "Schedule Workshop Appointment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Customer Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newAppt.customerName,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									customerName: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newAppt.phone,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									phone: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Vehicle Model"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: newAppt.vehicleModel,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									vehicleModel: e.target.value
								})),
								placeholder: "e.g. Toyota Sienna",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Service Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newAppt.serviceType,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									serviceType: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CNG Conversion Consultation",
										children: "CNG Conversion Consultation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Vehicle Diagnostics Service",
										children: "Vehicle Diagnostics Service"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Electrical Repair",
										children: "Electrical Repair"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Routine Servicing",
										children: "Routine Servicing"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Appointment Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								required: true,
								value: newAppt.date,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									date: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Appointment Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								required: true,
								value: newAppt.time,
								onChange: (e) => setNewAppt((prev) => ({
									...prev,
									time: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowApptForm(false),
							className: "rounded-full border border-border px-4 py-2 text-xs font-semibold",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-glow-soft",
							children: "Book Schedule"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl border border-border bg-white p-6 shadow-soft",
				children: section === "clients" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border border-border/70 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Customer ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Customer Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Phone Number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Classification"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Registered Branch"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Log Remarks"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-mist/10 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono font-bold text-forest",
										children: c.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-semibold text-foreground",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4",
										children: c.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block rounded bg-mist px-2 py-0.5 font-semibold text-charcoal",
											children: c.type
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-muted-foreground",
										children: c.branch
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 italic text-muted-foreground",
										children: c.notes || "—"
									})
								]
							}, c.id))
						})]
					})
				}) : section === "appointments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto border border-border/70 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Appt ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Vehicle Model"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Requested Service"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4",
									children: "Appointment Schedule"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-4 text-center",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: appointments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-mist/10 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-mono font-bold text-forest",
										children: a.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-semibold text-foreground",
										children: a.customerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4",
										children: a.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 font-semibold text-charcoal",
										children: a.vehicleModel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-forest-deep font-semibold",
										children: a.serviceType
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-4 font-semibold",
										children: [
											a.date,
											" @ ",
											a.time
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-4 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block rounded-full bg-blue-100 text-blue-600 px-2.5 py-0.5 font-bold uppercase tracking-wider text-[9px]",
											children: a.status
										})
									})
								]
							}, a.id))
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-between items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground",
							children: "Support Issues & Feedback Logs"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4 hover:shadow-soft transition bg-white flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-9 w-9 rounded-xl flex items-center justify-center ${t.priority === "High" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"}`,
									children: t.priority === "High" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] font-bold text-forest",
											children: t.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${t.status === "Open" ? "bg-red-100 text-red-500" : t.status === "In-Progress" ? "bg-blue-100 text-blue-500" : "bg-slate-100 text-muted-foreground"}`,
											children: t.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "font-semibold text-foreground text-sm mt-1",
										children: t.subject
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground",
										children: [
											"Client: ",
											t.customerName,
											" · Raised: ",
											t.dateCreated
										]
									})
								] })]
							}), t.status !== "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => resolveTicket(t.id),
								className: "rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer",
								children: "Resolve Issue"
							})]
						}, t.id))
					})]
				})
			})
		]
	});
}
function FrontDesk({ selectedBranch = "ALL" }) {
	const activeBranchName = {
		"BR-KT": "Katsina HQ",
		"BR-GB": "Gombe Hub"
	}[selectedBranch] || "";
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const [contracts] = (0, import_react.useState)(() => ERPStore.getHPContracts().filter((c) => !activeBranchName || c.branch === activeBranchName));
	const [drivers] = (0, import_react.useState)(() => ERPStore.getDrivers().filter((d) => !activeBranchName || d.branch === activeBranchName));
	const [visitors, setVisitors] = (0, import_react.useState)([]);
	const [showVisitorModal, setShowVisitorModal] = (0, import_react.useState)(false);
	const [showPaymentModal, setShowPaymentModal] = (0, import_react.useState)(false);
	const [showWorkshopModal, setShowWorkshopModal] = (0, import_react.useState)(false);
	const [showDriverLookup, setShowDriverLookup] = (0, import_react.useState)(false);
	const [visitorForm, setVisitorForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		purpose: "HP Inquiry",
		note: ""
	});
	const [paymentForm, setPaymentForm] = (0, import_react.useState)({
		driverSearch: "",
		selectedContractId: "",
		amount: "",
		channel: "Cash"
	});
	const [matchedContracts, setMatchedContracts] = (0, import_react.useState)([]);
	const [workshopForm, setWorkshopForm] = (0, import_react.useState)({
		customerName: "",
		customerPhone: "",
		vehiclePlate: "",
		vehicleModel: "",
		issue: ""
	});
	const [driverQuery, setDriverQuery] = (0, import_react.useState)("");
	const filteredDrivers = drivers.filter((d) => d.name.toLowerCase().includes(driverQuery.toLowerCase()) || d.id.toLowerCase().includes(driverQuery.toLowerCase()) || d.phone.includes(driverQuery));
	const activeContracts = contracts.filter((c) => c.status === "Active");
	const defaultedContracts = contracts.filter((c) => c.status === "Defaulted" || c.status === "Missed Remittance");
	const todayVisitors = visitors.filter((v) => v.timestamp.startsWith(today));
	const handleLogVisitor = (e) => {
		e.preventDefault();
		const log = {
			id: `VIS-${Date.now()}`,
			...visitorForm,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Waiting"
		};
		setVisitors((prev) => [log, ...prev]);
		ERPStore.addAuditLog("Reception Desk", "Receptionist", "Log Visitor", `Walk-in visitor logged: ${visitorForm.name} – ${visitorForm.purpose}`);
		toast.success("Visitor Logged", { description: `${visitorForm.name} added to today's walk-in register.` });
		setVisitorForm({
			name: "",
			phone: "",
			purpose: "HP Inquiry",
			note: ""
		});
		setShowVisitorModal(false);
	};
	const updateVisitorStatus = (id, status) => {
		setVisitors((prev) => prev.map((v) => v.id === id ? {
			...v,
			status
		} : v));
	};
	const searchContracts = (query) => {
		setPaymentForm((prev) => ({
			...prev,
			driverSearch: query,
			selectedContractId: ""
		}));
		if (query.length < 2) {
			setMatchedContracts([]);
			return;
		}
		const q = query.toLowerCase();
		setMatchedContracts(contracts.filter((c) => c.status === "Active").map((c) => ({
			contract: c,
			driver: drivers.find((d) => d.id === c.driverId)
		})).filter(({ contract, driver }) => driver?.name.toLowerCase().includes(q) || driver?.id.toLowerCase().includes(q) || contract.id.toLowerCase().includes(q)));
	};
	const handleWalkInPayment = (e) => {
		e.preventDefault();
		if (!paymentForm.selectedContractId) {
			toast.error("No contract selected", { description: "Please search and select a driver's contract." });
			return;
		}
		const amount = Number(paymentForm.amount);
		if (!amount || amount <= 0) {
			toast.error("Invalid amount", { description: "Please enter a valid payment amount." });
			return;
		}
		const allContracts = ERPStore.getHPContracts();
		const updated = allContracts.map((c) => {
			if (c.id === paymentForm.selectedContractId) {
				const newPaid = c.balancePaid + amount;
				const isComplete = newPaid >= c.totalAmount;
				return {
					...c,
					balancePaid: Math.min(newPaid, c.totalAmount),
					status: isComplete ? "Completed" : "Active",
					paymentHistory: [...c.paymentHistory || [], {
						date: today,
						amount
					}]
				};
			}
			return c;
		});
		ERPStore.saveHPContracts(updated);
		const driver = drivers.find((d) => d.id === allContracts.find((c) => c.id === paymentForm.selectedContractId)?.driverId);
		ERPStore.addAuditLog("Reception Desk", "Receptionist", "Record Walk-in Payment", `₦${amount.toLocaleString()} received via ${paymentForm.channel} from ${driver?.name || "driver"} for contract ${paymentForm.selectedContractId}.`);
		ERPStore.addTransaction({
			id: `TXN-${Date.now()}`,
			type: "Revenue",
			amount,
			category: "Hire Purchase",
			description: `Walk-in HP payment via ${paymentForm.channel} — Contract ${paymentForm.selectedContractId} (${driver?.name || "driver"})`,
			branch: activeBranchName || "Katsina HQ",
			date: today
		});
		toast.success("Payment Recorded!", { description: `₦${amount.toLocaleString()} logged for contract ${paymentForm.selectedContractId}.` });
		setPaymentForm({
			driverSearch: "",
			selectedContractId: "",
			amount: "",
			channel: "Cash"
		});
		setMatchedContracts([]);
		setShowPaymentModal(false);
	};
	const handleWorkshopBooking = (e) => {
		e.preventDefault();
		const newJobCard = {
			id: `JC-R${Date.now().toString().slice(-3)}`,
			customerName: workshopForm.customerName,
			customerPhone: workshopForm.customerPhone,
			vehiclePlate: workshopForm.vehiclePlate,
			vehicleModel: workshopForm.vehicleModel,
			issueDescription: workshopForm.issue,
			assignedTechnicianId: "",
			laborCharges: 0,
			partsUsed: [],
			status: "Inspecting",
			branch: activeBranchName || "Katsina HQ",
			date: today
		};
		const cards = ERPStore.getJobCards();
		ERPStore.saveJobCards([newJobCard, ...cards]);
		ERPStore.addAuditLog("Reception Desk", "Receptionist", "Create Workshop Booking", `Workshop booking created for ${workshopForm.customerName} — Vehicle: ${workshopForm.vehiclePlate}.`);
		toast.success("Workshop Booking Logged", { description: `Job card ${newJobCard.id} opened for ${workshopForm.customerName}.` });
		setWorkshopForm({
			customerName: "",
			customerPhone: "",
			vehiclePlate: "",
			vehicleModel: "",
			issue: ""
		});
		setShowWorkshopModal(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold text-foreground",
					children: "Front Desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: [activeBranchName, " Reception — Log visitors, record walk-in payments, book workshop appointments, and lookup drivers."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowVisitorModal(true),
							className: "inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Log Visitor"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowPaymentModal(true),
							className: "inline-flex items-center gap-1.5 rounded-xl bg-emerald px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }), " Record HP Payment"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowWorkshopModal(true),
							className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-muted-foreground" }), " Book Workshop"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowDriverLookup(true),
							className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), " Driver Lookup"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 grid-cols-2 lg:grid-cols-4",
				children: [
					{
						label: "Active HP Leases",
						value: activeContracts.length,
						icon: FilePenLine,
						color: "text-emerald"
					},
					{
						label: "Alerts / Defaulted",
						value: defaultedContracts.length,
						icon: TriangleAlert,
						color: "text-amber-500"
					},
					{
						label: "Branch Drivers",
						value: drivers.filter((d) => d.status === "Active").length,
						icon: User,
						color: "text-blue-500"
					},
					{
						label: "Visitors Today",
						value: todayVisitors.length,
						icon: ClipboardList,
						color: "text-purple-500"
					}
				].map((kpi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-5 shadow-soft hover-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(kpi.icon, { className: `h-5 w-5 ${kpi.color}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `font-display text-3xl font-bold ${kpi.color}`,
							children: kpi.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-1",
							children: kpi.label
						})
					]
				}, kpi.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card shadow-soft overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-5 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display font-bold text-sm text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4 text-emerald" }), " Today's Visitor Register"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold",
						children: todayVisitors.length
					})]
				}), todayVisitors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-10 text-center text-muted-foreground text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-8 w-8 mx-auto opacity-30 mb-2" }), "No visitors logged today. Use \"Log Visitor\" to start the register."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Visitor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Purpose"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Note"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: todayVisitors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 font-semibold text-foreground",
										children: v.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 font-mono text-muted-foreground",
										children: v.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-block rounded-full bg-emerald-500/10 text-emerald px-2 py-0.5 text-[9px] font-bold uppercase",
											children: v.purpose
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-muted-foreground max-w-[160px] truncate",
										children: v.note || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-muted-foreground font-mono",
										children: new Date(v.timestamp).toLocaleTimeString("en-NG", {
											hour: "2-digit",
											minute: "2-digit"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${v.status === "Attended" ? "bg-emerald-500/10 text-emerald" : v.status === "Referred" ? "bg-blue-500/10 text-blue-500" : "bg-amber-500/10 text-amber-600 animate-pulse"}`,
											children: v.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateVisitorStatus(v.id, "Attended"),
												className: "rounded-lg bg-emerald-500/10 text-emerald px-2 py-1 text-[9px] font-bold hover:bg-emerald-500/20 transition cursor-pointer",
												children: "Attended"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateVisitorStatus(v.id, "Referred"),
												className: "rounded-lg bg-blue-500/10 text-blue-500 px-2 py-1 text-[9px] font-bold hover:bg-blue-500/20 transition cursor-pointer",
												children: "Referred"
											})]
										})
									})
								]
							}, v.id))
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card shadow-soft overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 border-b border-border flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-4 w-4 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-bold text-sm text-foreground",
						children: "Active HP Lease Contracts"
					})]
				}), activeContracts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-8 text-center text-muted-foreground text-sm",
					children: "No active lease contracts for this branch."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Contract ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Driver"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Daily Target"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Paid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3",
									children: "Outstanding"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-center",
									children: "Progress"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: activeContracts.map((c) => {
								const driver = drivers.find((d) => d.id === c.driverId);
								const progress = Math.min(c.balancePaid / c.totalAmount * 100, 100);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/20 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 font-mono font-bold text-emerald",
											children: c.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 font-semibold text-foreground",
											children: driver?.name || c.driverId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-5 py-3 font-mono font-bold text-foreground",
											children: ["₦", c.dailyTarget.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-5 py-3 text-emerald font-mono",
											children: ["₦", c.balancePaid.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-5 py-3 text-amber-600 font-mono",
											children: ["₦", (c.totalAmount - c.balancePaid).toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 bg-muted h-1.5 rounded-full overflow-hidden min-w-[60px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full bg-emerald rounded-full",
														style: { width: `${progress}%` }
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[9px] font-bold text-muted-foreground w-8 text-right",
													children: [progress.toFixed(0), "%"]
												})]
											})
										})
									]
								}, c.id);
							})
						})]
					})
				})]
			}),
			showVisitorModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-bold text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5 text-forest" }), " Log Walk-in Visitor"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowVisitorModal(false),
							className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogVisitor,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Visitor Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: visitorForm.name,
									onChange: (e) => setVisitorForm((p) => ({
										...p,
										name: e.target.value
									})),
									placeholder: "Full name",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: visitorForm.phone,
									onChange: (e) => setVisitorForm((p) => ({
										...p,
										phone: e.target.value
									})),
									placeholder: "08012345678",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
								children: "Purpose of Visit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: visitorForm.purpose,
								onChange: (e) => setVisitorForm((p) => ({
									...p,
									purpose: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "HP Inquiry" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Workshop Booking" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Payment" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Complaint" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
								children: "Notes (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								value: visitorForm.note,
								onChange: (e) => setVisitorForm((p) => ({
									...p,
									note: e.target.value
								})),
								placeholder: "Additional details...",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowVisitorModal(false),
									className: "flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-3 rounded-2xl bg-forest text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer",
									children: "Log Visitor"
								})]
							})
						]
					})]
				})
			}),
			showPaymentModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-bold text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5 text-emerald" }), " Record Walk-in HP Payment"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowPaymentModal(false),
							className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleWalkInPayment,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Search Driver or Contract ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: paymentForm.driverSearch,
										onChange: (e) => searchContracts(e.target.value),
										placeholder: "Type driver name or HP-xxx...",
										className: "w-full rounded-xl border border-border pl-10 pr-4 py-2.5 text-xs bg-card"
									})]
								}),
								matchedContracts.length > 0 && !paymentForm.selectedContractId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden",
									children: matchedContracts.map(({ contract, driver }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setPaymentForm((p) => ({
												...p,
												selectedContractId: contract.id,
												driverSearch: `${driver?.name} — ${contract.id}`
											}));
											setMatchedContracts([]);
										},
										className: "w-full text-left px-4 py-2.5 text-xs hover:bg-muted transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: driver?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground ml-2",
											children: [
												contract.id,
												" · Outstanding: ₦",
												(contract.totalAmount - contract.balancePaid).toLocaleString()
											]
										})]
									}, contract.id))
								})
							] }),
							paymentForm.selectedContractId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-emerald-500/5 border border-emerald/30 rounded-xl p-3 text-xs flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-emerald shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"Contract ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: paymentForm.selectedContractId
										}),
										" selected."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Amount Received (₦)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									value: paymentForm.amount,
									onChange: (e) => setPaymentForm((p) => ({
										...p,
										amount: e.target.value
									})),
									placeholder: "e.g. 12000",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card font-mono"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Payment Channel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: paymentForm.channel,
									onChange: (e) => setPaymentForm((p) => ({
										...p,
										channel: e.target.value
									})),
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cash" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Bank Transfer" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "POS" })
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPaymentModal(false),
									className: "flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-3 rounded-2xl bg-emerald text-xs font-semibold text-white hover:bg-forest transition cursor-pointer",
									children: "Confirm Receipt"
								})]
							})
						]
					})]
				})
			}),
			showWorkshopModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-bold text-base flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5 text-muted-foreground" }), " Log Workshop Booking"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowWorkshopModal(false),
							className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleWorkshopBooking,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Customer Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: workshopForm.customerName,
									onChange: (e) => setWorkshopForm((p) => ({
										...p,
										customerName: e.target.value
									})),
									placeholder: "Full name",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: workshopForm.customerPhone,
									onChange: (e) => setWorkshopForm((p) => ({
										...p,
										customerPhone: e.target.value
									})),
									placeholder: "08012345678",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Vehicle Plate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: workshopForm.vehiclePlate,
									onChange: (e) => setWorkshopForm((p) => ({
										...p,
										vehiclePlate: e.target.value
									})),
									placeholder: "KT-902-A10",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card font-mono"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
									children: "Vehicle Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: workshopForm.vehicleModel,
									onChange: (e) => setWorkshopForm((p) => ({
										...p,
										vehicleModel: e.target.value
									})),
									placeholder: "Honda Keke 200cc",
									className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase text-muted-foreground block mb-1",
								children: "Reported Issue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 3,
								value: workshopForm.issue,
								onChange: (e) => setWorkshopForm((p) => ({
									...p,
									issue: e.target.value
								})),
								placeholder: "Describe the customer's complaint in detail...",
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowWorkshopModal(false),
									className: "flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-3 rounded-2xl bg-forest text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer",
									children: "Create Job Card"
								})]
							})
						]
					})]
				})
			}),
			showDriverLookup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-4 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display font-bold text-base flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-muted-foreground" }), " Driver Lookup"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShowDriverLookup(false);
									setDriverQuery("");
								},
								className: "h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								value: driverQuery,
								onChange: (e) => setDriverQuery(e.target.value),
								placeholder: "Search by name, ID, or phone number...",
								className: "w-full rounded-xl border border-border pl-10 pr-4 py-2.5 text-xs bg-card"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 max-h-64 overflow-y-auto",
							children: filteredDrivers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-8 text-center text-muted-foreground text-sm",
								children: "No drivers found for your query."
							}) : filteredDrivers.map((d) => {
								const contract = contracts.find((c) => c.driverId === d.id && c.status === "Active");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border p-3.5 bg-muted/20 hover:bg-muted/40 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-sm text-foreground",
													children: d.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground font-mono mt-0.5",
													children: [
														d.id,
														" · ",
														d.phone
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] text-muted-foreground mt-0.5",
													children: ["License: ", d.license]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${d.status === "Active" ? "bg-emerald-500/10 text-emerald" : "bg-amber-500/10 text-amber-600"}`,
												children: d.status
											})]
										}),
										contract && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 pt-2 border-t border-border/60 text-[10px] text-muted-foreground",
											children: [
												"HP Contract ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: contract.id
												}),
												" · Outstanding: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
													className: "text-amber-600",
													children: ["₦", (contract.totalAmount - contract.balancePaid).toLocaleString()]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 pt-2 border-t border-border/60 text-[10px] text-muted-foreground",
											children: [
												"Guarantor: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: d.guarantorName
												}),
												" · ",
												d.guarantorPhone
											]
										})
									]
								}, d.id);
							})
						})
					]
				})
			})
		]
	});
}
function Settings$1() {
	const [profile, setProfile] = (0, import_react.useState)({
		name: "CityView CNG Automobile Synergy",
		tagline: "Driving a Cleaner, Smarter Future",
		hq: "Katsina State, Nigeria",
		targetRemittance: 12e3,
		timeoutMinutes: 15
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSaveSettings = (e) => {
		e.preventDefault();
		setSaving(true);
		setTimeout(() => {
			setSaving(false);
			ERPStore.addAuditLog("Admin", "Super Administrator", "Save System Settings", "Updated company profile config & session timeout settings.");
			toast.success("Settings Saved Successfully", { description: "Operating rules and company profile variables have been committed." });
		}, 1e3);
	};
	const handleBackup = () => {
		try {
			const backupData = {};
			[
				"cityview_erp_branches",
				"cityview_erp_employees",
				"cityview_erp_drivers",
				"cityview_erp_vehicles",
				"cityview_erp_shifts",
				"cityview_erp_hp_contracts",
				"cityview_erp_job_cards",
				"cityview_erp_conversions",
				"cityview_erp_inventory",
				"cityview_erp_transactions",
				"cityview_erp_audit_logs"
			].forEach((k) => {
				backupData[k] = localStorage.getItem(k);
			});
			const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `CityView_ERP_Backup_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
			a.click();
			URL.revokeObjectURL(url);
			ERPStore.addAuditLog("Admin", "Super Administrator", "Export Backup JSON", "Downloaded system database snapshot.");
			toast.success("Backup File Created", { description: "CityView_ERP_Backup.json has been downloaded to your machine." });
		} catch (e) {
			console.error(e);
			toast.error("Backup Failed", { description: "An error occurred compiling localstorage." });
		}
	};
	const handleRestore = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const data = JSON.parse(event.target?.result);
				Object.entries(data).forEach(([key, val]) => {
					if (val) localStorage.setItem(key, val);
				});
				ERPStore.addAuditLog("Admin", "Super Administrator", "Import Backup JSON", "Restored localstorage state from file.");
				toast.success("Database Restored", { description: "System records successfully imported. Reloading to sync state..." });
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			} catch (err) {
				console.error(err);
				toast.error("Restore Failed", { description: "Invalid JSON backup file structural layout." });
			}
		};
		reader.readAsText(file);
	};
	const clearAllData = () => {
		if (confirm("WARNING: This will delete all customized local records and reset mock data back to factory defaults. Proceed?")) {
			[
				"cityview_erp_branches",
				"cityview_erp_employees",
				"cityview_erp_drivers",
				"cityview_erp_vehicles",
				"cityview_erp_shifts",
				"cityview_erp_hp_contracts",
				"cityview_erp_job_cards",
				"cityview_erp_conversions",
				"cityview_erp_inventory",
				"cityview_erp_transactions",
				"cityview_erp_audit_logs"
			].forEach((k) => localStorage.removeItem(k));
			toast.info("Database Reset", { description: "Clearing local cache. System reloading..." });
			setTimeout(() => {
				window.location.reload();
			}, 1e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold text-foreground",
				children: "ERP Settings & Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Adjust corporate configurations, modify lease limits, export database backups, and manage simulated security parameters."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 md:grid-cols-3 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "font-display font-bold text-base text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-5 w-5 text-forest" }), "Company Preferences"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSaveSettings,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Company Identity Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: profile.name,
								onChange: (e) => setProfile((prev) => ({
									...prev,
									name: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-semibold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Branding Tagline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: profile.tagline,
								onChange: (e) => setProfile((prev) => ({
									...prev,
									tagline: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Headquarters Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: profile.hq,
								onChange: (e) => setProfile((prev) => ({
									...prev,
									hq: e.target.value
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1",
								children: "Base Repayment Rate (₦/day)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								required: true,
								value: profile.targetRemittance,
								onChange: (e) => setProfile((prev) => ({
									...prev,
									targetRemittance: Number(e.target.value)
								})),
								className: "w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: saving,
							className: "inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), saving ? "Saving..." : "Save Preferences"]
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-display font-bold text-base text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5 text-forest" }), "Backup & Sync"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground leading-relaxed",
							children: "Export the current localStorage database as a JSON file, or restore data from an existing backup file."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleBackup,
								className: "w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white hover:bg-mist px-4 py-2.5 text-xs font-semibold text-charcoal transition cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 text-muted-foreground" }), "Export Database JSON"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: ".json",
									onChange: handleRestore,
									id: "restore-file-input",
									className: "hidden"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "restore-file-input",
									className: "w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-soft/50 border border-emerald/15 hover:bg-emerald-soft text-forest-deep px-4 py-2.5 text-xs font-bold transition cursor-pointer text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), "Restore Database File"]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-red-200/60 bg-red-50/20 p-6 shadow-soft space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-display font-bold text-base text-red-600 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" }), "System Reset"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-red-500/80 leading-relaxed",
							children: "Clear all customizations, shifts, transactions, and employee rosters to restore default mock seeds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: clearAllData,
							className: "w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2.5 text-xs font-bold transition cursor-pointer border border-red-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Reset Cache Defaults"]
						})
					]
				})]
			})]
		})]
	});
}
function AdminPanel() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [selectedBranch, setSelectedBranch] = (0, import_react.useState)("ALL");
	const [selectedRole, setSelectedRole] = (0, import_react.useState)("Managing Director (CEO)");
	const [isInitialized, setIsInitialized] = (0, import_react.useState)(false);
	const [mobileSidebarOpen, setMobileSidebarOpen] = (0, import_react.useState)(false);
	const permissions = {
		"Managing Director (CEO)": [
			"overview",
			"branches",
			"employees",
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"inventory",
			"finance",
			"crm",
			"settings"
		],
		"Executive Director": [
			"overview",
			"branches",
			"employees",
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"inventory",
			"finance",
			"crm",
			"settings"
		],
		"Branch Manager": [
			"branches",
			"employees",
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"inventory",
			"finance",
			"crm"
		],
		"Operations Manager": [
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"crm"
		],
		"Workshop Manager": [
			"fleet",
			"workshop",
			"inventory"
		],
		"Fleet Manager": [
			"fleet",
			"drivers",
			"shifts",
			"hp"
		],
		"Cashier": [
			"shifts",
			"hp",
			"finance",
			"crm"
		],
		"Accountant": [
			"finance",
			"hp",
			"inventory"
		],
		"HR Manager": ["branches", "employees"],
		"Customer Service": [
			"drivers",
			"hp",
			"workshop",
			"crm"
		],
		"Inventory Officer": ["inventory"],
		"Technician": ["fleet", "workshop"],
		"System Administrator": [
			"overview",
			"branches",
			"employees",
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"inventory",
			"finance",
			"crm",
			"settings"
		],
		"Super Admin": [
			"overview",
			"branches",
			"employees",
			"fleet",
			"drivers",
			"shifts",
			"hp",
			"workshop",
			"inventory",
			"finance",
			"crm",
			"settings"
		],
		"Branch Operations Officer": [
			"fleet",
			"drivers",
			"shifts",
			"hp"
		],
		"Workshop & CNG Operations Officer": [
			"workshop",
			"inventory",
			"hp"
		],
		"Receptionist": [
			"frontdesk",
			"hp",
			"drivers",
			"workshop",
			"crm"
		]
	};
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const sessionStr = localStorage.getItem("cityview_user_session");
			if (!sessionStr) navigate({ to: "/login" });
			else try {
				const user = JSON.parse(sessionStr);
				setCurrentUser(user);
				setSelectedRole(user.role);
				setSelectedBranch(user.branch);
				const allowed = permissions[user.role] || [];
				if (allowed.length > 0) if (user.role === "Super Admin" || user.role === "Managing Director (CEO)" || user.role === "System Administrator" || user.role === "Executive Director") setActiveTab("overview");
				else setActiveTab(allowed[0]);
			} catch (e) {
				console.error(e);
				navigate({ to: "/login" });
			}
			setIsInitialized(true);
		}
	}, [navigate]);
	const allowedTabs = permissions[selectedRole] || [];
	(0, import_react.useEffect)(() => {
		if (isInitialized && !allowedTabs.includes(activeTab)) {
			if (allowedTabs.length > 0) setActiveTab(allowedTabs[0]);
		}
	}, [
		selectedRole,
		allowedTabs,
		activeTab,
		isInitialized
	]);
	const handleLogout = () => {
		localStorage.removeItem("cityview_user_session");
		navigate({ to: "/login" });
	};
	const renderTabContent = () => {
		if (!allowedTabs.includes(activeTab)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[60vh] flex-col items-center justify-center text-center p-8 bg-white border border-border rounded-3xl shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4 animate-bounce",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Restricted Operations Area"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground max-w-md",
					children: [
						"Your simulated credentials role ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-forest-deep",
							children: [
								"(",
								selectedRole,
								")"
							]
						}),
						" does not possess access clearance for the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold",
							children: [
								"\"",
								activeTab.toUpperCase(),
								"\""
							]
						}),
						" sub-ledger."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground mt-6 bg-mist px-3 py-1.5 rounded-full font-mono",
					children: "Error: HTTP 403 Forbidden Simulation"
				})
			]
		});
		switch (activeTab) {
			case "overview": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExecutiveDashboard, { branchId: selectedBranch });
			case "branches": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchManagement, {});
			case "employees": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeManagement, {});
			case "drivers": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriverManagement, { selectedBranch });
			case "fleet": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FleetManagement, { selectedBranch });
			case "shifts": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemittanceTracker, { selectedBranch });
			case "hp": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HirePurchase, { selectedBranch });
			case "workshop": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkshopConversions, { selectedBranch });
			case "inventory": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inventory, { selectedBranch });
			case "finance": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finance, { selectedBranch });
			case "crm": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CRM, { selectedBranch });
			case "frontdesk": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrontDesk, { selectedBranch });
			case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings$1, {});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExecutiveDashboard, { branchId: selectedBranch });
		}
	};
	if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "inline-block w-8 h-8 border-4 border-emerald border-t-transparent rounded-full animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-muted/40 dark:bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
			activeTab,
			setActiveTab,
			selectedRole,
			mobileOpen: mobileSidebarOpen,
			setMobileOpen: setMobileSidebarOpen
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				selectedBranch,
				setSelectedBranch,
				selectedRole,
				setSelectedRole,
				currentUser,
				onLogout: handleLogout,
				onToggleMobileSidebar: () => setMobileSidebarOpen(!mobileSidebarOpen)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto p-4 md:p-8",
				children: renderTabContent()
			})]
		})]
	});
}
//#endregion
export { AdminPanel as component };
