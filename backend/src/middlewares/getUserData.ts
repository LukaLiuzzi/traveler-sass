import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import ClientModel from "@models/ClientModel"
import SuperAdminModel from "@models/SuperAdmin"

export const getUserData = async (
  req: MyRequest,
  res: MyResponse,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  const decoded = jwt.decode(token as string) as {
    email: string
    role: string
    tenantId: string
  }

  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    let user

    if (decoded.role === "superAdmin") {
      const superAdmin = await SuperAdminModel.findOne({
        email: decoded.email,
      }).exec()
      req.isSuperAdmin = true
      req.user = superAdmin
      next()
      return
    } else if (decoded.role === "tenant") {
      user = await TenantModel.findOne({
        email: decoded.email,
        tenantId: decoded.tenantId,
      }).exec()
    } else if (decoded.role === "client") {
      user = await ClientModel.findOne({
        email: decoded.email,
        tenantId: decoded.tenantId,
      }).exec()
    } else {
      user = await EmployeeModel.findOne({
        email: decoded.email,
        tenantId: decoded.tenantId,
      }).exec()
    }

    if (!user) {
      return res.status(404).json({ error: `User not found` })
    }

    req.user = user
    req.tenantId = user.tenantId
    req.isSuperAdmin = false
    next()
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
