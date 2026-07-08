import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loginUser, getCurrentUser, SEED_ACCOUNTS, AuthUser } from "../lib/auth";
import { KeyRound, Mail, ArrowRight, ShieldCheck, Database, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "CityView ERP — Operations Access Portal" },
      { name: "description", content: "Login to the CityView Company Operations and Branch Management system." }
    ]
  }),
  component: Login
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect (with small delay to let localStorage settle on mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = getCurrentUser();
      if (user) {
        doRedirect(user);
      }
    }, 120); // small delay for localStorage to settle on iOS/Android
    return () => clearTimeout(timer);
  }, []);

  const doRedirect = (user: AuthUser) => {
    navigate({ to: "/admin" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // Small artificial delay to show loading state, then authenticate
    setTimeout(() => {
      const result = loginUser(email.trim(), password);
      
      if (typeof result === "string") {
        setLoading(false);
        toast.error("Authentication Failure", {
          description: result
        });
      } else {
        toast.success("Authentication Successful", {
          description: `Welcome back, ${result.name} (${result.role})`
        });
        // Give localStorage 200ms to flush before navigation (crucial for mobile Safari)
        setTimeout(() => {
          setLoading(false);
          doRedirect(result);
        }, 200);
      }
    }, 600);
  };

  const handleDemoLogin = (demoEmail: string) => {
    if (loading) return;
    const account = SEED_ACCOUNTS.find(a => a.email === demoEmail);
    if (!account) return;
    setEmail(account.email);
    setPassword(account.password);
    setLoading(true);

    setTimeout(() => {
      const result = loginUser(account.email, account.password);
      if (typeof result !== "string") {
        toast.success("Demo Session Initiated", {
          description: `Logged in as ${result.name} — ${result.role}`
        });
        // Give localStorage 200ms to flush before navigation (crucial for mobile Safari)
        setTimeout(() => {
          setLoading(false);
          doRedirect(result);
        }, 200);
      } else {
        setLoading(false);
        toast.error("Demo Login Failed", { description: result });
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-ink text-white overflow-hidden py-12 px-4">
      {/* Decorative Blur Spheres — using opacity only (no backdrop-filter for mobile compat) */}
      <div className="absolute top-[-10%] right-[-10%] h-96 w-96 rounded-full bg-forest opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] h-96 w-96 rounded-full bg-emerald opacity-15 blur-3xl pointer-events-none" />
      
      {/* Full-screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-emerald animate-spin" />
            <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Authenticating...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl grid lg:grid-cols-12 gap-6 sm:gap-8 z-10">
        {/* Left Column: Product Branding (hidden on mobile, shown on desktop) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-forest text-forest-deep shadow-glow shrink-0">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-white block">CITYVIEW</span>
              <span className="text-[10px] font-bold text-emerald tracking-[0.25em] uppercase">Operations Center</span>
            </div>
          </div>

          <div className="mt-16 mb-16 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              One operational loop. <br />
              <span className="text-gradient-emerald">Zero security leaks.</span>
            </h1>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Login to access Katsina HQ and Gombe Hub sub-ledgers. Role-Based Access Control and multi-branch data isolation are strictly enforced.
            </p>
          </div>

          <div className="flex gap-4 text-xs text-white/40 font-semibold uppercase tracking-wider border-t border-white/5 pt-6">
            <span>Branch Isolation v1.0</span>
            <span>·</span>
            <span>Katsina HQ &amp; Gombe Hub</span>
          </div>
        </div>

        {/* Right Column: Portal Login Form */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">

          {/* Mobile brand header (visible only on small screens) */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-forest shadow-glow shrink-0">
              <Database className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-tight text-white block">CITYVIEW</span>
              <span className="text-[9px] font-bold text-emerald tracking-[0.2em] uppercase">Operations Center</span>
            </div>
          </div>

          {/* Main Login Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-elevated">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-display text-2xl font-bold text-white">Operations Sign In</h2>
              <p className="text-xs text-white/50 mt-1">Enter your credentials to access your branch dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="employee@cityview.ng"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald/60 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/30 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald/60 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 p-0.5 text-white/30 hover:text-white transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-bold text-forest-deep transition hover:bg-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Secure Sign In
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Demo Credentials Panel */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-emerald mb-2">
              <KeyRound className="h-4 w-4 shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Demo Access Accounts</h3>
            </div>
            <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
              Tap a profile to instantly log in and test branch data isolation.
            </p>

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {[
                { email: "admin@cityview.ng", title: "Super Admin", badge: "Full Access" },
                { email: "fleet.katsina@cityview.ng", title: "Katsina Fleet Officer", badge: "Katsina Fleet" },
                { email: "workshop.katsina@cityview.ng", title: "Katsina Workshop Officer", badge: "Katsina Workshop" },
                { email: "fleet.gombe@cityview.ng", title: "Gombe Fleet Officer", badge: "Gombe Fleet" },
                { email: "workshop.gombe@cityview.ng", title: "Gombe Workshop Officer", badge: "Gombe Workshop" },
              ].map(({ email: demoEmail, title, badge }) => (
                <button
                  key={demoEmail}
                  type="button"
                  disabled={loading}
                  onClick={() => handleDemoLogin(demoEmail)}
                  className="text-left rounded-xl border border-white/8 bg-white/3 p-3 text-xs hover:bg-white/8 hover:border-white/15 active:scale-95 transition group disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <div className="font-bold text-white group-hover:text-emerald transition truncate">{title}</div>
                  <div className="text-[10px] text-white/40 mt-0.5 truncate">{demoEmail}</div>
                  <div className="text-[9px] uppercase tracking-wider font-bold text-emerald/75 mt-1">{badge}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
