import { Employee } from "@interfaces/types"
import { Schema, model, Document, PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const EmployeeSchema = new Schema({
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
  role: { type: String },
  tenantId: {
    type: String,
    ref: "Tenant",
  },
  phone: { type: String },
})

EmployeeSchema.plugin(mongoosePaginate)

interface EmployeeDocument extends Document, Employee {}

export default model<EmployeeDocument, PaginateModel<EmployeeDocument>>(
  "Employee",
  EmployeeSchema
)
