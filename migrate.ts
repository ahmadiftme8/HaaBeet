import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

async function migrate() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Read the generated migration SQL file
  const migrationPath = path.join(__dirname, 'drizzle', '0000_naive_white_tiger.sql');
  const sql = fs.readFileSync(migrationPath, 'utf-8');

  db.run(sql); // This creates all tables

  // Save to disk
  fs.writeFileSync('./dev.sqlite', Buffer.from(db.export()));
  console.log('✅ Migration applied and dev.sqlite saved.');
}

migrate().catch(console.error);