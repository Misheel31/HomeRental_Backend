const Booking = require("../models/bookingModel");

const mockPaymentSuccess = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = "Paid";
    await booking.save();

    res.json({ success: true, message: "Payment successful!" });
  } catch (error) {
    res.status(500).json({ error: "Payment processing error" });
  }
};

const markPaymentComplete = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.paymentStatus = "Paid";
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Payment marked as successful" });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { mockPaymentSuccess, markPaymentComplete };
