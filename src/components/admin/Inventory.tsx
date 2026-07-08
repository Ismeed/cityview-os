import { useState, useEffect } from "react";
import { ERPStore, InventoryItem } from "./mockData";
import { Search, Plus, Boxes, ShieldAlert, FileText, ShoppingCart, RefreshCw, Barcode } from "lucide-react";
import { toast } from "sonner";

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => ERPStore.getInventory());
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");

  // Keep list updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setInventory(ERPStore.getInventory());
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);
  
  // Forms states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "CNG Kits" as InventoryItem["category"],
    stockLevel: 10,
    minStockLevel: 5,
    unitPrice: 15000,
    supplier: ""
  });

  const [scanning, setScanning] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: InventoryItem = {
      id: `INV-${newItem.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
      name: newItem.name,
      category: newItem.category,
      stockLevel: Number(newItem.stockLevel),
      minStockLevel: Number(newItem.minStockLevel),
      unitPrice: Number(newItem.unitPrice),
      supplier: newItem.supplier || "Local Vendor"
    };

    const updated = [...inventory, newEntry];
    setInventory(updated);
    ERPStore.saveInventory(updated);
    ERPStore.addAuditLog("Inventory Officer", "Inventory Officer", "Create Inventory Item", `Added new stock item ${newItem.name} into registry.`);

    toast.success("Item Added", {
      description: `${newItem.name} registered under ${newItem.category}.`
    });

    setNewItem({
      name: "",
      category: "CNG Kits",
      stockLevel: 10,
      minStockLevel: 5,
      unitPrice: 15000,
      supplier: ""
    });
    setShowAddForm(false);
  };

  const restockItem = (id: string, qty: number) => {
    const updated = inventory.map(item => {
      if (item.id === id) {
        // Record Expense Transaction
        const expenseCost = item.unitPrice * 0.7 * qty; // wholesale rate is 70% of retail unit price
        const transactions = ERPStore.getTransactions();
        const newTransaction = {
          id: `TR-${Date.now().toString().slice(-4)}`,
          type: "Expense" as const,
          amount: expenseCost,
          category: "Parts Purchase" as const,
          description: `Restocked ${qty} units of ${item.name} from ${item.supplier}`,
          branch: "Katsina HQ",
          date: new Date().toISOString().split("T")[0]
        };
        ERPStore.saveTransactions([newTransaction, ...transactions]);

        return { ...item, stockLevel: item.stockLevel + qty };
      }
      return item;
    });

    setInventory(updated);
    ERPStore.saveInventory(updated);
    ERPStore.addAuditLog("Inventory Officer", "Inventory Officer", "Restock Item", `Restocked item ID ${id} with ${qty} units.`);
    
    toast.success("Inventory Restocked", {
      description: `Stock level successfully incremented and expense transaction logged.`
    });
  };

  const simulateBarcodeScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Pick a random item to increment/decrement or display details
      const randomItem = inventory[Math.floor(Math.random() * inventory.length)];
      toast.success("Barcode Scanned Successfully", {
        description: `Recognized product: ${randomItem.name} (${randomItem.id}). Stock: ${randomItem.stockLevel} units remaining.`
      });
    }, 1500);
  };

  const filtered = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === "ALL" || item.category === catFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Inventory & Supply Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track spare parts, CNG sequential kits, cylinders, engine oils, reorder alerts, and simulate barcode scanning.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={simulateBarcodeScan}
            disabled={scanning}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-mist transition disabled:opacity-50 cursor-pointer"
          >
            <Barcode className="h-4 w-4 text-muted-foreground" />
            {scanning ? "Scanning..." : "Scan Barcode"}
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Register Stock Item
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddItem} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Register New Inventory Asset</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Item Name</label>
              <input
                type="text"
                required
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. 90L Lightweight Cylinders"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="CNG Kits">CNG Sequential Kits</option>
                <option value="Cylinders">Seamless Cylinders</option>
                <option value="Spare Parts">Spare Parts (Brakes, Cables)</option>
                <option value="Engine Oil">Engine Oil & Lubricants</option>
                <option value="Tyres">Heavy Tyres</option>
                <option value="Filters">Filters (Air, Oil, Gas)</option>
                <option value="Tools">Workshop Tools</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Initial Stock Level</label>
              <input
                type="number"
                required
                value={newItem.stockLevel}
                onChange={(e) => setNewItem(prev => ({ ...prev, stockLevel: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Minimum Alert Level</label>
              <input
                type="number"
                required
                value={newItem.minStockLevel}
                onChange={(e) => setNewItem(prev => ({ ...prev, minStockLevel: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Retail Unit Price (₦)</label>
              <input
                type="number"
                required
                value={newItem.unitPrice}
                onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Default Supplier Name</label>
              <input
                type="text"
                required
                value={newItem.supplier}
                onChange={(e) => setNewItem(prev => ({ ...prev, supplier: e.target.value }))}
                placeholder="e.g. TVS Parts Lagos"
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
              Add Stock
            </button>
          </div>
        </form>
      )}

      {/* Roster & Filters */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part name or item ID..."
              className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
            />
          </div>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white w-full md:w-48"
          >
            <option value="ALL">All Categories</option>
            <option value="CNG Kits">CNG Sequential Kits</option>
            <option value="Cylinders">Seamless Cylinders</option>
            <option value="Spare Parts">Spare Parts</option>
            <option value="Engine Oil">Engine Oil</option>
            <option value="Tyres">Heavy Tyres</option>
            <option value="Filters">Filters</option>
            <option value="Tools">Workshop Tools</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-border/70 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                <th className="p-4">Item ID</th>
                <th className="p-4">Item Name / Category</th>
                <th className="p-4 text-right">Current Stock Level</th>
                <th className="p-4 text-right">Min Alert Threshold</th>
                <th className="p-4 text-right">Retail Unit Cost</th>
                <th className="p-4">Supplier</th>
                <th className="p-4 text-center">Alert Status</th>
                <th className="p-4 text-right">Quick Restock Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(item => {
                const isLow = item.stockLevel <= item.minStockLevel;
                return (
                  <tr key={item.id} className="hover:bg-mist/10 transition">
                    <td className="p-4 font-mono font-bold text-forest">{item.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-foreground">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.category}</div>
                    </td>
                    <td className="p-4 text-right font-semibold font-mono">{item.stockLevel} units</td>
                    <td className="p-4 text-right font-mono text-muted-foreground">{item.minStockLevel} units</td>
                    <td className="p-4 text-right font-mono font-bold text-forest-deep">
                      ₦{item.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-4 text-muted-foreground font-semibold">{item.supplier}</td>
                    <td className="p-4 text-center">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 uppercase tracking-wider animate-pulse">
                          <ShieldAlert className="h-2.5 w-2.5" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-soft text-forest-deep px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          Healthy
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => restockItem(item.id, 10)}
                          className="rounded-lg bg-emerald-soft text-forest-deep hover:bg-emerald hover:text-white px-2.5 py-1 text-[10px] font-bold transition cursor-pointer"
                        >
                          Order +10
                        </button>
                        <button
                          onClick={() => restockItem(item.id, 50)}
                          className="rounded-lg border border-border bg-white hover:bg-mist px-2.5 py-1 text-[10px] font-bold text-charcoal transition cursor-pointer"
                        >
                          Bulk Order
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
