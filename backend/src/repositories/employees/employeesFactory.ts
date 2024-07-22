import { EmployeesRepository } from "@interfaces/employees"
import { MongoEmployeesRepository } from "./mongo/mongoEmployeesRepository"
import { DATABASE_TYPE } from "@config/constants"

function EmployeesFactory(): EmployeesRepository {
  switch (DATABASE_TYPE) {
    case "mongo":
      return new MongoEmployeesRepository()
    default:
      throw new Error("Unsupported database")
  }
}

export { EmployeesFactory }
