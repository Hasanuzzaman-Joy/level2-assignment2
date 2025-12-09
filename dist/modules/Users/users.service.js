"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const db_1 = require("../../config/db");
const getUsers = async () => {
    const result = await db_1.pool.query("SELECT * FROM users");
    return result;
};
exports.usersService = {
    getUsers
};
