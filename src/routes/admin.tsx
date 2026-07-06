import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sidebar, AdminTab } from "../components/admin/Sidebar";
import { Header } from "../components/admin/Header";
import { ExecutiveDashboard } from "../components/admin/ExecutiveDashboard";
import { BranchManagement } from "../components/admin/BranchManagement";
import { EmployeeManagement } from "../components/admin/EmployeeManagement";
import { DriverManagement } from "../components/admin/DriverManagement";
import { FleetManagement } from "../components/admin/FleetManagement";
import { RemittanceTracker } from "../components/admin/RemittanceTracker";
import { HirePurchase } from "../components/admin/HirePurchase";
import { WorkshopConversions } from "../components/admin/WorkshopConversions";
import { Inventory } from "../components/admin/Inventory";
import { Finance } from "../components/admin/Finance";
import { CRM } from "../components/admin/CRM";
import { FrontDesk } from "../components/admin/FrontDesk";
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedRole, setSelectedRole] = useState("Managing Director (CEO)");
  const [isInitialized, setIsInitialized] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Permission mapper per role
  const permissions: Record<string, AdminTab[]> = {
    "Managing Director (CEO)": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Executive Director": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Branch Manager": ["branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Operations Manager": ["fleet", "drivers", "shifts", "hp", "workshop", "crm", "settings"],
    "Workshop Manager": ["fleet", "workshop", "inventory", "settings"],
    "Fleet Manager": ["fleet", "drivers", "shifts", "hp", "settings"],
    "Cashier": ["shifts", "hp", "finance", "crm", "settings"],
    "Accountant": ["finance", "hp", "inventory", "settings"],
    "HR Manager": ["branches", "employees", "settings"],
    "Customer Service": ["drivers", "hp", "workshop", "crm", "settings"],
    "Inventory Officer": ["inventory", "settings"],
    "Technician": ["fleet", "workshop", "settings"],
    "System Administrator": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Super Admin": ["overview", "branches", "employees", "fleet", "drivers", "shifts", "hp", "workshop", "inventory", "finance", "crm", "settings"],
    "Branch Operations Officer": ["fleet", "drivers", "shifts", "hp", "settings"],
    "Workshop & CNG Operations Officer": ["workshop", "inventory", "settings"],
    "Receptionist": ["frontdesk", "hp", "drivers", "workshop", "crm", "settings"],
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionStr = localStorage.getItem("cityview_user_session");
      if (!sessionStr) {
        navigate({ to: "/login" });
      } else {
        try {
          const user = JSON.parse(sessionStr);
          setCurrentUser(user);
          setSelectedRole(user.role);
          setSelectedBranch(user.branch);
          
          // Set initial tab based on role permissions
          const allowed = permissions[user.role] || [];
          if (allowed.length > 0) {
            if (user.role === "Super Admin" || user.role === "Managing Director (CEO)" || user.role === "System Administrator" || user.role === "Executive Director") {
              setActiveTab("overview");
            } else {
              setActiveTab(allowed[0]);
            }
          }
        } catch (e) {
          console.error(e);
          navigate({ to: "/login" });
        }
      }
      setIsInitialized(true);
    }
  }, [navigate]);

  const allowedTabs = permissions[selectedRole] || [];

  // Reset tab to first allowed tab if role change restricts current active tab
  useEffect(() => {
    if (isInitialized && !allowedTabs.includes(activeTab)) {
      if (allowedTabs.length > 0) {
        setActiveTab(allowedTabs[0]);
      }
    }
  }, [selectedRole, allowedTabs, activeTab, isInitialized]);

  const handleLogout = () => {
    localStorage.removeItem("cityview_user_session");
    navigate({ to: "/login" });
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
        return <DriverManagement selectedBranch={selectedBranch} />;
      case "fleet":
        return <FleetManagement selectedBranch={selectedBranch} />;
      case "shifts":
        return <RemittanceTracker selectedBranch={selectedBranch} />;
      case "hp":
        return <HirePurchase selectedBranch={selectedBranch} />;
      case "workshop":
        return <WorkshopConversions selectedBranch={selectedBranch} />;
      case "inventory":
        return <Inventory selectedBranch={selectedBranch} />;
      case "finance":
        return <Finance selectedBranch={selectedBranch} />;
      case "crm":
        return <CRM selectedBranch={selectedBranch} />;
      case "frontdesk":
        return <FrontDesk selectedBranch={selectedBranch} />;
      case "settings":
        return <Settings currentUser={currentUser} />;
      default:
        return <ExecutiveDashboard branchId={selectedBranch} />;
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <div className="inline-block w-8 h-8 border-4 border-emerald border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40 dark:bg-background">
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedRole={selectedRole} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dynamic Navigation Header */}
        <Header 
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          currentUser={currentUser}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Tab Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
