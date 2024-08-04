import { connect } from "mongoose"
import { MONGO_URI } from "./constants"

export const connectToMongoDB = async () => {
  try {
    await connect(MONGO_URI)
    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
