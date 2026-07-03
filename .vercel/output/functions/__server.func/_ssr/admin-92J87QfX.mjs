import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { D as FileText, L as Check, S as LayoutDashboard, c as Trash2, g as MessageSquare, k as Database, m as Plus, n as X, r as Wrench } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-92J87QfX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPanel() {
	const [activeSec, setActiveSec] = (0, import_react.useState)("overview");
	const [applications, setApplications] = (0, import_react.useState)([]);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [blogPosts, setBlogPosts] = (0, import_react.useState)([]);
	const [newBlog, setNewBlog] = (0, import_react.useState)({
		title: "",
		author: "Admin",
		category: "CNG Education",
		status: "Published"
	});
	const [showBlogForm, setShowBlogForm] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const storedApps = localStorage.getItem("cityview_hp_applications");
		if (storedApps) setApplications(JSON.parse(storedApps));
		else {
			const mockApps = [{
				id: "APP-9021",
				name: "Muhammadu Buhari",
				phone: "08031112222",
				whatsapp: "08031112222",
				city: "Katsina",
				experience: "3-5 Years",
				guarantorName: "Mallam Lawal",
				guarantorPhone: "08034445555",
				status: "Approved",
				date: "2026-07-01"
			}, {
				id: "APP-8452",
				name: "Umar Gombe",
				phone: "08159990000",
				whatsapp: "",
				city: "Gombe",
				experience: "Over 5 Years",
				guarantorName: "Alhaji Danladi",
				guarantorPhone: "08151112222",
				status: "Pending",
				date: "2026-07-02"
			}];
			localStorage.setItem("cityview_hp_applications", JSON.stringify(mockApps));
			setApplications(mockApps);
		}
		const storedBookings = localStorage.getItem("cityview_workshop_bookings");
		if (storedBookings) setBookings(JSON.parse(storedBookings));
		else {
			const mockBookings = [{
				id: "BK-4051",
				name: "Mustapha Yusuf",
				phone: "09033334444",
				serviceType: "CNG Conversion Consultation",
				vehicleModel: "Toyota Corolla 2012",
				location: "Katsina",
				date: "2026-07-10",
				time: "10:30",
				status: "Confirmed",
				dateCreated: "2026-07-01"
			}, {
				id: "BK-3912",
				name: "Fatima Gombe",
				phone: "07066667777",
				serviceType: "Vehicle Diagnostic Inspection",
				vehicleModel: "Honda Accord 2015",
				location: "Gombe",
				date: "2026-07-09",
				time: "14:00",
				status: "Confirmed",
				dateCreated: "2026-07-02"
			}];
			localStorage.setItem("cityview_workshop_bookings", JSON.stringify(mockBookings));
			setBookings(mockBookings);
		}
		const storedBlogs = localStorage.getItem("cityview_blogs");
		if (storedBlogs) setBlogPosts(JSON.parse(storedBlogs));
		else {
			const mockBlogs = [{
				id: "BLOG-1",
				title: "Understanding the CNG Conversion Process",
				author: "Engr. Yusuf Bello",
				category: "CNG Education",
				status: "Published",
				date: "2026-06-25"
			}, {
				id: "BLOG-2",
				title: "Why Commercial Fleet Owners in Nigeria are Swapping Petrol for Gas",
				author: "Dr. Grace Olamide",
				category: "Fleet Operations",
				status: "Published",
				date: "2026-06-28"
			}];
			localStorage.setItem("cityview_blogs", JSON.stringify(mockBlogs));
			setBlogPosts(mockBlogs);
		}
	}, []);
	const updateAppStatus = (id, newStatus) => {
		const updated = applications.map((app) => app.id === id ? {
			...app,
			status: newStatus
		} : app);
		setApplications(updated);
		localStorage.setItem("cityview_hp_applications", JSON.stringify(updated));
	};
	const updateBookingStatus = (id, newStatus) => {
		const updated = bookings.map((b) => b.id === id ? {
			...b,
			status: newStatus
		} : b);
		setBookings(updated);
		localStorage.setItem("cityview_workshop_bookings", JSON.stringify(updated));
	};
	const handleCreateBlog = (e) => {
		e.preventDefault();
		const updated = [{
			id: `BLOG-${Date.now().toString().slice(-4)}`,
			title: newBlog.title,
			author: newBlog.author,
			category: newBlog.category,
			status: newBlog.status,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
		}, ...blogPosts];
		setBlogPosts(updated);
		localStorage.setItem("cityview_blogs", JSON.stringify(updated));
		setNewBlog({
			title: "",
			author: "Admin",
			category: "CNG Education",
			status: "Published"
		});
		setShowBlogForm(false);
	};
	const deleteBlog = (id) => {
		const updated = blogPosts.filter((b) => b.id !== id);
		setBlogPosts(updated);
		localStorage.setItem("cityview_blogs", JSON.stringify(updated));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-mist/30 pt-28 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "w-full lg:w-64 bg-white rounded-3xl border border-border p-6 shadow-soft shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border pb-4 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-xl bg-forest flex items-center justify-center text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display font-semibold text-foreground text-sm",
							children: "CityView CMS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider",
							children: "Control Panel"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "space-y-1.5",
						children: [
							{
								id: "overview",
								label: "Dashboard Overview",
								icon: LayoutDashboard
							},
							{
								id: "hp",
								label: "Hire Purchase Apps",
								icon: FileText,
								count: applications.filter((a) => a.status === "Pending").length
							},
							{
								id: "workshop",
								label: "Workshop Bookings",
								icon: Wrench,
								count: bookings.filter((b) => b.status === "Confirmed").length
							},
							{
								id: "content",
								label: "Manage Blog Posts",
								icon: MessageSquare
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveSec(tab.id),
							className: `w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${activeSec === tab.id ? "bg-forest text-white shadow-md" : "text-muted-foreground hover:bg-mist/50 hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
							}), tab.count !== void 0 && tab.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${activeSec === tab.id ? "bg-white text-forest" : "bg-emerald text-forest-deep"}`,
								children: tab.count
							})]
						}, tab.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 w-full bg-white rounded-4xl border border-border p-8 shadow-medium",
					children: [
						activeSec === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl font-bold text-foreground",
									children: "Operational Overview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: "Real-time submissions and conversion inquiries across Katsina & Gombe hubs."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border p-6 flex flex-col justify-between bg-mist/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
												children: "Pending Hire Purchase"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-3xl font-bold text-forest-deep mt-2",
												children: applications.filter((a) => a.status === "Pending").length
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground mt-4",
												children: "Awaiting driver interviews"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border p-6 flex flex-col justify-between bg-mist/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
												children: "Confirmed Service Bookings"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-3xl font-bold text-forest-deep mt-2",
												children: bookings.filter((b) => b.status === "Confirmed").length
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground mt-4",
												children: "Scheduled for inspection"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border p-6 flex flex-col justify-between bg-emerald-soft/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
												children: "Active Blog Articles"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-3xl font-bold text-forest-deep mt-2",
												children: blogPosts.length
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground mt-4",
												children: "SEO & customer education"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display font-semibold text-lg text-foreground mb-4",
										children: "Latest Inquiries"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4",
										children: applications.slice(0, 3).map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border p-4 flex items-center justify-between text-sm hover:shadow-soft transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: app.date
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
													className: "font-display font-semibold text-foreground mt-1",
													children: [app.name, " — HP Application"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: ["Tricycle ownership scheme · ", app.city]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${app.status === "Approved" ? "bg-emerald-soft text-forest-deep" : "bg-yellow-400/10 text-yellow-500"}`,
												children: app.status
											})]
										}, app.id))
									})]
								})
							]
						}),
						activeSec === "hp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl font-bold text-foreground",
								children: "Hire Purchase Applications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Review applicant profiles, driving credentials, and guarantor details."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-2xl border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-sm border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "bg-mist/30 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Driver Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Contact"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "City"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Guarantor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 text-center",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 text-right",
												children: "Actions"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border/60",
										children: applications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 7,
											className: "p-8 text-center text-muted-foreground",
											children: "No applications found."
										}) }) : applications.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-mist/10 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-mono text-xs font-bold text-forest",
													children: app.id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-foreground",
														children: app.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-muted-foreground",
														children: [app.experience, " Exp"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: app.phone }), app.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[10px] text-emerald",
														children: ["WA: ", app.whatsapp]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-semibold text-foreground",
													children: app.city
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs",
														children: app.guarantorName
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-muted-foreground",
														children: app.guarantorPhone
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${app.status === "Approved" ? "bg-emerald-soft text-forest-deep" : app.status === "Rejected" ? "bg-red-100 text-red-500" : "bg-amber-100 text-amber-600"}`,
														children: app.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-right",
													children: app.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-1 justify-end",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => updateAppStatus(app.id, "Approved"),
															className: "p-1.5 rounded-lg bg-emerald-soft text-forest-deep hover:bg-emerald hover:text-white transition",
															title: "Approve Driver",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => updateAppStatus(app.id, "Rejected"),
															className: "p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition",
															title: "Reject Driver",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
														})]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground font-semibold",
														children: "Processed"
													})
												})
											]
										}, app.id))
									})]
								})
							})]
						}),
						activeSec === "workshop" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl font-bold text-foreground",
								children: "Workshop Bookings"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Manage mechanical and CNG conversion appointments at service hubs."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-2xl border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-sm border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "bg-mist/30 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Customer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Vehicle Model"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Service"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Hub Location"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4",
												children: "Appointment"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 text-center",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 text-right",
												children: "Actions"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border/60",
										children: bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 8,
											className: "p-8 text-center text-muted-foreground",
											children: "No bookings found."
										}) }) : bookings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-mist/10 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-mono text-xs font-bold text-forest",
													children: b.id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-foreground",
														children: b.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-muted-foreground",
														children: b.phone
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-medium text-foreground",
													children: b.vehicleModel
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-xs font-semibold text-forest-deep",
													children: b.serviceType
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4",
													children: b.location
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs font-bold text-foreground",
														children: b.date
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[10px] text-muted-foreground",
														children: b.time
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${b.status === "Completed" ? "bg-slate-100 text-muted-foreground" : "bg-emerald-soft text-forest-deep"}`,
														children: b.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-right",
													children: b.status === "Confirmed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => updateBookingStatus(b.id, "Completed"),
														className: "text-xs font-bold text-forest hover:text-forest-deep",
														children: "Mark Done"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground",
														children: "Completed"
													})
												})
											]
										}, b.id))
									})]
								})
							})]
						}),
						activeSec === "content" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center pb-4 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-3xl font-bold text-foreground",
										children: "Blog & Article Posts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-1",
										children: "Write educational resources or company news to index for SEO."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowBlogForm(true),
										className: "inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Create Article"]
									})]
								}),
								showBlogForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleCreateBlog,
									className: "rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display font-semibold text-base",
											children: "New Article Details"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1",
												children: "Article Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: newBlog.title,
												onChange: (e) => setNewBlog((prev) => ({
													...prev,
													title: e.target.value
												})),
												placeholder: "e.g. Tips for Maintaining Your CNG Regulator",
												className: "w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-emerald bg-white"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1",
												children: "Category"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: newBlog.category,
												onChange: (e) => setNewBlog((prev) => ({
													...prev,
													category: e.target.value
												})),
												className: "w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-emerald bg-white",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "CNG Education",
														children: "CNG Education"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Fleet Operations",
														children: "Fleet Operations"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Company News",
														children: "Company News"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Maintenance Tips",
														children: "Maintenance Tips"
													})
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-2 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowBlogForm(false),
												className: "rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition",
												children: "Cancel"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition",
												children: "Publish Post"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4",
									children: blogPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border p-5 flex items-center justify-between shadow-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block rounded-full bg-emerald-soft text-forest-deep px-2.5 py-0.5 text-[10px] font-bold uppercase",
												children: post.category
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "mt-2 font-display font-semibold text-lg text-foreground",
												children: post.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex gap-4 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["By ", post.author] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Published ", post.date] })]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteBlog(post.id),
											className: "p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition",
											title: "Delete Article",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									}, post.id))
								})
							]
						})
					]
				})]
			})
		})
	});
}
//#endregion
export { AdminPanel as component };
