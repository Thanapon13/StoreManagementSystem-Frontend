# StoreManagementSystem — Frontend

Single-page application for the **StoreFront Management System**, a marketplace connecting **Sellers** (list/manage products) and **Buyers** (browse, cart, checkout). Built with React, TypeScript, and Vite.

## Tech Stack

| Concern | Technology |
|---|---|
| Build tool | Vite |
| Framework | React 19 + TypeScript |
| Routing | React Router (`createBrowserRouter`) |
| HTTP client | Axios |
| Styling | Tailwind CSS |
| UI components | shadcn/ui (Radix UI primitives) |
| Forms & validation | `react-hook-form` + `zod` |
| Auth | JWT, stored client-side and attached via an Axios request interceptor |
| Notifications | `sonner` (toasts), `sweetalert2` (confirmations) |

## Architecture

```
src/
  apis/          # Axios instance + one API module per backend resource (auth, product, cart, order)
  components/    # Reusable components; components/ui holds shadcn-generated primitives
  contexts/      # AuthContext (user/role/session), CartContext (cart item count)
  hooks/         # Custom hooks (e.g. useAuth)
  pages/
    auth/        # Login, Register
    buyer/       # ProductList, ProductDetail, Cart, Checkout, OrderHistory
    seller/      # Dashboard (product CRUD), SellerOrders
  router/        # Router.tsx (route table), ProtectedRoute.tsx (role-based guard)
  types/         # TypeScript types mirroring backend API contracts
  validators/    # Zod schemas for forms (login, register, product, cart)
  lib/           # Shared helpers (e.g. cn() for conditional classNames)
```

All API calls go through `src/apis/` — no `fetch`/`axios` calls are scattered inside components. Role-gated pages (cart, checkout, order history for buyers; product/order management for sellers) are wrapped by `ProtectedRoute`, which checks the authenticated user's role and redirects to `/login` (if unauthenticated) or `/` (if the role isn't allowed).

## Routes

| Path | Access | Page |
|---|---|---|
| `/` | public | Home |
| `/login`, `/register` | public | Auth |
| `/products`, `/products/:id` | public | Marketplace browsing & product detail |
| `/cart`, `/checkout`, `/orders` | buyer only | Cart, checkout, order history |
| `/seller/dashboard`, `/seller/orders` | seller only | Product CRUD, seller order list |

## Environment Variables

Create a `.env.local` file in the project root:

```
VITE_API_LOCAL=http://localhost:3000
```

This should point to the base URL of the [backend API](../StoreManagementSystem-Backend).

## Setup & Running

### Prerequisites
- Node.js 18+
- pnpm
- The [backend](../StoreManagementSystem-Backend) running and reachable at `VITE_API_LOCAL`

### Steps

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.local.example .env.local   # then set VITE_API_LOCAL

# 3. Run the dev server
pnpm dev

# Build for production
pnpm build

# Preview a production build
pnpm preview
```

By default the app runs at `http://localhost:5173`.

## Adding UI Components

New shadcn components must be added via the CLI (not copy-pasted) to keep versioning/dependencies consistent:

```bash
npx shadcn@latest add <component>
```

## Testing

Not yet implemented. The backend's test suite (when added) covers the critical business logic (role-based access, inventory, checkout); this frontend currently has no automated test coverage (no Vitest/Jest/RTL configured).

## Architectural Notes

- **Role-aware UI**: `AuthContext` holds the logged-in user (including `role: "seller" | "buyer"`), and both routing (`ProtectedRoute`) and in-page conditionals use it to show only the features relevant to the current role.
- **Typed API contracts**: types in `src/types/` are kept in sync with the backend's response shapes, avoiding `any` on data crossing the network boundary.
- **Form validation mirrors backend validation**: Zod schemas in `src/validators/` enforce the same constraints (required fields, non-negative price/quantity, image requirements) client-side that the backend enforces with Joi, to give immediate feedback before a request is sent.
- **Token handling**: the JWT is persisted client-side and attached to every authenticated request via an Axios interceptor, rather than manually setting headers per call site.
