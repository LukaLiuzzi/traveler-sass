import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@config/constants"

export const generateAccessToken = (payload: {
  email: string
  role: string
  tenantId?: string
}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
}
