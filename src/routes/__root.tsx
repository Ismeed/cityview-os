import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-mist-gradient px-4 pt-32 pb-24">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">404 — Page not found</p>
          <h1 className="mt-4 font-display text-6xl font-semibold text-foreground">Lost on the road?</h1>
          <p className="mt-4 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest-deep"
          >
            Return home →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-forest-deep"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution" },
      {
        name: "description",
        content:
          "CityView CNG Automobile Synergy delivers CNG vehicle conversion, keke hire purchase, intelligent fleet operations, and professional automobile services across Northern Nigeria.",
      },
      { name: "author", content: "CityView CNG Automobile Synergy" },
      { name: "theme-color", content: "#0f2b1f" },
      { property: "og:site_name", content: "CityView CNG Automobile Synergy" },
      { property: "og:title", content: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution" },
      { property: "og:description", content: "CityView Digital HQ is the professional corporate website for a clean mobility company." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@CityViewCNG" },
      { name: "twitter:title", content: "CityView CNG Automobile Synergy — Driving Africa's Clean Mobility Revolution" },
      { name: "description", content: "CityView Digital HQ is the professional corporate website for a clean mobility company." },
      { name: "twitter:description", content: "CityView Digital HQ is the professional corporate website for a clean mobility company." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CityView CNG Automobile Synergy",
          url: "/",
          slogan: "Driving Africa's Clean Mobility Revolution",
          description:
            "Clean mobility company offering CNG conversion, keke hire purchase, fleet operations, and automobile engineering.",
          address: { "@type": "PostalAddress", addressRegion: "Katsina", addressCountry: "NG" },
          areaServed: ["Katsina", "Gombe", "Northern Nigeria", "Nigeria", "West Africa"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/admin") || location.pathname.startsWith("/login");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!hideHeaderFooter && <SiteHeader />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideHeaderFooter && <SiteFooter />}
      </div>
    </QueryClientProvider>
  );
}

