import { Request, Response } from "express";
import { BookingsService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

// Add Bookings
const addBookings = async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user as any;

  try {
    const result = await BookingsService.addBookings(payload);

    if (user.role === "customer") {
      payload.customer_id = user.id;
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

// Get Bookings
const getBookings = async(req:Request, res:Response) => {
  try {
    const user = req?.user;
    const result = await BookingsService.getBookings(user as JwtPayload);
    res.status(200).send(result?.rows)
  } catch (error:any) {
    res.status(404).send(error.message)
  }
}

// UPDATE Bookings
const updateBookings = async(req:Request, res:Response) => {
  try {
    const { bookingId } = req.params;
    const user = req?.user;
    const result = await BookingsService.updateBookings(user as JwtPayload, bookingId as string);
    res.status(200).send(result);
  } catch (error:any) {
    res.status(404).send(error.message)
  }
}

export const BookingsController = {
  addBookings,
  getBookings,
  updateBookings
};
