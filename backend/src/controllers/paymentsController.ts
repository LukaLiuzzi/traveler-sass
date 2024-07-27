import { MyRequest, MyResponse } from "@interfaces/http"
import { ErrorHandle } from "@helpers/Error"
import { paymentsService } from "@services/paymentsService"
import { GetPaymentsQuery } from "@interfaces/payments"

class PaymentsController {
  static async getPayments(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { page, limit, paymentStatus, clientId } = req.query
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const query: GetPaymentsQuery = {
        ...(paymentStatus && {
          paymentStatus: paymentStatus as
            | "pending"
            | "paid"
            | "canceled"
            | "refunded"
            | "partiallyPaid",
        }),
        ...(clientId && { clientId: clientId as string }),
      }

      const payments = await paymentsService.getPayments({
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 50,
        query,
        tenantId,
      })

      res.status(200).json(payments)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async getPaymentsByClientId(
    req: MyRequest,
    res: MyResponse
  ): Promise<void> {
    try {
      const { clientId } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const payments = await paymentsService.getPaymentsByClientId(
        clientId,
        tenantId
      )
      res.status(200).json(payments)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async createPayment(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { tenantId } = req
      const payment = req.body

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const createdPayment = await paymentsService.createPayment(
        payment,
        payment.clientId,
        tenantId
      )
      res.status(201).json(createdPayment)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async updatePayment(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req
      const payment = req.body

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const updatedPayment = await paymentsService.updatePayment(
        payment,
        id,
        tenantId
      )
      res.status(200).json(updatedPayment)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async cancelPayment(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      await paymentsService.cancelPayment(id, tenantId)
      res.status(204).end()
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}

export { PaymentsController }
