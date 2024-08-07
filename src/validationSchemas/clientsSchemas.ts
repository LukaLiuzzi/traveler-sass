import { z } from "zod"

export const ClientRegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  maritalStatus: z.string().optional(),
  role: z.enum(["client"]).optional(),
  children: z.number().optional(),
  occupation: z.string().optional(),
  planId: z.string().optional(),
  proccessStatus: z.string().optional(),
})

export const ClientUpdateSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional(),
  proccessStatus: z.enum(["pending", "approved", "rejected"]).optional(),
  planId: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["client"]).optional(),
  phone: z.string().optional(),
  maritalStatus: z.string().optional(),
  children: z.number().optional(),
  occupation: z.string().optional(),
})
