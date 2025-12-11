import { Request, Response } from "express";
import { BookingsService } from "./bookings.service";

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

export const BookingsController = {
  addBookings,
};
