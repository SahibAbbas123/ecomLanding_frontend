//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/categories/FilterSidebar.tsx
"use client";
import React from "react";
export default function FilterSidebar({ filters, setFilters }: { filters: any, setFilters: any }) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Availability</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={filters.inStock} onChange={e => setFilters((f: any) => ({ ...f, inStock: e.target.checked }))} />
          In Stock Only
        </label>
      </div>
      {/* Extend with price/rating filters as you wish */}
    </aside>
  );
}