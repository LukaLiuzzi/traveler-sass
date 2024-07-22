import { Router } from "express"
import { AuthController } from "@controllers/authController"
import { validateSchema } from "middlewares/schemaValidator"
import {
  EmployeeRegisterSchema,
  LoginSchema,
  TenantRegisterSchema,
} from "validationSchemas/authSchema"
import { checkRole } from "middlewares/checkRole"
import { getUserData } from "middlewares/getUserData"

const router = Router()

class AuthRoutes {
  static init() {
    router.post(
      "/register/tenant",
      validateSchema(TenantRegisterSchema),
      getUserData,
      checkRole(["superAdmin"]),
      AuthController.createTenant
    )
    router.post(
      "/register/employee",
      validateSchema(EmployeeRegisterSchema),
      getUserData,
      checkRole(["superAdmin", "tenant"]),
      AuthController.createEmployee
    )
    router.post("/login", validateSchema(LoginSchema), AuthController.login)
    router.post(
      "/login/superadmin",
      validateSchema(LoginSchema),
      AuthController.loginSuperAdmin
    )
    return router
  }
}

export { AuthRoutes }
