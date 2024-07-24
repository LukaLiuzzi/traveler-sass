import { Types } from "mongoose"

interface User {
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
  email: string
  password: string
  accessToken: string
  refreshToken: string
  role: "superAdmin"
}
export interface Plan {
  name: string
  description: string
  price: number
  currency: string
  tenantId: string
  status: "active" | "inactive" | "deleted"
  createdAt: Date
  updatedAt: Date
}
export interface Document {}

export interface Payment {
  amount: number
  paymentDate: Date
  clientId: string
  tenantId: string
  planId: string
  isTotalPayment: boolean
  PaymentStatus: "pending" | "paid" | "canceled" | "refunded" | "partiallyPaid"
  createdAt: Date
  updatedAt: Date
}
