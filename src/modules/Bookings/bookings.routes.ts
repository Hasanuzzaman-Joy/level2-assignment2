import { Router } from "express";
import { BookingsController } from "./bookings.controller";
import { auth } from "../../middleware/auth";

const router = Router();

// Add Bookings
router.post("/", auth("admin", "customer"), BookingsController.addBookings)

// GET Bookings
router.get("/", auth("admin", "customer"), BookingsController.getBookings)

// UPDATE Bookings
router.put("/:bookingId", auth("admin", "customer"), BookingsController.updateBookings)

export const BookingsRoutes = router;