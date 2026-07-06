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
  { id: "BR-KT", name: "Katsina HQ", location: "Katsina State", manager: "Alhaji Bello Katsina", status: "Active" },
  { id: "BR-GB", name: "Gombe Hub", location: "Gombe State", manager: "Umar Gombe", status: "Active" },
  { id: "BR-KN", name: "Kano Branch", location: "Kano State", manager: "TBD", status: "Upcoming" },
  { id: "BR-KD", name: "Kaduna Branch", location: "Kaduna State", manager: "TBD", status: "Upcoming" },
  { id: "BR-ABJ", name: "Abuja Hub", location: "FCT Abuja", manager: "TBD", status: "Upcoming" },
  { id: "BR-LA", name: "Lagos Hub", location: "Lagos State", manager: "TBD", status: "Upcoming" },
];

const initialEmployees: Employee[] = [
  { id: "EMP-01", name: "Engr. Yusuf Bello", email: "yusuf.b@cityviewcng.com", role: "Managing Director (CEO)", department: "Executive", branch: "Katsina HQ", salary: 1200000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-02", name: "Dr. Grace Olamide", email: "grace.o@cityviewcng.com", role: "Executive Director", department: "Executive", branch: "Katsina HQ", salary: 950000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-03", name: "Mustapha Ibrahim", email: "mustapha.i@cityviewcng.com", role: "Branch Manager", department: "Operations", branch: "Gombe Hub", salary: 500000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-04", name: "Ado Yahaya", email: "ado.y@cityviewcng.com", role: "Workshop Manager", department: "Technical", branch: "Katsina HQ", salary: 400000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-05", name: "Chidi Nwachukwu", email: "chidi.n@cityviewcng.com", role: "Senior Technician", department: "Technical", branch: "Katsina HQ", salary: 300000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-06", name: "Bala Mohammed", email: "bala.m@cityviewcng.com", role: "Technician", department: "Technical", branch: "Gombe Hub", salary: 250000, status: "Active", attendanceToday: "Late" },
  { id: "EMP-07", name: "Fatima Umar", email: "fatima.u@cityviewcng.com", role: "Accountant", department: "Finance", branch: "Katsina HQ", salary: 350000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-08", name: "Aminu Dangote", email: "aminu.d@cityviewcng.com", role: "Inventory Officer", department: "Operations", branch: "Katsina HQ", salary: 200000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-09", name: "Sani Abacha", email: "sani.a@cityviewcng.com", role: "Cashier", department: "Finance", branch: "Gombe Hub", salary: 180000, status: "Active", attendanceToday: "Present" },
  { id: "EMP-10", name: "Zainab Yusuf", email: "zainab.y@cityviewcng.com", role: "Customer Service", department: "Support", branch: "Katsina HQ", salary: 180000, status: "Active", attendanceToday: "Leave" },
];

const initialDrivers: Driver[] = [
  { id: "DRV-101", name: "Musa Ibrahim", phone: "08039887766", license: "NGA-KT-90218", guarantorName: "Mallam Lawal", guarantorPhone: "08034445555", branch: "Katsina HQ", status: "Active", remittanceRate: 12000 },
  { id: "DRV-102", name: "Aliyu Katsina", phone: "08149887755", license: "NGA-KT-12431", guarantorName: "Alhaji Ibrahim", guarantorPhone: "08022221111", branch: "Katsina HQ", status: "Active", remittanceRate: 12000 },
  { id: "DRV-103", name: "Usman Gombe", phone: "07068887722", license: "NGA-GB-33412", guarantorName: "Alhaji Danladi", guarantorPhone: "08151112222", branch: "Gombe Hub", status: "Active", remittanceRate: 12000 },
  { id: "DRV-104", name: "Shehu Shagari", phone: "09033332211", license: "NGA-GB-44211", guarantorName: "Abubakar Shehu", guarantorPhone: "08055554444", branch: "Gombe Hub", status: "Active", remittanceRate: 12000 },
  { id: "DRV-105", name: "Garba Haruna", phone: "08169998822", license: "NGA-KT-77881", guarantorName: "Isah Haruna", guarantorPhone: "08033334444", branch: "Katsina HQ", status: "Pending Approval", remittanceRate: 12000 },
];

const initialVehicles: Vehicle[] = [
  { id: "VEH-Keke-01", plateNumber: "KT-902-A10", type: "Tricycle", fuelType: "CNG", conversionStatus: "Converted", branch: "Katsina HQ", status: "On Road", assignedDriverId: "DRV-101", lastServiceDate: "2026-06-15" },
  { id: "VEH-Keke-02", plateNumber: "KT-312-B20", type: "Tricycle", fuelType: "CNG", conversionStatus: "Converted", branch: "Katsina HQ", status: "Available", assignedDriverId: "DRV-102", lastServiceDate: "2026-06-20" },
  { id: "VEH-Keke-03", plateNumber: "GB-405-X01", type: "Tricycle", fuelType: "CNG", conversionStatus: "Converted", branch: "Gombe Hub", status: "On Road", assignedDriverId: "DRV-103", lastServiceDate: "2026-06-28" },
  { id: "VEH-Keke-04", plateNumber: "GB-881-Z04", type: "Tricycle", fuelType: "CNG", conversionStatus: "Converted", branch: "Gombe Hub", status: "On Road", assignedDriverId: "DRV-104", lastServiceDate: "2026-06-24" },
  { id: "VEH-Bus-01", plateNumber: "KT-400-M01", type: "Mini Bus", fuelType: "Petrol", conversionStatus: "In-Progress", branch: "Katsina HQ", status: "In Workshop", lastServiceDate: "2026-07-02" },
  { id: "VEH-Car-01", plateNumber: "GB-102-Y02", type: "Car", fuelType: "Petrol", conversionStatus: "Petrol Only", branch: "Gombe Hub", status: "Available", lastServiceDate: "2026-05-10" },
];

const initialShifts: Shift[] = [
  { id: "SH-9001", driverId: "DRV-101", vehicleId: "VEH-Keke-01", branch: "Katsina HQ", shiftType: "Morning", startTime: "07:30", startMileage: 12450, expectedRemittance: 12000, status: "In Progress", date: "2026-07-05" },
  { id: "SH-9002", driverId: "DRV-103", vehicleId: "VEH-Keke-03", branch: "Gombe Hub", shiftType: "Morning", startTime: "07:45", startMileage: 8900, expectedRemittance: 12000, status: "In Progress", date: "2026-07-05" },
  { id: "SH-8991", driverId: "DRV-102", vehicleId: "VEH-Keke-02", branch: "Katsina HQ", shiftType: "Morning", startTime: "07:15", endTime: "17:30", startMileage: 10400, endMileage: 10520, expectedRemittance: 12000, actualRemittance: 12000, status: "Completed", date: "2026-07-04" },
  { id: "SH-8992", driverId: "DRV-104", vehicleId: "VEH-Keke-04", branch: "Gombe Hub", shiftType: "Morning", startTime: "07:30", endTime: "18:00", startMileage: 14200, endMileage: 14310, expectedRemittance: 12000, actualRemittance: 10000, status: "Defaulted", notes: "Short of 2000 Naira due to engine diagnostic delay", date: "2026-07-04" },
];

const initialHPContracts: HirePurchaseContract[] = [
  {
    id: "HP-301",
    driverId: "DRV-101",
    vehicleId: "VEH-Keke-01",
    branch: "Katsina HQ",
    totalAmount: 4750000,
    balancePaid: 1560000,
    dailyTarget: 12000,
    startDate: "2026-01-10",
    endDateExpected: "2027-02-15",
    status: "Active",
    paymentHistory: [
      { date: "2026-07-01", amount: 12000 },
      { date: "2026-07-02", amount: 12000 },
      { date: "2026-07-03", amount: 12000 },
      { date: "2026-07-04", amount: 12000 },
    ]
  },
  {
    id: "HP-302",
    driverId: "DRV-102",
    vehicleId: "VEH-Keke-02",
    branch: "Katsina HQ",
    totalAmount: 4750000,
    balancePaid: 2100000,
    dailyTarget: 12000,
    startDate: "2025-11-01",
    endDateExpected: "2026-12-05",
    status: "Active",
    paymentHistory: [
      { date: "2026-07-01", amount: 12000 },
      { date: "2026-07-02", amount: 12000 },
      { date: "2026-07-03", amount: 12000 },
      { date: "2026-07-04", amount: 12000 },
    ]
  },
  {
    id: "HP-303",
    driverId: "DRV-103",
    vehicleId: "VEH-Keke-03",
    branch: "Gombe Hub",
    totalAmount: 4750000,
    balancePaid: 940000,
    dailyTarget: 12000,
    startDate: "2026-03-01",
    endDateExpected: "2027-04-10",
    status: "Active",
    paymentHistory: [
      { date: "2026-07-01", amount: 12000 },
      { date: "2026-07-02", amount: 12000 },
      { date: "2026-07-03", amount: 12000 },
      { date: "2026-07-04", amount: 12000 },
    ]
  },
  {
    id: "HP-304",
    driverId: "DRV-104",
    vehicleId: "VEH-Keke-04",
    branch: "Gombe Hub",
    totalAmount: 4750000,
    balancePaid: 820000,
    dailyTarget: 12000,
    startDate: "2026-04-01",
    endDateExpected: "2027-05-15",
    status: "Missed Remittance",
    paymentHistory: [
      { date: "2026-07-01", amount: 12000 },
      { date: "2026-07-02", amount: 12000 },
      { date: "2026-07-03", amount: 12000 },
      { date: "2026-07-04", amount: 10000 }, // Missed target
    ]
  }
];

const initialJobCards: JobCard[] = [
  { id: "JB-1001", customerName: "Garba Musa", customerPhone: "08091112223", vehiclePlate: "KT-124-AAA", vehicleModel: "Toyota Corolla 2012", issueDescription: "Idle vibration and check engine light on.", assignedTechnicianId: "EMP-05", laborCharges: 8000, partsUsed: [{ partId: "INV-OIL", name: "Mobil 1 Engine Oil 5W-30", quantity: 1, cost: 15000 }], status: "Repairing", branch: "Katsina HQ", date: "2026-07-05" },
  { id: "JB-1002", customerName: "Salisu Bello", customerPhone: "07032223334", vehiclePlate: "GB-981-TRC", vehicleModel: "Tricycle (TVS King)", issueDescription: "Brake pads completely worn, clutch cable stiff.", assignedTechnicianId: "EMP-06", laborCharges: 3500, partsUsed: [{ partId: "INV-BRK", name: "Premium Brake Pads (Keke)", quantity: 2, cost: 5000 }], status: "Completed", branch: "Gombe Hub", date: "2026-07-04" }
];

const initialConversions: CNGConversion[] = [
  { id: "CNG-2001", customerName: "Katsina State Ministry of Transport", vehiclePlate: "KT-100-MTR", vehicleModel: "Toyota Hiace Bus 2018", cngKitType: "Sequential 4-Cylinder Kit", cylinderSize: "90L Steel Cylinder", cost: 950000, status: "Installation", assignedEngineers: ["Engr. Yusuf Bello", "Chidi Nwachukwu"], branch: "Katsina HQ", dateStarted: "2026-07-03" },
  { id: "CNG-2002", customerName: "Mallam Lawan", vehiclePlate: "GB-800-LAW", vehicleModel: "Suzuki Every Mini Bus", cngKitType: "Direct Injection Kit", cylinderSize: "60L Lightweight Composites", cost: 750000, status: "Inspection", assignedEngineers: ["Bala Mohammed"], branch: "Gombe Hub", dateStarted: "2026-07-05" }
];

const initialInventory: InventoryItem[] = [
  { id: "INV-KIT-4", name: "CNG Sequential Kit 4-Cylinder", category: "CNG Kits", stockLevel: 28, minStockLevel: 5, unitPrice: 220000, supplier: "GasTech Italy Imports" },
  { id: "INV-KIT-6", name: "CNG Sequential Kit 6-Cylinder", category: "CNG Kits", stockLevel: 14, minStockLevel: 3, unitPrice: 340000, supplier: "GasTech Italy Imports" },
  { id: "INV-CYL-60", name: "60L Seamless Steel CNG Cylinder", category: "Cylinders", stockLevel: 32, minStockLevel: 8, unitPrice: 150000, supplier: "SinoCylinder Corp" },
  { id: "INV-CYL-90", name: "90L Seamless Steel CNG Cylinder", category: "Cylinders", stockLevel: 4, minStockLevel: 6, unitPrice: 190000, supplier: "SinoCylinder Corp" }, // Low Stock
  { id: "INV-OIL", name: "Mobil 1 Engine Oil 5W-30", category: "Engine Oil", stockLevel: 80, minStockLevel: 15, unitPrice: 15000, supplier: "Mobil Nigeria" },
  { id: "INV-BRK", name: "Premium Brake Pads (Keke)", category: "Spare Parts", stockLevel: 50, minStockLevel: 10, unitPrice: 2500, supplier: "TVS Parts Lagos" },
  { id: "INV-TYR", name: "Heavy Duty Tricycle Tyre 4.00-8", category: "Tyres", stockLevel: 3, minStockLevel: 8, unitPrice: 18000, supplier: "TVS Parts Lagos" } // Low Stock
];

const initialTransactions: Transaction[] = [
  { id: "TR-5001", type: "Revenue", amount: 950000, category: "CNG Conversion", description: "Deposit from Ministry of Transport (Toyota Hiace KT-100-MTR)", branch: "Katsina HQ", date: "2026-07-03" },
  { id: "TR-5002", type: "Revenue", amount: 12000, category: "Hire Purchase", description: "Musa Ibrahim daily HP repayment (VEH-Keke-01)", branch: "Katsina HQ", date: "2026-07-04" },
  { id: "TR-5003", type: "Revenue", amount: 12000, category: "Hire Purchase", description: "Aliyu Katsina daily HP repayment (VEH-Keke-02)", branch: "Katsina HQ", date: "2026-07-04" },
  { id: "TR-5004", type: "Revenue", amount: 12000, category: "Hire Purchase", description: "Usman Gombe daily HP repayment (VEH-Keke-03)", branch: "Gombe Hub", date: "2026-07-04" },
  { id: "TR-5005", type: "Revenue", amount: 10000, category: "Fleet Remittance", description: "Shehu Shagari daily remittance (VEH-Keke-04) - Defaulted 2000", branch: "Gombe Hub", date: "2026-07-04" },
  { id: "TR-5006", type: "Revenue", amount: 25500, category: "Workshop Repairs", description: "Job card invoice payment (JB-1002 Salisu Bello)", branch: "Gombe Hub", date: "2026-07-04" },
  { id: "TR-5007", type: "Expense", amount: 450000, category: "Parts Purchase", description: "Payment to TVS Parts Lagos (Brake pads & tyres stock restock)", branch: "Katsina HQ", date: "2026-07-02" },
  { id: "TR-5008", type: "Expense", amount: 80000, category: "Rent & Utilities", description: "Electricity & generator diesel fueling (Gombe hub)", branch: "Gombe Hub", date: "2026-07-03" },
  { id: "TR-5009", type: "Expense", amount: 20000, category: "Fuel", description: "Refueling support vehicle (KT-HQ Patrol Toyota)", branch: "Katsina HQ", date: "2026-07-04" }
];

const initialAuditLogs: AuditLog[] = [
  { id: "LOG-1001", timestamp: "2026-07-05 07:30", user: "Mustapha Ibrahim", role: "Branch Manager", action: "Shift Start Check-out", details: "Checked out VEH-Keke-01 to Musa Ibrahim at Katsina HQ. Start mileage: 12,450." },
  { id: "LOG-1002", timestamp: "2026-07-05 07:45", user: "Sani Abacha", role: "Cashier", action: "Shift Start Check-out", details: "Checked out VEH-Keke-03 to Usman Gombe at Gombe Hub. Start mileage: 8,900." },
  { id: "LOG-1003", timestamp: "2026-07-05 09:15", user: "Ado Yahaya", role: "Workshop Manager", action: "Create Job Card", details: "Logged repair ticket JB-1001 for vehicle KT-124-AAA. Designated tech: Chidi Nwachukwu." },
  { id: "LOG-1004", timestamp: "2026-07-05 11:30", user: "Aminu Dangote", role: "Inventory Officer", action: "Log Stock Out", details: "Issued 1 Set of Spark Plugs & 1 Can Mobil 5W-30 Oil for repair ticket JB-1001." }
];

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
}

export interface MockUser {
  email: string;
  name: string;
  role: string;
  department: string;
  branch: string; // "BR-KT", "BR-GB", or "ALL"
  branchName: string; // "Katsina HQ", "Gombe Hub", or "Global Enterprise"
  passwordHash: string; // plaintext
}

export const mockUsers: MockUser[] = [
  {
    email: "fleet.katsina@cityview.ng",
    name: "Alhaji Bello",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-KT",
    branchName: "Katsina HQ",
    passwordHash: "Password123"
  },
  {
    email: "workshop.katsina@cityview.ng",
    name: "Ado Yahaya",
    role: "Workshop & CNG Operations Officer",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-KT",
    branchName: "Katsina HQ",
    passwordHash: "Password123"
  },
  {
    email: "fleet.gombe@cityview.ng",
    name: "Umar Gombe",
    role: "Branch Operations Officer",
    department: "Hire Purchase & Fleet Management",
    branch: "BR-GB",
    branchName: "Gombe Hub",
    passwordHash: "Password123"
  },
  {
    email: "workshop.gombe@cityview.ng",
    name: "Mustapha Ibrahim",
    role: "Workshop & CNG Operations Officer",
    department: "CNG Conversion & Automobile Workshop",
    branch: "BR-GB",
    branchName: "Gombe Hub",
    passwordHash: "Password123"
  },
  {
    email: "admin@cityview.ng",
    name: "Engr. Yusuf Bello",
    role: "Super Admin",
    department: "Executive",
    branch: "ALL",
    branchName: "Global Enterprise",
    passwordHash: "Password123"
  },
  {
    email: "reception.katsina@cityview.ng",
    name: "Hauwa Sani",
    role: "Receptionist",
    department: "Front Desk & Customer Relations",
    branch: "BR-KT",
    branchName: "Katsina HQ",
    passwordHash: "Password123"
  },
  {
    email: "reception.gombe@cityview.ng",
    name: "Amina Umar",
    role: "Receptionist",
    department: "Front Desk & Customer Relations",
    branch: "BR-GB",
    branchName: "Gombe Hub",
    passwordHash: "Password123"
  }
];

