import { useState } from "react";
import { ERPStore, HirePurchaseContract, Driver, JobCard } from "./mockData";
import {
  Phone, User, ClipboardList, Wallet, Search, CheckCircle,
  FileSignature, Wrench, AlertTriangle, PlusCircle, MessageSquare,
  Clock, Calendar, ChevronRight, X, Info, UserPlus
} from "lucide-react";
import { toast } from "sonner";

interface FrontDeskProps {
  selectedBranch?: string;
}

interface VisitorLog {
  id: string;
  name: string;
  phone: string;
  purpose: "HP Inquiry" | "Workshop Booking" | "Complaint" | "Payment" | "Other";
  note: string;
  timestamp: string;
  status: "Waiting" | "Attended" | "Referred";
}

export function FrontDesk({ selectedBranch = "ALL" }: FrontDeskProps) {
  const branchMap: Record<string, string> = {
    "BR-KT": "Katsina HQ",
    "BR-GB": "Gombe Hub"
  };
  const activeBranchName = branchMap[selectedBranch] || "";
  const today = new Date().toISOString().split("T")[0];

  // -- Data State --
  const [contracts] = useState<HirePurchaseContract[]>(() => ERPStore.getHPContracts().filter(c => !activeBranchName || c.branch === activeBranchName));
  const [drivers] = useState<Driver[]>(() => ERPStore.getDrivers().filter(d => !activeBranchName || d.branch === activeBranchName));
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);

  // -- Modal States --
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [showDriverLookup, setShowDriverLookup] = useState(false);

  // -- Visitor form --
  const [visitorForm, setVisitorForm] = useState({ name: "", phone: "", purpose: "HP Inquiry" as VisitorLog["purpose"], note: "" });

  // -- Walk-in payment form --
  const [paymentForm, setPaymentForm] = useState({ driverSearch: "", selectedContractId: "", amount: "", channel: "Cash" });
  const [matchedContracts, setMatchedContracts] = useState<{ contract: HirePurchaseContract; driver: Driver | undefined }[]>([]);

  // -- Workshop booking form --
  const [workshopForm, setWorkshopForm] = useState({
    customerName: "", customerPhone: "", vehiclePlate: "", vehicleModel: "", issue: ""
  });

  // -- Driver lookup search --
  const [driverQuery, setDriverQuery] = useState("");
  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(driverQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(driverQuery.toLowerCase()) ||
    d.phone.includes(driverQuery)
  );

  // -- Derived KPIs --
  const activeContracts = contracts.filter(c => c.status === "Active");
  const defaultedContracts = contracts.filter(c => c.status === "Defaulted" || c.status === "Missed Remittance");
  const todayVisitors = visitors.filter(v => v.timestamp.startsWith(today));

  // -- Handle Visitor Log --
  const handleLogVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    const log: VisitorLog = {
      id: `VIS-${Date.now()}`,
      ...visitorForm,
      timestamp: new Date().toISOString(),
      status: "Waiting"
    };
    setVisitors(prev => [log, ...prev]);
    ERPStore.addAuditLog("Reception Desk", "Receptionist", "Log Visitor", `Walk-in visitor logged: ${visitorForm.name} – ${visitorForm.purpose}`);
    toast.success("Visitor Logged", { description: `${visitorForm.name} added to today's walk-in register.` });
    setVisitorForm({ name: "", phone: "", purpose: "HP Inquiry", note: "" });
    setShowVisitorModal(false);
  };

  const updateVisitorStatus = (id: string, status: VisitorLog["status"]) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  // -- Handle Walk-in Payment Search --
  const searchContracts = (query: string) => {
    setPaymentForm(prev => ({ ...prev, driverSearch: query, selectedContractId: "" }));
    if (query.length < 2) { setMatchedContracts([]); return; }
    const q = query.toLowerCase();
    const matched = contracts
      .filter(c => c.status === "Active")
      .map(c => ({ contract: c, driver: drivers.find(d => d.id === c.driverId) }))
      .filter(({ contract, driver }) =>
        driver?.name.toLowerCase().includes(q) ||
        driver?.id.toLowerCase().includes(q) ||
        contract.id.toLowerCase().includes(q)
      );
    setMatchedContracts(matched);
  };

  // -- Handle Walk-in Payment Submit --
  const handleWalkInPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.selectedContractId) {
      toast.error("No contract selected", { description: "Please search and select a driver's contract." });
      return;
    }
    const amount = Number(paymentForm.amount);
    if (!amount || amount <= 0) {
      toast.error("Invalid amount", { description: "Please enter a valid payment amount." });
      return;
    }

    const allContracts = ERPStore.getHPContracts();
    const updated = allContracts.map(c => {
      if (c.id === paymentForm.selectedContractId) {
        const newPaid = c.balancePaid + amount;
        const isComplete = newPaid >= c.totalAmount;
        return {
          ...c,
          balancePaid: Math.min(newPaid, c.totalAmount),
          status: isComplete ? ("Completed" as const) : ("Active" as const),
          paymentHistory: [...(c.paymentHistory || []), { date: today, amount }]
        };
      }
      return c;
    });
    ERPStore.saveHPContracts(updated);

    const driver = drivers.find(d => d.id === allContracts.find(c => c.id === paymentForm.selectedContractId)?.driverId);
    ERPStore.addAuditLog("Reception Desk", "Receptionist", "Record Walk-in Payment", `₦${amount.toLocaleString()} received via ${paymentForm.channel} from ${driver?.name || "driver"} for contract ${paymentForm.selectedContractId}.`);
    ERPStore.addTransaction({
      id: `TXN-${Date.now()}`,
      type: "Revenue",
      amount,
      category: "Hire Purchase",
      description: `Walk-in HP payment via ${paymentForm.channel} — Contract ${paymentForm.selectedContractId} (${driver?.name || "driver"})`,
      branch: activeBranchName || "Katsina HQ",
      date: today
    });

    toast.success("Payment Recorded!", { description: `₦${amount.toLocaleString()} logged for contract ${paymentForm.selectedContractId}.` });
    setPaymentForm({ driverSearch: "", selectedContractId: "", amount: "", channel: "Cash" });
    setMatchedContracts([]);
    setShowPaymentModal(false);
  };

  // -- Handle Workshop Booking --
  const handleWorkshopBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newJobCard: JobCard = {
      id: `JC-R${Date.now().toString().slice(-3)}`,
      customerName: workshopForm.customerName,
      customerPhone: workshopForm.customerPhone,
      vehiclePlate: workshopForm.vehiclePlate,
      vehicleModel: workshopForm.vehicleModel,
      issueDescription: workshopForm.issue,
      assignedTechnicianId: "",
      laborCharges: 0,
      partsUsed: [],
      status: "Inspecting",
      branch: activeBranchName || "Katsina HQ",
      date: today
    };
    const cards = ERPStore.getJobCards();
    ERPStore.saveJobCards([newJobCard, ...cards]);
    ERPStore.addAuditLog("Reception Desk", "Receptionist", "Create Workshop Booking", `Workshop booking created for ${workshopForm.customerName} — Vehicle: ${workshopForm.vehiclePlate}.`);
    toast.success("Workshop Booking Logged", { description: `Job card ${newJobCard.id} opened for ${workshopForm.customerName}.` });
    setWorkshopForm({ customerName: "", customerPhone: "", vehiclePlate: "", vehicleModel: "", issue: "" });
    setShowWorkshopModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-foreground">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Front Desk</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {activeBranchName} Reception — Log visitors, record walk-in payments, book workshop appointments, and lookup drivers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowVisitorModal(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft">
            <UserPlus className="h-4 w-4" /> Log Visitor
          </button>
          <button onClick={() => setShowPaymentModal(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest transition cursor-pointer">
            <Wallet className="h-4 w-4" /> Record HP Payment
          </button>
          <button onClick={() => setShowWorkshopModal(true)} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer">
            <Wrench className="h-4 w-4 text-muted-foreground" /> Book Workshop
          </button>
          <button onClick={() => setShowDriverLookup(true)} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer">
            <Search className="h-4 w-4 text-muted-foreground" /> Driver Lookup
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active HP Leases", value: activeContracts.length, icon: FileSignature, color: "text-emerald" },
          { label: "Alerts / Defaulted", value: defaultedContracts.length, icon: AlertTriangle, color: "text-amber-500" },
          { label: "Branch Drivers", value: drivers.filter(d => d.status === "Active").length, icon: User, color: "text-blue-500" },
          { label: "Visitors Today", value: todayVisitors.length, icon: ClipboardList, color: "text-purple-500" }
        ].map(kpi => (
          <div key={kpi.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft hover-lift">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
            <div className={`font-display text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Today's Visitor Register */}
      <div className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-emerald" /> Today's Visitor Register
          </h3>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold">{todayVisitors.length}</span>
        </div>

        {todayVisitors.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground text-sm">
            <ClipboardList className="h-8 w-8 mx-auto opacity-30 mb-2" />
            No visitors logged today. Use "Log Visitor" to start the register.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border">
                <tr>
                  <th className="px-5 py-3">Visitor</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Purpose</th>
                  <th className="px-5 py-3">Note</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {todayVisitors.map(v => (
                  <tr key={v.id} className="hover:bg-muted/20 transition">
                    <td className="px-5 py-3 font-semibold text-foreground">{v.name}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">{v.phone}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-full bg-emerald-500/10 text-emerald px-2 py-0.5 text-[9px] font-bold uppercase">{v.purpose}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground max-w-[160px] truncate">{v.note || "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground font-mono">{new Date(v.timestamp).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                        v.status === "Attended" ? "bg-emerald-500/10 text-emerald" :
                        v.status === "Referred" ? "bg-blue-500/10 text-blue-500" :
                        "bg-amber-500/10 text-amber-600 animate-pulse"
                      }`}>{v.status}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => updateVisitorStatus(v.id, "Attended")} className="rounded-lg bg-emerald-500/10 text-emerald px-2 py-1 text-[9px] font-bold hover:bg-emerald-500/20 transition cursor-pointer">Attended</button>
                        <button onClick={() => updateVisitorStatus(v.id, "Referred")} className="rounded-lg bg-blue-500/10 text-blue-500 px-2 py-1 text-[9px] font-bold hover:bg-blue-500/20 transition cursor-pointer">Referred</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active HP Contracts Preview */}
      <div className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <FileSignature className="h-4 w-4 text-emerald" />
          <h3 className="font-display font-bold text-sm text-foreground">Active HP Lease Contracts</h3>
        </div>
        {activeContracts.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm">No active lease contracts for this branch.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border">
                <tr>
                  <th className="px-5 py-3">Contract ID</th>
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3">Daily Target</th>
                  <th className="px-5 py-3">Paid</th>
                  <th className="px-5 py-3">Outstanding</th>
                  <th className="px-5 py-3 text-center">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {activeContracts.map(c => {
                  const driver = drivers.find(d => d.id === c.driverId);
                  const progress = Math.min((c.balancePaid / c.totalAmount) * 100, 100);
                  return (
                    <tr key={c.id} className="hover:bg-muted/20 transition">
                      <td className="px-5 py-3 font-mono font-bold text-emerald">{c.id}</td>
                      <td className="px-5 py-3 font-semibold text-foreground">{driver?.name || c.driverId}</td>
                      <td className="px-5 py-3 font-mono font-bold text-foreground">₦{c.dailyTarget.toLocaleString()}</td>
                      <td className="px-5 py-3 text-emerald font-mono">₦{c.balancePaid.toLocaleString()}</td>
                      <td className="px-5 py-3 text-amber-600 font-mono">₦{(c.totalAmount - c.balancePaid).toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted h-1.5 rounded-full overflow-hidden min-w-[60px]">
                            <div className="h-full bg-emerald rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-muted-foreground w-8 text-right">{progress.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* === MODAL: Log Visitor === */}
      {showVisitorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-base flex items-center gap-2"><UserPlus className="h-5 w-5 text-forest" /> Log Walk-in Visitor</h3>
              <button onClick={() => setShowVisitorModal(false)} className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleLogVisitor} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Visitor Name</label>
                  <input required value={visitorForm.name} onChange={e => setVisitorForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Phone Number</label>
                  <input required value={visitorForm.phone} onChange={e => setVisitorForm(p => ({ ...p, phone: e.target.value }))} placeholder="08012345678" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Purpose of Visit</label>
                <select value={visitorForm.purpose} onChange={e => setVisitorForm(p => ({ ...p, purpose: e.target.value as VisitorLog["purpose"] }))} className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card">
                  <option>HP Inquiry</option>
                  <option>Workshop Booking</option>
                  <option>Payment</option>
                  <option>Complaint</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Notes (optional)</label>
                <textarea rows={2} value={visitorForm.note} onChange={e => setVisitorForm(p => ({ ...p, note: e.target.value }))} placeholder="Additional details..." className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowVisitorModal(false)} className="flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-forest text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer">Log Visitor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL: Record HP Payment === */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-base flex items-center gap-2"><Wallet className="h-5 w-5 text-emerald" /> Record Walk-in HP Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleWalkInPayment} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Search Driver or Contract ID</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input value={paymentForm.driverSearch} onChange={e => searchContracts(e.target.value)} placeholder="Type driver name or HP-xxx..." className="w-full rounded-xl border border-border pl-10 pr-4 py-2.5 text-xs bg-card" />
                </div>
                {matchedContracts.length > 0 && !paymentForm.selectedContractId && (
                  <div className="mt-1 rounded-xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
                    {matchedContracts.map(({ contract, driver }) => (
                      <button type="button" key={contract.id} onClick={() => { setPaymentForm(p => ({ ...p, selectedContractId: contract.id, driverSearch: `${driver?.name} — ${contract.id}` })); setMatchedContracts([]); }} className="w-full text-left px-4 py-2.5 text-xs hover:bg-muted transition">
                        <span className="font-bold text-foreground">{driver?.name}</span>
                        <span className="text-muted-foreground ml-2">{contract.id} · Outstanding: ₦{(contract.totalAmount - contract.balancePaid).toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {paymentForm.selectedContractId && (
                <div className="bg-emerald-500/5 border border-emerald/30 rounded-xl p-3 text-xs flex gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Contract <strong className="text-foreground">{paymentForm.selectedContractId}</strong> selected.</span>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Amount Received (₦)</label>
                  <input type="number" required value={paymentForm.amount} onChange={e => setPaymentForm(p => ({ ...p, amount: e.target.value }))} placeholder="e.g. 12000" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Payment Channel</label>
                  <select value={paymentForm.channel} onChange={e => setPaymentForm(p => ({ ...p, channel: e.target.value }))} className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card">
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>POS</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-emerald text-xs font-semibold text-white hover:bg-forest transition cursor-pointer">Confirm Receipt</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL: Workshop Booking === */}
      {showWorkshopModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-base flex items-center gap-2"><Wrench className="h-5 w-5 text-muted-foreground" /> Log Workshop Booking</h3>
              <button onClick={() => setShowWorkshopModal(false)} className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleWorkshopBooking} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Customer Name</label>
                  <input required value={workshopForm.customerName} onChange={e => setWorkshopForm(p => ({ ...p, customerName: e.target.value }))} placeholder="Full name" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Phone Number</label>
                  <input required value={workshopForm.customerPhone} onChange={e => setWorkshopForm(p => ({ ...p, customerPhone: e.target.value }))} placeholder="08012345678" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Vehicle Plate</label>
                  <input required value={workshopForm.vehiclePlate} onChange={e => setWorkshopForm(p => ({ ...p, vehiclePlate: e.target.value }))} placeholder="KT-902-A10" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Vehicle Model</label>
                  <input value={workshopForm.vehicleModel} onChange={e => setWorkshopForm(p => ({ ...p, vehicleModel: e.target.value }))} placeholder="Honda Keke 200cc" className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Reported Issue</label>
                <textarea required rows={3} value={workshopForm.issue} onChange={e => setWorkshopForm(p => ({ ...p, issue: e.target.value }))} placeholder="Describe the customer's complaint in detail..." className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-card resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowWorkshopModal(false)} className="flex-1 py-3 rounded-2xl border border-border text-xs font-semibold hover:bg-muted transition cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-2xl bg-forest text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer">Create Job Card</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL: Driver Lookup === */}
      {showDriverLookup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-elevated animate-scale-up">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="font-display font-bold text-base flex items-center gap-2"><Search className="h-5 w-5 text-muted-foreground" /> Driver Lookup</h3>
              <button onClick={() => { setShowDriverLookup(false); setDriverQuery(""); }} className="h-8 w-8 rounded-full hover:bg-muted transition flex items-center justify-center text-muted-foreground cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input autoFocus value={driverQuery} onChange={e => setDriverQuery(e.target.value)} placeholder="Search by name, ID, or phone number..." className="w-full rounded-xl border border-border pl-10 pr-4 py-2.5 text-xs bg-card" />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredDrivers.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">No drivers found for your query.</div>
              ) : filteredDrivers.map(d => {
                const contract = contracts.find(c => c.driverId === d.id && c.status === "Active");
                return (
                  <div key={d.id} className="rounded-2xl border border-border p-3.5 bg-muted/20 hover:bg-muted/40 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm text-foreground">{d.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{d.id} · {d.phone}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">License: {d.license}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${d.status === "Active" ? "bg-emerald-500/10 text-emerald" : "bg-amber-500/10 text-amber-600"}`}>{d.status}</span>
                    </div>
                    {contract && (
                      <div className="mt-2 pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                        HP Contract <strong className="text-foreground">{contract.id}</strong> · Outstanding: <strong className="text-amber-600">₦{(contract.totalAmount - contract.balancePaid).toLocaleString()}</strong>
                      </div>
                    )}
                    <div className="mt-2 pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                      Guarantor: <strong className="text-foreground">{d.guarantorName}</strong> · {d.guarantorPhone}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
