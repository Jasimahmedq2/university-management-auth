import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  db_connect: process.env.DB_STRING,
  port: process.env.PORT,
};
