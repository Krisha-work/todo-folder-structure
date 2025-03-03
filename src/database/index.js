import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({

  //ONLINE DATABASE CONNECTION CODE
  // connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },

  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

//TEST TIME SERVERCONNECT WITH DATABASE CODE
// db.connect()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database Connection failed : ", err));

export default db;
