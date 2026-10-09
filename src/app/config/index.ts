import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  frontend_url: process.env.FRONTEND_URL,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  gemini_api_key: process.env.GEMINI_API_KEY,
  gemini_model: process.env.GEMINI_MODEL,
};