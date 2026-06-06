# ₹ ExpenseTracker

Welcome to the **ExpenseTracker**! This is a lightning-fast web application built to help you track your money with zero friction.

---

## What is this app?

ExpenseTracker is a comprehensive, full-stack designed to give you complete visibility into your spending habits. Rather than relying on bulky spreadsheets or bloated mobile apps, this tool provides a sleek, keyboard-driven interface to log transactions instantly.

### How to use ExpenseTracker:

1. **Create an Account:** Start by registering securely. Your financial data is tied directly to your account and protected by JWT authentication.
2. **Log Transactions:** Use the global keyboard shortcut (`C` or `N`) from _anywhere_ in the application to immediately open the "Add Expense" modal. You can categorize your expenses (e.g., Food, Transport, Utilities) for better tracking.
3. **Analyze Spending:** Navigate to the Dashboard to view beautifully rendered, interactive charts that break down your spending by category over time.
4. **Filter and Search:** Use the dedicated Expenses page to search through your transaction history or filter by specific categories to see exactly where your money is going.
5. **Customize your Experience:** Toggle between Dark and Light mode using the theme switch in the top right corner.

---

## Uncompromising Performance Metrics

This project was engineered from the ground up with a singular focus on **absolute speed and microscopic bundle sizes**. Stripped away every unnecessary dependency to create an application that is shockingly lightweight.

- **Zero-Bloat CSS**: Used `0 KB` of external CSS frameworks (No Tailwind, No Material UI, No Bootstrap). The entire design system is built on pure CSS Custom Properties, resulting in near-instant paint times.
- **Microscopic Footprint**: By relying strictly on native web technologies and highly targeted libraries (like Lucide for SVGs instead of FontAwesome), the application's payload is drastically smaller than a typical React SPA.
- **Lighthouse Capabilities**: Built to achieve a flawless **100/100** score across Performance, Accessibility, Best Practices, and SEO.
- **Optimized Re-renders**: Minimized inline styles and utilized strict CSS classes for rendering efficiency, ensuring the UI remains perfectly fluid even on lower-end devices.
- **Accessibility (A11y)**: Fully WCAG 2.1 AA compliant. Includes `prefers-reduced-motion` media queries that gracefully degrade animations for users with vestibular sensitivities, and strictly enforced minimum touch targets (`44x44px`) for mobile interactivity.

---

## Robust Validation & Data Integrity

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

## Tech Stack: The "Why" behind the "What"

Every piece of technology in this stack had to earn its place. If a lighter, faster, or more natively-controlled alternative existed, we took it.

### Frontend

- **React.js (via Vite)**
  - _Why not Next.js?_ For a purely client-side authenticated dashboard, SSR adds unnecessary server-overhead and complexity. Vite provides instantaneous HMR and a blazing fast production build.
- **Pure Vanilla CSS Variables**
  - _Why not Tailwind CSS or Material UI?_ Component libraries like MUI ship with massive javascript bundles and enforce rigid design systems. Tailwind, while excellent, pollutes the DOM with class soup. By using pure CSS Custom Properties (Tokens), we maintain absolute pixel-perfect control over our design, ensure instant theming (Dark/Light mode), and keep the CSS bundle phenomenally small.
- **Lucide-React**
  - _Why not FontAwesome or Emojis?_ We explicitly removed all emojis because they render inconsistently across operating systems and look unprofessional. FontAwesome is heavy. Lucide provides incredibly crisp, lightweight SVG paths that inherit CSS `color` instantly.
- **Recharts**
  - _Why not Chart.js?_ Chart.js uses Canvas rendering. Recharts uses declarative React components rendering SVG, allowing us to perfectly bind our CSS design tokens (`var(--accent-color)`) directly to the charts.

### Backend

- **Node.js + Express + MongoDB (Mongoose)**
  - _Why not PostgreSQL + Prisma?_ For a simple financial ledger focused on raw read/write speed, the BSON document model maps perfectly to JSON on the frontend. The MERN stack allows a seamless, unified Javascript model from database to DOM.

---

## Project Structure & File Directory

To help navigate the project, here is the visual directory structure:

```
Expense Tracker/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── MonthlyChart.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── ToastContainer.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── hooks/
│   │   │   └── useExpenses.js
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ExpensesPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── app-layout.css
│   │   │   ├── auth.css
│   │   │   ├── components.css
│   │   │   ├── dashboard.css
│   │   │   ├── expenses.css
│   │   │   ├── landing.css
│   │   │   ├── layout.css
│   │   │   ├── toast.css
│   │   │   └── variables.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── expenseController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── Expense.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── expenses.js
│   │   ├── utils/
│   │   │   └── ApiError.js
│   │   └── server.js
│   ├── package.json
│   └── seed.js
├── vercel.json
└── README.md
```

### File Explanations

Here is a simple walkthrough of what every file does in plain terms:

### Root Configurations

- [vercel.json](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/vercel.json): The hosting deployment file. It maps web traffic to the frontend and backend correctly on Vercel.

### Client (React.js Frontend)

- **Root Files**:
  - [package.json](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/package.json): Lists the frontend helper libraries (like chart utilities) and commands to launch the website.
  - [vite.config.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/vite.config.js): The compiler configuration. It packages and optimizes frontend code for instant loading in a web browser.
  - [index.html](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/index.html): The base skeleton HTML document that connects Google fonts and loads our React codebase.
  - [src/main.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/main.jsx): The frontend ignition file. It initializes the React system and embeds it into the HTML page.
  - [src/App.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/App.jsx): The route controller. It tells the browser which page to display based on the URL (e.g. `/dashboard` vs `/expenses`).
  - [src/index.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/index.css): The central stylesheet import. It binds variables, layouts, and page styles into a single bundle.
- **Context & Hooks**:
  - [src/context/AuthContext.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/context/AuthContext.jsx): The login session manager. It tracks whether the user is logged in and securely stores their security token.
  - [src/context/ThemeContext.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/context/ThemeContext.jsx): Handles switching between Dark and Light mode, remembering the user's choice for their next visit.
  - [src/context/ToastContext.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/context/ToastContext.jsx): The pop-up warning manager, allowing any page to easily trigger success or error alerts.
  - [src/hooks/useExpenses.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/hooks/useExpenses.js): The data-fetching hook. It contacts the backend to query, search, filter, and page through transactions.
- **Components & Layouts**:
  - [src/layouts/AppLayout.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/layouts/AppLayout.jsx): The main application frame. It renders the sidebar navigation drawer and listens for hotkeys like `C` or `N`.
  - [src/components/ProtectedRoute.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/ProtectedRoute.jsx): The guard rail. It intercepts unauthenticated users and redirects them to the login page.
  - [src/components/Modal.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/Modal.jsx): A generic modal popup box with focus trap (useful for screen readers) and Escape key listening.
  - [src/components/ExpenseForm.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/ExpenseForm.jsx): The form inside the popup. It collects the title, amount, category, and date of a transaction.
  - [src/components/ExpenseTable.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/ExpenseTable.jsx): Renders user logs in a clear grid table view with edit/delete actions.
  - [src/components/MonthlyChart.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/MonthlyChart.jsx): An interactive chart module that draws visual Bar/Line charts using Recharts.
  - [src/components/StatCard.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/StatCard.jsx): Metric widgets showing summary totals (like Balance or Total Spending) with numbers that slide-pop when updated.
  - [src/components/ToastContainer.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/components/ToastContainer.jsx): Renders the active queue of screen alerts in the corner of the layout.
- **Pages & Services**:
  - [src/pages/LandingPage.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/pages/LandingPage.jsx): The intro landing screen featuring descriptions of our tool's capabilities.
  - [src/pages/LoginPage.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/pages/LoginPage.jsx): Sign-in page containing as-you-type input validation and a button to auto-fill review credentials.
  - [src/pages/RegisterPage.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/pages/RegisterPage.jsx): Registration page where a user creates their password and email records.
  - [src/pages/DashboardPage.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/pages/DashboardPage.jsx): Displays interactive charts, statistics cards, and recent history logs.
  - [src/pages/ExpensesPage.jsx](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/pages/ExpensesPage.jsx): The full transaction hub, offering pagination controls, search inputs, and category selectors.
  - [src/services/api.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/services/api.js): The central communications agent, adding authentication tokens and intercepting expired sessions.
- **Styles CSS**:
  - [src/styles/variables.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/variables.css): System variables defining colors, borders, font weights, and spacing configs.
  - [src/styles/layout.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/layout.css): Base utilities for laying out rows, grids, margins, and center alignments.
  - [src/styles/components.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/components.css): Global element stylings for buttons, badges, forms, and input inputs.
  - [src/styles/landing.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/landing.css): Dynamic background visuals, gradients, and layout options for the splash landing page.
  - [src/styles/app-layout.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/app-layout.css): Handles sidebar sizes and responsive navigation alignments.
  - [src/styles/auth.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/auth.css): Formatting rules for registration and login fields.
  - [src/styles/dashboard.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/dashboard.css): Stats card layout details.
  - [src/styles/expenses.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/expenses.css): Ledger grid styles.
  - [src/styles/toast.css](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/client/src/styles/toast.css): Notification transition and popup styles.

### Server (Express.js Backend)

- **Root Files**:
  - [package.json](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/package.json): Lists the server dependencies (like database drivers and logging tools) and start commands.
  - [seed.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/seed.js): Populates test transactions and user databases so reviewers can test data immediately.
  - [src/server.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/server.js): The central server runner. It loads files, attaches security frameworks, and binds database routes.
- **Config & Middleware**:
  - [src/config/db.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/config/db.js): Connects to the database and keeps pool states active across serverless restarts.
  - [src/config/env.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/config/env.js): Consolidates variables like JWT secrets and DB passwords securely.
  - [src/middleware/auth.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/middleware/auth.js): Inspects web request header tokens to authenticate credentials.
  - [src/middleware/errorHandler.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/middleware/errorHandler.js): Catches backend exceptions and formats them into clean API responses.
- **Models & Utilities**:
  - [src/models/User.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/models/User.js): Specifies how user records are structured and hashes user passwords securely.
  - [src/models/Expense.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/models/Expense.js): Defines parameters for saving transaction items, including text search indexes.
  - [src/utils/ApiError.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/utils/ApiError.js): Helper class structuring backend HTTP exception codes.
- **Routes & Controllers**:
  - [src/routes/auth.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/routes/auth.js): Maps requests to profile profiles and user login endpoints.
  - [src/routes/expenses.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/routes/expenses.js): Maps database operations (creating, deleting, or fetching transactions).
  - [src/controllers/authController.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/controllers/authController.js): Processes user login checks, matches password hashes, and registers users.
  - [src/controllers/expenseController.js](file:///C:/Users/kshre/OneDrive/Desktop/Expense%20Tracker/server/src/controllers/expenseController.js): Logic for creating, viewing, deleting, and updating database expenses, plus statistical math aggregation for dashboard widgets.

---

## 🔌 REST API Documentation

The backend of this project exposes a clean, standardized RESTful API. All endpoints are protected by JWT authentication (excluding registration and login).

### Authentication Endpoints (`/api/auth`)

| Method   | Endpoint             | Auth | Description                   | Request Body                                           | Response Example (200 OK / 201 Created)                                      |
| :------- | :------------------- | :--: | :---------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------- |
| **POST** | `/api/auth/register` |  ❌  | Create a new user account     | `{ "name": "...", "email": "...", "password": "..." }` | `{ "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }` |
| **POST** | `/api/auth/login`    |  ❌  | Verify credentials and log in | `{ "email": "...", "password": "..." }`                | `{ "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }` |
| **GET**  | `/api/auth/me`       |  🔑  | Retrieve active user profile  | _None_                                                 | `{ "id": "...", "name": "...", "email": "..." }`                             |

### Expense Management Endpoints (`/api/expenses`)

_Note: All endpoints below require a `Authorization: Bearer <JWT_TOKEN>` header._

| Method     | Endpoint              | Description                                          | Query Parameters                                                                                                      | Request Body                                                                                     | Response Example (200 OK)                                                                                                                       |
| :--------- | :-------------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET**    | `/api/expenses`       | Fetch paginated, search-filtered transaction lists   | `page` (default: 1)<br>`limit` (default: 10)<br>`search` (optional search filter)<br>`category` (optional tag filter) | _None_                                                                                           | `{ "expenses": [...], "pagination": { "page": 1, "limit": 10, "total": 25, "pages": 3 } }`                                                      |
| **GET**    | `/api/expenses/stats` | Fetch summary math and 6-month historical chart data | `month` (optional, format: `YYYY-MM`)                                                                                 | _None_                                                                                           | `{ "total": 23000, "monthTotal": 4500, "count": 25, "recentExpenses": [...], "monthlyData": [{"month": 6, "year": 2026, "total": 4500}, ...] }` |
| **POST**   | `/api/expenses`       | Add a new expense transaction                        | _None_                                                                                                                | `{ "title": "...", "amount": 120.50, "category": "food", "date": "YYYY-MM-DD", "notes": "..." }` | `{ "_id": "...", "title": "...", "amount": 120.50, "category": "food", "date": "...", "notes": "..." }`                                         |
| **GET**    | `/api/expenses/:id`   | Get details of a single expense by database ID       | _None_                                                                                                                | _None_                                                                                           | `{ "_id": "...", "title": "...", "amount": 120.50, "category": "food", ... }`                                                                   |
| **PUT**    | `/api/expenses/:id`   | Update an existing transaction record by ID          | _None_                                                                                                                | `{ "title": "...", "amount": 120.50, ... }`                                                      | `{ "_id": "...", "title": "...", "amount": 120.50, ... }`                                                                                       |
| **DELETE** | `/api/expenses/:id`   | Permanently delete a transaction by ID               | _None_                                                                                                                | _None_                                                                                           | `{ "message": "Expense deleted" }`                                                                                                              |

---

## Getting Started (Local Development)

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

Open a _new_ terminal:

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
