import express, { Request, Response } from "express";
import { usersController } from "./users.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), usersController.getUsers);

export const usersRoutes = router;