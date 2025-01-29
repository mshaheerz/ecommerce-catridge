"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"


export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const productsPerPage = 10

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError("An error occurred while fetching products")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update product status")
      }

      setProducts(products.map((product) => (product._id === id ? { ...product, status: newStatus } : product)))
    } catch (err) {
      console.error(err)
      // You might want to show an error message to the user here
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete product")
        }

        setProducts(products.filter((product) => product._id !== id))
      } catch (err) {
        console.error(err)
        // You might want to show an error message to the user here
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/create">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Switch
                  checked={product.status}
                  onCheckedChange={(checked) => handleStatusChange(product._id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/products/${product._id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/products/${product._id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center space-x-2">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

