'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="flex items-center hover:text-blue-600">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          const title = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <li key={href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              {isLast ? (
                <span aria-current="page" className="font-medium text-gray-900">
                  {title}
                </span>
              ) : (
                <Link href={href} className="hover:text-blue-600">
                  {title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

