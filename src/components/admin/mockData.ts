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
  branch: string;
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
  branch: string;
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
  branch: string;
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

export class ERPStore {
  static getBranches = () => loadLocalStorageData<Branch[]>("cityview_erp_branches", initialBranches);
  static saveBranches = (data: Branch[]) => saveLocalStorageData("cityview_erp_branches", data);

  static getEmployees = () => loadLocalStorageData<Employee[]>("cityview_erp_employees", initialEmployees);
  static saveEmployees = (data: Employee[]) => saveLocalStorageData("cityview_erp_employees", data);

  static getDrivers = () => loadLocalStorageData<Driver[]>("cityview_erp_drivers", initialDrivers);
  static saveDrivers = (data: Driver[]) => saveLocalStorageData("cityview_erp_drivers", data);

  static getVehicles = () => loadLocalStorageData<Vehicle[]>("cityview_erp_vehicles", initialVehicles);
  static saveVehicles = (data: Vehicle[]) => saveLocalStorageData("cityview_erp_vehicles", data);

  static getShifts = () => loadLocalStorageData<Shift[]>("cityview_erp_shifts", initialShifts);
  static saveShifts = (data: Shift[]) => saveLocalStorageData("cityview_erp_shifts", data);

  static getHPContracts = () => loadLocalStorageData<HirePurchaseContract[]>("cityview_erp_hp_contracts", initialHPContracts);
  static saveHPContracts = (data: HirePurchaseContract[]) => saveLocalStorageData("cityview_erp_hp_contracts", data);

  static getJobCards = () => loadLocalStorageData<JobCard[]>("cityview_erp_job_cards", initialJobCards);
  static saveJobCards = (data: JobCard[]) => saveLocalStorageData("cityview_erp_job_cards", data);

  static getConversions = () => loadLocalStorageData<CNGConversion[]>("cityview_erp_conversions", initialConversions);
  static saveConversions = (data: CNGConversion[]) => saveLocalStorageData("cityview_erp_conversions", data);

  static getInventory = () => loadLocalStorageData<InventoryItem[]>("cityview_erp_inventory", initialInventory);
  static saveInventory = (data: InventoryItem[]) => saveLocalStorageData("cityview_erp_inventory", data);

  static getTransactions = () => loadLocalStorageData<Transaction[]>("cityview_erp_transactions", initialTransactions);
  static saveTransactions = (data: Transaction[]) => saveLocalStorageData("cityview_erp_transactions", data);

  static getAuditLogs = () => loadLocalStorageData<AuditLog[]>("cityview_erp_audit_logs", initialAuditLogs);
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

  static addTransaction = (tx: Transaction) => {
    const transactions = ERPStore.getTransactions();
    ERPStore.saveTransactions([tx, ...transactions]);
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

