import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, r as SectionHeading, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { B as Handshake, K as FileCheck, S as Send, et as CircleCheck, r as Wallet, tt as CircleCheckBig, yt as ArrowRight, z as IdCard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hire-purchase-BmQW0kEU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HP() {
	const [step, setStep] = (0, import_react.useState)("info");
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		phone: "",
		whatsapp: "",
		city: "Katsina",
		experience: "1-2 Years",
		guarantorName: "",
		guarantorPhone: ""
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
		const existing = localStorage.getItem("cityview_hp_applications");
		const apps = existing ? JSON.parse(existing) : [];
		const newApp = {
			...formData,
			id: `APP-${Date.now().toString().slice(-4)}`,
			date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
			status: "Pending"
		};
		localStorage.setItem("cityview_hp_applications", JSON.stringify([newApp, ...apps]));
		setStep("success");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Hire Purchase Scheme",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Own a ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-emerald",
					children: "CNG keke."
				}),
				" Change your income."
			] }),
			description: "A structured, transparent path to ownership for professional drivers. Flexible weekly repayments. Full servicing included.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setStep("form"),
					className: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-sm font-semibold text-forest-deep shadow-glow hover:bg-white transition cursor-pointer",
					children: ["Apply online now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [
					step === "info" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-center gap-14 lg:grid-cols-2 animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative overflow-hidden rounded-4xl shadow-elevated border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/keke-fleet-BRZomEch.png",
								alt: "CityView CNG keke fleet",
								width: 1600,
								height: 1e3,
								loading: "lazy",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "How it works" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 font-display text-4xl font-semibold md:text-5xl",
								children: "Four steps to ownership."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-4",
								children: [
									{
										i: IdCard,
										t: "1. Apply online or in branch",
										d: "Submit your details, guarantor contacts, and choose Katsina or Gombe branch."
									},
									{
										i: FileCheck,
										t: "2. Verification & Interview",
										d: "We review your license, guarantor status, and conduct a brief driver evaluation."
									},
									{
										i: Handshake,
										t: "3. Agreement Sign-off",
										d: "Sign a clear, interest-stable hire-purchase agreement with zero hidden charges."
									},
									{
										i: Wallet,
										t: "4. Daily operations & weekly payment",
										d: "Own your green CNG Keke outright at the end of your contract period."
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4 rounded-3xl border border-border bg-white p-6 transition hover:shadow-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-forest-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.i, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-lg font-semibold text-foreground",
										children: s.t
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground leading-relaxed",
										children: s.d
									})] })]
								}, s.t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setStep("form"),
								className: "mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-deep transition",
								children: ["Start your application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						] })]
					}),
					step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl rounded-4xl border border-border bg-white p-8 shadow-elevated animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-6 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								children: "Hire Purchase Application"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep("info"),
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
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										name: "name",
										required: true,
										value: formData.name,
										onChange: handleInputChange,
										placeholder: "Alhaji Bello",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Preferred City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "city",
										value: formData.city,
										onChange: handleInputChange,
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Katsina",
											children: "Katsina (Head Office)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Gombe",
											children: "Gombe Branch"
										})]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
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
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "WhatsApp Number (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										name: "whatsapp",
										value: formData.whatsapp,
										onChange: handleInputChange,
										placeholder: "e.g. 08030000000",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
									children: "Guarantor Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									name: "guarantorName",
									required: true,
									value: formData.guarantorName,
									onChange: handleInputChange,
									placeholder: "Guarantor's Name",
									className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Guarantor Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										name: "guarantorPhone",
										required: true,
										value: formData.guarantorPhone,
										onChange: handleInputChange,
										placeholder: "e.g. 08030000000",
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2",
										children: "Driving Experience"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "experience",
										value: formData.experience,
										onChange: handleInputChange,
										className: "w-full rounded-xl border border-border px-4 py-3 text-sm focus:outline-emerald bg-white",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Less than 1 Year",
												children: "Less than 1 Year"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "1-2 Years",
												children: "1-2 Years"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "3-5 Years",
												children: "3-5 Years"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Over 5 Years",
												children: "Over 5 Years"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-6 flex items-center justify-end gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setStep("info"),
										className: "rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-mist transition",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-forest-deep hover:bg-forest hover:text-white transition shadow-glow-soft",
										children: ["Submit Application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })]
									})]
								})
							]
						})]
					}),
					step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-md text-center rounded-4xl border border-border bg-white p-10 shadow-elevated animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-forest-deep mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-bold text-foreground",
								children: "Application Received!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted-foreground leading-relaxed",
								children: [
									"Thank you, ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-forest-deep",
										children: formData.name
									}),
									". Your application for a CNG Keke Hire Purchase has been successfully registered."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-2xl bg-mist p-4 text-xs text-left border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-forest-deep",
									children: "What happens next?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 space-y-1.5 list-disc list-inside text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Our Katsina head office will review your details." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											"We will call you on ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: formData.phone
											}),
											" within 24 business hours."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Please prepare your valid ID and Guarantor details." })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep("info"),
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
					eyebrow: "Requirements",
					title: "Simple and fair checklist.",
					description: "We make it direct and accessible for genuine operators."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: [
						"Valid Nigerian ID card (NIN / Voter Card)",
						"Driver's license (Class C Tricycle category)",
						"Locally recognizable guarantor (Community Leader/Civil Servant)",
						"Proof of residence in Katsina or Gombe",
						"Two passport photographs",
						"Interview and road evaluation with our inspectors"
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-emerald shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-foreground",
							children: r
						})]
					}, r))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-white py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Driver stories",
					title: "Real drivers. Real ownership.",
					description: "Hear how the CNG Hire Purchase scheme is making local drivers self-reliant."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: [
						{
							n: "Musa I.",
							c: "Katsina",
							q: "In eight months I've saved more than in two years of renting. The fuel cost is so low compared to petrol. The keke is mine soon."
						},
						{
							n: "Aliyu B.",
							c: "Gombe",
							q: "CityView's preventive servicing means my tricycle is always running. My family has a stable income now."
						},
						{
							n: "Habiba S.",
							c: "Katsina",
							q: "Operating a clean energy keke gets me more passengers. People love that it runs on gas! I bring home double each week."
						}
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-3xl border border-border bg-mist p-8 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "text-base leading-relaxed text-foreground italic",
							children: [
								"\"",
								t.q,
								"\""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-6 text-sm text-muted-foreground border-t border-border pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-forest-deep",
									children: t.n
								}),
								" · ",
								t.c
							]
						})]
					}, t.n))
				})]
			})
		})
	] });
}
//#endregion
export { HP as component };
