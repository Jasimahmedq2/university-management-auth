import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  db_connect: process.env.DB_STRING,
  port: process.env.PORT,
  default_user_pass: process.env.USER_PASS,
  default_faculty_pass: process.env.FACULTY_PASS,
  default_admin_pass: process.env.ADMIN_PASS,
  env: process.env.NODE_ENV,
  bcrypt_hash_sold: process.env.BCRYPT_HASH_SOLD,
};
