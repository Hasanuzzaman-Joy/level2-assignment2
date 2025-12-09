"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const users_service_1 = require("./users.service");
const getUsers = async (req, res) => {
    const result = await users_service_1.usersService.getUsers();
    try {
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.usersController = {
    getUsers,
};
