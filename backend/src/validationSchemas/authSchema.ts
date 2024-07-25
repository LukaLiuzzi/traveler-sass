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
  role: z.union([
    z.literal("admin"),
    z.literal("support"),
    z.literal("sales"),
    z.literal("finance"),
  ]),
  tenantId: z.string(),
})

export const TenantRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
})
