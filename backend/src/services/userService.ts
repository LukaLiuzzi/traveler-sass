// UserService.ts
import { createUserRepository } from "../repositories/user/userFactory"
import { UserRepository } from "../interfaces/user"
import { CreateUserDTO, UpdateUserDTO, User } from "../interfaces/user"

class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(user)
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User | null> {
    return await this.userRepository.updateUser(id, user)
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id)
  }
}

// Inicializa el repositorio de usuarios basado en la variable de entorno
const userRepository = createUserRepository()
const userService = new UserService(userRepository)

export { userService, UserService }
