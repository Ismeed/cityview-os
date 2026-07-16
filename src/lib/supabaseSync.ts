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

/**
 * For tables where the primary key is NOT "id", specify it here.
 * Supabase upsert defaults to the table's PK, so this must match the actual DB primary key.
 */
const UPSERT_CONFLICT_KEY: Record<string, string> = {
  "users": "email"  // users table uses email as primary key, not id
};

/**
 * Whitelist of allowed DB column names per table.
 * Only columns in this list will be included in upsert payloads.
 * Prevents "column not found" errors when the frontend model has extra fields
 * not yet in the database schema.
 * An empty/missing entry means no filtering (all columns are sent).
 */
const COLUMN_WHITELIST: Record<string, Set<string>> = {
  "users": new Set(["email", "name", "role", "department", "branch", "branch_name", "password_hash", "disabled"]),
  "hp_contracts": new Set(["id", "driver_id", "vehicle_id", "total_amount", "balance_paid", "daily_target", "start_date", "end_date_expected", "status", "payment_history", "branch"]),
  "vehicles": new Set(["id", "plate_number", "model", "fuel_type", "conversion_status", "branch", "status", "assigned_driver_id"]),
  "crm_appointments": new Set(["id", "branch", "status", "date", "time", "customername", "vehiclemodel", "servicetype"]),
  "crm_tickets": new Set(["id", "branch", "status", "subject", "priority", "customername", "datecreated"]),
  "crm_customers": new Set(["id", "name", "phone", "branch"])
};

// CamelCase frontend keys mapped to snake_case Postgres columns
const KEY_MAPS: Record<string, Record<string, string>> = {
  "vehicles": {
    "plateNumber": "plate_number",
    "type": "model",
    "fuelType": "fuel_type",
    "conversionStatus": "conversion_status",
    "assignedDriverId": "assigned_driver_id"
  },
  "conversions": {
    "customerName": "customer_name",
    "vehiclePlate": "vehicle_plate",
    "vehicleModel": "vehicle_model",
    "cngKitType": "cng_kit_type",
    "cylinderSize": "cylinder_size",
    "dateStarted": "date_started",
    "dateCompleted": "date_completed",
    "paymentType": "payment_type",
    "amountPaid": "amount_paid",
    "paymentStatus": "payment_status",
    "paymentHistory": "payment_history",
    "assignedEngineers": "assigned_engineers"
  },
  "employees": {
    "attendanceToday": "attendance_today",
    "stateCode": "state_code",
    "batchGroup": "batch_group",
    "durationMonths": "duration_months"
  },
  "drivers": {
    "remittanceRate": "remittance_rate",
    "guarantorName": "guarantor_name",
    "guarantorPhone": "guarantor_phone"
  },
  "shifts": {
    "driverId": "driver_id",
    "vehicleId": "vehicle_id",
    "shiftType": "shift_type",
    "startTime": "start_time",
    "endTime": "end_time",
    "startMileage": "start_mileage",
    "endMileage": "end_mileage",
    "expectedRemittance": "expected_remittance",
    "actualRemittance": "actual_remittance"
  },
  "hp_contracts": {
    "driverId": "driver_id",
    "vehicleId": "vehicle_id",
    "totalAmount": "total_amount",
    "balancePaid": "balance_paid",
    "dailyTarget": "daily_target",
    "startDate": "start_date",
    "endDateExpected": "end_date_expected",
    "paymentHistory": "payment_history"
  },
  "job_cards": {
    "customerName": "customer_name",
    "customerPhone": "customer_phone",
    "vehiclePlate": "vehicle_plate",
    "vehicleModel": "vehicle_model",
    "issueDescription": "issue_description",
    "assignedTechnicianId": "assigned_technician_id",
    "laborCharges": "labor_charges",
    "partsUsed": "parts_used"
  },
  "inventory": {
    "stockLevel": "stock_level",
    "minStockLevel": "min_stock_level",
    "unitPrice": "unit_price"
  },
  "users": {
    "branchName": "branch_name",
    "passwordHash": "password_hash"
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
 * Normalizes a row object to database column layout
 */
function toDbPayload(tableName: string, row: any): any {
  const map = KEY_MAPS[tableName];
  const whitelist = COLUMN_WHITELIST[tableName];
  const newRow: any = {};
  for (const [key, value] of Object.entries(row)) {
    // Apply camelCase -> snake_case renaming
    const dbKey = map ? (map[key] || key) : key;
    // If a whitelist is defined for this table, skip columns not on the list
    if (whitelist && !whitelist.has(dbKey)) continue;
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
  
  // Fill fallbacks for fields that exist in frontend but not in the database table
  if (tableName === "vehicles" && !newRow.lastServiceDate) {
    newRow.lastServiceDate = new Date().toISOString().split("T")[0];
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
    const conflictKey = UPSERT_CONFLICT_KEY[dbTable];

    const { error } = conflictKey
      ? await supabase.from(dbTable).upsert(cleaned, { onConflict: conflictKey })
      : await supabase.from(dbTable).upsert(cleaned);

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
