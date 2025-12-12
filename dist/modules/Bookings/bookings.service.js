"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const db_1 = require("../../config/db");
// ADD Bookings
const addBookings = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    // 1. Check vehicle exists
    const vehicleQuery = await db_1.pool.query(`
         SELECT * FROM Vehicles WHERE id=$1    
        `, [vehicle_id]);
    if (vehicleQuery.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const vehicle = vehicleQuery.rows[0];
    // 2. Check availability
    if (vehicle.availability_status !== "available") {
        throw new Error("Vehicle is not available");
    }
    // 3. Validate dates
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    if (end <= start) {
        throw new Error("End date must be after start date");
    }
    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const total_price = days * Number(vehicle.daily_rent_price);
    // 4. Insert booking
    const bookingResult = await db_1.pool.query(`
      INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES($1, $2, $3, $4, $5, 'active')
      RETURNING *
    `, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);
    // 5. Update vehicle status
    await db_1.pool.query("UPDATE Vehicles SET availability_status='booked' WHERE id=$1", [vehicle_id]);
    return bookingResult;
};
// Get Bookings
const getBookings = async (user) => {
    if (user?.role === "admin") {
        return await db_1.pool.query(`
    SELECT * FROM Bookings
  `);
    }
    else if (user?.role === "customer") {
        // Use id directly from token instead of querying by email
        const customerId = user.id;
        return await db_1.pool.query(`
    SELECT * FROM Bookings WHERE customer_id=$1
  `, [customerId]);
    }
    throw new Error("Unauthorized");
};
// UPDATE Bookings
const updateBookings = async (user, bookingId) => {
    // Auto-mark expired bookings as returned
    await db_1.pool.query(`
    UPDATE Bookings
    SET status = 'returned'
    WHERE rent_end_date < CURRENT_DATE
      AND status = 'active'
  `);
    await db_1.pool.query(`
    UPDATE Vehicles
    SET availability_status = 'available'
    WHERE id IN (
      SELECT vehicle_id FROM Bookings
      WHERE rent_end_date < CURRENT_DATE
        AND status = 'returned'
    )
  `);
    // 1. Get booking info
    const bookingRes = await db_1.pool.query(`SELECT * FROM Bookings WHERE id = $1`, [
        bookingId,
    ]);
    if (bookingRes.rowCount === 0) {
        throw new Error("Booking not found");
    }
    const booking = bookingRes.rows[0];
    const now = new Date();
    const start = new Date(booking.rent_start_date);
    const end = new Date(booking.rent_end_date);
    // CUSTOMER LOGIC
    if (user.role === "customer") {
        if (user.id !== booking.customer_id) {
            throw new Error("You are not allowed to update this booking");
        }
        if (now >= start) {
            throw new Error("You cannot cancel after the start date");
        }
        await db_1.pool.query(`
      UPDATE Bookings SET status='cancelled' WHERE id=$1
    `, [bookingId]);
        await db_1.pool.query(`
      UPDATE Vehicles SET availability_status='available' WHERE id=$1
    `, [booking.vehicle_id]);
        return { message: "Booking cancelled successfully" };
    }
    // ADMIN LOGIC
    if (user.role === "admin") {
        await db_1.pool.query(`UPDATE Bookings SET status='returned' WHERE id=$1`, [bookingId]);
        await db_1.pool.query(`UPDATE Vehicles SET availability_status='available'
       WHERE id=$1`, [booking.vehicle_id]);
        return { message: "Vehicle marked as returned" };
    }
    throw new Error("Unauthorized role");
};
exports.BookingsService = {
    addBookings,
    getBookings,
    updateBookings,
};
