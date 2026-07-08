export interface AuthUser {
  email: string;
  name: string;
  role: string;
  department: string;
  branch: string; // "ALL" for Super Admin, "BR-KT" for Katsina, "BR-GB" for Gombe
}

// ──────────────────────────────────────────────────────────────────────────────
// Seed / Fallback accounts (used only when cityview_erp_users is empty)
// ──────────────────────────────────────────────────────────────────────────────
export const SEED_ACCOUNTS: (AuthUser & { password: string })[] = [
  {
    email: "admin@cityview.ng",
    password: "Password123",
    name: "Engr Almustapha Sada Abdullahi",
    role: "Super Admin",
    department: "Executive",
    branch: "ALL"
  },
  {
    email: "fleet.katsina@cityview.ng",
    password: "Password123",
    name: "Kabir Katsina",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-KT"
  },
  {
    email: "workshop.katsina@cityview.ng",
    password: "Password123",
    name: "Engr. Bashir Katsina",
    role: "Workshop & CNG Operations Officer",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-KT"
  },
  {
    email: "fleet.gombe@cityview.ng",
    password: "Password123",
    name: "Sani Gombe",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-GB"
  },
  {
    email: "workshop.gombe@cityview.ng",
    password: "Password123",
    name: "Engr. Bala Gombe",
    role: "Workshop & CNG Operations Officer",
    department: "Workshop & CNG Conversion",
    branch: "BR-GB"
  }
];

// Roles mapping to allowed sidebar navigation tabs
export const ROLE_TAB_PERMISSIONS: Record<string, string[]> = {
  "Super Admin": [
    "overview",
    "fleet_dashboard",
    "workshop_dashboard",
    "branches",
    "employees",
    "fleet",
    "drivers",
    "shifts",
    "hp",
    "workshop",
    "inventory",
    "finance",
    "crm",
    "settings"
  ],
  "Branch Operations Officer": [
    "fleet_dashboard",
    "fleet",
    "drivers",
    "shifts",
    "hp"
  ],
  "Workshop & CNG Operations Officer": [
    "workshop_dashboard",
    "fleet", // view-only fleet for parts/jobs association
    "workshop",
    "inventory"
  ]
};

// ──────────────────────────────────────────────────────────────────────────────
// Helpers: read all registered user accounts from ERPStore (cityview_erp_users).
// Falls back to SEED_ACCOUNTS if nothing is stored yet.
// ──────────────────────────────────────────────────────────────────────────────
interface StoredUser {
  email: string;
  name: string;
  role: string;
  department: string;
  branch: string;       // "ALL" | "BR-KT" | "BR-GB"
  branchName: string;
  passwordHash: string; // plaintext password
  disabled?: boolean;
}

function loadStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return SEED_ACCOUNTS.map(a => ({
    email: a.email, name: a.name, role: a.role,
    department: a.department, branch: a.branch,
    branchName: a.branch === "ALL" ? "Global Enterprise" : a.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub",
    passwordHash: a.password, disabled: false
  }));
  const stored = localStorage.getItem("cityview_erp_users");
  if (stored) {
    try {
      const parsed: StoredUser[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) { /* fall through */ }
  }
  // Seed default users on first load
  const seeds: StoredUser[] = SEED_ACCOUNTS.map(a => ({
    email: a.email, name: a.name, role: a.role,
    department: a.department, branch: a.branch,
    branchName: a.branch === "ALL" ? "Global Enterprise" : a.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub",
    passwordHash: a.password, disabled: false
  }));
  localStorage.setItem("cityview_erp_users", JSON.stringify(seeds));
  return seeds;
}

// Load session from LocalStorage
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("cityview_auth_session");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch (e) {
    return null;
  }
}

// Log in user – checks cityview_erp_users (unified credential store)
export function loginUser(email: string, pass: string): AuthUser | string {
  const accounts = loadStoredUsers();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );

  if (!match) {
    return "Invalid email credentials. Account not registered.";
  }

  if (match.disabled) {
    return "This account has been disabled. Contact the system administrator.";
  }

  if (match.passwordHash !== pass) {
    return "Invalid password. Access Denied.";
  }

  const session: AuthUser = {
    email: match.email,
    name: match.name,
    role: match.role,
    department: match.department,
    branch: match.branch
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("cityview_auth_session", JSON.stringify(session));
  }

  return session;
}

// Clear active session
export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cityview_auth_session");
  }
}

// Check tab access clearance
export function checkTabPermission(user: AuthUser | null, tab: string): boolean {
  if (!user) return false;
  const allowed = ROLE_TAB_PERMISSIONS[user.role] || [];
  return allowed.includes(tab);
}

// Check if user is authorized to read/write record belonging to a branch
export function checkBranchAuthorization(user: AuthUser | null, targetBranch: string): boolean {
  if (!user) return false;
  if (user.branch === "ALL") return true;

  // Map database branch descriptions ("Katsina HQ", "Gombe Hub") to code codes ("BR-KT", "BR-GB")
  const userBranchDesc = user.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub";
  
  // Normalize parameters
  const normalizedTarget = targetBranch === "BR-KT" ? "Katsina HQ" : 
                           targetBranch === "BR-GB" ? "Gombe Hub" : targetBranch;

  return userBranchDesc === normalizedTarget;
}

// Keep legacy export alias for backward compatibility
export const DEMO_ACCOUNTS = SEED_ACCOUNTS;
export function getAccounts() { return {}; }
export function saveAccounts(_: unknown) { /* no-op */ }
