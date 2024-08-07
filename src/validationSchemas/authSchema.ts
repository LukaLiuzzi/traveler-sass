import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
})

export const EmployeeRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  role: z.enum(["admin", "sales", "support", "finance"]),
  tenantId: z.string(),
})

export const TenantRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  role: z.enum(["tenant"]),
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
})
