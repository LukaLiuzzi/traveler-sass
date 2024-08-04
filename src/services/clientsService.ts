import { ClientsFactory } from "@repositories/clients/clientsFactory"
import {
  ClientsRepository as ClientsRepositoryType,
  GetClientsParams,
  GetClientsResponse,
} from "@interfaces/clients"
import { Client } from "@interfaces/types"

class ClientsService implements ClientsRepositoryType {
  private clientsRepository: ClientsRepositoryType

  constructor(clientsRepository: ClientsRepositoryType) {
    this.clientsRepository = clientsRepository
  }

  getClients({
    page,
    limit,
    query,
    tenantId,
  }: GetClientsParams): Promise<GetClientsResponse> {
    return this.clientsRepository.getClients({
      page,
      limit,
      query,
      tenantId,
    })
  }

  getClientById(id: string, tenantId: string): Promise<Client> {
    return this.clientsRepository.getClientById(id, tenantId)
  }

  updateClient(client: Client, id: string, tenantId: string): Promise<Client> {
    return this.clientsRepository.updateClient(client, id, tenantId)
  }

  deleteClient(id: string, tenantId: string): Promise<boolean> {
    return this.clientsRepository.deleteClient(id, tenantId)
  }
}

const clientsRepository = ClientsFactory()
const clientsService = new ClientsService(clientsRepository)

export { clientsService }
