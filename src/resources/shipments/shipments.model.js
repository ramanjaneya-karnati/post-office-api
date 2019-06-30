import mongoose from 'mongoose'

const shipmentsSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    type: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    postoffice: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    weight: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
)

export const Shipments = mongoose.model('shipments', shipmentsSchema)
