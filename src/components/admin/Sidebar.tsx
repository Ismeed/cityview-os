import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Truck, 
  CalendarDays, 
  FileSignature, 
  Wrench, 
  Boxes, 
  Wallet, 
  UserSquare2, 
  Settings,
  ShieldAlert,
  Menu,
  ChevronLeft,
  ChevronRight,
  Database,
  MonitorSmartphone
} from "lucide-react";
import { useState } from "react";

export type AdminTab = 
  | "overview" 
  | "branches" 
  | "employees" 
  | "drivers" 
  | "fleet" 
  | "shifts" 
  | "hp" 
  | "workshop" 
  | "inventory" 
  | "finance" 
  | "crm" 
  | "frontdesk"
  | "settings";

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  selectedRole: string;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, selectedRole, mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Group items by category
  const navigationItems = [
    { 
      id: "overview", 
      label: "Executive Board", 
      icon: LayoutDashboard, 
      category: "Executive",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "System Administrator", "Super Admin"]
    },
    { 
      id: "branches", 
      label: "Branch Network", 
      icon: MapPin, 
      category: "Executive",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "HR Manager", "System Administrator", "Super Admin"]
    },
    { 
      id: "employees", 
      label: "Staff & HR", 
      icon: Users, 
      category: "Executive",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "HR Manager", "System Administrator", "Super Admin"]
    },
    
    { 
      id: "fleet", 
      label: "Vehicles Catalog", 
      icon: Truck, 
      category: "Operations",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Fleet Manager", "Workshop Manager", "Technician", "System Administrator", "Super Admin", "Branch Operations Officer"]
    },
    { 
      id: "drivers", 
      label: "Drivers Directory", 
      icon: Users, // Reuse or change icon
      category: "Operations",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Fleet Manager", "Customer Service", "System Administrator", "Super Admin", "Branch Operations Officer", "Receptionist"]
    },
    { 
      id: "shifts", 
      label: "Daily Remittances", 
      icon: Wallet, 
      category: "Operations",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Fleet Manager", "Cashier", "System Administrator", "Super Admin", "Branch Operations Officer"]
    },
    { 
      id: "hp", 
      label: "Hire Purchase Ledger", 
      icon: FileSignature, 
      category: "Operations",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Fleet Manager", "Cashier", "Accountant", "Customer Service", "System Administrator", "Super Admin", "Branch Operations Officer", "Receptionist"]
    },

    {
      id: "frontdesk",
      label: "Front Desk",
      icon: MonitorSmartphone,
      category: "Operations",
      allowedRoles: ["Receptionist"]
    },

    { 
      id: "workshop", 
      label: "Workshop & CNG", 
      icon: Wrench, 
      category: "Technical",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Workshop Manager", "Technician", "Customer Service", "System Administrator", "Super Admin", "Workshop & CNG Operations Officer", "Receptionist"]
    },
    { 
      id: "inventory", 
      label: "Inventory & Supply", 
      icon: Boxes, 
      category: "Technical",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Workshop Manager", "Inventory Officer", "Accountant", "System Administrator", "Super Admin", "Workshop & CNG Operations Officer"]
    },

    { 
      id: "finance", 
      label: "General Ledger", 
      icon: Wallet, 
      category: "Finance",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Cashier", "Accountant", "System Administrator", "Super Admin"]
    },
    { 
      id: "crm", 
      label: "CRM Portal", 
      icon: UserSquare2, 
      category: "Finance",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Customer Service", "Cashier", "System Administrator", "Super Admin", "Receptionist"]
    },
    { 
      id: "settings", 
      label: "Profile & Settings", 
      icon: Settings, 
      category: "System",
      allowedRoles: ["Managing Director (CEO)", "Executive Director", "Branch Manager", "Operations Manager", "Workshop Manager", "Fleet Manager", "Cashier", "Accountant", "HR Manager", "Customer Service", "Inventory Officer", "Technician", "System Administrator", "Super Admin", "Branch Operations Officer", "Workshop & CNG Operations Officer", "Receptionist"]
    }
  ];

  // Helper to check if role can access tab
  const isAllowed = (allowedRoles: string[]) => {
    return allowedRoles.includes(selectedRole);
  };

  const categories = [
    { name: "Executive", label: "Administration" },
    { name: "Operations", label: "Operations" },
    { name: "Technical", label: "Technical & Conversions" },
    { name: "Finance", label: "Finance & Accounts" },
    { name: "System", label: "Configuration" }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-charcoal text-white transition-all duration-300
        md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-20" : "md:w-72"} w-72`}
      >
      {/* Sidebar header logo */}
      <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald to-forest text-forest-deep shadow-glow-soft">
            <Database className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <span className="font-display text-base font-bold tracking-tight text-white block">CITYVIEW</span>
              <span className="text-[9px] font-bold text-emerald tracking-[0.2em] uppercase">Digital Hub</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-charcoal hover:bg-mist shadow-soft transition md:flex z-50 cursor-pointer"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {categories.map(cat => {
          const catItems = navigationItems.filter(item => item.category === cat.name && isAllowed(item.allowedRoles));
          if (catItems.length === 0) return null;

          return (
            <div key={cat.name} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                  {cat.label}
                </div>
              )}
              {catItems.map(item => {
                const ActiveIcon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as AdminTab);
                      setMobileOpen?.(false);
                    }}
                    className={`group w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition ${
                      isActive 
                        ? "bg-forest text-white shadow-glow-soft" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                    title={collapsed ? item.label : ""}
                  >
                    <ActiveIcon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-emerald" : "text-white/60 group-hover:text-white"}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div className="border-t border-white/5 p-4 bg-ink/30 text-center text-[10px] text-white/40">
          <div>CityView CNG Automobile Synergy</div>
          <div className="mt-0.5 font-mono text-[9px]">v1.2.0-Prod · Katsina, NG</div>
        </div>
      )}
      </aside>
    </>
  );
}
