import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import ClientModel from "@models/ClientModel"
import { AuthRepository } from "@interfaces/auth"
import { Client, Employee, SuperAdmin, Tenant } from "@interfaces/types"
import { hashPassword, comparePassword } from "@helpers/hashPassword"
import { ErrorHandle } from "@helpers/Error"
import {
  generateAccessToken,
  generateRefreshToken,
  verifyJWT,
} from "@helpers/generateJwt"
import SuperAdminModel from "@models/SuperAdmin"

class MongoAuthRepository implements AuthRepository {
  async createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>> {
    const userExists = await TenantModel.findOne({ email: user.email }).exec()

    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser = await TenantModel.create({
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
    const userExists = await EmployeeModel.findOne({
      email: user.email,
      tenantId,
    }).exec()

    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser = await EmployeeModel.create({
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
    const clientExists = await ClientModel.findOne({
      email: client.email,
      tenantId,
    }).exec()

    if (clientExists) {
      throw ErrorHandle.conflict("Client already exists")
    }

    const hashedPassword = await hashPassword(client.password!)

    const newClient = await ClientModel.create({
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
    const employee = await EmployeeModel.findOne({ email, tenantId }).exec()

    if (employee) {
      const isPasswordCorrect = await comparePassword(
        password,
        employee.password
      )

      if (!isPasswordCorrect) {
        throw ErrorHandle.unauthorized("Invalid credentials")
      }

      const accessToken = generateAccessToken({
        email: employee.email,
        role: employee.role,
        tenantId: employee.tenantId,
      })
      const refreshToken = generateRefreshToken({
        email: employee.email,
        role: employee.role,
        tenantId: employee.tenantId,
      })

      if (!accessToken || !refreshToken) {
        throw ErrorHandle.internal("Token generation failed")
      }

      await EmployeeModel.updateOne(
        { _id: employee._id },
        { accessToken, refreshToken }
      ).exec()

      return {
        ...(employee.toJSON() as Omit<Employee, "password">),
        password: undefined,
        accessToken,
        refreshToken,
      }
    }

    const tenant = await TenantModel.findOne({ email, tenantId }).exec()

    if (!tenant) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const isPasswordCorrect = await comparePassword(password, tenant.password)

    if (!isPasswordCorrect) {
      throw ErrorHandle.unauthorized("Invalid credentials")
    }

    const accessToken = generateAccessToken({
      email: tenant.email,
      role: tenant.role,
      tenantId: tenant.tenantId,
    })

    const refreshToken = generateRefreshToken({
      email: tenant.email,
      role: tenant.role,
      tenantId: tenant.tenantId,
    })

    if (!accessToken || !refreshToken) {
      throw ErrorHandle.internal("Token generation failed")
    }

    await TenantModel.updateOne(
      { _id: tenant._id },
      { accessToken, refreshToken }
    ).exec()

    return {
      ...(tenant.toJSON() as Omit<Tenant, "password">),
      password: undefined,
      accessToken,
      refreshToken,
    }
  }

  async loginSuperAdmin(
    email: string,
    password: string
  ): Promise<Partial<SuperAdmin>> {
    const superAdmin = await SuperAdminModel.findOne({
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

    await SuperAdminModel.updateOne(
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

    let user

    if (role === "superAdmin") {
      user = await SuperAdminModel.findOne({ email }).exec()
    } else if (role === "tenant") {
      user = await TenantModel.findOne({ email, tenantId }).exec()
    } else if (role === "employee") {
      user = await EmployeeModel.findOne({ email, tenantId }).exec()
    } else {
      user = await ClientModel.findOne({ email, tenantId }).exec()
    }

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
