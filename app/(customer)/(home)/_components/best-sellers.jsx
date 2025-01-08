'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const products = [
  {
    name: 'Canon PIXMA Pro-200',
    price: '$599.99',
    image: '/placeholder.svg',
    description: 'Professional photo printer'
  },
  {
    name: 'HP OfficeJet Pro 9025e',
    price: '$329.99',
    image: '/placeholder.svg',
    description: 'All-in-one wireless printer'
  },
  {
    name: 'Epson EcoTank ET-4760',
    price: '$499.99',
    image: '/placeholder.svg',
    description: 'Cartridge-free printing'
  }
]

export default function BestSellers() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Bestselling Products
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Our most popular printers and accessories loved by customers
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative h-[200px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="font-bold text-xl">{product.name}</h3>
                      <p className="text-gray-500">{product.description}</p>
                      <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

