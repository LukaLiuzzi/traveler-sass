import { Employee, Tenant, SuperAdmin, Client } from "./types"

export interface AuthRepository {
  createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>>
  createEmployee(
    user: Partial<Employee>,
    tenantId: string
  ): Promise<Partial<Employee>>
  createClient(
    client: Partial<Client>,
    tenantId: string
  ): Promise<Partial<Client>>
  login(
    email: string,
    password: string,
    tenantId: string
  ): Promise<Partial<Tenant> | Partial<Employee>>
  loginSuperAdmin(email: string, password: string): Promise<Partial<SuperAdmin>>
}
