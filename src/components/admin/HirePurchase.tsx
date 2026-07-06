import { useState, useEffect } from "react";
import { ERPStore, HirePurchaseContract, Driver, Vehicle } from "./mockData";
import { Search, Calculator, Calendar, FileSignature, CheckCircle, AlertTriangle, ArrowUpRight, TrendingUp, UserPlus, Info } from "lucide-react";
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

  const [contracts, setContracts] = useState<HirePurchaseContract[]>(() => ERPStore.getHPContracts());
  const [drivers, setDrivers] = useState<Driver[]>(() => ERPStore.getDrivers());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => ERPStore.getVehicles());
  const [search, setSearch] = useState("");
  
  // Create HP Lease Modal State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newContract, setNewContract] = useState({
    driverId: "",
    vehicleId: "",
    totalAmount: 4750000,
    dailyTarget: 12000,
    startDate: new Date().toISOString().split("T")[0],
    endDateExpected: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  });

  // HP Calculator State
  const [calcData, setCalcData] = useState({
    vehicleValue: 4750000,
    dailyRemittance: 12000,
  });
  const [showCalculator, setShowCalculator] = useState(false);

  // Sync data function
  const syncData = () => {
    setContracts(ERPStore.getHPContracts());
    setDrivers(ERPStore.getDrivers());
    setVehicles(ERPStore.getVehicles());
  };

  // Filter available drivers (must be Active and not have an active HP contract)
  const activeContractsDriverIds = contracts.filter(c => c.status !== "Completed").map(c => c.driverId);
  const availableDrivers = drivers.filter(d => 
    d.status === "Active" && 
    !activeContractsDriverIds.includes(d.id) &&
    (!activeBranchName || d.branch === activeBranchName)
  );

  // Filter available vehicles (must be Available, CNG, and not assigned to an active contract)
  const activeContractsVehicleIds = contracts.filter(c => c.status !== "Completed").map(c => c.vehicleId);
  const availableVehicles = vehicles.filter(v => 
    v.status === "Available" && 
    !activeContractsVehicleIds.includes(v.id) &&
    (!activeBranchName || v.branch === activeBranchName)
  );

  // Filtered list of contracts for the active branch and search query
  const filtered = contracts.filter(c => {
    const driver = drivers.find(d => d.id === c.driverId);
    
    // Branch filter
    const matchesBranch = !activeBranchName || c.branch === activeBranchName;
    
    // Search query filter
    const matchesSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
      (driver && driver.name.toLowerCase().includes(search.toLowerCase())) ||
      c.vehicleId.toLowerCase().includes(search.toLowerCase());

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

  // Handle New Lease Submission
  const handleCreateContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContract.driverId || !newContract.vehicleId) {
      toast.error("Selection Error", { description: "Please select both a driver and a vehicle." });
      return;
    }

    const driver = drivers.find(d => d.id === newContract.driverId);
    const vehicle = vehicles.find(v => v.id === newContract.vehicleId);

    const newHP: HirePurchaseContract = {
      id: `HP-${Date.now().toString().slice(-3)}`,
      driverId: newContract.driverId,
      vehicleId: newContract.vehicleId,
      branch: activeBranchName || driver?.branch || "Katsina HQ",
      totalAmount: Number(newContract.totalAmount),
      balancePaid: 0,
      dailyTarget: Number(newContract.dailyTarget),
      startDate: newContract.startDate,
      endDateExpected: newContract.endDateExpected,
      status: "Active",
      paymentHistory: []
    };

    // Save HP Contract
    const updatedContracts = [newHP, ...contracts];
    setContracts(updatedContracts);
    ERPStore.saveHPContracts(updatedContracts);

    // Dispatch vehicle in inventory/fleet
    const updatedVehicles = vehicles.map(v => 
      v.id === newContract.vehicleId 
        ? { ...v, status: "On Road" as const, assignedDriverId: newContract.driverId } 
        : v
    );
    setVehicles(updatedVehicles);
    ERPStore.saveVehicles(updatedVehicles);

    // Save Audit Trail
    ERPStore.addAuditLog(
      driver?.name || "Operations Desk",
      "Branch Operations Officer",
      "Create HP Lease",
      `Created lease contract ${newHP.id} for driver ${driver?.name} on vehicle ${vehicle?.plateNumber}.`
    );

    toast.success("HP Lease Initiated", {
      description: `Lease contract ${newHP.id} registered. Vehicle ${vehicle?.plateNumber} set to active.`
    });

    setNewContract({
      driverId: "",
      vehicleId: "",
      totalAmount: 4750000,
      dailyTarget: 12000,
      startDate: new Date().toISOString().split("T")[0],
      endDateExpected: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    });
    setShowCreateForm(false);
    syncData();
  };

  const formatNaira = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in text-foreground">
      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Hire Purchase Portfolio</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Log lease-to-own contracts for CNG tricycles, check driver payments, monitor progress percentages and flag defaults.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <FileSignature className="h-4 w-4" />
            New HP Lease
          </button>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
          >
            <Calculator className="h-4 w-4 text-muted-foreground" />
            HP Repayment Calculator
          </button>
        </div>
      </div>

      {/* HP Repayment Calculator Module */}
      {showCalculator && (
        <div className="rounded-3xl border border-emerald/30 bg-emerald-500/5 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald" />
            Hire Purchase Repayment Schedule Calculator
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">CNG Tricycle Total Value (₦)</label>
              <input
                type="number"
                value={calcData.vehicleValue}
                onChange={(e) => setCalcData(prev => ({ ...prev, vehicleValue: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Daily Target Remittance (₦)</label>
              <input
                type="number"
                value={calcData.dailyRemittance}
                onChange={(e) => setCalcData(prev => ({ ...prev, dailyRemittance: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pt-3 text-center">
            <div className="bg-card rounded-2xl border border-border p-4 shadow-xs">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Repayment Days</span>
              <div className="font-display text-xl font-bold text-emerald mt-1">{calculatedDays} Shifts</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 shadow-xs">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Estimated Weeks (6 days/wk)</span>
              <div className="font-display text-xl font-bold text-emerald mt-1">{calculatedWeeks} Weeks</div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 shadow-xs">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">Estimated Months</span>
              <div className="font-display text-xl font-bold text-emerald mt-1">{calculatedMonths} Months</div>
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
          placeholder="Search contracts by driver name, plate, or ID..."
          className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-card"
        />
      </div>

      {/* Contracts Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground bg-card border border-border rounded-3xl shadow-soft">
          <FileSignature className="h-10 w-10 mx-auto text-muted-foreground/45 mb-3" />
          <p className="text-sm font-semibold">No lease contracts registered in this branch.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Initiate a contract to start lease tracker ledger operations.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map(contract => {
            const driver = drivers.find(d => d.id === contract.driverId);
            const vehicle = vehicles.find(v => v.id === contract.vehicleId);
            
            const progressPercent = ((contract.balancePaid / contract.totalAmount) * 100);
            const outstanding = contract.totalAmount - contract.balancePaid;
            
            const isWarning = contract.status === "Missed Remittance" || contract.status === "Defaulted";

            return (
              <div 
                key={contract.id} 
                className={`rounded-3xl border p-6 bg-card shadow-soft relative overflow-hidden transition-all duration-300 hover-lift ${
                  isWarning ? "border-amber-300" : "border-border"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-foreground">Contract: {contract.id}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono font-semibold">
                      Driver: {driver?.name || contract.driverId} ({driver?.id || "N/A"})
                    </span>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    contract.status === "Active" ? "bg-emerald-500/10 text-emerald" :
                    contract.status === "Completed" ? "bg-blue-500/10 text-blue-500" :
                    "bg-red-500/10 text-red-500 animate-pulse"
                  }`}>
                    {contract.status === "Completed" ? <CheckCircle className="h-2.5 w-2.5" /> : <AlertTriangle className="h-2.5 w-2.5" />}
                    {contract.status}
                  </span>
                </div>

                {/* Vehicle & Target info */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Leased Vehicle</span>
                    <span className="font-semibold">{vehicle?.plateNumber || contract.vehicleId} [{vehicle?.type || "Tricycle"}]</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Daily Repayment Target</span>
                    <span className="font-mono font-bold text-emerald">₦{contract.dailyTarget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-[11px] font-semibold text-foreground">
                    <span>Repayment Progress</span>
                    <span>{progressPercent.toFixed(1)}%</span>
                  </div>
                  <div className="bg-muted h-2.5 rounded-full overflow-hidden border border-border/50">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isWarning ? "bg-amber-500" : "bg-emerald"}`} 
                      style={{ width: `${Math.min(progressPercent, 100)}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Paid: ₦{contract.balancePaid.toLocaleString()}</span>
                    <span>Outstanding: ₦{outstanding.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer timeline and options */}
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Completion: <span className="font-semibold text-foreground">{contract.endDateExpected}</span></span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => triggerDefaultAlert(contract.id)}
                      className="rounded-lg border border-border bg-card hover:bg-muted px-2.5 py-1.5 text-[10px] font-bold transition cursor-pointer"
                    >
                      Simulate Default Alert
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: Create HP Lease Contract */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-emerald" />
                Register New HP Lease Agreement
              </h3>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateContractSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Driver Selector */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Select Driver ({activeBranchName || "All Hubs"})
                  </label>
                  <select
                    required
                    value={newContract.driverId}
                    onChange={(e) => setNewContract(prev => ({ ...prev, driverId: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card"
                  >
                    <option value="">-- Choose Driver --</option>
                    {availableDrivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                    ))}
                  </select>
                  {availableDrivers.length === 0 && (
                    <span className="text-[9px] text-red-500 block mt-1">
                      ⚠️ No drivers available without active contracts in this branch.
                    </span>
                  )}
                </div>

                {/* Vehicle Selector */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Select Tricycle ({activeBranchName || "All Hubs"})
                  </label>
                  <select
                    required
                    value={newContract.vehicleId}
                    onChange={(e) => setNewContract(prev => ({ ...prev, vehicleId: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card"
                  >
                    <option value="">-- Choose Vehicle --</option>
                    {availableVehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.id} ({v.plateNumber})</option>
                    ))}
                  </select>
                  {availableVehicles.length === 0 && (
                    <span className="text-[9px] text-red-500 block mt-1">
                      ⚠️ No available vehicles in this branch.
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Total Cost */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Total Lease Target (₦)</label>
                  <input
                    type="number"
                    required
                    value={newContract.totalAmount}
                    onChange={(e) => setNewContract(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                  />
                </div>

                {/* Daily Target */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Daily Remittance Target (₦)</label>
                  <input
                    type="number"
                    required
                    value={newContract.dailyTarget}
                    onChange={(e) => setNewContract(prev => ({ ...prev, dailyTarget: Number(e.target.value) }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Start Date */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Agreement Start Date</label>
                  <input
                    type="date"
                    required
                    value={newContract.startDate}
                    onChange={(e) => setNewContract(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                  />
                </div>

                {/* Expected End Date */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Agreement End Date</label>
                  <input
                    type="date"
                    required
                    value={newContract.endDateExpected}
                    onChange={(e) => setNewContract(prev => ({ ...prev, endDateExpected: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted/30 border border-border p-3 text-xs flex gap-2">
                <Info className="h-4 w-4 shrink-0 text-emerald mt-0.5" />
                <p className="text-muted-foreground text-[10px]">
                  Creating this agreement will set the selected tricycle's status to <strong>"On Road"</strong> and auto-assign the driver in the fleet register. Audit trails will log this transaction.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={availableDrivers.length === 0 || availableVehicles.length === 0}
                  className="flex-1 py-3 rounded-2xl bg-forest hover:bg-forest-deep text-xs font-semibold text-white transition cursor-pointer shadow-glow-soft disabled:opacity-40"
                >
                  Onboard Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
