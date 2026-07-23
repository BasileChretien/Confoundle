import { requireBuiltin } from "./sqliteD1";

/**
 * The shipped migration, read from disk so tests run against the SQL that will
 * actually be applied to D1 rather than a copy of it that can drift.
 *
 * TEST-ONLY.
 */
export function loadMigration(): string {
  const fs = requireBuiltin<{
    readFileSync(path: string, encoding: string): string;
  }>("node:fs");
  return fs.readFileSync("migrations/0001_accounts.sql", "utf8");
}
