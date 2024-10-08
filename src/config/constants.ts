import dotenv from "dotenv"
dotenv.config()

export const PORT = process.env.PORT || 8080
export const DATABASE_TYPE = process.env.DATABASE_TYPE || "mongo"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const API_VERSION = process.env.API_URL || "1"
export const API_URL =
  process.env.API_URL || `http://localhost:${PORT}/api/v${API_VERSION}`
export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
