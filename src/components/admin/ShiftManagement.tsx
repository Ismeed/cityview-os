import { useState, useEffect } from "react";
import { ERPStore, Shift, Driver } from "./mockData";
import { Plus, Wallet, Calendar, User, FileText, CheckCircle, AlertTriangle, Search } from "lucide-react";
import { toast } from "sonner";

export function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>(() => ERPStore.getShifts());
  const [drivers, setDrivers] = useState<Driver[]>(() => ERPStore.getDrivers());
  const [search, setSearch] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);
  const [remittanceForm, setRemittanceForm] = useState({
    driverId: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    notes: ""
  });

  // Listen for branch changes
  useEffect(() => {
    const refreshData = () => {
      setShifts(ERPStore.getShifts());
      setDrivers(ERPStore.getDrivers());
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);

  // Filter drivers list to only active drivers with active contracts
  const activeContracts = ERPStore.getHPContracts().filter(
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
        
        return {
          ...c,
          balancePaid: Math.min(nextBalance, c.totalAmount),
          status: nextStatus,
          paymentHistory: [...c.paymentHistory, { date: remittanceForm.date, amount: amountVal }]
        };
      }
      return c;
    });
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

  // Filtered lists
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
    <div className="space-y-6 animate-fade-in text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Daily Remittance Tracker</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Log daily lease remittance payments from drivers, track payment logs, and monitor collection statuses.
          </p>
        </div>
        <button
          onClick={() => setShowLogForm(!showLogForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Log Remittance Payment
        </button>
      </div>

      {/* Log Remittance Form */}
      {showLogForm && (
        <form onSubmit={handleLogRemittance} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
            <Wallet className="h-5 w-5 text-forest" />
            Record Daily Remittance Payment
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
              onClick={() => setShowLogForm(false)}
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

      {/* List Search & History Grid */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Remittance Logs History</h4>
            <p className="text-[11px] text-muted-foreground">Detailed logs of payments submitted by lease drivers.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by driver name or log ID..."
              className="w-full rounded-full border border-border pl-9 pr-4 py-2 text-xs focus:outline-emerald bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-border/70 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                <th className="p-4">Log ID</th>
                <th className="p-4">Driver Details</th>
                <th className="p-4">Leased Vehicle</th>
                <th className="p-4">Branch Hub</th>
                <th className="p-4">Remittance Date</th>
                <th className="p-4 text-right">Expected / Paid</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRemittances.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No daily remittance logs recorded.
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
                      <td className="p-4 font-mono text-muted-foreground">{log.vehicleId || "N/A"}</td>
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
