import { pool } from "../../config/db";

// ADD bookings 
const addBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    // 1. Check vehicle exists
    const vehicleQuery = await pool.query(
      `
         SELECT * FROM Vehicles WHERE id=$1    
        `,
      [vehicle_id]
    );

    if (vehicleQuery.rows.length === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicle = vehicleQuery.rows[0];

    // 2. Check availability
    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available");
    }

    // 3. Validate dates
    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);

    if (end <= start) {
      throw new Error("End date must be after start date");
    }

    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    const total_price = days * Number(vehicle.daily_rent_price);

    // 4. Insert booking
    const bookingResult = await pool.query(
      `
      INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES($1, $2, $3, $4, $5, 'active')
      RETURNING *
    `,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    // 5. Update vehicle status
    await pool.query(
      "UPDATE vehicles SET availability_status='booked' WHERE id=$1",
      [vehicle_id]
    );

    return bookingResult;
};

export const BookingsService = {
  addBookings,
};
