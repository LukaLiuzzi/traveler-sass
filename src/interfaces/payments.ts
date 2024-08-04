import { Payment } from "./types"

export interface GetPaymentsQuery {
  paymentStatus?: "pending" | "paid" | "canceled" | "refunded" | "partiallyPaid"
  clientId?: string
}

export interface GetPaymentsParams {
  page?: number
  limit?: number
  tenantId: string
  query?: GetPaymentsQuery
}

export interface GetPaymentsResponse {
  docs: Payment[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface PaymentsRepository {
  getPayments: ({
    page,
    limit,
    tenantId,
    query,
  }: GetPaymentsParams) => Promise<GetPaymentsResponse>

  getPaymentsByClientId: (
    clientId: string,
    tenantId: string
  ) => Promise<GetPaymentsResponse>

  createPayment: (
    payment: Payment,
    clientId: string,
    tenantId: string
  ) => Promise<Payment>

  updatePayment: (
    payment: Payment,
    id: string,
    tenantId: string
  ) => Promise<Payment>

  cancelPayment: (id: string, tenantId: string) => Promise<boolean>
}
