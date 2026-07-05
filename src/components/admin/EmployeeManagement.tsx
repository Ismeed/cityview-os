import { useState } from "react";
import { ERPStore, Employee } from "./mockData";
import { Search, Plus, Filter, FileText, UserPlus, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(ERPStore.getEmployees());
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("ALL");
  const [deptFilter, setDeptFilter] = useState("ALL");
  
  // Form modal triggers
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    role: "Technician",
    department: "Technical",
    branch: "Katsina HQ",
    salary: 200000
  });

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
      attendanceToday: "Present"
    };

    const updated = [...employees, newEntry];
    setEmployees(updated);
    ERPStore.saveEmployees(updated);
    ERPStore.addAuditLog("HR Admin", "HR Manager", "Register Employee", `Registered employee ${newEmp.name} in department ${newEmp.department}`);
    
    toast.success("Employee Registered", {
      description: `${newEmp.name} has been added to payroll and personnel rosters.`
    });

    setNewEmp({
      name: "",
      email: "",
      role: "Technician",
      department: "Technical",
      branch: "Katsina HQ",
      salary: 200000
    });
    setShowAddForm(false);
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Assigned Role</label>
              <input
                type="text"
                required
                value={newEmp.role}
                onChange={(e) => setNewEmp(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Lead Mechanic"
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Basic Monthly Salary (₦)</label>
              <input
                type="number"
                required
                value={newEmp.salary}
                onChange={(e) => setNewEmp(prev => ({ ...prev, salary: Number(e.target.value) }))}
                placeholder="Salary in Naira"
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
                <th className="p-4 text-right">Monthly Salary</th>
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
                      <div className="font-bold text-foreground">{emp.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{emp.email}</div>
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
                        emp.status === "Active" ? "bg-emerald-soft text-forest-deep" : "bg-red-100 text-red-500"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button className="p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition" title="View Employment Contract">
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1 rounded bg-mist hover:bg-emerald-soft hover:text-forest-deep text-muted-foreground transition" title="View Credentials Check">
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
    </div>
  );
}
