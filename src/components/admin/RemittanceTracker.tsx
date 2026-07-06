import { useState } from "react";
import { ERPStore, HirePurchaseContract, Driver, Transaction } from "./mockData";
import { 
  Plus, 
  Check, 
  UserCheck, 
  Wallet, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Send,
  Search,
  Filter,
  DollarSign,
  User,
  History,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "sonner";

interface RemittanceTrackerProps {
  selectedBranch?: string;
}

export function RemittanceTracker({ selectedBranch = "ALL" }: RemittanceTrackerProps) {
  const branchMap: Record<string, string> = {
    "BR-KT": "Katsina HQ",
    "BR-GB": "Gombe Hub"
  };
  const activeBranchName = branchMap[selectedBranch];

  // Selected date state (defaults to July 6, 2026, which is our simulation date)
  const [selectedDate, setSelectedDate] = useState("2026-07-06");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "PARTIAL" | "UNPAID">("ALL");

  // Load datasets from localstorage
  const [contracts, setContracts] = useState<HirePurchaseContract[]>(() => ERPStore.getHPContracts());
  const [drivers, setDrivers] = useState<Driver[]>(() => ERPStore.getDrivers());

  // Modal / Drawer states
  const [recordingContract, setRecordingContract] = useState<HirePurchaseContract | null>(null);
  const [recordingAmount, setRecordingAmount] = useState<string>("12000");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Bank Transfer" | "POS">("Bank Transfer");
  const [paymentNotes, setPaymentNotes] = useState("");

  const [activeHistoryDriver, setActiveHistoryDriver] = useState<{ contract: HirePurchaseContract; driver: Driver } | null>(null);

  // Sync state helpers
  const refreshData = () => {
    setContracts(ERPStore.getHPContracts());
    setDrivers(ERPStore.getDrivers());
  };

  // Filter contracts by selected branch
  const filteredContracts = contracts.filter(c => {
    // If branch is filtered, check if the contract's driver belongs to that branch
    const driver = drivers.find(d => d.id === c.driverId);
    if (!driver) return false;
    
    if (activeBranchName && driver.branch !== activeBranchName) {
      return false;
    }
    return true;
  });

  // Calculate stats for the selected date
  const stats = (() => {
    let expected = 0;
    let collected = 0;
    let paidCount = 0;
    let partialCount = 0;
    let unpaidCount = 0;

    filteredContracts.forEach(c => {
      // Expected is the contract daily target
      expected += c.dailyTarget;

      // Find if they paid on the selected date
      const paymentToday = c.paymentHistory?.find(p => p.date === selectedDate);
      if (paymentToday) {
        collected += paymentToday.amount;
        if (paymentToday.amount >= c.dailyTarget) {
          paidCount++;
        } else if (paymentToday.amount > 0) {
          partialCount++;
        } else {
          unpaidCount++;
        }
      } else {
        unpaidCount++;
      }
    });

    const complianceRate = expected > 0 ? (collected / expected) * 100 : 0;

    return {
      expected,
      collected,
      paidCount,
      partialCount,
      unpaidCount,
      complianceRate
    };
  })();

  // Filtered list of drivers for display based on search query & status filter
  const displayedItems = filteredContracts.map(c => {
    const driver = drivers.find(d => d.id === c.driverId);
    const paymentToday = c.paymentHistory?.find(p => p.date === selectedDate);
    const amountPaid = paymentToday ? paymentToday.amount : 0;

    let status: "PAID" | "PARTIAL" | "UNPAID" = "UNPAID";
    if (amountPaid >= c.dailyTarget) {
      status = "PAID";
    } else if (amountPaid > 0) {
      status = "PARTIAL";
    }

    return {
      contract: c,
      driver,
      amountPaid,
      status
    };
  }).filter(item => {
    // Apply search query
    const nameMatch = item.driver?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const plateMatch = item.contract.vehicleId.toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = item.contract.id.toLowerCase().includes(searchQuery.toLowerCase());
    const searchMatch = nameMatch || plateMatch || idMatch;

    // Apply status filter
    const statusMatch = statusFilter === "ALL" || item.status === statusFilter;

    return searchMatch && statusMatch;
  });

  // Handle Recording Remittance
  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordingContract) return;

    const amount = Number(recordingAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid Amount", { description: "Please enter a valid remittance amount." });
      return;
    }

    // Update HP Contract payment history
    const updatedContracts = contracts.map(c => {
      if (c.id === recordingContract.id) {
        const history = c.paymentHistory ? [...c.paymentHistory] : [];
        // Remove previous entry for selectedDate if it exists
        const cleanedHistory = history.filter(p => p.date !== selectedDate);
        
        return {
          ...c,
          balancePaid: c.balancePaid + amount,
          status: (c.balancePaid + amount >= c.totalAmount) ? ("Completed" as const) : c.status,
          paymentHistory: [...cleanedHistory, { date: selectedDate, amount }]
        };
      }
      return c;
    });

    // Save HP contracts
    ERPStore.saveHPContracts(updatedContracts);

    // Save Ledger Transaction
    const transactions = ERPStore.getTransactions();
    const driver = drivers.find(d => d.id === recordingContract.driverId);
    
    const newTransaction: Transaction = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      type: "Revenue",
      amount,
      category: "Hire Purchase",
      description: `Daily HP Remittance - ${driver?.name || "Driver"} (${recordingContract.vehicleId}) - Channel: ${paymentMethod}`,
      branch: driver?.branch || "Katsina HQ",
      date: selectedDate
    };

    ERPStore.saveTransactions([newTransaction, ...transactions]);

    // Add Audit Log
    ERPStore.addAuditLog(
      driver?.name || "Operations Officer",
      "Branch Operations Officer",
      "Record Remittance",
      `Logged daily HP remittance of ₦${amount.toLocaleString()} for vehicle ${recordingContract.vehicleId} on date ${selectedDate}.`
    );

    toast.success("Remittance Recorded Successfully", {
      description: `Logged ₦${amount.toLocaleString()} for ${driver?.name}. Balance updated.`
    });

    setRecordingContract(null);
    setPaymentNotes("");
    refreshData();
  };

  // Simulate SMS Alert Warning
  const handleSendReminder = (driver: Driver, contract: HirePurchaseContract) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Formatting alert for ${driver.name}...`,
        success: () => {
          return `SMS Warning dispatched to ${driver.name} (Guarantor: ${driver.guarantorName} - ${driver.guarantorPhone})`;
        },
        error: "SMS gateway error. Please try again."
      }
    );
  };

  const formatNaira = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8 animate-fade-in text-foreground">
      {/* Page Title / Subtitle & Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Daily Remittance Board</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Log and review Hire Purchase payments, track branch collection stats, and dispatch late payment warnings.
          </p>
        </div>

        {/* Date Selector & Export Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-semibold">
            <Calendar className="h-4 w-4 text-emerald" />
            <span className="text-muted-foreground mr-1">Date:</span>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-foreground focus:outline-none border-none font-mono cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              toast.success("Remittance CSV Compiled", {
                description: `Successfully exported remittance checklist for date ${selectedDate}`
              });
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold hover:bg-muted transition cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            Export Day Checklist
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Expected Collection */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expected Collection</span>
            <div className="h-9 w-9 rounded-xl bg-forest-deep/10 dark:bg-forest/20 flex items-center justify-center text-forest">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold">{formatNaira(stats.expected)}</h3>
            <p className="text-[10px] text-muted-foreground mt-2">
              For {filteredContracts.length} active HP tricycles
            </p>
          </div>
        </div>

        {/* Collected Today */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Collected Today</span>
            <div className="h-9 w-9 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-emerald">{formatNaira(stats.collected)}</h3>
            <p className="text-[10px] text-muted-foreground mt-2">
              Progress: <span className="font-bold text-emerald">{stats.complianceRate.toFixed(1)}%</span>
            </p>
          </div>
        </div>

        {/* Remittance Compliance Rate */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Compliance Target</span>
            <div className="h-9 w-9 rounded-xl bg-blue-accent/10 flex items-center justify-center text-blue-accent">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold">{stats.complianceRate.toFixed(1)}%</h3>
            <div className="w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden">
              <div 
                className="bg-emerald h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(stats.complianceRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Defaulters / Yet to Pay */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending Drivers</span>
            <div className="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-red-500">{stats.unpaidCount}</h3>
            <p className="text-[10px] text-muted-foreground mt-2">
              Requires payment callback alerts
            </p>
          </div>
        </div>
      </div>

      {/* Main Checklist / Table Card */}
      <div className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
        {/* Controls header */}
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by driver name or vehicle plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 pl-11 pr-4 py-3 text-sm focus:border-emerald focus:outline-none transition-all"
            />
          </div>

          {/* Filter badges */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {[
              { id: "ALL", label: "All Drivers" },
              { id: "PAID", label: "Paid" },
              { id: "PARTIAL", label: "Partial" },
              { id: "UNPAID", label: "Yet to Remit" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  statusFilter === f.id
                    ? "bg-forest text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data list view */}
        <div className="overflow-x-auto">
          {contracts.length === 0 ? (
            <div className="p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald flex items-center justify-center mx-auto border border-emerald/20">
                <Wallet className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-foreground">No Active Hire Purchase Leases</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Before you can record daily remittances, the platform requires active Hire Purchase contracts. Since the database has been cleared for your manual QA run, please follow these steps to set up your first lease:
                </p>
              </div>

              <div className="text-left bg-muted/40 border border-border p-5 rounded-2xl space-y-4">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Add a Driver</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Go to the **Drivers** tab and register a new driver account.</p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-border/60 pt-4">
                  <div className="h-6 w-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Add a Vehicle</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Go to the **Fleet** tab and register a vehicle with status set to **"Available"**.</p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-border/60 pt-4">
                  <div className="h-6 w-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Create Hire Purchase Contract</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Go to the **Hire Purchase Ledger** tab, click **"Assign New Lease"**, select your driver and vehicle, and click create.</p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-border/60 pt-4">
                  <div className="h-6 w-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Record Remittance</h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Return to this **Daily Remittances** board. You will now see the driver's name listed with a **"Record Payment"** button.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : displayedItems.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <UserCheck className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm font-semibold">No contracts match your query and criteria.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try relaxing filters or search terms.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/10 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">Driver Profile</th>
                  <th className="px-6 py-4">HP Vehicle</th>
                  <th className="px-6 py-4">Daily Rate</th>
                  <th className="px-6 py-4">Collected Today</th>
                  <th className="px-6 py-4">Remittance Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayedItems.map(item => {
                  const driverName = item.driver?.name || "Unknown Driver";
                  const driverPhone = item.driver?.phone || "No Phone";
                  const isPaid = item.status === "PAID";
                  const isPartial = item.status === "PARTIAL";

                  return (
                    <tr key={item.contract.id} className="hover:bg-muted/5 transition duration-200">
                      {/* Driver Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-emerald/10 text-emerald font-bold flex items-center justify-center text-sm border border-emerald/20">
                            {driverName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{driverName}</div>
                            <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{driverPhone}</div>
                          </div>
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-semibold text-foreground">{item.contract.vehicleId}</div>
                          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                            HP Contract: {item.contract.id}
                          </div>
                        </div>
                      </td>

                      {/* Daily Rate */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold font-mono text-foreground">
                          {formatNaira(item.contract.dailyTarget)}
                        </div>
                      </td>

                      {/* Collected */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold font-mono text-foreground">
                          {formatNaira(item.amountPaid)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald/10 text-emerald border border-emerald/20">
                            <Check className="h-3.5 w-3.5" /> Full Remitted
                          </span>
                        ) : isPartial ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Clock className="h-3.5 w-3.5 animate-pulse" /> Partial (₦{item.amountPaid.toLocaleString()})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
                            <AlertTriangle className="h-3.5 w-3.5" /> Yet to Remit
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setRecordingContract(item.contract);
                              setRecordingAmount(item.contract.dailyTarget.toString());
                              setPaymentNotes("");
                            }}
                            className="inline-flex h-8 items-center gap-1 rounded-xl bg-forest px-3 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer"
                          >
                            <Wallet className="h-3.5 w-3.5" /> Record Payment
                          </button>
                          
                          <button
                            onClick={() => setActiveHistoryDriver({ contract: item.contract, driver: item.driver! })}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition cursor-pointer"
                            title="View Payments History"
                          >
                            <History className="h-4 w-4" />
                          </button>

                          {!isPaid && item.driver && (
                            <button
                              onClick={() => handleSendReminder(item.driver!, item.contract)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition cursor-pointer"
                              title="Send SMS Reminder"
                            >
                              <Send className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL: Record Remittance Payment */}
      {recordingContract && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-lg text-foreground">Record Daily Remittance</h3>
              <button 
                onClick={() => setRecordingContract(null)}
                className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-4">
              <div className="rounded-2xl bg-muted/30 border border-border p-3 flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-emerald/10 text-emerald flex items-center justify-center font-bold">
                  {drivers.find(d => d.id === recordingContract.driverId)?.name.charAt(0) || "D"}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {drivers.find(d => d.id === recordingContract.driverId)?.name || "Driver"}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Vehicle Plate: {recordingContract.vehicleId} | Target: ₦{recordingContract.dailyTarget.toLocaleString()}/day
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Remittance Date</label>
                <div className="w-full rounded-2xl border border-border bg-muted/10 px-4 py-3 text-sm font-mono text-muted-foreground">
                  {selectedDate}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Amount Collected (NGN)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-muted-foreground">₦</span>
                  <input
                    type="number"
                    required
                    value={recordingAmount}
                    onChange={(e) => setRecordingAmount(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-muted/20 pl-8 pr-4 py-3 text-sm font-bold focus:border-emerald focus:outline-none"
                    placeholder="e.g. 12000"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Bank Transfer", "Cash", "POS"].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method as any)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        paymentMethod === method
                          ? "bg-forest/10 border-forest text-forest dark:text-emerald"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Remittance Notes</label>
                <textarea
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Optional note e.g. paid half due to flat tyre..."
                  className="w-full rounded-2xl border border-border bg-muted/20 px-4 py-3 text-xs focus:border-emerald focus:outline-none h-16 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setRecordingContract(null)}
                  className="flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-forest hover:bg-forest-deep text-xs font-semibold text-white transition cursor-pointer shadow-glow-soft"
                >
                  Save Remittance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER / MODAL: Detailed Payment History Calendar */}
      {activeHistoryDriver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-card border-l border-border h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-left text-foreground">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display font-bold text-lg flex items-center gap-2">
                  <History className="h-5 w-5 text-emerald" />
                  Payment Ledger History
                </h3>
                <button 
                  onClick={() => setActiveHistoryDriver(null)}
                  className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Driver context */}
              <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald/10 text-emerald flex items-center justify-center font-bold text-lg">
                    {activeHistoryDriver.driver.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{activeHistoryDriver.driver.name}</h4>
                    <p className="text-xs text-muted-foreground">Keke: <span className="font-mono text-foreground font-bold">{activeHistoryDriver.contract.vehicleId}</span></p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground block">Balance Paid</span>
                    <span className="font-bold font-mono">{formatNaira(activeHistoryDriver.contract.balancePaid)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground block">Total Contract</span>
                    <span className="font-bold font-mono">{formatNaira(activeHistoryDriver.contract.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* List of payments */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Recent Payments Logs</h4>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {activeHistoryDriver.contract.paymentHistory && activeHistoryDriver.contract.paymentHistory.length > 0 ? (
                    [...activeHistoryDriver.contract.paymentHistory].reverse().map((pay, i) => {
                      const isFull = pay.amount >= activeHistoryDriver.contract.dailyTarget;
                      return (
                        <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-border bg-muted/10">
                          <div className="flex items-center gap-2.5">
                            {isFull ? (
                              <div className="h-5 w-5 rounded-full bg-emerald/10 text-emerald flex items-center justify-center"><Check className="h-3 w-3" /></div>
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center"><Clock className="h-3 w-3" /></div>
                            )}
                            <div>
                              <div className="text-xs font-mono font-bold text-foreground">{pay.date}</div>
                              <div className="text-[9px] text-muted-foreground mt-0.5">Recorded by operations officer</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold font-mono">
                            {formatNaira(pay.amount)}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-xs text-muted-foreground/60">
                      No payment history logged for this contract yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveHistoryDriver(null)}
              className="w-full py-3 rounded-2xl bg-muted border border-border hover:bg-muted/80 text-xs font-semibold transition cursor-pointer"
            >
              Close History Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
