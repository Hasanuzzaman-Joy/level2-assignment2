"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const db_1 = require("../../config/db");
//Get Users
const getUsers = async () => {
    const result = await db_1.pool.query("SELECT * FROM users");
    return result;
};
// Update User
const updateUser = async (userId, payload, userRole, tokenUserId) => {
    const { name, email, phone, role } = payload;
    if (userRole === "admin") {
        return await db_1.pool.query("UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *", [name, email, phone, role, userId]);
    }
    else if (userRole === "customer") {
        if (userId.toString() !== tokenUserId.toString()) {
            throw new Error("Customers can only update their own profile");
        }
        return await db_1.pool.query("UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING name, email, phone, role", [name, phone, userId]);
    }
    throw new Error("Unauthorized role");
};
exports.usersService = {
    getUsers,
    updateUser,
};
