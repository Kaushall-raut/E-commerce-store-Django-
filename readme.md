# 🛒 E-Commerce Website

A full-stack E-Commerce web application built using **React.js** for the frontend and **Django REST Framework** for the backend. The application provides authentication, product browsing, shopping cart management, and order placement functionality.

## 🚀 Features

- 🔐 JWT Authentication (Login & Registration)
- 👤 User Authentication & Authorization
- 🛍️ Product Listing
- 📦 Product Details
- 🛒 Shopping Cart
- ➕ Add to Cart
- ➖ Remove from Cart
- 🔄 Update Cart Quantity
- 💳 Order Placement
- 📂 Product Categories
- 📱 Responsive UI

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Context API
- Fetch API
- CSS

## Backend

- Django
- Django REST Framework
- Simple JWT
- Postgresql

---
---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/ecommerce-website.git

cd ecommerce-website
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Apply Migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Run Backend

```bash
python manage.py runserver
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Authentication

This project uses **JWT Authentication**.

### Login

```
POST /api/token/
```

### Refresh Token

```
POST /api/token/refresh/
```

Authorization Header

```
Authorization: Bearer <access_token>
```

---

# 📡 API Endpoints

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/<id>` | Get product details |

---

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` | Get all categories |

---

## Cart

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add product to cart |
| POST | `/api/cart/remove` | Remove cart item |
| POST | `/api/cart/update` | Update quantity |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/order/create` | Place order |

---

## User

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Register User |
| POST | `/api/token` | Login |
| POST | `/api/token/refresh` | Refresh JWT |








