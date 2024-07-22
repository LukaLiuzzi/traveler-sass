import { SuperAdmin } from "@interfaces/types"
import { Schema, model } from "mongoose"

const UserSchema = new Schema<SuperAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  role: { type: String, default: "superAdmin" },
})

export default model<SuperAdmin>("SuperAdmin", UserSchema)
