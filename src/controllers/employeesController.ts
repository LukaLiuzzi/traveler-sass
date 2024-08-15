import { MyRequest, MyResponse } from "@interfaces/http"
import { ErrorHandle } from "@helpers/Error"
import { employeesService } from "@services/employeesService"
import { GetEmployeesQuery } from "@interfaces/employees"

class EmployeesController {
  static async getEmployees(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { page, limit, search } = req.query
      const { tenantId } = req
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const employees = await employeesService.getEmployees({
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 50,
        search: search ? (search as string) : "",
        tenantId,
      })
      res.status(200).json(employees)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async getEmployeeById(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const employee = await employeesService.getEmployeeById(id, tenantId)
      res.status(200).json(employee)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async updateEmployee(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const employee = await employeesService.updateEmployee(
        req.body,
        id,
        tenantId
      )
      res.status(200).json(employee)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async deleteEmployee(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const result = await employeesService.deleteEmployee(id, tenantId)
      res.status(200).json({ success: result })
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}

export { EmployeesController }
