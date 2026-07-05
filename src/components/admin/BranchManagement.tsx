import { useState } from "react";
import { ERPStore, Branch } from "./mockData";
import { Plus, MapPin, Building2, User, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>(ERPStore.getBranches());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: "", location: "", manager: "", status: "Upcoming" as "Active" | "Upcoming" });

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Branch = {
      id: `BR-${newBranch.name.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-3)}`,
      name: newBranch.name,
      location: newBranch.location,
      manager: newBranch.manager || "TBD",
      status: newBranch.status
    };

    const updated = [...branches, newEntry];
    setBranches(updated);
    ERPStore.saveBranches(updated);
    ERPStore.addAuditLog("Admin", "Super Administrator", "Create Branch", `Created new branch "${newBranch.name}" in ${newBranch.location}`);
    
    toast.success("Branch Added Successfully", {
      description: `${newBranch.name} is now registered in the network.`
    });

    setNewBranch({ name: "", location: "", manager: "", status: "Upcoming" });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Branch Management</h2>
          <p className="text-sm text-muted-foreground mt-1 font-sans">
            Add hubs, assign managers, and monitor regional performance indicators as CityView expands.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Initialize Hub
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddBranch} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-2xl">
          <h4 className="font-display font-bold text-base text-foreground">Initialize New Operating Branch</h4>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Branch Name</label>
              <input
                type="text"
                required
                value={newBranch.name}
                onChange={(e) => setNewBranch(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Kano Hub"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Geographic Location</label>
              <input
                type="text"
                required
                value={newBranch.location}
                onChange={(e) => setNewBranch(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Kano State, Nigeria"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Branch Manager Name</label>
              <input
                type="text"
                value={newBranch.manager}
                onChange={(e) => setNewBranch(prev => ({ ...prev, manager: e.target.value }))}
                placeholder="e.g. Yusuf Mohammed"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Launch Status</label>
              <select
                value={newBranch.status}
                onChange={(e) => setNewBranch(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Upcoming">Upcoming / Planning</option>
                <option value="Active">Active Operations</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Confirm Setup
            </button>
          </div>
        </form>
      )}

      {/* Branches Cards Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => {
          const isActive = b.status === "Active";
          return (
            <div 
              key={b.id} 
              className={`rounded-3xl border p-6 bg-white shadow-soft relative overflow-hidden transition-all duration-300 hover-lift ${
                isActive ? "border-emerald/30" : "border-border opacity-75"
              }`}
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isActive ? "bg-emerald-soft text-forest-deep" : "bg-mist text-muted-foreground"}`}>
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-foreground">{b.name}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono font-semibold">{b.id}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  isActive ? "bg-emerald-soft text-forest-deep" : "bg-amber-100 text-amber-600"
                }`}>
                  {isActive ? <CheckCircle className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
                  {b.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground/75" />
                  <span>{b.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground/75" />
                  <span>Manager: <span className="font-semibold text-foreground">{b.manager}</span></span>
                </div>
              </div>

              {isActive && (
                <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-mist/35 rounded-xl p-2.5">
                    <span className="text-[9px] font-semibold text-muted-foreground uppercase">Staff count</span>
                    <div className="font-display text-sm font-bold text-forest-deep">
                      {ERPStore.getEmployees().filter(e => e.branch === b.name).length} Employees
                    </div>
                  </div>
                  <div className="bg-mist/35 rounded-xl p-2.5">
                    <span className="text-[9px] font-semibold text-muted-foreground uppercase">Fleet size</span>
                    <div className="font-display text-sm font-bold text-forest-deep">
                      {ERPStore.getVehicles().filter(v => v.branch === b.name).length} Vehicles
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
