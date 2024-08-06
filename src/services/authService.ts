import { AuthFactory } from "@repositories/auth/authFactory"
import { AuthRepository } from "@interfaces/auth"
import { Client, Employee, SuperAdmin, Tenant } from "@interfaces/types"

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

  createClient(
    client: Partial<Client>,
    tenantId: string
  ): Promise<Partial<Client>> {
    return this.authRepository.createClient(client, tenantId)
  }

  login(
    email: string,
    password: string,
    tenantId: string
  ): Promise<Partial<Tenant> | Partial<Employee>> {
    return this.authRepository.login(email, password, tenantId)
  }

  loginSuperAdmin(
    email: string,
    password: string
  ): Promise<Partial<SuperAdmin>> {
    return this.authRepository.loginSuperAdmin(email, password)
  }

  refreshToken(refreshToken: string): Promise<string> {
    return this.authRepository.refreshToken(refreshToken)
  }
}

const authRepository = AuthFactory()
const authService = new AuthService(authRepository)

export { authService }
