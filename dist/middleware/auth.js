"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token missing" });
        }
        // Extract token from "Bearer <token>" format
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.Jwt_secret);
            req.user = decoded;
            if (roles.length > 0 && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden: You don't have enough permissions" });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
exports.auth = auth;
