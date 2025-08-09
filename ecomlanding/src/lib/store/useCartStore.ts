//this is /Users/sahibabc/ecomLanding/ecomlanding/src/lib/store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  // extend as needed
};

type CartItem = Product & { quantity: number };

type Store = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (product, qty = 1) => set(state => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            ),
            wishlist: state.wishlist
          };
        }
        return { cart: [...state.cart, { ...product, quantity: qty }], wishlist: state.wishlist };
      }),
      removeFromCart: (id) => set(state => ({
        cart: state.cart.filter(item => item.id !== id),
        wishlist: state.wishlist
      })),
      updateQty: (id, qty) => set(state => ({
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity: qty } : item
        ),
        wishlist: state.wishlist
      })),
      clearCart: () => set(state => ({ cart: [], wishlist: state.wishlist })),
      addToWishlist: (product) => set(state => {
        if (state.wishlist.some(item => item.id === product.id)) return state;
        return { wishlist: [...state.wishlist, product], cart: state.cart };
      }),
      removeFromWishlist: (id) => set(state => ({
        wishlist: state.wishlist.filter(item => item.id !== id),
        cart: state.cart
      })),
      isInWishlist: (id) => !!get().wishlist.find(item => item.id === id),
    }),
    { name: "cart-wishlist-store" }
  )
);
