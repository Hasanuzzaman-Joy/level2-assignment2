"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const users_routes_1 = require("./modules/Users/users.routes");
const auth_routes_1 = require("./modules/Auth/auth.routes");
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Use the users routes
app.use("/api/v1/users", users_routes_1.usersRoutes);
// Use the auth routes
app.use("/api/v1/auth", auth_routes_1.authRoutes);
(0, db_1.initDB)();
exports.default = app;
