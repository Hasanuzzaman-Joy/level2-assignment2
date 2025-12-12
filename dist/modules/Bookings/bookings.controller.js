"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const bookings_service_1 = require("./bookings.service");
// Add Bookings
const addBookings = async (req, res) => {
    const payload = req.body;
    const user = req.user;
    try {
        // Set customer_id from token if user is customer, admin can specify in payload
        if (user.role === "customer") {
            payload.customer_id = user.id;
        }
        else if (user.role === "admin" && !payload.customer_id) {
            return res.status(400).json({
                message: "customer_id is required for admin bookings",
                error: "customer_id is required"
            });
        }
        const result = await bookings_service_1.BookingsService.addBookings(payload);
        res.status(201).json({
            message: "Booking created successfully",
            booking: result.rows[0],
        });
    }
    catch (error) {
        const statusCode = error.message.includes("not found") ? 404 :
            error.message.includes("not available") ? 400 : 400;
        res.status(statusCode).json({
            message: error.message || "Bad Request",
            error: error.message
        });
    }
};
// Get Bookings
const getBookings = async (req, res) => {
    try {
        const user = req?.user;
        const result = await bookings_service_1.BookingsService.getBookings(user);
        res.status(200).json(result?.rows);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
// UPDATE Bookings
const updateBookings = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const user = req?.user;
        const result = await bookings_service_1.BookingsService.updateBookings(user, bookingId);
        res.status(200).json(result);
    }
    catch (error) {
        const statusCode = error.message.includes("not found") || error.message.includes("not allowed") ? 404 :
            error.message.includes("cannot cancel") ? 400 : 500;
        res.status(statusCode).json({
            message: error.message || "Internal Server Error",
            error: error.message
        });
    }
};
exports.BookingsController = {
    addBookings,
    getBookings,
    updateBookings
};
