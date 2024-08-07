import { CompleteUser } from "@interfaces/types"
import { Schema, model, Document, Types, PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
  accessToken: { type: String },
  refreshToken: { type: String },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive", "deleted"],
  },
  role: {
    type: String,
    enum: [
      "admin",
      "support",
      "sales",
      "finance",
      "client",
      "tenant",
      "superAdmin",
    ],
    default: "client",
  },
  tenantId: {
    type: String,
  },
  proccessStatus: { type: String, enum: ["pending", "approved", "rejected"] },
  planId: { type: Types.ObjectId, ref: "Plan" },
  address: { type: String },
  phone: { type: String },
  maritalStatus: { type: String },
  children: { type: Number },
  occupation: { type: String },
})

UserSchema.plugin(mongoosePaginate)

interface CompleteUserDocument extends Document, CompleteUser {
  email: string
  password: string
  name: string
  lastName: string
  createdAt: Date
  updatedAt: Date
  deletedAt: boolean
  accessToken: string
  refreshToken: string
  status: "active" | "inactive" | "deleted"
  role:
    | "admin"
    | "support"
    | "sales"
    | "finance"
    | "client"
    | "tenant"
    | "superAdmin"
  tenantId: string
  phone: string
  proccessStatus: string
  planId: string
  address: string
  maritalStatus: string
  children: number
  occupation: string
}

export default model<CompleteUserDocument, PaginateModel<CompleteUserDocument>>(
  "User",
  UserSchema
)
