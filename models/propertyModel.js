// models/propertyModel.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    available: { type: Boolean, default: true },
    bedCount: { type: Number, required: true },
    bedroomCount: { type: Number, required: true },
    city: String,
    state: String,
    country: String,
    guestCount: Number,
    bathroomCount: Number,
    amenities: [String],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
