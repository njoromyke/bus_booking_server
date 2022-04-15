import Bus from "../models/busModel.js";
import asyncHandler from "express-async-handler";

const getBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find({});
  if (buses) {
    res.status(200).json(buses);
  } else {
    throw new Error("No buses found");
  }
});

// get bus by id
const getBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    res.status(200).json(bus);
  } else {
    throw new Error("Bus not found");
  }
});

// create bus
const createBus = asyncHandler(async (req, res) => {
  const { name, seats, numberPlate } = req.body;

  const b = await Bus.findOne({ numberPlate });

  if (!b) {
    const bus = await Bus.create({
      name,
      seats,
      numberPlate,
    });
    res.json(bus);
  } else {
    throw new Error("Bus already exists");
  }
});

// update bus
const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    bus.name = req.body.name || bus.name;
    bus.seats = req.body.seats || bus.seats;
    bus.numberPlate = req.body.numberPlate || bus.numberPlate;
   await bus.save();
    res.json(bus);
  } else {
    throw new Error("Bus not found");
  }
});

// delete bus
const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    bus.remove();
    res.json({ success: true });
  } else {
    throw new Error("Bus not found");
  }
});

// get available buses
const getAvailableBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find({ booked: false });
  if (buses) {
    res.status(200).json(buses);
  } else {
    throw new Error("Bus not found");
  }
});

// update bus  seat to booked where seat number = req.body.seatNumber
const updateBusSeatToBooked = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    const seat = bus.seats.find(
      (seat) => seat.seatNumber === req.body.seatNumber
    );
    if (seat) {
      seat.available = false;
      const updatedBus = await bus.save();
      if (updatedBus) {
        res.status(200).json(updatedBus);
      } else {
        throw new Error("Bus not updated");
      }
    } else {
      throw new Error("Seat not found");
    }
  } else {
    throw new Error("Bus not found");
  }
});

const setAllBusSeatsToAvailable = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    bus.seats.forEach((seat) => {
      seat.available = true;
    });
    const updatedBus = await bus.save();
    if (updatedBus) {
      res.status(200).json(updatedBus);
    } else {
      throw new Error("Bus not updated");
    }
  } else {
    throw new Error("Bus not found");
  }
});

export {
  getBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
  getAvailableBuses,
  updateBusSeatToBooked,
  setAllBusSeatsToAvailable,
};
