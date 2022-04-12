import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// @desc Get all bookings
// @route GET /api/bookings
// @access Private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({});
  if (bookings) {
    res.status(200).json(bookings);
  } else {
    throw new Error("Booking not found");
  }
});
// @desc Get single booking
// @route GET /api/bookings/:id
// @access Private
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    res.status(200).json(booking);
  } else {
    throw new Error("Booking not found");
  }
});

// @desc Add new booking
// @route POST /api/bookings

const addBooking = asyncHandler(async (req, res) => {
  const {
    origin,
    destination,
    departureDate,
    departureTime,
    seatBooked,
    price,
    bus,
    cancelled,
    paid,
  } = req.body;

  const booking = await Booking.create({
    origin,
    destination,
    departureDate,
    departureTime,
    seatBooked,
    price,
    bus,
    cancelled,
    paid,
  });
  if (booking) {
    res.status(200).json(booking);
  } else {
    throw new Error("Booking not added");
  }
});
// @desc Update booking
// @route PUT /api/bookings/:id
// @access Private
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.origin = req.body.origin || booking.origin;
    booking.destination = req.body.destination || booking.destination;
    booking.departureDate = req.body.departureDate || booking.departureDate;
    booking.departureTime = req.body.departureTime || booking.departureTime;
    booking.seatBooked = req.body.seatBooked || booking.seatBooked;
    booking.price = req.body.price || booking.price;
    booking.bus = req.body.bus || booking.bus;
    booking.cancelled = req.body.cancelled || booking.cancelled;
    booking.paid = req.body.paid || booking.paid;

    const updatedBooking = await booking.save();
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      throw new Error("Booking not updated");
    }
  } else {
    throw new Error("Booking not found");
  }
});

// @desc Delete booking
// @route DELETE /api/bookings/:id
// @access Private
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await booking.remove();
    res.status(200).json({ message: "Booking deleted" });
  } else {
    throw new Error("Booking not found");
  }
});

// update booking to paid
const updateBookingTopaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.paid = true;
    const updatedBooking = await booking.save();
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      throw new Error("Booking not updated");
    }
  } else {
    throw new Error("Booking not found");
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    booking.cancelled = true;
    const updatedBooking = await booking.save();
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      throw new Error("Booking not updated");
    }
  } else {
    throw new Error("Booking not found");
  }
});

export { getBookings, addBooking, updateBooking, deleteBooking, getBooking, updateBookingTopaid, cancelBooking };
