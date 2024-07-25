import { ClientsRepository as ClientsRepositoryType } from "@interfaces/clients"
import { ClientsRepository } from "./mongo/ClientsRepository"
import { DATABASE_TYPE } from "@config/constants"

function ClientsFactory(): ClientsRepositoryType {
  switch (DATABASE_TYPE) {
    case "mongo":
      return new ClientsRepository()
    default:
      throw new Error("Unsupported database")
  }
}

export { ClientsFactory }
