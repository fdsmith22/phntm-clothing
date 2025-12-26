"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import TabNavigation from "@/components/TabNavigation";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const products = [
  { id: 1, name: "Shadow Hoodie", category: "hoodies", price: 89.99 },
  { id: 2, name: "Phantom Tee", category: "tees", price: 45.99 },
  { id: 3, name: "Noir Jacket", category: "jackets", price: 149.99 },
  { id: 4, name: "Ghost Hoodie", category: "hoodies", price: 95.99 },
  { id: 5, name: "Void Tee", category: "tees", price: 39.99 },
  { id: 6, name: "Eclipse Jacket", category: "jackets", price: 179.99 },
  { id: 7, name: "Specter Hoodie", category: "hoodies", price: 99.99 },
  { id: 8, name: "Shade Tee", category: "tees", price: 42.99 },
  { id: 9, name: "Obsidian Jacket", category: "jackets", price: 189.99 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeTab === "all" || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <ProductGrid products={filteredProducts} />
      </section>

      <Footer />
    </main>
  );
}
