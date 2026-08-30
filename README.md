# 🛍️ NEXUS E-Commerce — Full-Stack MERN E-Commerce Platform

![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-v24-green?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.19-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-sky?style=for-the-badge&logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Integration-purple?style=for-the-badge&logo=stripe)
![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)

A modern, production-grade full-stack e-commerce web application built using **React 19**, **Node.js**, **Express**, **MongoDB (Mongoose)**, **JWT Authentication**, and **Stripe Payment Processing**. 

Designed with a sleek **Glassmorphic UI**, responsive mobile navigation, dynamic catalog search/filters, dual-layer persistent shopping cart, customer order history, and an **Admin Control Panel** with sales revenue analytics.

---

## 📸 Key Showcase & Features

### 🛒 Customer Features
- 🔐 **JWT Authentication & Security**: Register and login with hashed passwords (`bcryptjs`). Stateless JWT verification stored in `localStorage` with header authorization guards.
- 🎨 **Glassmorphism UI**: Built with Tailwind CSS, custom gradient typography, sleek card overlays, and dark mode aesthetics.
- 🔍 **Dynamic Catalog**: Real-time search across product titles/descriptions, category filter pills (`Electronics`, `Accessories`, `Clothing`, `Home & Living`), and sorting (price asc/desc, top rating, newest arrival).
- 📦 **Product Details & Customer Reviews**: Image preview, stock status badge, star rating breakdown, interactive review submission form.
- 🛒 **Persistent Cart & Calculations**: Syncs guest cart with `localStorage` and automatically updates MongoDB for logged-in users. Live tax, free shipping progress bar ($100+ threshold), and promo code simulation (`NEXUS10` for $10 OFF).
- 💳 **Stripe Credit Card Payment**: Interactive payment widget with single-click **Autofill Test Card** (`4242 4242 4242 4242`) and order confirmation receipts.
- 📜 **User Profile & Orders**: Update profile details & shipping address; track past orders with live status badges (`Processing`, `Shipped`, `Delivered`).

### 🛡️ Admin Features
- 📊 **Sales Revenue Analytics**: Real-time KPI cards for Total Revenue ($), Total Customer Orders count, and Active Products inventory count.
- 📦 **Product CRUD Management**: Create new products with custom images, edit titles/prices/stock, and delete items.
- 🚚 **Order Fulfillment Control**: View all customer orders and dynamically update shipping status (`Processing` ➔ `Shipped` ➔ `Delivered`).

---

## 👤 Demo Credentials

For quick testing without creating a new account, use these pre-seeded credentials:

| Role | Email | Password | Allowed Access |
|---|---|---|---|
| 👤 **Customer** | `john@example.com` | `user123` | Catalog, Cart, Stripe Checkout, Order History |
| 🛡️ **Admin** | `admin@example.com` | `admin123` | Analytics Dashboard, Product CRUD, All Orders Fulfillment |

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 19 + Vite | Single Page Application framework with HMR |
| **Routing** | React Router v6 | Client-side routing with protected route guards |
| **State Management** | Context API | `AuthContext` and `CartContext` |
| **Styling** | Tailwind CSS | Utility-first CSS with glassmorphism design tokens |
| **Icons** | Lucide React | Modern vector icon set |
| **Backend** | Node.js + Express | RESTful API server |
| **Database** | MongoDB + Mongoose | Schema modeling + `MongoMemoryServer` automatic dev fallback |
| **Authentication** | JWT + bcryptjs | Secure password hashing & bearer token verification |
| **Payments** | Stripe API | Test card payment intent workflow |

---

## 📁 Directory Structure

```
E-commerce/
├── README.md                   # Repository Documentation
├── .gitignore                  # Git Ignore rules
├── server/
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   ├── server.js               # Express application entry point
│   ├── seed.js                 # Sample database seeder
│   ├── config/
│   │   └── db.js               # MongoDB connection + auto-seeding
│   ├── models/                 # Mongoose Schemas (User, Product, Cart, Order)
│   ├── middleware/             # Auth guards & error handlers
│   ├── controllers/            # REST API business logic
│   └── routes/                 # API endpoint routers
└── client/
    ├── package.json
    ├── vite.config.js          # Vite config with backend proxy
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx             # Main router component
        ├── index.css           # Tailwind CSS & global styles
        ├── services/api.js     # Axios instance with JWT interceptor
        ├── context/            # AuthContext & CartContext
        ├── components/         # Reusable UI components
        └── pages/              # Catalog, Cart, Checkout, Profile & Admin pages
```

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- NPM (v9.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/nexus-ecommerce.git
cd nexus-ecommerce
```

### 2. Backend Setup (`/server`)
```bash
cd server

# Install dependencies
npm install

# (Optional) Setup Environment File
cp .env.example .env

# Seed sample products and demo users into database
npm run seed

# Start Express Backend Server (runs on http://localhost:5000)
npm run dev
```
> 💡 *Note: If no `MONGO_URI` is provided in `.env`, the server automatically spins up an in-memory MongoDB server (`mongodb-memory-server`), requiring zero database installation!*

### 3. Frontend Setup (`/client`)
In a new terminal window:
```bash
cd client

# Install dependencies
npm install --legacy-peer-deps

# Start React Vite Dev Server (runs on http://localhost:3000)
npm run dev
```

Open **`http://localhost:3000`** in your browser!

---

## 📡 REST API Reference

### 🔐 Authentication
- `POST /api/auth/register` — Register new account
- `POST /api/auth/login` — Login & receive JWT token
- `GET /api/auth/profile` — Get current user profile (Protected)
- `PUT /api/auth/profile` — Update profile details & default address (Protected)

### 📦 Products
- `GET /api/products` — Fetch paginated products (`?keyword=`, `?category=`, `?sort=`, `?pageNumber=`)
- `GET /api/products/:id` — Fetch single product details
- `GET /api/products/categories` — Get distinct category names
- `POST /api/products` — Create product (Admin only)
- `PUT /api/products/:id` — Update product (Admin only)
- `DELETE /api/products/:id` — Delete product (Admin only)
- `POST /api/products/:id/reviews` — Submit star rating & review (Protected)

### 🛒 Cart & Orders
- `GET /api/cart` — Fetch DB cart for logged-in user (Protected)
- `POST /api/cart` — Sync cart array to DB (Protected)
- `POST /api/orders` — Create order & save payment result (Protected)
- `GET /api/orders/myorders` — Fetch customer's past orders (Protected)
- `GET /api/orders` — Fetch all orders & sales summary (Admin only)
- `PUT /api/orders/:id/status` — Update delivery status (Admin only)

---

## 💳 Stripe Test Card Instructions

To test checkout without a live credit card, use the following Stripe test credentials:
- **Card Number**: `4242 4242 4242 4242` *(or click the "Autofill Test Card" button on checkout)*
- **Expiry**: Any future date (e.g. `12/28`)
- **CVC**: Any 3 digits (e.g. `123`)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
