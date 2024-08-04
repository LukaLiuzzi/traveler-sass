import { z } from "zod"

export const PaymentRegisterSchema = z.object({
  amount: z.number(),
  paymentDate: z.date(),
  clientId: z.string(),
  planId: z.string(),
  isTotalPayment: z.boolean(),
  paymentStatus: z.enum([
    "pending",
    "paid",
    "canceled",
    "refunded",
    "partiallyPaid",
  ]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const PaymentUpdateSchema = z.object({
  amount: z.number().optional(),
  paymentDate: z.date().optional(),
  clientId: z.string().optional(),
  planId: z.string().optional(),
  isTotalPayment: z.boolean().optional(),
  paymentStatus: z
    .enum(["pending", "paid", "canceled", "refunded", "partiallyPaid"])
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})
