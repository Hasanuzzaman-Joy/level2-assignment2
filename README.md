# 🚗 Vehicle Rental System

A comprehensive backend API for managing vehicle rentals, bookings, and user authentication with role-based access control.

**Live Deployment:** https://assignment-2-xi-neon.vercel.app/

**GitHub Repository:** https://github.com/Hasanuzzaman-Joy/level2-assignment2

---

## ✨ Features

- **User Management**
  - User registration and authentication
  - Role-based access control (Admin & Customer)
  - Secure password hashing with bcrypt
  - JWT-based authentication

- **Vehicle Management**
  - CRUD operations for vehicles
  - Vehicle availability tracking
  - Support for multiple vehicle types (car, bike, van, SUV)
  - Admin-only vehicle management

- **Booking System**
  - Create and manage vehicle bookings
  - Automatic price calculation based on rental duration
  - Booking status management (active, cancelled, returned)
  - Automatic vehicle status updates
  - Role-based booking access

- **Security**
  - JWT token-based authentication
  - Password encryption
  - Protected API endpoints
  - Role-based authorization

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Development:** tsx (TypeScript execution)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone [Your GitHub Repo Link]
cd assignment-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_URL=postgresql://username:password@localhost:5432/vehicle_rental_db
JWT_SECRET=your_super_secret_jwt_key_here
```

**Note:** Replace the values with your actual database credentials and a strong JWT secret.

### 4. Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE vehicle_rental_db;
```

2. The database tables will be automatically created when you start the server for the first time.

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist` folder.

### 6. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
node dist/server.js
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

---

## 📖 Usage Instructions

### 1. Register a New User

**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "customer"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "result": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "customer"
  }
}
```

### 2. Login

**Endpoint:** `POST /api/v1/auth/signin`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 3. Using Protected Endpoints

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### 4. Example: Create a Booking

**Endpoint:** `POST /api/v1/bookings`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "vehicle_id": 1,
  "rent_start_date": "2025-12-10",
  "rent_end_date": "2025-12-15"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": 1,
    "customer_id": 1,
    "vehicle_id": 1,
    "rent_start_date": "2025-12-10",
    "rent_end_date": "2025-12-15",
    "total_price": 500.00,
    "status": "active"
  }
}
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user account |
| POST | `/api/v1/auth/signin` | Public | Login and receive JWT token |

### Vehicles

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/vehicles` | Admin only | Add new vehicle |
| GET | `/api/v1/vehicles` | Public | View all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | View specific vehicle |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin only | Update vehicle details |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin only | Delete vehicle |

### Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/users` | Admin only | View all users |
| PUT | `/api/v1/users/:userId` | Admin or Own | Update user profile |
| DELETE | `/api/v1/users/:userId` | Admin only | Delete user |

### Bookings

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/bookings` | Customer or Admin | Create new booking |
| GET | `/api/v1/bookings` | Role-based | View bookings (Admin: all, Customer: own) |
| PUT | `/api/v1/bookings/:bookingId` | Role-based | Update booking status |

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 3000 |
| `DB_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT token signing | Yes | - |

**Example `.env` file:**
```env
PORT=3000
DB_URL=postgresql://postgres:password@localhost:5432/vehicle_rental_db
JWT_SECRET=my_super_secret_jwt_key_change_this_in_production
```

---

## 🗄️ Database Schema

### Users Table
- `id` - Primary key (SERIAL)
- `name` - User's full name (VARCHAR, Required)
- `email` - User's email (VARCHAR, Unique, Required, Lowercase)
- `password` - Hashed password (VARCHAR, Min 6 characters)
- `phone` - User's phone number (VARCHAR, Required)
- `role` - User role: 'admin' or 'customer' (VARCHAR, Required)

### Vehicles Table
- `id` - Primary key (SERIAL)
- `vehicle_name` - Name of the vehicle (VARCHAR, Required)
- `type` - Vehicle type: 'car', 'bike', 'van', or 'SUV' (VARCHAR, Required)
- `registration_number` - Unique registration number (VARCHAR, Unique, Required)
- `daily_rent_price` - Daily rental price (NUMERIC, Required, Positive)
- `availability_status` - Status: 'available' or 'booked' (VARCHAR, Required)

### Bookings Table
- `id` - Primary key (SERIAL)
- `customer_id` - Foreign key to Users table (INT, Required)
- `vehicle_id` - Foreign key to Vehicles table (INT, Required)
- `rent_start_date` - Booking start date (DATE, Required)
- `rent_end_date` - Booking end date (DATE, Required, Must be after start date)
- `total_price` - Calculated total price (NUMERIC, Required, Positive)
- `status` - Booking status: 'active', 'cancelled', or 'returned' (VARCHAR, Required)

---

## 🔒 Authentication

### How It Works

1. **Registration/Login:** Users register or login via `/api/v1/auth/signup` or `/api/v1/auth/signin`
2. **Token Generation:** Upon successful login, a JWT token is generated and returned
3. **Token Usage:** Include the token in the `Authorization` header for protected endpoints:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
4. **Token Validation:** The middleware validates the token and checks user permissions
5. **Access Control:** Based on the user's role (admin/customer), access is granted or denied

### User Roles

- **Admin:** Full system access - can manage vehicles, users, and all bookings
- **Customer:** Can view vehicles, create bookings, and manage own bookings

---

## 📁 Project Structure

```
assignment-2/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── db.ts              # Database connection and initialization
│   │   └── index.ts           # Environment configuration
│   ├── middleware/
│   │   └── auth.ts            # JWT authentication middleware
│   ├── modules/
│   │   ├── Auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │   ├── Users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.routes.ts
│   │   ├── Vehicles/
│   │   │   ├── vehicles.controller.ts
│   │   │   ├── vehicles.service.ts
│   │   │   └── vehicles.routes.ts
│   │   └── Bookings/
│   │       ├── bookings.controller.ts
│   │       ├── bookings.service.ts
│   │       └── bookings.routes.ts
│   └── types/
│       └── express/
│           └── index.d.ts     # TypeScript type definitions
├── dist/                       # Compiled JavaScript files
├── package.json
├── tsconfig.json
├── vercel.json                 # Vercel deployment configuration
└── README.md
```

---

## 🧪 Testing the API

You can use tools like **Postman**, **Thunder Client**, or **curl** to test the API endpoints.

### Example: Using curl

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "role": "customer"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get all vehicles (Public endpoint):**
```bash
curl -X GET http://localhost:3000/api/v1/vehicles
```

---

## 📝 Notes

- All dates should be in `YYYY-MM-DD` format
- Email addresses are automatically converted to lowercase
- Passwords must be at least 6 characters long
- JWT tokens expire after 1 hour
- Vehicles cannot be deleted if they have active bookings
- Users cannot be deleted if they have active bookings
- Bookings automatically mark as "returned" when the end date passes

---

## 🤝 Contributing

This is an assignment project. For questions or issues, please contact the project maintainer.

---

## 👤 Author

Hasanuzzaman Joy

---

**Built with ❤️ using Node.js, TypeScript, and Express.js**

