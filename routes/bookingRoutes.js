import express from "express";
import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(addBooking).get(protect, admin, getBookings);

router
  .route("/:id")
  .delete(protect, admin, deleteBooking)
  .get(protect, getBooking)
  .put(protect, admin, updateBooking);

export default router;
