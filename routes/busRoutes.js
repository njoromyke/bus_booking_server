import express from "express";
import {
  getBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
  getAvailableBuses,
} from "../controllers/busController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createBus).get(protect, getBus);

router
  .route("/:id")
  .delete(protect, admin, deleteBus)
  .get(protect, getBus)
  .put(protect, admin, updateBus);


export default router;
