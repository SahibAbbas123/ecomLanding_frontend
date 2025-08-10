// src/lib/store/useAuthStore.ts
// Zustand auth store with role-based access (admin/user)
// Works with FRONTEND-ONLY mock auth now, and flips to real API if NEXT_PUBLIC_API_BASE is set.

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ===========================
 * Types
 * =========================== */
export type Role = "user" | "admin";

export type AuthUser = {
  id?: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: Role; // defaults to "user" if missing
  
};

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

type ApiError = {
  message: string;
  status?: number;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAdmin: boolean;

  loading: boolean;
  error: string | null;

  // actions
  login: (credentials: Credentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;

  // profile-ish (api-ready)
  fetchProfile: () => Promise<void>;
  updateProfile: (patch: Partial<AuthUser>) => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;

  // role helpers
  setRole: (role: Role) => void;
  loginAs: (user: AuthUser, token?: string | null) => void; // useful for dev

  // misc
  clearError: () => void;
};

/* ===========================
 * Config & Utilities
 * =========================== */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.trim() || "";
const USE_MOCK = !API_BASE; // If you set NEXT_PUBLIC_API_BASE, the store uses real API

async function api<T>(
  path: string,
  opts: RequestInit & { token?: string | null } = {}
): Promise<T> {
  if (!API_BASE) throw new Error("API_BASE not configured");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };
  if (opts.token) headers["authorization"] = `Bearer ${opts.token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      /* ignore */
    }
    const err: ApiError = { message, status: res.status };
    throw err;
  }
  // Allow 204/empty responses
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

/* ===========================
 * Mock Auth (frontend-only)
 * =========================== */
type MockUser = AuthUser & { password: string };
let mockDb: MockUser[] = [
  { id: "1", email: "admin@example.com", name: "Admin", role: "admin", password: "admin123" },
  { id: "2", email: "user@example.com", name: "Demo User", role: "user", password: "user12345" },
];

const mockAuth = {
  async login({ email, password }: Credentials): Promise<AuthResponse> {
    await delay(300);
    const found = mockDb.find((u) => u.email === email && u.password === password);
    if (!found) {
      throw <ApiError>{ message: "Invalid email or password", status: 401 };
    }
    const { password: _pw, ...user } = found;
    return { token: `mock-token-${user.id ?? "x"}`, user };
  },
  async register({ email, password, name }: RegisterPayload): Promise<AuthResponse> {
    await delay(400);
    if (mockDb.some((u) => u.email === email)) {
      throw <ApiError>{ message: "Email already in use", status: 409 };
    }
    const nu: MockUser = {
      id: String(Date.now()),
      email,
      name: name || email.split("@")[0],
      role: "user",
      password,
    };
    mockDb.push(nu);
    const { password: _pw, ...user } = nu;
    return { token: `mock-token-${nu.id}`, user };
  },
  async fetchProfile(token: string | null): Promise<AuthUser> {
    await delay(200);
    const id = token?.replace("mock-token-", "");
    const found = mockDb.find((u) => u.id === id);
    if (!found) throw <ApiError>{ message: "Unauthorized", status: 401 };
    const { password: _pw, ...user } = found;
    return user;
  },
  async updateProfile(token: string | null, patch: Partial<AuthUser>): Promise<AuthUser> {
    await delay(250);
    const id = token?.replace("mock-token-", "");
    const idx = mockDb.findIndex((u) => u.id === id);
    if (idx === -1) throw <ApiError>{ message: "Unauthorized", status: 401 };
    const current = mockDb[idx];
    const nextRole = patch.role ?? current.role;
    const updated: MockUser = {
      ...current,
      ...patch,
      role: nextRole,
      password: current.password,
    };
    mockDb[idx] = updated;
    const { password: _pw, ...user } = updated;
    return user;
  },
  async changePassword(token: string | null, current: string, next: string): Promise<void> {
    await delay(250);
    const id = token?.replace("mock-token-", "");
    const idx = mockDb.findIndex((u) => u.id === id);
    if (idx === -1) throw <ApiError>{ message: "Unauthorized", status: 401 };
    if (mockDb[idx].password !== current) {
      throw <ApiError>{ message: "Current password is incorrect", status: 400 };
    }
    mockDb[idx].password = next;
  },
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ===========================
 * Store
 * =========================== */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAdmin: false,

      loading: false,
      error: null,

      /* ---------- Core Auth ---------- */
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = USE_MOCK
            ? await mockAuth.login(credentials)
            : await api<AuthResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
              });

          const normalizedUser: AuthUser = {
            ...res.user,
            role: res.user.role ?? "user",
          };

          set({
            user: normalizedUser,
            token: res.token,
            isAdmin: (normalizedUser.role ?? "user") === "admin",
            loading: false,
            error: null,
          });
        } catch (e: any) {
          set({
            loading: false,
            error: (e?.message as string) || "Login failed",
          });
          throw e;
        }
      },

      register: async (payload) => {
        set({ loading: true, error: null });
        try {
          const res = USE_MOCK
            ? await mockAuth.register(payload)
            : await api<AuthResponse>("/auth/register", {
                method: "POST",
                body: JSON.stringify(payload),
              });

          const normalizedUser: AuthUser = {
            ...res.user,
            role: res.user.role ?? "user",
          };

          set({
            user: normalizedUser,
            token: res.token,
            isAdmin: (normalizedUser.role ?? "user") === "admin",
            loading: false,
            error: null,
          });
        } catch (e: any) {
          set({
            loading: false,
            error: (e?.message as string) || "Registration failed",
          });
          throw e;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAdmin: false,
          loading: false,
          error: null,
        });
      },

      /* ---------- Profile-ish ---------- */
      fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
          const token = get().token;
          const user = USE_MOCK
            ? await mockAuth.fetchProfile(token)
            : await api<AuthUser>("/auth/me", { method: "GET", token });

          const normalized: AuthUser = { ...user, role: user.role ?? "user" };

          set({
            user: normalized,
            isAdmin: (normalized.role ?? "user") === "admin",
            loading: false,
          });
        } catch (e: any) {
          set({
            loading: false,
            error: (e?.message as string) || "Failed to fetch profile",
          });
          // optional: auto-logout on 401
          if (e?.status === 401) get().logout();
        }
      },

      updateProfile: async (patch) => {
        set({ loading: true, error: null });
        try {
          const token = get().token;
          const updated = USE_MOCK
            ? await mockAuth.updateProfile(token, patch)
            : await api<AuthUser>("/auth/profile", {
                method: "PATCH",
                body: JSON.stringify(patch),
                token,
              });

          const normalized: AuthUser = { ...updated, role: updated.role ?? "user" };

          set({
            user: normalized,
            isAdmin: (normalized.role ?? "user") === "admin",
            loading: false,
          });
        } catch (e: any) {
          set({
            loading: false,
            error: (e?.message as string) || "Failed to update profile",
          });
          throw e;
        }
      },

      changePassword: async (current, next) => {
        set({ loading: true, error: null });
        try {
          const token = get().token;
          if (USE_MOCK) {
            await mockAuth.changePassword(token, current, next);
          } else {
            await api<void>("/auth/change-password", {
              method: "POST",
              body: JSON.stringify({ current, next }),
              token,
            });
          }
          set({ loading: false });
        } catch (e: any) {
          set({
            loading: false,
            error: (e?.message as string) || "Failed to change password",
          });
          throw e;
        }
      },

      /* ---------- Role helpers ---------- */
      setRole: (role) =>
        set((state) => {
          const user = state.user ? { ...state.user, role } : null;
          return {
            user,
            isAdmin: role === "admin",
          };
        }),

      loginAs: (user, token = null) =>
        set(() => ({
          user: { ...user, role: user.role ?? "user" },
          token,
          isAdmin: (user.role ?? "user") === "admin",
          error: null,
          loading: false,
        })),

      /* ---------- Misc ---------- */
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      version: 2,
      migrate: (persisted: any, fromVersion) => {
  if (!persisted) return persisted;

  // Type assertion so TS doesn't complain
  const persistedState = persisted as Partial<AuthState> & { user?: AuthUser | null };

  if (fromVersion < 2) {
    const user: AuthUser | null = persistedState.user ?? null;
    const role: Role = user?.role ?? "user";
    return {
      ...persistedState,
      user: user ? { ...user, role } : null,
      isAdmin: role === "admin",
      error: null,
      loading: false,
    };
  }

  return persistedState;
},

      // (optional) partialize to avoid persisting transient flags
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

/* ===========================
 * Selectors (nice ergonomics)
 * =========================== */
export const selectUser = (s: AuthState) => s.user;
export const selectToken = (s: AuthState) => s.token;
export const selectIsAdmin = (s: AuthState) => s.isAdmin || (s.user?.role ?? "user") === "admin";
export const selectAuthLoading = (s: AuthState) => s.loading;
export const selectAuthError = (s: AuthState) => s.error;

/* ===========================
 * Dev convenience (optional)
 * =========================== */
// Quick admin login in dev console:
// import("/src/lib/store/useAuthStore").then(m => m.useAuthStore.getState().loginAs({ email:"admin@example.com", name:"Admin", role:"admin" }, "mock-token-1"));
