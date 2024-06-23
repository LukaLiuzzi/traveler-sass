// PrismaUserRepository.ts
import { PrismaClient } from "@prisma/client"
import {
  UserRepository,
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "../../interfaces/user"

const prisma = new PrismaClient()

class PrismaUserRepository implements UserRepository {
  async createUser(user: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: user,
    })
  }

  async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User | null> {
    return await prisma.user.update({
      where: { id },
      data: user,
    })
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}

export { PrismaUserRepository }
