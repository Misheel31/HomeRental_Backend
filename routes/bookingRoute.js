const express = require("express");
const {
  createBooking,
  getBookings,
  cancelBooking,
  getAllBookings,
  checkoutBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.post("/create", createBooking);
router.get("/get", getBookings);
router.delete("/cancel/:bookingId", cancelBooking);
router.get("/getAllBookings", getAllBookings);
router.delete("/checkout/:bookingId", checkoutBooking);

module.exports = router;
