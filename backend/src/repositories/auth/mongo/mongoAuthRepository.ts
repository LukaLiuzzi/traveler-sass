import TenantModel from "@models/TenantModel"
import EmployeeModel from "@models/EmployeeModel"
import { AuthRepository } from "@interfaces/auth"
import { Employee, Tenant } from "@interfaces/types"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@config/constants"
import { hashPassword, comparePassword } from "@helpers/hashPassword"
import { ErrorHandle } from "@helpers/Error"
import { Types } from "mongoose"
import { generateAccessToken } from "@helpers/generateJwt"

class MongoAuthRepository implements AuthRepository {
  async createTenant(user: Partial<Tenant>): Promise<Partial<Tenant>> {
    const userExists = await TenantModel.findOne({ email: user.email }).exec()

    if (userExists) {
      throw ErrorHandle.conflict("User already exists")
    }

    const hashedPassword = await hashPassword(user.password!)

    const newUser = (await TenantModel.create({
      ...user,
      role: "tenant",
      password: hashedPassword,
    })) as unknown as Tenant

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

    const newUser = (await EmployeeModel.create({
      ...user,
      password: hashedPassword,
      tenantId,
    })) as unknown as Employee

    const userWithoutPassword = {
      ...(newUser.toJSON() as Omit<Employee, "password">),
      password: undefined,
    }

    return userWithoutPassword
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

      const token = generateAccessToken({
        email: employee.email,
        role: employee.role,
        tenantId: employee.tenantId,
      })

      await EmployeeModel.updateOne(
        { _id: employee._id },
        { accessToken: token }
      ).exec()

      return {
        ...(employee.toJSON() as Omit<Employee, "password">),
        password: undefined,
        accessToken: token,
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

    const token = generateAccessToken({
      email: tenant.email,
      role: tenant.role,
      tenantId: tenant.tenantId,
    })

    await TenantModel.updateOne(
      { _id: tenant._id },
      { accessToken: token }
    ).exec()

    return {
      ...(tenant.toJSON() as Omit<Tenant, "password">),
      password: undefined,
      accessToken: token,
    }
  }
}

export { MongoAuthRepository }
