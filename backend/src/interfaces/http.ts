import { Request, Response } from "express"
import { User } from "./user"

export interface MyRequest extends Request {
  user?: User
}
export interface MyResponse extends Response {}
