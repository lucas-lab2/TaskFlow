# W03 Group Meeting Summary

## Meeting Details

| Item | Details |
|------|---------|
| **Date** | July 25, 2026 |
| **Time** | 3:00 PM (BRT) |
| **Format** | Virtual (Online) |
| **Duration** | ~45 minutes |

## Participants

- **Lucas Felipe Dias de Miranda** (Group Leader)

## Meeting Agenda

1. ✅ Open with prayer
2. ✅ Review W03 project requirements
3. ✅ Set up Handcrafted Haven Next.js application
4. ✅ Reorganize repository structure (monorepo layout)
5. ✅ Define user stories for the marketplace
6. ✅ Design and implement the landing page
7. ✅ Discuss design decisions (color palette, typography)
8. ✅ Update project board with new work items

---

## 1. Project Setup

### Handcrafted Haven Application
A new Next.js application was scaffolded inside the existing repository under the `handcrafted-haven/` directory with the following configuration:
- **Framework**: Next.js (App Router) with TypeScript
- **ESLint**: Enabled
- **Tailwind CSS**: Not included (vanilla CSS chosen for full control)
- **Source Directory**: `src/` directory structure
- **Git**: Uses the parent repository's git history

### Repository Reorganization
The repository was restructured into a monorepo layout to cleanly separate projects:
- `taskflow-app/` — Previous TaskFlow project (preserved)
- `handcrafted-haven/` — New Handcrafted Haven marketplace
- `meeting-notes/` — Shared meeting documentation (root level)

---

## 2. Design Decisions

The design direction was chosen to reflect the **artisanal, handcrafted** nature of the marketplace:

| Decision | Choice | Reason |
|----------|--------|--------|
| Primary Color | Forest Green (`#2D6A4F`) | Evokes nature, organic materials, and handmade quality |
| Secondary Color | Terracotta (`#E07A5F`) | Warm clay tones representing craftsmanship |
| Accent Color | Golden Amber (`#D4A373`) | Premium, warm feel for calls-to-action |
| Display Font | Playfair Display (serif) | Elegant, artisanal character for headings |
| Body Font | Inter (sans-serif) | Clean readability for body text |
| CSS Approach | Vanilla CSS (no Tailwind) | Full design control, per assignment guidelines |

---

## 3. Landing Page Implementation

The landing page was built with the following sections:
- **Navigation**: Logo, Sign In, and Get Started buttons
- **Hero Section**: Headline with gradient text, CTA buttons
- **Stats Row**: Artisan count, product count, average rating, customer count
- **Categories**: Pottery, Jewelry, Textiles, and Woodwork cards
- **How It Works**: Three-step visual flow (Browse → Connect → Support)
- **Testimonials**: Three customer/artisan review cards with star ratings
- **CTA Banner**: Green gradient banner with "Create Your Shop" call-to-action
- **Footer**: Copyright, navigation links

---

## 4. User Stories Defined

12 user stories were defined for the Handcrafted Haven marketplace, aligned with the project specifications:

| # | User Story | Priority |
|---|-----------|----------|
| 1 | User Registration | 🔴 High |
| 2 | User Login | 🔴 High |
| 3 | Seller Profile Creation | 🔴 High |
| 4 | Create Product Listing | 🔴 High |
| 5 | Browse & Filter Products | 🔴 High |
| 6 | Product Detail Page | 🟠 High |
| 7 | Reviews & Ratings | 🟠 High |
| 8 | Landing Page | 🟠 High |
| 9 | Responsive Navigation & Layout | 🟠 High |
| 10 | User Profile Management | 🔵 Medium |
| 11 | Product Categories | 🔵 Medium |
| 12 | Search Products | 🔵 Medium |

---

## 5. Challenges, Successes, and Insights

### 🔴 Challenge
Restructuring the repository from a single-project layout to a monorepo with two separate Next.js applications required careful planning. Moving files while preserving git history and ensuring both apps could build independently was the main technical challenge of the session.

### 🟢 Success
The landing page was fully designed and implemented in a single session using vanilla CSS with a custom design system. The warm, artisanal color palette (forest green, terracotta, golden amber) creates a strong brand identity that aligns with the marketplace concept.

### 💡 Insight
Choosing vanilla CSS over Tailwind, as suggested by the assignment, actually provided more creative control for building a unique design system. Defining CSS custom properties (design tokens) for colors, spacing, and typography made it easy to maintain consistency while keeping full flexibility for custom component styling.

---

## 6. Decisions & Action Items

| Decision/Action | Owner | Status |
|-----------------|-------|--------|
| Set up Handcrafted Haven Next.js app | Lucas | ✅ Done |
| Reorganize repo into monorepo structure | Lucas | ✅ Done |
| Create warm artisanal design system (CSS) | Lucas | ✅ Done |
| Build landing page with all sections | Lucas | ✅ Done |
| Define 12 marketplace user stories | Lucas | ✅ Done |
| Update project board | Lucas | 🔲 Pending |
| Deploy initial version to Vercel | Lucas | 🔲 Pending |

---

## 7. Next Steps

1. Create user stories document in `handcrafted-haven/design/`
2. Set up authentication pages (Login / Register)
3. Design and implement seller profile pages
4. Set up database schema for users, products, and reviews
5. Implement product listing and detail pages
6. Deploy Handcrafted Haven to Vercel
7. Update project board with work items and assignments
