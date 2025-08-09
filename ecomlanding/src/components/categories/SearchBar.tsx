//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/categories/SearchBar.tsx
"use client";
import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search products…"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
      />
    </div>
  );
}