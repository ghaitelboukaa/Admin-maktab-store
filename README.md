<h1 align="center">🎒 Admin Maktab Store</h1>

<p align="center">
  A full-stack e-commerce platform for school supplies — featuring a React storefront and a powerful Laravel admin panel.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/PHP-8.1+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Laravel)](#backend-setup-laravel)
  - [Frontend Setup (React)](#frontend-setup-react)
- [API Overview](#-api-overview)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**Admin Maktab Store** is a complete e-commerce solution built for selling school and office supplies. It features:

- A **customer-facing storefront** (React + Vite) where users can browse products, filter by category, manage wishlists, rate products, and place orders.
- A **powerful admin panel** where administrators can manage products, categories, orders, special offers, and customer messages — all from a clean dashboard.

Authentication is handled via **Laravel Sanctum** with role-based access control (admin vs. client tokens).

---

## ✨ Features

### 🛍️ Customer Storefront
- Browse and search products (Books, Notebooks, School Supplies)
- Filter and sort by category, price, and rating
- Product rating & review system
- Shopping cart and checkout flow
- Personal wishlist / saved product lists
- Order tracking via user dashboard
- Contact & messaging system
- Special/discounted products section
- Google Maps integration on the Contact page

### 🔧 Admin Panel
- **Dashboard** with live sales statistics
- **Product Management** — Create, edit, delete products with images
- **Category Management** — Books, Notebooks, School Supplies
- **Order Management** — View and update order statuses
- **Special Offers** — Promote products with discount pricing
- **Message Center** — Read and manage customer messages
- **Admin Profile** — Update profile info, avatar, and password
- Role-based authentication (admin vs. client)

---

## 🛠️ Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Backend     | Laravel 10, PHP 8.1+, Laravel Sanctum          |
| Frontend    | React 18, React Router v6, Vite 5              |
| Database    | MySQL 8                                        |
| HTTP Client | Axios                                          |
| UI / UX     | Vanilla CSS, React Slick, React Range          |
| Maps        | Google Maps API (`@react-google-maps/api`)     |
| Dev Tools   | Laravel Breeze, Laravel Pint, PHPUnit, ESLint  |

---

## 📁 Project Structure

```
Admin_Maktab/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/        # API controllers (Products, Orders, Auth, etc.)
│   │   ├── Middleware/         # Auth & role middleware
│   │   └── Requests/           # Form request validation
│   └── Models/                 # Eloquent models (15 models)
│
├── database/
│   ├── migrations/             # 22 migration files
│   ├── seeders/
│   └── factories/
│
├── routes/
│   ├── api.php                 # All API routes
│   └── auth.php                # Authentication routes
│
├── frontend/                   # React (Vite) frontend
│   └── src/
│       ├── pages/
│       │   ├── admin/          # Admin panel pages
│       │   └── ...             # Customer storefront pages
│       ├── components/         # Reusable UI components
│       ├── context/            # React context (global state)
│       ├── layouts/            # Page layouts
│       └── router/             # React Router config
│
├── public/images/              # Product & admin images
├── .env.example
└── composer.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [PHP 8.1+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js 18+](https://nodejs.org/) & npm
- [MySQL 8](https://www.mysql.com/)
- A local server like [XAMPP](https://www.apachefriends.org/) or [Laragon](https://laragon.org/)

---

### Backend Setup (Laravel)

1. **Clone the repository**
   ```bash
   git clone https://github.com/ghaitelboukaa/Admin-maktab-store.git
   cd Admin-maktab-store
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Copy the environment file and configure it**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your database credentials:
   ```env
   DB_DATABASE=maktab_store
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. **Generate the application key**
   ```bash
   php artisan key:generate
   ```

5. **Run database migrations**
   ```bash
   php artisan migrate
   ```

6. **Seed the database** *(optional)*
   ```bash
   php artisan db:seed
   ```

7. **Create a storage symlink for images**
   ```bash
   php artisan storage:link
   ```

8. **Start the Laravel development server**
   ```bash
   php artisan serve
   ```
   > The API will be available at `http://localhost:8000`

---

### Frontend Setup (React)

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Configure the frontend environment**

   Create a `.env` file inside `frontend/`:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start the Vite dev server**
   ```bash
   npm run dev
   ```
   > The frontend will be available at `http://localhost:3000`

---

## 📡 API Overview

The API uses **Laravel Sanctum** for token-based authentication with role abilities.

| Method   | Endpoint                          | Description                | Access |
|----------|-----------------------------------|----------------------------|--------|
| `POST`   | `/api/register`                   | Register a new user        | Public |
| `POST`   | `/api/login`                      | Login (returns token)      | Public |
| `GET`    | `/api/getProducts`                | List all products           | Public |
| `GET`    | `/api/products/{id}`              | Get single product         | Public |
| `GET`    | `/api/CtegoryProducts/{id}`       | Products by category       | Public |
| `GET`    | `/api/top-rated-products`         | Top rated products         | Public |
| `GET`    | `/api/get-special-products`       | Special offers             | Public |
| `POST`   | `/api/create-products`            | Create a product           | Admin  |
| `PUT`    | `/api/update-products/{id}`       | Update a product           | Admin  |
| `DELETE` | `/api/delete-products/{id}`       | Delete a product           | Admin  |
| `GET`    | `/api/admin/orders`               | All orders (admin view)    | Admin  |
| `PUT`    | `/api/admin/orders/{id}`          | Update order status        | Admin  |
| `GET`    | `/api/client/orders`              | Authenticated user orders  | Client |
| `POST`   | `/api/orders`                     | Place an order             | Public |
| `GET`    | `/api/getlists`                   | Get wishlists              | Public |
| `POST`   | `/api/lists`                      | Create a wishlist          | Public |
| `GET`    | `/api/admin/messages`             | View messages              | Admin  |
| `POST`   | `/api/messages/send`              | Send a message             | Public |
| `GET`    | `/api/dashboard-stats`            | Dashboard statistics       | Admin  |
| `PUT`    | `/api/admin/profile/{id}`         | Update admin profile       | Admin  |

---

## 🗄️ Database Schema

Key models and their relationships:

```
Users          ──< Orders ──< OrderItems >── Products
Admins                                          │
Categories ──< Products >──< Lists             │
                │                               │
                ├── Books                    Ratings
                ├── Notebooks
                └── SchoolSupplies

TopProducts (links Products with special offers)
Payments   (linked to Orders)
Messages   (customer contact messages)
```

**Models:** `User`, `Admins`, `Products`, `Category`, `Book`, `Notebook`, `SchoolSupply`, `Order`, `OrderItem`, `Payment`, `Rating`, `Lists`, `ProductList`, `TopProducts`, `Message`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ghaitelboukaa">ghaitelboukaa</a>
</p>
