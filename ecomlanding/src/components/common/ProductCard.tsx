//this is /Users/sahibabc/ecomLanding/ecomlanding/src/components/common/ProductCard.tsx
"use client";
import React from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../../lib/store/useCartStore";

export default function ProductCard({ product }: { product: any }) {
  const addToCart = useCartStore(state => state.addToCart);
  const addToWishlist = useCartStore(state => state.addToWishlist);
  const removeFromWishlist = useCartStore(state => state.removeFromWishlist);
  const isWishlisted = useCartStore(state => state.isInWishlist(product.id));

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center gap-2"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 inline" /> Add to Cart
          </button>
          <button
            className={`p-2 border rounded-full ml-2 ${isWishlisted ? 'bg-red-50 border-red-300' : 'border-gray-200'}`}
            onClick={() => (isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product))}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );

}