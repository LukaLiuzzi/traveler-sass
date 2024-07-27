import { PaymentsRepository as PaymentsRepositoryType } from "@interfaces/payments"
import { PaymentsRepository } from "./mongo/PaymentsRepository"
import { DATABASE_TYPE } from "@config/constants"

function PaymentsFactory(): PaymentsRepositoryType {
  switch (DATABASE_TYPE) {
    case "mongo":
      return new PaymentsRepository()
    default:
      throw new Error("Unsupported database")
  }
}

export { PaymentsFactory }
