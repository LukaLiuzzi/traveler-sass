import { AuthFactory } from "@repositories/auth/authFactory"
import { AuthRepository } from "@interfaces/auth"
import { Employee, Tenant } from "@interfaces/types"
import { Types } from "mongoose"

class AuthService implements AuthRepository {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>> {
    return this.authRepository.createTenant(user)
  }

  createEmployee(
    user: Partial<Employee>,
    tenantId: string
  ): Promise<Partial<Employee>> {
    return this.authRepository.createEmployee(user, tenantId)
  }

  login(
    email: string,
    password: string,
    tenantId: string
  ): Promise<Partial<Tenant> | Partial<Employee>> {
    return this.authRepository.login(email, password, tenantId)
  }
}

const authRepository = AuthFactory()
const authService = new AuthService(authRepository)

export { authService }
