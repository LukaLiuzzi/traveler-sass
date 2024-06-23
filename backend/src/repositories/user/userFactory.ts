// repositoryFactory.ts
import { PrismaUserRepository } from "./PrismaUserRepository"
import { FirestoreUserRepository } from "./FirestoreUserRepository"
import { UserRepository } from "../../interfaces/user"

function createUserRepository(): UserRepository {
  const dbType = process.env.DATABASE_TYPE

  switch (dbType) {
    case "prisma":
      return new PrismaUserRepository()
    case "firestore":
      return new FirestoreUserRepository()
    default:
      throw new Error("Unsupported database type")
  }
}

export { createUserRepository }
