import { Schema, model } from "mongoose"
import { User } from "@interfaces/user"

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  last_name: { type: String },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  updated_at: { type: Date, default: Date.now },
  access_token: { type: String },
  refresh_token: { type: String },
  status: { type: String },
  role: { type: String, default: "client" },
  tenant_id: { type: String },
  proccess_status: { type: String },
  plan_id: { type: String },
  address: { type: String },
  phone: { type: String },
  marital_status: { type: String },
  children: { type: Number },
  occupation: { type: String },
})

export default model<User>("User", UserSchema)
