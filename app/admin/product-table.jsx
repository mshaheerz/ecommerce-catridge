'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import { services } from '@/services'

// Dummy data for demonstration
const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'HP Ink Cartridge',
    price: 29.99,
    category: 'Ink Cartridges',
    stock: 50,
  },
  {
    id: '2',
    name: 'Canon Printer Paper',
    price: 19.99,
    category: 'Paper',
    stock: 100,
  },
  {
    id: '3',
    name: 'Epson Toner',
    price: 79.99,
    category: 'Toner',
    stock: 25,
  },
]

export function ProductTable() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: [services.products.get.key],
    queryFn: async () => {
      const response = await services.products.get.call();
      return response.data;
    },
  })

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error loading products: {(error).message}</div>


  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product,index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

