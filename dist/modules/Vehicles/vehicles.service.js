"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const db_1 = require("../../config/db");
const addVehicle = async (payload) => {
    const { id, vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`
        INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
    `, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`
        SELECT * FROM Vehicles
    `);
    return result;
};
exports.VehiclesService = {
    addVehicle,
    getVehicles
};
