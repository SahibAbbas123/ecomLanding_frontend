//this is /Users/sahibabc/ecomLanding/ecomlanding/src/lib/store/useAuthStore.ts
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}
interface User {
  email: string;
  name?: string;
  avatarUrl?: string; // profile photo as base64 or remote URL
  password?: string; // demo only!
  addresses?: Address[];
  role?: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name?: string) => boolean;
  logout: () => void;
  setAvatar: (dataUrl: string) => void;
  removeAvatar: () => void;
  addAddress: (a: Omit<Address, "id">) => void;
  editAddress: (id: string, a: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;
  changePassword: (current: string, next: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      register: (email, password, name) => {
        if (email && password) {
          // Demo: make admin@example.com an admin user
          const role = email === 'admin@example.com' ? 'admin' : 'user';
          set({ user: { email, name, password, role } });
          return true;
        }
        return false;
      },
      login: (email, password) => {
        const user = get().user;
        if (user && email === user.email && password === user.password) {
          return true;
        }
        return false;
      },
      changePassword: (current: string, next: string) => {
        const user = get().user;
        if (user && user.password === current) {
          set({ user: { ...user, password: next } });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null }),
      setAvatar: (avatarUrl) =>
        set((state) => ({
          user: state.user ? { ...state.user, avatarUrl } : null,
        })),
      removeAvatar: () =>
        set((state) => ({
          user: state.user ? { ...state.user, avatarUrl: undefined } : null,
        })),
      addAddress: (a) => set(state => ({
        user: state.user
          ? { ...state.user, addresses: [...(state.user.addresses || []), { ...a, id: crypto.randomUUID() }] }
          : null
      })),
      editAddress: (id, a) => set(state => ({
        user: state.user
          ? {
            ...state.user,
            addresses: (state.user.addresses || []).map(addr => addr.id === id ? { ...a, id } : addr)
          }
          : null
      })),
      deleteAddress: (id) => set(state => ({
        user: state.user
          ? {
            ...state.user,
            addresses: (state.user.addresses || []).filter(addr => addr.id !== id)
          }
          : null
      })),
    }),
    { name: "auth-store" }
  )
);
