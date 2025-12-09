import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.userRegisteration);

// router.post("/signin", async(req:Request, res:Response) => {
//     res.send("User registration");
// });

export const authRoutes = router;