import { useState, useEffect } from "react";
import { 
  Bell, 
  Clock, 
  MapPin, 
  Shield, 
  Sparkles, 
  ChevronDown, 
  LogOut,
  Menu,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react";
import { ERPStore } from "./mockData";
import { AuthUser } from "../../lib/auth";
import { toast } from "sonner";

interface HeaderProps {
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  onLogout: () => void;
  user: AuthUser;
  onMenuToggle: () => void;
}

export function Header({
  selectedBranch,
  setSelectedBranch,
  selectedRole,
  setSelectedRole,
  onLogout,
  user,
  onMenuToggle
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showBranchSelector, setShowBranchSelector] = useState(false);

  // Connectivity and synchronization states
  const [isOnline, setIsOnline] = useState(true);
  const [syncQueue, setSyncQueue] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load inventory alerts
  const inventory = ERPStore.getInventory();
  const lowStockCount = inventory.filter(i => i.stockLevel <= i.minStockLevel).length;

  // Load hire purchase contracts with missed remittance
  const hpContracts = ERPStore.getHPContracts();
  const missedRemittanceCount = hpContracts.filter(c => c.status === "Missed Remittance").length;

  const totalAlerts = lowStockCount + missedRemittanceCount;

  // Update clock every second, with safe timezone rendering to avoid mobile RangeError crashes
  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setCurrentTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback for older mobile devices/Safari browsers that do not support Lagos timezone directly
        setCurrentTime(new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Manage Online/Offline connectivity status and Live Sync Engine
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      setSyncQueue(ERPStore.getSyncQueue());

      const handleOnlineStatus = () => {
        setIsOnline(true);
        const queue = ERPStore.getSyncQueue();
        if (queue.length > 0) {
          setIsSyncing(true);
          setTimeout(() => {
            // Process queue - Simulated Cloud Synchronization
            ERPStore.addAuditLog(
              user.name,
              user.role,
              "Cloud Synchronization",
              `Synchronized ${queue.length} offline local operations to the central cloud repository.`
            );
            ERPStore.saveSyncQueue([]);
            setSyncQueue([]);
            setIsSyncing(false);
            toast.success("Database Connected & Synced", {
              description: `Successfully synchronized ${queue.length} offline changes to CityView Cloud.`
            });
          }, 2000); // 2 second delay to simulate network transit latency
        } else {
          toast.success("Back Online", {
            description: "Connection to central server re-established."
          });
        }
      };

      const handleOfflineStatus = () => {
        setIsOnline(false);
        toast.warning("Working Offline", {
          description: "Network disconnected. Operational inputs will be queued and synchronized upon reconnection."
        });
      };

      const handleSyncChange = () => {
        setSyncQueue(ERPStore.getSyncQueue());
      };

      window.addEventListener("online", handleOnlineStatus);
      window.addEventListener("offline", handleOfflineStatus);
      window.addEventListener("cityview_sync_updated", handleSyncChange);

      return () => {
        window.removeEventListener("online", handleOnlineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
        window.removeEventListener("cityview_sync_updated", handleSyncChange);
      };
    }
  }, [user]);

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

  const isSuperAdmin = user.role === "Super Admin";

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-border bg-white px-4 sm:px-8 shadow-soft">
      {/* Search / Title & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-charcoal hover:bg-mist transition lg:hidden cursor-pointer shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="truncate">
          <h1 className="font-display text-sm sm:text-base md:text-lg font-bold text-foreground truncate">
            {isSuperAdmin ? "CityView Digital HQ" : user.branch === "BR-KT" ? "Katsina Branch Office" : "Gombe Branch Office"}
          </h1>
          <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.12em] text-muted-foreground truncate">
            {isSuperAdmin ? "Enterprise Operations System" : user.department}
          </p>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Time Widget (Desktop only) */}
        <div className="hidden items-center gap-2 rounded-2xl bg-mist/60 px-4 py-2 text-xs font-semibold text-charcoal md:flex">
          <Clock className="h-4 w-4 text-forest" />
          <span>Katsina/Lagos: <span className="font-mono text-forest-deep">{currentTime}</span></span>
        </div>

        {/* Connection/Sync Status Badge */}
        <div className="flex items-center">
          {isSyncing ? (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-600 animate-pulse">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Syncing Data...</span>
            </div>
          ) : !isOnline ? (
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-600 animate-pulse" title="Offline outbox queue holds changes">
              <WifiOff className="h-3.5 w-3.5 text-red-500" />
              <span>Offline {syncQueue.length > 0 && `(${syncQueue.length} pending)`}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-soft/80 border border-emerald/15 px-3 py-1.5 text-[10px] sm:text-xs font-bold text-forest-deep">
              <Wifi className="h-3.5 w-3.5 text-forest" />
              <span className="hidden sm:inline">Cloud Synced</span>
            </div>
          )}
        </div>

        {/* Global Branch Filter (Simulation for Super Admin / Static Badge for Officers) */}
        {isSuperAdmin ? (
          <div className="relative">
            <button 
              onClick={() => {
                setShowBranchSelector(!showBranchSelector);
                setShowRoleSelector(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 text-xs font-semibold text-charcoal hover:bg-mist/40 transition cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-emerald" />
              <span className="hidden sm:inline">
                {selectedBranch === "ALL" 
                  ? "Global Hubs" 
                  : branches.find(b => b.id === selectedBranch)?.name || selectedBranch}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            
            {showBranchSelector && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-border bg-white p-1.5 shadow-elevated animate-fade-down z-50">
                <span className="block px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
                  Select Active Hub
                </span>
                {branches.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBranch(b.id);
                      setShowBranchSelector(false);
                      ERPStore.addAuditLog("Super Admin", "Super Admin", "Simulation Branch Filter", `Simulated active branch context to: ${b.name}`);
                    }}
                    className={`w-full text-left rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
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
        ) : (
          <div className="flex items-center gap-1.5 rounded-full bg-mist/60 px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-charcoal">
            <MapPin className="h-3.5 w-3.5 text-emerald" />
            <span>{user.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub"}</span>
          </div>
        )}

        {/* Dynamic Role Switcher (Simulation for Super Admin / Static Badge for Officers) */}
        {isSuperAdmin ? (
          <div className="relative">
            <button 
              onClick={() => {
                setShowRoleSelector(!showRoleSelector);
                setShowBranchSelector(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-2xl bg-emerald-soft/60 px-3 py-2 text-xs font-bold text-forest-deep hover:bg-emerald-soft transition border border-emerald/15 cursor-pointer"
            >
              <Shield className="h-4 w-4 text-forest" />
              <span className="hidden sm:inline">Role: {selectedRole}</span>
              <ChevronDown className="h-3 w-3 text-forest" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-60 max-h-80 overflow-y-auto rounded-2xl border border-border bg-white p-1.5 shadow-elevated animate-fade-down z-50">
                <span className="block px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 mb-1">
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
                    className={`w-full text-left rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
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
        ) : (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-soft/80 border border-emerald/20 px-3 py-1.5 text-[10px] sm:text-xs font-bold text-forest-deep">
            <Shield className="h-3.5 w-3.5 text-forest" />
            <span>{user.role}</span>
          </div>
        )}

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowBranchSelector(false);
              setShowRoleSelector(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white hover:bg-mist/30 transition text-charcoal cursor-pointer"
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
        <div className="flex items-center gap-3 border-l border-border pl-3 sm:pl-5">
          <div className="hidden text-right md:block">
            <div className="text-xs font-bold text-foreground">{user.name}</div>
            <div className="text-[9px] font-bold text-emerald uppercase tracking-wider">CityView Synergy</div>
          </div>
          <button 
            onClick={onLogout}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 hover:bg-ink/10 transition text-muted-foreground hover:text-red-500 cursor-pointer"
            title="Log out of ERP"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
