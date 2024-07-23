import { Employee } from "./types"

export interface GetEmployeesParams {
  page?: number
  limit?: number
  tenantId: string
  search?: string
  role?: string
}
export interface EmployeesRepository {
  getEmployees: ({
    page,
    limit,
    tenantId,
    search,
    role,
  }: GetEmployeesParams) => Promise<Employee[]>
  getEmployeeById: (id: string, tenantId: string) => Promise<Employee>
  updateEmployee: (
    employee: Employee,
    id: string,
    tenantId: string
  ) => Promise<Employee>
  deleteEmployee: (id: string, tenantId: string) => Promise<boolean>
}
