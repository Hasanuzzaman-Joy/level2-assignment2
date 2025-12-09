"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)("admin"), users_controller_1.usersController.getUsers);
exports.usersRoutes = router;
