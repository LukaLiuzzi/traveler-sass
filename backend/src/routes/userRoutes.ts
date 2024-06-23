// userRoutes.ts
import { Router } from "express"
import UserController from "../controllers/userController"

const userController = new UserController()
const router = Router()

// Utilizamos .bind para asegurar que 'this' dentro de los métodos del controlador
// se refiera a la instancia de UserController
router.post("/users", userController.createUser.bind(userController))
router.get("/users/:id", userController.getUserById.bind(userController))
router.get("/users", userController.getAllUsers.bind(userController))
router.put("/users/:id", userController.updateUser.bind(userController))
router.delete("/users/:id", userController.deleteUser.bind(userController))

export default router
