# W05 Group Meeting Summary

## Meeting Details

| Item | Details |
|------|---------|
| **Date** | August 7, 2026 |
| **Time** | 8:00 PM (BRT) |
| **Format** | Virtual (Online) |
| **Duration** | ~75 minutes |

## Participants

- **Lucas Felipe Dias de Miranda** (Group Leader)

## Meeting Agenda

1. ✅ Open with prayer
2. ✅ Review W05 project requirements (Backend integration sprint)
3. ✅ Set up Neon PostgreSQL database via Vercel
4. ✅ Configure Prisma ORM (v7) with driver adapter
5. ✅ Create database schema and run migrations
6. ✅ Implement NextAuth.js authentication
7. ✅ Build API routes for products and reviews (CRUD)
8. ✅ Create seller profile pages and seller dashboard
9. ✅ Implement reviews & ratings system with star selector
10. ✅ Seed database with mock data
11. ✅ Connect existing frontend pages to backend

---

## 1. Project Discussion

### Previous Sprint Review
Before diving into backend work, the following completed items from W04 were confirmed:
- **Landing page** — Fully built with all sections (hero, categories, how it works, testimonials, CTA)
- **Sign-In & Registration pages** — Split-screen layouts with client-side validation
- **Products browse page** — Category filters, search, sort, responsive grid
- **Product detail page** — Full layout with reviews, artisan card, related products
- **Shared components** — Header and Footer extracted into reusable components
- **Mock data system** — 12 products across 4 categories with reviews

### Build Sprint Focus
This week's meeting focused on **transforming Handcrafted Haven from a static frontend into a full-stack application** by:
- Setting up a production PostgreSQL database (Neon via Vercel)
- Implementing user authentication with NextAuth.js
- Building RESTful API routes for products and reviews
- Creating seller-facing pages (profile, dashboard, product creation)
- Connecting all existing pages to the real backend

---

## 2. Database Setup

### Neon PostgreSQL (via Vercel)
A PostgreSQL database was provisioned through Vercel's integration with Neon:
- **Provider**: Neon PostgreSQL (serverless)
- **Region**: US East 1 (AWS)
- **Connection**: Pooled via PgBouncer + direct connection available

### Prisma ORM (v7)
Prisma was chosen as the ORM for type-safe database access:

| Component | Purpose |
|-----------|---------|
| `prisma/schema.prisma` | Database models (User, Product, Review) |
| `prisma.config.ts` | Datasource URL, migration path, seed command (Prisma v7 format) |
| `src/app/lib/prisma.ts` | PrismaClient singleton with PrismaPg driver adapter |
| `prisma/seed.ts` | Database seeding script with mock data |

### Database Schema

| Model | Key Fields | Notes |
|-------|------------|-------|
| **User** | id, name, email, hashedPassword, role (BUYER/SELLER), bio | Enum-based role system |
| **Product** | id, name, description, price, category, sellerId (FK) | Cascading delete on seller removal |
| **Review** | id, rating (1-5), text, productId (FK), authorId (FK) | Unique constraint: one review per user per product |

### Migration
The initial migration `20260807233642_init` was applied successfully, creating all tables in the Neon PostgreSQL database.

---

## 3. Authentication Implementation

### NextAuth.js v4
Authentication was implemented using NextAuth.js with the following configuration:

| Feature | Implementation |
|---------|---------------|
| **Provider** | CredentialsProvider (email + password) |
| **Strategy** | JWT (stateless sessions via cookies) |
| **Password Hashing** | bcryptjs with 12 salt rounds |
| **Custom Session** | User role and ID injected via JWT callbacks |
| **Type Safety** | Extended NextAuth types with `next-auth.d.ts` |

### Authentication Flow
1. **Registration** (`POST /api/auth/register`) → Validates input → Hashes password → Creates user → Returns user object
2. **Login** (`POST /api/auth/[...nextauth]`) → Finds user by email → Compares bcrypt hash → Issues JWT
3. **Session** → JWT token carries `id` and `role` → Available in client via `useSession()`

### Updated Pages
- **Login page** — Now calls `signIn("credentials", ...)` from NextAuth, displays server errors
- **Register page** — Calls `/api/auth/register`, then auto-signs in on success
- **Header** — Shows user avatar + name when authenticated, "Dashboard" link for sellers, "Sign Out" button
- **Layout** — Wrapped with `<AuthProvider>` (SessionProvider)

---

## 4. API Routes

### Products API

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products` | GET | Public | List products with filters (category, search, sort, sellerId) |
| `/api/products` | POST | Seller | Create a new product |
| `/api/products/[id]` | GET | Public | Get single product with reviews and seller info |
| `/api/products/[id]` | PUT | Owner | Update a product (ownership check) |
| `/api/products/[id]` | DELETE | Owner | Delete a product (ownership check) |

### Reviews API

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products/[id]/reviews` | GET | Public | List reviews for a product |
| `/api/products/[id]/reviews` | POST | Buyer | Add a review (prevents self-review, one per user) |

---

## 5. Seller Features

### Seller Profile Page (`/sellers/[id]`)
- Gradient header with avatar (initials), name, role, join date
- Seller bio display
- Stats row: total products, average rating, total reviews
- Product grid showing all seller's products
- Responsive layout — stacks on mobile

### Seller Dashboard (`/dashboard`)
- **Access control**: Redirects unauthenticated users to login, shows "Seller Access Only" for buyers
- **Stats cards**: Products count, average rating, total reviews, total value
- **Quick Actions**: Add Product, View My Shop, Browse Marketplace
- **Product list**: All seller's products with View and Delete actions
- **Empty state**: Encouraging message with "Add Your First Product" CTA

### Product Creation (`/dashboard/products/new`)
- Form fields: name, short description, detailed description, price, category
- **Emoji picker**: 16 emojis to choose from for the product card
- **Color picker**: 7 gradient options for the product card background
- **Live preview**: Shows how the product card will look
- Form validation and error handling
- Submits to `POST /api/products`

---

## 6. Reviews & Ratings System

### Product Detail Page Updates
- Now tries to fetch product data from the database first
- Falls back to mock data if the database is unavailable (graceful degradation)
- Related products also fetched from DB when available
- Artisan card includes "View Profile →" link for DB products

### Review Form Component (`ReviewForm.tsx`)
- **Star rating selector**: Interactive 5-star rating with hover effects and labels (Poor → Excellent)
- **Auth-aware**: Shows "Sign in to leave a review" for guests, hidden for product sellers
- **Validation**: Requires both rating and text
- **Success state**: Shows confirmation message after submission
- **Error handling**: Displays server-side errors (duplicate review, etc.)

---

## 7. Database Seeding

### Seed Script (`prisma/seed.ts`)
The seed script populates the database with the following test data:

| Data | Count | Details |
|------|-------|---------|
| Seller accounts | 6 | Sarah, James, Elena, Maya, Carlos, Anna (password: `seller123`) |
| Buyer accounts | 4 | Michelle, David, Jennifer, Emma (password: `buyer123`) |
| Products | 12 | All original mock products linked to seller accounts |
| Reviews | 15 | Spread across products, written by buyer accounts |

### Test Credentials
- **Seller login**: `sarah@handcraftedhaven.com` / `seller123`
- **Buyer login**: `michelle@email.com` / `buyer123`

---

## 8. Technical Decisions

### Prisma v7 Adaptation
Prisma v7 introduced breaking changes from v6:
- `url` field removed from `datasource` block in schema
- New `prisma.config.ts` required for datasource URL and seed command
- Driver adapter pattern (`@prisma/adapter-pg`) required for PrismaClient
- Environment variables loaded from `.env.local` via dotenv

### Graceful Degradation
The product detail page implements a **dual-source pattern**:
1. First attempts to load data from the PostgreSQL database
2. Falls back to the existing mock data module if the DB is unavailable
3. This ensures the app works even without a database connection during development

---

## 9. Challenges, Successes, and Insights

### 🔴 Challenge
Prisma v7 introduced significant breaking changes from previous versions. The removal of the `url` field from the `datasource` block, the requirement for a `prisma.config.ts` file, and the mandatory driver adapter pattern required research and adaptation. The error messages were helpful in guiding the migration.

### 🟢 Success
The entire backend integration — database schema, authentication, API routes, seller pages, and review system — was implemented in a single session. The existing frontend pages (login, register, products) were connected to the real backend with minimal structural changes, validating the clean component architecture from W04.

### 💡 Insight
Building the mock data system in W04 proved invaluable. The seed script was essentially a direct translation of the mock data into database records, and the graceful degradation pattern means the app works with or without the database. This approach de-risked the backend integration — if anything breaks in production, the static content is still available.

---

## 10. Decisions & Action Items

| Decision/Action | Owner | Status |
|-----------------|-------|--------|
| Set up Neon PostgreSQL via Vercel | Lucas | ✅ Done |
| Configure Prisma v7 with driver adapter | Lucas | ✅ Done |
| Create database schema (User, Product, Review) | Lucas | ✅ Done |
| Run initial migration | Lucas | ✅ Done |
| Implement NextAuth.js credentials auth | Lucas | ✅ Done |
| Create registration API endpoint | Lucas | ✅ Done |
| Connect login/register pages to backend | Lucas | ✅ Done |
| Update Header with auth-aware navigation | Lucas | ✅ Done |
| Build products API (CRUD) | Lucas | ✅ Done |
| Build reviews API | Lucas | ✅ Done |
| Create seller profile page | Lucas | ✅ Done |
| Create seller dashboard with product management | Lucas | ✅ Done |
| Create product creation form | Lucas | ✅ Done |
| Implement review submission with star selector | Lucas | ✅ Done |
| Seed database with mock data | Lucas | ✅ Done |
| Update project board | Lucas | 🔲 Pending |
| Deploy updated version to Vercel | Lucas | 🔲 Pending |

---

## 11. Next Steps

1. Deploy the full-stack application to Vercel with environment variables
2. Set up Vercel environment variables for `DATABASE_URL` and `NEXTAUTH_SECRET`
3. Add product image upload functionality (Vercel Blob or Cloudinary)
4. Implement user profile editing page
5. Add search/filter functionality on the products page using the API
6. Implement order/cart system
7. Add email verification for new accounts
8. Update project board with completed and new work items
