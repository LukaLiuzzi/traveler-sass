import { db } from "@config/firestore"
import { AuthAdminRepository } from "@interfaces/auth"
import { Employee, Owner } from "@interfaces/user"

class FirestoreEmployeeAuthRepository
  implements AuthAdminRepository<Employee, Owner>
{
  private collection = db.collection("users")

  async register(user: Employee): Promise<Omit<Employee, "password">> {
    const { email, password, name, last_name, role, status, tenant_id } = user

    const newUser = await this.collection.add({
      email,
      password,
      name,
      last_name,
      role,
      status,
      tenant_id,
    })

    const userDoc = await newUser.get()
    const userData = userDoc.data() as Employee
    const userDataWithouPassword = { ...userData, password: undefined }

    return userDataWithouPassword
  }
}

export { FirestoreEmployeeAuthRepository }
