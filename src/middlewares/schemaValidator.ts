import { MyRequest, MyResponse } from "@interfaces/http"
import { NextFunction } from "express"
import { z } from "zod"

const validateSchema =
  (schema: z.ZodSchema) =>
  (req: MyRequest, res: MyResponse, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: (error as z.ZodError).errors,
      })
    }
  }

export { validateSchema }
