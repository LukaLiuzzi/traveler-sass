import { BaseUser, Employee, Owner, Client } from "./user"

export interface AuthAdminRepository<Employee, Owner> {
  register(user: Employee): Promise<Omit<Employee, "password">>
  //   login(email: string, password: string): Promise<Omit<Owner, "password">>
}

export interface AuthClientRepository<Client> {
  register(user: Client): Promise<Omit<Client, "password">>
  login(email: string, password: string): Promise<Omit<Client, "password">>
}

export interface AuthSuperAdminRepository<SuperAdmin, Owner> {
  register(user: Owner): Promise<Omit<Owner, "password">>
  //   login(email: string, password: string): Promise<Omit<SuperAdmin, "password">>
}
