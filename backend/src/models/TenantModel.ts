import { Tenant } from "@interfaces/types"
import { Schema, model } from "mongoose"

const TenantSchema = new Schema<Tenant>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
  accessToken: { type: String },
  refreshToken: { type: String },
  status: { type: String, default: "active" },
  role: { type: String, default: "tenant" },
  tenantId: {
    type: String,
    required: true,
  },
  phone: { type: String },
})

export default model<Tenant>("Tenant", TenantSchema)
