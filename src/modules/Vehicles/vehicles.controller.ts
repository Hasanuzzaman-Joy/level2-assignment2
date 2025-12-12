import { Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";

const addVehicle = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const result = await VehiclesService.addVehicle(payload);
    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await VehiclesService.getVehicles();
    return res.status(200).json(result.rows);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await VehiclesService.getSingleVehicle(vehicleId);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  const payload = req.body;
  try {
    const result = await VehiclesService.updateVehicle(vehicleId, payload);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  try {
    const result = await VehiclesService.deleteVehicle(vehicleId as string);

    res.status(200).json({
        message: `Vehicle ${vehicleId} deleted successfully`,
        result: result.rows,
      });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

export const VehiclesController = {
  addVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
