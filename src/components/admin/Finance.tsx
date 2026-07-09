import { useState, useEffect } from "react";
import { ERPStore, Transaction } from "./mockData";
import { Plus, Search, Filter, TrendingUp, TrendingDown, DollarSign, Wallet, CalendarDays, ArrowUpRight } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

export function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => ERPStore.getTransactions());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const getActiveBranchDefault = () => {
    if (typeof window !== "undefined") {
      const selected = localStorage.getItem("cityview_selected_branch") || "ALL";
      if (selected === "BR-GB") return "Gombe Hub";
    }
    return "Katsina HQ";
  };

  // Keep list updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setTransactions(ERPStore.getTransactions());
      setNewTrans(prev => ({ ...prev, branch: getActiveBranchDefault() }));
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);
  
  // Transaction entry form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrans, setNewTrans] = useState({
    type: "Revenue" as "Revenue" | "Expense",
    amount: 15000,
    category: "Other" as Transaction["category"],
    description: "",
    branch: getActiveBranchDefault()
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Transaction = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      type: newTrans.type,
      amount: Number(newTrans.amount),
      category: newTrans.category,
      description: newTrans.description,
      branch: newTrans.branch,
      date: new Date().toISOString().split("T")[0]
    };

    const updated = [newEntry, ...transactions];
    setTransactions(updated);
    ERPStore.saveTransactions(updated);
    ERPStore.addAuditLog("Accounting Team", "Accountant", "Log Transaction", `Recorded ${newTrans.type} of ₦${newTrans.amount} under ${newTrans.category}.`);

    toast.success("Transaction Logged", {
      description: `${newTrans.category} entry successfully registered in ledger.`
    });

    setNewTrans({
      type: "Revenue",
      amount: 15000,
      category: "Other",
      description: "",
      branch: "Katsina HQ"
    });
    setShowAddForm(false);
  };

  // Group revenues for pie chart
  const revenueSources = [
    { name: "CNG Conversions", value: transactions.filter(t => t.type === "Revenue" && t.category === "CNG Conversion").reduce((sum, t) => sum + t.amount, 0) },
    { name: "Hire Purchase", value: transactions.filter(t => t.type === "Revenue" && t.category === "Hire Purchase").reduce((sum, t) => sum + t.amount, 0) },
    { name: "Workshop Repairs", value: transactions.filter(t => t.type === "Revenue" && t.category === "Workshop Repairs").reduce((sum, t) => sum + t.amount, 0) },
    { name: "Fleet Remittances", value: transactions.filter(t => t.type === "Revenue" && (t.category === "Fleet Remittance" || t.category === "Other")).reduce((sum, t) => sum + t.amount, 0) }
  ].filter(source => source.value > 0);

  const COLORS = ["var(--color-forest)", "var(--color-emerald)", "var(--color-blue-accent)", "#f59e0b"];

  const totalRevenue = transactions.filter(t => t.type === "Revenue").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalRevenue - totalExpense;

  const filtered = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "ALL" || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">General Ledger & Accounts</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Revenues, operating costs, branch cash flow distributions, and double-entry transaction record logs.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Record Entry
        </button>
      </div>

      {/* Record transaction form */}
      {showAddForm && (
        <form onSubmit={handleAddTransaction} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Record Financial Entry</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Transaction Type</label>
              <select
                value={newTrans.type}
                onChange={(e) => setNewTrans(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-semibold"
              >
                <option value="Revenue">Revenue (Incoming Cash)</option>
                <option value="Expense">Expense (Outgoing Cost)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Transaction Value (₦)</label>
              <input
                type="number"
                required
                value={newTrans.amount}
                onChange={(e) => setNewTrans(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Transaction Category</label>
              <select
                value={newTrans.category}
                onChange={(e) => setNewTrans(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                {newTrans.type === "Revenue" ? (
                  <>
                    <option value="CNG Conversion">CNG Conversion</option>
                    <option value="Hire Purchase">Hire Purchase</option>
                    <option value="Workshop Repairs">Workshop Repairs</option>
                    <option value="Fleet Remittance">Fleet Remittance</option>
                    <option value="Other">Other Revenue</option>
                  </>
                ) : (
                  <>
                    <option value="Salaries">Salaries & Wages</option>
                    <option value="Parts Purchase">Parts Restock</option>
                    <option value="Fuel">Generator / Patrol Fuel</option>
                    <option value="Rent & Utilities">Rent / Utilities</option>
                    <option value="Other">Other Expenses</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Operating Hub Branch</label>
              <select
                value={newTrans.branch}
                onChange={(e) => setNewTrans(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Katsina HQ">Katsina HQ</option>
                <option value="Gombe Hub">Gombe Hub</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Narration / Description</label>
              <input
                type="text"
                required
                value={newTrans.description}
                onChange={(e) => setNewTrans(prev => ({ ...prev, description: e.target.value }))}
                placeholder="e.g. Completed petrol to CNG cylinder sequential conversion deposit..."
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
            >
              Post Transaction
            </button>
          </div>
        </form>
      )}

      {/* Financial metrics summary cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Revenues (Ledger Total)</span>
            <TrendingUp className="h-5 w-5 text-forest" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mt-4">₦{totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expenses (Ledger Total)</span>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mt-4">₦{totalExpense.toLocaleString()}</h3>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Net P&L Balance</span>
            <Wallet className="h-5 w-5 text-indigo-500" />
          </div>
          <h3 className={`font-display text-2xl font-bold mt-4 ${netProfit >= 0 ? "text-forest-deep" : "text-red-500"}`}>
            ₦{netProfit.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Recharts Revenue Stream Donut & Roster grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Pie Chart */}
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft flex flex-col items-center">
          <div className="w-full text-left mb-4">
            <h4 className="font-display font-bold text-base text-foreground">Revenue Stream Contributions</h4>
            <p className="text-[11px] text-muted-foreground">Percentage contributions of operating channels.</p>
          </div>

          <div className="h-64 w-full relative">
            {revenueSources.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No revenues logged</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {revenueSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ledger list */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h4 className="font-display font-bold text-base text-foreground">Double-Entry Ledger Records</h4>
              <p className="text-[11px] text-muted-foreground">Chronological postings of incoming/outgoing flows.</p>
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ledger..."
                  className="rounded-full border border-border pl-8 pr-3 py-1.5 text-[10px] focus:outline-emerald bg-white"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-xl border border-border px-2.5 py-1 text-[10px] focus:outline-emerald bg-white"
              >
                <option value="ALL">All Entries</option>
                <option value="Revenue">Revenues</option>
                <option value="Expense">Expenses</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-border/70 rounded-2xl max-h-80">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                  <th className="p-3">ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Narration / Branch</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map(t => (
                  <tr key={t.id} className="hover:bg-mist/10 transition">
                    <td className="p-3 font-mono font-bold text-forest">{t.id}</td>
                    <td className="p-3 text-muted-foreground font-semibold">{t.date}</td>
                    <td className="p-3">
                      <div className="font-semibold text-foreground">{t.description}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">{t.branch}</div>
                    </td>
                    <td className="p-3">
                      <span className="inline-block rounded bg-mist px-1.5 py-0.5 text-[9px] font-bold text-charcoal">
                        {t.category}
                      </span>
                    </td>
                    <td className={`p-3 text-right font-mono font-bold ${
                      t.type === "Revenue" ? "text-forest-deep" : "text-red-500"
                    }`}>
                      {t.type === "Revenue" ? "+" : "-"}₦{t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
