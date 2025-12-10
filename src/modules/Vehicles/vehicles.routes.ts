import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), VehiclesController.addVehicle);

router.get("/", VehiclesController.getVehicles);

export const VehiclesRoutes = router;