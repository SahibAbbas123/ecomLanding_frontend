//this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/categories/[category]/page.tsx
"use client";
import React, { useState, useMemo } from "react";
import { categories } from "../../../lib/data/categories";
import { products } from "../../../lib/data/products";
import SearchBar from "../../../components/categories/SearchBar";
import FilterSidebar from "../../../components/categories/FilterSidebar";
import ProductGrid from "../../../components/categories/ProductGrid";


export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find(c => c.id === params.category);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ inStock: false });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.category === params.category);
    if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (filters.inStock) filtered = filtered.filter(p => p.inStock);
    return filtered;
  }, [search, filters, params.category]);

  if (!category) return <div className="py-20 text-center text-gray-500">Category not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-500">{category.description}</p>
      </div>
      <div className="flex gap-8">
        <div className="hidden lg:block w-64 shrink-0">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1 space-y-8">
          <SearchBar value={search} onChange={setSearch} />
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}