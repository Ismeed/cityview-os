import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { C as Send, Ct as ArrowRight, N as MapPin, W as Gauge, mt as Calendar, n as Wrench, nt as Cog, ot as CircleCheckBig, z as Key } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workshop-COhfBmMw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Workshop() {
	const [bookingStep, setBookingStep] = (0, import_react.useState)("info");
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		phone: "",
		serviceType: "CNG Conversion Consultation",
		vehicleModel: "",
		location: "Katsina",
		date: "",
		time: "09:00"
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const existing = localStorage.getItem("cityview_workshop_bookings");
		const bookings = existing ? JSON.parse(existing) : [];
		const newBooking = {
			...formData,
			id: `BK-${Date.now().toString().slice(-4)}`,
			status: "Confirmed",
			dateCreated: (/* @__PURE__ */ new Date()).toLocaleDateString()
		};
		localStorage.setItem("cityview_workshop_bookings", JSON.stringify([newBooking, ...bookings]));
		setBookingStep("success");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Workshop",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Engineering-grade care ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "for every vehicle."
			})] }),
			description: "From diagnostics to full engine work, our workshop is built for accuracy, transparency and speed.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setBookingStep("form"),
				className: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow hover:bg-white transition cursor-pointer",
				children: ["Book inspection / conversion ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [
					bookingStep === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-center gap-14 lg:grid-cols-2 animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative overflow-hidden rounded-4xl shadow-elevated border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/workshop-CGeNnIs9.png",
								alt: "CityView CNG workshop interior",
								width: 1600,
								height: 1024,
								loading: "lazy",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "What we do" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 font-display text-4xl font-semibold md:text-5xl",
								children: "A complete service line, one workshop."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground leading-relaxed",
								children: "Our service hubs are equipped with modern Italian and German engine diagnostic equipment. Our staff consists of certified alternative-energy auto mechanics who undergo rigorous continuous training."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-4 sm:grid-cols-2",
								children: [
									{
										i: Wrench,
										t: "CNG Conversion"
									},
									{
										i: Gauge,
										t: "Auto Diagnosis & Services"
									},
									{
										i: Cog,
										t: "Auto Alignment & Balancing"
									},
									{
										i: Key,
										t: "Key Services & Programing"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.i, { className: "h-5 w-5 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-foreground",
										children: s.t
									})]
								}, s.t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setBookingStep("form"),
								className: "mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition",
								children: ["Schedule an appointment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						] })]
					}),
					bookingStep === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl rounded-4xl border border-border bg-white p-8 shadow-elevated animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-6 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								children: "Schedule Workshop Service"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setBookingStep("info"),
								className: "text-xs font-semibold text-muted-foreground hover:text-forest-deep",
								children: "Back to info"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-8 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Your Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										name: "name",
										required: true,
										value: formData.name,
										onChange: handleInputChange,
										placeholder: "e.g. Alhaji Mustapha",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										name: "phone",
										required: true,
										value: formData.phone,
										onChange: handleInputChange,
										placeholder: "e.g. 08030000000",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Service Required"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "serviceType",
										value: formData.serviceType,
										onChange: handleInputChange,
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CNG Conversion",
												children: "CNG Conversion"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Auto Diagnosis & Services",
												children: "Auto Diagnosis & Services"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Auto Alignment & Balancing",
												children: "Auto Alignment & Balancing"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Key Services & Programing",
												children: "Key Services & Programing"
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Vehicle Make & Model"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										name: "vehicleModel",
										required: true,
										value: formData.vehicleModel,
										onChange: handleInputChange,
										placeholder: "e.g. Toyota HiAce 2018",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
											children: "Location"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											name: "location",
											value: formData.location,
											onChange: handleInputChange,
											className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Katsina",
												children: "Katsina (Head Office)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Gombe",
												children: "Gombe Branch"
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
											children: "Preferred Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											name: "date",
											required: true,
											value: formData.date,
											onChange: handleInputChange,
											className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
											children: "Preferred Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "time",
											name: "time",
											required: true,
											value: formData.time,
											onChange: handleInputChange,
											className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-6 flex items-center justify-end gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setBookingStep("info"),
										className: "rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-mist transition",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-forest-deep hover:bg-forest hover:text-white transition shadow-glow-soft",
										children: ["Confirm Booking ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })]
									})]
								})
							]
						})]
					}),
					bookingStep === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md text-center rounded-4xl border border-border bg-white p-10 shadow-elevated animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-forest-deep mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-bold text-foreground",
								children: "Booking Confirmed!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted-foreground leading-relaxed",
								children: [
									"Thank you, ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-forest-deep",
										children: formData.name
									}),
									". Your service booking for your ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-forest-deep",
										children: formData.vehicleModel
									}),
									" has been confirmed."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-2xl bg-mist p-4 text-xs text-left border border-border space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-forest-deep",
										children: "Appointment Summary:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-emerald" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												formData.date,
												" at ",
												formData.time
											] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-emerald" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["CityView Workshop, ", formData.location] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-emerald" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formData.serviceType })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setBookingStep("info"),
								className: "mt-8 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-deep transition",
								children: "Back to Information"
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-mist py-24 border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Repair process",
					title: "Transparent, documented, engineered.",
					description: "Our 4-step process builds customer confidence and ensures engineering excellence."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-4",
					children: [
						{
							n: "01",
							t: "Intake & digital diagnostics",
							d: "Cylinder gas leak scans, exhaust sensor profiling, and mechanical inspection logged digitally."
						},
						{
							n: "02",
							t: "Detailed diagnostic report",
							d: "A clear cost estimate and telemetry diagnostics report sent to your phone before any work begins."
						},
						{
							n: "03",
							t: "Approved work order",
							d: "Our certified engineers execute conversions or mechanical adjustments matching precise OEM specifications."
						},
						{
							n: "04",
							t: "Safety testing & handover",
							d: "hydrostatic gas tests, ECU calibration, road trials, and a 12-month conversion warranty sign-off."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-6 shadow-soft hover:shadow-medium transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-bold text-emerald",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 font-display text-lg font-bold text-foreground",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground leading-relaxed",
								children: s.d
							})
						]
					}, s.n))
				})]
			})
		})
	] });
}
//#endregion
export { Workshop as component };
