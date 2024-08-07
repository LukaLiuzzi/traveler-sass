import { Request, Response } from "express"
import { CompleteUser } from "./types"

export interface MyRequest extends Request {
  user?: CompleteUser
  tenantId?: string
  isSuperAdmin?: boolean
  userAgent?: string
  location?: string
  device?: string
  browser?: string
  os?: string
}
export interface MyResponse extends Response {}
