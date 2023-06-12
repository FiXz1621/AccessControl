import postgres from "postgres";

const PORT = process.env.DB_PORT
  ? Number.parseInt(process.env.DB_PORT, 10)
  : 5432;

const connectionString = `postgres://postgres:example@127.0.0.1:5432/accessControl`;

const sql = postgres(connectionString, {
  host: process.env.DB_HOST,
  port: PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default sql;
