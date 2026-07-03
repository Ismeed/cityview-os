import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/site/section";
import heroImg from "../assets/hero.jpg";
import workshopImg from "../assets/workshop.jpg";
import cngImg from "../assets/cng-detail.jpg";
import kekeImg from "../assets/keke-fleet.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CityView CNG" },
      { name: "description", content: "Workshop, conversions, vehicles, customers and facilities." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const shots = [
    { src: heroImg, alt: "CNG refueling depot", span: "md:col-span-2 md:row-span-2" },
    { src: workshopImg, alt: "Workshop interior", span: "" },
    { src: cngImg, alt: "CNG kit close-up", span: "" },
    { src: kekeImg, alt: "Keke fleet", span: "md:col-span-2" },
    { src: workshopImg, alt: "Technicians at work", span: "" },
    { src: cngImg, alt: "Engine bay", span: "" },
  ];
  return (
    <>
      <PageHero eyebrow="Gallery" title={<>Inside the <span className="text-gradient-emerald">CityView</span> operation.</>}
        description="Facilities, fleets, technicians and the customers we serve." />
      <section className="bg-white py-24">
        <div className="container-x">
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:grid-cols-4">
            {shots.map((s, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-2xl ${s.span}`}>
                <img src={s.src} alt={s.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">{s.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
