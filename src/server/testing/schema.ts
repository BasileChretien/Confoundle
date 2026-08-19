import { requireBuiltin } from "./sqliteD1";

/**
 * Every shipped migration, concatenated in order, read from disk so tests run
 * against the SQL that will actually be applied to D1 rather than against a
 * copy of it that can drift.
 *
 * Listed by hand rather than globbed, because the order is part of the meaning:
 * 0002 declares a foreign key into a table 0001 creates, and a glob would hand
 * that ordering to whatever the filesystem happened to return. A new migration
 * has to be added here, and the accounts erasure test fails if its table is
 * missing from PERSONAL_TABLES, so the two lists stay honest together.
 *
 * TEST-ONLY.
 */
const MIGRATIONS = [
  "migrations/0001_accounts.sql",
  "migrations/0002_reminders.sql",
  "migrations/0003_answer_tally.sql",
  "migrations/0004_event_tally.sql",
] as const;

export function loadMigration(): string {
  const fs = requireBuiltin<{
    readFileSync(path: string, encoding: string): string;
  }>("node:fs");
  return MIGRATIONS.map((path) => fs.readFileSync(path, "utf8")).join("\n");
}
