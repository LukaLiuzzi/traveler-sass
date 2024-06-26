import {
  initializeApp,
  applicationDefault,
  cert,
  ServiceAccount,
} from "firebase-admin/app"
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore"
import serviceAccount from "../../firebaseConfig.json"

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
})

const db = getFirestore()

export { db }
