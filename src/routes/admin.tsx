import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sidebar, AdminTab } from "../components/admin/Sidebar";
import { Header } from "../components/admin/Header";
import { ExecutiveDashboard } from "../components/admin/ExecutiveDashboard";
import { FleetDashboard } from "../components/admin/FleetDashboard";
import { WorkshopDashboard } from "../components/admin/WorkshopDashboard";
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
import { ShieldAlert } from "lucide-react";
import { getCurrentUser, logoutUser, ROLE_TAB_PERMISSIONS, AuthUser } from "../lib/auth";
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [selectedBranch, setSelectedBranch] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cityview_selected_branch") || "ALL";
    }
    return "ALL";
  });
  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    if (typeof window !== "undefined") {
      localStorage.setItem("cityview_selected_branch", branch);
      window.dispatchEvent(new Event("cityview_branch_changed"));
    }
  };
  const [selectedRole, setSelectedRole] = useState("System Administrator");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile drawer toggle state

  // Pull Cloud Data from Supabase Database on startup
  useEffect(() => {
    import("../lib/supabaseSync").then(m => {
      m.pullAllDataFromCloud();
    }).catch(err => console.warn("[Supabase Sync] Startup fetch error:", err));
  }, []);

  // Check login credentials on mount.
  // Uses a retry mechanism (up to 500ms) to handle mobile Safari/Android
  // where localStorage may not be immediately readable after navigation.
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const interval = 100; // ms between retries

    const tryGetSession = () => {
      const sessionUser = getCurrentUser();

      if (sessionUser) {
        setUser(sessionUser);
        // Enforce default landing tabs based on user role
        if (sessionUser.role === "Super Admin") {
          setActiveTab("overview");
          setSelectedBranch(localStorage.getItem("cityview_selected_branch") || "ALL");
          setSelectedRole("System Administrator");
        } else if (sessionUser.role === "Branch Operations Officer" || sessionUser.role === "Fleet Manager") {
          setActiveTab("fleet_dashboard");
          setSelectedBranch(sessionUser.branch);
          setSelectedRole(sessionUser.role);
        } else if (sessionUser.role === "Workshop & CNG Operations Officer" || sessionUser.role === "Workshop Manager") {
          setActiveTab("workshop_dashboard");
          setSelectedBranch(sessionUser.branch);
          setSelectedRole(sessionUser.role);
        } else if (sessionUser.role === "Branch Admin") {
          setActiveTab("overview");
          setSelectedBranch(sessionUser.branch);
          setSelectedRole(sessionUser.role);
        }
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          // Retry after short delay to allow localStorage to flush (mobile fix)
          setTimeout(tryGetSession, interval);
        } else {
          // No session found after retries — redirect to login
          navigate({ to: "/login" });
        }
      }
    };

    tryGetSession();
  }, []);

  const allowedTabs = user ? (ROLE_TAB_PERMISSIONS[user.role] || []) : [];

  // Reset tab to first allowed tab if role change restricts current active tab
  useEffect(() => {
    if (user && !allowedTabs.includes(activeTab)) {
      if (allowedTabs.length > 0) {
        setActiveTab(allowedTabs[0] as AdminTab);
      }
    }
  }, [user, allowedTabs, activeTab]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist/20">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald border-t-transparent mx-auto"></div>
          <p className="mt-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Verifying session...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser();
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
            Your credentials role <span className="font-bold text-forest-deep">({user.role})</span> does not possess access clearance for the <span className="font-bold">"{activeTab.toUpperCase()}"</span> sub-ledger.
          </p>
          <span className="text-xs text-muted-foreground mt-6 bg-mist px-3 py-1.5 rounded-full font-mono">
            Error: HTTP 403 Forbidden Access
          </span>
        </div>
      );
    }

    const isAdminUser = user.role === "Super Admin" || 
                        user.role === "System Administrator" || 
                        user.role === "Managing Director (CEO)" || 
                        user.role === "Executive Director";
    const activeBranchId = isAdminUser ? selectedBranch : user.branch;
    const activeBranchName = activeBranchId === "ALL" ? "Katsina HQ" : activeBranchId === "BR-KT" ? "Katsina HQ" : "Gombe Hub";

    switch (activeTab) {
      case "overview":
        return <ExecutiveDashboard branchId={activeBranchId} />;
      case "fleet_dashboard":
        return <FleetDashboard branchName={activeBranchName} />;
      case "workshop_dashboard":
        return <WorkshopDashboard branchName={activeBranchName} />;
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
      case "settings": {
        const dbUsers = ERPStore.getUsers();
        const activeDbUser = dbUsers.find(u => u.email.toLowerCase() === user?.email.toLowerCase());
        const mappedUser = user ? {
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
          branch: user.branch,
          branchName: user.branch === "ALL" ? "Global Enterprise" : user.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub",
          passwordHash: activeDbUser?.passwordHash || "Password123"
        } : undefined;
        return <Settings currentUser={mappedUser} />;
      }
      default:
        return <ExecutiveDashboard branchId={activeBranchId} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-mist/20 relative">
      {/* Drawer Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Collapsible/Responsive Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false); // Auto-close drawer on selection
          }} 
          selectedRole={user.role} 
        />
      </div>

      {/* Main Workspace Column */}
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        {/* Dynamic Navigation Header */}
        <Header 
          selectedBranch={selectedBranch}
          setSelectedBranch={handleBranchChange}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          onLogout={handleLogout}
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Tab Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
