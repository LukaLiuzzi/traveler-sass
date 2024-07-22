import { Employee } from "./types"

export interface EmployeesRepository {
  getEmployees: (
    page: number,
    limit: number,
    search: string,
    role: string,
    tenantId: string
  ) => Promise<Employee[]>
  getEmployeeById: (id: string, tenantId: string) => Promise<Employee>
  updateEmployee: (
    employee: Employee,
    id: string,
    tenantId: string
  ) => Promise<Employee>
  deleteEmployee: (id: string, tenantId: string) => Promise<boolean>
}
