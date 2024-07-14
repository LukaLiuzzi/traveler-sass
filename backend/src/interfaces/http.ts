import { Request, Response } from "express"
import { User } from "./user"

export interface MyRequest extends Request {
  user?: User | null
}
export interface MyResponse extends Response {}
