import { connect } from "mongoose"
import { MONGO_URI } from "./constants"

export const connectToMongoDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Mongo URI is not provided")
    }
    await connect(MONGO_URI)
    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
