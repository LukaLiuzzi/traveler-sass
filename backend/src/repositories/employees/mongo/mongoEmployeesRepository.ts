import EmployeeModel from "@models/EmployeeModel"
import { EmployeesRepository, GetEmployeesParams } from "@interfaces/employees"
import { Employee } from "@interfaces/types"
import { ErrorHandle } from "@helpers/Error"

class MongoEmployeesRepository implements EmployeesRepository {
  async getEmployees({
    page = 1,
    limit = 50,
    tenantId,
    query,
  }: GetEmployeesParams): Promise<Employee[]> {
    console.log(query)
    const employees = await EmployeeModel.paginate(
      {
        ...query,
        tenantId,
        status: { $ne: "deleted" },
      },
      {
        page,
        limit,
        select: "-password",
      }
    )

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
      {
        ...employee,
        updatedAt: new Date(),
      },
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
