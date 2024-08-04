import { AuthRepository } from "@interfaces/auth"
import { MongoAuthRepository } from "./mongo/mongoAuthRepository"
import { DATABASE_TYPE } from "@config/constants"

function AuthFactory(): AuthRepository {
  switch (DATABASE_TYPE) {
    case "mongo":
      return new MongoAuthRepository()
    default:
      throw new Error("Unsupported database")
  }
}

export { AuthFactory }
