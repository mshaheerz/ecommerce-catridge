import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
})

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

