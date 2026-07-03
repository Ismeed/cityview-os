import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  MapPin, 
  Briefcase, 
  Image, 
  HelpCircle, 
  MessageSquare, 
  Download, 
  Check, 
  X, 
  Clock, 
  Plus, 
  Trash2,
  Database,
  Search,
  Eye,
  TrendingUp,
  Fuel
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — CityView CNG" },
      { name: "description", content: "Management dashboard for CityView CNG operations." },
    ],
  }),
  component: AdminPanel,
});

type Application = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  city: string;
  experience: string;
  guarantorName: string;
  guarantorPhone: string;
  status: string;
  date: string;
};

type Booking = {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  vehicleModel: string;
  location: string;
  date: string;
  time: string;
  status: string;
  dateCreated: string;
};

type BlogPost = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  date: string;
};

function AdminPanel() {
  const [activeSec, setActiveSec] = useState<"overview" | "hp" | "workshop" | "content">("overview");
  
  // State for data loaded from localStorage
  const [applications, setApplications] = useState<Application[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  // Blog form state
  const [newBlog, setNewBlog] = useState({ title: "", author: "Admin", category: "CNG Education", status: "Published" });
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Load data on mount
  useEffect(() => {
    // 1. Applications
    const storedApps = localStorage.getItem("cityview_hp_applications");
    if (storedApps) {
      setApplications(JSON.parse(storedApps));
    } else {
      const mockApps = [
        { id: "APP-9021", name: "Muhammadu Buhari", phone: "08031112222", whatsapp: "08031112222", city: "Katsina", experience: "3-5 Years", guarantorName: "Mallam Lawal", guarantorPhone: "08034445555", status: "Approved", date: "2026-07-01" },
        { id: "APP-8452", name: "Umar Gombe", phone: "08159990000", whatsapp: "", city: "Gombe", experience: "Over 5 Years", guarantorName: "Alhaji Danladi", guarantorPhone: "08151112222", status: "Pending", date: "2026-07-02" }
      ];
      localStorage.setItem("cityview_hp_applications", JSON.stringify(mockApps));
      setApplications(mockApps);
    }

    // 2. Bookings
    const storedBookings = localStorage.getItem("cityview_workshop_bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      const mockBookings = [
        { id: "BK-4051", name: "Mustapha Yusuf", phone: "09033334444", serviceType: "CNG Conversion Consultation", vehicleModel: "Toyota Corolla 2012", location: "Katsina", date: "2026-07-10", time: "10:30", status: "Confirmed", dateCreated: "2026-07-01" },
        { id: "BK-3912", name: "Fatima Gombe", phone: "07066667777", serviceType: "Vehicle Diagnostic Inspection", vehicleModel: "Honda Accord 2015", location: "Gombe", date: "2026-07-09", time: "14:00", status: "Confirmed", dateCreated: "2026-07-02" }
      ];
      localStorage.setItem("cityview_workshop_bookings", JSON.stringify(mockBookings));
      setBookings(mockBookings);
    }

    // 3. Blog Posts
    const storedBlogs = localStorage.getItem("cityview_blogs");
    if (storedBlogs) {
      setBlogPosts(JSON.parse(storedBlogs));
    } else {
      const mockBlogs = [
        { id: "BLOG-1", title: "Understanding the CNG Conversion Process", author: "Engr. Yusuf Bello", category: "CNG Education", status: "Published", date: "2026-06-25" },
        { id: "BLOG-2", title: "Why Commercial Fleet Owners in Nigeria are Swapping Petrol for Gas", author: "Dr. Grace Olamide", category: "Fleet Operations", status: "Published", date: "2026-06-28" }
      ];
      localStorage.setItem("cityview_blogs", JSON.stringify(mockBlogs));
      setBlogPosts(mockBlogs);
    }
  }, []);

  // Update Status handlers
  const updateAppStatus = (id: string, newStatus: string) => {
    const updated = applications.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setApplications(updated);
    localStorage.setItem("cityview_hp_applications", JSON.stringify(updated));
  };

  const updateBookingStatus = (id: string, newStatus: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem("cityview_workshop_bookings", JSON.stringify(updated));
  };

  // Blog creation handler
  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: `BLOG-${Date.now().toString().slice(-4)}`,
      title: newBlog.title,
      author: newBlog.author,
      category: newBlog.category,
      status: newBlog.status,
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [newEntry, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem("cityview_blogs", JSON.stringify(updated));
    setNewBlog({ title: "", author: "Admin", category: "CNG Education", status: "Published" });
    setShowBlogForm(false);
  };

  const deleteBlog = (id: string) => {
    const updated = blogPosts.filter(b => b.id !== id);
    setBlogPosts(updated);
    localStorage.setItem("cityview_blogs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-mist/30 pt-28 pb-16">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* SIDEBAR TABS */}
          <aside className="w-full lg:w-64 bg-white rounded-3xl border border-border p-6 shadow-soft shrink-0">
            <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-forest flex items-center justify-center text-white"><Database className="h-5 w-5" /></div>
              <div>
                <h2 className="font-display font-semibold text-foreground text-sm">CityView CMS</h2>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Control Panel</span>
              </div>
            </div>

            <nav className="space-y-1.5">
              {[
                { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
                { id: "hp", label: "Hire Purchase Apps", icon: FileText, count: applications.filter(a => a.status === "Pending").length },
                { id: "workshop", label: "Workshop Bookings", icon: Wrench, count: bookings.filter(b => b.status === "Confirmed").length },
                { id: "content", label: "Manage Blog Posts", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSec(tab.id as any)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeSec === tab.id
                      ? "bg-forest text-white shadow-md"
                      : "text-muted-foreground hover:bg-mist/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeSec === tab.id ? "bg-white text-forest" : "bg-emerald text-forest-deep"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN DASHBOARD PANEL */}
          <main className="flex-1 w-full bg-white rounded-4xl border border-border p-8 shadow-medium">
            
            {/* 1. OVERVIEW */}
            {activeSec === "overview" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="font-display text-3xl font-bold text-foreground">Operational Overview</h3>
                  <p className="text-sm text-muted-foreground mt-1">Real-time submissions and conversion inquiries across Katsina & Gombe hubs.</p>
                </div>

                {/* KPI metrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-border p-6 flex flex-col justify-between bg-mist/20">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pending Hire Purchase</span>
                      <div className="font-display text-3xl font-bold text-forest-deep mt-2">{applications.filter(a => a.status === "Pending").length}</div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-4">Awaiting driver interviews</span>
                  </div>
                  <div className="rounded-3xl border border-border p-6 flex flex-col justify-between bg-mist/20">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Confirmed Service Bookings</span>
                      <div className="font-display text-3xl font-bold text-forest-deep mt-2">{bookings.filter(b => b.status === "Confirmed").length}</div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-4">Scheduled for inspection</span>
                  </div>
                  <div className="rounded-3xl border border-border p-6 flex flex-col justify-between bg-emerald-soft/40">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Blog Articles</span>
                      <div className="font-display text-3xl font-bold text-forest-deep mt-2">{blogPosts.length}</div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-4">SEO & customer education</span>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="border-t border-border pt-8">
                  <h4 className="font-display font-semibold text-lg text-foreground mb-4">Latest Inquiries</h4>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map(app => (
                      <div key={app.id} className="rounded-2xl border border-border p-4 flex items-center justify-between text-sm hover:shadow-soft transition">
                        <div>
                          <span className="text-xs text-muted-foreground">{app.date}</span>
                          <h5 className="font-display font-semibold text-foreground mt-1">{app.name} — HP Application</h5>
                          <p className="text-xs text-muted-foreground mt-0.5">Tricycle ownership scheme · {app.city}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          app.status === "Approved" ? "bg-emerald-soft text-forest-deep" : "bg-yellow-400/10 text-yellow-500"
                        }`}>{app.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. HIRE PURCHASE APPLICATIONS */}
            {activeSec === "hp" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-display text-3xl font-bold text-foreground">Hire Purchase Applications</h3>
                  <p className="text-sm text-muted-foreground mt-1">Review applicant profiles, driving credentials, and guarantor details.</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-mist/30 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4">ID</th>
                        <th className="p-4">Driver Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Guarantor</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {applications.length === 0 ? (
                        <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No applications found.</td></tr>
                      ) : (
                        applications.map((app) => (
                          <tr key={app.id} className="hover:bg-mist/10 transition">
                            <td className="p-4 font-mono text-xs font-bold text-forest">{app.id}</td>
                            <td className="p-4">
                              <div className="font-semibold text-foreground">{app.name}</div>
                              <div className="text-[10px] text-muted-foreground">{app.experience} Exp</div>
                            </td>
                            <td className="p-4">
                              <div>{app.phone}</div>
                              {app.whatsapp && <div className="text-[10px] text-emerald">WA: {app.whatsapp}</div>}
                            </td>
                            <td className="p-4 font-semibold text-foreground">{app.city}</td>
                            <td className="p-4">
                              <div className="text-xs">{app.guarantorName}</div>
                              <div className="text-[10px] text-muted-foreground">{app.guarantorPhone}</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                app.status === "Approved" ? "bg-emerald-soft text-forest-deep" : 
                                app.status === "Rejected" ? "bg-red-100 text-red-500" :
                                "bg-amber-100 text-amber-600"
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {app.status === "Pending" ? (
                                <div className="flex gap-1 justify-end">
                                  <button
                                    onClick={() => updateAppStatus(app.id, "Approved")}
                                    className="p-1.5 rounded-lg bg-emerald-soft text-forest-deep hover:bg-emerald hover:text-white transition"
                                    title="Approve Driver"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => updateAppStatus(app.id, "Rejected")}
                                    className="p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                                    title="Reject Driver"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] text-muted-foreground font-semibold">Processed</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. WORKSHOP BOOKINGS */}
            {activeSec === "workshop" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-display text-3xl font-bold text-foreground">Workshop Bookings</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage mechanical and CNG conversion appointments at service hubs.</p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-mist/30 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                        <th className="p-4">ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Vehicle Model</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Hub Location</th>
                        <th className="p-4">Appointment</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {bookings.length === 0 ? (
                        <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No bookings found.</td></tr>
                      ) : (
                        bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-mist/10 transition">
                            <td className="p-4 font-mono text-xs font-bold text-forest">{b.id}</td>
                            <td className="p-4">
                              <div className="font-semibold text-foreground">{b.name}</div>
                              <div className="text-[10px] text-muted-foreground">{b.phone}</div>
                            </td>
                            <td className="p-4 font-medium text-foreground">{b.vehicleModel}</td>
                            <td className="p-4 text-xs font-semibold text-forest-deep">{b.serviceType}</td>
                            <td className="p-4">{b.location}</td>
                            <td className="p-4">
                              <div className="text-xs font-bold text-foreground">{b.date}</div>
                              <div className="text-[10px] text-muted-foreground">{b.time}</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                b.status === "Completed" ? "bg-slate-100 text-muted-foreground" : "bg-emerald-soft text-forest-deep"
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {b.status === "Confirmed" ? (
                                <button
                                  onClick={() => updateBookingStatus(b.id, "Completed")}
                                  className="text-xs font-bold text-forest hover:text-forest-deep"
                                >
                                  Mark Done
                                </button>
                              ) : (
                                <span className="text-[10px] text-muted-foreground">Completed</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. CONTENT MANAGEMENT (BLOGS) */}
            {activeSec === "content" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-foreground">Blog & Article Posts</h3>
                    <p className="text-sm text-muted-foreground mt-1">Write educational resources or company news to index for SEO.</p>
                  </div>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition shadow-glow-soft cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Create Article
                  </button>
                </div>

                {/* Create Blog Form Overlay */}
                {showBlogForm && (
                  <form onSubmit={handleCreateBlog} className="rounded-3xl border border-border bg-mist/20 p-6 space-y-4 animate-fade-down">
                    <h4 className="font-display font-semibold text-base">New Article Details</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          value={newBlog.title}
                          onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Tips for Maintaining Your CNG Regulator"
                          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-emerald bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Category</label>
                        <select
                          value={newBlog.category}
                          onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full rounded-xl border border-border px-3 py-2 text-sm focus:outline-emerald bg-white"
                        >
                          <option value="CNG Education">CNG Education</option>
                          <option value="Fleet Operations">Fleet Operations</option>
                          <option value="Company News">Company News</option>
                          <option value="Maintenance Tips">Maintenance Tips</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBlogForm(false)}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-white transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white hover:bg-forest-deep transition"
                      >
                        Publish Post
                      </button>
                    </div>
                  </form>
                )}

                {/* Blogs list */}
                <div className="grid gap-4">
                  {blogPosts.map(post => (
                    <div key={post.id} className="rounded-2xl border border-border p-5 flex items-center justify-between shadow-soft">
                      <div>
                        <span className="inline-block rounded-full bg-emerald-soft text-forest-deep px-2.5 py-0.5 text-[10px] font-bold uppercase">
                          {post.category}
                        </span>
                        <h4 className="mt-2 font-display font-semibold text-lg text-foreground">{post.title}</h4>
                        <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>Published {post.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteBlog(post.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition"
                        title="Delete Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
