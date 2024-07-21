import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import ClientModel from "@models/ClientModel"

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

  if (decoded.role === "tenant") {
    const tenant = await TenantModel.findOne({
      email: decoded.email,
      tenantId: decoded.tenantId,
    }).exec()
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" })
    }
    req.user = tenant
    req.tenantId = tenant.tenantId
    next()
  } else if (decoded.role === "client") {
    const client = await ClientModel.findOne({
      email: decoded.email,
      tenantId: decoded.tenantId,
    }).exec()
    if (!client) {
      return res.status(404).json({ error: "Client not found" })
    }
    req.user = client
    req.tenantId = client.tenantId
    next()
  } else {
    const employee = await EmployeeModel.findOne({
      email: decoded.email,
      tenantId: decoded.tenantId,
    }).exec()
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" })
    }
    req.user = employee
    req.tenantId = employee.tenantId
    next()
  }

  return res.status(401).json({ error: "Unauthorized" })
}
