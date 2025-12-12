import { Request, Response } from "express";
import { BookingsService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

// Add Bookings
const addBookings = async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user as JwtPayload;

  try {
    // Set customer_id from token if user is customer, admin can specify in payload
    if (user.role === "customer") {
      payload.customer_id = user.id;
    } else if (user.role === "admin" && !payload.customer_id) {
      return res.status(400).json({ 
        message: "customer_id is required for admin bookings",
        error: "customer_id is required" 
      });
    }

    const result = await BookingsService.addBookings(payload);

    res.status(201).json({
      message: "Booking created successfully",
      booking: result.rows[0],
    });
  } catch (error: any) {
    const statusCode = error.message.includes("not found") ? 404 : 
                       error.message.includes("not available") ? 400 : 400;
    res.status(statusCode).json({ 
      message: error.message || "Bad Request",
      error: error.message 
    });
  }
};

// Get Bookings
const getBookings = async(req:Request, res:Response) => {
  try {
    const user = req?.user;
    const result = await BookingsService.getBookings(user as JwtPayload);
    res.status(200).json(result?.rows);
  } catch (error:any) {
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
}

// UPDATE Bookings
const updateBookings = async(req:Request, res:Response) => {
  try {
    const { bookingId } = req.params;
    const user = req?.user;
    const result = await BookingsService.updateBookings(user as JwtPayload, bookingId as string);
    res.status(200).json(result);
  } catch (error:any) {
    const statusCode = error.message.includes("not found") || error.message.includes("not allowed") ? 404 : 
                       error.message.includes("cannot cancel") ? 400 : 500;
    res.status(statusCode).json({ 
      message: error.message || "Internal Server Error",
      error: error.message 
    });
  }
}

export const BookingsController = {
  addBookings,
  getBookings,
  updateBookings
};
