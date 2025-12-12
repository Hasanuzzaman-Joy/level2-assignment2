"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const userRegisteration = async (req, res) => {
    const payload = req.body;
    try {
        const result = await auth_service_1.AuthService.userRegisteration(payload);
        res.status(201).json({
            message: "User registered successfully",
            result: result.rows[0]
        });
    }
    catch (error) {
        if (error.message && error.message.includes('duplicate key value')) {
            return res.status(400).json({
                message: "Email already exists",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const userLogin = async (req, res) => {
    const payload = req.body;
    try {
        const result = await auth_service_1.AuthService.userLogin(payload);
        return res.status(200).json({
            message: "User logged in successfully",
            token: result.token,
            user: result.user
        });
    }
    catch (error) {
        // Handle authentication errors with 401
        if (error.message === "User not found" || error.message === "Invalid password") {
            return res.status(401).json({
                message: "Invalid credentials",
                error: error.message
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.authController = {
    userRegisteration,
    userLogin
};
