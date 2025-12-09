"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.authController.userRegisteration);
// router.post("/signin", async(req:Request, res:Response) => {
//     res.send("User registration");
// });
exports.authRoutes = router;
