import mongoose from "mongoose";

const busDeparturesSchema = mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BusDepatures = mongoose.model("BusDepatures", busDeparturesSchema);
export default BusDepatures;
