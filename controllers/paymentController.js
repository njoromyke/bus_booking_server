import Payment from "../models/paymentModel.js";
import asyncHandler from "express-async-handler";
import { Mpesa } from "mpesa-api";

const credentials = {
  clientKey: process.env.ConsumerKey,
  clientSecret: process.env.ConsumerSecret,
  initiatorPassword: process.env.InitiatorPassword,
  securityCredential: process.env.SecurityCredential,
};
const environment = "sandbox";

const mpesa = new Mpesa(credentials, environment);

// Get all payments
export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json(payments);
});
// Get a payment
export const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    throw new Error("payment not found");
  }

  res.status(200).json(payment);
});
// Create a payment
export const createPayment = asyncHandler(async (req, res) => {
  //   const { amount, booking } = req.body;
  const payment = await Payment.create(req.body);
  mpesa
    .lipaNaMpesaOnline({
      BusinessShortCode: 174379,
      Amount: 1 /* 1000 is an example amount */,
      PartyA: "600982",
      PhoneNumber: "+254729842998",
      CallBackURL: "https://1ae3-105-160-114-221.ngrok.io/payment/callback",
      AccountReference: "Bus Ticket Booking",
      passKey:
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    })
    .then((response) => {
      //Do something with the response
      //eg
      console.log(response);
    })
    .catch((error) => {
      //Do something with the error;
      //eg
      console.error(error);
    });

  res.status(201).json(payment);
});

const callback = asyncHandler(async (req, res) => {
  const b = req.body;
  res.status(200).json(b);
});

export { callback, getPayments, getPayment, createPayment };
