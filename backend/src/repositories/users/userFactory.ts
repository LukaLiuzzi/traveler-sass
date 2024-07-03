import { Employee, Owner, UserRepository } from "@interfaces/user"
import { FirestoreEmployeeRepository } from "@repositories/users/firestore/Employees/FirestoreEmployeeRepository"

function EmployeeFactory(): UserRepository<Owner | Employee> {
  const dbType = process.env.DATABASE_TYPE

  switch (dbType) {
    case "firestore":
      return new FirestoreEmployeeRepository()
    default:
      throw new Error("Unsupported database type")
  }
}

export { EmployeeFactory }
