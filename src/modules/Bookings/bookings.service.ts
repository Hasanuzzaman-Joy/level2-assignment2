import { pool } from "../../config/db";

// ADD Bookings
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

// Get Bookings
const getBookings = async (user: Record<string, unknown>) => {
  if (user?.role === "admin") {
    return await pool.query(`
    SELECT * FROM Bookings
  `);
  } else if (user?.role === "customer") {
    const email = user.email;

    const matchId = await pool.query(
      `
      SELECT id FROM Users WHERE email=$1
    `,
      [email]
    );

    const { id } = matchId.rows[0];

    return await pool.query(
      `
    SELECT * FROM Bookings where customer_id=$1
  `,
      [id]
    );
  }
};

// UPDATE Bookings
const updateBookings = async (user: Record<string, unknown>, bookingId:string) => {
  await pool.query(`
    UPDATE Bookings
    SET status = 'returned'
    WHERE rent_end_date < NOW()
      AND status = 'active'
  `);

  await pool.query(`
    UPDATE Vehicles
    SET availability_status = 'available'
    WHERE id IN (
      SELECT vehicle_id FROM Bookings
      WHERE rent_end_date < NOW()
        AND status = 'returned'
    )
  `);

  // 1. Get booking info
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
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
  if(user.role === "customer"){
    if(user.id !== booking.customer_id){
      throw new Error("You are not allowed to update this booking");
    }

    if (now >= start) {
      throw new Error("You cannot cancel after the start date");
    }

    await pool.query(`
      UPDATE Bookings SET status='cancelled' WHERE id=$1
    `, [bookingId])

    await pool.query(`
      UPDATE Vehicles SET availability_status='available' WHERE id=$1
    `, [booking.vehicle_id])

    return { message: "Booking cancelled successfully" };
  }

  // ADMIN LOGIC
  if (user.role === "admin") {
    await pool.query(
      `UPDATE bookings SET status='returned' WHERE id=$1`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='available'
       WHERE id=$1`,
      [booking.vehicle_id]
    );

    return { message: "Vehicle marked as returned" };
  }

  throw new Error("Unauthorized role");
};

export const BookingsService = {
  addBookings,
  getBookings,
  updateBookings,
};
