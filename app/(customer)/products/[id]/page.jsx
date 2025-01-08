import ProductDetail from "./_components/product-detail";


export default function ProductPage({ params }) {
  return <ProductDetail id={params.id} />
}

