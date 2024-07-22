import { SuperAdmin } from "@interfaces/types"
import { Schema, model, Document } from "mongoose"

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  role: { type: String, default: "superAdmin" },
})

interface SuperAdminDocument extends SuperAdmin, Document {}

export default model<SuperAdminDocument>("SuperAdmin", UserSchema)
