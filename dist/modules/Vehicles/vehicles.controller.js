"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const addVehicle = async (req, res) => {
    const payload = req.body;
    try {
        const result = await vehicles_service_1.VehiclesService.addVehicle(payload);
        return res.status(201).send(result.rows[0]);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.VehiclesService.getVehicles();
        return res.status(201).send(result.rows);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.VehiclesController = {
    addVehicle,
    getVehicles
};
