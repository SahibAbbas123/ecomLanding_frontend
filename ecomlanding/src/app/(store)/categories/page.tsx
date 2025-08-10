//this /Users/sahibabc/ecomLanding/ecomlanding/src/app/categories/page.tsx
"use client";
import { categories } from "../../../lib/data/categories";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.id}`} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
              {/* <p className="text-sm text-gray-200">{cat.itemCount} items</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}