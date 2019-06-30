import mongoose from 'mongoose'

const postOfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    zipcode: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
)

postOfficeSchema.index({ zipcode: 1 }, { unique: true })

export const PostOffice = mongoose.model('postoffice', postOfficeSchema)
