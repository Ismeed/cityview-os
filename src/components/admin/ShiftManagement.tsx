import { useState, useEffect } from "react";
import { ERPStore, Shift, Driver, Vehicle, HirePurchaseContract } from "./mockData";
import { Plus, Wallet, Calendar, User, FileText, CheckCircle, AlertTriangle, Search, Filter, ArrowRight, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>(() => ERPStore.getShifts());
  const [drivers, setDrivers] = useState<Driver[]>(() => ERPStore.getDrivers());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => ERPStore.getVehicles());
  const [contracts, setContracts] = useState<HirePurchaseContract[]>(() => ERPStore.getHPContracts());

  // Date selection for remittance tracking (defaults to today)
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "PARTIAL" | "UNPAID">("ALL");

  const [remittanceForm, setRemittanceForm] = useState({
    driverId: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    notes: ""
  });

  // Listen for branch changes and sync updates
  useEffect(() => {
    const refreshData = () => {
      setShifts(ERPStore.getShifts());
      setDrivers(ERPStore.getDrivers());
      setVehicles(ERPStore.getVehicles());
      setContracts(ERPStore.getHPContracts());
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);

  // Filter active contracts
  const activeContracts = contracts.filter(
    c => c.status === "Active" || c.status === "Missed Remittance" || c.status === "Defaulted"
  );

  const eligibleDrivers = drivers.filter(d => 
    d.status === "Active" && activeContracts.some(c => c.driverId === d.id)
  );

  // Set default target remittance rate when driver is selected
  const handleDriverChange = (driverId: string) => {
    const contract = activeContracts.find(c => c.driverId === driverId);
    setRemittanceForm(prev => ({
      ...prev,
      driverId,
      amount: contract ? contract.dailyTarget.toString() : ""
    }));
  };

  const triggerLogForContract = (contract: HirePurchaseContract) => {
    setRemittanceForm({
      driverId: contract.driverId,
      amount: contract.dailyTarget.toString(),
      date: selectedDate,
      notes: ""
    });
    setShowLogForm(true);
  };

  const handleLogRemittance = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = Number(remittanceForm.amount);
    if (!remittanceForm.driverId) {
      toast.error("Required Selection", { description: "Please select a driver." });
      return;
    }
    if (!amountVal || amountVal <= 0) {
      toast.error("Invalid Amount", { description: "Please enter a valid payment amount." });
      return;
    }

    const driver = drivers.find(d => d.id === remittanceForm.driverId);
    const contract = activeContracts.find(c => c.driverId === remittanceForm.driverId);
    if (!contract) {
      toast.error("Contract Error", { description: "No active lease contract found for this driver." });
      return;
    }

    // Build the remittance log structured as a Shift for db compatibility
    const expected = contract.dailyTarget;
    const isUnderpaid = amountVal < expected;
    const statusVal = isUnderpaid ? ("Defaulted" as const) : ("Completed" as const);

    const newLog: Shift = {
      id: `REM-${Date.now().toString().slice(-4)}`,
      driverId: remittanceForm.driverId,
      vehicleId: contract.vehicleId, // Link automatically from lease contract
      branch: driver?.branch || "Katsina HQ",
      shiftType: "Morning",
      startTime: "00:00",
      endTime: "00:00",
      startMileage: 0,
      endMileage: 0,
      expectedRemittance: expected,
      actualRemittance: amountVal,
      status: statusVal,
      notes: remittanceForm.notes,
      date: remittanceForm.date
    };

    // Save Remittance Shift Log
    const updatedShifts = [newLog, ...shifts];
    setShifts(updatedShifts);
    ERPStore.saveShifts(updatedShifts);

    // Update Driver's HP Contract progress & history
    const allContracts = ERPStore.getHPContracts();
    const updatedContracts = allContracts.map(c => {
      if (c.id === contract.id) {
        const nextBalance = c.balancePaid + amountVal;
        const complete = nextBalance >= c.totalAmount;
        const nextStatus = complete ? ("Completed" as const) : isUnderpaid ? ("Missed Remittance" as const) : ("Active" as const);
        
        // Remove previous entry for same date if any to avoid duplicates
        const cleanedHistory = (c.paymentHistory || []).filter(p => p.date !== remittanceForm.date);

        return {
          ...c,
          balancePaid: Math.min(nextBalance, c.totalAmount),
          status: nextStatus,
          paymentHistory: [...cleanedHistory, { date: remittanceForm.date, amount: amountVal }]
        };
      }
      return c;
    });
    setContracts(updatedContracts);
    ERPStore.saveHPContracts(updatedContracts);

    // Record Transaction in Ledger
    const transactions = ERPStore.getTransactions();
    const newTransaction = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      type: "Revenue" as const,
      amount: amountVal,
      category: "Hire Purchase" as const,
      description: `Daily Lease Remittance - Driver: ${driver?.name || remittanceForm.driverId} (Contract ID: ${contract.id})`,
      branch: driver?.branch || "Katsina HQ",
      date: remittanceForm.date
    };
    ERPStore.saveTransactions([newTransaction, ...transactions]);

    // System Audit Log
    ERPStore.addAuditLog(
      "Cashier Desk",
      "Cashier",
      "Record Remittance",
      `Received daily lease payment of ₦${amountVal.toLocaleString()} from driver ${driver?.name || remittanceForm.driverId}.`
    );

    toast.success("Remittance Recorded Successfully", {
      description: `Logged ₦${amountVal.toLocaleString()} payment for ${remittanceForm.date}.`
    });

    // Reset Form
    setRemittanceForm({
      driverId: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      notes: ""
    });
    setShowLogForm(false);
  };

  // Process today's compliance for each active contract
  const activeLeaseItems = activeContracts.map(c => {
    const driverObj = drivers.find(d => d.id === c.driverId);
    const vehicleObj = vehicles.find(v => v.id === c.vehicleId);
    
    // Find all payment history logs for selectedDate
    const paymentLogs = c.paymentHistory?.filter(p => p.date === selectedDate) || [];
    const amountPaid = paymentLogs.reduce((sum, p) => sum + p.amount, 0);
    
    const isPaid = amountPaid >= c.dailyTarget;
    const isPartial = amountPaid > 0 && amountPaid < c.dailyTarget;
    const status: "PAID" | "PARTIAL" | "UNPAID" = isPaid ? "PAID" : isPartial ? "PARTIAL" : "UNPAID";

    return {
      contract: c,
      driver: driverObj,
      vehicle: vehicleObj,
      amountPaid,
      status
    };
  }).filter(item => {
    // Search filter
    const nameMatch = item.driver?.name.toLowerCase().includes(search.toLowerCase());
    const idMatch = item.contract.id.toLowerCase().includes(search.toLowerCase());
    const plateMatch = item.contract.vehicleId.toLowerCase().includes(search.toLowerCase());
    const searchMatch = nameMatch || idMatch || plateMatch;

    // Status filter
    const statusMatch = statusFilter === "ALL" || item.status === statusFilter;

    return searchMatch && statusMatch;
  });

  // Filtered lists for the bottom table (shifts)
  const filteredRemittances = shifts.filter(s => {
    const driverObj = drivers.find(d => d.id === s.driverId);
    const searchLower = search.toLowerCase();
    return (
      s.id.toLowerCase().includes(searchLower) ||
      s.driverId.toLowerCase().includes(searchLower) ||
      (driverObj && driverObj.name.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in text-foreground">
      {/* Tab Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Daily Remittance Operations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track and record daily lease remittances for active contracts, view payment logs, and review collection records.
          </p>
        </div>

        {/* Global Date & Search Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-xs font-semibold">
            <Calendar className="h-4 w-4 text-emerald" />
            <span className="text-muted-foreground mr-1">Remittance Date:</span>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-foreground focus:outline-none border-none font-mono cursor-pointer"
            />
          </div>

          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Manual Entry Form
          </button>
        </div>
      </div>

      {/* Log Remittance Form */}
      {showLogForm && (
        <form onSubmit={handleLogRemittance} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Wallet className="h-5 w-5 text-forest" />
            Record Lease Remittance Payment
          </h4>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Select Driver</label>
              <select
                required
                value={remittanceForm.driverId}
                onChange={(e) => handleDriverChange(e.target.value)}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white text-foreground font-medium"
              >
                <option value="">-- Choose Driver --</option>
                {eligibleDrivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Date of Payment</label>
              <input
                type="date"
                required
                value={remittanceForm.date}
                onChange={(e) => setRemittanceForm(prev => ({ ...prev, date: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Amount Received (₦)</label>
              <input
                type="number"
                required
                min={1}
                value={remittanceForm.amount}
                onChange={(e) => setRemittanceForm(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="e.g. 12000"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold text-forest-deep"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Remarks / Notes</label>
            <input
              type="text"
              value={remittanceForm.notes}
              onChange={(e) => setRemittanceForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="e.g. Normal daily return, short remittance due to minor tyre issue, etc."
              className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white text-foreground"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={() => {
                setShowLogForm(false);
                setRemittanceForm({
                  driverId: "",
                  amount: "",
                  date: new Date().toISOString().split("T")[0],
                  notes: ""
                });
              }}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Log Payment
            </button>
          </div>
        </form>
      )}

      {/* Active Leases Remittance Board (The Tracker) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">Active Contracts Daily Compliance Tracker</h3>
            <p className="text-xs text-muted-foreground">List of active hire purchase agreements tracked for date <span className="font-bold text-forest-deep">{selectedDate}</span>.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: "All Leases" },
              { id: "PAID", label: "Paid" },
              { id: "PARTIAL", label: "Partial" },
              { id: "UNPAID", label: "Yet to Remit" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                  statusFilter === f.id
                    ? "bg-forest text-white shadow-soft"
                    : "bg-mist/60 text-muted-foreground hover:bg-mist"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Board table */}
        <div className="overflow-x-auto border border-border/70 rounded-3xl bg-white shadow-soft">
          {activeLeaseItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-xs">
              No active lease contracts found for this branch matching criteria.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-mist/20 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                  <th className="p-4">Driver Profile</th>
                  <th className="p-4">HP Keke Details</th>
                  <th className="p-4">Daily Target</th>
                  <th className="p-4">Received for Date</th>
                  <th className="p-4">Remittance Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {activeLeaseItems.map(item => {
                  const driverName = item.driver?.name || "Unknown Driver";
                  const driverPhone = item.driver?.phone || "—";
                  
                  return (
                    <tr key={item.contract.id} className="hover:bg-mist/5 transition">
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{driverName}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{item.contract.driverId} (Phone: {driverPhone})</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{item.vehicle?.plateNumber || item.contract.vehicleId}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">Contract: {item.contract.id} ({item.vehicle?.model || "Vehicle"})</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-charcoal">
                        ₦{item.contract.dailyTarget.toLocaleString()}
                      </td>
                      <td className="p-4 font-mono font-bold text-forest-deep">
                        ₦{item.amountPaid.toLocaleString()}
                      </td>
                      <td className="p-4">
                        {item.status === "PAID" ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-soft text-forest-deep border border-emerald/20">
                            Paid Full
                          </span>
                        ) : item.status === "PARTIAL" ? (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-600 border border-amber-300/30">
                            Partial Remitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-500 border border-red-300/30">
                            Yet to Remit
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {item.status !== "PAID" ? (
                          <button
                            onClick={() => triggerLogForContract(item.contract)}
                            className="inline-flex items-center gap-1 rounded-xl bg-forest px-3 py-1.5 text-[10px] font-bold text-white hover:bg-forest-deep transition cursor-pointer"
                          >
                            <DollarSign className="h-3 w-3" />
                            Record Remittance
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-bold italic mr-2">Paid & Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* History table list */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Logged Remittances Transactions History</h4>
            <p className="text-[11px] text-muted-foreground">Historical records of daily remittance payment entries registered.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by driver name or ID..."
              className="w-full rounded-full border border-border pl-9 pr-4 py-2 text-xs focus:outline-emerald bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-border/70 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                <th className="p-4">Log ID</th>
                <th className="p-4">Driver Name</th>
                <th className="p-4">HP Keke ID</th>
                <th className="p-4">Branch Hub</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4 text-right">Expected / Paid</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRemittances.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No daily remittance transaction logs found.
                  </td>
                </tr>
              ) : (
                filteredRemittances.map(log => {
                  const driverObj = drivers.find(d => d.id === log.driverId);
                  const isUnderpaid = (log.actualRemittance || 0) < log.expectedRemittance;
                  
                  return (
                    <tr key={log.id} className="hover:bg-mist/10 transition">
                      <td className="p-4 font-mono font-bold text-forest">{log.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{driverObj?.name || log.driverId}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{log.driverId}</div>
                      </td>
                      <td className="p-4 font-mono text-muted-foreground">{log.vehicleId || "—"}</td>
                      <td className="p-4 text-muted-foreground">{log.branch}</td>
                      <td className="p-4 font-medium text-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {log.date}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold">
                        <div className="text-muted-foreground text-[10px]">Target: ₦{log.expectedRemittance.toLocaleString()}</div>
                        <div className="text-forest-deep">Paid: ₦{log.actualRemittance ? log.actualRemittance.toLocaleString() : "0"}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          !isUnderpaid ? "bg-emerald-soft text-forest-deep" : "bg-red-100 text-red-500"
                        }`}>
                          {!isUnderpaid ? "Paid Full" : "Underpaid"}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground italic font-medium max-w-xs truncate" title={log.notes}>
                        {log.notes || "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
