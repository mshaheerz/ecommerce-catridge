"use client"
import { ProductGrid } from "@/components/products/product-grid";
import { services } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Hero from "./_components/hero";
import Categories from "./_components/categories";
import BestSellers from "./_components/best-sellers";
import NewArrivals from "./_components/new-arrivals";
import Testimonials from "./_components/testimonials";
import WhatsAppButton from "./_components/whatsapp-button";

export default function Home() {

 

  const { data: products, isLoading, error } = useQuery({
    queryKey: [services.products.get.key],
    queryFn: async () => {
      const response = await services.products.get.call();
      return response.data;
    },
  })

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error loading products: {(error).message}</div>

  return (
    <main className="min-h-screen">
    <Hero />
    <Categories />
    <BestSellers />
    <NewArrivals />
    <Testimonials />
  </main>
  );
}
