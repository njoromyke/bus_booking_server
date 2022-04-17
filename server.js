import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http, { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import morgan from "morgan";
import busDepartureRoutes from "./routes/busDepartureRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(cors());
app.use(morgan("dev"));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});

// endpoints
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/buses", busRoutes);
app.use("/payments", paymentRoutes);
app.use("/departures", busDepartureRoutes);

app.get("/", (req, res) => {
  res.send(
    " <h1>API END POINTS</h1> <br> <h1> /api/users </h1> <br> <h1> /api/tenants </h1> <br> <h1> /api/property </h1> <br> <h1> /api/rooms </h1> <br> <h1> /api/landlords </h1> <br> <h1> /api/invoice </h1> <br>"
  );
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

export { io };
