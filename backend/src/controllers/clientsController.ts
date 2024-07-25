import { MyRequest, MyResponse } from "@interfaces/http"
import { ErrorHandle } from "@helpers/Error"
import { clientsService } from "@services/clientsService"
import { GetClientsQuery } from "@interfaces/clients"

class ClientsController {
  static async getClients(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { page, limit, name, email, processStatus, planId } = req.query
      const { tenantId } = req
      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const query: GetClientsQuery = {
        ...(name && { name: name as string }),
        ...(email && { email: email as string }),
        ...(processStatus && { processStatus: processStatus as string }),
        ...(planId && { planId: planId as string }),
      }

      const clients = await clientsService.getClients({
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 50,
        query,
        tenantId,
      })

      res.status(200).json(clients)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async getClientById(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const client = await clientsService.getClientById(id, tenantId)
      res.status(200).json(client)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async updateClient(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req
      const client = req.body

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      const updatedClient = await clientsService.updateClient(
        client,
        id,
        tenantId
      )
      res.status(200).json(updatedClient)
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }

  static async deleteClient(req: MyRequest, res: MyResponse): Promise<void> {
    try {
      const { id } = req.params
      const { tenantId } = req

      if (!tenantId) {
        throw ErrorHandle.badRequest("TenantId is required")
      }

      await clientsService.deleteClient(id, tenantId)
      res.status(204).send()
    } catch (error) {
      if (error instanceof ErrorHandle) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  }
}

export { ClientsController }
