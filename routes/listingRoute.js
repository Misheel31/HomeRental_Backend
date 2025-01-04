const express = require("express");
const { createListing } = require("../controller/listingController");
const Listing = require("../models/listingModel"); 


const router = express.Router();

router.post("/create", createListing);
router.get("/", async (req, res, next) => {
    try {
      const listings = await Listing.find();  
      res.status(200).json(listings); 
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;
