'use client'

import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { CategoryFilter, PriceRange } from './category-page'
import { SheetTitle } from '@/components/ui/sheet'



const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'printers', label: 'Printers' },
  { value: 'scanners', label: 'Scanners' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'ink', label: 'Ink & Toner' },
] 

export default function CategorySidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
}) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <RadioGroup value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.value} />
                <Label htmlFor={category.value} className="cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <div className="space-y-4">
          <Slider
            min={0}
            max={1000}
            step={10}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange(value)}
          />
           
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex w-full items-center space-x-2 rounded-md p-2 hover:bg-gray-100 ${
                minRating === rating ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">{`${rating} & up`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

