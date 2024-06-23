// FirestoreUserRepository.ts
// import { db } from "./firebase"
import {
  UserRepository,
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "../../interfaces/user"

let db: any

class FirestoreUserRepository implements UserRepository {
  private collection = db.collection("users")

  async createUser(user: CreateUserDTO): Promise<User> {
    const docRef = await this.collection.add(user)
    const doc = await docRef.get()
    return { id: doc.id, ...doc.data() } as User
  }

  async getUserById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get()
    return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null
  }

  async getAllUsers(): Promise<User[]> {
    const snapshot = await this.collection.get()
    return snapshot.docs.map((doc: { data: () => any; id: any }) => {
      const data = doc.data()
      const user: User = {
        id: doc.id,
        ...data,
      }
      return user
    })
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User | null> {
    const docRef = this.collection.doc(id)
    await docRef.update(user)
    const updatedDoc = await docRef.get()
    return { id: updatedDoc.id, ...updatedDoc.data() } as User
  }

  async deleteUser(id: string): Promise<void> {
    await this.collection.doc(id).delete()
  }
}

export { FirestoreUserRepository }
