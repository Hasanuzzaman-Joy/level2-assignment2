"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsRoutes = void 0;
const express_1 = require("express");
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// Add Bookings
router.post("/", (0, auth_1.auth)("admin", "customer"), bookings_controller_1.BookingsController.addBookings);
// GET Bookings
router.get("/", (0, auth_1.auth)("admin", "customer"), bookings_controller_1.BookingsController.getBookings);
// UPDATE Bookings
router.put("/:bookingId", (0, auth_1.auth)("admin", "customer"), bookings_controller_1.BookingsController.updateBookings);
exports.BookingsRoutes = router;
