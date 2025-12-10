import express from 'express';
import { initDB } from './config/db';
import { usersRoutes } from './modules/Users/users.routes';
import { authRoutes } from './modules/Auth/auth.routes';
import { VehiclesRoutes } from './modules/Vehicles/vehicles.routes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 

// Use the users routes
app.use("/api/v1/users", usersRoutes);

// Use the auth routes
app.use("/api/v1/auth", authRoutes)

// Use the auth routes
app.use("/api/v1/vehicles", VehiclesRoutes)

initDB();

export default app;