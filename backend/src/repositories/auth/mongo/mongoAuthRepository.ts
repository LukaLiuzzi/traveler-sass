import UserModel from "@models/UserModel"
import { AuthRepository } from "@interfaces/auth"
import { User } from "@interfaces/user"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@config/constants"
import { hashPassword, comparePassword } from "@helpers/hashPassword"
import { ErrorHandle } from "@helpers/Error"

class MongoAuthRepository implements AuthRepository {
  async register(user: Partial<User>): Promise<Partial<User>> {
    const userExists = await UserModel.findOne({ email: user.email })
    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser: User = await UserModel.create({
      ...user,
      role: "client",
      password: hashedPassword,
    })

    const userWithoutPassword = {
      ...(newUser.toJSON() as object),
      password: undefined,
    }

    return userWithoutPassword
  }

  async login(email: string, password: string): Promise<Partial<User>> {
    const user = await UserModel.findOne({
      email,
    })

    if (!user) {
      throw ErrorHandle.badRequest("Invalid credentials")
    }

    const isPasswordCorrect = await comparePassword(password, user.password)

    if (!isPasswordCorrect) {
      throw ErrorHandle.badRequest("Invalid credentials")
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )

    const userWithToken = await UserModel.findByIdAndUpdate(
      user._id,
      {
        access_token: token,
      },
      {
        new: true,
      }
    )

    if (!userWithToken) {
      throw ErrorHandle.internal("Error generating token")
    }

    const userWithoutPassword = {
      ...userWithToken.toJSON(),
      password: undefined,
    }

    return userWithoutPassword
  }
}

export { MongoAuthRepository }
