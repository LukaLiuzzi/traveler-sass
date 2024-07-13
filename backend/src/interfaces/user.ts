export interface User {
  _id: string
  email: string
  password: string
  name: string
  last_name: string
  created_at: Date
  deleted_at: Date
  updated_at: Date
  access_token: string
  refresh_token: string
  status: "active" | "inactive" | "deleted"
  role:
    | "owner"
    | "sales"
    | "support"
    | "finance"
    | "admin"
    | "client"
    | "super_admin"
  tenant_id: string
  proccess_status:
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled"
    | "reviewing"
  plan_id: string
  address: string
  phone: string
  marital_status:
    | "single"
    | "married"
    | "divorced"
    | "widowed"
    | "separated"
    | "unmarried"
  children: number
  occupation: string
}

export interface Owner extends User {
  role: "owner"
  tenant_id: string
}

export interface Employee extends User {
  role: "sales" | "support" | "finance" | "admin"
  tenant_id: string
}

export interface SuperAdmin extends User {
  role: "super_admin"
}

export interface Client extends User {
  role: "client"
  tenant_id: string
  proccess_status:
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled"
    | "reviewing"
  plan_id: string
  address: string
  phone: string
  marital_status:
    | "single"
    | "married"
    | "divorced"
    | "widowed"
    | "separated"
    | "unmarried"
  children: number
  occupation: string
}

export interface CreateUserDTO {
  email: string
  password: string
  name: string
  last_name: string
  role: "owner" | "sales" | "support" | "finance" | "admin" | "client"
  status: "active"
  tenant_id: string
  proccess_status?:
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled"
    | "reviewing"
  plan_id?: string
}

export interface UpdateUserDTO {
  email?: string
  password?: string
  name?: string
  last_name?: string
  role?: "owner" | "sales" | "support" | "finance" | "admin" | "client"
  status?: "active" | "inactive" | "deleted"
  tenant_id?: string
  proccess_status?:
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled"
    | "reviewing"
  plan_id?: string
}
export interface UserRepository<T extends User> {
  findById(id: string): Promise<Omit<T, "password"> | null>
  findByEmail(email: string): Promise<Omit<T, "password"> | null>
}
