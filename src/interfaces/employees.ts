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
  search?: string
}

export interface GetEmployeesResponse {
  docs: Employee[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface EmployeesRepository {
  getEmployees: ({
    page,
    limit,
    tenantId,
    search,
  }: GetEmployeesParams) => Promise<GetEmployeesResponse>
  getEmployeeById: (id: string, tenantId: string) => Promise<Employee>
  updateEmployee: (
    employee: Employee,
    id: string,
    tenantId: string
  ) => Promise<Employee>
  deleteEmployee: (id: string, tenantId: string) => Promise<boolean>
}
