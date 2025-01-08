'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useCart } from '@/contexts/cart-context'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ModeToggle } from '../theme/mode-toggle'
import { useTheme } from '../theme/theme-provider'


export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { cart } = useCart()
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href
    return (
      <Link 
        href={href} 
        className={`block py-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}
      >
        {children}
      </Link>
    )
  }

  const NavLinks = () => (
    <>
      <ModeToggle />
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
    </>
  )
  const { theme } = useTheme();
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <Image alt='Cartridge Point' src={theme === 'light' ? '/images/full_logo_transparent.svg' : '/images/logo-dark.svg'} height={160} width={160} />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
          
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 px-2 py-1 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session?.user?.role === 'admin' ? (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/login">Admin Login</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Link href="/cart" className="mr-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 px-2 py-1 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-base">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Menu</SheetTitle> 
              <nav className="flex flex-col gap-4">
                <NavLinks />
                {session?.user?.role === 'admin' ? (
                  <NavLink href="/admin">Admin Dashboard</NavLink>
                ) : (
                  <NavLink href="/admin/login">Admin Login</NavLink>
                )}
                <NavLink href="/orders">My Orders</NavLink>
                <NavLink href="/profile">Profile</NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

