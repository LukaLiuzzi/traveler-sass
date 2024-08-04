import { Types } from "mongoose"

interface User {
  email: string
  password: string
  name: string
  lastName: string
  createdAt: Date
  deletedAt: Date
  updatedAt: Date
  deletedAt: boolean
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
  deletedAt: Date
}

// {
//   objectKey: 'destination_file_name.ext',
//   uri: 'destination_file_name.ext',
//   publicUrl: 'https://pub-xxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev/destination_file_name.ext',
//   etag: '',
//   versionId: '',
//   }
export interface Document {
  title: string
  description?: string
  name: string
  uri: string
  publicUrl: string
  etag: string
  versionId: string
  tenantId: string
  clientId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  status: "active" | "inactive" | "deleted"
}

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
  deletedAt: Date
}

export interface UserAccesses {
  userId: string
  tenantId: string
  clientId: string
  employeeId: string
  createdAt: Date
  ip: string
  userAgent: string
  location: string
  device: string
  browser: string
  os: string
}
