"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const users_routes_1 = require("./modules/Users/users.routes");
const auth_routes_1 = require("./modules/Auth/auth.routes");
const vehicles_routes_1 = require("./modules/Vehicles/vehicles.routes");
const bookings_routes_1 = require("./modules/Bookings/bookings.routes");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/v1/users", users_routes_1.usersRoutes);
app.use("/api/v1/auth", auth_routes_1.authRoutes);
app.use("/api/v1/vehicles", vehicles_routes_1.VehiclesRoutes);
app.use("/api/v1/bookings", bookings_routes_1.BookingsRoutes);
// Initialize database
(0, db_1.initDB)();
exports.default = app;
