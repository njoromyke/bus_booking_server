import Payment from "../models/paymentModel.js";
import asyncHandler from "express-async-handler";
import { Mpesa } from "mpesa-api";
import { io } from "../server.js";

// Get all payments
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({
    user: req.user.id,
  });
  res.status(200).json(payments);
});
// Get a payment
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id)
    .populate("user")
    .populate("booking");
  if (!payment) {
    throw new Error("payment not found");
  }

  res.status(200).json(payment);
});
// Create a payment
const createPayment = asyncHandler(async (req, res) => {
  const { booking } = req.body;

  const credentials = {
    clientKey: process.env.CONSUMER_KEY,
    clientSecret: process.env.CONSUMER_SECRET,
    initiatorPassword: process.env.INITIATOR_PASSWORD,
    securityCredential: process.env.SECURITY_CREDENTIALS,
    certificatePath: null,
  };
  const environment = "sandbox";

  const mpesa = new Mpesa(credentials, environment);
  try {
    const response = await mpesa.lipaNaMpesaOnline({
      BusinessShortCode: 174379,
      Amount: 1 /* 1000 is an example amount */,
      PartyA: 254729842998,
      PhoneNumber: 254729842998,
      PartyB: 174379,
      CallBackURL: "https://7173-41-81-41-236.ngrok.io/payments/callback",
      AccountReference: "bus booking",
      passKey: process.env.PASS_KEY,
      TransactionType: "CustomerPayBillOnline",
    });
    io.emit("querying", response);
    if (response) {
      const payment = await Payment.create({
        _id: response.CheckoutRequestID,
        amount: 1500,
        booking,
        user: req.user._id,
      });

      res.status(200).json(payment);
    }
  } catch (error) {
    console.log(error);
  }
});
const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({});
  res.status(200).json(payments);
});

const callback = asyncHandler(async (req, res) => {
  const b = req.body.Body.stkCallback["ResultDesc"];
  if (b) {
    io.emit("queried", req.body.Body.stkCallback["ResultDesc"]);
  }

  io.emit("payment", req.body.stkCallback["ResultDesc"]);
  io.emit("res", req.body.stkCallback);
  res.json(b);
});
const updatePaymentToPaid = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    payment.paid = true;
    await payment.save();
    io.emit("payment", payment);
    res.status(200).json(payment);
  } else {
    throw new Error("payment not found");
  }
});
const updatePaymentToCancelled = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    payment.cancelled = true;
    await payment.save();
    res.status(200).json(payment);
  } else {
    throw new Error("Seat not found");
  }
});

export {
  callback,
  getPayments,
  getPayment,
  createPayment,
  updatePaymentToCancelled,
  updatePaymentToPaid,
  getAllPayments,
};
