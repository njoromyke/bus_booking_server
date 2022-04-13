import express from "express";
import {
  callback,
  getPayments,
  getPayment,
  createPayment,
} from "../controllers/paymentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/callback").post(callback);
router.route("/").get(createPayment);
// .get(protect, admin, getPayments);

router.route("/:id").get(protect, getPayment);

export default router;
