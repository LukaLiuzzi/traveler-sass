import ClientModel from "@models/ClientModel"
import {
  ClientsRepository as ClientsRepositoryType,
  GetClientsParams,
  GetClientsResponse,
} from "@interfaces/clients"
import { Client } from "@interfaces/types"
import { ErrorHandle } from "@helpers/Error"

class ClientsRepository implements ClientsRepositoryType {
  async getClients({
    page,
    limit,
    tenantId,
    query,
  }: GetClientsParams): Promise<GetClientsResponse> {
    const clients = await ClientModel.paginate(
      { ...query, tenantId },
      { page, limit }
    )

    return clients as unknown as GetClientsResponse
  }

  async getClientById(id: string, tenantId: string): Promise<Client> {
    const client = await ClientModel.findOne({ _id: id, tenantId })

    if (!client) {
      throw new ErrorHandle("Client not found", 404)
    }

    return client
  }

  async updateClient(
    client: Client,
    id: string,
    tenantId: string
  ): Promise<Client> {
    const updatedClient = await ClientModel.findOneAndUpdate(
      { _id: id, tenantId },
      { ...client, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedClient) {
      throw new ErrorHandle("Client not found", 404)
    }

    return updatedClient
  }

  async deleteClient(id: string, tenantId: string): Promise<boolean> {
    const deletedClient = await ClientModel.findOneAndUpdate(
      { _id: id, tenantId },
      { deletedAt: new Date(), status: "deleted" }
    )

    if (!deletedClient) {
      throw new ErrorHandle("Client not found", 404)
    }

    return true
  }
}

export { ClientsRepository }
