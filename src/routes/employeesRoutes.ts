import { Router } from "express"
import { EmployeesController } from "@controllers/employeesController"
import { validateSchema } from "middlewares/schemaValidator"
import { EmployeeUpdateSchema } from "validationSchemas/employeesSchemas"
import { checkRole } from "middlewares/checkRole"
import { getUserData } from "middlewares/getUserData"

const router = Router()

class EmployeesRoutes {
  static init() {
    router.get(
      "/",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin"]),
      EmployeesController.getEmployees
    )

    router.get(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin"]),
      EmployeesController.getEmployeeById
    )

    router.put(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant"]),
      validateSchema(EmployeeUpdateSchema),
      EmployeesController.updateEmployee
    )

    router.delete(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant"]),
      EmployeesController.deleteEmployee
    )

    return router
  }
}

export { EmployeesRoutes }
