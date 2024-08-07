import UserModel from "@models/UserModel"
import {
  EmployeesRepository,
  GetEmployeesParams,
  GetEmployeesResponse,
} from "@interfaces/employees"
import { Employee } from "@interfaces/types"
import { ErrorHandle } from "@helpers/Error"

class MongoEmployeesRepository implements EmployeesRepository {
  async getEmployees({
    page = 1,
    limit = 50,
    tenantId,
    query,
  }: GetEmployeesParams): Promise<GetEmployeesResponse> {
    const employees = await UserModel.paginate(
      {
        ...query,
        tenantId,
        role: { $in: ["admin", "sales", "support", "finance"] },
        status: { $ne: "deleted" },
      },
      {
        page,
        limit,
        select: "-password",
      }
    )

    return employees as unknown as GetEmployeesResponse
  }

  async getEmployeeById(id: string, tenantId: string): Promise<Employee> {
    const employee = await UserModel.findOne({
      _id: id,
      tenantId,
      role: { $in: ["admin", "sales", "support", "finance"] },
    })
      .select("-password")
      .exec()

    if (!employee) {
      throw ErrorHandle.notFound("Employee not found")
    }

    return employee as unknown as Employee
  }

  async updateEmployee(
    employee: Employee,
    id: string,
    tenantId: string
  ): Promise<Employee> {
    const updatedEmployee = await UserModel.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        role: { $in: ["admin", "sales", "support", "finance"] },
      },
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

    return updatedEmployee as unknown as Employee
  }

  async deleteEmployee(id: string, tenantId: string): Promise<boolean> {
    const deletedEmployee = await UserModel.findOneAndUpdate(
      {
        _id: id,
        tenantId,
        role: { $in: ["admin", "sales", "support", "finance"] },
      },
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
