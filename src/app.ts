import express from 'express';
import cors from 'cors';
import { initDB } from './config/db';
import { usersRoutes } from './modules/Users/users.routes';
import { authRoutes } from './modules/Auth/auth.routes';
import { VehiclesRoutes } from './modules/Vehicles/vehicles.routes';
import { BookingsRoutes } from './modules/Bookings/bookings.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", VehiclesRoutes);
app.use("/api/v1/bookings", BookingsRoutes);

// Initialize database
initDB();

export default app;