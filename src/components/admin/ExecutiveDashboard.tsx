import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle,
  FileDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  Users
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { ERPStore } from "./mockData";
import { toast } from "sonner";

interface ExecutiveDashboardProps {
  branchId: string;
}

export function ExecutiveDashboard({ branchId }: ExecutiveDashboardProps) {
  const [exporting, setExporting] = useState(false);

  // Load store datasets
  const rawTransactions = ERPStore.getTransactions();
  const rawVehicles = ERPStore.getVehicles();
  const rawConversions = ERPStore.getConversions();
  const rawContracts = ERPStore.getHPContracts();
  const rawEmployees = ERPStore.getEmployees();
  const rawBranches = ERPStore.getBranches();

  // Filter based on branchId
  const transactions = branchId === "ALL" 
    ? rawTransactions 
    : rawTransactions.filter(t => t.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub"));

  const vehicles = branchId === "ALL" 
    ? rawVehicles 
    : rawVehicles.filter(v => v.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub"));

  const conversions = branchId === "ALL" 
    ? rawConversions 
    : rawConversions.filter(c => {
        // Match engineers branch
        const vehicle = rawVehicles.find(v => v.plateNumber === c.vehiclePlate);
        return vehicle ? vehicle.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub") : true;
      });

  const hpContracts = branchId === "ALL" 
    ? rawContracts 
    : rawContracts.filter(c => {
        const vehicle = rawVehicles.find(v => v.id === c.vehicleId);
        return vehicle ? vehicle.branch === (branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub") : true;
      });

  const auditLogs = ERPStore.getAuditLogs();

  // Calculations
  const revenueVal = transactions
    .filter(t => t.type === "Revenue")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenseVal = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = revenueVal - expenseVal;
  const margin = revenueVal > 0 ? (netProfit / revenueVal) * 100 : 0;

  const onRoadCount = vehicles.filter(v => v.status === "On Road").length;
  const inWorkshopCount = vehicles.filter(v => v.status === "In Workshop").length;
  const totalConversions = conversions.length;
  
  const totalHPOustanding = hpContracts
    .filter(c => c.status !== "Completed")
    .reduce((acc, curr) => acc + (curr.totalAmount - curr.balancePaid), 0);

  // Formatting currency
  const formatNaira = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0
    }).format(value);
  };

  // ── Monthly Financial Performance Chart ─────────────────────────────────────
  // Build monthly aggregates from actual transaction records.
  // We show the last 6 calendar months (oldest → newest) so the chart always
  // reflects the real data that has been entered into the system.
  const buildMonthlyData = () => {
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const months: { name: string; key: string; Revenue: number; Expense: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push({ name: MONTH_NAMES[d.getMonth()], key, Revenue: 0, Expense: 0 });
    }

    transactions.forEach(t => {
      if (!t.date || typeof t.date !== "string") return;
      // date is stored as "YYYY-MM-DD"
      const monthKey = t.date.slice(0, 7);
      const slot = months.find(m => m.key === monthKey);
      if (!slot) return;
      if (t.type === "Revenue") slot.Revenue += t.amount;
      else if (t.type === "Expense") slot.Expense += t.amount;
    });

    return months.map(({ name, Revenue, Expense }) => ({ name, Revenue, Expense }));
  };
  const monthlyData = buildMonthlyData();

  // ── Branch Comparison Bar Chart ──────────────────────────────────────────────
  const branchData = [
    {
      name: "Katsina HQ",
      Revenue: rawTransactions.filter(t => t.branch === "Katsina HQ" && t.type === "Revenue").reduce((a, b) => a + b.amount, 0),
      Expense: rawTransactions.filter(t => t.branch === "Katsina HQ" && t.type === "Expense").reduce((a, b) => a + b.amount, 0)
    },
    {
      name: "Gombe Hub",
      Revenue: rawTransactions.filter(t => t.branch === "Gombe Hub" && t.type === "Revenue").reduce((a, b) => a + b.amount, 0),
      Expense: rawTransactions.filter(t => t.branch === "Gombe Hub" && t.type === "Expense").reduce((a, b) => a + b.amount, 0)
    }
  ];

  // ── Branch Yield Rankings ────────────────────────────────────────────────────
  // Calculate revenue per branch from live data; rank by highest revenue.
  const branchRevenues = rawBranches
    .filter(b => b.status === "Active")
    .map(b => ({
      name: `${b.name} (Active)`,
      revenue: rawTransactions
        .filter(t => t.branch === b.name && t.type === "Revenue")
        .reduce((a, t) => a + t.amount, 0)
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const upcomingBranches = rawBranches
    .filter(b => b.status === "Upcoming")
    .slice(0, 2)
    .map(b => ({ name: `${b.name} (Upcoming)`, revenue: 0 }));

  const branchRankings = [...branchRevenues, ...upcomingBranches];
  const maxBranchRevenue = branchRankings[0]?.revenue || 1;

  // ── Top Performing Technicians ───────────────────────────────────────────────
  // Count completed job cards per technician from the job cards store.
  const rawJobCards = ERPStore.getJobCards();
  const techJobCounts: Record<string, number> = {};
  rawJobCards
    .filter(j => j.status === "Completed")
    .forEach(j => {
      techJobCounts[j.assignedTechnicianId] = (techJobCounts[j.assignedTechnicianId] || 0) + 1;
    });

  const topTechnicians = rawEmployees
    .filter(e => e.department === "Technical")
    .map(e => ({
      id: e.id,
      name: e.name,
      role: e.role,
      branch: e.branch,
      jobs: techJobCounts[e.id] || 0
    }))
    .sort((a, b) => b.jobs - a.jobs)
    .slice(0, 3);

  // ── KPI Trend Badges ─────────────────────────────────────────────────────────
  // Compare current month revenue/expense vs previous month.
  const MONTH_KEYS = Array.from({ length: 2 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const currentMonthRev = transactions
    .filter(t => t.type === "Revenue" && t.date && typeof t.date === "string" && t.date.startsWith(MONTH_KEYS[0]))
    .reduce((a, t) => a + t.amount, 0);
  const prevMonthRev = transactions
    .filter(t => t.type === "Revenue" && t.date && typeof t.date === "string" && t.date.startsWith(MONTH_KEYS[1]))
    .reduce((a, t) => a + t.amount, 0);
  const revTrend = prevMonthRev > 0
    ? (((currentMonthRev - prevMonthRev) / prevMonthRev) * 100).toFixed(1)
    : null;

  const currentMonthExp = transactions
    .filter(t => t.type === "Expense" && t.date && typeof t.date === "string" && t.date.startsWith(MONTH_KEYS[0]))
    .reduce((a, t) => a + t.amount, 0);
  const prevMonthExp = transactions
    .filter(t => t.type === "Expense" && t.date && typeof t.date === "string" && t.date.startsWith(MONTH_KEYS[1]))
    .reduce((a, t) => a + t.amount, 0);
  const expTrend = prevMonthExp > 0
    ? (((currentMonthExp - prevMonthExp) / prevMonthExp) * 100).toFixed(1)
    : null;

  const handleExport = (format: "PDF" | "CSV") => {
    setExporting(true);
    
    setTimeout(() => {
      setExporting(false);
      
      if (format === "CSV") {
        try {
          const headers = ["Transaction ID", "Type", "Amount (NGN)", "Category", "Description", "Branch", "Date"];
          const rows = transactions.map(t => [
            t.id,
            t.type,
            t.amount,
            t.category,
            t.description,
            t.branch,
            t.date
          ]);
          
          const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
          ].join("\n");
          
          const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", `CityView_Transactions_Ledger_${branchId}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast.success("CSV Ledger Downloaded", {
            description: `Ledger dataset contains ${transactions.length} recorded items.`
          });
        } catch (error) {
          toast.error("Export Failed", { description: "An error occurred compiling CSV stream." });
        }
      } else {
        // PDF Print Export
        try {
          const printWindow = window.open("", "_blank");
          if (!printWindow) {
            toast.error("Export Blocked", { description: "Please allow popups to open the PDF report print preview." });
            return;
          }
          
          printWindow.document.write(`
            <html>
              <head>
                <title>CityView Executive Boardroom Report</title>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1f2937; }
                  h1 { font-size: 26px; font-weight: 800; color: #0f2b1f; margin-bottom: 5px; }
                  .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #6b7280; font-weight: bold; margin-bottom: 30px; }
                  .meta { display: flex; justify-content: space-between; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 30px; font-size: 12px; color: #4b5563; }
                  .kpis { display: flex; gap: 20px; margin-bottom: 40px; }
                  .kpi-card { border: 1px solid #e5e7eb; padding: 20px; border-radius: 16px; flex: 1; background: #f9fafb; }
                  .kpi-title { font-size: 9px; font-weight: bold; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; }
                  .kpi-val { font-size: 22px; font-weight: 800; margin-top: 10px; color: #0f2b1f; font-family: monospace; }
                  table { width: 100%; border-collapse: collapse; margin-top: 30px; }
                  th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; font-size: 11px; }
                  th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
                  .footer { text-align: center; margin-top: 50px; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
                </style>
              </head>
              <body>
                <h1>CITYVIEW SYNERGY LIMITED</h1>
                <div class="subtitle">Executive Operations Boardroom Summary</div>
                
                <div class="meta">
                  <div><strong>Active Scope:</strong> ${branchId === "ALL" ? "Global Hub Roster" : branchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub"}</div>
                  <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
                </div>
                
                <div class="kpis">
                  <div class="kpi-card">
                    <div class="kpi-title">Gross Revenue</div>
                    <div class="kpi-val">${formatNaira(revenueVal)}</div>
                  </div>
                  <div class="kpi-card">
                    <div class="kpi-title">Operating Expenses</div>
                    <div class="kpi-val">${formatNaira(expenseVal)}</div>
                  </div>
                  <div class="kpi-card">
                    <div class="kpi-title">Net Financial Profit</div>
                    <div class="kpi-val">${formatNaira(netProfit)}</div>
                  </div>
                </div>

                <h2>Key Performance Metrics</h2>
                <p>Vehicles Onboarded: <strong>${vehicles.length}</strong> | Undergoing conversion/service: <strong>${inWorkshopCount}</strong> | Total CNG Conversions: <strong>${totalConversions}</strong></p>

                <h2>Audit and Operations Log</h2>
                <table>
                  <thead>
                    <tr>
                      <th style="width: 15%">Timestamp</th>
                      <th style="width: 20%">User</th>
                      <th style="width: 20%">Action</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${auditLogs.slice(0, 10).map(log => `
                      <tr>
                        <td>${log.timestamp}</td>
                        <td><strong>${log.user}</strong></td>
                        <td>${log.action}</td>
                        <td>${log.details}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>

                <div class="footer">
                  CityView Digital ERP System (V1.0 Branch Operations) · Confidential Business Analytics
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 250);
          
          toast.success("Executive PDF Generated", {
            description: "Established printer page interface layout."
          });
        } catch (error) {
          toast.error("Export Failed", { description: "An error occurred preparing report printing." });
        }
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Exports */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Executive Boardroom</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time financial status, branch efficiency levels, and clean mobility performance indicators.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("PDF")}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition disabled:opacity-50"
          >
            <FileDown className="h-4 w-4 text-muted-foreground" />
            Export Board PDF
          </button>
          <button
            onClick={() => handleExport("CSV")}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft disabled:opacity-50"
          >
            <FileDown className="h-4 w-4" />
            Download CSV Ledger
          </button>
        </div>
      </div>

      {/* KPI Dashboard Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Revenue</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-soft flex items-center justify-center text-forest-deep">
              <DollarSign className="h-5 w-5 text-forest" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(revenueVal)}</h3>
            <div className={`flex items-center gap-1 text-[10px] font-bold mt-2 ${revTrend !== null && Number(revTrend) >= 0 ? "text-emerald" : "text-red-500"}`}>
              {revTrend !== null && Number(revTrend) >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{revTrend !== null ? `${Number(revTrend) >= 0 ? "+" : ""}${revTrend}% vs last month` : "Current month"}</span>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Expenses</span>
            <div className="h-9 w-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <TrendingDown className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(expenseVal)}</h3>
            <div className={`flex items-center gap-1 text-[10px] font-bold mt-2 ${expTrend !== null && Number(expTrend) <= 0 ? "text-emerald" : "text-red-500"}`}>
              {expTrend !== null && Number(expTrend) <= 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
              <span>{expTrend !== null ? `${Number(expTrend) >= 0 ? "+" : ""}${expTrend}% vs last month` : "Current month"}</span>
            </div>
          </div>
        </div>

        {/* Net Profit Card */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Net Cash Flow</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(netProfit)}</h3>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 mt-2 bg-indigo-50/50 rounded px-1.5 py-0.5 w-fit">
              <span>Profit Margin: {margin.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Hire Purchase Outstanding Card */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Outstanding HP Balance</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-foreground">{formatNaira(totalHPOustanding)}</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-2">
              <span>{hpContracts.length} Active Contracts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald/10 flex items-center justify-center text-forest-deep shrink-0">
            <Truck className="h-6 w-6 text-forest" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Vehicles Onboarded</div>
            <div className="font-display text-xl font-bold text-foreground">{vehicles.length} Tricycles</div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <Wrench className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Vehicles in Workshop</div>
            <div className="font-display text-xl font-bold text-foreground">{inWorkshopCount}</div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-mist/20 p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total Conversions</div>
            <div className="font-display text-xl font-bold text-foreground">{totalConversions} Completed</div>
          </div>
        </div>
      </div>

      {/* Recharts Graphical Visuals Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cash Flow Area Chart */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-display font-bold text-base text-foreground">Monthly Financial Performance</h4>
              <p className="text-[11px] text-muted-foreground">Monthly flow comparison of revenues and operating expenses.</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-soft text-forest-deep uppercase">Nigeria Ledger</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: "white", borderRadius: "16px", border: "1px solid var(--color-border)", fontSize: "12px" }}
                  formatter={(val) => [`₦${(Number(val) / 1000).toFixed(0)}k`, ""]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Area type="monotone" dataKey="Revenue" stroke="var(--color-forest)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Distribution Bar Chart */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-display font-bold text-base text-foreground">Hub Revenue Comparison</h4>
              <p className="text-[11px] text-muted-foreground">Katsina HQ vs Gombe Hub financial comparison.</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "16px", border: "1px solid var(--color-border)", fontSize: "12px" }}
                  formatter={(val) => [`₦${(Number(val) / 1000).toFixed(0)}k`, ""]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "15px" }} />
                <Bar dataKey="Revenue" fill="var(--color-forest)" radius={[8, 8, 0, 0]} barSize={25} />
                <Bar dataKey="Expense" fill="#9ca3af" radius={[8, 8, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rankings, Logs & Tasks Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Branch Rankings & Top Technicians */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-6">
          <div>
            <h4 className="font-display font-bold text-base text-foreground">Performance Rankings</h4>
            <p className="text-[11px] text-muted-foreground">Ranking of hubs and field technicians based on output.</p>
          </div>

          <div className="space-y-4">
            {/* Branch Yield — computed from live transaction data */}
            <div className="border-b border-border/50 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">Branch Yield Rating</span>
              <div className="space-y-3">
                {branchRankings.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="w-1/3 font-semibold text-foreground truncate pr-1">{item.name}</div>
                    <div className="w-1/2 bg-mist/60 h-2 rounded-full overflow-hidden mx-4">
                      <div
                        className="bg-forest h-full rounded-full transition-all duration-700"
                        style={{ width: `${maxBranchRevenue > 0 ? (item.revenue / maxBranchRevenue) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="w-1/6 text-right font-bold text-forest-deep">
                      {item.revenue > 0 ? formatNaira(item.revenue) : "TBD"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technicians — ranked by completed job cards */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">Top Performing Technicians</span>
              <div className="space-y-3">
                {topTechnicians.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No technician job data recorded yet.</p>
                ) : (
                  topTechnicians.map((tech, idx) => (
                    <div key={tech.id} className="flex items-center justify-between text-xs rounded-xl border border-border/40 p-2.5 hover:bg-mist/30 transition">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-soft flex items-center justify-center font-bold text-forest-deep text-[11px]">
                          {tech.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{tech.name}</div>
                          <div className="text-[10px] text-muted-foreground">{tech.role} · {tech.branch}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-forest">{tech.jobs} Job{tech.jobs !== 1 ? "s" : ""}</div>
                        <div className="text-amber-500 text-[10px]">
                          {idx === 0 ? "★★★★★" : idx === 1 ? "★★★★☆" : "★★★☆☆"}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Audit Logs */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-display font-bold text-base text-foreground">Operational Audit Log</h4>
                <p className="text-[11px] text-muted-foreground">Historical records of operations entries (Last 4 actions).</p>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald border border-emerald/20 rounded px-1.5 py-0.5 bg-emerald-soft">
                <ShieldCheck className="h-3 w-3" /> Secure
              </span>
            </div>

            <div className="space-y-3.5">
              {auditLogs.slice(0, 4).map(log => (
                <div key={log.id} className="text-xs border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>{log.timestamp}</span>
                    <span className="font-mono bg-mist px-1.5 py-0.5 rounded text-charcoal">{log.id}</span>
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {log.user} ({log.role}) &mdash; <span className="text-forest-deep">{log.action}</span>
                  </div>
                  <p className="mt-0.5 text-muted-foreground text-[11px] leading-relaxed">
                    {log.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
