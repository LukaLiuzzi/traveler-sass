export interface User {
  id: number
  username: string
  email: string
}

export interface CreateUserDTO {
  email: string
  name?: string
}

export interface UpdateUserDTO {
  email?: string
  name?: string
}

export interface UserRepository {
  createUser(user: CreateUserDTO): Promise<User>
  getUserById(id: string): Promise<User | null>
  getAllUsers(): Promise<User[]>
  updateUser(id: string, user: UpdateUserDTO): Promise<User | null>
  deleteUser(id: string): Promise<void>
}
