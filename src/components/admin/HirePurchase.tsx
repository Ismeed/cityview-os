import { useState, useEffect } from "react";
import { ERPStore, HirePurchaseContract, Driver, Vehicle } from "./mockData";
import { Search, Calculator, Calendar, FileSignature, CheckCircle, AlertTriangle, History, Clock, X, Printer, Download } from "lucide-react";
import { toast } from "sonner";

export function HirePurchase() {
  const [contracts, setContracts] = useState<HirePurchaseContract[]>(() => ERPStore.getHPContracts());
  const [search, setSearch] = useState("");

  // Keep list updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setContracts(ERPStore.getHPContracts());
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);
  
  // HP Calculator State
  const [calcData, setCalcData] = useState({
    vehicleValue: 4750000,
    dailyRemittance: 12000,
  });
  const [showCalculator, setShowCalculator] = useState(false);

  // Create Contract modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newContractForm, setNewContractForm] = useState({
    driverId: "",
    vehicleId: "",
    totalAmount: 4750000,
    dailyTarget: 12000,
    startDate: new Date().toISOString().split("T")[0]
  });

  // Remittance Board Collapse State
  const [expandedCalendar, setExpandedCalendar] = useState<string | null>(null);
  const [showAllDates, setShowAllDates] = useState<Record<string, boolean>>({});

  // Helper to calculate expected end date excluding Sundays
  const calculateExpectedEndDate = (startDateStr: string, totalAmount: number, dailyTarget: number) => {
    const daysRequired = Math.ceil(totalAmount / dailyTarget);
    const date = new Date(startDateStr);
    let count = 0;
    while (count < daysRequired) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0) { // Skip Sundays
        count++;
      }
    }
    return date.toISOString().split("T")[0];
  };

  const handleCreateContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContractForm.driverId) {
      toast.error("Required Field", { description: "Please select a driver." });
      return;
    }
    if (!newContractForm.vehicleId) {
      toast.error("Required Field", { description: "Please select a leased vehicle." });
      return;
    }
    const daysRequired = Math.ceil(newContractForm.totalAmount / newContractForm.dailyTarget);
    if (!daysRequired || daysRequired <= 0) {
      toast.error("Invalid Math", { description: "Total target value must be divisible by daily target." });
      return;
    }

    const expectedEnd = calculateExpectedEndDate(newContractForm.startDate, newContractForm.totalAmount, newContractForm.dailyTarget);

    const newContract: HirePurchaseContract = {
      id: `HP-${Date.now().toString().slice(-4)}`,
      driverId: newContractForm.driverId,
      vehicleId: newContractForm.vehicleId,
      totalAmount: newContractForm.totalAmount,
      balancePaid: 0,
      dailyTarget: newContractForm.dailyTarget,
      startDate: newContractForm.startDate,
      endDateExpected: expectedEnd,
      status: "Active",
      paymentHistory: []
    };

    const updatedContracts = [newContract, ...contracts];
    setContracts(updatedContracts);
    ERPStore.saveHPContracts(updatedContracts);

    // Also update vehicle's assigned driver and status to "On Road"
    const allVehicles = ERPStore.getVehicles();
    const updatedVehicles = allVehicles.map(v => {
      if (v.id === newContractForm.vehicleId) {
        return {
          ...v,
          assignedDriverId: newContractForm.driverId,
          status: "On Road" as const
        };
      }
      return v;
    });
    ERPStore.saveVehicles(updatedVehicles);

    // Also update driver's status to "Active"
    const allDrivers = ERPStore.getDrivers();
    const updatedDrivers = allDrivers.map(d => {
      if (d.id === newContractForm.driverId) {
        return { ...d, status: "Active" as const };
      }
      return d;
    });
    ERPStore.saveDrivers(updatedDrivers);

    // Record system audit log
    const driver = ERPStore.getDrivers().find(d => d.id === newContractForm.driverId);
    const vehicle = allVehicles.find(v => v.id === newContractForm.vehicleId);
    ERPStore.addAuditLog(
      "Super Admin",
      "Executive",
      "Create Hire Purchase Lease",
      `Activated new lease contract ${newContract.id} for driver ${driver?.name || newContractForm.driverId} leasing Keke ${vehicle?.plateNumber || newContractForm.vehicleId}.`
    );

    toast.success("Contract Successfully Activated", {
      description: `Lease contract ${newContract.id} is now active and tracked.`
    });

    setShowCreateModal(false);
    setNewContractForm({
      driverId: "",
      vehicleId: "",
      totalAmount: 4750000,
      dailyTarget: 12000,
      startDate: new Date().toISOString().split("T")[0]
    });
  };

  // Filtered list
  const filtered = contracts.filter(c => {
    const driver = ERPStore.getDrivers().find(d => d.id === c.driverId);
    return (
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      (driver && driver.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Calculator logic
  const calculatedDays = Math.ceil(calcData.vehicleValue / calcData.dailyRemittance);
  const calculatedWeeks = (calculatedDays / 6).toFixed(1); // Exclude Sundays (standard Nigeria keke cycle)
  const calculatedMonths = (calculatedDays / 26).toFixed(1);

  // Helper to generate list of dates since start date up to today (excluding Sundays)
  const getContractDaysSinceStart = (startDateStr: string) => {
    const dates: string[] = [];
    const start = new Date(startDateStr);
    const end = new Date();
    
    // Safety check for invalid dates
    if (isNaN(start.getTime())) return [];
    
    const curr = new Date(start);
    while (curr <= end) {
      const dayOfWeek = curr.getDay(); // 0 is Sunday
      if (dayOfWeek !== 0) {
        dates.push(curr.toISOString().split("T")[0]);
      }
      curr.setDate(curr.getDate() + 1);
    }
    return dates.reverse(); // Show newest dates first
  };

  // Helper to get total payments for a single day
  const getDayPayments = (contract: HirePurchaseContract, dateStr: string) => {
    return contract.paymentHistory
      .filter(p => p.date === dateStr)
      .reduce((sum, p) => sum + p.amount, 0);
  };

  // Recalculate contract status dynamically based on balance and active days payments
  const recalculateStatus = (
    c: HirePurchaseContract, 
    newBalance: number, 
    newHistory: { date: string; amount: number }[]
  ) => {
    if (newBalance >= c.totalAmount) {
      return "Completed" as const;
    }
    
    // Check if there are any missed days since start date (excluding today)
    const days = getContractDaysSinceStart(c.startDate);
    const todayStr = new Date().toISOString().split("T")[0];
    
    let hasMissed = false;
    for (const date of days) {
      if (date === todayStr) continue; // Skip today
      
      const paid = newHistory
        .filter(p => p.date === date)
        .reduce((sum, p) => sum + p.amount, 0);
        
      if (paid < c.dailyTarget) {
        hasMissed = true;
        break;
      }
    }
    
    return hasMissed ? ("Missed Remittance" as const) : ("Active" as const);
  };

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
        <div className="flex gap-2">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition cursor-pointer"
          >
            <Calculator className="h-4 w-4 text-muted-foreground" />
            HP Repayment Calculator
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
          >
            <FileSignature className="h-4 w-4" />
            Create Lease Contract
          </button>
        </div>
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
              <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completion: <span className="font-semibold text-foreground">{contract.endDateExpected}</span></span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerDefaultAlert(contract.id)}
                    className="rounded-lg border border-border bg-white hover:bg-mist px-2.5 py-1.5 text-[10px] font-bold text-charcoal transition cursor-pointer"
                  >
                    Flag Alert
                  </button>
                  <button 
                    onClick={() => setExpandedCalendar(expandedCalendar === contract.id ? null : contract.id)}
                    className="rounded-lg border border-forest bg-forest-deep px-3 py-1.5 text-[10px] font-bold text-white hover:bg-forest transition cursor-pointer flex items-center gap-1"
                  >
                    <History className="h-3.5 w-3.5" />
                    {expandedCalendar === contract.id ? "Hide Board" : "Remittance Board"}
                  </button>
                </div>
              </div>

              {/* Collapsible Daily Remittance Board */}
              {expandedCalendar === contract.id && (
                <div className="mt-6 pt-6 border-t border-border/85 space-y-4 animate-fade-down">
                  <div className="flex items-center justify-between">
                    <h5 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal flex items-center gap-1">
                      <Clock className="h-4 w-4 text-forest" />
                      Remittance Ledger Board
                    </h5>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      Started: {contract.startDate}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {(() => {
                      const allDays = getContractDaysSinceStart(contract.startDate);
                      const displayedDays = showAllDates[contract.id] ? allDays : allDays.slice(0, 10);
                      
                      if (allDays.length === 0) {
                        return <div className="text-xs text-muted-foreground text-center py-4">No active payment calendar periods.</div>;
                      }

                      return (
                        <>
                          {displayedDays.map(dateStr => {
                            const paid = getDayPayments(contract, dateStr);
                            const isPaid = paid >= contract.dailyTarget;
                            const isUnderpaid = paid > 0 && paid < contract.dailyTarget;
                            const isMissed = paid === 0;

                            return (
                              <div key={dateStr} className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-xs bg-mist/10">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="font-mono font-bold text-foreground">{dateStr}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className={`inline-block rounded-full px-2 py-0.5 font-bold uppercase text-[9px] ${
                                    isPaid ? "bg-emerald-soft text-forest-deep" :
                                    isUnderpaid ? "bg-amber-100 text-amber-600" :
                                    "bg-red-100 text-red-500"
                                  }`}>
                                    {isPaid ? `Paid ₦${paid.toLocaleString()}` :
                                     isUnderpaid ? `Underpaid ₦${paid.toLocaleString()}` :
                                     "Missed / Skipped"}
                                  </span>

                                  {!isPaid && (
                                    <span className="text-[10px] font-bold text-muted-foreground/60 italic">
                                      Not Remitted
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {allDays.length > 10 && (
                            <button
                              onClick={() => setShowAllDates(prev => ({ ...prev, [contract.id]: !prev[contract.id] }))}
                              className="w-full py-2 text-center text-[10px] font-bold text-forest hover:underline transition cursor-pointer"
                            >
                              {showAllDates[contract.id] 
                                ? "Show Less" 
                                : `Show complete history (${allDays.length} days)`}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Lease Contract Modal */}
      {showCreateModal && (() => {
        const activeContracts = contracts.filter(c => c.status === "Active" || c.status === "Missed Remittance" || c.status === "Defaulted");
        const assignedDriverIds = new Set(activeContracts.map(c => c.driverId));
        const assignedVehicleIds = new Set(activeContracts.map(c => c.vehicleId));
        const availableDrivers = ERPStore.getDrivers().filter(d => !assignedDriverIds.has(d.id) && (d.status === "Active" || d.status === "Pending Approval"));
        const availableVehicles = ERPStore.getVehicles().filter(v => !assignedVehicleIds.has(v.id) && v.status !== "Decommissioned");

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl border border-border shadow-elevated w-full max-w-md overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between border-b border-border p-5 bg-mist/20">
                <h3 className="font-display font-bold text-base text-foreground">Create Lease Contract</h3>
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  className="p-1 rounded-lg hover:bg-mist transition text-muted-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleCreateContractSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Select Driver (Active &amp; Unassigned)
                  </label>
                  <select
                    required
                    value={newContractForm.driverId}
                    onChange={(e) => setNewContractForm(prev => ({ ...prev, driverId: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-medium text-foreground"
                  >
                    <option value="">-- Choose Driver --</option>
                    {availableDrivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Select Vehicle (Available &amp; Unassigned)
                  </label>
                  <select
                    required
                    value={newContractForm.vehicleId}
                    onChange={(e) => setNewContractForm(prev => ({ ...prev, vehicleId: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-medium text-foreground"
                  >
                    <option value="">-- Choose Keke/Vehicle --</option>
                    {availableVehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.plateNumber} ({v.type} - {v.branch})</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Total Target (₦)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newContractForm.totalAmount}
                      onChange={(e) => setNewContractForm(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Daily Remittance (₦)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newContractForm.dailyTarget}
                      onChange={(e) => setNewContractForm(prev => ({ ...prev, dailyTarget: Number(e.target.value) }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Lease Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newContractForm.startDate}
                    onChange={(e) => setNewContractForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
                  />
                </div>

                <div className="bg-emerald-soft/10 border border-emerald/20 rounded-2xl p-4 text-[11px] text-forest-deep space-y-1">
                  <div className="font-semibold">ℹ️ Smart Calculation details:</div>
                  <div>Total Payments Cycles: <span className="font-bold">{Math.ceil(newContractForm.totalAmount / newContractForm.dailyTarget) || 0} Daily Shifts</span></div>
                  <div>Calculated End Date (excluding Sundays): <span className="font-bold">{calculateExpectedEndDate(newContractForm.startDate, newContractForm.totalAmount, newContractForm.dailyTarget)}</span></div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-mist transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
                  >
                    Activate Lease
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
