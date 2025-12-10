import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), VehiclesController.addVehicle);

router.get("/", VehiclesController.getVehicles);

router.get("/:vehicleId", VehiclesController.getSingleVehicle);

export const VehiclesRoutes = router;