import { User } from "@interfaces/types"
import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT || 8080
export const DATABASE_TYPE = process.env.DATABASE_TYPE || "mongo"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const API_VERSION = process.env.API_URL || "1"
export const API_URL =
  process.env.API_URL || `http://localhost:${PORT}/api/v${API_VERSION}`
export const MONGO_URI = process.env.MONGO_URI || ""
export const JWT_SECRET = process.env.JWT_SECRET || ""

// export const RolesWeight: { [key in User["role"]]: number } = {
//   tenant: 8,
//   admin: 7,
//   finance: 6,
//   sales: 6,
//   support: 6,
//   client: 1,
// }
