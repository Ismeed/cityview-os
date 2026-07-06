import { useState } from "react";
import { ERPStore, HirePurchaseContract, Driver, Vehicle } from "./mockData";
import { Search, Calculator, Calendar, FileSignature, CheckCircle, AlertTriangle, ArrowUpRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface HirePurchaseProps {
  selectedBranch?: string;
}

export function HirePurchase({ selectedBranch = "ALL" }: HirePurchaseProps) {
  const branchMap: Record<string, string> = {
    "BR-KT": "Katsina HQ",
    "BR-GB": "Gombe Hub"
  };
  const activeBranchName = branchMap[selectedBranch];

  const [contracts, setContracts] = useState<HirePurchaseContract[]>(ERPStore.getHPContracts());
  const [search, setSearch] = useState("");
  
  // HP Calculator State
  const [calcData, setCalcData] = useState({
    vehicleValue: 4750000,
    dailyRemittance: 12000,
  });
  const [showCalculator, setShowCalculator] = useState(false);

  // Filtered list
  const filtered = contracts.filter(c => {
    const driver = ERPStore.getDrivers().find(d => d.id === c.driverId);
    const matchesSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
      (driver && driver.name.toLowerCase().includes(search.toLowerCase()));
    const matchesBranch = !activeBranchName || c.branch === activeBranchName;
    return matchesSearch && matchesBranch;
  });

  // Calculator logic
  const calculatedDays = Math.ceil(calcData.vehicleValue / calcData.dailyRemittance);
  const calculatedWeeks = (calculatedDays / 6).toFixed(1); // Exclude Sundays (standard Nigeria keke cycle)
  const calculatedMonths = (calculatedDays / 26).toFixed(1);

  const triggerDefaultAlert = (id: string) => {
    const updated = contracts.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === "Missed Remittance" ? ("Defaulted" as const) : ("Missed Remittance" as const);
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setContracts(updated);
    ERPStore.saveHPContracts(updated);
    toast.warning("Contract Status Flagged", {
      description: `Contract ID ${id} alert status changed.`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Hire Purchase Portfolio</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Log lease-to-own contracts for CNG tricycles, check driver payments, monitor progress percentages and flag defaults.
          </p>
        </div>
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition cursor-pointer"
        >
          <Calculator className="h-4 w-4 text-muted-foreground" />
          HP Repayment Calculator
        </button>
      </div>

      {/* HP Repayment Calculator Module */}
      {showCalculator && (
        <div className="rounded-3xl border border-emerald/30 bg-emerald-soft/10 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5 text-forest" />
            Hire Purchase Repayment Schedule Calculator
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">CNG Tricycle Total Value (₦)</label>
              <input
                type="number"
                value={calcData.vehicleValue}
                onChange={(e) => setCalcData(prev => ({ ...prev, vehicleValue: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Daily Target Remittance (₦)</label>
              <input
                type="number"
                value={calcData.dailyRemittance}
                onChange={(e) => setCalcData(prev => ({ ...prev, dailyRemittance: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-3 text-center">
            <div className="bg-white rounded-2xl border border-border p-4">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Repayment Days</span>
              <div className="font-display text-xl font-bold text-forest-deep mt-1">{calculatedDays} Shifts</div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-4">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Estimated Weeks (6 days/wk)</span>
              <div className="font-display text-xl font-bold text-forest-deep mt-1">{calculatedWeeks} Weeks</div>
            </div>
            <div className="bg-white rounded-2xl border border-border p-4">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Estimated Months</span>
              <div className="font-display text-xl font-bold text-forest-deep mt-1">{calculatedMonths} Months</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Filter */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contracts by driver or ID..."
          className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
        />
      </div>

      {/* Contracts Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map(contract => {
          const driver = ERPStore.getDrivers().find(d => d.id === contract.driverId);
          const vehicle = ERPStore.getVehicles().find(v => v.id === contract.vehicleId);
          
          const progressPercent = ((contract.balancePaid / contract.totalAmount) * 100);
          const outstanding = contract.totalAmount - contract.balancePaid;
          
          const isWarning = contract.status === "Missed Remittance" || contract.status === "Defaulted";

          return (
            <div 
              key={contract.id} 
              className={`rounded-3xl border p-6 bg-white shadow-soft relative overflow-hidden transition-all duration-300 hover-lift ${
                isWarning ? "border-amber-300" : "border-border"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                <div>
                  <h4 className="font-display font-bold text-base text-foreground">Contract: {contract.id}</h4>
                  <span className="text-[10px] text-muted-foreground font-mono font-semibold">
                    Driver: {driver?.name || contract.driverId} ({driver?.id})
                  </span>
                </div>
                
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  contract.status === "Active" ? "bg-emerald-soft text-forest-deep" :
                  contract.status === "Completed" ? "bg-blue-100 text-blue-600" :
                  "bg-red-100 text-red-500 animate-pulse"
                }`}>
                  {contract.status === "Completed" ? <CheckCircle className="h-2.5 w-2.5" /> : <AlertTriangle className="h-2.5 w-2.5" />}
                  {contract.status}
                </span>
              </div>

              {/* Vehicle & Target info */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Leased Vehicle</span>
                  <span className="font-semibold text-foreground">{vehicle?.plateNumber || contract.vehicleId} [{vehicle?.type || "Keke"}]</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Daily Repayment Target</span>
                  <span className="font-mono font-bold text-forest-deep">₦{contract.dailyTarget.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[11px] font-semibold text-charcoal">
                  <span>Repayment Progress</span>
                  <span>{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="bg-mist/70 h-2.5 rounded-full overflow-hidden border border-border/50">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isWarning ? "bg-amber-500" : "bg-forest"}`} 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Paid: ₦{contract.balancePaid.toLocaleString()}</span>
                  <span>Outstanding: ₦{outstanding.toLocaleString()}</span>
                </div>
              </div>

              {/* Footer timeline and options */}
              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completion: <span className="font-semibold text-foreground">{contract.endDateExpected}</span></span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerDefaultAlert(contract.id)}
                    className="rounded-lg border border-border bg-white hover:bg-mist px-2.5 py-1.5 text-[10px] font-bold text-charcoal transition cursor-pointer"
                  >
                    Simulate Default Alert
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
