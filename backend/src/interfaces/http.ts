import { Request, Response } from "express"
import { User } from "./types"

export interface MyRequest extends Request {
  user?: User | null
  tenantId?: string
}
export interface MyResponse extends Response {}
