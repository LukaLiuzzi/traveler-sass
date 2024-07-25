import { ClientsFactory } from "@repositories/clients/clientsFactory"
import {
  ClientsRepository as ClientsRepositoryType,
  GetClientsParams,
  GetClientsResponse,
} from "@interfaces/clients"
import { Client } from "@interfaces/types"

class ClientsService implements ClientsRepositoryType {
  private employeeesRepository: ClientsRepositoryType

  constructor(employeeesRepository: ClientsRepositoryType) {
    this.employeeesRepository = employeeesRepository
  }

  getClients({
    page,
    limit,
    query,
    tenantId,
  }: GetClientsParams): Promise<GetClientsResponse> {
    return this.employeeesRepository.getClients({
      page,
      limit,
      query,
      tenantId,
    })
  }

  getClientById(id: string, tenantId: string): Promise<Client> {
    return this.employeeesRepository.getClientById(id, tenantId)
  }

  updateClient(client: Client, id: string, tenantId: string): Promise<Client> {
    return this.employeeesRepository.updateClient(client, id, tenantId)
  }

  deleteClient(id: string, tenantId: string): Promise<boolean> {
    return this.employeeesRepository.deleteClient(id, tenantId)
  }
}

const clientsRepository = ClientsFactory()
const clientsService = new ClientsService(clientsRepository)

export { clientsService }
