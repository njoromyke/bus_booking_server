import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import paymentRoutes   from "./routes/paymentRoutes.js"

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(cors());

// endpoints
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/buses", busRoutes);
app.use("/payments", paymentRoutes);



app.get("/", (req, res) => {
  res.send(
    " <h1>API END POINTS</h1> <br> <h1> /api/users </h1> <br> <h1> /api/tenants </h1> <br> <h1> /api/property </h1> <br> <h1> /api/rooms </h1> <br> <h1> /api/landlords </h1> <br> <h1> /api/invoice </h1> <br>"
  );
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} on ${process.env.NODE_ENV} mode`);
});
