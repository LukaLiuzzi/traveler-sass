import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"

export const checkRole =
  (role: string[] = ["client"]) =>
  (req: MyRequest, res: MyResponse, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    next()
  }
