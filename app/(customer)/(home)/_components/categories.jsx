'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Printer, ScanIcon as Scanner, Palette, Cpu } from 'lucide-react'

const categories = [
  {
    icon: Printer,
    title: 'Printers',
    description: 'High-quality printers for every need'
  },
  {
    icon: Scanner,
    title: 'Scanners',
    description: 'Professional scanning solutions'
  },
  {
    icon: Palette,
    title: 'Ink & Toner',
    description: 'Original and compatible cartridges'
  },
  {
    icon: Cpu,
    title: 'Parts',
    description: 'Genuine printer parts and accessories'
  }
]

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Categories
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Explore our wide range of printing solutions and accessories
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <category.icon className="h-12 w-12 text-blue-600" />
                    <h3 className="font-bold text-xl">{category.title}</h3>
                    <p className="text-gray-500">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

