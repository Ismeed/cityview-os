import { useState } from "react";
import { ERPStore, Driver, HirePurchaseContract } from "./mockData";
import { Search, UserPlus, Phone, ShieldCheck, FileSignature, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>(ERPStore.getDrivers());
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    license: "",
    guarantorName: "",
    guarantorPhone: "",
    branch: "Katsina HQ",
    remittanceRate: 12000
  });

  const handleRegisterDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Driver = {
      id: `DRV-${Date.now().toString().slice(-3)}`,
      name: newDriver.name,
      phone: newDriver.phone,
      license: newDriver.license,
      guarantorName: newDriver.guarantorName,
      guarantorPhone: newDriver.guarantorPhone,
      branch: newDriver.branch,
      status: "Pending Approval",
      remittanceRate: Number(newDriver.remittanceRate)
    };

    const updated = [...drivers, newEntry];
    setDrivers(updated);
    ERPStore.saveDrivers(updated);
    ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Register Driver", `Registered driver candidate ${newDriver.name} with guarantor details.`);
    
    toast.success("Driver Candidate Registered", {
      description: `${newDriver.name} has been added for guarantor check & approval.`
    });

    setNewDriver({
      name: "",
      phone: "",
      license: "",
      guarantorName: "",
      guarantorPhone: "",
      branch: "Katsina HQ",
      remittanceRate: 12000
    });
    setShowAddForm(false);
  };

  const approveDriverStatus = (id: string, newStatus: "Active" | "Suspended") => {
    const updated = drivers.map(d => d.id === id ? { ...d, status: newStatus } : d);
    setDrivers(updated);
    ERPStore.saveDrivers(updated);
    ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Update Driver Status", `Set status of driver ID ${id} to ${newStatus}`);
    
    toast.success("Driver status updated", {
      description: `Active operations status modified to ${newStatus}`
    });
  };

  const filtered = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.id.toLowerCase().includes(search.toLowerCase()) || 
    d.phone.includes(search)
  );

  const rawContracts = ERPStore.getHPContracts();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Driver Operations Directory</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track registered tricycle drivers, check guarantor credit checks, review active licenses and approval statuses.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Register Driver
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleRegisterDriver} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Register Driver & Guarantor Details</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Driver Name</label>
              <input
                type="text"
                required
                value={newDriver.name}
                onChange={(e) => setNewDriver(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Muhammadu Haruna"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={newDriver.phone}
                onChange={(e) => setNewDriver(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="0803XXXXXXX"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Driver's License ID</label>
              <input
                type="text"
                required
                value={newDriver.license}
                onChange={(e) => setNewDriver(prev => ({ ...prev, license: e.target.value }))}
                placeholder="e.g. NGA-KT-XXXXX"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Guarantor Full Name</label>
              <input
                type="text"
                required
                value={newDriver.guarantorName}
                onChange={(e) => setNewDriver(prev => ({ ...prev, guarantorName: e.target.value }))}
                placeholder="Alhaji Bello Katsina"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Guarantor Phone Number</label>
              <input
                type="text"
                required
                value={newDriver.guarantorPhone}
                onChange={(e) => setNewDriver(prev => ({ ...prev, guarantorPhone: e.target.value }))}
                placeholder="0803XXXXXXX"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Operation Branch Hub</label>
              <select
                value={newDriver.branch}
                onChange={(e) => setNewDriver(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Katsina HQ">Katsina HQ</option>
                <option value="Gombe Hub">Gombe Hub</option>
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
              Register Candidate
            </button>
          </div>
        </form>
      )}

      {/* Roster Layout */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drivers by name or phone..."
            className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
          />
        </div>

        {/* Drivers Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(d => {
            const hasContract = rawContracts.find(c => c.driverId === d.id);
            return (
              <div key={d.id} className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-foreground">{d.name}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono font-semibold">{d.id} · {d.branch}</span>
                    </div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      d.status === "Active" ? "bg-emerald-soft text-forest-deep" :
                      d.status === "Suspended" ? "bg-red-100 text-red-500" :
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground/75" />
                      <span>{d.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground/75" />
                      <span>License: <span className="font-semibold text-foreground">{d.license}</span></span>
                    </div>
                    <div className="rounded-xl bg-mist/40 p-3 border border-border/50 mt-3">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Guarantor Profile</div>
                      <div className="font-semibold text-foreground mt-0.5">{d.guarantorName}</div>
                      <div className="text-[10px] mt-0.5">{d.guarantorPhone}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileSignature className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[11px] font-semibold text-charcoal">
                      {hasContract ? `Contract: ${hasContract.id}` : "No Active Contract"}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    {d.status === "Pending Approval" ? (
                      <button
                        onClick={() => approveDriverStatus(d.id, "Active")}
                        className="rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer"
                      >
                        Approve Candidate
                      </button>
                    ) : d.status === "Active" ? (
                      <button
                        onClick={() => approveDriverStatus(d.id, "Suspended")}
                        className="rounded-lg bg-red-100 text-red-500 px-3 py-1.5 text-[10px] font-bold hover:bg-red-500 hover:text-white transition cursor-pointer"
                      >
                        Suspend Driver
                      </button>
                    ) : (
                      <button
                        onClick={() => approveDriverStatus(d.id, "Active")}
                        className="rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer"
                      >
                        Re-activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
