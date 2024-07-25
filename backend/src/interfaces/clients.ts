import { Client } from "./types"

export interface GetClientsQuery {
  name?: string
  email?: string
  proccessStatus?: "pending" | "approved" | "rejected"
  planId?: string
}

export interface GetClientsParams {
  page?: number
  limit?: number
  tenantId: string
  query?: GetClientsQuery
}

export interface GetClientsResponse {
  docs: Client[]
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

export interface ClientsRepository {
  getClients: ({
    page,
    limit,
    tenantId,
    query,
  }: GetClientsParams) => Promise<GetClientsResponse>
  getClientById: (id: string, tenantId: string) => Promise<Client>
  updateClient: (
    client: Client,
    id: string,
    tenantId: string
  ) => Promise<Client>
  deleteClient: (id: string, tenantId: string) => Promise<boolean>
}
