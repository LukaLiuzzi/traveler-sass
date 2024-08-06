import jwt from "jsonwebtoken"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "@config/constants"
export interface JWTPayload {
  email: string
  role: string
  tenantId?: string
  iat?: number
  exp?: number
}

interface VerifyJWTResult {
  expired: boolean
  payload: JWTPayload | null
}

export const generateAccessToken = (payload: JWTPayload) => {
  if (!JWT_SECRET) {
    return null
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
}

export const generateRefreshToken = (payload: JWTPayload) => {
  if (!JWT_REFRESH_SECRET) {
    return null
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" })
}

export const verifyJWT = (
  token: string,
  isRefreshToken: boolean = false
): VerifyJWTResult => {
  try {
    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      return { expired: false, payload: null }
    }
    const secret = isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET
    const payload = jwt.verify(token, secret) as JWTPayload
    return { expired: false, payload }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Si el token ha expirado, devolvemos el payload (puede ser null) y marcamos como expirado
      try {
        const payload = jwt.decode(token) as JWTPayload
        return { expired: true, payload }
      } catch (decodeError) {
        return { expired: true, payload: null }
      }
    }
    // Si el token no es válido por alguna otra razón, devolvemos null como payload
    return { expired: false, payload: null }
  }
}
