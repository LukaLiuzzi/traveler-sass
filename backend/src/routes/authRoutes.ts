import { Router } from "express"
import { AuthController } from "@controllers/authController"

const router = Router()

class AuthRoutes {
  static init() {
    router.post("/register", AuthController.createUser)
    router.post("/login", AuthController.loginUser)
    return router
  }
}

export { AuthRoutes }
