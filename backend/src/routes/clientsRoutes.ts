import { Router } from "express"
import { ClientsController } from "@controllers/clientsController"
import { validateSchema } from "middlewares/schemaValidator"
import { ClientUpdateSchema } from "validationSchemas/clientsSchemas"
import { checkRole } from "middlewares/checkRole"
import { getUserData } from "middlewares/getUserData"

const router = Router()

class ClientsRoutes {
  static init() {
    router.get(
      "/",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "support", "finance"]),
      ClientsController.getClients
    )

    router.get(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "support", "finance"]),
      ClientsController.getClientById
    )

    router.put(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "support"]),
      validateSchema(ClientUpdateSchema),
      ClientsController.updateClient
    )

    router.delete(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin"]),
      ClientsController.deleteClient
    )

    return router
  }
}

export { ClientsRoutes }
