import { Router } from "express"
import { AuthController } from "@controllers/authController"
import { validateSchema } from "middlewares/schemaValidator"
import {
  ClientRegisterSchema,
  EmployeeRegisterSchema,
} from "validationSchemas/authSchema"
import { checkRole } from "middlewares/checkRole"

const router = Router()

class AuthRoutes {
  static init() {
    router.post(
      "/register/employee",
      validateSchema(EmployeeRegisterSchema),
      checkRole(["superAdmin"]),
      AuthController.createEmployee
    )
    router.post("/login", AuthController.login)
    return router
  }
}

export { AuthRoutes }
