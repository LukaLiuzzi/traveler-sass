import { Types } from "mongoose"

interface User {
  toJSON(): Omit<User, "password">
  email: string
  password: string
  name: string
  lastName: string
  createdAt: Date
  deletedAt: Date
  updatedAt: Date
  accessToken: string
  refreshToken: string
  status: "active" | "inactive" | "deleted"
  role: "admin" | "support" | "sales" | "finance" | "client" | "tenant"
  tenantId: string
  phone: string
}

export interface Tenant extends User {
  role: "tenant"
}

export interface Employee extends User {
  role: "admin" | "support" | "sales" | "finance"
}

export interface Client extends User {
  role: "client"
  proccessStatus: string
  planId: string
  address: string
  phone: string
  maritalStatus: string
  children: number
  occupation: string
}

export interface SuperAdmin {
  _id?: Types.ObjectId
  toJSON(): Omit<SuperAdmin, "password">
  email: string
  password: string
  accessToken: string
  refreshToken: string
  role: "superAdmin"
}
