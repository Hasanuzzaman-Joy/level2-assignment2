import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), VehiclesController.addVehicle);

router.get("/", VehiclesController.getVehicles);

router.get("/:vehicleId", VehiclesController.getSingleVehicle);

router.put("/:vehicleId", auth("admin"), VehiclesController.updateVehicle);

router.delete("/:vehicleId", auth("admin"), VehiclesController.deleteVehicle);

export const VehiclesRoutes = router;