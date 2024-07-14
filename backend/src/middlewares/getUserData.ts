import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"
import jwt from "jsonwebtoken"
import UserModel from "@middlewares/UserModel"

export const getUserData = async (
  req: MyRequest,
  res: MyResponse,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]
  const decoded = jwt.decode(token as string) as { _id: string; email: string }
  if (decoded) {
    const user = await UserModel.findById(decoded._id)
    if (user) {
      req.user = user
    } else {
      req.user = null
    }
  }

  next()
}
