import { Client } from "@interfaces/types"
import { Schema, model, Document } from "mongoose"

const ClientSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  updatedAt: { type: Date, default: Date.now },
  accessToken: { type: String },
  refreshToken: { type: String },
  status: { type: String },
  role: { type: String, default: "client" },
  tenantId: {
    type: String,
    ref: "Tenant",
  },
  proccessStatus: { type: String },
  planId: { type: String },
  address: { type: String },
  phone: { type: String },
  maritalStatus: { type: String },
  children: { type: Number },
  occupation: { type: String },
})

interface ClientDocument extends Document, Client {}

export default model<ClientDocument>("Client", ClientSchema)
