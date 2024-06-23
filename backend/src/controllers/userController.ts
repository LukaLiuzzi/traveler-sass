// UserController.ts
import { Request, Response } from "express"
import { userService } from "../services/userService"
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/user"

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDTO: CreateUserDTO = req.body
      const user = await userService.createUser(userDTO)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: (error as any).message })
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const user = await userService.getUserById(userId)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: "User not found" })
      }
    } catch (error) {
      res.status(500).json({ error: (error as any).message })
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: (error as any).message })
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const userDTO: UpdateUserDTO = req.body
      const user = await userService.updateUser(userId, userDTO)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: "User not found" })
      }
    } catch (error) {
      res.status(500).json({ error: (error as any).message })
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      await userService.deleteUser(userId)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: (error as any).message })
    }
  }
}

export default UserController
