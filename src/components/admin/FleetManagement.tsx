import { useState } from "react";
import { ERPStore, Vehicle, Driver } from "./mockData";
import { Search, Plus, Filter, Info, Fuel, ShieldAlert, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function FleetManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(ERPStore.getVehicles());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [conversionFilter, setConversionFilter] = useState("ALL");
  
  // Registration form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVeh, setNewVeh] = useState({
    plateNumber: "",
    type: "Tricycle" as "Tricycle" | "Mini Bus" | "Car" | "Truck",
    fuelType: "CNG" as "Petrol" | "CNG" | "Hybrid",
    conversionStatus: "Converted" as "Converted" | "Petrol Only" | "In-Progress",
    branch: "Katsina HQ"
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Vehicle = {
      id: `VEH-${newVeh.type}-${Date.now().toString().slice(-3)}`,
      plateNumber: newVeh.plateNumber.toUpperCase(),
      type: newVeh.type,
      fuelType: newVeh.fuelType,
      conversionStatus: newVeh.conversionStatus,
      branch: newVeh.branch,
      status: "Available",
      lastServiceDate: new Date().toISOString().split("T")[0]
    };

    const updated = [...vehicles, newEntry];
    setVehicles(updated);
    ERPStore.saveVehicles(updated);
    ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Add Fleet Vehicle", `Registered vehicle ${newVeh.plateNumber} into operations catalog.`);
    
    toast.success("Vehicle Registered", {
      description: `${newVeh.type} (${newVeh.plateNumber}) added to ${newVeh.branch} inventory.`
    });

    setNewVeh({
      plateNumber: "",
      type: "Tricycle",
      fuelType: "CNG",
      conversionStatus: "Converted",
      branch: "Katsina HQ"
    });
    setShowAddForm(false);
  };

  const updateVehicleStatus = (id: string, newStatus: Vehicle["status"]) => {
    const updated = vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v);
    setVehicles(updated);
    ERPStore.saveVehicles(updated);
    ERPStore.addAuditLog("Ops Admin", "Fleet Manager", "Modify Vehicle Status", `Set status of vehicle ID ${id} to ${newStatus}`);
    
    toast.success("Vehicle Status Modified", {
      description: `State changed to ${newStatus}`
    });
  };

  const filtered = vehicles.filter(v => {
    const matchesSearch = v.plateNumber.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const matchesConv = conversionFilter === "ALL" || v.conversionStatus === conversionFilter;
    return matchesSearch && matchesStatus && matchesConv;
  });

  const rawDrivers = ERPStore.getDrivers();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Fleet Logistics Catalog</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Oversee company-owned clean mobility vehicles, monitor conversions, assign drivers and check service schedules.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Onboard Vehicle
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddVehicle} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Register Vehicle Assets</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Plate Number</label>
              <input
                type="text"
                required
                value={newVeh.plateNumber}
                onChange={(e) => setNewVeh(prev => ({ ...prev, plateNumber: e.target.value }))}
                placeholder="e.g. KT-902-A10"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Classification</label>
              <select
                value={newVeh.type}
                onChange={(e) => setNewVeh(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Tricycle">Tricycle (Keke)</option>
                <option value="Mini Bus">Mini Bus</option>
                <option value="Car">Sedan / Hatchback</option>
                <option value="Truck">Heavy Duty Truck</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Fuel Type</label>
              <select
                value={newVeh.fuelType}
                onChange={(e) => setNewVeh(prev => ({ ...prev, fuelType: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="CNG">Compressed Natural Gas (CNG)</option>
                <option value="Petrol">Petrol Only</option>
                <option value="Hybrid">Petrol + CNG Dual Fuel</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">CNG Conversion Progress</label>
              <select
                value={newVeh.conversionStatus}
                onChange={(e) => setNewVeh(prev => ({ ...prev, conversionStatus: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Converted">Converted to CNG</option>
                <option value="Petrol Only">No CNG Kit (Petrol Only)</option>
                <option value="In-Progress">Active Kit Conversion In-Progress</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Operating Hub Branch</label>
              <select
                value={newVeh.branch}
                onChange={(e) => setNewVeh(prev => ({ ...prev, branch: e.target.value }))}
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
              Onboard Asset
            </button>
          </div>
        </form>
      )}

      {/* Roster & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by plate number or ID..."
              className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="Available">Available</option>
              <option value="On Road">On Road</option>
              <option value="In Workshop">In Workshop</option>
            </select>

            <select
              value={conversionFilter}
              onChange={(e) => setConversionFilter(e.target.value)}
              className="rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white"
            >
              <option value="ALL">All Conversions</option>
              <option value="Converted">Converted to CNG</option>
              <option value="Petrol Only">Petrol Only</option>
              <option value="In-Progress">In-Progress</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(v => {
            const driver = rawDrivers.find(d => d.id === v.assignedDriverId);
            return (
              <div key={v.id} className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-foreground">{v.plateNumber}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono font-semibold">{v.id} · {v.branch}</span>
                    </div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      v.status === "Available" ? "bg-emerald-soft text-forest-deep" :
                      v.status === "On Road" ? "bg-blue-100 text-blue-600" :
                      v.status === "In Workshop" ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-500"
                    }`}>
                      {v.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground/75" />
                      <span>Class: <span className="font-semibold text-foreground">{v.type}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground/75" />
                      <span>Fuel System: <span className="font-semibold text-foreground">{v.fuelType} ({v.conversionStatus})</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground/75" />
                      <span>Active Driver: <span className="font-semibold text-foreground">{driver ? driver.name : "Unassigned"}</span></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    Last service: {v.lastServiceDate || "N/A"}
                  </span>
                  
                  <div className="flex gap-1.5">
                    <select
                      value={v.status}
                      onChange={(e) => updateVehicleStatus(v.id, e.target.value as any)}
                      className="rounded-lg border border-border bg-white px-2 py-1 text-[10px] font-bold focus:outline-emerald"
                    >
                      <option value="Available">Set Available</option>
                      <option value="On Road">Set On Road</option>
                      <option value="In Workshop">Set Workshop</option>
                    </select>
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
