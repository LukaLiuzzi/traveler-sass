import { Request, Response } from "express"
import { SuperAdmin, User } from "./types"

export interface MyRequest extends Request {
  user?: User | SuperAdmin | null
  tenantId?: string
  isSuperAdmin?: boolean
}
export interface MyResponse extends Response {}
