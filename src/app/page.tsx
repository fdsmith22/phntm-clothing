"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import TabNavigation from "@/components/TabNavigation";
import ProductSort, { SortOption } from "@/components/ProductSort";
import Footer from "@/components/Footer";

const products = [
  { id: 1, name: "Shadow Hoodie", category: "hoodies", price: 89.99, stock: 15, compareAtPrice: undefined },
  { id: 2, name: "Phantom Tee", category: "tees", price: 45.99, stock: 8, compareAtPrice: 59.99 },
  { id: 3, name: "Noir Jacket", category: "jackets", price: 149.99, stock: 3, compareAtPrice: undefined },
  { id: 4, name: "Ghost Hoodie", category: "hoodies", price: 95.99, stock: 0, compareAtPrice: undefined },
  { id: 5, name: "Void Tee", category: "tees", price: 39.99, stock: 25, compareAtPrice: undefined },
  { id: 6, name: "Eclipse Jacket", category: "jackets", price: 179.99, stock: 12, compareAtPrice: 219.99 },
  { id: 7, name: "Specter Hoodie", category: "hoodies", price: 99.99, stock: 6, compareAtPrice: undefined },
  { id: 8, name: "Shade Tee", category: "tees", price: 42.99, stock: 18, compareAtPrice: undefined },
  { id: 9, name: "Obsidian Jacket", category: "jackets", price: 189.99, stock: 2, compareAtPrice: 249.99 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      return activeTab === "all" || product.category === activeTab;
    });

    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [activeTab, sortBy]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>
        <ProductGrid products={filteredAndSortedProducts} />
      </section>

      <Footer />
    </main>
  );
}
