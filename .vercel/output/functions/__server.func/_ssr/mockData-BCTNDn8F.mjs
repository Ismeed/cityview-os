//#region node_modules/.nitro/vite/services/ssr/assets/mockData-BCTNDn8F.js
var initialBranches = [
	{
		id: "BR-KT",
		name: "Katsina HQ",
		location: "Katsina State",
		manager: "Engr Almustapha Sada Abdullahi",
		status: "Active"
	},
	{
		id: "BR-GB",
		name: "Gombe Hub",
		location: "Gombe State",
		manager: "TBD",
		status: "Active"
	},
	{
		id: "BR-KN",
		name: "Kano Branch",
		location: "Kano State",
		manager: "TBD",
		status: "Upcoming"
	},
	{
		id: "BR-KD",
		name: "Kaduna Branch",
		location: "Kaduna State",
		manager: "TBD",
		status: "Upcoming"
	},
	{
		id: "BR-ABJ",
		name: "Abuja Hub",
		location: "FCT Abuja",
		manager: "TBD",
		status: "Upcoming"
	},
	{
		id: "BR-LA",
		name: "Lagos Hub",
		location: "Lagos State",
		manager: "TBD",
		status: "Upcoming"
	}
];
var initialEmployees = [];
var initialDrivers = [];
var initialVehicles = [];
var initialShifts = [];
var initialHPContracts = [];
var initialJobCards = [];
var initialConversions = [];
var initialInventory = [];
var initialTransactions = [];
var initialAuditLogs = [];
var loadLocalStorageData = (key, initialData) => {
	if (typeof window === "undefined") return initialData;
	const stored = localStorage.getItem(key);
	if (stored) try {
		return JSON.parse(stored);
	} catch (e) {
		console.error(`Failed to parse localstorage key "${key}":`, e);
	}
	localStorage.setItem(key, JSON.stringify(initialData));
	return initialData;
};
var saveLocalStorageData = (key, data) => {
	if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(data));
};
var ERPStore = class ERPStore {
	static getBranches = () => loadLocalStorageData("cityview_erp_branches_v2", initialBranches);
	static saveBranches = (data) => saveLocalStorageData("cityview_erp_branches_v2", data);
	static getEmployees = () => loadLocalStorageData("cityview_erp_employees_v2", initialEmployees);
	static saveEmployees = (data) => saveLocalStorageData("cityview_erp_employees_v2", data);
	static getDrivers = () => loadLocalStorageData("cityview_erp_drivers_v2", initialDrivers);
	static saveDrivers = (data) => saveLocalStorageData("cityview_erp_drivers_v2", data);
	static getVehicles = () => loadLocalStorageData("cityview_erp_vehicles_v2", initialVehicles);
	static saveVehicles = (data) => saveLocalStorageData("cityview_erp_vehicles_v2", data);
	static getShifts = () => loadLocalStorageData("cityview_erp_shifts_v2", initialShifts);
	static saveShifts = (data) => saveLocalStorageData("cityview_erp_shifts_v2", data);
	static getHPContracts = () => loadLocalStorageData("cityview_erp_hp_contracts_v2", initialHPContracts);
	static saveHPContracts = (data) => saveLocalStorageData("cityview_erp_hp_contracts_v2", data);
	static getJobCards = () => loadLocalStorageData("cityview_erp_job_cards_v2", initialJobCards);
	static saveJobCards = (data) => saveLocalStorageData("cityview_erp_job_cards_v2", data);
	static getConversions = () => loadLocalStorageData("cityview_erp_conversions_v2", initialConversions);
	static saveConversions = (data) => saveLocalStorageData("cityview_erp_conversions_v2", data);
	static getInventory = () => loadLocalStorageData("cityview_erp_inventory_v2", initialInventory);
	static saveInventory = (data) => saveLocalStorageData("cityview_erp_inventory_v2", data);
	static getTransactions = () => loadLocalStorageData("cityview_erp_transactions_v2", initialTransactions);
	static saveTransactions = (data) => saveLocalStorageData("cityview_erp_transactions_v2", data);
	static getAuditLogs = () => loadLocalStorageData("cityview_erp_audit_logs_v2", initialAuditLogs);
	static saveAuditLogs = (data) => saveLocalStorageData("cityview_erp_audit_logs_v2", data);
	static addAuditLog = (user, role, action, details) => {
		const logs = ERPStore.getAuditLogs();
		const newLog = {
			id: `LOG-${Date.now().toString().slice(-4)}`,
			timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			user,
			role,
			action,
			details
		};
		ERPStore.saveAuditLogs([newLog, ...logs]);
	};
	static addTransaction = (tx) => {
		const transactions = ERPStore.getTransactions();
		ERPStore.saveTransactions([tx, ...transactions]);
	};
	static getUsers = () => loadLocalStorageData("cityview_erp_users_v2", mockUsers);
	static saveUsers = (data) => saveLocalStorageData("cityview_erp_users_v2", data);
};
var mockUsers = [{
	email: "admin@cityview.ng",
	name: "Engr Almustapha Sada Abdullahi",
	role: "Super Admin",
	department: "Executive",
	branch: "ALL",
	branchName: "Global Enterprise",
	passwordHash: "Password123"
}];
//#endregion
export { ERPStore as t };
