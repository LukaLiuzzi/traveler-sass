import { z } from "zod"

export const EmployeeUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(["admin", "support", "sales", "finance"]).optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional(),
})
