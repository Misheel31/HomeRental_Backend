const Booking = require("../models/bookingModel");
const User = require("../models/userModel"); // Assuming User is your customer model

const createBooking = async (req, res) => {
  try {
    const {
      username,
      startDate,
      endDate,
      totalPrice,
      specialRequests,
      propertyId,
    } = req.body;

    // Validate request data
    if (!username || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Customer not found." });
    }

    const booking = await Booking.create({
      username,
      startDate,
      endDate,
      totalPrice,
      specialRequests,
      propertyId,
    });

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookings = async (req, res) => {
  try {
    const { username } = req.query;  

    let bookings;

    if (username) {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "Customer not found." });
      }

      bookings = await Booking.find({ username: user.username });
    } else {
      // If no username is provided, return all bookings
      bookings = await Booking.find();
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createBooking,
  getBookings,
  cancelBooking
};
