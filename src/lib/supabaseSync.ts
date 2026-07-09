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
  "cityview_erp_users": "users"
};

// Check if credentials are set
const isConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project-id") && !key.includes("your-anon-public-key");
};

/**
 * Push local database arrays up to Supabase using upsert
 */
export async function syncTableToCloud(storageKey: string, data: any[]) {
  if (!isConfigured()) return;
  const dbTable = TABLE_MAP[storageKey];
  if (!dbTable) return;

  try {
    // clean nested objects (like partsUsed array in JobCard or paymentHistory in HirePurchase) if PostgreSQL requires text/json
    const cleaned = data.map(item => {
      const copy = { ...item };
      // Map JS camelCase keys to match Supabase schema if necessary, or push as-is
      // Supabase handles jsonb fields perfectly if passed as objects/arrays
      return copy;
    });

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
      if (data && data.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(data));
        successCount++;
      }
    } catch (err) {
      console.error(`[Supabase Sync] Connection error during ${dbTable} sync:`, err);
    }
  }

  if (successCount > 0) {
    console.info(`[Supabase Sync] Successfully synchronized ${successCount} tables. Refreshing views.`);
    window.dispatchEvent(new Event("cityview_branch_changed"));
    toast.success("Database Synced", {
      description: `Synchronized ${successCount} operational tables from Supabase.`
    });
    return true;
  }
  return false;
}
