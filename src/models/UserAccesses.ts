import { UserAccesses } from "@interfaces/types"
import { Schema, model, Document } from "mongoose"

const UserAccessesSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    tenantId: { type: String },
    createdAt: { type: Date, default: Date.now },
    ip: { type: String },
    userAgent: { type: String },
    location: { type: String },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
  },
  { versionKey: false }
)

interface UserAccessesDocument extends Document, UserAccesses {}

export default model<UserAccessesDocument>("userAccesses", UserAccessesSchema)
