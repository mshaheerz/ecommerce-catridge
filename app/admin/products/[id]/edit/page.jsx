import { notFound } from "next/navigation"
import ProductForm from "../../create/_components/add-product-form"




export default function EditProductPage({ params }) {
  if (!params.id) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm productId={params.id} />
    </div>
  )
}

