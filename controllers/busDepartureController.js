import BusDepatures from "../models/busDepartures.js";
import asyncHandler from "express-async-handler";

// get all buses where departure date is req.body.departureDate
const getBusesDeparture = asyncHandler(async (req, res) => {
  const buses = await BusDepatures.find({
    departureDate: req.body.departureDate,
    departureTime: req.body.departureTime,
    origin: req.body.origin,
  }).populate("bus");
  if (buses) {
    res.status(200).json(buses);
  } else {
    throw new Error("No buses found");
  }
});

//create bus departure
const createBusDeparture = asyncHandler(async (req, res) => {
  const { bus, departureTime, departureDate, origin, price } = req.body;
  const departure = await BusDepatures.create({
    bus,
    departureTime,
    departureDate,
    origin,
    price,
  });

  res.json(departure);
});

//update bus departure
const updateBusDeparture = asyncHandler(async (req, res) => {
  const departure = await BusDepatures.findById(req.params.id);
  if (departure) {
    departure.bus = req.body.bus || departure.bus;
    departure.departureTime = req.body.departureTime || departure.departureTime;
    departure.departureDate = req.body.departureDate || departure.departureDate;
    departure.origin = req.body.origin || departure.origin;
    departure.price = req.body.price || departure.price;

    await departure.save();
    res.json(departure);
  } else {
    throw new Error("Departure not found");
  }
});

//delete bus departure
const deleteBusDeparture = asyncHandler(async (req, res) => {
  const departure = await BusDepatures.findById(req.params.id);
  if (departure) {
    departure.remove();
    res.json(departure);
  } else {
    throw new Error("Departure not found");
  }
});

export  {
  createBusDeparture, //create bus departure
  updateBusDeparture, //update bus departure
  deleteBusDeparture, //delete bus departure
  getBusesDeparture, //get all buses where departure date is req.body.departureDate
};
