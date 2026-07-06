import { useState } from "react";
import { ERPStore, MockUser } from "./mockData";
import { Shield, Database, Save, Upload, Settings2, RefreshCw, Key, Eye, EyeOff, Clipboard, Check, User } from "lucide-react";
import { toast } from "sonner";

interface SettingsProps {
  currentUser?: {
    email: string;
    name: string;
    role: string;
    department: string;
    branch: string;
    branchName: string;
    passwordHash: string;
  };
}

export function Settings({ currentUser }: SettingsProps) {
  const [profile, setProfile] = useState({
    name: "CityView CNG Automobile Synergy",
    tagline: "Driving a Cleaner, Smarter Future",
    hq: "Katsina State, Nigeria",
    targetRemittance: 12000,
    timeoutMinutes: 15
  });

  const [saving, setSaving] = useState(false);
  
  // Password change states
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});

  // Credentials visibility toggle for admin directory
  const [revealPasswords, setRevealPasswords] = useState<Record<string, boolean>>({});
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const isAdmin = currentUser?.role === "Super Admin" || 
                  currentUser?.role === "Managing Director (CEO)" || 
                  currentUser?.role === "System Administrator" || 
                  currentUser?.role === "Executive Director";

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Save System Settings", "Updated company profile config & session timeout settings.");
      toast.success("Settings Saved Successfully", {
        description: "Operating rules and company profile variables have been committed."
      });
    }, 800);
  };

  // Change Password logic
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (passwordState.newPassword !== passwordState.confirmPassword) {
      toast.error("Password Mismatch", { description: "New password and confirmation password do not match." });
      return;
    }

    if (passwordState.currentPassword !== currentUser.passwordHash) {
      toast.error("Incorrect Password", { description: "The current password you entered is incorrect." });
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      const users = ERPStore.getUsers();
      const updatedUsers = users.map(u => {
        if (u.email.toLowerCase() === currentUser.email.toLowerCase()) {
          return { ...u, passwordHash: passwordState.newPassword };
        }
        return u;
      });

      // Save to store
      ERPStore.saveUsers(updatedUsers);

      // Update current session user in localstorage
      const updatedUserSession = { ...currentUser, passwordHash: passwordState.newPassword };
      localStorage.setItem("cityview_user_session", JSON.stringify(updatedUserSession));

      ERPStore.addAuditLog(currentUser.name, currentUser.role, "Change Password", `Updated login password for email: ${currentUser.email}`);
      
      toast.success("Password Updated", {
        description: "Your login credentials password was changed successfully."
      });

      setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordLoading(false);
    }, 800);
  };

  const handleBackup = () => {
    if (!isAdmin) return;
    try {
      const backupData: Record<string, string | null> = {};
      const keys = [
        "cityview_erp_branches",
        "cityview_erp_employees",
        "cityview_erp_drivers",
        "cityview_erp_vehicles",
        "cityview_erp_shifts",
        "cityview_erp_hp_contracts",
        "cityview_erp_job_cards",
        "cityview_erp_conversions",
        "cityview_erp_inventory",
        "cityview_erp_transactions",
        "cityview_erp_audit_logs",
        "cityview_erp_users"
      ];
      
      keys.forEach(k => {
        backupData[k] = localStorage.getItem(k);
      });

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CityView_ERP_Backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Export Backup JSON", "Downloaded system database snapshot.");
      toast.success("Backup File Created", {
        description: "CityView_ERP_Backup.json has been downloaded to your machine."
      });
    } catch (e) {
      console.error(e);
      toast.error("Backup Failed", { description: "An error occurred compiling localstorage." });
    }
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as Record<string, string>;
        Object.entries(data).forEach(([key, val]) => {
          if (val) {
            localStorage.setItem(key, val);
          }
        });
        
        ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Import Backup JSON", "Restored localstorage state from file.");
        toast.success("Database Restored", {
          description: "System records successfully imported. Reloading to sync state..."
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.error(err);
        toast.error("Restore Failed", { description: "Invalid JSON backup file structural layout." });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (!isAdmin) return;
    if (confirm("WARNING: This will delete all customized local records and reset mock data back to factory defaults. Proceed?")) {
      const keys = [
        "cityview_erp_branches",
        "cityview_erp_employees",
        "cityview_erp_drivers",
        "cityview_erp_vehicles",
        "cityview_erp_shifts",
        "cityview_erp_hp_contracts",
        "cityview_erp_job_cards",
        "cityview_erp_conversions",
        "cityview_erp_inventory",
        "cityview_erp_transactions",
        "cityview_erp_audit_logs",
        "cityview_erp_users"
      ];
      keys.forEach(k => localStorage.removeItem(k));
      toast.info("Database Reset", { description: "Clearing local cache. System reloading..." });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success("Email copied", { description: `${email} copied to clipboard.` });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const togglePasswordReveal = (email: string) => {
    setRevealPasswords(prev => ({ ...prev, [email]: !prev[email] }));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl text-foreground">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h2 className="font-display text-3xl font-bold text-foreground">Profile & Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isAdmin 
            ? "Manage system-wide corporate settings, download backups, and audit simulated user credentials." 
            : "Update your login password and review your active branch operational privileges."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Profile Card & Password Update */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview (All Roles) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
            <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-emerald" />
              Active Account Profile
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Full Name</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.name || "System User"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Assigned Role</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.role || "Staff"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Corporate Email</span>
                <span className="font-semibold text-foreground text-sm font-mono break-all">{currentUser?.email || "—"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Operating Hub / Branch</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.branchName || "—"}</span>
              </div>
            </div>
          </div>

          {/* Change Password Form (All Roles) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
              <Key className="h-5 w-5 text-emerald" />
              Update Account Password
            </h4>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPass.current ? "text" : "password"}
                    required
                    value={passwordState.currentPassword}
                    onChange={(e) => setPasswordState(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPass.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass.new ? "text" : "password"}
                      required
                      value={passwordState.newPassword}
                      onChange={(e) => setPasswordState(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                      placeholder="Min 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPass.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPass.confirm ? "text" : "password"}
                      required
                      value={passwordState.confirmPassword}
                      onChange={(e) => setPasswordState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPass.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer disabled:opacity-50"
                >
                  <Key className="h-4 w-4" />
                  {passwordLoading ? "Saving..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Administrative Configurations (restricted to Admin roles) */}
        <div className="space-y-6">
          {isAdmin ? (
            <>
              {/* Backups Panel */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald" />
                  Backup & Sync
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Export the current localStorage database as a JSON file, or restore data from an existing backup file.
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleBackup}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition cursor-pointer"
                  >
                    <Save className="h-4 w-4 text-muted-foreground" />
                    Export Database JSON
                  </button>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestore}
                      id="restore-file-input"
                      className="hidden"
                    />
                    <label
                      htmlFor="restore-file-input"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald/15 hover:bg-emerald-500/20 text-emerald px-4 py-2.5 text-xs font-bold transition cursor-pointer text-center"
                    >
                      <Upload className="h-4 w-4" />
                      Restore Database File
                    </label>
                  </div>
                </div>
              </div>

              {/* Danger zone / resets */}
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 shadow-soft space-y-4">
                <h4 className="font-display font-bold text-base text-red-500 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Reset
                </h4>
                <p className="text-[11px] text-red-500/80 leading-relaxed">
                  Clear all customizations, shifts, transactions, and employee rosters to restore default mock seeds.
                </p>
                <button
                  onClick={clearAllData}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 text-xs font-bold transition cursor-pointer border border-red-500/25"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Cache Defaults
                </button>
              </div>
            </>
          ) : (
            /* Non-admin Information Alert */
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3">
              <h4 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                <Shield className="h-4.5 w-4.5 text-emerald" />
                Access Clearances
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Your role account <strong className="text-foreground">({currentUser?.role})</strong> is operating under hub security restrictions.
              </p>
              <div className="text-[10px] text-muted-foreground bg-muted/40 p-3 rounded-xl space-y-1">
                <div>• System configurations locked</div>
                <div>• Database backups restricted</div>
                <div>• Enterprise credentials hidden</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin section: Enterprise User Credentials Directory (Only visible to Admin) */}
      {isAdmin && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-2">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald" />
                Enterprise Credentials Dashboard
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Secure access directory listing login emails and passwords for walk-in simulation testing.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 text-emerald px-3 py-1 text-xs font-bold w-fit">
              {ERPStore.getUsers().length} Registered Accounts
            </span>
          </div>

          <div className="overflow-x-auto border border-border rounded-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Simulated Role</th>
                  <th className="p-4">Hub / Branch</th>
                  <th className="p-4">Login Email</th>
                  <th className="p-4">Password</th>
                  <th className="p-4 text-center">Simulate Credentials</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {ERPStore.getUsers().map((user) => (
                  <tr key={user.email} className="hover:bg-muted/10 transition">
                    <td className="p-4 font-semibold text-foreground">{user.name}</td>
                    <td className="p-4">
                      <span className="inline-block rounded bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground uppercase">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.branchName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-muted-foreground">{user.email}</span>
                        <button
                          onClick={() => copyToClipboard(user.email)}
                          className="text-muted-foreground hover:text-emerald transition cursor-pointer p-1 rounded hover:bg-muted"
                          title="Copy Email"
                        >
                          {copiedEmail === user.email ? <Check className="h-3 w-3 text-emerald" /> : <Clipboard className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span>{revealPasswords[user.email] ? user.passwordHash : "••••••••"}</span>
                        <button
                          onClick={() => togglePasswordReveal(user.email)}
                          className="text-muted-foreground hover:text-foreground transition cursor-pointer p-0.5"
                          title={revealPasswords[user.email] ? "Hide Password" : "Show Password"}
                        >
                          {revealPasswords[user.email] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-[10px] text-muted-foreground italic">Use Login Form</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
