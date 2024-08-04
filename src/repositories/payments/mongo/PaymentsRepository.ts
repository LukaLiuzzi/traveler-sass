import ClientModel from "@models/ClientModel"
import PaymentModel from "@models/paymentModel"
import {
  PaymentsRepository as PaymentsRepositoryType,
  GetPaymentsParams,
  GetPaymentsResponse,
} from "@interfaces/payments"
import { Payment } from "@interfaces/types"
import { ErrorHandle } from "@helpers/Error"

class PaymentsRepository implements PaymentsRepositoryType {
  async getPayments({
    page = 1,
    limit = 10,
    tenantId,
    query,
  }: GetPaymentsParams): Promise<GetPaymentsResponse> {
    const { paymentStatus, clientId } = query || {}

    const findQuery: { [key: string]: any } = { tenantId }

    if (paymentStatus) {
      findQuery.paymentStatus = paymentStatus
    }

    if (clientId) {
      const client = await ClientModel.findOne({ _id: clientId, tenantId })

      if (!client) {
        throw new ErrorHandle("Client not found", 404)
      }

      findQuery.clientId = clientId
    }

    const payments = await PaymentModel.paginate(findQuery, {
      page,
      limit,
      sort: { createdAt: -1 },
    })

    return payments as GetPaymentsResponse
  }

  async getPaymentsByClientId(
    clientId: string,
    tenantId: string
  ): Promise<GetPaymentsResponse> {
    const client = await ClientModel.findOne({ _id: clientId, tenantId })

    if (!client) {
      throw new ErrorHandle("Client not found", 404)
    }

    const payments = await PaymentModel.paginate(
      { clientId, tenantId },
      { sort: { createdAt: -1 } }
    )

    return payments as GetPaymentsResponse
  }

  async createPayment(
    payment: Payment,
    clientId: string,
    tenantId: string
  ): Promise<Payment> {
    const client = await ClientModel.findOne({ _id: clientId, tenantId })

    if (!client) {
      throw new ErrorHandle("Client not found", 404)
    }

    const newPayment = await PaymentModel.create({
      ...payment,
      amount: Number(payment.amount),
      isTotalPayment: Boolean(payment.isTotalPayment),
      clientId,
      tenantId,
    })

    return newPayment
  }

  async updatePayment(
    payment: Payment,
    id: string,
    tenantId: string
  ): Promise<Payment> {
    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { _id: id, tenantId },
      payment,
      { new: true }
    )

    if (!updatedPayment) {
      throw new ErrorHandle("Payment not found", 404)
    }

    return updatedPayment
  }

  async cancelPayment(id: string, tenantId: string): Promise<boolean> {
    const deletedPayment = await PaymentModel.findOneAndUpdate(
      { _id: id, tenantId },
      { paymentStatus: "canceled" }
    )

    if (!deletedPayment) {
      throw new ErrorHandle("Payment not found", 404)
    }

    return true
  }
}

export { PaymentsRepository }
