export const PORT = process.env.PORT || 8080
export const DATABASE_TYPE = process.env.DATABASE_TYPE || "prisma"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const API_VERSION = process.env.API_URL || "1"
export const API_URL =
  process.env.API_URL || `http://localhost:${PORT}/api/v${API_VERSION}`
