import { Link } from "@tanstack/react-router";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const text = variant === "light" ? "text-white" : "text-foreground";
  const sub = variant === "light" ? "text-white/60" : "text-muted-foreground";
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-gradient shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] font-semibold tracking-tight ${text}`}>CityView CNG</span>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${sub}`}>Automobile Synergy</span>
      </span>
    </Link>
  );
}