import { AuthFactory } from "@repositories/auth/authFactory"
import { AuthRepository } from "@interfaces/auth"
import { User } from "@interfaces/user"

class AuthService {
  private userRepository: AuthRepository

  constructor(userRepository: AuthRepository) {
    this.userRepository = userRepository
  }

  async register(user: Partial<User>): Promise<Partial<User>> {
    return this.userRepository.register(user)
  }

  async loginUser(email: string, password: string): Promise<Partial<User>> {
    return this.userRepository.login(email, password)
  }
}

const userRepository = AuthFactory()
const authService = new AuthService(userRepository)

export { authService }
