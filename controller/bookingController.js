const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const createBooking = async (req, res) => {
  try {
    const { username, startDate, endDate, totalPrice, propertyId } = req.body;

    if (!username || !startDate || !endDate || !totalPrice || !propertyId) {
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
      // specialRequests,
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
      bookings = await Booking.find();
    }

    res.status(200).json({ success: true, data: bookings });
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

    await Booking.findByIdAndDelete(bookingId);

    res
      .status(200)
      .json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkoutBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking sucessfully confirmed" });
  } catch (e) {
    re.status(500).json({
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

const getBookingsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Customer not found." });
    }

    const bookings = await Booking.find({ username });
    if (!bookings.length) {
      return res.status(404).json({ error: "No bookings found." });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  cancelBooking,
  getAllBookings,
  checkoutBooking,
  getBookingsByUsername,
};
