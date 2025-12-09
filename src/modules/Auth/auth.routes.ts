import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// User Registration
router.post("/signup", authController.userRegisteration);

// User Login
router.post("/signin", authController.userLogin);

export const authRoutes = router;