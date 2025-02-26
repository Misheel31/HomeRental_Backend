const express = require("express");
const {
  mockPaymentSuccess,
  markPaymentComplete,
} = require("../controller/paymentController");

const router = express.Router();

router.post("/success/:bookingId", mockPaymentSuccess);
router.put("/payment/success/:bookingId", markPaymentComplete);

module.exports = router;
