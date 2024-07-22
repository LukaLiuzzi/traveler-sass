import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import { EmployeesRepository } from "@interfaces/employees"
import { Employee, SuperAdmin, Tenant } from "@interfaces/types"
import { hashPassword, comparePassword } from "@helpers/hashPassword"
import { ErrorHandle } from "@helpers/Error"
import { generateAccessToken } from "@helpers/generateJwt"
import SuperAdminModel from "@models/SuperAdmin"

class MongoEmployeesRepository implements EmployeesRepository {
  async getEmployees(
    page: number = 1,
    limit: number = 50,
    tenantId: string,
    search?: string,
    role?: string
  ): Promise<Employee[]> {
    const query = {
      tenantId,
      ...(search && { $text: { $search: search } }),
      ...(role && { role }),
    }

    const employees = await EmployeeModel.paginate(query, {
      page,
      limit,
      select: "-password",
    })

    return employees.docs as Employee[]
  }

  async getEmployeeById(id: string, tenantId: string): Promise<Employee> {
    const employee = await EmployeeModel.findOne({ _id: id, tenantId })
      .select("-password")
      .exec()

    if (!employee) {
      throw ErrorHandle.notFound("Employee not found")
    }

    return employee
  }

  async updateEmployee(
    employee: Employee,
    id: string,
    tenantId: string
  ): Promise<Employee> {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: id, tenantId },
      employee,
      { new: true }
    )
      .select("-password")
      .exec()

    if (!updatedEmployee) {
      throw ErrorHandle.notFound("Employee not found")
    }

    return updatedEmployee
  }

  async deleteEmployee(id: string, tenantId: string): Promise<boolean> {
    const deletedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: id, tenantId },
      { deletedAt: new Date(), status: "deleted" },
      { new: true }
    ).exec()

    if (!deletedEmployee) {
      throw ErrorHandle.notFound("Employee not found")
    }

    return true
  }
}

export { MongoEmployeesRepository }
