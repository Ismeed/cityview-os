import { r as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHero, t as Eyebrow } from "./section-B6sxK-Cb.mjs";
import { N as MapPin, O as Phone, P as Mail, j as MessageCircle, rt as Clock } from "../_libs/lucide-react.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DOKD4kDF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(1, "Name required").max(100),
	email: stringType().trim().email("Valid email required").max(255),
	phone: stringType().trim().max(30).optional().or(literalType("")),
	topic: stringType().max(60),
	message: stringType().trim().min(5, "Please add a bit more detail").max(1e3)
});
function Contact() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const data = Object.fromEntries(fd);
		const r = schema.safeParse(data);
		if (!r.success) {
			const errs = {};
			r.error.issues.forEach((i) => {
				errs[i.path[0]] = i.message;
			});
			setErrors(errs);
			return;
		}
		setErrors({});
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Contact",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Let's ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-emerald",
				children: "move"
			}),
			" together."
		] }),
		description: "One form. Whichever team needs to reply, we route it internally and get back within one business day."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Direct channels" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 font-display text-3xl font-semibold md:text-4xl",
					children: "Prefer talking? So do we."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-4",
					children: [
						{
							i: Phone,
							t: "Call us",
							v: "09121266900 · 08039739252"
						},
						{
							i: MessageCircle,
							t: "WhatsApp",
							v: "09121266900"
						},
						{
							i: Mail,
							t: "Email",
							v: "hello@cityviewcng.africa"
						},
						{
							i: MapPin,
							t: "Head office",
							v: "No. 1 Nagogo Road Near Union Bank, GRA Katsina, Along Kofar Durbi Road."
						},
						{
							i: Clock,
							t: "Office hours",
							v: "Mon–Sat · 8:00–18:00"
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-2xl border border-border bg-white p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-soft text-forest-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.i, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: c.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 font-semibold text-foreground",
							children: c.v
						})] })]
					}, c.t))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl border border-border bg-mist p-8 shadow-soft md:p-10",
				children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full min-h-[400px] flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-full bg-emerald-gradient text-white text-2xl",
							children: "✓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-2xl font-semibold text-foreground",
							children: "Message received."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-sm text-muted-foreground",
							children: "Our team will reply within one business day. For urgent requests, WhatsApp is fastest."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "grid gap-4",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name",
								name: "name",
								error: errors.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								name: "email",
								type: "email",
								error: errors.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone (optional)",
								name: "phone",
								error: errors.phone
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: "Topic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "topic",
								defaultValue: "CNG Conversion",
								className: "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none",
								children: [
									"CNG Conversion",
									"Hire Purchase",
									"Fleet Partnership",
									"Workshop / Maintenance",
									"Careers",
									"Investor Enquiry",
									"General"
								].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
								children: "Message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								rows: 5,
								className: "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none"
							}),
							errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.message
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-forest-deep",
							children: "Send message"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "By submitting you agree to our privacy policy."
						})
					]
				})
			})]
		})
	})] });
}
function Field({ label, name, type = "text", error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			className: "mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-emerald focus:outline-none"
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-destructive",
			children: error
		})
	] });
}
//#endregion
export { Contact as component };
