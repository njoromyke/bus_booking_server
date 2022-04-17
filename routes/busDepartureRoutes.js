import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createBusDeparture, deleteBusDeparture, getBusesDeparture, updateBusDeparture } from "../controllers/busDepartureController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createBusDeparture)
  .get(protect, getBusesDeparture);

router
  .route("/:id")
  .delete(protect, admin, deleteBusDeparture)
  .put(protect, admin, updateBusDeparture);

export default router;
