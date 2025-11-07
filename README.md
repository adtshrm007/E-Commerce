# 🛒 MERN Shopping Cart & Checkout System

A fully functional **MERN Stack** (MongoDB, Express, React, Node.js) project that allows users to browse products, add items to a shopping cart, view cart contents, and proceed to checkout.  

This project demonstrates how to build a full-stack **e-commerce workflow** with proper frontend–backend communication using RESTful APIs, state management, and database integration.

---

## 📜 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Backend Design](#-backend-design)
  - [Models](#models)
  - [Controllers](#controllers)
  - [Routes](#routes)
- [Frontend Design](#-frontend-design)
  - [Cart Page](#cart-page)
  - [Order Page](#order-page)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [License](#-license)

---

## 🧠 Overview

This application mimics a real-world shopping experience:
1. Products are fetched from MongoDB.
2. A user can add products to a cart.
3. The cart displays all selected products with prices and quantities.
4. Checkout creates a new order and clears the cart.
5. Orders can then be viewed separately on an **Orders Page**.

It serves as a great starting point for building full-scale e-commerce platforms with user authentication, Stripe/Razorpay payments, and inventory management.

---

## ✨ Features

### 🔹 Frontend
- Dynamic product rendering with React
- Fetches cart details from backend APIs
- Displays individual item subtotals and total price
- Handles empty-cart and loading states gracefully
- Checkout functionality integrated with backend API
- Uses **Tailwind CSS** for a modern, responsive UI
- Built with React Hooks (`useState`, `useEffect`) and `axios` for HTTP requests

### 🔹 Backend
- Modular structure with `controllers`, `models`, and `routes`
- Handles product management, cart operations, and checkout
- Uses **Mongoose** for database interaction
- Returns meaningful API responses with HTTP status codes
- Includes input validation and error handling

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| State Management | React Hooks |
| API Format | RESTful JSON |
| Build Tools | Vite (Frontend), Nodemon (Backend) |

---

## 🏗 System Architecture


### Request Flow Example:
1. User adds item to cart → Frontend calls `/api/cart/addToCart`.
2. Server updates the cart document in MongoDB.
3. User clicks "Proceed to Checkout" → `/api/cart/checkOut` is triggered.
4. Backend creates an order, empties the cart, and responds with confirmation.
5. User is redirected to `/order` page.



