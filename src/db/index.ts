import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Create a connection pool (connection pooling is standard for MySQL)
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "haabeet",
  password: "haabeet123",
  database: "haabeet",
});

export const db = drizzle(pool, { schema, mode: "default" });