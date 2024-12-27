const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    category: String,
    city: String,
    state: String,
    country: String,
    guestCount: Number,
    bedroomCount: Number,
    bedCount: Number,
    bathroomCount: Number,
    amenities: [String],
    listingPhotoPaths: [String],
    title: String,
    description: String,
    price: String,
});

const Wishlist = mongoose.model('wishlist', wishlistSchema);

module.exports = Wishlist;