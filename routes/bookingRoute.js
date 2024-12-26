const express = require ("express")
const createBooking = require("../controller/bookingController")

const router = express.Router()

router.post("/create", createBooking)

module.exports = router