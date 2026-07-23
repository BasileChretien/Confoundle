import type { D1Database, D1PreparedStatement, D1Result } from "../cf";

/**
 * A D1 binding backed by an in-memory SQLite database, for tests only.
 *
 * TEST-ONLY, like src/app/translations/all.ts. Nothing the app or the deployed
 * functions import may reach this file.
 *
 * The point is to run the real SQL rather than a stub that pattern-matches on
 * query strings. Unique indexes, ON CONFLICT upserts and the linking race are
 * exactly the parts worth testing, and a fake that just remembers objects would
 * test none of them: it would happily let two accounts share an email and the
 * suite would stay green while production rejected the second sign-up.
 *
 * The builtin is reached through `process.getBuiltinModule`, which exists for
 * exactly this: a bundler cannot see it, so Vite does not try to resolve
 * `node:sqlite` into the test bundle and fail. It also avoids @types/node,
 * which this project deliberately does not carry, since it would put Node's
 * globals in scope for browser and Worker code that must not use them.
 */

interface SqliteStatement {
  get(...params: unknown[]): unknown;
  all(...params: unknown[]): unknown[];
  run(...params: unknown[]): { changes: number | bigint };
}

interface SqliteDatabase {
  prepare(sql: string): SqliteStatement;
  exec(sql: string): void;
  close(): void;
}

interface NodeProcess {
  getBuiltinModule(id: string): unknown;
}

export function requireBuiltin<T>(id: string): T {
  const proc = (globalThis as { process?: NodeProcess }).process;
  const mod = proc?.getBuiltinModule?.(id);
  if (!mod) throw new Error(`${id} is unavailable; these tests need Node 22.3 or newer`);
  return mod as T;
}

export function openSqlite(): SqliteDatabase {
  const { DatabaseSync } = requireBuiltin<{
    DatabaseSync: new (path: string) => SqliteDatabase;
  }>("node:sqlite");
  return new DatabaseSync(":memory:");
}

function statementFor(
  db: SqliteDatabase,
  query: string,
  params: unknown[],
): D1PreparedStatement {
  return {
    // D1's bind returns a new statement rather than mutating, and callers rely
    // on it: saveProgress prepares once and binds a row at a time.
    bind: (...values: unknown[]) => statementFor(db, query, values),

    async first<T>(): Promise<T | null> {
      return (db.prepare(query).get(...params) as T | undefined) ?? null;
    },

    async all<T>(): Promise<D1Result<T>> {
      const results = db.prepare(query).all(...params) as T[];
      return { results, success: true, meta: {} };
    },

    async run(): Promise<D1Result> {
      const info = db.prepare(query).run(...params);
      return { results: [], success: true, meta: { changes: Number(info.changes) } };
    },
  };
}

export interface TestDatabase extends D1Database {
  raw: SqliteDatabase;
  close(): void;
}

export function createTestDatabase(schema: string): TestDatabase {
  const db = openSqlite();
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(schema);

  return {
    raw: db,
    close: () => db.close(),
    prepare: (query: string) => statementFor(db, query, []),
    async batch(statements: D1PreparedStatement[]): Promise<D1Result[]> {
      db.exec("BEGIN");
      try {
        const out: D1Result[] = [];
        for (const statement of statements) out.push(await statement.run());
        db.exec("COMMIT");
        return out;
      } catch (error) {
        db.exec("ROLLBACK");
        throw error;
      }
    },
  };
}
