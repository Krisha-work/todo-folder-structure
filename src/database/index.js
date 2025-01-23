import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env);
// console.log("process.env.PG_USER", process.env.PG_USER);
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database Connection failed : ", err));

export default db;
