import { useState } from "react";
import { ERPStore } from "./mockData";
import { Shield, Database, Save, Upload, Settings2, RefreshCw, Smartphone } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
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
