import { useState, useEffect } from "react";
import { ERPStore, JobCard, CNGConversion, Employee, InventoryItem } from "./mockData";
import { Search, Plus, Wrench, Fuel, ClipboardList, Check, User, ArrowRight, DollarSign, Activity } from "lucide-react";
import { toast } from "sonner";

export function WorkshopConversions() {
  const [jobCards, setJobCards] = useState<JobCard[]>(() => ERPStore.getJobCards());
  const [conversions, setConversions] = useState<CNGConversion[]>(() => ERPStore.getConversions());

  // Keep list updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setJobCards(ERPStore.getJobCards());
      setConversions(ERPStore.getConversions());
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);
  
  // Section toggle: job cards vs cng conversions
  const [techSection, setTechSection] = useState<"job-cards" | "cng-conversions">("job-cards");

  // Job form state
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    customerName: "",
    customerPhone: "",
    vehiclePlate: "",
    vehicleModel: "",
    issueDescription: "",
    assignedTechnicianId: "EMP-05",
    laborCharges: 8000
  });

  // Conversion form state
  const [showConvForm, setShowConvForm] = useState(false);
  const [newConv, setNewConv] = useState({
    customerName: "",
    vehiclePlate: "",
    vehicleModel: "",
    cngKitType: "Sequential 4-Cylinder Kit",
    cylinderSize: "60L Seamless Steel CNG Cylinder",
    cost: 750000,
    assignedEngineerId: "EMP-04",
    paymentType: "Full" as "Full" | "Installment",
    initialDeposit: 350000
  });

  const getActiveBranchDefault = () => {
    if (typeof window !== "undefined") {
      const selected = localStorage.getItem("cityview_selected_branch") || "ALL";
      if (selected === "BR-GB") return "Gombe Hub";
    }
    return "Katsina HQ";
  };

  // Log Installment Payment Modal State
  const [paymentModal, setPaymentModal] = useState<CNGConversion | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: 100000,
    paymentMethod: "Bank Transfer",
    notes: ""
  });

  // Technical staff and inventory resources
  const technicians = ERPStore.getEmployees().filter(e => e.department === "Technical");
  const inventory = ERPStore.getInventory();

  // Create Job Card
  const handleCreateJobCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JobCard = {
      id: `JB-${Date.now().toString().slice(-4)}`,
      customerName: newJob.customerName,
      customerPhone: newJob.customerPhone,
      vehiclePlate: newJob.vehiclePlate.toUpperCase(),
      vehicleModel: newJob.vehicleModel,
      issueDescription: newJob.issueDescription,
      assignedTechnicianId: newJob.assignedTechnicianId,
      laborCharges: Number(newJob.laborCharges),
      partsUsed: [],
      status: "Inspecting",
      date: new Date().toISOString().split("T")[0],
      branch: getActiveBranchDefault()
    };

    const updated = [newEntry, ...jobCards];
    setJobCards(updated);
    ERPStore.saveJobCards(updated);

    // Lock vehicle status to "In Workshop" if it belongs to fleet
    const fleetVehicles = ERPStore.getVehicles();
    const isFleet = fleetVehicles.some(v => v.plateNumber === newJob.vehiclePlate.toUpperCase());
    if (isFleet) {
      const updatedVeh = fleetVehicles.map(v => v.plateNumber === newJob.vehiclePlate.toUpperCase() ? { ...v, status: "In Workshop" as const } : v);
      ERPStore.saveVehicles(updatedVeh);
    }

    const techName = technicians.find(t => t.id === newJob.assignedTechnicianId)?.name || "Unassigned";
    ERPStore.addAuditLog("Workshop Manager", "Workshop Manager", "Create Job Card", `Created repair card ${newEntry.id} for ${newJob.vehiclePlate}. Tech: ${techName}`);
    
    toast.success("Job Card Logged", {
      description: `Job card ${newEntry.id} assigned to ${techName}.`
    });

    setNewJob({
      customerName: "",
      customerPhone: "",
      vehiclePlate: "",
      vehicleModel: "",
      issueDescription: "",
      assignedTechnicianId: "EMP-05",
      laborCharges: 8000
    });
    setShowJobForm(false);
  };

  // Create CNG Conversion
  const handleCreateConversion = (e: React.FormEvent) => {
    e.preventDefault();
    const costVal = Number(newConv.cost);
    const depositVal = newConv.paymentType === "Installment" ? Number(newConv.initialDeposit) : 0;

    const newEntry: CNGConversion = {
      id: `CNG-${Date.now().toString().slice(-4)}`,
      customerName: newConv.customerName,
      vehiclePlate: newConv.vehiclePlate.toUpperCase(),
      vehicleModel: newConv.vehicleModel,
      cngKitType: newConv.cngKitType,
      cylinderSize: newConv.cylinderSize,
      cost: costVal,
      status: "Inspection",
      assignedEngineers: [technicians.find(t => t.id === newConv.assignedEngineerId)?.name || "Engr. Yusuf Bello"],
      dateStarted: new Date().toISOString().split("T")[0],
      paymentType: newConv.paymentType,
      amountPaid: newConv.paymentType === "Installment" ? depositVal : 0,
      paymentStatus: newConv.paymentType === "Installment"
        ? (depositVal >= costVal ? "Fully Paid" : depositVal > 0 ? "Partially Paid" : "Pending")
        : "Pending",
      paymentHistory: newConv.paymentType === "Installment" && depositVal > 0 ? [
        {
          id: `PMT-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split("T")[0],
          amount: depositVal,
          paymentMethod: "Bank Transfer",
          notes: "Initial installment deposit"
        }
      ] : [],
      branch: getActiveBranchDefault()
    };

    const updated = [newEntry, ...conversions];
    setConversions(updated);
    ERPStore.saveConversions(updated);

    // Register deposit revenue
    if (newConv.paymentType === "Installment" && depositVal > 0) {
      const transactions = ERPStore.getTransactions();
      const newTransaction = {
        id: `TR-${Date.now().toString().slice(-4)}`,
        type: "Revenue" as const,
        amount: depositVal,
        category: "CNG Conversion" as const,
        description: `Upfront installment deposit for CNG conversion: ${newConv.vehiclePlate.toUpperCase()} (${newConv.customerName})`,
        branch: getActiveBranchDefault(),
        date: new Date().toISOString().split("T")[0]
      };
      ERPStore.saveTransactions([newTransaction, ...transactions]);
    }

    // Register/update vehicle in fleet as "In-Progress" conversion
    const fleetVehicles = ERPStore.getVehicles();
    const existing = fleetVehicles.find(v => v.plateNumber === newConv.vehiclePlate.toUpperCase());
    if (existing) {
      const updatedVeh = fleetVehicles.map(v => v.plateNumber === newConv.vehiclePlate.toUpperCase() ? { ...v, conversionStatus: "In-Progress" as const, status: "In Workshop" as const } : v);
      ERPStore.saveVehicles(updatedVeh);
    }

    ERPStore.addAuditLog("CNG Operations", "Operations Manager", "Start CNG Conversion", `Registered conversion ${newEntry.id} with ${newConv.paymentType} payment plan for vehicle ${newConv.vehiclePlate}.`);

    toast.success("Conversion Logged", {
      description: `CNG conversion project ${newEntry.id} initialized.`
    });

    setNewConv({
      customerName: "",
      vehiclePlate: "",
      vehicleModel: "",
      cngKitType: "Sequential 4-Cylinder Kit",
      cylinderSize: "60L Seamless Steel CNG Cylinder",
      cost: 750000,
      assignedEngineerId: "EMP-04",
      paymentType: "Full",
      initialDeposit: 350000
    });
    setShowConvForm(false);
  };

  // Progress CNG conversion steps
  const advanceConversionStep = (id: string, currentStep: CNGConversion["status"]) => {
    const stepsOrder: CNGConversion["status"][] = [
      "Inspection",
      "Quotation Approved",
      "Installation",
      "Testing & Calibration",
      "Certification",
      "Handed Over"
    ];

    const idx = stepsOrder.indexOf(currentStep);
    if (idx === -1 || idx === stepsOrder.length - 1) return;

    const nextStep = stepsOrder[idx + 1];

    const updated = conversions.map(c => {
      if (c.id === id) {
        const entry = { ...c, status: nextStep };
        if (nextStep === "Handed Over") {
          entry.dateCompleted = new Date().toISOString().split("T")[0];

          // Trigger revenue log in transactions for the remaining unpaid balance
          const remainingBalance = c.paymentType === "Full" ? c.cost : (c.cost - (c.amountPaid || 0));
          if (remainingBalance > 0) {
            const transactions = ERPStore.getTransactions();
            const newTransaction = {
              id: `TR-${Date.now().toString().slice(-4)}`,
              type: "Revenue" as const,
              amount: remainingBalance,
              category: "CNG Conversion" as const,
              description: `CNG conversion completion final payout: ${c.vehiclePlate} (${c.customerName})`,
              branch: getActiveBranchDefault(),
              date: new Date().toISOString().split("T")[0]
            };
            ERPStore.saveTransactions([newTransaction, ...transactions]);

            // Update payment state details
            entry.amountPaid = c.cost;
            entry.paymentStatus = "Fully Paid";
            if (c.paymentType === "Installment") {
              entry.paymentHistory = [
                ...(c.paymentHistory || []),
                {
                  id: `PMT-${Date.now().toString().slice(-4)}`,
                  date: new Date().toISOString().split("T")[0],
                  amount: remainingBalance,
                  paymentMethod: "Bank Transfer",
                  notes: "Final payout at handover"
                }
              ];
            }
          }

          // Update fleet details
          const fleetVehicles = ERPStore.getVehicles();
          const matchesVeh = fleetVehicles.find(v => v.plateNumber === c.vehiclePlate);
          if (matchesVeh) {
            const updatedVeh = fleetVehicles.map(v => v.plateNumber === c.vehiclePlate ? { ...v, conversionStatus: "Converted" as const, fuelType: "CNG" as const, status: "Available" as const } : v);
            ERPStore.saveVehicles(updatedVeh);
          }
        }
        return entry;
      }
      return c;
    });

    setConversions(updated);
    ERPStore.saveConversions(updated);
    ERPStore.addAuditLog("Technical Dept", "Workshop Manager", "CNG Status Update", `Conversion ${id} advanced to: ${nextStep}`);

    toast.success("Conversion Project Updated", {
      description: `Advanced to: ${nextStep}`
    });
  };

  const handleLogInstallmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModal) return;

    const paymentAmount = Number(paymentForm.amount);
    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("Invalid Amount", { description: "Please specify a positive payment value." });
      return;
    }

    const updated = conversions.map(c => {
      if (c.id === paymentModal.id) {
        const nextPaid = (c.amountPaid || 0) + paymentAmount;
        const nextHistory = [
          ...(c.paymentHistory || []),
          {
            id: `PMT-${Date.now().toString().slice(-4)}`,
            date: new Date().toISOString().split("T")[0],
            amount: paymentAmount,
            paymentMethod: paymentForm.paymentMethod,
            notes: paymentForm.notes || "CNG conversion installment"
          }
        ];
        return {
          ...c,
          amountPaid: nextPaid,
          paymentStatus: nextPaid >= c.cost ? "Fully Paid" as const : "Partially Paid" as const,
          paymentHistory: nextHistory
        };
      }
      return c;
    });

    setConversions(updated);
    ERPStore.saveConversions(updated);

    // Save transaction
    const transactions = ERPStore.getTransactions();
    const newTransaction = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      type: "Revenue" as const,
      amount: paymentAmount,
      category: "CNG Conversion" as const,
      description: `Installment payment for CNG Conversion ${paymentModal.id}: ${paymentModal.vehiclePlate} (${paymentModal.customerName})`,
      branch: getActiveBranchDefault(),
      date: new Date().toISOString().split("T")[0]
    };
    ERPStore.saveTransactions([newTransaction, ...transactions]);

    ERPStore.addAuditLog("Technical Dept", "Workshop Manager", "CNG Installment Payment", `Logged installment payment ₦${paymentAmount.toLocaleString()} for CNG project ${paymentModal.id}.`);

    toast.success("Payment Logged Successfully", {
      description: `Logged ₦${paymentAmount.toLocaleString()} payment.`
    });

    setPaymentModal(null);
  };

  // Complete Job Card
  const markJobCardHandedOver = (id: string) => {
    const updated = jobCards.map(jb => {
      if (jb.id === id) {
        // Trigger revenue log
        const totalInvoice = jb.laborCharges + jb.partsUsed.reduce((sum, p) => sum + p.cost, 0);
        const transactions = ERPStore.getTransactions();
        const newTransaction = {
          id: `TR-${Date.now().toString().slice(-4)}`,
          type: "Revenue" as const,
          amount: totalInvoice,
          category: "Workshop Repairs" as const,
          description: `Workshop invoice collection: Job card ${jb.id} (${jb.customerName})`,
          branch: "Katsina HQ",
          date: new Date().toISOString().split("T")[0]
        };
        ERPStore.saveTransactions([newTransaction, ...transactions]);

        // Release vehicle if fleet
        const fleetVehicles = ERPStore.getVehicles();
        const matchesVeh = fleetVehicles.find(v => v.plateNumber === jb.vehiclePlate);
        if (matchesVeh) {
          const updatedVeh = fleetVehicles.map(v => v.plateNumber === jb.vehiclePlate ? { ...v, status: "Available" as const } : v);
          ERPStore.saveVehicles(updatedVeh);
        }

        return { ...jb, status: "Handed Over" as const };
      }
      return jb;
    });

    setJobCards(updated);
    ERPStore.saveJobCards(updated);
    ERPStore.addAuditLog("Technical Dept", "Workshop Manager", "Close Job Card", `Closed card ID ${id} and collected final payments.`);
    
    toast.success("Invoice Paid & Vehicle Dispatched", {
      description: `Job card has been archived as completed/paid.`
    });
  };

  const advanceJobStatus = (id: string, current: JobCard["status"]) => {
    const stages: JobCard["status"][] = ["Inspecting", "Diagnostics", "Awaiting Approval", "Repairing", "Completed", "Handed Over"];
    const nextIdx = stages.indexOf(current) + 1;
    if (nextIdx >= stages.length) return;
    
    const nextStage = stages[nextIdx];
    
    // If setting to Completed, calculate simple part reductions or just update status
    const updated = jobCards.map(jb => jb.id === id ? { ...jb, status: nextStage } : jb);
    setJobCards(updated);
    ERPStore.saveJobCards(updated);

    toast.success("Job Card Progressed", {
      description: `Status advanced to ${nextStage}`
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Selector Tabs Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setTechSection("job-cards")}
            className={`flex items-center gap-2 font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${
              techSection === "job-cards" 
                ? "bg-forest text-white" 
                : "text-muted-foreground hover:bg-mist"
            }`}
          >
            <ClipboardList className="h-5 w-5" />
            Repair Job Cards
          </button>
          <button 
            onClick={() => setTechSection("cng-conversions")}
            className={`flex items-center gap-2 font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${
              techSection === "cng-conversions" 
                ? "bg-forest text-white" 
                : "text-muted-foreground hover:bg-mist"
            }`}
          >
            <Fuel className="h-5 w-5" />
            CNG Conversions
          </button>
        </div>

        {techSection === "job-cards" ? (
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Job Card
          </button>
        ) : (
          <button
            onClick={() => setShowConvForm(!showConvForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Schedule CNG Conversion
          </button>
        )}
      </div>

      {/* Forms Segment */}
      {techSection === "job-cards" && showJobForm && (
        <form onSubmit={handleCreateJobCard} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Create Diagnostics Repair Card</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Customer Full Name</label>
              <input
                type="text"
                required
                value={newJob.customerName}
                onChange={(e) => setNewJob(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Usman Dangote"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={newJob.customerPhone}
                onChange={(e) => setNewJob(prev => ({ ...prev, customerPhone: e.target.value }))}
                placeholder="0803XXXXXXX"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Plate Number</label>
              <input
                type="text"
                required
                value={newJob.vehiclePlate}
                onChange={(e) => setNewJob(prev => ({ ...prev, vehiclePlate: e.target.value }))}
                placeholder="e.g. KT-124-AAA"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Model / Year</label>
              <input
                type="text"
                required
                value={newJob.vehicleModel}
                onChange={(e) => setNewJob(prev => ({ ...prev, vehicleModel: e.target.value }))}
                placeholder="e.g. Toyota Corolla 2012"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Assign Mechanic</label>
              <select
                value={newJob.assignedTechnicianId}
                onChange={(e) => setNewJob(prev => ({ ...prev, assignedTechnicianId: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                {technicians.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Est. Labour Charge (₦)</label>
              <input
                type="number"
                required
                value={newJob.laborCharges}
                onChange={(e) => setNewJob(prev => ({ ...prev, laborCharges: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Issue Description</label>
            <textarea
              required
              value={newJob.issueDescription}
              onChange={(e) => setNewJob(prev => ({ ...prev, issueDescription: e.target.value }))}
              placeholder="e.g. Excessive fuel consumption, rough gear transitions..."
              className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white h-20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowJobForm(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Log Card
            </button>
          </div>
        </form>
      )}

      {techSection === "cng-conversions" && showConvForm && (
        <form onSubmit={handleCreateConversion} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Schedule CNG Conversion Operations</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Customer / Organization Name</label>
              <input
                type="text"
                required
                value={newConv.customerName}
                onChange={(e) => setNewConv(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="e.g. Dangote Cement Logistics"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Plate Number</label>
              <input
                type="text"
                required
                value={newConv.vehiclePlate}
                onChange={(e) => setNewConv(prev => ({ ...prev, vehiclePlate: e.target.value }))}
                placeholder="e.g. KT-901-TRC"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Model</label>
              <input
                type="text"
                required
                value={newConv.vehicleModel}
                onChange={(e) => setNewConv(prev => ({ ...prev, vehicleModel: e.target.value }))}
                placeholder="e.g. Suzuki Every Bus"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">CNG Kit Class</label>
              <select
                value={newConv.cngKitType}
                onChange={(e) => setNewConv(prev => ({ ...prev, cngKitType: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Sequential 4-Cylinder Kit">Sequential 4-Cylinder Kit</option>
                <option value="Sequential 6-Cylinder Kit">Sequential 6-Cylinder Kit</option>
                <option value="Direct Injection Kit">Direct Injection Kit</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Cylinder Size Specification</label>
              <select
                value={newConv.cylinderSize}
                onChange={(e) => setNewConv(prev => ({ ...prev, cylinderSize: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="60L Seamless Steel Cylinder">60L Seamless Steel Cylinder</option>
                <option value="90L Seamless Steel Cylinder">90L Seamless Steel Cylinder</option>
                <option value="60L Lightweight Composite Cylinder">60L Lightweight Composite Cylinder</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Contract Conversion Cost (₦)</label>
              <input
                type="number"
                required
                value={newConv.cost}
                onChange={(e) => setNewConv(prev => ({ ...prev, cost: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Payment Plan Plan</label>
              <select
                value={newConv.paymentType}
                onChange={(e) => setNewConv(prev => ({ ...prev, paymentType: e.target.value as "Full" | "Installment" }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Full">Full Upfront/Handover</option>
                <option value="Installment">Installment Plan (Pay Small Small)</option>
              </select>
            </div>
            {newConv.paymentType === "Installment" && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Upfront Initial Deposit (₦)</label>
                <input
                  type="number"
                  required
                  value={newConv.initialDeposit}
                  onChange={(e) => setNewConv(prev => ({ ...prev, initialDeposit: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowConvForm(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Schedule Conversion
            </button>
          </div>
        </form>
      )}

      {/* Main Content Layout */}
      {techSection === "job-cards" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {jobCards.map(jb => {
            const tech = technicians.find(t => t.id === jb.assignedTechnicianId);
            const totalInvoice = jb.laborCharges + jb.partsUsed.reduce((sum, p) => sum + p.cost * p.quantity, 0);
            const isClosed = jb.status === "Handed Over";
            
            return (
              <div key={jb.id} className="rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col justify-between hover-lift">
                <div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-foreground">Job Card: {jb.id}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono font-semibold">{jb.date}</span>
                    </div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      jb.status === "Handed Over" ? "bg-slate-100 text-muted-foreground" : "bg-emerald-soft text-forest-deep"
                    }`}>
                      {jb.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div>Customer: <span className="font-bold text-foreground">{jb.customerName}</span> ({jb.customerPhone})</div>
                    <div>Vehicle: <span className="font-semibold text-charcoal">{jb.vehiclePlate} ({jb.vehicleModel})</span></div>
                    <div className="rounded-xl bg-mist/40 p-3 border border-border/50">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Diagnostics report</div>
                      <p className="mt-0.5 text-foreground leading-relaxed">{jb.issueDescription}</p>
                    </div>
                  </div>

                  {/* Parts Table if any */}
                  {jb.partsUsed.length > 0 && (
                    <div className="border border-border/60 rounded-xl overflow-hidden text-[10px] mb-4">
                      <div className="bg-mist p-2 font-bold uppercase tracking-wider text-muted-foreground">Parts log</div>
                      {jb.partsUsed.map(part => (
                        <div key={part.partId} className="flex justify-between border-t border-border p-2">
                          <span>{part.name} (x{part.quantity})</span>
                          <span className="font-mono">₦{(part.cost * part.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs font-semibold border-t border-border/50 pt-4 mb-4">
                    <span>Labour Charge: ₦{jb.laborCharges.toLocaleString()}</span>
                    <span className="text-forest-deep">Total Invoice: ₦{totalInvoice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {!isClosed ? (
                    <>
                      {jb.status !== "Completed" ? (
                        <button
                          onClick={() => advanceJobStatus(jb.id, jb.status)}
                          className="rounded-lg border border-border bg-white hover:bg-mist px-3 py-1.5 text-[10px] font-bold text-charcoal transition cursor-pointer"
                        >
                          Progress Stage
                        </button>
                      ) : (
                        <button
                          onClick={() => markJobCardHandedOver(jb.id)}
                          className="rounded-lg bg-emerald text-forest-deep px-3.5 py-1.5 text-[10px] font-bold hover:bg-forest-deep hover:text-white transition cursor-pointer"
                        >
                          Receive Cash & Handover
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-semibold">Archived (Closed & Paid)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* CNG Conversions Stepper List */
        <div className="space-y-6">
          {conversions.map(c => {
            const steps: CNGConversion["status"][] = [
              "Inspection",
              "Quotation Approved",
              "Installation",
              "Testing & Calibration",
              "Certification",
              "Handed Over"
            ];
            
            const activeIdx = steps.indexOf(c.status);
            const isCompleted = c.status === "Handed Over";

            return (
              <div key={c.id} className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border/50 pb-4">
                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground">{c.vehiclePlate} ({c.vehicleModel})</h4>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Client: <span className="font-semibold text-foreground">{c.customerName}</span> · Project: <span className="font-bold text-forest">{c.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-semibold">Engineers: {c.assignedEngineers.join(", ")}</div>
                    <div className="text-xs font-mono font-bold text-forest-deep mt-0.5">Cost: ₦{c.cost.toLocaleString()}</div>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.paymentType === "Installment"
                          ? c.paymentStatus === "Fully Paid"
                            ? "bg-emerald-500/10 text-emerald"
                            : "bg-amber-500/10 text-amber-600"
                          : "bg-slate-100 text-muted-foreground"
                      }`}>
                        {c.paymentType === "Installment"
                          ? `Installment Plan (${c.paymentStatus}): ₦${(c.amountPaid || 0).toLocaleString()} Paid`
                          : "Full Payment Plan"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-6 items-center text-center">
                  {steps.map((step, idx) => {
                    const isDone = idx < activeIdx;
                    const isCurrent = idx === activeIdx;
                    return (
                      <div key={step} className="space-y-2 flex flex-col items-center">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone ? "bg-forest text-white" :
                          isCurrent ? "bg-emerald text-forest-deep animate-pulse shadow-glow-soft" :
                          "bg-mist text-muted-foreground border border-border"
                        }`}>
                          {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider block ${
                          isCurrent ? "text-forest-deep font-bold" : "text-muted-foreground"
                        }`}>
                          {step.replace(" & Calibration", "").replace(" Approved", "")}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Installment History Segment */}
                {c.paymentType === "Installment" && c.paymentHistory && c.paymentHistory.length > 0 && (
                  <div className="bg-mist/30 border border-border/50 rounded-2xl p-4 space-y-2 mt-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-emerald" />
                      Installment Payment Logs (₦{((c.amountPaid || 0) / c.cost * 100).toFixed(0)}% paid)
                    </div>
                    <div className="divide-y divide-border/40 text-xs">
                      {c.paymentHistory.map(pmt => (
                        <div key={pmt.id} className="py-2 flex justify-between items-center font-medium">
                          <div>
                            <span className="font-semibold text-foreground">₦{pmt.amount.toLocaleString()}</span>
                            <span className="text-muted-foreground ml-2 text-[10px]">via {pmt.paymentMethod}</span>
                            {pmt.notes && <span className="text-muted-foreground text-[10px] italic block mt-0.5">{pmt.notes}</span>}
                          </div>
                          <span className="font-mono text-muted-foreground text-[10px]">{pmt.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stepper advancement controls */}
                <div className="flex justify-end items-center gap-3 pt-2">
                  {c.paymentType === "Installment" && c.paymentStatus !== "Fully Paid" && !isCompleted && (
                    <button
                      onClick={() => {
                        setPaymentModal(c);
                        setPaymentForm({
                          amount: Math.min(100000, c.cost - (c.amountPaid || 0)),
                          paymentMethod: "Bank Transfer",
                          notes: ""
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-700 px-4 py-2 text-xs font-bold transition cursor-pointer"
                    >
                      <DollarSign className="h-3.5 w-3.5" />
                      Log Installment Payment
                    </button>
                  )}
                  {isCompleted ? (
                    <span className="text-xs font-semibold text-emerald bg-emerald-soft/50 rounded px-2.5 py-1">
                      Conversion Complete (Handed Over & Invoiced)
                    </span>
                  ) : (
                    <button
                      onClick={() => advanceConversionStep(c.id, c.status)}
                      className="inline-flex items-center gap-1 rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
                    >
                      Advance to Next Step
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Log Installment Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-3xl border border-border p-6 shadow-2xl animate-scale-in space-y-4 text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-1.5">
                <DollarSign className="h-5 w-5 text-emerald" />
                Log Installment Payment
              </h3>
              <button
                onClick={() => setPaymentModal(null)}
                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-mist/30 p-3 rounded-2xl border border-border/50 text-xs space-y-1">
              <div>Customer: <strong className="text-foreground">{paymentModal.customerName}</strong></div>
              <div>Vehicle: <strong className="text-foreground">{paymentModal.vehiclePlate}</strong></div>
              <div>Total Package Cost: <strong className="text-foreground">₦{paymentModal.cost.toLocaleString()}</strong></div>
              <div>Already Paid: <strong className="text-emerald">₦{(paymentModal.amountPaid || 0).toLocaleString()}</strong></div>
              <div>Outstanding Balance: <strong className="text-red-500">₦{(paymentModal.cost - (paymentModal.amountPaid || 0)).toLocaleString()}</strong></div>
            </div>

            <form onSubmit={handleLogInstallmentSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Payment Amount (₦)</label>
                <input
                  type="number"
                  required
                  max={paymentModal.cost - (paymentModal.amountPaid || 0)}
                  min={1}
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Payment Method</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-semibold text-foreground"
                >
                  <option value="Bank Transfer">Bank Transfer (Direct Deposit)</option>
                  <option value="Cash">Cash Payment</option>
                  <option value="POS Terminal">POS Card Terminal</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Cashier Remarks / Transaction Ref</label>
                <input
                  type="text"
                  placeholder="e.g. UBA Transfer Ref: #908472 or Receipt #0452"
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModal(null)}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted transition cursor-pointer text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
                >
                  Post Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
