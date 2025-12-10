import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), VehiclesController.addVehicle)

export const VehiclesRoutes = router;j