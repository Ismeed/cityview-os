export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
  status: "Active" | "Upcoming";
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  branch: string;
  salary: number;
  status: "Active" | "On Leave" | "Suspended";
  attendanceToday?: "Present" | "Absent" | "Late" | "Leave";
  category?: "Regular" | "NYSC" | "Trainee";
  stateCode?: string;
  batchGroup?: string;
  institution?: string;
  durationMonths?: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  guarantorName: string;
  guarantorPhone: string;
  branch: string;
  status: "Active" | "Suspended" | "Pending Approval";
  remittanceRate: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: "Tricycle" | "Mini Bus" | "Car" | "Truck";
  fuelType: "Petrol" | "CNG" | "Hybrid";
  conversionStatus: "Converted" | "Petrol Only" | "In-Progress";
  branch: string;
  status: "Available" | "On Road" | "In Workshop" | "Decommissioned";
  assignedDriverId?: string;
  lastServiceDate?: string;
}

export interface Shift {
  id: string;
  driverId: string;
  vehicleId: string;
  branch: string;
  shiftType: "Morning" | "Evening";
  startTime: string;
  endTime?: string;
  startMileage: number;
  endMileage?: number;
  expectedRemittance: number;
  actualRemittance?: number;
  status: "In Progress" | "Completed" | "Defaulted";
  notes?: string;
  date: string;
}

export interface HirePurchaseContract {
  id: string;
  driverId: string;
  vehicleId: string;
  totalAmount: number;
  balancePaid: number;
  dailyTarget: number;
  startDate: string;
  endDateExpected: string;
  status: "Active" | "Completed" | "Missed Remittance" | "Defaulted";
  paymentHistory: { date: string; amount: number }[];
}

export interface JobCard {
  id: string;
  customerName: string;
  customerPhone: string;
  vehiclePlate: string;
  vehicleModel: string;
  issueDescription: string;
  assignedTechnicianId: string;
  laborCharges: number;
  partsUsed: { partId: string; name: string; quantity: number; cost: number }[];
  status: "Inspecting" | "Diagnostics" | "Awaiting Approval" | "Repairing" | "Completed" | "Handed Over";
  date: string;
}

export interface CNGConversion {
  id: string;
  customerName: string;
  vehiclePlate: string;
  vehicleModel: string;
  cngKitType: string;
  cylinderSize: string;
  cost: number;
  status: "Inspection" | "Quotation Approved" | "Installation" | "Testing & Calibration" | "Certification" | "Handed Over";
  assignedEngineers: string[];
  dateStarted: string;
  dateCompleted?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "CNG Kits" | "Cylinders" | "Spare Parts" | "Engine Oil" | "Tyres" | "Filters" | "Tools";
  stockLevel: number;
  minStockLevel: number;
  unitPrice: number;
  supplier: string;
}

export interface Transaction {
  id: string;
  type: "Revenue" | "Expense";
  amount: number;
  category: "CNG Conversion" | "Hire Purchase" | "Workshop Repairs" | "Fleet Remittance" | "Salaries" | "Parts Purchase" | "Fuel" | "Rent & Utilities" | "Other";
  description: string;
  branch: string;
  date: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
}

export interface SyncOperation {
  id: string;
  timestamp: string;
  action: string;
  details: string;
}

// Initial Mock Seed Data
const initialBranches: Branch[] = [
  { id: "BR-KT", name: "Katsina HQ", location: "Katsina State", manager: "Engr Almustapha Sada Abdullahi", status: "Active" },
  { id: "BR-GB", name: "Gombe Hub", location: "Gombe State", manager: "TBD", status: "Active" },
  { id: "BR-KN", name: "Kano Branch", location: "Kano State", manager: "TBD", status: "Upcoming" },
  { id: "BR-KD", name: "Kaduna Branch", location: "Kaduna State", manager: "TBD", status: "Upcoming" },
  { id: "BR-ABJ", name: "Abuja Hub", location: "FCT Abuja", manager: "TBD", status: "Upcoming" },
  { id: "BR-LA", name: "Lagos Hub", location: "Lagos State", manager: "TBD", status: "Upcoming" },
];

const initialEmployees: Employee[] = [];
const initialDrivers: Driver[] = [];
const initialVehicles: Vehicle[] = [];
const initialShifts: Shift[] = [];
const initialHPContracts: HirePurchaseContract[] = [];
const initialJobCards: JobCard[] = [];
const initialConversions: CNGConversion[] = [];
const initialInventory: InventoryItem[] = [];
const initialTransactions: Transaction[] = [];
const initialAuditLogs: AuditLog[] = [];

import { getCurrentUser } from "../../lib/auth";

// ── Data Schema Version ───────────────────────────────────────────────────────
// Bump this string whenever seed data or the Employee/Driver/etc. interface
// grows new required fields that must appear on first load for existing users.
const DATA_SCHEMA_VERSION = "v6"; // bumped: force-clear all old sessions/accounts cache
const SCHEMA_VERSION_KEY  = "cityview_erp_schema_version";

// On first page load (per browser session), check if the stored schema version
// matches the current one. If not, purge all known data keys so the fresh seed
// data is re-loaded from the source arrays below.
if (typeof window !== "undefined") {
  const storedVersion = localStorage.getItem(SCHEMA_VERSION_KEY);
  if (storedVersion !== DATA_SCHEMA_VERSION) {
    const KEYS_TO_PURGE = [
      "cityview_erp_branches",
      "cityview_erp_employees",
      "cityview_erp_drivers",
      "cityview_erp_vehicles",
      "cityview_erp_shifts",
      "cityview_erp_hp_contracts",
      "cityview_erp_job_cards",
      "cityview_erp_conversions",
      "cityview_erp_inventory",
      "cityview_erp_transactions",
      "cityview_erp_audit_logs",
      "cityview_erp_users",
      "cityview_erp_sync_queue",
      "cityview_auth_session",
      "cityview_auth_accounts",
      "cityview_user_session"
    ];
    KEYS_TO_PURGE.forEach(k => localStorage.removeItem(k));
    localStorage.setItem(SCHEMA_VERSION_KEY, DATA_SCHEMA_VERSION);
    console.info(`[CityView ERP] Data schema migrated to ${DATA_SCHEMA_VERSION}. Seed data reloaded.`);
  }
}

// Helper to interact with LocalStorage
const loadLocalStorageData = <T>(key: string, initialData: T): T => {
  if (typeof window === "undefined") return initialData;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch (e) {
      console.error(`Failed to parse localstorage key "${key}":`, e);
    }
  }
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

const saveLocalStorageData = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getIsolatedBranch = (): string | null => {
  const user = getCurrentUser();
  if (!user || user.branch === "ALL") return null;
  return user.branch === "BR-KT" ? "Katsina HQ" : "Gombe Hub";
};

export class ERPStore {
  static getBranches = () => {
    const raw = loadLocalStorageData<Branch[]>("cityview_erp_branches", initialBranches);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(b => b.name === branch);
  };
  static saveBranches = (data: Branch[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_branches", data);
      ERPStore.addToSyncQueue("Update Branches", "Modified branch networks configurations");
      return;
    }
    const raw = loadLocalStorageData<Branch[]>("cityview_erp_branches", initialBranches);
    const otherBranches = raw.filter(b => b.name !== branch);
    saveLocalStorageData("cityview_erp_branches", [...otherBranches, ...data]);
    ERPStore.addToSyncQueue("Update Branches", `Modified branch status for ${branch}`);
  };

  static getEmployees = () => {
    const raw = loadLocalStorageData<Employee[]>("cityview_erp_employees", initialEmployees);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(e => e.branch === branch);
  };
  static saveEmployees = (data: Employee[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_employees", data);
      ERPStore.addToSyncQueue("Update Employees", "Updated corporate staff roster");
      return;
    }
    const raw = loadLocalStorageData<Employee[]>("cityview_erp_employees", initialEmployees);
    const otherBranches = raw.filter(e => e.branch !== branch);
    const tagged = data.map(e => ({ ...e, branch }));
    saveLocalStorageData("cityview_erp_employees", [...otherBranches, ...tagged]);
    ERPStore.addToSyncQueue("Update Employees", `Updated personnel records for ${branch}`);
  };

  static getDrivers = () => {
    const raw = loadLocalStorageData<Driver[]>("cityview_erp_drivers", initialDrivers);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(d => d.branch === branch);
  };
  static saveDrivers = (data: Driver[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_drivers", data);
      ERPStore.addToSyncQueue("Update Drivers", "Modified drivers listing info");
      return;
    }
    const raw = loadLocalStorageData<Driver[]>("cityview_erp_drivers", initialDrivers);
    const otherBranches = raw.filter(d => d.branch !== branch);
    const tagged = data.map(d => ({ ...d, branch }));
    saveLocalStorageData("cityview_erp_drivers", [...otherBranches, ...tagged]);
    ERPStore.addToSyncQueue("Update Drivers", `Updated drivers registry for ${branch}`);
  };

  static getVehicles = () => {
    const raw = loadLocalStorageData<Vehicle[]>("cityview_erp_vehicles", initialVehicles);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(v => v.branch === branch);
  };
  static saveVehicles = (data: Vehicle[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_vehicles", data);
      ERPStore.addToSyncQueue("Update Vehicles", "Updated vehicles catalog details");
      return;
    }
    const raw = loadLocalStorageData<Vehicle[]>("cityview_erp_vehicles", initialVehicles);
    const otherBranches = raw.filter(v => v.branch !== branch);
    const tagged = data.map(v => ({ ...v, branch }));
    saveLocalStorageData("cityview_erp_vehicles", [...otherBranches, ...tagged]);
    ERPStore.addToSyncQueue("Update Vehicles", `Updated vehicles catalog list for ${branch}`);
  };

  static getShifts = () => {
    const raw = loadLocalStorageData<Shift[]>("cityview_erp_shifts", initialShifts);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(s => s.branch === branch);
  };
  static saveShifts = (data: Shift[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_shifts", data);
      ERPStore.addToSyncQueue("Update Shifts", "Logged shift changes");
      return;
    }
    const raw = loadLocalStorageData<Shift[]>("cityview_erp_shifts", initialShifts);
    const otherBranches = raw.filter(s => s.branch !== branch);
    const tagged = data.map(s => ({ ...s, branch }));
    saveLocalStorageData("cityview_erp_shifts", [...otherBranches, ...tagged]);
    ERPStore.addToSyncQueue("Update Shifts", `Logged shift change logs for ${branch}`);
  };

  static getHPContracts = () => {
    const raw = loadLocalStorageData<HirePurchaseContract[]>("cityview_erp_hp_contracts", initialHPContracts);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    
    const rawVehicles = loadLocalStorageData<Vehicle[]>("cityview_erp_vehicles", initialVehicles);
    const branchVehicles = rawVehicles.filter(v => v.branch === branch);
    const vehicleIds = new Set(branchVehicles.map(v => v.id));
    return raw.filter(c => vehicleIds.has(c.vehicleId));
  };
  static saveHPContracts = (data: HirePurchaseContract[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_hp_contracts", data);
      ERPStore.addToSyncQueue("Update HP Contracts", "Updated Hire Purchase ledger and payment entries");
      return;
    }
    const raw = loadLocalStorageData<HirePurchaseContract[]>("cityview_erp_hp_contracts", initialHPContracts);
    const rawVehicles = loadLocalStorageData<Vehicle[]>("cityview_erp_vehicles", initialVehicles);
    const branchVehicles = rawVehicles.filter(v => v.branch === branch);
    const vehicleIds = new Set(branchVehicles.map(v => v.id));
    const otherBranches = raw.filter(c => !vehicleIds.has(c.vehicleId));
    saveLocalStorageData("cityview_erp_hp_contracts", [...otherBranches, ...data]);
    ERPStore.addToSyncQueue("Update HP Contracts", `Updated HP contract remittance status for ${branch}`);
  };

  static getJobCards = () => {
    const raw = loadLocalStorageData<JobCard[]>("cityview_erp_job_cards", initialJobCards);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    const prefix = branch === "Katsina HQ" ? "KT" : "GB";
    return raw.filter(j => j.vehiclePlate.startsWith(prefix));
  };
  static saveJobCards = (data: JobCard[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_job_cards", data);
      ERPStore.addToSyncQueue("Update Job Cards", "Updated workshop jobs");
      return;
    }
    const raw = loadLocalStorageData<JobCard[]>("cityview_erp_job_cards", initialJobCards);
    const prefix = branch === "Katsina HQ" ? "KT" : "GB";
    const otherBranches = raw.filter(j => !j.vehiclePlate.startsWith(prefix));
    saveLocalStorageData("cityview_erp_job_cards", [...otherBranches, ...data]);
    ERPStore.addToSyncQueue("Update Job Cards", `Updated technical job cards list for ${branch}`);
  };

  static getConversions = () => {
    const raw = loadLocalStorageData<CNGConversion[]>("cityview_erp_conversions", initialConversions);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    const prefix = branch === "Katsina HQ" ? "KT" : "GB";
    return raw.filter(c => c.vehiclePlate.startsWith(prefix));
  };
  static saveConversions = (data: CNGConversion[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_conversions", data);
      ERPStore.addToSyncQueue("Update CNG Conversions", "Modified CNG conversion checklist steps");
      return;
    }
    const raw = loadLocalStorageData<CNGConversion[]>("cityview_erp_conversions", initialConversions);
    const prefix = branch === "Katsina HQ" ? "KT" : "GB";
    const otherBranches = raw.filter(c => !c.vehiclePlate.startsWith(prefix));
    saveLocalStorageData("cityview_erp_conversions", [...otherBranches, ...data]);
    ERPStore.addToSyncQueue("Update CNG Conversions", `Updated CNG Conversion jobs for ${branch}`);
  };

  static getInventory = () => loadLocalStorageData<InventoryItem[]>("cityview_erp_inventory", initialInventory);
  static saveInventory = (data: InventoryItem[]) => {
    saveLocalStorageData("cityview_erp_inventory", data);
    ERPStore.addToSyncQueue("Update Inventory", "Adjusted inventory count values");
  };

  static getTransactions = () => {
    const raw = loadLocalStorageData<Transaction[]>("cityview_erp_transactions", initialTransactions);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(t => t.branch === branch);
  };
  static saveTransactions = (data: Transaction[]) => {
    const branch = getIsolatedBranch();
    if (!branch) {
      saveLocalStorageData("cityview_erp_transactions", data);
      ERPStore.addToSyncQueue("Update Ledger", "Logged ledger financial transactions");
      return;
    }
    const raw = loadLocalStorageData<Transaction[]>("cityview_erp_transactions", initialTransactions);
    const otherBranches = raw.filter(t => t.branch !== branch);
    const tagged = data.map(t => ({ ...t, branch }));
    saveLocalStorageData("cityview_erp_transactions", [...otherBranches, ...tagged]);
    ERPStore.addToSyncQueue("Update Ledger", `Logged revenue/expense entries for ${branch}`);
  };

  static getAuditLogs = () => {
    const raw = loadLocalStorageData<AuditLog[]>("cityview_erp_audit_logs", initialAuditLogs);
    const branch = getIsolatedBranch();
    if (!branch) return raw;
    return raw.filter(l => l.details.includes(branch) || l.action.includes(branch));
  };
  static saveAuditLogs = (data: AuditLog[]) => saveLocalStorageData("cityview_erp_audit_logs", data);

  static addAuditLog = (user: string, role: string, action: string, details: string) => {
    const logs = ERPStore.getAuditLogs();
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      user,
      role,
      action,
      details
    };
    ERPStore.saveAuditLogs([newLog, ...logs]);
  };

  // Live Sync Queue Helpers
  static getSyncQueue = (): SyncOperation[] => {
    return loadLocalStorageData<SyncOperation[]>("cityview_sync_queue", []);
  };
  
  static saveSyncQueue = (queue: SyncOperation[]) => {
    saveLocalStorageData("cityview_sync_queue", queue);
  };
  
  static addToSyncQueue = (action: string, details: string) => {
    if (typeof window !== "undefined" && !navigator.onLine) {
      const queue = ERPStore.getSyncQueue();
      const newOp: SyncOperation = {
        id: `SYNC-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        action,
        details
      };
      ERPStore.saveSyncQueue([...queue, newOp]);
      window.dispatchEvent(new Event("cityview_sync_updated"));
    }
  };

  static getUsers = () => loadLocalStorageData<MockUser[]>("cityview_erp_users", mockUsers);
  static saveUsers = (data: MockUser[]) => saveLocalStorageData("cityview_erp_users", data);
}

export interface MockUser {
  email: string;
  name: string;
  role: string;
  department: string;
  branch: string; // "BR-KT", "BR-GB", or "ALL"
  branchName: string; // "Katsina HQ", "Gombe Hub", or "Global Enterprise"
  passwordHash: string; // plaintext
  disabled?: boolean;
}

export const mockUsers: MockUser[] = [
  {
    email: "admin@cityview.ng",
    name: "Engr Almustapha Sada Abdullahi",
    role: "Super Admin",
    department: "Executive",
    branch: "ALL",
    branchName: "Global Enterprise",
    passwordHash: "Password123"
  }
];
