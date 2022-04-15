import express from "express";
import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  updateBookingTopaid,
  cancelBooking,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addBooking).get(protect, getBookings);
router.route("/all").get(protect, admin, getAllBookings);

router
  .route("/:id")
  .delete(protect, deleteBooking)
  .get(protect, getBooking)
  .put(protect, admin, updateBooking);
router.route("/paid").put(protect, updateBookingTopaid);
router.route("/cancel").put(protect, cancelBooking);

export default router;
