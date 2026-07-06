import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ERPStore, MockUser } from "../components/admin/mockData";
import { Shield, Mail, Lock, ArrowRight, Building2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "../components/site/logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "CityView ERP — Operations Portal Access" },
      { name: "description", content: "Secure operations entry for CityView CNG Auto Synergy." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("cityview_user_session");
      if (session) {
        navigate({ to: "/admin" });
      }
    }
  }, [navigate]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const users = ERPStore.getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
      );

      if (user) {
        if (user.disabled) {
          toast.error("Access Suspended", {
            description: "This account has been disabled by the system administrator."
          });
          setLoading(false);
          return;
        }
        localStorage.setItem("cityview_user_session", JSON.stringify(user));
        toast.success("Access Granted", {
          description: `Logged in as ${user.name} (${user.role})`
        });
        navigate({ to: "/admin" });
      } else {
        toast.error("Authentication Failed", {
          description: "Invalid email address or password. Please try again."
        });
      }
      setLoading(false);
    }, 600);
  };

  const selectDemoAccount = (user: MockUser) => {
    if (user.disabled) {
      toast.error("Access Suspended", {
        description: "This account has been disabled."
      });
      return;
    }
    setEmail(user.email);
    setPassword(user.passwordHash);
    toast.info("Demo credentials selected", {
      description: `Auto-filled form for ${user.role} (${user.branchName})`
    });
    
    // Auto-login after a brief delay to demonstrate the autofill
    setTimeout(() => {
      setLoading(true);
      localStorage.setItem("cityview_user_session", JSON.stringify(user));
      toast.success("Access Granted", {
        description: `Logged in as ${user.name} (${user.role})`
      });
      navigate({ to: "/admin" });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="relative min-h-[100svh] flex flex-col justify-center items-center bg-ink text-white/90 overflow-hidden font-sans p-4">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-hero-gradient opacity-60 z-0" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-forest/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center z-10">
        
        {/* Left Side: Brand Context & Clickable Credentials */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald tracking-wide">
              <Shield className="h-3.5 w-3.5" />
              Role-Based Access Control Active
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              CityView Operations <br />
              <span className="bg-gradient-to-r from-emerald to-green-400 bg-clip-text text-transparent">
                Control Center
              </span>
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              Internal Enterprise Resource Planning (ERP) platform for vehicle tracking, 
              CNG conversions, workshop repairs, and fleet hire purchase operations.
            </p>
          </div>

          {/* Clickable Demo Credentials Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-emerald" />
                  UAT Demo Credentials
                </h3>
                <p className="text-xs text-white/40">Click any account below to instantly auto-fill and log in</p>
              </div>
              <span className="text-[10px] font-mono bg-emerald/20 text-emerald-light border border-emerald/30 px-2 py-0.5 rounded-full">
                V1.0 Ready
              </span>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {ERPStore.getUsers().filter(u => u.role === "Super Admin").map((user) => {
                const isSuperAdmin = user.role === "Super Admin";
                const isFleet = user.department.includes("Fleet");
                
                return (
                  <button
                    key={user.email}
                    onClick={() => selectDemoAccount(user)}
                    className="flex flex-col text-left p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-emerald/40 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold ${isSuperAdmin ? 'text-amber-400' : isFleet ? 'text-blue-400' : 'text-emerald-400'}`}>
                        {user.role}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                        {user.branchName}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white mt-1 group-hover:text-emerald transition">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-white/50 font-mono mt-0.5 block break-all">
                      {user.email}
                    </span>
                    <span className="text-[9px] text-white/30 font-mono mt-1">
                      Password: <span className="text-white/60">{user.passwordHash}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Box */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <Logo variant="light" showTagline={false} />
              <h2 className="font-display text-xl font-bold text-white mt-4">Operational Portal Access</h2>
              <p className="text-xs text-white/50">Enter credentials assigned to your department</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="name@cityview.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-emerald focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald hover:bg-emerald-light text-forest-deep py-3.5 text-sm font-bold shadow-lg shadow-emerald/10 hover:shadow-emerald/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-forest-deep border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-xs text-white/40 border-t border-white/5 pt-4">
              <Building2 className="h-3.5 w-3.5" />
              <span>CityView CNG Automobile Synergy Ltd.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
