import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "00000000",
  database: "laravel12",
  port: 5432,
});

pool
  .query(
    `
  ALTER TABLE utilisateurs
  ADD COLUMN IF NOT EXISTS api_key VARCHAR(40);
`
  )
  .catch((error) => {
    console.error("Error updating database schema:", error);
  });

export default pool;
