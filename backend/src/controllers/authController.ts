import { MyRequest, MyResponse } from "@interfaces/http"
import { authService } from "@services/authService"
import { ErrorHandle } from "@helpers/Error"

class AuthController {
  static async createTenant(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const user = await authService.createTenant(req.body)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async createEmployee(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { tenantId } = req
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }
      const user = await authService.createEmployee(req.body, tenantId)
      res.status(200).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async login(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { tenantId } = req
      const { email, password } = req.body
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }
      const user = await authService.login(email, password, tenantId)
      res.status(200).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}

export { AuthController }
