import express, { Request, Response } from "express";
import { usersController } from "./users.controller";

const router = express.Router();

router.get("/", usersController.getUsers);

export const usersRoutes = router;