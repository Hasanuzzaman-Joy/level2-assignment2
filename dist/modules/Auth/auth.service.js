"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegisteration = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
        INSERT INTO Users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *;
    `, [name, email, hashedPassword, phone, role]);
    return result;
};
exports.AuthService = {
    userRegisteration
};
