"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import CategoryPage from "./_components/category-page";
import Breadcrumb from "@/components/breadcrumbs";

const CATEGORIES = ["All", "Ink Cartridges", "Toner", "Paper", "Accessories"];

// Dummy products data
const DUMMY_PRODUCTS = [
  {
    _id: "1",
    name: "HP Ink Cartridge",
    description: "Original HP ink cartridge for reliable printing",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ink Cartridges",
  },
  {
    _id: "2",
    name: "Canon Printer Paper",
    description: "High-quality A4 printer paper",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Paper",
  },
  {
    _id: "3",
    name: "Epson Toner",
    description: "Original Epson toner cartridge",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Toner",
  },
  {
    _id: "4",
    name: "Printer Cleaning Kit",
    description: "Complete printer cleaning and maintenance kit",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? DUMMY_PRODUCTS
      : DUMMY_PRODUCTS.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div> */}
      <Breadcrumb />
      <CategoryPage />
    </div>
  );
}
