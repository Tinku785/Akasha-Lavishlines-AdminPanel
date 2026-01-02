import express from "express";
import { createBooking, getBookings, updateBooking, deleteBooking } from "../controllers/bookingController.js";
import protect from "../middleware/authMiddleware.js";
import { validateBooking, validateBookingUpdate, handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router(); // ✅ FIRST declare router

// 🔐 Protected booking routes
router.post("/", protect, validateBooking, handleValidationErrors, createBooking);
router.get("/", protect, getBookings);
router.put("/:id", protect, validateBookingUpdate, handleValidationErrors, updateBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
