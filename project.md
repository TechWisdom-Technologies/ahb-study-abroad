# AHB Study Abroad — Project Documentation & Architecture Guide

Welcome to the Next.js edition of the AHB Study Abroad platform. This document outlines the system architecture, directory layouts, database models, security implementations, and core features to help future developers (human or AI agents) understand the codebase context immediately.

---

## 1. Project Overview & Migration Context
*   **Original Structure:** React + Vite Single Page Application (SPA) using Supabase Client for client-side authentication and database queries.
*   **Migrated Structure:** Next.js App Router (React 19, Turbopack, Tailwind CSS v4) using **Prisma ORM** connecting to a local/production **PostgreSQL** database. 
*   **Brand & Content:** Fully updated for **AHB Study Abroad** (CEO & Founder: Arif Hossain Bhuiyan) based in Mirpur-11, Dhaka, with 360+ universities imported across 17 countries.
    1.  Eliminated client-side direct database queries by creating a secure API routing layer.
    2.  Ported the custom Supabase auth flow to a secure HTTP-Only JWT session model.
    3.  Implemented a unified dynamic CRUD API handler to avoid duplicate endpoint files.
    4.  Fixed SSG/SSR hydration crashes by moving client storage references inside React effects.
    5.  Secured the web app natively using server-level HTTP header configurations.

---

## 2. Directory Structure & File Map

```text
cambry-nextjs/
├── prisma/
│   ├── schema.prisma          # Database schema models and relationships
│   └── seed.ts                # Database seeder (inserts default admin & country data)
├── public/
│   ├── assets/                # Core platform images, student/team photos, logos
│   ├── flags/                 # SVG country flags used in drop-downs and grids
│   ├── partners/              # SVG logos of academic partner institutions
│   └── uploads/               # User-uploaded images (managed by upload API)
├── src/
│   ├── app/
│   │   ├── (public)/          # Public route group (Home, About, Services, Destinations, IELTS)
│   │   ├── admin/             # Admin area layout, login view, and dashboard sheets
│   │   ├── api/               # Server API routes (auth, generic CRUD, stats, uploader)
│   │   ├── globals.css        # Global CSS, Tailwind base classes, and custom animations
│   │   ├── layout.tsx         # Root Layout, font setups, and core context wrappers
│   │   └── next.config.ts     # Next.js configuration and HTTP Security Headers
│   ├── components/
│   │   ├── admin/             # Admin layout wrapper and sidebar structures
│   │   ├── home/              # Homepage sectional components (Hero, WhyChoose, FAQ, etc.)
│   │   ├── layout/            # Layout elements (Interactive Navbar & Footer)
│   │   ├── shared/            # Reusable UI widgets (e.g. CountryFlag renderer)
│   │   └── ui/                # Tailwind v4 styled Shadcn components (Buttons, Inputs, etc.)
│   ├── contexts/
│   │   └── LanguageContext.tsx# Multi-lingual context provider (English/Bengali)
│   ├── data/
│   │   └── destinationDetails.ts # Hardcoded country metadata parsed during seeds
│   ├── hooks/
│   │   ├── use-toast.ts       # Action confirmation overlays
│   │   └── useCountries.ts    # Custom hook fetching country lists for navbars
│   ├── i18n/
│   │   ├── en.ts              # English language translations dictionary
│   │   └── bn.ts              # Bengali language translations dictionary
│   └── lib/
│       ├── auth.ts            # JWT token signing and verification utilities
│       └── prisma.ts          # Consolidated PrismaClient instance with adapters
```

---

## 3. Database Schema Models (PostgreSQL & Prisma)

The database schema is defined in `prisma/schema.prisma` and contains the following tables:

*   **`User` & `UserRole`**: Manages backend logins. Linked to the `AppRole` enum (`ADMIN`). Passwords are encrypted using `bcryptjs` before insertion.
*   **`Country`**: Stores destinations (e.g., United Kingdom, Canada) along with description content, tuition range, highlights arrays, and list orders.
*   **`University`**: Represents partner colleges, linked via `countryId`. Includes name, tuition estimation, location, intakes list, and popular courses.
*   **`Lead`**: Collects student inquiries from public registration forms. Contains fields for general contacts, course desires, and IELTS exam scores. Classified by `LeadType` (`GENERAL`, `COURSE`, `TEST`, `SPECIAL`).
*   **`Announcement`**: Banner ticker announcements displayed at the top of the homepage.
*   **`Testimonial`**: Reviews from former students (name, university, review content, and student photo).
*   **`Scholarship`**: Info on grants (title, criteria, details, amount/image_url).
*   **`EnglishTest`**: Details of exams accepted (IELTS, TOEFL, Duolingo, etc.).
*   **`VisaApproval`**: Ticker data for recently approved visas (student name, country, university, visa date).

---

## 4. API Layer Architecture

### 🔒 Custom JWT Cookie Authentication
Authentication is managed via secure backend handlers:
-   **`/api/auth/login`**: Accepts administrator email and password, validates credentials against hashed entries, signs a JWT token, and writes it to an HttpOnly `admin_session` cookie.
-   **`/api/auth/signup`**: Standard administrator creation (disabled by default in production; handled via seeding).
-   **`/api/auth/logout`**: Deletes the `admin_session` cookie.
-   **`/api/auth/me`**: Read-only validation helper returning active session email payload to frontend layout hooks.

### 🛠️ Unified Generic CRUD Engine (`/api/admin/[table]`)
Instead of duplicating route code, a single dynamic controller handles all database table management:
-   **Path:** `src/app/api/admin/[table]/route.ts`
-   **Functionality:** Resolves tables dynamically from route params (`[table]`) mapping model contexts dynamically.
-   **Supported Actions:**
    -   `GET`: Fetches all records or single entries, translating camelCase columns into snake_case properties for clients.
    -   `POST`: Handles record insertion and supports bulk insertions for excel import arrays.
    -   `PUT`: Performs column updates.
    -   `DELETE`: Deletes single entries or accepts target lists for bulk deletions.

### 📤 Image Upload Controller (`/api/admin/upload`)
-   **Endpoint:** `/api/admin/upload` (POST)
-   **Operation:** Validates user authority, parses form payload files, writes data to the `/public/uploads` directory on disk, and returns the absolute path `/uploads/filename` for form storage.

---

## 5. Security & Robustness Implementation

1.  **SQL Injection Prevention:**
    All database communications occur via Prisma ORM using prepared statements. Inputs are parameter-validated automatically, neutralizing raw query injections.
2.  **Cross-Site Scripting (XSS) Blockers:**
    Strict headers are declared inside `next.config.ts` enforcing a Content Security Policy (CSP):
    -   Restricts scripts to `'self'` and trusted origins (e.g. YouTube frames).
    -   Forces safe inline style policies and blocks inline HTML code executions.
3.  **Session Hijacking Protections:**
    -   Authentication tokens are stored as **HttpOnly** cookies, preventing access from client scripts.
    -   The cookie is marked with `SameSite=Strict` and `Secure=true` (in production) to block Cross-Site Request Forgery (CSRF).
4.  **Clickjacking Protection:**
    `X-Frame-Options` is set to `SAMEORIGIN` to prevent clickjacking via nested frames.
5.  **MIME-Sniffing Defense:**
    `X-Content-Type-Options: nosniff` forces browsers to adhere strictly to server-provided content types.

---

## 6. How to Run & Maintain the Project

### Environment Prerequisites
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/cambry?schema=public"
NEXTAUTH_SECRET="your-32-character-secret-key-goes-here"
```

### Installation & Run Steps
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Generate Prisma client types:**
    ```bash
    npx prisma generate
    ```
3.  **Run Database Migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```
4.  **Seed Default Admin & Countries:**
    ```bash
    npx prisma db seed
    ```
5.  **Run Development Server:**
    ```bash
    npm run dev
    ```
6.  **Production Compile & Build Check:**
    ```bash
    npm run build
    ```

---

## 7. Extending the System
When adding a new CRUD view or database table:
1.  Add the model schema in `prisma/schema.prisma`.
2.  Run `npx prisma migrate dev --name add-new-model` to sync PostgreSQL.
3.  Map the model key inside the Generic CRUD API model map in `src/app/api/admin/[table]/route.ts`.
4.  Implement the UI in the admin layout using the general `<CrudPage />` container with relevant configurations.
