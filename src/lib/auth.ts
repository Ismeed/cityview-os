export interface AuthUser {
  email: string;
  name: string;
  role: string;
  department: string;
  branch: string; // "ALL" for Super Admin, "BR-KT" for Katsina, "BR-GB" for Gombe
}

export const DEMO_ACCOUNTS: Record<string, AuthUser & { password: string }> = {
  super_admin: {
    email: "admin@cityview.ng",
    password: "Password123",
    name: "Alhaji Yusuf Bello",
    role: "Super Admin",
    department: "Executive",
    branch: "ALL"
  },
  katsina_fleet: {
    email: "fleet.katsina@cityview.ng",
    password: "Password123",
    name: "Kabir Katsina",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-KT"
  },
  katsina_workshop: {
    email: "workshop.katsina@cityview.ng",
    password: "Password123",
    name: "Engr. Bashir Katsina",
    role: "Workshop & CNG Operations Officer",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-KT"
  },
  gombe_fleet: {
    email: "fleet.gombe@cityview.ng",
    password: "Password123",
    name: "Sani Gombe",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-GB"
  },
  gombe_workshop: {
    email: "workshop.gombe@cityview.ng",
    password: "Password123",
    name: "Engr. Bala Gombe",
    role: "Workshop & CNG Operations Officer",
    department: "Workshop & CNG Conversion",
    branch: "BR-GB"
  }
};

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

// Load custom user accounts from LocalStorage, fallback to DEMO_ACCOUNTS
export function getAccounts(): Record<string, AuthUser & { password: string }> {
  if (typeof window === "undefined") return DEMO_ACCOUNTS;
  const stored = localStorage.getItem("cityview_auth_accounts");
  if (!stored) {
    localStorage.setItem("cityview_auth_accounts", JSON.stringify(DEMO_ACCOUNTS));
    return DEMO_ACCOUNTS;
  }
  try {
    return JSON.parse(stored) as Record<string, AuthUser & { password: string }>;
  } catch (e) {
    return DEMO_ACCOUNTS;
  }
}

export function saveAccounts(accounts: Record<string, AuthUser & { password: string }>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cityview_auth_accounts", JSON.stringify(accounts));
  }
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

// Log in user and return session or error string
export function loginUser(email: string, pass: string): AuthUser | string {
  const accounts = getAccounts();
  const matchKey = Object.keys(accounts).find(
    (key) => accounts[key].email.toLowerCase() === email.toLowerCase()
  );

  if (!matchKey) {
    return "Invalid email credentials. Account not registered.";
  }

  const account = accounts[matchKey];
  if (account.password !== pass) {
    return "Invalid password. Access Denied.";
  }

  const session: AuthUser = {
    email: account.email,
    name: account.name,
    role: account.role,
    department: account.department,
    branch: account.branch
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
