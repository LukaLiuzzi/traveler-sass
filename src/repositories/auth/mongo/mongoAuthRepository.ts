import UserModel from "@models/UserModel"
import UserAccessesModel from "@models/UserAccesses"
import { AuthRepository } from "@interfaces/auth"
import { Client, Employee, SuperAdmin, Tenant } from "@interfaces/types"
import { hashPassword, comparePassword } from "@helpers/hashPassword"
import { ErrorHandle } from "@helpers/Error"
import {
  generateAccessToken,
  generateRefreshToken,
  verifyJWT,
} from "@helpers/generateJwt"

class MongoAuthRepository implements AuthRepository {
  async createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>> {
    const userExists = await UserModel.findOne({ email: user.email }).exec()

    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser = await UserModel.create({
      ...user,
      role: "tenant",
      password: hashedPassword,
    })

    const userWithoutPassword = {
      ...(newUser.toJSON() as Omit<Tenant, "password">),
      password: undefined,
    }

    return userWithoutPassword
  }

  async createEmployee(
    user: Partial<Employee>,
    tenantId: string
  ): Promise<Partial<Employee>> {
    const userExists = await UserModel.findOne({
      email: user.email,
      tenantId,
    }).exec()

    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser = await UserModel.create({
      ...user,
      password: hashedPassword,
      tenantId,
    })

    const userWithoutPassword = {
      ...(newUser.toJSON() as Omit<Employee, "password">),
      password: undefined,
    }

    return userWithoutPassword
  }

  async createClient(
    client: Partial<Client>,
    tenantId: string
  ): Promise<Partial<Client>> {
    const clientExists = await UserModel.findOne({
      email: client.email,
      tenantId,
    }).exec()

    if (clientExists) {
      throw ErrorHandle.conflict("Client already exists")
    }

    const hashedPassword = await hashPassword(client.password!)

    const newClient = await UserModel.create({
      ...client,
      password: hashedPassword,
      tenantId,
    })

    const clientWithoutPassword = {
      ...(newClient.toJSON() as Omit<Client, "password">),
      password: undefined,
    }

    return clientWithoutPassword
  }

  async login(
    email: string,
    password: string,
    tenantId: string
  ): Promise<Partial<Tenant> | Partial<Employee>> {
    const user = await UserModel.findOne({ email, tenantId }).exec()

    if (!user) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const isPasswordCorrect = await comparePassword(password, user.password)

    if (!isPasswordCorrect) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const accessToken = generateAccessToken({
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    })
    const refreshToken = generateRefreshToken({
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    })

    if (!accessToken || !refreshToken) {
      throw ErrorHandle.internal("Token generation failed")
    }

    await UserModel.updateOne(
      { _id: user._id },
      { accessToken, refreshToken }
    ).exec()

    await UserAccessesModel.create({
      userEmail: user.email,
      tenantId: user.tenantId,
      ip: null,
      userAgent: null,
      location: null,
      device: null,
      browser: null,
      os: null,
    })

    return {
      ...(user.toJSON() as Omit<Employee, "password">),
      password: undefined,
      accessToken,
      refreshToken,
    }
  }

  async loginSuperAdmin(
    email: string,
    password: string
  ): Promise<Partial<SuperAdmin>> {
    const superAdmin = await UserModel.findOne({
      email,
    }).exec()

    if (!superAdmin) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const isPasswordCorrect = await comparePassword(
      password,
      superAdmin.password
    )

    if (!isPasswordCorrect) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const accessToken = generateAccessToken({
      email: superAdmin.email,
      role: superAdmin.role,
    })

    const refreshToken = generateRefreshToken({
      email: superAdmin.email,
      role: superAdmin.role,
    })

    if (!accessToken || !refreshToken) {
      throw ErrorHandle.internal("Token generation failed")
    }

    await UserModel.updateOne(
      { _id: superAdmin._id },
      { accessToken, refreshToken }
    ).exec()

    const superAdminWithoutPassword = {
      ...(superAdmin.toJSON() as Omit<SuperAdmin, "password">),
      password: undefined,
      accessToken,
      refreshToken,
    }

    return superAdminWithoutPassword
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const { payload, expired } = verifyJWT(refreshToken, true)

    if (expired || !payload) {
      throw ErrorHandle.unauthorized("Unauthorized")
    }

    const { email, role, tenantId } = payload

    const user = await UserModel.findOne({ email }).exec()

    if (!user) {
      throw ErrorHandle.notFound("User not found")
    }

    if (user.refreshToken !== refreshToken) {
      throw ErrorHandle.unauthorized("Unauthorized")
    }

    const accessToken = generateAccessToken({
      email: user.email,
      role: user.role,
      tenantId: user.role !== "superAdmin" ? user.tenantId : undefined,
    })

    const newRefreshToken = generateRefreshToken({
      email: user.email,
      role: user.role,
      tenantId: user.role !== "superAdmin" ? user.tenantId : undefined,
    })

    if (!accessToken || !newRefreshToken) {
      throw ErrorHandle.internal("Token generation failed")
    }

    await user.updateOne({ accessToken, refreshToken: newRefreshToken }).exec()

    return accessToken
  }
}

export { MongoAuthRepository }
