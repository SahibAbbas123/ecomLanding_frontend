//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/categories/ProductGrid.tsx
"use client";
import React from "react";
import ProductCard from "../common/ProductCard";
export default function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) return <div className="text-gray-500 py-12 text-center">No products found.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}