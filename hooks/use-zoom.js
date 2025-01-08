'use client'

import { useState, useRef, useCallback } from 'react'

export function useZoom(zoomFactor = 2) {
  const zoomRef = useRef(null)
  const [zoomStyles, setZoomStyles] = useState({})

  const handleMouseMove = useCallback(
    (e) => {
      if (zoomRef.current) {
        const { left, top, width, height } = zoomRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomStyles({
          transform: `scale(${zoomFactor})`,
          transformOrigin: `${x * 100}% ${y * 100}%`,
        })
      }
    },
    [zoomFactor]
  )

  const handleMouseLeave = useCallback(() => {
    setZoomStyles({})
  }, [])

  return {
    zoomRef,
    zoomStyles,
    handleMouseMove,
    handleMouseLeave,
  }
}

