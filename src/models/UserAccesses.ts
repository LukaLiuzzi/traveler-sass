import { UserAccesses } from "@interfaces/types"
import { Schema, model, Document } from "mongoose"

const UserAccessesSchema = new Schema(
  {
    tenantId: { type: String, ref: "tenants", default: null },
    clientId: { type: Schema.Types.ObjectId, ref: "clients", default: null },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "employees",
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
    ip: { type: String, default: null },
    userAgent: { type: String, default: null },
    location: { type: String, default: null },
    device: { type: String, default: null },
    browser: { type: String, default: null },
    os: { type: String, default: null },
  },
  { versionKey: false }
)

interface UserAccessesDocument extends Document, UserAccesses {}

export default model<UserAccessesDocument>("userAccesses", UserAccessesSchema)
