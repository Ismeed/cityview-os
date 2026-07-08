import { useState, useEffect } from "react";
import { Search, Plus, MessageSquare, AlertCircle, Phone, Calendar, UserCheck, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  phone: string;
  type: "Individual" | "Corporate" | "Fleet Owner" | "Government";
  branch: string;
  notes?: string;
}

interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  vehicleModel: string;
  serviceType: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

interface Ticket {
  id: string;
  customerName: string;
  subject: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In-Progress" | "Resolved";
  dateCreated: string;
}

const initialCustomers: Customer[] = [
  { id: "CUST-101", name: "Alhaji Shehu", phone: "08031234567", type: "Individual", branch: "Katsina HQ" },
  { id: "CUST-102", name: "Katsina Transport Authority", phone: "09012345678", type: "Government", branch: "Katsina HQ", notes: "Fleet of 15 buses pending CNG Conversion" },
  { id: "CUST-103", name: "Gombe Courier Express", phone: "08176543210", type: "Corporate", branch: "Gombe Hub", notes: "Delivery tricycle logistics partner" }
];

const initialAppointments: Appointment[] = [
  { id: "APP-501", customerName: "Bello Lawal", phone: "08033334444", vehicleModel: "Toyota Sienna 2010", serviceType: "CNG Conversion Consultation", date: "2026-07-06", time: "10:30", status: "Scheduled" },
  { id: "APP-502", customerName: "Amina Yusuf", phone: "07066667777", vehicleModel: "Suzuki Every Bus", serviceType: "Vehicle Diagnostics Service", date: "2026-07-06", time: "14:00", status: "Scheduled" }
];

const initialTickets: Ticket[] = [
  { id: "TCK-801", customerName: "Alhaji Shehu", subject: "CNG regulator pressure warning light flashing", priority: "High", status: "Open", dateCreated: "2026-07-05" },
  { id: "TCK-802", customerName: "Gombe Courier Express", subject: "Tricycle clutch cable replacement inquiry", priority: "Medium", status: "In-Progress", dateCreated: "2026-07-04" }
];

export function CRM() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<"clients" | "appointments" | "tickets">("clients");

  const getActiveBranchDefault = () => {
    if (typeof window !== "undefined") {
      const selected = localStorage.getItem("cityview_selected_branch") || "ALL";
      if (selected === "BR-GB") return "Gombe Hub";
    }
    return "Katsina HQ";
  };

  // Client add form state
  const [showClientForm, setShowClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    type: "Individual" as Customer["type"],
    branch: getActiveBranchDefault(),
    notes: ""
  });

  // Keep default branch selection updated on branch change
  useEffect(() => {
    const refreshData = () => {
      setNewClient(prev => ({ ...prev, branch: getActiveBranchDefault() }));
    };
    window.addEventListener("cityview_branch_changed", refreshData);
    return () => window.removeEventListener("cityview_branch_changed", refreshData);
  }, []);

  // Appointment add form state
  const [showApptForm, setShowApptForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    customerName: "",
    phone: "",
    vehicleModel: "",
    serviceType: "CNG Conversion Consultation",
    date: "",
    time: "",
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Customer = {
      id: `CUST-${Date.now().toString().slice(-3)}`,
      name: newClient.name,
      phone: newClient.phone,
      type: newClient.type,
      branch: newClient.branch,
      notes: newClient.notes
    };
    setCustomers([...customers, entry]);
    toast.success("Client Registered", { description: `${newClient.name} added to CRM system.` });
    setNewClient({ name: "", phone: "", type: "Individual", branch: "Katsina HQ", notes: "" });
    setShowClientForm(false);
  };

  const handleAddAppt = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Appointment = {
      id: `APP-${Date.now().toString().slice(-3)}`,
      customerName: newAppt.customerName,
      phone: newAppt.phone,
      vehicleModel: newAppt.vehicleModel,
      serviceType: newAppt.serviceType,
      date: newAppt.date,
      time: newAppt.time,
      status: "Scheduled"
    };
    setAppointments([...appointments, entry]);
    toast.success("Appointment Scheduled", { description: `Booked for ${newAppt.date} at ${newAppt.time}` });
    setShowApptForm(false);
  };

  const resolveTicket = (id: string) => {
    const updated = tickets.map(t => t.id === id ? { ...t, status: "Resolved" as const } : t);
    setTickets(updated);
    toast.success("Ticket Resolved", { description: "CRM issue ticket marked closed." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex gap-2">
          <button 
            onClick={() => setSection("clients")}
            className={`font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${
              section === "clients" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"
            }`}
          >
            Client Directory
          </button>
          <button 
            onClick={() => setSection("appointments")}
            className={`font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${
              section === "appointments" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"
            }`}
          >
            Appointments
          </button>
          <button 
            onClick={() => setSection("tickets")}
            className={`font-display text-2xl font-bold px-4 py-2 rounded-2xl transition ${
              section === "tickets" ? "bg-forest text-white" : "text-muted-foreground hover:bg-mist"
            }`}
          >
            Tickets
          </button>
        </div>

        {section === "clients" && (
          <button
            onClick={() => setShowClientForm(!showClientForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Register Customer
          </button>
        )}
        {section === "appointments" && (
          <button
            onClick={() => setShowApptForm(!showApptForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Book Appointment
          </button>
        )}
      </div>

      {/* Forms Segment */}
      {section === "clients" && showClientForm && (
        <form onSubmit={handleAddClient} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Register Client Profile</h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Client Name</label>
              <input
                type="text"
                required
                value={newClient.name}
                onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Muhammadu Haruna"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={newClient.phone}
                onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Client Classification</label>
              <select
                value={newClient.type}
                onChange={(e) => setNewClient(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
              >
                <option value="Individual">Individual driver</option>
                <option value="Corporate">Private Company</option>
                <option value="Fleet Owner">Fleet partner</option>
                <option value="Government">Government / Agency</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Notes / Fleet description</label>
            <input
              type="text"
              value={newClient.notes}
              onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="e.g. Inquiries regarding CNG microbus conversions"
              className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs focus:outline-emerald bg-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowClientForm(false)} className="rounded-full border border-border px-4 py-2 text-xs font-semibold">Cancel</button>
            <button type="submit" className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-glow-soft">Register</button>
          </div>
        </form>
      )}

      {section === "appointments" && showApptForm && (
        <form onSubmit={handleAddAppt} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down max-w-3xl">
          <h4 className="font-display font-bold text-base text-foreground">Schedule Workshop Appointment</h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={newAppt.customerName}
                onChange={(e) => setNewAppt(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={newAppt.phone}
                onChange={(e) => setNewAppt(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Vehicle Model</label>
              <input
                type="text"
                required
                value={newAppt.vehicleModel}
                onChange={(e) => setNewAppt(prev => ({ ...prev, vehicleModel: e.target.value }))}
                placeholder="e.g. Toyota Sienna"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Service Type</label>
              <select
                value={newAppt.serviceType}
                onChange={(e) => setNewAppt(prev => ({ ...prev, serviceType: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              >
                <option value="CNG Conversion Consultation">CNG Conversion Consultation</option>
                <option value="Vehicle Diagnostics Service">Vehicle Diagnostics Service</option>
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="Routine Servicing">Routine Servicing</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Appointment Date</label>
              <input
                type="date"
                required
                value={newAppt.date}
                onChange={(e) => setNewAppt(prev => ({ ...prev, date: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Appointment Time</label>
              <input
                type="time"
                required
                value={newAppt.time}
                onChange={(e) => setNewAppt(prev => ({ ...prev, time: e.target.value }))}
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-xs bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowApptForm(false)} className="rounded-full border border-border px-4 py-2 text-xs font-semibold">Cancel</button>
            <button type="submit" className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-glow-soft">Book Schedule</button>
          </div>
        </form>
      )}

      {/* Main tables list */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
        {section === "clients" ? (
          <div className="overflow-x-auto border border-border/70 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                  <th className="p-4">Customer ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Registered Branch</th>
                  <th className="p-4">Log Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-mist/10 transition">
                    <td className="p-4 font-mono font-bold text-forest">{c.id}</td>
                    <td className="p-4 font-semibold text-foreground">{c.name}</td>
                    <td className="p-4">{c.phone}</td>
                    <td className="p-4">
                      <span className="inline-block rounded bg-mist px-2 py-0.5 font-semibold text-charcoal">
                        {c.type}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{c.branch}</td>
                    <td className="p-4 italic text-muted-foreground">{c.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : section === "appointments" ? (
          <div className="overflow-x-auto border border-border/70 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-mist/35 border-b border-border/80 font-bold uppercase text-muted-foreground tracking-wider">
                  <th className="p-4">Appt ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Vehicle Model</th>
                  <th className="p-4">Requested Service</th>
                  <th className="p-4">Appointment Schedule</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {appointments.map(a => (
                  <tr key={a.id} className="hover:bg-mist/10 transition">
                    <td className="p-4 font-mono font-bold text-forest">{a.id}</td>
                    <td className="p-4 font-semibold text-foreground">{a.customerName}</td>
                    <td className="p-4">{a.phone}</td>
                    <td className="p-4 font-semibold text-charcoal">{a.vehicleModel}</td>
                    <td className="p-4 text-forest-deep font-semibold">{a.serviceType}</td>
                    <td className="p-4 font-semibold">
                      {a.date} @ {a.time}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block rounded-full bg-blue-100 text-blue-600 px-2.5 py-0.5 font-bold uppercase tracking-wider text-[9px]">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-foreground">Support Issues & Feedback Logs</span>
            </div>

            <div className="grid gap-4">
              {tickets.map(t => (
                <div key={t.id} className="rounded-2xl border border-border p-4 hover:shadow-soft transition bg-white flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                      t.priority === "High" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"
                    }`}>
                      {t.priority === "High" ? <ShieldAlert className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-forest">{t.id}</span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          t.status === "Open" ? "bg-red-100 text-red-500" :
                          t.status === "In-Progress" ? "bg-blue-100 text-blue-500" :
                          "bg-slate-100 text-muted-foreground"
                        }`}>{t.status}</span>
                      </div>
                      <h5 className="font-semibold text-foreground text-sm mt-1">{t.subject}</h5>
                      <span className="text-[10px] text-muted-foreground">Client: {t.customerName} · Raised: {t.dateCreated}</span>
                    </div>
                  </div>

                  {t.status !== "Resolved" && (
                    <button
                      onClick={() => resolveTicket(t.id)}
                      className="rounded-lg bg-emerald-soft text-forest-deep px-3 py-1.5 text-[10px] font-bold hover:bg-emerald hover:text-white transition cursor-pointer"
                    >
                      Resolve Issue
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
