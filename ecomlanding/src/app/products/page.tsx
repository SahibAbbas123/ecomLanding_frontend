// this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/products/page.tsx
"use client";
import React, { useState, useMemo } from "react";
import { products } from "../../lib/data/products";
import { categories } from "../../lib/data/categories";
import ProductGrid from "../../components/categories/ProductGrid";
import SearchBar from "../../components/categories/SearchBar";
import Pagination from "../../components/common/Pagination";

function CategoryFilter({ value, onChange }) {
  return (
    <select
      className="border rounded-lg px-3 py-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    let filtered = products;
    if (search)
      filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category)
      filtered = filtered.filter(p => p.category === category);
    if (inStock)
      filtered = filtered.filter(p => p.inStock);
    if (sort === "price-asc")
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "title")
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [search, category, inStock, sort]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(page * perPage, filtered.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex-1 min-w-[180px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} />
          In Stock
        </label>
        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Name: A-Z</option>
        </select>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        Showing {showingFrom}–{showingTo} of {filtered.length} results
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {search && (
          <span className="inline-flex items-center bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
            Search: {search}
            <button className="ml-2" onClick={() => setSearch("")}>×</button>
          </span>
        )}
        {category && (
          <span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {categories.find(c => c.id === category)?.name}
            <button className="ml-2" onClick={() => setCategory("")}>×</button>
          </span>
        )}
        {inStock && (
          <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            In Stock
            <button className="ml-2" onClick={() => setInStock(false)}>×</button>
          </span>
        )}
        {sort && (
          <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            Sorted: {sort === 'price-asc' ? 'Price: Low-High' : sort === 'price-desc' ? 'Price: High-Low' : 'Name: A-Z'}
            <button className="ml-2" onClick={() => setSort("")}>×</button>
          </span>
        )}
        {/* Example for price range pill */}
        {priceRange && (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Price: ${priceRange[0]}–${priceRange[1]}
            <button className="ml-2" onClick={() => setPriceRange(null)}>×</button>
          </span>
        )}
        {(search || category || inStock || sort || priceRange) && (
          <button
            className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200"
            onClick={() => {
              setSearch("");
              setCategory("");
              setInStock(false);
              setSort("");
              setPriceRange(null);
            }}
          >
            Clear All
          </button>
        )}
      </div>
      <ProductGrid products={paginated} />
      <div className="mt-8">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}