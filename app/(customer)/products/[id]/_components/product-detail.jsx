"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, CreditCard } from "lucide-react";
import ProductImageGallery from "./product-image-gallery";
import ProductDescription from "./product-description";
import DeliveryInfo from "./delivery-info";
import { useCart } from "@/contexts/cart-context";

import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Breadcrumb from "@/components/breadcrumbs";

// Dummy product data
const product = {
  id: "1",
  name: "HP LaserJet Pro M404n",
  price: 299.99,
  description:
    "High-performance monochrome laser printer for professional-quality documents.",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  fullDescription: `
    The HP LaserJet Pro M404n is a high-performance monochrome laser printer designed for small to medium-sized businesses. It offers fast printing speeds of up to 40 pages per minute, making it ideal for busy office environments.

    Key Features:
    - Print speed: Up to 40 ppm (pages per minute)
    - First page out: As fast as 6.1 seconds
    - Resolution: Up to 4800 x 600 dpi
    - Monthly duty cycle: Up to 80,000 pages
    - Connectivity: 1 Hi-Speed USB 2.0; 1 Host USB at rear side; Gigabit Ethernet 10/100/1000BASE-T network
    - Compatible operating systems: Windows, macOS, Linux

    This printer is designed to handle a variety of paper types and sizes, including letter, legal, executive, envelopes, and more. It also features automatic two-sided printing to help save paper.

    The M404n model comes with built-in Ethernet connectivity, allowing you to easily share the printer across your office network. It's also compatible with HP's mobile printing solutions, enabling you to print from your smartphone or tablet.

    With its robust design and reliable performance, the HP LaserJet Pro M404n is an excellent choice for businesses looking for a dependable, high-quality monochrome laser printer.
  `,
  deliveryInfo: `
    Shipping:
    - Free standard shipping on orders over $50
    - Expedited shipping available for an additional fee
    - Typical delivery time: 3-5 business days

    Returns:
    - 30-day return policy for unopened items
    - Defective items can be returned within 90 days for a full refund or replacement
    - Customer is responsible for return shipping costs unless the item is defective

    Warranty:
    - 1-year limited hardware warranty
    - Extended warranty options available for purchase
  `,
};

export default function ProductDetail({ id }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <ProductImageGallery images={product.images} />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button className="flex-1" variant="secondary" asChild>
              <Link href="/cart">
                <CreditCard className="mr-2 h-5 w-5" />
                Buy Now
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="delivery">Delivery & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProductDescription description={product.fullDescription} />
        </TabsContent>
        <TabsContent value="delivery">
          <DeliveryInfo info={product.deliveryInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
