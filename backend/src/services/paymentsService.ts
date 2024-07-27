import { PaymentsFactory } from "@repositories/payments/paymentsFactory"
import {
  PaymentsRepository as PaymentsRepositoryType,
  GetPaymentsParams,
  GetPaymentsResponse,
} from "@interfaces/payments"
import { Payment } from "@interfaces/types"

class PaymentsService implements PaymentsRepositoryType {
  private paymentsRepository: PaymentsRepositoryType

  constructor(paymentsRepository: PaymentsRepositoryType) {
    this.paymentsRepository = paymentsRepository
  }

  async getPayments({
    page = 1,
    limit = 10,
    tenantId,
    query,
  }: GetPaymentsParams): Promise<GetPaymentsResponse> {
    return this.paymentsRepository.getPayments({ page, limit, tenantId, query })
  }

  async getPaymentsByClientId(
    clientId: string,
    tenantId: string
  ): Promise<GetPaymentsResponse> {
    return this.paymentsRepository.getPaymentsByClientId(clientId, tenantId)
  }

  async createPayment(
    payment: Payment,
    clientId: string,
    tenantId: string
  ): Promise<Payment> {
    return this.paymentsRepository.createPayment(payment, clientId, tenantId)
  }

  async updatePayment(
    payment: Payment,
    id: string,
    tenantId: string
  ): Promise<Payment> {
    return this.paymentsRepository.updatePayment(payment, id, tenantId)
  }

  async cancelPayment(id: string, tenantId: string): Promise<boolean> {
    return this.paymentsRepository.cancelPayment(id, tenantId)
  }
}

const paymentsRepository = PaymentsFactory()
const paymentsService = new PaymentsService(paymentsRepository)

export { paymentsService }
