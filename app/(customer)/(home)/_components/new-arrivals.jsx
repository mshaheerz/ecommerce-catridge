'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const newProducts = [
  {
    name: 'Brother MFC-L3770CDW',
    price: '$399.99',
    image: '/placeholder.svg',
    tag: 'New'
  },
  {
    name: 'Epson WorkForce Pro WF-4830',
    price: '$199.99',
    image: '/placeholder.svg',
    tag: 'New'
  },
  {
    name: 'Canon MAXIFY GX7021',
    price: '$799.99',
    image: '/placeholder.svg',
    tag: 'New'
  },
  {
    name: 'HP Smart Tank 7602',
    price: '$449.99',
    image: '/placeholder.svg',
    tag: 'New'
  }
]

export default function NewArrivals() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              New Arrivals
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Check out our latest printer models and accessories
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-[200px]">
                      <Badge className="absolute top-2 right-2 bg-blue-600">
                        {product.tag}
                      </Badge>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-xl font-bold text-blue-600">{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

