"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const users_service_1 = require("./users.service");
// Get users
const getUsers = async (req, res) => {
    const result = await users_service_1.usersService.getUsers();
    try {
        return res.status(200).json(result.rows);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
// Update User
const updateUser = async (req, res) => {
    const paramId = req.params.userId;
    const payload = req.body;
    const { role, id: tokenUserId } = req.user;
    try {
        const result = await users_service_1.usersService.updateUser(paramId, payload, role, tokenUserId);
        res.status(200).json({ message: `User ${paramId} updated successfully`, result: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
exports.usersController = {
    getUsers,
    updateUser
};
