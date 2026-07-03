import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-emerald-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-deep">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const a = align === "center" ? "text-center items-center" : "";
  return (
    <div className={`flex flex-col gap-4 ${a}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-24 text-white md:pt-44 md:pb-32">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-forest/40 blur-3xl" />
      </div>
      <div className="container-x relative">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> {eyebrow}
            </span>
          )}
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-balance text-lg text-white/70 md:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}