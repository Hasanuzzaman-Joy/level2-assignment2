import express, { Request, Response } from "express";
import { usersController } from "./users.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), usersController.getUsers);

router.put("/:userId", auth("admin", "customer"), usersController.updateUser);

router.delete("/:userId", auth("admin"), usersController.deleteUser);

export const usersRoutes = router;