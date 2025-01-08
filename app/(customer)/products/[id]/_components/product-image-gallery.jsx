'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useZoom } from '@/hooks/use-zoom'



export default function ProductImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const { zoomRef, zoomStyles } = useZoom()

  return (
    <div className="space-y-4">
      <div 
        ref={zoomRef}
        className="relative h-[400px] overflow-hidden rounded-lg"
      >
        <Image
          src={'/images/hero.png'}
          alt="Product image"
          fill
          className="object-cover"
          style={zoomStyles}
        />
      </div>
      <div className="flex justify-center space-x-4 overflow-x-auto pb-2 ">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
              selectedImage === image ? 'ring-2 ring-blue-600' : ''
            }`}
          >
            <Image
              src={'/images/hero.png'}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

