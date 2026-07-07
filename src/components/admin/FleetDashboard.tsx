import { useState } from "react";
import { ERPStore, Vehicle, Driver, Shift, HirePurchaseContract } from "./mockData";
import { 
  TrendingUp, 
  Truck, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  AlertCircle, 
  Wrench, 
  Play, 
  Square, 
  UserPlus, 
  PlusCircle,
  FileSignature
} from "lucide-react";
import { toast } from "sonner";

interface FleetDashboardProps {
  branchName: string;
}

export function FleetDashboard({ branchName }: FleetDashboardProps) {
  const [vehicles] = useState<Vehicle[]>(ERPStore.getVehicles());
  const [drivers] = useState<Driver[]>(ERPStore.getDrivers());
  const [shifts] = useState<Shift[]>(ERPStore.getShifts());
  const [contracts] = useState<HirePurchaseContract[]>(ERPStore.getHPContracts());
  const [transactions] = useState(() => ERPStore.getTransactions());

  // Metrics calculations
  const activeVehicles = vehicles.filter(v => v.status === "Available" || v.status === "On Road").length;
  const vehiclesOut = vehicles.filter(v => v.status === "On Road").length;
  const driversOnShift = shifts.filter(s => s.status === "In Progress").length;
  const vehiclesReturned = shifts.filter(s => s.status === "Completed").length;

  const dailyRemittance = transactions
    .filter(t => t.type === "Revenue" && (t.category === "Fleet Remittance" || t.category === "Hire Purchase"))
    .reduce((sum, t) => sum + t.amount, 0);

  const outstandingContracts = contracts.filter(c => c.status === "Active" || c.status === "Missed Remittance").length;
  
  const contractsNearCompletion = contracts.filter(c => {
    if (c.status === "Completed") return false;
    const progress = c.balancePaid / c.totalAmount;
    return progress >= 0.80; // 80% or more paid off
  }).length;

  const underMaintenance = vehicles.filter(v => v.status === "In Workshop").length;

  const formatNaira = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleQuickAction = (action: string) => {
    toast.info(`Quick Action: ${action}`, {
      description: `This action will navigate you to the corresponding sub-section.`
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h2 className="font-display text-3xl font-bold text-foreground">{branchName} Fleet Command</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Hire Purchase & Fleet Management dashboard for branch operations.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Vehicles */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Vehicles</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-soft flex items-center justify-center text-forest-deep">
              <Truck className="h-5 w-5 text-forest" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{activeVehicles} / {vehicles.length}</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{vehiclesOut} currently dispatched on-road</p>
          </div>
        </div>

        {/* Drivers on Shift */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Shifts</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{driversOnShift} Drivers</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{vehiclesReturned} shifts completed today</p>
          </div>
        </div>

        {/* Daily Remittance */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Remittance Today</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(dailyRemittance)}</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>Target met from active contracts</span>
            </div>
          </div>
        </div>

        {/* Outstanding HP Contracts */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">HP Contracts</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileSignature className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{outstandingContracts} Active</h3>
            <p className="text-[10px] text-amber-600 font-semibold mt-1">
              {contractsNearCompletion} contracts near completion (&gt;80% paid)
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Highlights & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions Panel */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Operational Actions</h4>
            <p className="text-[11px] text-muted-foreground">Launch core operational logs and registration widgets.</p>
          </div>
          
          <div className="grid gap-2">
            <button
              onClick={() => handleQuickAction("Start Shift")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <Play className="h-4 w-4 text-emerald group-hover:text-white shrink-0" />
              <span>Start Daily Shift</span>
            </button>
            <button
              onClick={() => handleQuickAction("End Shift")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <Square className="h-4 w-4 text-red-500 group-hover:text-white shrink-0" />
              <span>Close Shift & Remit</span>
            </button>
            <button
              onClick={() => handleQuickAction("Onboard Driver")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <UserPlus className="h-4 w-4 text-blue-500 group-hover:text-white shrink-0" />
              <span>Register New Driver</span>
            </button>
            <button
              onClick={() => handleQuickAction("Onboard Vehicle")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <PlusCircle className="h-4 w-4 text-indigo-500 group-hover:text-white shrink-0" />
              <span>Register New Vehicle</span>
            </button>
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <div>
              <h4 className="font-display font-bold text-base text-foreground">Maintenance Status</h4>
              <p className="text-[11px] text-muted-foreground">Vehicles currently scheduled or undergoing repairs.</p>
            </div>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
              {underMaintenance} In Shop
            </span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {underMaintenance === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                <Wrench className="h-8 w-8 text-emerald mx-auto opacity-50 mb-2" />
                All fleet vehicles are active.
              </div>
            ) : (
              vehicles.filter(v => v.status === "In Workshop").map(v => (
                <div key={v.id} className="flex justify-between items-center border-b border-border/30 pb-2.5 last:border-0">
                  <div className="text-xs">
                    <div className="font-semibold text-foreground">{v.plateNumber}</div>
                    <div className="text-[10px] text-muted-foreground">{v.type} ({v.id})</div>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                    <AlertCircle className="h-3 w-3" /> In Workshop
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Fleet Activities */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Recent Shift Activity</h4>
            <p className="text-[11px] text-muted-foreground">Last shifts logged for {branchName}.</p>
          </div>

          <div className="space-y-3.5">
            {shifts.slice(0, 3).map(s => {
              const driver = drivers.find(d => d.id === s.driverId);
              return (
                <div key={s.id} className="text-xs border-b border-border/50 pb-2.5 last:border-0">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{s.date} at {s.startTime}</span>
                    <span className={`font-semibold uppercase ${s.status === "Completed" ? "text-emerald" : "text-blue-500"}`}>{s.status}</span>
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    Driver: {driver?.name || s.driverId} &rarr; Vehicle: {s.vehicleId}
                  </div>
                  {s.actualRemittance && (
                    <div className="mt-0.5 text-muted-foreground text-[10px]">
                      Remitted: <span className="font-bold text-forest-deep">{formatNaira(s.actualRemittance)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
