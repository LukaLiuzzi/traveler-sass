import { Plan } from "@interfaces/types"
import { Schema, model, Document } from "mongoose"

const PlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  tenantId: {
    type: String,
    ref: "Tenant",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "deleted"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

interface PlanDocument extends Document, Plan {}

export default model<PlanDocument>("Client", PlanSchema)
