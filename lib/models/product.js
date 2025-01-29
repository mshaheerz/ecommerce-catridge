import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  tags: { type: [String], default: [] },
  images: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

