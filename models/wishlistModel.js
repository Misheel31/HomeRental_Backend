const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  guestCount: Number,
  bedroomCount: Number,
  bedCount: Number,
  bathroomCount: Number,
  title: String,
  description: String,
  price: String,
  image: { type: String, required: true },
  pricePerNight: { type: String, required: true },
  location: { type: String, required: true },
  username: {
    type: String,
    ref: "User",
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = Wishlist;
