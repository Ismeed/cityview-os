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
  Database
} from "lucide-react";
import { useState } from "react";

export type AdminTab = 
  | "overview" 
  | "fleet_dashboard"
  | "workshop_dashboard"
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
  | "settings";

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  selectedRole: string;
}

export function Sidebar({ activeTab, setActiveTab, selectedRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Group items by category
  const navigationItems = [
    { 
      id: "overview", 
      label: "Executive Board", 
      icon: LayoutDashboard, 
      category: "Executive",
      allowedRoles: ["Super Admin", "System Administrator", "Managing Director (CEO)", "Executive Director", "Branch Admin"]
    },
    { 
      id: "fleet_dashboard", 
      label: "Fleet Dashboard", 
      icon: LayoutDashboard, 
      category: "Executive",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Operations Officer", "Fleet Manager"]
    },
    { 
      id: "workshop_dashboard", 
      label: "Workshop Dashboard", 
      icon: LayoutDashboard, 
      category: "Executive",
      allowedRoles: ["Super Admin", "System Administrator", "Workshop & CNG Operations Officer", "Workshop Manager"]
    },
    { 
      id: "branches", 
      label: "Branch Network", 
      icon: MapPin, 
      category: "Executive",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Manager", "HR Manager"]
    },
    { 
      id: "employees", 
      label: "Staff & HR", 
      icon: Users, 
      category: "Executive",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Manager", "HR Manager", "Branch Admin"]
    },
    
    { 
      id: "fleet", 
      label: "Vehicles Catalog", 
      icon: Truck, 
      category: "Operations",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Operations Officer", "Workshop & CNG Operations Officer", "Branch Manager", "Operations Manager", "Fleet Manager", "Workshop Manager", "Technician"]
    },
    { 
      id: "drivers", 
      label: "Drivers Directory", 
      icon: Users, 
      category: "Operations",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Operations Officer", "Branch Manager", "Operations Manager", "Fleet Manager", "Customer Service", "Branch Admin"]
    },
    { 
      id: "shifts", 
      label: "Daily Remittance", 
      icon: CalendarDays, 
      category: "Operations",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Operations Officer", "Branch Manager", "Operations Manager", "Fleet Manager", "Cashier", "Branch Admin"]
    },
    { 
      id: "hp", 
      label: "Hire Purchase Ledger", 
      icon: FileSignature, 
      category: "Operations",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Operations Officer", "Branch Manager", "Operations Manager", "Fleet Manager", "Cashier", "Accountant", "Customer Service"]
    },
 
    { 
      id: "workshop", 
      label: "Workshop & CNG", 
      icon: Wrench, 
      category: "Technical",
      allowedRoles: ["Super Admin", "System Administrator", "Workshop & CNG Operations Officer", "Branch Manager", "Operations Manager", "Workshop Manager", "Technician", "Customer Service"]
    },
    { 
      id: "inventory", 
      label: "Inventory & Supply", 
      icon: Boxes, 
      category: "Technical",
      allowedRoles: ["Super Admin", "System Administrator", "Workshop & CNG Operations Officer", "Branch Manager", "Workshop Manager", "Inventory Officer", "Accountant"]
    },
 
    { 
      id: "finance", 
      label: "General Ledger", 
      icon: Wallet, 
      category: "Finance",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Manager", "Cashier", "Accountant"]
    },
    { 
      id: "crm", 
      label: "CRM Portal", 
      icon: UserSquare2, 
      category: "Finance",
      allowedRoles: ["Super Admin", "System Administrator", "Branch Manager", "Operations Manager", "Customer Service", "Cashier"]
    },
    { 
      id: "settings", 
      label: "User Accounts & Security", 
      icon: Settings, 
      category: "System",
      allowedRoles: ["Super Admin", "System Administrator", "Managing Director (CEO)", "Executive Director", "Branch Operations Officer", "Workshop & CNG Operations Officer", "Fleet Manager", "Workshop Manager", "Branch Admin"]
    }
  ];

  // Helper to check if role can access tab
  const isAllowed = (allowedRoles: string[]) => {
    if (selectedRole === "Super Admin" || selectedRole === "System Administrator" || selectedRole === "Managing Director (CEO)" || selectedRole === "Executive Director") return true;
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
    <aside className={`relative flex flex-col border-r border-border bg-charcoal text-white transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
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
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`group w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold transition ${
                      isActive 
                        ? "bg-forest text-white shadow-glow-soft" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                    title={collapsed ? (item.id === "settings" && selectedRole !== "Super Admin" && selectedRole !== "System Administrator" && selectedRole !== "Managing Director (CEO)" && selectedRole !== "Executive Director" ? "Change Password" : item.label) : ""}
                  >
                    <ActiveIcon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-emerald" : "text-white/60 group-hover:text-white"}`} />
                    {!collapsed && (
                      <span className="truncate">
                        {item.id === "settings" && selectedRole !== "Super Admin" && selectedRole !== "System Administrator" && selectedRole !== "Managing Director (CEO)" && selectedRole !== "Executive Director"
                          ? "Change Password" 
                          : item.label}
                      </span>
                    )}
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
  );
}
