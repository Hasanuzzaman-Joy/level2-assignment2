"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// User Registration
const userRegisteration = async (payload) => {
    const { name, email, password, phone, role } = payload;
    // Ensure email is lowercase
    const lowerEmail = email.toLowerCase();
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
        INSERT INTO Users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *;
    `, [name, lowerEmail, hashedPassword, phone, role]);
    return result;
};
// User Login
const userLogin = async (payload) => {
    const { email, password } = payload;
    // Ensure email is lowercase for query
    const lowerEmail = email.toLowerCase();
    const user = await db_1.pool.query(`
        SELECT * FROM Users WHERE email = $1;
    `, [lowerEmail]);
    if (user.rows.length === 0) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, phone: user.rows[0].phone, role: user.rows[0].role }, config_1.default.Jwt_secret, { expiresIn: '1h' });
    return { token, user: user.rows[0] };
};
exports.AuthService = {
    userRegisteration,
    userLogin
};
