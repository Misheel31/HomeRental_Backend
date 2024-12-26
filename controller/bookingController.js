const Booking = require("../models/bookingModel")

const createBooking = async(req, res, next) =>{
    try{
        const {
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice
        } = req.body

        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
        })

        await newBooking.save()
        res.status(200).json(newBooking)
    }
    catch(error){
        next(error)
    }
}

module.exports = createBooking