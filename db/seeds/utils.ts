import { db } from "..";
import { sql } from "drizzle-orm";

export async function clearTables(tables: string[]) {
  console.log("Clearing tables...");
  for (const table of tables) {
    await db.execute(sql.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`));
  }
  console.log("Tables cleared.");
}
