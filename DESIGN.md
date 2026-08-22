# Project Plan: "Cosmetic" E-Commerce Website

## 1. Vision & Overview
"Cosmetic" is a professional, fully responsive e-commerce application for beauty products. It features a seamless customer shopping experience and a dedicated CMS portal for administrators to manage product inventory.

## 2. Tech Stack & Architecture
- **Frontend:** React, React Router, Tailwind CSS (with Vite)
- **Backend/Database:** Supabase (Auth & Database)
- **State Management:** React Context API (for Cart/Auth)
- **Styling:** Vanilla CSS + Tailwind CSS (Custom theme variables in `index.css`)

## 3. Data Schema (Supabase)
### `products` table
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `name` | text | Product name |
| `description` | text | Product description |
| `price` | decimal | Product price |
| `image_url` | text | URL for the product image |
| `created_at`| timestamp | Creation date |

### `orders` table (Planned for Phase 2)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `customer_email`| text | Customer contact |
| `items` | jsonb | Array of purchased items |
| `total` | decimal | Order total |

## 4. Component Structure
- `src/components/`: `Navbar`, `Footer`, `ProductCard`, `AdminRoute`
- `src/pages/`: `Home`, `Shop`, `ProductDetails`, `Cart`, `Checkout`, `AdminLogin`, `AdminDashboard`
- `src/lib/`: `supabase.ts` (Already implemented)

## 5. Design System
- **Colors:**
  - `brand-nude`: #F5E6E0
  - `brand-cream`: #FAF7F5
  - `brand-charcoal`: #2D2D2D
- **Responsiveness:** Mobile-first approach using Tailwind's breakpoint utilities.

## 6. Development Roadmap
1. **Initialize Database:** Define `products` table in Supabase.
2. **Infrastructure:** Implement Router, Auth context, and basic layout components (`Navbar`/`Footer`).
3. **Core Pages:** Implement `Home`, `Shop`, and `ProductDetails`.
4. **Cart/Checkout:** Implement Cart state management and Checkout form.
5. **CMS:** Implement `AdminLogin` (auth) and `AdminDashboard` (CRUD for products).
6. **Polishing:** Final responsive checks, accessibility audit, and styling refinements.
