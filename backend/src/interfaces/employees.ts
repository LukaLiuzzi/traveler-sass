import { Employee } from "./types"

export interface GetEmployeesQuery {
  name?: string
  email?: string
  role?: string
}
export interface GetEmployeesParams {
  page?: number
  limit?: number
  tenantId: string
  query?: GetEmployeesQuery
}
export interface EmployeesRepository {
  getEmployees: ({
    page,
    limit,
    tenantId,
    query,
  }: GetEmployeesParams) => Promise<Employee[]>
  getEmployeeById: (id: string, tenantId: string) => Promise<Employee>
  updateEmployee: (
    employee: Employee,
    id: string,
    tenantId: string
  ) => Promise<Employee>
  deleteEmployee: (id: string, tenantId: string) => Promise<boolean>
}
