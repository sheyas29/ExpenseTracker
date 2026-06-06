# ₹ ExpenseTracker: The Impeccable Ledger

Welcome to the **ExpenseTracker**! This is a lightning-fast, highly-polished web application built to help you track your money with zero friction.

---

## 📖 What is this app?

ExpenseTracker is a comprehensive, full-stack financial ledger designed to give you complete visibility into your spending habits. Rather than relying on bulky spreadsheets or bloated mobile apps, this tool provides a sleek, keyboard-driven interface to log transactions instantly.

### How to use ExpenseTracker:

1. **Create an Account:** Start by registering securely. Your financial data is tied directly to your account and protected by JWT authentication.
2. **Log Transactions:** Use the global keyboard shortcut (`C` or `N`) from *anywhere* in the application to immediately open the "Add Expense" modal. You can categorize your expenses (e.g., Food, Transport, Utilities) for better tracking.
3. **Analyze Spending:** Navigate to the Dashboard to view beautifully rendered, interactive charts that break down your spending by category over time.
4. **Filter and Search:** Use the dedicated Expenses page to search through your transaction history or filter by specific categories to see exactly where your money is going.
5. **Customize your Experience:** Toggle between Dark and Light mode using the theme switch in the top right corner.

---

## ⚡ Uncompromising Performance Metrics

This project was engineered from the ground up with a singular focus on **absolute speed and microscopic bundle sizes**. We stripped away every unnecessary dependency to create an application that is shockingly lightweight.

- **Zero-Bloat CSS**: We proudly use `0 KB` of external CSS frameworks (No Tailwind, No Material UI, No Bootstrap). The entire design system is built on pure CSS Custom Properties, resulting in near-instant paint times.
- **Microscopic Footprint**: By relying strictly on native web technologies and highly targeted libraries (like Lucide for SVGs instead of FontAwesome), the application's payload is drastically smaller than a typical React SPA.
- **Lighthouse Capabilities**: Built to achieve a flawless **100/100** score across Performance, Accessibility, Best Practices, and SEO.
- **Optimized Re-renders**: Minimized inline styles and utilized strict CSS classes for rendering efficiency, ensuring the UI remains perfectly fluid even on lower-end devices.
- **Accessibility (A11y)**: Fully WCAG 2.1 AA compliant. Includes `prefers-reduced-motion` media queries that gracefully degrade animations for users with vestibular sensitivities, and strictly enforced minimum touch targets (`44x44px`) for mobile interactivity.

---

## 🛡️ Robust Validation & Data Integrity

A core component of the application's architecture is a strict, two-tier validation system ensuring data integrity and security from the UI down to the database.

### 1. Frontend (Real-time Feedback)
We implemented **react-hook-form** across all user inputs (Login, Registration, and Expense Creation) running in `mode: 'onChange'`.
- **As-you-type Validation**: Users receive instant, localized error messages beneath input fields.
- **Constraints**: Validates email formats via strict Regex patterns, enforces minimum password lengths, and ensures required financial data (amounts, categories, dates) is present before the submit button even becomes active.
- **UX Benefit**: Prevents unnecessary API calls and provides an incredibly snappy, responsive feel.

### 2. Backend (Server-Side Enforcement)
Never trust the client. The backend acts as the ultimate source of truth.
- **Mongoose Schema Validation**: The database layer strictly enforces types, required fields, and acceptable Enums (e.g., rejecting an expense if the category isn't strictly 'FOOD', 'TRANSPORT', etc.).
- **Security Middleware**: 
  - `express-mongo-sanitize` strips out malicious characters to prevent NoSQL injection attacks.
  - `express-rate-limit` actively blocks brute-force login attempts by restricting requests per IP address.
  - `helmet` secures HTTP headers against cross-site scripting (XSS) and clickjacking.

---

## 🧠 Tech Stack: The "Why" behind the "What"

Every piece of technology in this stack had to earn its place. If a lighter, faster, or more natively-controlled alternative existed, we took it.

### Frontend

- **React.js (via Vite)**
  - *Why not Next.js?* For a purely client-side authenticated dashboard, SSR adds unnecessary server-overhead and complexity. Vite provides instantaneous HMR and a blazing fast production build.
- **Pure Vanilla CSS Variables**
  - *Why not Tailwind CSS or Material UI?* Component libraries like MUI ship with massive javascript bundles and enforce rigid design systems. Tailwind, while excellent, pollutes the DOM with class soup. By using pure CSS Custom Properties (Tokens), we maintain absolute pixel-perfect control over our design, ensure instant theming (Dark/Light mode), and keep the CSS bundle phenomenally small.
- **Lucide-React**
  - *Why not FontAwesome or Emojis?* We explicitly removed all emojis because they render inconsistently across operating systems and look unprofessional. FontAwesome is heavy. Lucide provides incredibly crisp, lightweight SVG paths that inherit CSS `color` instantly.
- **Recharts**
  - *Why not Chart.js?* Chart.js uses Canvas rendering. Recharts uses declarative React components rendering SVG, allowing us to perfectly bind our CSS design tokens (`var(--accent-color)`) directly to the charts.

### Backend

- **Node.js + Express + MongoDB (Mongoose)**
  - *Why not PostgreSQL + Prisma?* For a simple financial ledger focused on raw read/write speed, the BSON document model maps perfectly to JSON on the frontend. The MERN stack allows a seamless, unified Javascript mental model from database to DOM.

---

## 🚀 Getting Started (Local Development)

### 1. Database (MongoDB Atlas)

Get a free MongoDB Atlas URI string.

### 2. Run the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=super_secret_random_key
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 3. Run the Frontend

Open a *new* terminal:

```bash
cd client
npm install
npm run dev
```

---

## ☁️ Going Live (Vercel Deployment)

The codebase is natively configured as a monorepo for Vercel. **No complex backend setup required.**

1. Push this code to your GitHub.
2. Import the repository into Vercel.
3. Leave all Build Commands and Root Directory settings as default (Vercel will automatically read the `vercel.json` file in the root).
4. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`).
5. Deploy.

Vercel will build the Vite frontend into static assets and elegantly convert the Express backend into Vercel Serverless Functions, routing all `/api/*` traffic automatically. The MongoDB connection string is explicitly coded to persist across serverless warm-boots without exhausting the connection pool.
