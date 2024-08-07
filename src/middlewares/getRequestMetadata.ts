import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"

export const getRequestMetadata = (
  req: MyRequest,
  res: MyResponse,
  next: NextFunction
) => {
  req.userAgent = req.headers["user-agent"]
  next()
}
