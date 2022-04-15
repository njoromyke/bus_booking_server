import express from "express";
import {
  callback,
  getPayments,
  getPayment,
  createPayment,
  updatePaymentToPaid,
  updatePaymentToCancelled,
  getAllPayments,
} from "../controllers/paymentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createPayment).get(protect, getPayments);
router.route("/all").get(protect, admin, getAllPayments);
router.route("/callback").post(callback);
router.route("/updateToPaid/:id").put(protect, updatePaymentToPaid);
router.route("/updateToCancelled/:id").put(protect, updatePaymentToCancelled);
// .get(protect, admin, getPayments);

router.route("/:id").get(protect, getPayment);

export default router;
