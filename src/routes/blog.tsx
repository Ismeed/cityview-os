import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "../components/site/section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — CityView CNG" },
      { name: "description", content: "News, CNG education, industry updates and maintenance tips from CityView CNG Automobile Synergy." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { cat: "CNG Education", t: "A driver's guide to CNG safety in Nigeria", d: "Everything you should know before, during and after converting your vehicle to CNG.", date: "Jun 2026" },
  { cat: "Company News", t: "CityView opens second branch in Gombe", d: "Our northeastern expansion begins with a full-service workshop and conversion facility.", date: "May 2026" },
  { cat: "Industry", t: "Why fleet operators are switching to CNG faster than ever", d: "Fuel volatility and CO₂ targets are accelerating the move — here's how to plan it.", date: "Apr 2026" },
  { cat: "Maintenance", t: "5 preventive checks that add years to your engine", d: "Simple monthly habits that reduce breakdowns and total cost of ownership.", date: "Mar 2026" },
  { cat: "CNG Education", t: "The economics of a CNG keke", d: "How a hire-purchase model plus CNG changes a driver's weekly income.", date: "Feb 2026" },
  { cat: "Industry", t: "Northern Nigeria's clean-mobility corridor is emerging", d: "Katsina, Gombe, Kano — the map of Africa's next mobility hub.", date: "Jan 2026" },
];

function Blog() {
  return (
    <>
      <PageHero eyebrow="Insights" title={<>Clean-mobility <span className="text-gradient-emerald">writing worth reading.</span></>}
        description="Deep dives, company news, and practical guidance from the people building Africa's clean transport." />
      <section className="bg-white py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.t} className="hover-lift group flex flex-col rounded-3xl border border-border bg-white p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald">{p.cat}</div>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{p.t}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.d}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.date}</span>
                  <Link to="/blog" className="inline-flex items-center gap-1 font-semibold text-forest-deep">Read <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
