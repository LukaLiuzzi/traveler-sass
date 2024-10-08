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
      } else if ((error as any).name === "ValidationError") {
        res.status(400).json({ error: (error as any).errors })
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
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async createClient(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { tenantId } = req
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const user = await authService.createClient(req.body, tenantId)
      res.status(201).json(user)
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
      const { email, password, tenantId } = req.body
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }
      const user = await authService.login(email, password, tenantId)

      res.cookie("accessToken", user.accessToken, {
        httpOnly: true,
      })
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
      })

      res.status(200).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async loginSuperAdmin(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { email, password } = req.body
      const user = await authService.loginSuperAdmin(email, password)

      res.cookie("accessToken", user.accessToken, {
        httpOnly: true,
      })
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
      })

      res.status(200).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async refreshToken(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken
      const accessToken = await authService.refreshToken(refreshToken)
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
      })

      res.status(200).json({ accessToken })
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
