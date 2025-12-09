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
            result: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.authController = {
    userRegisteration
};
