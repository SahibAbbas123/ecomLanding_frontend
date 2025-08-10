// /Users/sahibabc/ecomLanding/ecomlanding/src/app/checkout/Header.tsx 
"use client";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";

type HeaderProps = {
  showSearch?: boolean;
  showCategories?: boolean;
  showIcons?: boolean;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  searchQuery?: string;
  setSearchQuery?: (v: string) => void;
  categories?: Array<{ id: string; name: string; slug: string }>;
};

export default function Header({
  showSearch = true,
  showCategories = true,
  showIcons = true,
  onMenuToggle,
  isMenuOpen = false,
  searchQuery = "",
  setSearchQuery = () => {},
  categories = [],
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                ShopFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {showCategories && categories.length > 0 && (
            <nav className="hidden md:flex items-center space-x-8">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium"
                >
                  {category.name}
                </Link>
              ))}
              <span className="text-gray-700 opacity-70 font-medium">More</span>
            </nav>
          )}

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Action Icons */}
          {showIcons && (
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              {/* Hamburger for mobile */}
              <button
                className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
                onClick={onMenuToggle}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu (same as before, just pass props) */}
      {isMenuOpen && showCategories && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
          {showSearch && (
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}