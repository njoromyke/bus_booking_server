import mongoose from "mongoose";

const busSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seats: [
      {
        seatNumber: {
          type: Number,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],
    numberPlate: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
