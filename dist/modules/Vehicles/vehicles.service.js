"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const db_1 = require("../../config/db");
const addVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`
        INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
    `, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`
        SELECT * FROM Vehicles
    `);
    return result;
};
const getSingleVehicle = async (id) => {
    const result = await db_1.pool.query(`
        SELECT * FROM Vehicles WHERE id=$1
    `, [id]);
    return result;
};
const updateVehicle = async (id, payload) => {
    payload.type = payload.type.toLowerCase();
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`
        UPDATE Vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
    `, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        id,
    ]);
    return result;
};
const deleteVehicle = async (id) => {
    // Check if vehicle exists
    const vehicleCheck = await db_1.pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [id]);
    if (vehicleCheck.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const bookings = await db_1.pool.query(`SELECT * FROM Bookings WHERE vehicle_id = $1`, [id]);
    const activeBooking = bookings.rows.find((b) => b.status === "active");
    if (activeBooking) {
        throw new Error("Cannot delete vehicle with active bookings");
    }
    // Delete the vehicle
    return await db_1.pool.query(`DELETE FROM Vehicles WHERE id = $1 RETURNING *`, [id]);
};
exports.VehiclesService = {
    addVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
