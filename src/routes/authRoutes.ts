import { Router } from "express"
import { AuthController } from "@controllers/authController"
import { validateSchema } from "middlewares/schemaValidator"
import {
  EmployeeRegisterSchema,
  LoginSchema,
  refreshTokenSchema,
  TenantRegisterSchema,
} from "validationSchemas/authSchema"
import { checkRole } from "middlewares/checkRole"
import { getUserData } from "middlewares/getUserData"
import { ClientRegisterSchema } from "validationSchemas/clientsSchemas"

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
    router.post(
      "/register/client",
      validateSchema(ClientRegisterSchema),
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "sales"]),
      AuthController.createClient
    )
    router.post("/login", validateSchema(LoginSchema), AuthController.login)
    router.post(
      "/login/superadmin",
      validateSchema(LoginSchema),
      AuthController.loginSuperAdmin
    )
    router.post("/refresh-token", AuthController.refreshToken)
    return router
  }
}

export { AuthRoutes }
