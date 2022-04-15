import express from "express";
import {
  getBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
  getAvailableBuses,
  updateBusSeatToBooked,
  setAllBusSeatsToAvailable,
} from "../controllers/busController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createBus).get(protect, getBuses);

router.route("/reset/:id").put(protect, admin, setAllBusSeatsToAvailable);
router
  .route("/:id")
  .delete(protect, admin, deleteBus)
  .get(protect, getBus)
  .put(protect, admin, updateBus);
router.route("/updateseat/:id").put(updateBusSeatToBooked);

export default router;
