import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sidebar, AdminTab } from "../components/admin/Sidebar";
import { Header } from "../components/admin/Header";
import { ExecutiveDashboard } from "../components/admin/ExecutiveDashboard";
import { BranchManagement } from "../components/admin/BranchManagement";
import { EmployeeManagement } from "../components/admin/EmployeeManagement";
import { DriverManagement } from "../components/admin/DriverManagement";
import { FleetManagement } from "../components/admin/FleetManagement";
import { ShiftManagement } from "../components/admin/ShiftManagement";
import { HirePurchase } from "../components/admin/HirePurchase";
import { WorkshopConversions } from "../components/admin/WorkshopConversions";
import { Inventory } from "../components/admin/Inventory";
import { Finance } from "../components/admin/Finance";
import { CRM } from "../components/admin/CRM";
import { Settings } from "../components/admin/Settings";
import { ShieldAlert, Database, HelpCircle } from "lucide-react";
import { ERPStore } from "../components/admin/mockData";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "CityView ERP — Enterprise Operations Center" },
      { name: "description", content: "Administrative operations workspace for CityView CNG." },
    ],
  }),
  component: AdminPanel,
});

function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedRole, setSelectedRole] = useState("Managing Director (CEO)");

  // Permission mapper per role
  const permissions: Record<string, AdminTab[]> = {
    "Managing Director (CEO)": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Executive Director": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Branch Manager": ["branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm"],
    "Operations Manager": ["fleet", "drivers", "shifts", "hp", "workshop", "crm"],
    "Workshop Manager": ["fleet", "workshop", "inventory"],
    "Fleet Manager": ["fleet", "drivers", "shifts", "hp"],
    "Cashier": ["shifts", "hp", "finance", "crm"],
    "Accountant": ["finance", "hp", "inventory"],
    "HR Manager": ["branches", "employees"],
    "Customer Service": ["drivers", "hp", "workshop", "crm"],
    "Inventory Officer": ["inventory"],
    "Technician": ["fleet", "workshop"],
    "System Administrator": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"]
  };

  const allowedTabs = permissions[selectedRole] || [];

  // Reset tab to first allowed tab if role change restricts current active tab
  useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      if (allowedTabs.length > 0) {
        setActiveTab(allowedTabs[0]);
      }
    }
  }, [selectedRole, allowedTabs, activeTab]);

  const handleLogout = () => {
    navigate({ to: "/" });
  };

  // Render the appropriate panel based on selected active tab
  const renderTabContent = () => {
    if (!allowedTabs.includes(activeTab)) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8 bg-white border border-border rounded-3xl shadow-soft">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4 animate-bounce">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">Restricted Operations Area</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Your simulated credentials role <span className="font-bold text-forest-deep">({selectedRole})</span> does not possess access clearance for the <span className="font-bold">"{activeTab.toUpperCase()}"</span> sub-ledger.
          </p>
          <span className="text-xs text-muted-foreground mt-6 bg-mist px-3 py-1.5 rounded-full font-mono">
            Error: HTTP 403 Forbidden Simulation
          </span>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <ExecutiveDashboard branchId={selectedBranch} />;
      case "branches":
        return <BranchManagement />;
      case "employees":
        return <EmployeeManagement />;
      case "drivers":
        return <DriverManagement />;
      case "fleet":
        return <FleetManagement />;
      case "shifts":
        return <ShiftManagement />;
      case "hp":
        return <HirePurchase />;
      case "workshop":
        return <WorkshopConversions />;
      case "inventory":
        return <Inventory />;
      case "finance":
        return <Finance />;
      case "crm":
        return <CRM />;
      case "settings":
        return <Settings />;
      default:
        return <ExecutiveDashboard branchId={selectedBranch} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-mist/20">
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedRole={selectedRole} 
      />

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dynamic Navigation Header */}
        <Header 
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          onLogout={handleLogout}
        />

        {/* Tab Viewport */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
