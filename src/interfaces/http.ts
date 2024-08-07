import { Request, Response } from "express"
import { CompleteUser } from "./types"

export interface MyRequest extends Request {
  user?: CompleteUser
  tenantId?: string
  isSuperAdmin?: boolean
}
export interface MyResponse extends Response {}
