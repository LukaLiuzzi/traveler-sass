import { Payment } from "@interfaces/types"
import { Schema, model, Document, PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  tenantId: {
    type: String,
    ref: "Tenant",
    required: true,
  },
  planId: {
    type: String,
    ref: "Plan",
    required: true,
  },
  isTotalPayment: {
    type: Boolean,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "paid", "canceled", "refunded", "partiallyPaid"],
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

PaymentSchema.plugin(mongoosePaginate)

interface PaymentDocument extends Document, Payment {}

export default model<PaymentDocument, PaginateModel<PaymentDocument>>(
  "Payment",
  PaymentSchema
)
