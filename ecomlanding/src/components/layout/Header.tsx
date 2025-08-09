"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCartStore } from "../../lib/store/useCartStore";
import { useAuthStore } from "../../lib/store/useAuthStore";
import AuthModal from "../auth/AuthModal";
import { toast } from "sonner";
import UserAvatar from "../common/UserAvatar";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

const mockProducts = [
    { id: '1', title: 'Wireless Headphones Pro', price: 199, image: '/headphones.jpg', category: 'Electronics' },
    { id: '2', title: 'Premium Leather Jacket', price: 299, image: '/jacket.jpg', category: 'Fashion' },
    { id: '3', title: 'Smart Watch Series X', price: 399, image: '/watch.jpg', category: 'Electronics' },
    { id: '4', title: 'Minimalist Desk Lamp', price: 89, image: '/lamp.jpg', category: 'Home & Garden' },
];

interface HeaderProps {
    showSearch?: boolean;
    showCategories?: boolean;
    showIcons?: boolean;
    onMenuToggle?: () => void;
    isMenuOpen?: boolean;
    categories?: Category[];
}

export default function Header({
    showSearch = true,
    showCategories = true,
    showIcons = true,
    onMenuToggle,
    isMenuOpen = false,
    categories = [],
}: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const cartCount = useCartStore(state => state.cart.reduce((acc, item) => acc + item.quantity, 0));
    const wishlistCount = useCartStore(state => state.wishlist.length);
    const { user, logout, setAvatar, removeAvatar } = useAuthStore();
    const [authOpen, setAuthOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8" ref={searchRef}>
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const query = e.target.value;
                                        setSearchQuery(query);
                                        if (query.length > 0) {
                                            const filtered = mockProducts.filter(
                                                product => 
                                                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                                                    product.category.toLowerCase().includes(query.toLowerCase())
                                            );
                                            setSearchResults(filtered);
                                            setShowResults(true);
                                        } else {
                                            setSearchResults([]);
                                            setShowResults(false);
                                        }
                                    }}
                                    onFocus={() => {
                                        if (searchQuery.length > 0) {
                                            setShowResults(true);
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                                        {searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() => {
                                                    setShowResults(false);
                                                    setSearchQuery("");
                                                }}
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{product.title}</h4>
                                                    <p className="text-sm text-gray-500">{product.category}</p>
                                                </div>
                                                <span className="text-teal-600 font-medium">${product.price}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Icons */}
                    {showIcons && (
                        <div className="flex items-center space-x-4">
                            <Link href="/wishlist" className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 relative">
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link href="/cart" className="p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200 relative">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {/* User Icon / Avatar & Account Menu */}
                            <div className="relative">
                                <button
                                    className="p-2 text-gray-700 hover:text-teal-600"
                                    onClick={() => user ? setUserMenu(v => !v) : setAuthOpen(true)}
                                    aria-label={user ? "Account menu" : "Login or Signup"}
                                >
                                    <UserAvatar user={user} size={27} />
                                </button>
                                <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
                                {user && userMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg p-2 z-50">
                                        <div className="px-3 py-2 font-semibold text-gray-800 truncate flex items-center gap-2">
                                            <UserAvatar user={user} size={28} />
                                            {user.email}
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="w-full block text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                            onClick={() => setUserMenu(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Change Profile Photo
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (ev) => {
                                                        if (ev.target?.result) setAvatar(ev.target.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        {user.avatarUrl && (
                                            <button
                                                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                                onClick={removeAvatar}
                                            >
                                                Remove Profile Photo
                                            </button>
                                        )}
                                        <button
                                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                            onClick={() => { logout(); setUserMenu(false); toast("Signed out!", { icon: "👋" }); }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
            {/* Mobile Menu*/}
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
