# 🛒 QuickCart - E-Commerce Shopping Platform

QuickCart is a full-stack e-commerce shopping application inspired by modern quick-commerce platforms like Zepto and Blinkit.

It allows users to browse products, explore categories, create an account, login securely, manage their cart and wishlist, and place orders.

The application is built using React.js, Spring Boot, and PostgreSQL and is deployed using Vercel and Render.

---

## 🚀 Live Demo

### Frontend
https://quickcart-frontend-inky.vercel.app/

### Backend API
https://quickcart-mart.onrender.com

### GitHub Repository
https://github.com/Sakshirwt15/quickcart-mart

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login
- JWT-based authentication
- Secure password encryption
- Protected routes

### 🛍️ Products
- Browse products
- View product details
- Browse products by category
- Product search
- Product stock management

### 🛒 Shopping Cart
- Add products to cart
- Increase/decrease quantity
- Remove products from cart
- View cart total

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View wishlist items

### 📦 Orders
- Place orders
- View order details
- Order management

### 🔐 Security
- JWT authentication
- Spring Security
- Role-based authorization
- Protected APIs
- CORS configuration

### 📱 UI
- Responsive design
- Mobile-friendly interface
- Modern e-commerce layout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- React Router
- Axios
- Vite
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT

### Database
- PostgreSQL

### Deployment
- Vercel - Frontend
- Render - Backend
- Render PostgreSQL - Database

### Tools
- Git
- GitHub
- VS Code
- Maven

---

## 🏗️ Project Structure

```text
QuickCart
│
├── backend
│   ├── src
│   │   └── main
│   │       └── java
│   │           └── backend
│   │               ├── config
│   │               ├── controller
│   │               ├── entity
│   │               ├── repository
│   │               ├── service
│   │               └── BackendApplication.java
│   │
│   ├── .mvn
│   ├── pom.xml
│   ├── mvnw
│   └── Dockerfile
│
└── quickcart-frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── public
    ├── package.json
    ├── vite.config.js
    └── index.html

Application Architecture

User
  │
  ▼
React Frontend
  │
  │ Axios / REST API
  ▼
Spring Boot Backend
  │
  │ Spring Data JPA / Hibernate
  ▼
PostgreSQL Database


⚙️ Local Installation
1. Clone the Repository
git clone https://github.com/Sakshirwt15/quickcart-mart.git
cd quickcart-mart
🖥️ Backend Setup
2. Open Backend
cd backend
3. Configure PostgreSQL

Create a PostgreSQL database named:

quickcart

Configure the database in:

src/main/resources/application.properties

Example:

spring.datasource.url=jdbc:postgresql://localhost:5432/quickcart
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

Never commit real database passwords or secrets to GitHub.

4. Run Backend

For Windows:

.\mvnw.cmd spring-boot:run

For Linux/Mac:

./mvnw spring-boot:run

Backend runs on:

http://localhost:8080
🌐 Frontend Setup
5. Open Frontend

From the project root:

cd quickcart-frontend
6. Install Dependencies
npm install
7. Configure API URL

Create a .env file inside:

quickcart-frontend/.env

For local development:

VITE_API_URL=http://localhost:8080/api

For production:

VITE_API_URL=https://quickcart-mart.onrender.com/api
8. Start Frontend
npm run dev

Frontend runs on:

http://localhost:5173
📡 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Products
GET /api/products
GET /api/products/{id}
Categories
GET /api/categories
Cart
GET /api/cart
POST /api/cart
Wishlist
GET /api/wishlist
☁️ Deployment
Frontend - Vercel

The React frontend is deployed using Vercel.

Production URL:

https://quickcart-frontend-inky.vercel.app/

Environment variable:

VITE_API_URL=https://quickcart-mart.onrender.com/api
Backend - Render

The Spring Boot backend is deployed using Render.

Backend URL:

https://quickcart-mart.onrender.com

Database

PostgreSQL is used as the application's database and is hosted through Render.

🔒 Environment Variables

Sensitive credentials should never be committed to GitHub.

Frontend
VITE_API_URL
Backend
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
📊 Current Database

The deployed application currently contains:

50 Products
8 Categories
🔮 Future Improvements
📍 Location detection
🗺️ Location mapping
🏠 Delivery address management
🚚 Delivery tracking
💳 Online payment integration
🔎 Advanced search and filters
🧾 Order history
⭐ Product reviews and ratings
🔔 Notifications
🏪 Store/location-based inventory
👨‍💼 Admin dashboard
📦 Inventory management
🎟️ Coupons and discounts
📱 PWA/mobile application
🤖 Personalized product recommendations
🧪 Testing
Backend Tests
./mvnw test
Frontend Build
npm run build
👩‍💻 Author
Sakshi Rawat

GitHub:
https://github.com/Sakshirwt15

LinkedIn:
https://www.linkedin.com/in/sakshi-rawat-035321321/

⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.
