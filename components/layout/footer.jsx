import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <p className="text-sm">
              Leading provider of printer solutions with over a decade of experience in the industry.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">Shop</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">About</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">Printers</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">Scanners</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">Ink & Toner</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">Accessories</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@example.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>123 Printer Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Cartridge Point. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

