import { supabase } from "./supabase";
import { toast } from "sonner";

const TABLE_MAP: Record<string, string> = {
  "cityview_erp_branches": "branches",
  "cityview_erp_employees": "employees",
  "cityview_erp_drivers": "drivers",
  "cityview_erp_vehicles": "vehicles",
  "cityview_erp_shifts": "shifts",
  "cityview_erp_hp_contracts": "hp_contracts",
  "cityview_erp_job_cards": "job_cards",
  "cityview_erp_conversions": "conversions",
  "cityview_erp_inventory": "inventory",
  "cityview_erp_transactions": "transactions",
  "cityview_erp_audit_logs": "audit_logs",
  "cityview_erp_users": "users",
  "cityview_erp_customers": "crm_customers",
  "cityview_erp_appointments": "crm_appointments",
  "cityview_erp_tickets": "crm_tickets"
};

// CamelCase frontend keys mapped to lowercase Postgres columns
const KEY_MAPS: Record<string, Record<string, string>> = {
  "vehicles": {
    "plateNumber": "platenumber",
    "fuelType": "fueltype",
    "conversionStatus": "conversionstatus",
    "assignedDriverId": "assigneddriverid",
    "lastServiceDate": "lastservicedate"
  },
  "conversions": {
    "customerName": "customername",
    "vehiclePlate": "vehicleplate",
    "vehicleModel": "vehiclemodel",
    "cngKitType": "cngkittype",
    "cylinderSize": "cylindersize",
    "dateStarted": "datestarted",
    "dateCompleted": "datecompleted",
    "paymentType": "paymenttype",
    "amountPaid": "amountpaid",
    "paymentStatus": "paymentstatus",
    "paymentHistory": "paymenthistory"
  },
  "employees": {
    "attendanceToday": "attendancetoday",
    "stateCode": "statecode",
    "batchGroup": "batchgroup",
    "durationMonths": "durationmonths"
  },
  "drivers": {
    "remittanceRate": "remittancerate",
    "guarantorName": "guarantorname",
    "guarantorPhone": "guarantorphone"
  },
  "shifts": {
    "driverId": "driverid",
    "vehicleId": "vehicleid",
    "shiftType": "shifttype",
    "startTime": "starttime",
    "endTime": "endtime",
    "startMileage": "startmileage",
    "endMileage": "endmileage",
    "expectedRemittance": "expectedremittance",
    "actualRemittance": "actualremittance"
  },
  "hp_contracts": {
    "driverId": "driverid",
    "vehicleId": "vehicleid",
    "totalAmount": "totalamount",
    "balancePaid": "balancepaid",
    "dailyTarget": "dailytarget",
    "startDate": "startdate",
    "endDateExpected": "enddateexpected",
    "paymentHistory": "paymenthistory"
  },
  "job_cards": {
    "customerName": "customername",
    "customerPhone": "customerphone",
    "vehiclePlate": "vehicleplate",
    "vehicleModel": "vehiclemodel",
    "issueDescription": "issuedescription",
    "assignedTechnicianId": "assignedtechnicianid",
    "laborCharges": "laborcharges",
    "partsUsed": "partsused"
  },
  "inventory": {
    "stockLevel": "stocklevel",
    "minStockLevel": "minstocklevel",
    "unitPrice": "unitprice"
  },
  "users": {
    "branchName": "branchname",
    "passwordHash": "passwordhash"
  },
  "crm_appointments": {
    "customerName": "customername",
    "vehicleModel": "vehiclemodel",
    "serviceType": "servicetype"
  },
  "crm_tickets": {
    "customerName": "customername",
    "dateCreated": "datecreated"
  }
};

// Check if credentials are set
const isConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project-id") && !key.includes("your-anon-public-key");
};

/**
 * Normalizes a row object to database column layout (lowercase keys)
 */
function toDbPayload(tableName: string, row: any): any {
  const map = KEY_MAPS[tableName];
  if (!map) return row;
  const newRow: any = {};
  for (const [key, value] of Object.entries(row)) {
    const dbKey = map[key] || key;
    newRow[dbKey] = value;
  }
  return newRow;
}

/**
 * Normalizes a database row object back to frontend camelCase property layout
 */
function fromDbPayload(tableName: string, row: any): any {
  const map = KEY_MAPS[tableName];
  if (!map) return row;
  const revMap: Record<string, string> = {};
  for (const [camel, dbKey] of Object.entries(map)) {
    revMap[dbKey] = camel;
  }
  const newRow: any = {};
  for (const [key, value] of Object.entries(row)) {
    const camelKey = revMap[key] || key;
    newRow[camelKey] = value;
  }
  return newRow;
}

/**
 * Push local database arrays up to Supabase using upsert
 */
export async function syncTableToCloud(storageKey: string, data: any[]) {
  if (!isConfigured()) return;
  const dbTable = TABLE_MAP[storageKey];
  if (!dbTable) return;

  try {
    const cleaned = data.map(item => toDbPayload(dbTable, item));

    const { error } = await supabase.from(dbTable).upsert(cleaned);
    if (error) {
      console.warn(`[Supabase Sync] Upsert failed on table "${dbTable}":`, error.message);
      toast.error(`Database Sync Failed (${dbTable})`, {
        description: error.message,
        duration: 8000
      });
    } else {
      console.info(`[Supabase Sync] Successfully saved "${dbTable}" changes to cloud.`);
    }
  } catch (err) {
    console.error(`[Supabase Sync] Failed to sync ${dbTable}:`, err);
    toast.error(`Network Database Error`, {
      description: `Failed to connect to Supabase for ${dbTable} sync.`
    });
  }
}

/**
 * Pull all tables from Supabase into LocalStorage cache
 */
export async function pullAllDataFromCloud(): Promise<boolean> {
  if (!isConfigured()) {
    console.info("[Supabase Sync] Supabase credentials not set. Running in LocalStorage-only mode.");
    return false;
  }

  console.info("[Supabase Sync] Synchronizing cloud database tables...");
  let successCount = 0;

  for (const [storageKey, dbTable] of Object.entries(TABLE_MAP)) {
    try {
      const { data, error } = await supabase.from(dbTable).select("*");
      if (error) {
        console.warn(`[Supabase Sync] Pull failed for table "${dbTable}":`, error.message);
        continue;
      }
      
      // Map columns back to frontend camelCase casing structure
      const mappedData = (data ?? []).map(item => fromDbPayload(dbTable, item));
      localStorage.setItem(storageKey, JSON.stringify(mappedData));
      successCount++;
    } catch (err) {
      console.error(`[Supabase Sync] Connection error during ${dbTable} sync:`, err);
    }
  }

  if (successCount > 0) {
    console.info(`[Supabase Sync] Successfully synchronized ${successCount} tables. Refreshing views.`);
    window.dispatchEvent(new Event("cityview_branch_changed"));
    toast.success("Database Synced", {
      description: `Cloud database loaded into session.`
    });
    return true;
  }
  return false;
}
