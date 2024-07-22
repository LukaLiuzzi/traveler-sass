import { Employee, Tenant, SuperAdmin } from "./types"

export interface AuthRepository {
  createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>>
  createEmployee(
    user: Partial<Employee>,
    tenantId: string
  ): Promise<Partial<Employee>>
  login(
    email: string,
    password: string,
    tenantId: string
  ): Promise<Partial<Tenant> | Partial<Employee>>
  loginSuperAdmin(email: string, password: string): Promise<Partial<SuperAdmin>>
}
