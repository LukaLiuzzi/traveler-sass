import { User } from "./user"

export interface AuthRepository {
  register(user: Partial<User>): Promise<Partial<User>>
  login(email: string, password: string): Promise<Partial<User>>
}
