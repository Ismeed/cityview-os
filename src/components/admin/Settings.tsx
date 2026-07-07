import { useState } from "react";
import { ERPStore } from "./mockData";
import { Shield, Database, Save, Upload, Settings2, RefreshCw, UserPlus, Key, Eye, EyeOff, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { getAccounts, saveAccounts, AuthUser } from "../../lib/auth";

export function Settings() {
  const [accounts, setAccounts] = useState<Record<string, AuthUser & { password: string }>>(() => getAccounts());
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  
  // Account Form State
  const [newAcc, setNewAcc] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "Branch Operations Officer",
    department: "Operations",
    branch: "BR-KT"
  });
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: "CityView CNG Automobile Synergy",
    tagline: "Driving a Cleaner, Smarter Future",
    hq: "Katsina State, Nigeria",
    targetRemittance: 12000,
    timeoutMinutes: 15
  });

  const [saving, setSaving] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      ERPStore.addAuditLog("Admin", "Super Administrator", "Save System Settings", "Updated company profile config & session timeout settings.");
      toast.success("Settings Saved Successfully", {
        description: "Operating rules and company profile variables have been committed."
      });
    }, 1000);
  };

  const handleBackup = () => {
    try {
      // Gather all local storage keys for CityView
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
        "cityview_erp_audit_logs"
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

      ERPStore.addAuditLog("Admin", "Super Administrator", "Export Backup JSON", "Downloaded system database snapshot.");
      toast.success("Backup File Created", {
        description: "CityView_ERP_Backup.json has been downloaded to your machine."
      });
    } catch (e) {
      console.error(e);
      toast.error("Backup Failed", { description: "An error occurred compiling localstorage." });
    }
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        
        ERPStore.addAuditLog("Admin", "Super Administrator", "Import Backup JSON", "Restored localstorage state from file.");
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
        "cityview_erp_audit_logs"
      ];
      keys.forEach(k => localStorage.removeItem(k));
      toast.info("Database Reset", { description: "Clearing local cache. System reloading..." });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="border-b border-border pb-6">
        <h2 className="font-display text-3xl font-bold text-foreground">ERP Settings & Management</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Adjust corporate configurations, modify lease limits, export database backups, and manage simulated security parameters.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 items-start">
        {/* Left Side: General Profile Form */}
        <div className="md:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-forest" />
            Company Preferences
          </h4>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Company Identity Title</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Branding Tagline</label>
                <input
                  type="text"
                  required
                  value={profile.tagline}
                  onChange={(e) => setProfile(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Headquarters Location</label>
                <input
                  type="text"
                  required
                  value={profile.hq}
                  onChange={(e) => setProfile(prev => ({ ...prev, hq: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Base Repayment Rate (₦/day)</label>
                <input
                  type="number"
                  required
                  value={profile.targetRemittance}
                  onChange={(e) => setProfile(prev => ({ ...prev, targetRemittance: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Staff Credentials & Accounts Panel */}
        <div className="md:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Key className="h-5 w-5 text-forest" />
            Manage Staff Accounts & Login Credentials
          </h4>
          <p className="text-xs text-muted-foreground">
            Configure passwords, assign organizational roles, and designate branch clearances. These accounts dictate direct ERP login access.
          </p>

          {/* Accounts List Table */}
          <div className="overflow-x-auto border border-border/60 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-mist/35 text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-b border-border/60">
                  <th className="p-3.5">Name / Email</th>
                  <th className="p-3.5">System Role</th>
                  <th className="p-3.5">Branch</th>
                  <th className="p-3.5">Login Password</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                {Object.entries(accounts).map(([key, acc]) => (
                  <tr key={key} className="hover:bg-mist/10 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-foreground">{acc.name}</div>
                      <div className="text-[10px] text-muted-foreground">{acc.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        acc.role === "Super Admin" ? "bg-red-50 text-red-600 border border-red-100" :
                        acc.role === "Branch Operations Officer" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        "bg-purple-50 text-purple-600 border border-purple-100"
                      }`}>
                        {acc.role}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-charcoal">
                      {acc.branch === "ALL" ? "Global (All)" : acc.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub"}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-mist/55 px-2 py-1 rounded font-bold tracking-wide text-charcoal">
                          {showPasswords[key] ? acc.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }))}
                          className="text-muted-foreground hover:text-charcoal cursor-pointer"
                        >
                          {showPasswords[key] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingKey(key);
                            setNewAcc({
                              username: key,
                              name: acc.name,
                              email: acc.email,
                              password: acc.password,
                              role: acc.role,
                              department: acc.department,
                              branch: acc.branch
                            });
                          }}
                          className="p-1 text-muted-foreground hover:text-forest transition cursor-pointer"
                          title="Edit Account"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (key === "super_admin") {
                              toast.error("Deletion Restricted", { description: "Cannot delete the primary root super administrator account." });
                              return;
                            }
                            if (confirm(`Are you sure you want to delete account "${acc.name}"?`)) {
                              const updated = { ...accounts };
                              delete updated[key];
                              setAccounts(updated);
                              saveAccounts(updated);
                              toast.success("Account Removed", { description: `Credentials for ${acc.name} deleted.` });
                            }
                          }}
                          className="p-1 text-muted-foreground hover:text-red-500 transition cursor-pointer"
                          title="Delete Account"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add / Edit Account Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const key = editingKey || newAcc.username.toLowerCase().replace(/[^a-z0-9]/g, "_") || `user_${Date.now()}`;
            
            const updated = {
              ...accounts,
              [key]: {
                email: newAcc.email,
                name: newAcc.name,
                role: newAcc.role,
                department: newAcc.department,
                branch: newAcc.branch,
                password: newAcc.password
              }
            };
            
            setAccounts(updated);
            saveAccounts(updated);
            toast.success(editingKey ? "Account Updated" : "Account Created", {
              description: `Logins configured for ${newAcc.name}.`
            });

            // Reset form
            setEditingKey(null);
            setNewAcc({
              username: "",
              name: "",
              email: "",
              password: "",
              role: "Branch Operations Officer",
              department: "Operations",
              branch: "BR-KT"
            });
          }} className="rounded-2xl border border-border/80 p-5 bg-mist/10 space-y-4">
            <h5 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
              <UserPlus className="h-4.5 w-4.5 text-forest" />
              {editingKey ? "Modify Account Credentials" : "Create New Access Account"}
            </h5>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {!editingKey && (
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Unique Username ID</label>
                  <input
                    type="text"
                    required
                    value={newAcc.username}
                    onChange={(e) => setNewAcc(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="e.g. katsina_billing"
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
              )}
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAcc.name}
                  onChange={(e) => setNewAcc(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Alhaji Mustapha"
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={newAcc.email}
                  onChange={(e) => setNewAcc(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. m.ibrahim@cityview.ng"
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Security Password</label>
                <input
                  type="text"
                  required
                  value={newAcc.password}
                  onChange={(e) => setNewAcc(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password value"
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Access Role</label>
                <select
                  value={newAcc.role}
                  onChange={(e) => setNewAcc(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Branch Operations Officer">Branch Operations Officer</option>
                  <option value="Workshop & CNG Operations Officer">Workshop & CNG Operations Officer</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Branch Bound</label>
                <select
                  value={newAcc.branch}
                  onChange={(e) => setNewAcc(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                >
                  <option value="ALL">Global (All)</option>
                  <option value="BR-KT">Katsina HQ</option>
                  <option value="BR-GB">Gombe Hub</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {editingKey && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingKey(null);
                    setNewAcc({
                      username: "",
                      name: "",
                      email: "",
                      password: "",
                      role: "Branch Operations Officer",
                      department: "Operations",
                      branch: "BR-KT"
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border hover:bg-mist px-4 py-2 text-xs font-semibold text-charcoal transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
              >
                {editingKey ? "Save Changes" : "Create Account"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Security & Backups */}
        <div className="space-y-6">
          {/* Backups Panel */}
          <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
            <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-forest" />
              Backup & Sync
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Export the current localStorage database as a JSON file, or restore data from an existing backup file.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleBackup}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white hover:bg-mist px-4 py-2.5 text-xs font-semibold text-charcoal transition cursor-pointer"
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
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-soft/50 border border-emerald/15 hover:bg-emerald-soft text-forest-deep px-4 py-2.5 text-xs font-bold transition cursor-pointer text-center"
                >
                  <Upload className="h-4 w-4" />
                  Restore Database File
                </label>
              </div>
            </div>
          </div>

          {/* Danger zone / resets */}
          <div className="rounded-3xl border border-red-200/60 bg-red-50/20 p-6 shadow-soft space-y-4">
            <h4 className="font-display font-bold text-base text-red-600 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Reset
            </h4>
            <p className="text-[11px] text-red-500/80 leading-relaxed">
              Clear all customizations, shifts, transactions, and employee rosters to restore default mock seeds.
            </p>
            <button
              onClick={clearAllData}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white px-4 py-2.5 text-xs font-bold transition cursor-pointer border border-red-200"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Cache Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
