// const express = require("express");
// const multer = require("multer");
// const {
//   createListing,
//   getListingDetails,
//   getListings,
//   getListingsBySearch,
// } = require("../controller/listingController");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// const router = express.Router();

// router.post("/create", upload.array("listingPhotos"), createListing);
// router.get("/", getListings);
// router.get("/:listingId", getListingDetails);
// router.get("/search/:search", getListingsBySearch);

// module.exports = router; 



// const express = require("express");
// const { createListing } = require("../controller/listingController");

// const router = express.Router();

// router.post("/create", createListing);

// module.exports = router;


const express = require("express");
const { createListing } = require("../controller/listingController");

const router = express.Router();

router.post("/create", createListing);

module.exports = router;
