import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "00000000",
  database: "laravel12",
  port: 5432,
});

export default pool;
