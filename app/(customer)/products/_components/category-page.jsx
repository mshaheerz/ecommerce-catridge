'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'
import CategorySidebar from './category-sidebar'
import ProductGrid from './product-grid'
import SortDropdown from './sort-dropdown'


export default function CategoryPage() {
  const [selectedSort, setSelectedSort] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)

  return (
    <div className="min-h-screen ">
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Browse Products
          </motion.h1>
        </div>
        
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="mb-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetTitle className="hidden">Filters</SheetTitle>
                <CategorySidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CategorySidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 24 results</p>
              <SortDropdown selected={selectedSort} onSelect={setSelectedSort} />
            </div>
            <ProductGrid
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              minRating={minRating}
              sortOption={selectedSort}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

