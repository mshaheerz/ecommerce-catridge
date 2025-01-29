"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Pencil } from "lucide-react";

export default function ProductViewPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("An error occurred while fetching the product");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => router.push(`/admin/products/${product._id}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-medium">SKU:</dt>
                <dd>{product.sku}</dd>
                <dt className="font-medium">Category:</dt>
                <dd>{product.category}</dd>
                <dt className="font-medium">Base Price:</dt>
                <dd>${product.basePrice.toFixed(2)}</dd>
                <dt className="font-medium">Discount Price:</dt>
                <dd>${product.discountPrice.toFixed(2)}</dd>
                <dt className="font-medium">Stock:</dt>
                <dd>{product.stock}</dd>
                <dt className="font-medium">Status:</dt>
                <dd>
                  <Badge variant={product.status ? "success" : "destructive"}>
                    {product.status ? "Active" : "Inactive"}
                  </Badge>
                </dd>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{product.description}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
