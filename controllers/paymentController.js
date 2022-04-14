import Payment from "../models/paymentModel.js";
import asyncHandler from "express-async-handler";
import { Mpesa } from "mpesa-api";
import { io } from "../server.js";

// Get all payments
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json(payments);
});
// Get a payment
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    throw new Error("payment not found");
  }

  res.status(200).json(payment);
});
// Create a payment
const createPayment = asyncHandler(async (req, res) => {
  const { amount, booking } = req.body;

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
      CallBackURL: "https://4cc0-105-160-4-151.ngrok.io/payments/callback",
      AccountReference: "bus booking",
      passKey: process.env.PASS_KEY,
      TransactionType: "CustomerPayBillOnline",
    });
    if (response) {
      const payment = await Payment.create({
        _id: response.Body.stkCallback.MerchantRequestID,
        amount,
        booking,
        user: req.user._id,
      });

      res.status(200).json(payment);
    }
  } catch (error) {
    console.log(error);
  }
});

const callback = asyncHandler(async (req, res) => {
  const b = req.body.Body.stkCallback["ResultDesc"];
  if (b === "The service request is processed successfully") {
    const payment = await Payment.findById(
      req.body.Body.stkCallback["MerchantRequestID"]
    );
    payment.paid = true;
    payment.save();
    res.status(200).json(payment);
  } else if (b === "Request cancelled by user") {
    const payment = await Payment.findById(
      req.body.Body.stkCallback["MerchantRequestID"]
    );
    payment.cancelled = true;
    payment.save();
    res.status(200).json(payment);
  }
  io.emit("payment", req.body.stkCallback["ResultDesc"]);
});

export { callback, getPayments, getPayment, createPayment };
