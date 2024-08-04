import { Client } from "@interfaces/types"
import { Schema, model, Document, Types, PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const ClientSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
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
  role: { type: String, default: "client" },
  tenantId: {
    type: String,
    ref: "Tenant",
  },
  proccessStatus: { type: String, enum: ["pending", "approved", "rejected"] },
  planId: { type: Types.ObjectId, ref: "Plan" },
  address: { type: String },
  phone: { type: String },
  maritalStatus: { type: String },
  children: { type: Number },
  occupation: { type: String },
})

ClientSchema.plugin(mongoosePaginate)

interface ClientDocument extends Document, Client {}

export default model<ClientDocument, PaginateModel<ClientDocument>>(
  "Client",
  ClientSchema
)