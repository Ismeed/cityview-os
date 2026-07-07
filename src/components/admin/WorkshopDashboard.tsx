import { useState } from "react";
import { ERPStore, JobCard, CNGConversion, Employee } from "./mockData";
import { 
  TrendingUp, 
  Wrench, 
  Settings, 
  FileCheck, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Sliders, 
  Plus, 
  FileText,
  Activity,
  WrenchScrewdriver
} from "lucide-react";
import { toast } from "sonner";

interface WorkshopDashboardProps {
  branchName: string;
}

export function WorkshopDashboard({ branchName }: WorkshopDashboardProps) {
  const [jobCards] = useState<JobCard[]>(ERPStore.getJobCards());
  const [conversions] = useState<CNGConversion[]>(ERPStore.getConversions());
  const [employees] = useState<Employee[]>(ERPStore.getEmployees());
  const [transactions] = useState(() => ERPStore.getTransactions());

  // Metrics calculations
  const awaitingInspection = jobCards.filter(j => j.status === "Inspecting").length +
                             conversions.filter(c => c.status === "Inspection").length;

  const underRepair = jobCards.filter(j => j.status === "Repairing" || j.status === "Diagnostics").length;
  
  const awaitingConversion = conversions.filter(c => 
    c.status === "Quotation Approved" || 
    c.status === "Installation" || 
    c.status === "Testing & Calibration"
  ).length;

  const completedJobsToday = jobCards.filter(j => j.status === "Completed" || j.status === "Handed Over").length;

  const pendingCollection = jobCards.filter(j => j.status === "Completed").length +
                            conversions.filter(c => c.status === "Certification").length;

  const workshopRevenue = transactions
    .filter(t => t.type === "Revenue" && (t.category === "Workshop Repairs" || t.category === "CNG Conversion"))
    .reduce((sum, t) => sum + t.amount, 0);

  const activeTechnicians = employees.filter(e => 
    (e.role === "Technician" || e.role === "Senior Technician") && e.status === "Active"
  ).length;

  const jobsInProgress = jobCards.filter(j => 
    j.status !== "Completed" && j.status !== "Handed Over"
  ).length;

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
        <h2 className="font-display text-3xl font-bold text-foreground">{branchName} Workshop Operations</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Automobile Diagnostics & CNG Conversion Workflow Management Dashboard.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Vehicles awaiting Conversion */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CNG Conversions</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-soft flex items-center justify-center text-forest-deep">
              <Activity className="h-5 w-5 text-forest" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{awaitingConversion} Active</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{awaitingInspection} awaiting diagnostic inspections</p>
          </div>
        </div>

        {/* Vehicles under Repair */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Repairs In-Progress</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{underRepair} Vehicles</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{jobsInProgress} total open repair tickets</p>
          </div>
        </div>

        {/* Revenue Today */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workshop Revenue</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(workshopRevenue)}</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>{completedJobsToday} jobs completed today</span>
            </div>
          </div>
        </div>

        {/* Active Technicians */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Staff</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{activeTechnicians} Technicians</h3>
            <p className="text-[10px] text-muted-foreground mt-1">{pendingCollection} vehicles awaiting handover collection</p>
          </div>
        </div>
      </div>

      {/* Secondary Details & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions Panel */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Workshop Actions</h4>
            <p className="text-[11px] text-muted-foreground">Initiate job cards, inspections, or technician schedules.</p>
          </div>
          
          <div className="grid gap-2">
            <button
              onClick={() => handleQuickAction("Create Inspection")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <FileCheck className="h-4 w-4 text-emerald group-hover:text-white shrink-0" />
              <span>Log Inspection Ticket</span>
            </button>
            <button
              onClick={() => handleQuickAction("Create Diagnosis")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <Sliders className="h-4 w-4 text-amber-500 group-hover:text-white shrink-0" />
              <span>Create Diagnostic Log</span>
            </button>
            <button
              onClick={() => handleQuickAction("Create Workshop Job")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <Plus className="h-4 w-4 text-blue-500 group-hover:text-white shrink-0" />
              <span>Open New Job Card</span>
            </button>
            <button
              onClick={() => handleQuickAction("Assign Technician")}
              className="flex items-center gap-3 w-full rounded-xl bg-mist/40 border border-border/50 p-3 text-xs font-semibold text-foreground hover:bg-forest hover:text-white transition group"
            >
              <UserCheck className="h-4 w-4 text-indigo-500 group-hover:text-white shrink-0" />
              <span>Assign Engineers</span>
            </button>
          </div>
        </div>

        {/* CNG Conversion Progress List */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <div>
              <h4 className="font-display font-bold text-base text-foreground">CNG Conversion Progress</h4>
              <p className="text-[11px] text-muted-foreground">Active CNG conversions in the queue.</p>
            </div>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {conversions.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                <Sliders className="h-8 w-8 text-emerald mx-auto opacity-50 mb-2" />
                No active CNG conversions.
              </div>
            ) : (
              conversions.map(c => (
                <div key={c.id} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{c.vehiclePlate} ({c.vehicleModel})</span>
                    <span className="text-[9px] font-bold text-emerald uppercase tracking-wider bg-emerald-soft px-1.5 py-0.5 rounded">
                      {c.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Kit: {c.cngKitType} ({c.cylinderSize})</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Workshop Activity */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Recent Repair Jobs</h4>
            <p className="text-[11px] text-muted-foreground">Recently updated workshop job cards.</p>
          </div>

          <div className="space-y-3.5">
            {jobCards.slice(0, 3).map(j => (
              <div key={j.id} className="text-xs border-b border-border/50 pb-2.5 last:border-0">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{j.date}</span>
                  <span className={`font-semibold uppercase ${j.status === "Completed" || j.status === "Handed Over" ? "text-emerald" : "text-amber-500"}`}>{j.status}</span>
                </div>
                <div className="mt-1 font-semibold text-foreground">
                  Vehicle: {j.vehiclePlate} ({j.vehicleModel})
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  Issue: {j.issueDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
