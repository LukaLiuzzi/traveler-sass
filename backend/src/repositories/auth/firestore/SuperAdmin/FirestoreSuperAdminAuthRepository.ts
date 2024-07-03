import { db } from "@config/firestore"
import { AuthSuperAdminRepository } from "@interfaces/auth"
import { Owner, SuperAdmin } from "@interfaces/user"

class FirestoreSuperAdminAuthRepository
  implements AuthSuperAdminRepository<SuperAdmin, Owner>
{
  private collection = db.collection("users")

  async register(user: Owner): Promise<Omit<Owner, "password">> {
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
    const userData = userDoc.data() as Owner
    const userDataWithouPassword = { ...userData, password: undefined }

    return userDataWithouPassword
  }
}

export { FirestoreSuperAdminAuthRepository }
