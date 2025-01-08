'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.map((product) => (
        <Card key={product._id}>
          <CardContent className="p-4">
            <img
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full aspect-square"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => {/* Add to cart logic */}}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

