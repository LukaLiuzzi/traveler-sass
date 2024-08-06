import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"
import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import ClientModel from "@models/ClientModel"
import SuperAdminModel from "@models/SuperAdmin"
import {
  verifyJWT,
  generateAccessToken,
  generateRefreshToken,
  JWTPayload,
} from "@helpers/generateJwt"

export const getUserData = async (
  req: MyRequest,
  res: MyResponse,
  next: NextFunction
) => {
  // Obtener tokens desde las cookies
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  // Si no hay accessToken, retornar error de autorización
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { expired, payload } = verifyJWT(accessToken)

  // Si el accessToken es válido, proceder con la autenticación del usuario
  if (payload) {
    await authenticateUser(req, res, next, payload)
  } else if (expired && refreshToken) {
    // Si el accessToken ha expirado, verificar el refreshToken
    const { payload: refreshPayload } = verifyJWT(refreshToken, true)

    if (!refreshPayload) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    // Generar un nuevo accessToken
    const newAccessToken = generateAccessToken(refreshPayload)

    if (!newAccessToken) {
      return res.status(500).json({ error: "Internal Server Error" })
    }
    // Verificar el nuevo accessToken
    const { payload: newPayload } = verifyJWT(newAccessToken)

    if (!newPayload) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    // Establecer una nueva cookie para el accessToken
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true })

    await authenticateUser(req, res, next, newPayload)
  } else {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

// Función auxiliar para autenticar al usuario según su rol
const authenticateUser = async (
  req: MyRequest,
  res: MyResponse,
  next: NextFunction,
  payload: JWTPayload
) => {
  const { email, role, tenantId } = payload
  try {
    let user

    switch (role) {
      case "superAdmin":
        user = await SuperAdminModel.findOne({ email }).exec()
        if (user) {
          req.isSuperAdmin = true
          req.user = user
          return next()
        }
        break
      case "tenant":
        user = await TenantModel.findOne({ email, tenantId }).exec()
        break
      case "client":
        user = await ClientModel.findOne({ email, tenantId }).exec()
        break
      case "employee":
        user = await EmployeeModel.findOne({ email, tenantId }).exec()
        break
      default:
        return res.status(400).json({ error: "Invalid role" })
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    req.user = user
    req.tenantId = user.tenantId
    req.isSuperAdmin = role === "superAdmin"
    next()
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
