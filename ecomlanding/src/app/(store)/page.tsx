// this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/page.tsx
"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Star, ArrowRight, Shield, Truck, Headphones, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import Footer from '../../components/layout/Footer.tsx';


interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  quantity?: number;
}

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Mock data
const categories: Category[] = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', itemCount: 1250, slug: 'electronics' },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', itemCount: 890, slug: 'fashion' },
  { id: '3', name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', itemCount: 650, slug: 'home-garden' },
  { id: '4', name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', itemCount: 420, slug: 'sports' },
  { id: '5', name: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', itemCount: 780, slug: 'books' },
  { id: '6', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop', itemCount: 340, slug: 'beauty' }
];

const featuredProducts: Product[] = [
  { id: '1', title: 'Wireless Headphones Pro', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Electronics', rating: 4.8, inStock: true, quantity: 1 },
  { id: '2', title: 'Premium Leather Jacket', price: 299, originalPrice: 399, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', category: 'Fashion', rating: 4.9, inStock: true, quantity: 1 },
  { id: '3', title: 'Smart Watch Series X', price: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Electronics', rating: 4.7, inStock: true, quantity: 1 },
  { id: '4', title: 'Minimalist Desk Lamp', price: 89, originalPrice: 120, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', category: 'Home & Garden', rating: 4.6, inStock: true, quantity: 1 },
  { id: '5', title: 'Running Shoes Elite', price: 159, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', category: 'Sports', rating: 4.8, inStock: true, quantity: 1 },
  { id: '6', title: 'Organic Skincare Set', price: 79, originalPrice: 99, image: 'https://images.unsplash.com/photo-1556228578-dd6e8dc0164c?w=300&h=300&fit=crop', category: 'Beauty', rating: 4.9, inStock: true, quantity: 1 },
  { id: '7', title: 'Bestseller Novel Collection', price: 45, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop', category: 'Books', rating: 4.5, inStock: true, quantity: 1 },
  { id: '8', title: 'Wireless Charging Pad', price: 49, originalPrice: 69, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop', category: 'Electronics', rating: 4.4, inStock: true, quantity: 1 }
];
const scrollToCategories = () => {
  const section = document.getElementById("categories");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent block">
                  Perfect Style
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Explore our curated collection of premium products. From the latest tech gadgets to timeless fashion pieces, find everything you love in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={scrollToCategories} className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                                
                <Link href="/products">
               <button className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
                  All Products
                </button>
              </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                  alt="Shopping Experience"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Online</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">10k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Category Card Component
const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <Link href={`/categories/${category.slug}`} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 block">
      
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-gray-200">{category.itemCount} items</p>
      </div>
      </Link>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
              } transition-colors duration-200`}
          />
        </button>
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            SALE
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Trust Indicators Component
const TrustIndicators = () => {
  const indicators = [
    { icon: Shield, title: 'Secure Shopping', description: '100% Protected' },
    { icon: Truck, title: 'Free Shipping', description: 'Orders over $50' },
    { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
    { icon: RefreshCw, title: 'Easy Returns', description: '30-day policy' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <indicator.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{indicator.title}</h3>
              <p className="text-gray-600">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Homepage Component
const Homepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile menu when screen size changes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />

        {/* Categories Section */}
        <section id = 'categories' className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our wide range of categories, each carefully curated to bring you the best products
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>
        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked favorites that our customers love most
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/products">
                <button className="inline-flex items-center px-8 py-3 border border-teal-600 text-base font-medium rounded-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200">
                  View All Products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <TrustIndicators />
      </main>

      {/* Footer */}
      <Footer categories={categories} />
    </div>
  );
};

export default Homepage;