import initSqlJs, { Database } from 'sql.js';
import { drizzle, SQLJsDatabase } from 'drizzle-orm/sql-js';
import * as schema from './schema';
import fs from 'fs';
import path from 'path';

let db: SQLJsDatabase<typeof schema> | null = null;

export async function getDb(): Promise<SQLJsDatabase<typeof schema>> {
  if (db) return db;

  const SQL = await initSqlJs();

  // Try to load the existing database file
  const dbPath = path.join(process.cwd(), 'dev.sqlite');
  let sqlDb: Database;

  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    sqlDb = new SQL.Database(fileBuffer);
    console.log(`✅ Loaded database from ${dbPath}`);
  } else {
    sqlDb = new SQL.Database();
    console.log('🆕 Created new in‑memory database (dev.sqlite not found)');
  }

  db = drizzle(sqlDb, { schema });

  // Optional: periodically save back to disk (or save on each write)
  // For now, we’ll save after important mutations in the seed script.
  return db;
}