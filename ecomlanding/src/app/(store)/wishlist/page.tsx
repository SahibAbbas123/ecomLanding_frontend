// this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/wishlist/page.tsx
"use client";
import { useCartStore } from "../../../lib/store/useCartStore";
// import { categories } from "../../lib/data/categories";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlist, addToCart, removeFromWishlist } = useCartStore();

    if (wishlist.length === 0)
        return (
            <div className="max-w-2xl mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
                <Link href="/products" className="text-teal-600 hover:underline">Browse products</Link>
            </div>
            
        );

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
            <ul className="divide-y border rounded-lg bg-white shadow">
                {wishlist.map(item => (
                    <li key={item.id} className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
                            <div>
                                <h2 className="font-semibold">{item.title}</h2>
                                <p>${item.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700 transition"
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => removeFromWishlist(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
