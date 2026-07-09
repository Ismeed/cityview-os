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
export const SEED_ACCOUNTS: (AuthUser & { password: string; disabled?: boolean })[] = [
  {
    email: "admin@cityview.ng",
    password: "Password123",
    name: "Engr Almustapha Sada Abdullahi",
    role: "Super Admin",
    department: "Executive",
    branch: "ALL",
    disabled: false
  },
  {
    email: "workshop.global@cityview.ng",
    password: "Password123",
    name: "Workshop Global Officer",
    role: "Workshop & CNG Operations Officer",
    department: "Workshop & CNG Conversion",
    branch: "ALL",
    disabled: true
  },
  {
    email: "fleet.katsina@cityview.ng",
    password: "Password123",
    name: "Katsina Fleet Manager",
    role: "Fleet Manager",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-KT",
    disabled: true
  },
  {
    email: "fleet.gombe@cityview.ng",
    password: "Password123",
    name: "Gombe Fleet Manager",
    role: "Fleet Manager",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-GB",
    disabled: true
  },
  {
    email: "workshop.katsina@cityview.ng",
    password: "Password123",
    name: "Katsina Workshop Manager",
    role: "Workshop Manager",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-KT",
    disabled: true
  },
  {
    email: "workshop.gombe@cityview.ng",
    password: "Password123",
    name: "Gombe Workshop Manager",
    role: "Workshop Manager",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-GB",
    disabled: true
  },
  {
    email: "admin.katsina@cityview.ng",
    password: "Password123",
    name: "Katsina Branch Admin",
    role: "Branch Admin",
    department: "Administration & HR",
    branch: "BR-KT",
    disabled: true
  },
  {
    email: "admin.gombe@cityview.ng",
    password: "Password123",
    name: "Gombe Branch Admin",
    role: "Branch Admin",
    department: "Administration & HR",
    branch: "BR-GB",
    disabled: true
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
    "hp",
    "settings"
  ],
  "Fleet Manager": [
    "fleet_dashboard",
    "fleet",
    "drivers",
    "shifts",
    "hp",
    "settings"
  ],
  "Workshop & CNG Operations Officer": [
    "workshop_dashboard",
    "fleet",
    "workshop",
    "inventory",
    "settings"
  ],
  "Workshop Manager": [
    "workshop_dashboard",
    "fleet",
    "workshop",
    "inventory",
    "settings"
  ],
  "Branch Admin": [
    "overview",
    "employees",
    "drivers",
    "shifts",
    "fleet",
    "inventory",
    "crm",
    "settings"
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

export function loadStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return SEED_ACCOUNTS.map(a => ({
    email: a.email, name: a.name, role: a.role,
    department: a.department, branch: a.branch,
    branchName: a.branch === "ALL" ? "Global Enterprise" : a.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub",
    passwordHash: a.password, disabled: a.disabled !== undefined ? a.disabled : false
  }));

  const stored = localStorage.getItem("cityview_erp_users");
  let list: StoredUser[] = [];
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    } catch (_) { /* fall through */ }
  }

  // Ensure all SEED_ACCOUNTS are present in the list (match by email)
  let updated = false;
  SEED_ACCOUNTS.forEach(seed => {
    const exists = list.some(u => u.email.toLowerCase() === seed.email.toLowerCase());
    if (!exists) {
      list.push({
        email: seed.email,
        name: seed.name,
        role: seed.role,
        department: seed.department,
        branch: seed.branch,
        branchName: seed.branch === "ALL" ? "Global Enterprise" : seed.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub",
        passwordHash: seed.password,
        disabled: seed.disabled !== undefined ? seed.disabled : false
      });
      updated = true;
    }
  });

  if (updated || !stored) {
    localStorage.setItem("cityview_erp_users", JSON.stringify(list));
  }
  return list;
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
export function getAccounts() { 
  return loadStoredUsers(); 
}
export function saveAccounts(users: any[]) { 
  if (typeof window !== "undefined") {
    localStorage.setItem("cityview_erp_users", JSON.stringify(users));
  }
}
