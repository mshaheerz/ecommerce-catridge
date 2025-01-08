import { connectToDatabase } from '@/lib/mongodb'
import { Product } from '@/lib/models/product'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const products = await Product.find({})
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!request.body) {
      throw new Error('Request body is empty');
    }
    console.log(request.body)
    const json = await request.json()
    console.log(json)
    await connectToDatabase()
    const product = await Product.create(json)
    return NextResponse.json(product)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

