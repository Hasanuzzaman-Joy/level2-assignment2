"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const addVehicle = async (req, res) => {
    const payload = req.body;
    try {
        const result = await vehicles_service_1.VehiclesService.addVehicle(payload);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.VehiclesService.getVehicles();
        return res.status(200).json(result.rows);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const getSingleVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const result = await vehicles_service_1.VehiclesService.getSingleVehicle(vehicleId);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const updateVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    const payload = req.body;
    try {
        const result = await vehicles_service_1.VehiclesService.updateVehicle(vehicleId, payload);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const deleteVehicle = async (req, res) => {
    const { vehicleId } = req.params;
    try {
        const result = await vehicles_service_1.VehiclesService.deleteVehicle(vehicleId);
        res.status(200).json({
            message: `Vehicle ${vehicleId} deleted successfully`,
            result: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
exports.VehiclesController = {
    addVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
