import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
})

export const ClientRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string().max(100),
  last_name: z.string().max(100),
  role: z.literal("client"),
  tenant_id: z.string(),
  address: z.string().max(100),
  phone: z.string().max(100),
  marital_status: z.string().max(100),
  children: z.number(),
  occupation: z.string().max(100),
})

export const EmployeeRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string().max(100),
  last_name: z.string().max(100),
  role: z.enum(["admin", "support", "sales", "finance"]),
  tenant_id: z.string(),
})
