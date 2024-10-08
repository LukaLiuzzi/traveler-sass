import { EmployeesFactory } from "@repositories/employees/employeesFactory"
import {
  EmployeesRepository,
  GetEmployeesParams,
  GetEmployeesResponse,
} from "@interfaces/employees"
import { Employee } from "@interfaces/types"

class EmployeesService implements EmployeesRepository {
  private employeeesRepository: EmployeesRepository

  constructor(employeeesRepository: EmployeesRepository) {
    this.employeeesRepository = employeeesRepository
  }

  getEmployees({
    page,
    limit,
    search,
    tenantId,
  }: GetEmployeesParams): Promise<GetEmployeesResponse> {
    return this.employeeesRepository.getEmployees({
      page,
      limit,
      search,
      tenantId,
    })
  }

  getEmployeeById(id: string, tenantId: string): Promise<Employee> {
    return this.employeeesRepository.getEmployeeById(id, tenantId)
  }

  updateEmployee(
    employee: Employee,
    id: string,
    tenantId: string
  ): Promise<Employee> {
    return this.employeeesRepository.updateEmployee(employee, id, tenantId)
  }

  deleteEmployee(id: string, tenantId: string): Promise<boolean> {
    return this.employeeesRepository.deleteEmployee(id, tenantId)
  }
}

const employeesRepository = EmployeesFactory()
const employeesService = new EmployeesService(employeesRepository)

export { employeesService }
