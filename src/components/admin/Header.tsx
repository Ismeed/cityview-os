import { useState, useEffect } from "react";
import { 
  Bell, 
  Clock, 
  MapPin, 
  Shield, 
  Sparkles, 
  ChevronDown, 
  LogOut,
  User,
  Settings
} from "lucide-react";
import { ERPStore } from "./mockData";

interface HeaderProps {
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  onLogout: () => void;
}

export function Header({
  selectedBranch,
  setSelectedBranch,
  selectedRole,
  setSelectedRole,
  onLogout
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showBranchSelector, setShowBranchSelector] = useState(false);

  // Load inventory alerts
  const inventory = ERPStore.getInventory();
  const lowStockCount = inventory.filter(i => i.stockLevel <= i.minStockLevel).length;

  // Load hire purchase contracts with missed remittance
  const hpContracts = ERPStore.getHPContracts();
  const missedRemittanceCount = hpContracts.filter(c => c.status === "Missed Remittance").length;

  const totalAlerts = lowStockCount + missedRemittanceCount;

  // Update clock every minute
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setCurrentTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles = [
    "Managing Director (CEO)",
    "Executive Director",
    "Branch Manager",
    "Operations Manager",
    "Workshop Manager",
    "Fleet Manager",
    "Cashier",
    "Accountant",
    "HR Manager",
    "Customer Service",
    "Inventory Officer",
    "Technician",
    "System Administrator"
  ];

  const branches = [
    { id: "ALL", name: "Global Enterprise" },
    { id: "BR-KT", name: "Katsina HQ" },
    { id: "BR-GB", name: "Gombe Hub" }
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-border bg-white px-8 shadow-soft">
      {/* Search / Title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">CityView Digital HQ</h1>
          <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground">
            Enterprise Operations System (ERP)
          </p>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-5">
        {/* Time Widget */}
        <div className="hidden items-center gap-2 rounded-2xl bg-mist/60 px-4 py-2 text-xs font-semibold text-charcoal md:flex">
          <Clock className="h-4 w-4 text-forest" />
          <span>Katsina/Lagos: <span className="font-mono text-forest-deep">{currentTime}</span></span>
        </div>

        {/* Global Branch Filter */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowBranchSelector(!showBranchSelector);
              setShowRoleSelector(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-xs font-semibold text-charcoal hover:bg-mist/40 transition"
          >
            <MapPin className="h-4 w-4 text-emerald" />
            <span>
              {selectedBranch === "ALL" 
                ? "Global Hubs" 
                : branches.find(b => b.id === selectedBranch)?.name || selectedBranch}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          
          {showBranchSelector && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-white p-2 shadow-elevated animate-fade-down z-50">
              <span className="block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
                Select Active Hub
              </span>
              {branches.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBranch(b.id);
                    setShowBranchSelector(false);
                  }}
                  className={`w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition ${
                    selectedBranch === b.id 
                      ? "bg-forest-deep text-white" 
                      : "text-muted-foreground hover:bg-mist hover:text-foreground"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Role Switcher (RBAC Simulator) */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowRoleSelector(!showRoleSelector);
              setShowBranchSelector(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-2xl bg-emerald-soft/60 px-4 py-2 text-xs font-bold text-forest-deep hover:bg-emerald-soft transition border border-emerald/15"
          >
            <Shield className="h-4 w-4 text-forest" />
            <span>Role: {selectedRole}</span>
            <ChevronDown className="h-3 w-3 text-forest" />
          </button>

          {showRoleSelector && (
            <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border border-border bg-white p-2 shadow-elevated animate-fade-down z-50">
              <span className="block px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
                Simulate System Permission
              </span>
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRole(r);
                    setShowRoleSelector(false);
                    ERPStore.addAuditLog("System Admin", "Super Administrator", "RBAC Change Simulation", `Changed active simulation role to: ${r}`);
                  }}
                  className={`w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition ${
                    selectedRole === r 
                      ? "bg-emerald text-forest-deep font-bold" 
                      : "text-muted-foreground hover:bg-mist hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowBranchSelector(false);
              setShowRoleSelector(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white hover:bg-mist/30 transition text-charcoal"
          >
            <Bell className="h-5 w-5" />
            {totalAlerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-md animate-pulse">
                {totalAlerts}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-3xl border border-border bg-white p-4 shadow-elevated animate-fade-down z-50">
              <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                <span className="text-xs font-bold text-foreground">Critical Operations Alerts</span>
                {totalAlerts > 0 && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                    {totalAlerts} Action items
                  </span>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2.5">
                {totalAlerts === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    <Sparkles className="h-6 w-6 text-emerald mx-auto mb-2 opacity-50" />
                    All operational loops are clean.
                  </div>
                ) : (
                  <>
                    {/* Low Stock Alerts */}
                    {inventory.filter(i => i.stockLevel <= i.minStockLevel).map(item => (
                      <div key={item.id} className="rounded-xl bg-red-50/40 border border-red-100 p-2.5 text-xs text-foreground flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 mt-1 shrink-0" />
                        <div>
                          <div className="font-bold">Low Stock Warning</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {item.name} is down to <span className="font-bold text-red-600">{item.stockLevel} units</span> (min: {item.minStockLevel}).
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Missed Remittance Alerts */}
                    {hpContracts.filter(c => c.status === "Missed Remittance").map(c => {
                      const driver = ERPStore.getDrivers().find(d => d.id === c.driverId);
                      return (
                        <div key={c.id} className="rounded-xl bg-amber-50/40 border border-amber-100 p-2.5 text-xs text-foreground flex gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                          <div>
                            <div className="font-bold">Missed HP Remittance</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">
                              Driver <span className="font-semibold">{driver?.name || c.driverId}</span> ({c.id}) missed yesterday's daily target.
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 border-l border-border pl-5">
          <div className="hidden text-right md:block">
            <div className="text-xs font-bold text-foreground">Admin Desk</div>
            <div className="text-[9px] font-bold text-emerald uppercase tracking-wider">CityView Synergy</div>
          </div>
          <button 
            onClick={onLogout}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 hover:bg-ink/10 transition text-muted-foreground hover:text-red-500"
            title="Return to Public Site"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
