import { db } from "@config/firestore"
import { UserRepository, Employee, Owner } from "@interfaces/user"

class FirestoreEmployeeRepository implements UserRepository<Owner | Employee> {
  private collection = db.collection("users")

  async findById(id: string): Promise<Owner | Employee | null> {
    const user = await this.collection.doc(id).get()
    if (!user.exists) return null
    return user.data() as Owner | Employee
  }

  async findByEmail(email: string): Promise<Owner | Employee | null> {
    const user = await this.collection.where("email", "==", email).get()
    if (user.empty) return null
    return user.docs[0].data() as Owner | Employee
  }
}

export { FirestoreEmployeeRepository }
