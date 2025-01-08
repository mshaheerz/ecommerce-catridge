'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


// Dummy product data
const products = [
  {
    id: 1,
    name: 'HP LaserJet Pro M404n',
    price: 299.99,
    rating: 4.5,
    image: '/placeholder.svg',
    category: 'printers'
  },
  {
    id: 2,
    name: 'Canon PIXMA TR8620',
    price: 199.99,
    rating: 4.2,
    image: '/placeholder.svg',
    category: 'printers'
  },
  {
    id: 3,
    name: 'Epson WorkForce ES-400',
    price: 329.99,
    rating: 4.7,
    image: '/placeholder.svg',
    category: 'scanners'
  },
  {
    id: 4,
    name: 'HP 67XL Ink Cartridge',
    price: 49.99,
    rating: 4.4,
    image: '/placeholder.svg',
    category: 'ink'
  },
  // Add more products as needed
].map(product => ({
  ...product,
  rating: Math.round(product.rating)
}))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export default function ProductGrid({
  selectedCategory,
  priceRange,
  minRating,
  sortOption
}) {
  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesRating = product.rating >= minRating

    return matchesCategory && matchesPrice && matchesRating
  })

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <Link href={`/products/${product.id}`} className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="relative h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

