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
      checkRole(["super_admin", "owner"]),
      AuthController.register
    )
    router.post(
      "/register",
      validateSchema(ClientRegisterSchema),
      AuthController.register
    )
    router.post("/login", AuthController.loginUser)
    return router
  }
}

export { AuthRoutes }
