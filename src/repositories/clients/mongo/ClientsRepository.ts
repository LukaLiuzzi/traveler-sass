import UserModel from "@models/UserModel"
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
    const clients = await UserModel.paginate(
      {
        ...query,
        tenantId,
        role: "client",
      },
      { page, limit }
    )

    return clients as unknown as GetClientsResponse
  }

  async getClientById(id: string, tenantId: string): Promise<Client> {
    const client = await UserModel.findOne({
      _id: id,
      tenantId,
      role: "client",
    })

    if (!client) {
      throw new ErrorHandle("Client not found", 404)
    }

    return client as unknown as Client
  }

  async updateClient(
    client: Client,
    id: string,
    tenantId: string
  ): Promise<Client> {
    const updatedClient = await UserModel.findOneAndUpdate(
      { _id: id, tenantId, role: "client" },
      { ...client, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedClient) {
      throw new ErrorHandle("Client not found", 404)
    }

    return updatedClient as unknown as Client
  }

  async deleteClient(id: string, tenantId: string): Promise<boolean> {
    const deletedClient = await UserModel.findOneAndUpdate(
      { _id: id, tenantId, role: "client" },
      { deletedAt: new Date(), status: "deleted" }
    )

    if (!deletedClient) {
      throw new ErrorHandle("Client not found", 404)
    }

    return true
  }
}

export { ClientsRepository }
