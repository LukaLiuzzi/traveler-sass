import { MyRequest, MyResponse } from "@interfaces/http"
import { User } from "@interfaces/user"
import { authService } from "@services/authService"
import { ErrorHandle } from "@helpers/Error"

class AuthController {
  static async register(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const user = await authService.register(req.body)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async loginUser(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { email, password } = req.body
      const user = await authService.loginUser(email, password)
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
