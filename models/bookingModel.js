const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      ref: "User",
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: String,
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
