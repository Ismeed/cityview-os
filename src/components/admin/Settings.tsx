import { useState } from "react";
import { ERPStore, MockUser } from "./mockData";
import { Shield, Database, Save, Upload, Settings2, RefreshCw, Key, Eye, EyeOff, Clipboard, Check, User, UserPlus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SettingsProps {
  currentUser?: {
    email: string;
    name: string;
    role: string;
    department: string;
    branch: string;
    branchName: string;
    passwordHash: string;
  };
}

export function Settings({ currentUser }: SettingsProps) {
  const [profile, setProfile] = useState({
    name: "CityView CNG Automobile Synergy",
    tagline: "Driving a Cleaner, Smarter Future",
    hq: "Katsina State, Nigeria",
    targetRemittance: 12000,
    timeoutMinutes: 15
  });

  const [saving, setSaving] = useState(false);
  
  // Password change states
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPass, setShowPass] = useState<Record<string, boolean>>({});

  // Credentials visibility toggle for admin directory
  const [revealPasswords, setRevealPasswords] = useState<Record<string, boolean>>({});
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // User Management State
  const [users, setUsers] = useState<MockUser[]>(() => ERPStore.getUsers());
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    role: "Branch Operations Officer",
    department: "Operations",
    branch: "BR-KT",
    passwordHash: "Password123"
  });

  const isAdmin = currentUser?.role === "Super Admin" || 
                  currentUser?.role === "Managing Director (CEO)" || 
                  currentUser?.role === "System Administrator" || 
                  currentUser?.role === "Executive Director";

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Save System Settings", "Updated company profile config.");
      toast.success("Settings Saved Successfully", {
        description: "Operating rules and company profile variables have been committed."
      });
    }, 800);
  };

  // Change Password logic
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (passwordState.newPassword !== passwordState.confirmPassword) {
      toast.error("Password Mismatch", { description: "New password and confirmation password do not match." });
      return;
    }

    if (passwordState.currentPassword !== currentUser.passwordHash) {
      toast.error("Incorrect Password", { description: "The current password you entered is incorrect." });
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      const allUsers = ERPStore.getUsers();
      const updatedUsers = allUsers.map(u => {
        if (u.email.toLowerCase() === currentUser.email.toLowerCase()) {
          return { ...u, passwordHash: passwordState.newPassword };
        }
        return u;
      });

      // Save to store
      ERPStore.saveUsers(updatedUsers);
      setUsers(updatedUsers);

      // Update current session user in localstorage
      const updatedUserSession = { ...currentUser, passwordHash: passwordState.newPassword };
      localStorage.setItem("cityview_user_session", JSON.stringify(updatedUserSession));

      ERPStore.addAuditLog(currentUser.name, currentUser.role, "Change Password", `Updated login password for email: ${currentUser.email}`);
      
      toast.success("Password Updated", {
        description: "Your login credentials password was changed successfully."
      });

      setPasswordState({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordLoading(false);
    }, 800);
  };

  // Admin: Create User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const emailLower = newUser.email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      toast.error("Email Taken", { description: "An account with this email address already exists." });
      return;
    }

    const branchNameMap: Record<string, string> = {
      "BR-KT": "Katsina HQ",
      "BR-GB": "Gombe Hub",
      "ALL": "Global Enterprise"
    };

    const userEntry: MockUser = {
      email: emailLower,
      name: newUser.name.trim(),
      role: newUser.role,
      department: newUser.department.trim(),
      branch: newUser.branch,
      branchName: branchNameMap[newUser.branch] || "Katsina HQ",
      passwordHash: newUser.passwordHash,
      disabled: false
    };

    const updatedUsers = [...users, userEntry];
    ERPStore.saveUsers(updatedUsers);
    setUsers(updatedUsers);

    ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Admin", "Create User Account", `Registered account for ${userEntry.name} (${userEntry.role})`);

    toast.success("Account Created", {
      description: `User account for ${userEntry.name} registered with default password.`
    });

    setShowAddUserModal(false);
    setNewUser({
      email: "",
      name: "",
      role: "Branch Operations Officer",
      department: "Operations",
      branch: "BR-KT",
      passwordHash: "Password123"
    });
  };

  // Admin: Toggle user disabled status
  const handleToggleUserStatus = (email: string) => {
    if (!isAdmin) return;
    if (email.toLowerCase() === currentUser?.email.toLowerCase()) {
      toast.warning("Action Blocked", { description: "You cannot disable your own active login session." });
      return;
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const nextStatus = !u.disabled;
        ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Admin", nextStatus ? "Disable User" : "Enable User", `Changed status for email: ${u.email}`);
        return { ...u, disabled: nextStatus };
      }
      return u;
    });

    ERPStore.saveUsers(updatedUsers);
    setUsers(updatedUsers);

    toast.info("Account Privileges Updated", {
      description: "User account status toggled successfully."
    });
  };

  // Admin: Delete User
  const handleDeleteUser = (email: string) => {
    if (!isAdmin) return;
    if (email.toLowerCase() === currentUser?.email.toLowerCase()) {
      toast.warning("Action Blocked", { description: "You cannot delete your own active login session." });
      return;
    }

    if (confirm("Are you sure you want to permanently delete this user account?")) {
      const updatedUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
      ERPStore.saveUsers(updatedUsers);
      setUsers(updatedUsers);

      ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Admin", "Delete User Account", `Permanently deleted email: ${email}`);
      toast.success("Account Deleted", { description: "The login account has been permanently removed from the register." });
    }
  };

  const handleBackup = () => {
    if (!isAdmin) return;
    try {
      const backupData: Record<string, string | null> = {};
      const keys = [
        "cityview_erp_branches_v2",
        "cityview_erp_employees_v2",
        "cityview_erp_drivers_v2",
        "cityview_erp_vehicles_v2",
        "cityview_erp_shifts_v2",
        "cityview_erp_hp_contracts_v2",
        "cityview_erp_job_cards_v2",
        "cityview_erp_conversions_v2",
        "cityview_erp_inventory_v2",
        "cityview_erp_transactions_v2",
        "cityview_erp_audit_logs_v2",
        "cityview_erp_users_v2"
      ];
      
      keys.forEach(k => {
        backupData[k] = localStorage.getItem(k);
      });

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CityView_ERP_Backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Export Backup JSON", "Downloaded system database snapshot.");
      toast.success("Backup File Created", {
        description: "CityView_ERP_Backup.json has been downloaded to your machine."
      });
    } catch (e) {
      console.error(e);
      toast.error("Backup Failed", { description: "An error occurred compiling localstorage." });
    }
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as Record<string, string>;
        Object.entries(data).forEach(([key, val]) => {
          if (val) {
            localStorage.setItem(key, val);
          }
        });
        
        ERPStore.addAuditLog(currentUser?.name || "Admin", currentUser?.role || "Super Administrator", "Import Backup JSON", "Restored localstorage state.");
        toast.success("Database Restored", {
          description: "System records successfully imported. Reloading to sync state..."
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.error(err);
        toast.error("Restore Failed", { description: "Invalid JSON backup file structural layout." });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (!isAdmin) return;
    if (confirm("WARNING: This will delete all customized local records and reset mock data back to factory defaults. Proceed?")) {
      const keys = [
        "cityview_erp_branches_v2",
        "cityview_erp_employees_v2",
        "cityview_erp_drivers_v2",
        "cityview_erp_vehicles_v2",
        "cityview_erp_shifts_v2",
        "cityview_erp_hp_contracts_v2",
        "cityview_erp_job_cards_v2",
        "cityview_erp_conversions_v2",
        "cityview_erp_inventory_v2",
        "cityview_erp_transactions_v2",
        "cityview_erp_audit_logs_v2",
        "cityview_erp_users_v2"
      ];
      keys.forEach(k => localStorage.removeItem(k));
      toast.info("Database Reset", { description: "Clearing local cache. System reloading..." });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success("Email copied", { description: `${email} copied to clipboard.` });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const togglePasswordReveal = (email: string) => {
    setRevealPasswords(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const allRoles = [
    "Super Admin",
    "System Administrator",
    "Branch Operations Officer",
    "Workshop & CNG Operations Officer",
    "Receptionist",
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
    "Technician"
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl text-foreground">
      {/* Header */}
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Profile & Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isAdmin 
              ? "Manage system-wide corporate settings, register new staff accounts, and enable or disable access privileges." 
              : "Update your login password and review your active branch operational privileges."}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Profile Card & Password Update */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview (All Roles) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
            <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-emerald" />
              Active Account Profile
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Full Name</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.name || "System User"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Assigned Role</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.role || "Staff"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Corporate Email</span>
                <span className="font-semibold text-foreground text-sm font-mono break-all">{currentUser?.email || "—"}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">Operating Hub / Branch</span>
                <span className="font-semibold text-foreground text-sm">{currentUser?.branchName || "—"}</span>
              </div>
            </div>
          </div>

          {/* Change Password Form (All Roles) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
            <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
              <Key className="h-5 w-5 text-emerald" />
              Update Account Password
            </h4>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPass.current ? "text" : "password"}
                    required
                    value={passwordState.currentPassword}
                    onChange={(e) => setPasswordState(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPass.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass.new ? "text" : "password"}
                      required
                      value={passwordState.newPassword}
                      onChange={(e) => setPasswordState(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                      placeholder="Min 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPass.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPass.confirm ? "text" : "password"}
                      required
                      value={passwordState.confirmPassword}
                      onChange={(e) => setPasswordState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPass.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer disabled:opacity-50"
                >
                  <Key className="h-4 w-4" />
                  {passwordLoading ? "Saving..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Administrative Configurations (restricted to Admin roles) */}
        <div className="space-y-6">
          {isAdmin ? (
            <>
              {/* Backups Panel */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <h4 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald" />
                  Backup & Sync
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Export the current localStorage database as a JSON file, or restore data from an existing backup file.
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleBackup}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card hover:bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition cursor-pointer"
                  >
                    <Save className="h-4 w-4 text-muted-foreground" />
                    Export Database JSON
                  </button>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestore}
                      id="restore-file-input"
                      className="hidden"
                    />
                    <label
                      htmlFor="restore-file-input"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald/15 hover:bg-emerald-500/20 text-emerald px-4 py-2.5 text-xs font-bold transition cursor-pointer text-center text-center"
                    >
                      <Upload className="h-4 w-4" />
                      Restore Database File
                    </label>
                  </div>
                </div>
              </div>

              {/* Danger zone / resets */}
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 shadow-soft space-y-4">
                <h4 className="font-display font-bold text-base text-red-500 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Reset
                </h4>
                <p className="text-[11px] text-red-500/80 leading-relaxed">
                  Clear all customizations, shifts, transactions, and employee rosters to restore default mock seeds.
                </p>
                <button
                  onClick={clearAllData}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 text-xs font-bold transition cursor-pointer border border-red-500/25"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Cache Defaults
                </button>
              </div>
            </>
          ) : (
            /* Non-admin Information Alert */
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3">
              <h4 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                <Shield className="h-4.5 w-4.5 text-emerald" />
                Access Clearances
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Your role account <strong className="text-foreground">({currentUser?.role})</strong> is operating under hub security restrictions.
              </p>
              <div className="text-[10px] text-muted-foreground bg-muted/40 p-3 rounded-xl space-y-1">
                <div>• System configurations locked</div>
                <div>• Database backups restricted</div>
                <div>• Enterprise credentials hidden</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin section: Enterprise User Credentials Directory & Creation (Only visible to Admin) */}
      {isAdmin && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-2">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald" />
                User Account Management
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Create new staff accounts, assign default passwords, and enable/disable system access.
              </p>
            </div>
            
            <button
              onClick={() => setShowAddUserModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-4.5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              Register User Account
            </button>
          </div>

          <div className="overflow-x-auto border border-border rounded-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-muted/40 text-muted-foreground uppercase font-bold tracking-wider border-b border-border">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Simulated Role</th>
                  <th className="p-4">Hub / Branch</th>
                  <th className="p-4">Login Email</th>
                  <th className="p-4">Password</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {users.map((user) => (
                  <tr key={user.email} className={`hover:bg-muted/10 transition ${user.disabled ? 'bg-muted/20 opacity-70' : ''}`}>
                    <td className="p-4 font-semibold text-foreground">{user.name}</td>
                    <td className="p-4">
                      <span className="inline-block rounded bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground uppercase">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.branchName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-muted-foreground">{user.email}</span>
                        <button
                          onClick={() => copyToClipboard(user.email)}
                          className="text-muted-foreground hover:text-emerald transition cursor-pointer p-1 rounded hover:bg-muted"
                          title="Copy Email"
                        >
                          {copiedEmail === user.email ? <Check className="h-3 w-3 text-emerald" /> : <Clipboard className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span>{revealPasswords[user.email] ? user.passwordHash : "••••••••"}</span>
                        <button
                          onClick={() => togglePasswordReveal(user.email)}
                          className="text-muted-foreground hover:text-foreground transition cursor-pointer p-0.5"
                          title={revealPasswords[user.email] ? "Hide Password" : "Show Password"}
                        >
                          {revealPasswords[user.email] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        user.disabled 
                          ? 'bg-red-500/10 text-red-500' 
                          : 'bg-emerald-500/10 text-emerald'
                      }`}>
                        {user.disabled ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.email !== currentUser?.email && (
                          <>
                            <button
                              onClick={() => handleToggleUserStatus(user.email)}
                              className="text-muted-foreground hover:text-emerald transition cursor-pointer p-1 rounded hover:bg-muted"
                              title={user.disabled ? "Enable Account" : "Disable Account"}
                            >
                              {user.disabled ? <ToggleLeft className="h-4.5 w-4.5" /> : <ToggleRight className="h-4.5 w-4.5 text-emerald" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.email)}
                              className="text-muted-foreground hover:text-red-500 transition cursor-pointer p-1 rounded hover:bg-muted"
                              title="Delete Account"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-3xl border border-border p-6 shadow-2xl animate-scale-in space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-1.5">
                <UserPlus className="h-5 w-5 text-emerald" />
                Register Staff Account
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Staff Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Musa Ibrahim"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-semibold text-foreground"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Login Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. musa.i@cityview.ng"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono text-foreground"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Simulated Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-semibold text-foreground"
                  >
                    {allRoles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Hub Branch Location</label>
                  <select
                    value={newUser.branch}
                    onChange={(e) => setNewUser(prev => ({ ...prev, branch: e.target.value }))}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-semibold text-foreground"
                  >
                    <option value="BR-KT">Katsina HQ</option>
                    <option value="BR-GB">Gombe Hub</option>
                    <option value="ALL">Global Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Department</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operations, Finance, Tech Support"
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card text-foreground"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Default Password</label>
                <input
                  type="text"
                  required
                  value={newUser.passwordHash}
                  onChange={(e) => setNewUser(prev => ({ ...prev, passwordHash: e.target.value }))}
                  className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-card font-mono text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted transition cursor-pointer text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
