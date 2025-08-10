Got it — here’s a **consolidated README** that documents everything we’ve done so far for your **ShopFlow** project, including the new admin dashboard work, route group restructuring, fixes, and features we’ve built.

---

# ShopFlow — Development Progress README

## Overview

**ShopFlow** is a modern e-commerce platform built with **Next.js 15 (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **Zustand**.
It offers a full storefront experience plus a role-based **Admin Dashboard** for managing products, orders, users, and store settings.

---

## Initial State
Initially, only the below features had been implemented:
* Storefront pages (`cart`, `categories`, `checkout`, `products`, `profile`, `wishlist`) all in `app/` root.
* No role-based routing, no admin dashboard.
* `useAuthStore` handled basic login/registration but without roles.
* No charts, CRUD, or real admin UI.

---

## Key Changes & Features Implemented

### 1. **Route Group Refactor**

* Created two route groups:

  ```
  app/(store) → all public/shop pages
  app/(admin)/admin → admin dashboard pages
  ```
* Moved all shop routes under `(store)`.
* Root `app/layout.tsx` now **only** defines `<html>` / `<body>`.
* `(store)/layout.tsx` wraps all store pages with `Header` and `Toaster`.
* Removed `<html>`/`<body>` from nested layouts to fix hydration errors.
* Deleted or redirected duplicate routes to avoid `Two parallel pages` error.

  * `app/profile`, `app/checkout`, `app/product` removed (now only in `(store)`).
  * Old `app/admin` and `app/admin (deprecated)` removed.

---

### 2. **Admin Dashboard**

* **New structure:**

  ```
  app/(admin)/admin
    layout.tsx     → Sidebar + topbar + AdminGuard
    page.tsx       → Overview (KPIs + charts)
    products/...
    orders/...
    users/...
    settings/...
  components/admin/AdminGuard.tsx
  components/admin/DevAuthSwitch.tsx
  ```
* Sidebar navigation + protected routes with `AdminGuard`.
* `useAuthStore` updated to store role + `isAdmin` flag.
* **Hydration fix** in `AdminGuard` to prevent instant redirect on reload.
* **DevAuthSwitch** widget:

  * Login as admin/user or logout in 1 click.
  * Auto-redirect to `/admin` on admin login.
  * Enabled in development or with `NEXT_PUBLIC_SHOW_DEV_AUTH=1`.

---

### 3. **Backend-Ready Mock Repos**

We added mock repository modules under `lib/repos` to simulate a backend:

* `productsRepo.ts`
* `ordersRepo.ts`
* `usersRepo.ts`
* `settingsRepo.ts`
  These expose async CRUD methods that can be swapped for API calls later.

---

### 4. **Admin Dashboard Pages**

#### Overview

* KPI cards for revenue, orders, customers, products.
* **Recharts** line chart for weekly sales.
* Bar chart for products by category.

#### Products

* Products table with edit/delete buttons.
* **Add Product** button opens a modal form (`ProductForm` component).
* Form uses `react-hook-form` + `zod` for validation and numeric coercion.
* On submit, adds product via `productsRepo` and updates table.

#### Orders

* Orders table with status dropdown.
* Changes saved via `ordersRepo.setStatus`.

#### Users

* Users table with role select (admin/user) and activate/deactivate toggle.
* Changes saved via `usersRepo`.

#### Settings

* Store settings form:

  * Store name
  * Currency
  * Low stock threshold
  * Payment method toggles
* Fully functional save button (converted to `<form>` submit handler).
* Pointer events + z-index fixes to ensure clickability.

---

### 5. **Fixes & Improvements**

* **Hydration Error Fix:** Removed `<html>`/`<body>` from non-root layouts.
* **Route Collision Fix:** Removed duplicate pages between `(store)` and root.
* **Form Typing Fix:** Corrected `ProductForm` types with `z.input`/`z.output` generics to align with `z.coerce.number()` in Zod.
* **AdminGuard Hydration Fix:** Wait for Zustand persist hydration before redirecting.
* **Clickable Save Button Fix:** Ensured no overlays/pointer-events block Settings save button.

---

## Current Project Structure (simplified)

```
.
├── app
│   ├── (admin)
│   │   └── admin
│   │       ├── layout.tsx
│   │       ├── orders
│   │       │   └── page.tsx
│   │       ├── page.tsx
│   │       ├── products
│   │       │   └── page.tsx
│   │       ├── settings
│   │       │   └── page.tsx
│   │       └── users
│   │           └── page.tsx
│   ├── (store)
│   │   ├── cart
│   │   │   └── page.tsx
│   │   ├── categories
│   │   │   ├── [category]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── checkout
│   │   │   ├── Header.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── profile
│   │   │   ├── orders
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── wishlist
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components
│   ├── admin
│   │   ├── AdminGuard.tsx
│   │   ├── DevAuthSwitch.tsx
│   │   └── ProductForm.tsx
│   ├── auth
│   │   └── AuthModal.tsx
│   ├── categories
│   │   ├── CategoryGrid.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SearchBar.tsx
│   ├── common
│   │   ├── ConfirmModal.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductCard.tsx
│   │   └── UserAvatar.tsx
│   ├── layout
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── profile
│   │   ├── AddressBook.tsx
│   │   └── ChangePassword.tsx
│   └── ui
└── lib
    ├── api
    │   └── orders.ts
    ├── data
    │   ├── categories.ts
    │   └── products.ts
    ├── repos
    │   ├── ordersRepo.ts
    │   ├── productsRepo.ts
    │   ├── settingsRepo.ts
    │   └── usersRepo.ts
    ├── store
    │   ├── useAuthStore.ts
    │   └── useCartStore.ts
    ├── types
    │   └── order.ts
    ├── utils
    │   ├── avatar.ts
    │   └── passwordValidation.ts
    └── utils.ts
```

---

## Next Steps / Possible Enhancements

1. **Edit Product** using `ProductForm` with default values.
2. Add sorting, filtering, and pagination to all tables.
3. Image uploads for products.
4. Connect repos to a real backend API (Prisma/Next API routes, etc.).
5. Add role-based restrictions for user management.
6. Analytics dashboards with more detailed charts.
7. Email notifications for orders.

---

Do you want me to turn this README into a **developer-friendly markdown doc** with full code snippets for setup, so any new contributor can jump in and run the app with the admin dashboard? That would make onboarding seamless.
