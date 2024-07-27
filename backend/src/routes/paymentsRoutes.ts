import { Router } from "express"
import { PaymentsController } from "@controllers/paymentsController"
import { validateSchema } from "middlewares/schemaValidator"
import {
  PaymentRegisterSchema,
  PaymentUpdateSchema,
} from "validationSchemas/paymentsSchemas"
import { checkRole } from "middlewares/checkRole"
import { getUserData } from "middlewares/getUserData"

const router = Router()

class PaymentsRoutes {
  static init() {
    router.get(
      "/",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "support", "finance"]),
      PaymentsController.getPayments
    )

    router.get(
      "/:clientId",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "support", "finance"]),
      PaymentsController.getPaymentsByClientId
    )

    router.post(
      "/",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "finance"]),
      validateSchema(PaymentRegisterSchema),
      PaymentsController.createPayment
    )

    router.put(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "finance"]),
      validateSchema(PaymentUpdateSchema),
      PaymentsController.updatePayment
    )

    router.delete(
      "/:id",
      getUserData,
      checkRole(["superAdmin", "tenant", "admin", "finance"]),
      PaymentsController.cancelPayment
    )

    return router
  }
}

export { PaymentsRoutes }
