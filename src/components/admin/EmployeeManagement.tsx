import { useState, useEffect } from "react";
import { ERPStore, Employee } from "./mockData";
import { Search, Plus, Filter, FileText, UserPlus, CheckCircle, XCircle, AlertCircle, RefreshCw, Edit, ShieldCheck, Printer, Download, X } from "lucide-react";
import { toast } from "sonner";

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(() => ERPStore.getEmployees());
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("ALL");
  const [deptFilter, setDeptFilter] = useState("ALL");

  const getActiveBranchDefault = () => {
    if (typeof window !== "undefined") {
      const selected = localStorage.getItem("cityview_selected_branch") || "ALL";
      if (selected === "BR-GB") return "Gombe Hub";
    }
    return "Katsina HQ";
  };

  // Form modal triggers
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    role: "Technician",
    department: "Technical",
    branch: getActiveBranchDefault(),
    salary: 200000,
    category: "Regular" as "Regular" | "NYSC" | "Trainee",
    stateCode: "",
    batchGroup: "",
    institution: "",
    durationMonths: 6
  });

  // Keep list updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setEmployees(ERPStore.getEmployees());
      setNewEmp(prev => ({ ...prev, branch: getActiveBranchDefault() }));
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);

  // Edit State
  const [editEmp, setEditEmp] = useState<Employee | null>(null);

  // Document Viewer Modals State
  const [activeContractEmp, setActiveContractEmp] = useState<Employee | null>(null);
  const [activeCredsEmp, setActiveCredsEmp] = useState<Employee | null>(null);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Employee = {
      id: `EMP-${(employees.length + 1).toString().padStart(2, "0")}`,
      name: newEmp.name,
      email: newEmp.email,
      role: newEmp.role,
      department: newEmp.department,
      branch: newEmp.branch,
      salary: Number(newEmp.salary),
      status: "Active",
      attendanceToday: "Present",
      category: newEmp.category,
      stateCode: newEmp.category === "NYSC" ? newEmp.stateCode : undefined,
      batchGroup: newEmp.category === "NYSC" ? newEmp.batchGroup : undefined,
      institution: newEmp.category === "Trainee" ? newEmp.institution : undefined,
      durationMonths: newEmp.category === "Trainee" ? Number(newEmp.durationMonths) : undefined
    };

    const updated = [...employees, newEntry];
    setEmployees(updated);
    ERPStore.saveEmployees(updated);
    ERPStore.addAuditLog("HR Admin", "HR Manager", "Register Employee", `Registered ${newEmp.category} staff: ${newEmp.name} in department ${newEmp.department}`);
    
    toast.success("Staff Onboarded", {
      description: `${newEmp.name} has been added to personnel rosters.`
    });

    setNewEmp({
      name: "",
      email: "",
      role: "Technician",
      department: "Technical",
      branch: "Katsina HQ",
      salary: 200000,
      category: "Regular",
      stateCode: "",
      batchGroup: "",
      institution: "",
      durationMonths: 6
    });
    setShowAddForm(false);
  };

  const handleEditEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmp) return;

    // Clean up category-specific fields on submit
    const cleanedEmp: Employee = {
      ...editEmp,
      stateCode: editEmp.category === "NYSC" ? editEmp.stateCode : undefined,
      batchGroup: editEmp.category === "NYSC" ? editEmp.batchGroup : undefined,
      institution: editEmp.category === "Trainee" ? editEmp.institution : undefined,
      durationMonths: editEmp.category === "Trainee" ? Number(editEmp.durationMonths) : undefined
    };

    const updated = employees.map(emp => emp.id === cleanedEmp.id ? cleanedEmp : emp);
    setEmployees(updated);
    ERPStore.saveEmployees(updated);
    ERPStore.addAuditLog("HR Admin", "HR Manager", "Modify Employee File", `Updated profile, category, and salary for employee ${cleanedEmp.name} (${cleanedEmp.id})`);

    toast.success("Employee Profile Updated", {
      description: `Changes for ${cleanedEmp.name} saved successfully.`
    });
    setEditEmp(null);
  };

  const toggleAttendance = (id: string, current?: "Present" | "Absent" | "Late" | "Leave") => {
    let next: "Present" | "Absent" | "Late" | "Leave" = "Present";
    if (current === "Present") next = "Late";
    else if (current === "Late") next = "Leave";
    else if (current === "Leave") next = "Absent";
    else next = "Present";

    const updated = employees.map(emp => emp.id === id ? { ...emp, attendanceToday: next } : emp);
    setEmployees(updated);
    ERPStore.saveEmployees(updated);
    toast.info("Attendance Updated", {
      description: `Logged daily status as: ${next}`
    });
  };

  // Filter lists
  const filtered = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.role.toLowerCase().includes(search.toLowerCase()) ||
                          emp.id.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter === "ALL" || emp.branch === (branchFilter === "BR-KT" ? "Katsina HQ" : "Gombe Hub");
    const matchesDept = deptFilter === "ALL" || emp.department === deptFilter;

    return matchesSearch && matchesBranch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Staff & HR Center</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Maintain employee records, clock-in sheets, payroll details, and structural department roles.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Onboard Staff
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddEmployee} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Onboard New Team Member</h4>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newEmp.name}
                onChange={(e) => setNewEmp(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Muhammadu Bello"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Corporate Email</label>
              <input
                type="email"
                required
                value={newEmp.email}
                onChange={(e) => setNewEmp(prev => ({ ...prev, email: e.target.value }))}
                placeholder="m.bello@cityviewcng.com"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Staff Category</label>
              <select
                value={newEmp.category}
                onChange={(e) => setNewEmp(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Regular">Regular Staff</option>
                <option value="NYSC">NYSC Corper</option>
                <option value="Trainee">Industrial Trainee (IT)</option>
              </select>
            </div>

            {/* NYSC Batch and State Code */}
            {newEmp.category === "NYSC" && (
              <>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">NYSC State Code</label>
                  <input
                    type="text"
                    required
                    value={newEmp.stateCode}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, stateCode: e.target.value }))}
                    placeholder="e.g. KT/26A/0542"
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Batch Group</label>
                  <input
                    type="text"
                    required
                    value={newEmp.batchGroup}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, batchGroup: e.target.value }))}
                    placeholder="e.g. 2026 Batch A"
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
              </>
            )}

            {/* Trainee Details */}
            {newEmp.category === "Trainee" && (
              <>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Institution</label>
                  <input
                    type="text"
                    required
                    value={newEmp.institution}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="e.g. University of Jos"
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Duration (Months)</label>
                  <input
                    type="number"
                    required
                    value={newEmp.durationMonths}
                    onChange={(e) => setNewEmp(prev => ({ ...prev, durationMonths: Number(e.target.value) }))}
                    placeholder="6"
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Assigned Role</label>
              <input
                type="text"
                required
                value={newEmp.role}
                onChange={(e) => setNewEmp(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Assistant Dispatcher"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Department</label>
              <select
                value={newEmp.department}
                onChange={(e) => setNewEmp(prev => ({ ...prev, department: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Technical">Technical (Workshop/CNG)</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="Executive">Executive</option>
                <option value="Support">Support / CRM</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Hub Branch</label>
              <select
                value={newEmp.branch}
                onChange={(e) => setNewEmp(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Katsina HQ">Katsina HQ</option>
                <option value="Gombe Hub">Gombe Hub</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Basic Monthly Allowance (₦)</label>
              <input
                type="number"
                required
                value={newEmp.salary}
                onChange={(e) => setNewEmp(prev => ({ ...prev, salary: Number(e.target.value) }))}
                placeholder="Allowance stipend value"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
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
              Onboard Staff
            </button>
          </div>
        </form>
      )}

      {/* Filters & Roster Table */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff by name or role..."
              className="w-full rounded-full border border-border pl-10 pr-4 py-2.5 text-xs focus:outline-emerald bg-white"
            />
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white"
            >
              <option value="ALL">All Branches</option>
              <option value="BR-KT">Katsina HQ</option>
              <option value="BR-GB">Gombe Hub</option>
            </select>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="rounded-xl border border-border px-3 py-2 text-xs focus:outline-emerald bg-white"
            >
              <option value="ALL">All Departments</option>
              <option value="Technical">Technical</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="Executive">Executive</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-border/70 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Name / Contact</th>
                <th className="p-4">Department & Role</th>
                <th className="p-4">Branch</th>
                <th className="p-4 text-right">Stipend / Salary</th>
                <th className="p-4 text-center">Attendance (Today)</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Verification Files</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No employees matched the query.
                  </td>
                </tr>
              ) : (
                filtered.map(emp => (
                  <tr key={emp.id} className="hover:bg-mist/10 transition">
                    <td className="p-4 font-mono font-bold text-forest">{emp.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        {emp.name}
                        {emp.category === "NYSC" && (
                          <span className="inline-block rounded-full bg-emerald-soft border border-emerald/20 px-2 py-0.5 text-[8px] font-bold text-forest-deep uppercase tracking-wider">
                            NYSC
                          </span>
                        )}
                        {emp.category === "Trainee" && (
                          <span className="inline-block rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[8px] font-bold text-blue-600 uppercase tracking-wider">
                            IT
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {emp.email}
                        {emp.category === "NYSC" && emp.stateCode && ` · Code: ${emp.stateCode}`}
                        {emp.category === "Trainee" && emp.institution && ` · ${emp.institution}`}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{emp.role}</div>
                      <span className="inline-block rounded bg-mist px-1.5 py-0.5 text-[9px] text-charcoal font-semibold mt-1">
                        {emp.department}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-foreground">{emp.branch}</td>
                    <td className="p-4 text-right font-mono font-bold text-forest-deep">
                      ₦{emp.salary.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAttendance(emp.id, emp.attendanceToday)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold text-[9px] uppercase cursor-pointer hover:opacity-85 transition ${
                          emp.attendanceToday === "Present" ? "bg-emerald-soft text-forest-deep" :
                          emp.attendanceToday === "Late" ? "bg-amber-100 text-amber-600" :
                          emp.attendanceToday === "Leave" ? "bg-blue-100 text-blue-600" :
                          "bg-red-100 text-red-500"
                        }`}
                      >
                        <RefreshCw className="h-2.5 w-2.5" />
                        {emp.attendanceToday || "Unset"}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 font-bold uppercase text-[9px] ${
                        emp.status === "Active" ? "bg-emerald-soft text-forest-deep" : 
                        emp.status === "On Leave" ? "bg-blue-100 text-blue-600" :
                        "bg-red-100 text-red-500"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button 
                          onClick={() => setEditEmp(emp)}
                          className="p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition cursor-pointer" 
                          title="Edit Staff Member"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => setActiveContractEmp(emp)}
                          className="p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition cursor-pointer" 
                          title="View Agreement Letter"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => setActiveCredsEmp(emp)}
                          className="p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition cursor-pointer" 
                          title="View Credentials Check"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {editEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-border shadow-elevated w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-5 bg-mist/20">
              <h3 className="font-display font-bold text-base text-foreground">Update Staff Records</h3>
              <button onClick={() => setEditEmp(null)} className="p-1 rounded-lg hover:bg-mist transition text-muted-foreground cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleEditEmployeeSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editEmp.name}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={editEmp.email}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Staff Category</label>
                  <select
                    value={editEmp.category || "Regular"}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, category: e.target.value as any }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  >
                    <option value="Regular">Regular Staff</option>
                    <option value="NYSC">NYSC Corper</option>
                    <option value="Trainee">Industrial Trainee (IT)</option>
                  </select>
                </div>

                {/* Conditional NYSC Edit Fields */}
                {editEmp.category === "NYSC" && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">NYSC State Code</label>
                      <input
                        type="text"
                        required
                        value={editEmp.stateCode || ""}
                        onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, stateCode: e.target.value }) : null)}
                        placeholder="e.g. KT/26A/0542"
                        className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Batch Group</label>
                      <input
                        type="text"
                        required
                        value={editEmp.batchGroup || ""}
                        onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, batchGroup: e.target.value }) : null)}
                        placeholder="e.g. 2026 Batch A"
                        className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                      />
                    </div>
                  </>
                )}

                {/* Conditional Trainee Edit Fields */}
                {editEmp.category === "Trainee" && (
                  <>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Educational Institution</label>
                      <input
                        type="text"
                        required
                        value={editEmp.institution || ""}
                        onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, institution: e.target.value }) : null)}
                        placeholder="e.g. University of Jos"
                        className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Internship Duration (Months)</label>
                      <input
                        type="number"
                        required
                        value={editEmp.durationMonths || 6}
                        onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, durationMonths: Number(e.target.value) }) : null)}
                        placeholder="6"
                        className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Assigned Role</label>
                  <input
                    type="text"
                    required
                    value={editEmp.role}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, role: e.target.value }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Department</label>
                  <select
                    value={editEmp.department}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, department: e.target.value }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  >
                    <option value="Technical">Technical (Workshop/CNG)</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="Executive">Executive</option>
                    <option value="Support">Support / CRM</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Hub Branch</label>
                  <select
                    value={editEmp.branch}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, branch: e.target.value }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  >
                    <option value="Katsina HQ">Katsina HQ</option>
                    <option value="Gombe Hub">Gombe Hub</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Basic Monthly Allowance (₦)</label>
                  <input
                    type="number"
                    required
                    value={editEmp.salary}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, salary: Number(e.target.value) }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Employment Status</label>
                  <select
                    value={editEmp.status}
                    onChange={(e) => setEditEmp(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setEditEmp(null)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-mist transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition cursor-pointer shadow-glow-soft"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agreement Contract Letter Modal */}
      {activeContractEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-border shadow-elevated w-full max-w-2xl overflow-hidden my-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border p-5 bg-mist/20">
              <h3 className="font-display font-bold text-base text-foreground">
                {activeContractEmp.category === "NYSC" ? "NYSC Deployment Document" :
                 activeContractEmp.category === "Trainee" ? "Internship Agreement Details" :
                 "Employment Agreement"}
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toast.info("Sent to Local Printer", { description: "Establishing local interface queue..." })}
                  className="p-1.5 rounded-lg hover:bg-mist transition text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Print Document"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => toast.success("PDF Generated", { description: `File cityview_contract_${activeContractEmp.id}.pdf download initiated.` })}
                  className="p-1.5 rounded-lg hover:bg-mist transition text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button onClick={() => setActiveContractEmp(null)} className="p-1 rounded-lg hover:bg-mist transition text-muted-foreground cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto text-charcoal font-sans text-xs leading-relaxed">
              {/* Document Letterhead */}
              <div className="text-center border-b border-border/80 pb-4">
                <div className="font-display font-black text-lg tracking-wider text-forest-deep">CITYVIEW SYNERGY LIMITED</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">CNG Fleet Operations & Automotives Engineering Hub</div>
                <div className="text-[9px] text-muted-foreground">Plot 12, Katsina Industrial Zone / Gombe Hub operations center</div>
              </div>

              {/* Date & Address */}
              <div className="space-y-1">
                <div className="font-bold">Ref: CV-{activeContractEmp.category || "REG"}-{activeContractEmp.id}</div>
                <div>Date: July 1, 2026</div>
                <div className="pt-2 font-semibold">To:</div>
                <div className="font-bold text-foreground text-sm">{activeContractEmp.name}</div>
                <div>{activeContractEmp.email}</div>
              </div>

              {/* Subject */}
              <div className="text-center font-bold text-foreground border-y border-border/50 py-2 uppercase tracking-wide">
                {activeContractEmp.category === "NYSC" ? "Letter of Primary Assignment Acceptance" :
                 activeContractEmp.category === "Trainee" ? "Internship Engagement Agreement" :
                 `Letter of Employment: ${activeContractEmp.role}`}
              </div>

              {/* Body */}
              <p>Dear {activeContractEmp.name.split(" ")[0]},</p>
              
              {activeContractEmp.category === "NYSC" ? (
                <>
                  <p>
                    We are pleased to accept your posting from the National Youth Service Corps (NYSC) to CityView Synergy Limited for your primary assignment service year. You are designated as a <strong>{activeContractEmp.role}</strong> in the <strong>{activeContractEmp.department}</strong> department, at our <strong>{activeContractEmp.branch}</strong> Hub.
                  </p>
                  <p>
                    <strong>Terms of Primary Assignment:</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Monthly Stipend:</strong> CityView will pay you a monthly local allowance/stipend of <strong>₦{activeContractEmp.salary.toLocaleString()}</strong>, in addition to the national NYSC allowance.</li>
                    <li><strong>NYSC State Code:</strong> {activeContractEmp.stateCode || "KT/26A/XXXX"} (Batch Group: {activeContractEmp.batchGroup || "2026 Batch A"}).</li>
                    <li><strong>Service Schedule:</strong> Service hours align with standard business hours: 07:30 to 18:00, Monday through Saturday.</li>
                  </ul>
                </>
              ) : activeContractEmp.category === "Trainee" ? (
                <>
                  <p>
                    Following your application for industrial placement, we are pleased to offer you an internship role at CityView Synergy Limited as an <strong>Industrial Trainee (IT)</strong> inside our <strong>{activeContractEmp.department}</strong> team at the <strong>{activeContractEmp.branch}</strong> branch.
                  </p>
                  <p>
                    <strong>Terms of Internship:</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Placement Duration:</strong> Active for a duration of <strong>{activeContractEmp.durationMonths || 6} Months</strong>, starting from your verified clearance date.</li>
                    <li><strong>Academic Institution:</strong> {activeContractEmp.institution || "Institution of record"}.</li>
                    <li><strong>Monthly Allowance:</strong> A basic trainee stipend of <strong>₦{activeContractEmp.salary.toLocaleString()}</strong> will be paid to cover transport and accommodation.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    We are pleased to offer you formal employment with CityView Synergy Limited as a <strong>{activeContractEmp.role}</strong> in the <strong>{activeContractEmp.department}</strong> department, assigned active desk at our <strong>{activeContractEmp.branch}</strong> Hub.
                  </p>

                  <p>
                    <strong>Terms of Engagement:</strong>
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Salary Structure:</strong> A basic starting monthly compensation of <strong>₦{activeContractEmp.salary.toLocaleString()}</strong>, payable by the 28th of every calendar month, subject to standard deductions.</li>
                    <li><strong>Working Hours:</strong> Standard workspace hours are 07:30 to 18:00, Monday through Saturday.</li>
                    <li><strong>CNG Safety Mandate:</strong> You will comply with all national CNG conversion and handling safety codes.</li>
                  </ul>
                </>
              )}

              <p>
                Please sign below to indicate your acceptance of these terms. Welcome to the CityView operational ecosystem.
              </p>

              {/* Signatures */}
              <div className="grid grid-cols-2 pt-8 gap-4 border-t border-border/50">
                <div className="space-y-1">
                  <div className="font-mono italic text-forest-deep font-bold">Alhaji Yusuf Bello</div>
                  <div className="h-0.5 w-32 bg-border" />
                  <div className="text-[10px] text-muted-foreground">Managing Director (CEO)</div>
                </div>
                <div className="space-y-1 text-right flex flex-col items-end">
                  <div className="font-mono italic text-forest-deep font-bold">{activeContractEmp.name}</div>
                  <div className="h-0.5 w-32 bg-border" />
                  <div className="text-[10px] text-muted-foreground">Employee Signature</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Check Viewer Modal */}
      {activeCredsEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-border shadow-elevated w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-border p-5 bg-mist/20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-forest" />
                <h3 className="font-display font-bold text-base text-foreground">Background Check Report</h3>
              </div>
              <button onClick={() => setActiveCredsEmp(null)} className="p-1 rounded-lg hover:bg-mist transition text-muted-foreground cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 bg-mist/30 rounded-2xl p-4 border border-border/60">
                <div className="h-10 w-10 rounded-full bg-emerald-soft flex items-center justify-center font-bold text-forest-deep">
                  {activeCredsEmp.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{activeCredsEmp.name}</div>
                  <div className="text-[10px] text-muted-foreground">ID: {activeCredsEmp.id} · {activeCredsEmp.role}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Verification Checklists</h4>
                
                {/* NIN Check */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-xs bg-white">
                  <div>
                    <span className="font-bold block">NIN Verification</span>
                    <span className="text-[10px] text-muted-foreground">National Identity Management Database</span>
                  </div>
                  <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 text-[10px] font-bold text-forest-deep uppercase">VERIFIED</span>
                </div>

                {/* Address Check */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-xs bg-white">
                  <div>
                    <span className="font-bold block">Residential Address Check</span>
                    <span className="text-[10px] text-muted-foreground">Physical verification of address</span>
                  </div>
                  <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 text-[10px] font-bold text-forest-deep uppercase">VERIFIED</span>
                </div>

                {/* Guarantor Check */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-xs bg-white">
                  <div>
                    <span className="font-bold block">Guarantor Forms</span>
                    <span className="text-[10px] text-muted-foreground">Identity &amp; assets verification of guarantor</span>
                  </div>
                  <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 text-[10px] font-bold text-forest-deep uppercase">VERIFIED</span>
                </div>

                {/* Criminal Record Check */}
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-xs bg-white">
                  <div>
                    <span className="font-bold block">Criminal Record Screening</span>
                    <span className="text-[10px] text-muted-foreground">Nigeria Police Force (NPF) database match</span>
                  </div>
                  <span className="rounded-full bg-emerald-soft px-2.5 py-0.5 text-[10px] font-bold text-forest-deep uppercase">CLEARED</span>
                </div>
              </div>

              <div className="rounded-2xl bg-forest-deep text-white p-4 text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald" />
                  Compliance Verification Complete
                </div>
                <p className="text-white/70 leading-normal">
                  All requirements for security screening, identification proofing, and guarantor indemnity have been verified by the CityView Compliance Desk.
                </p>
              </div>

              <button
                onClick={() => setActiveCredsEmp(null)}
                className="w-full rounded-xl bg-mist hover:bg-emerald-soft hover:text-forest-deep py-2.5 text-xs font-semibold text-charcoal transition cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
