const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
} = require("../controller/propertyController");
const router = express.Router();

const multer = require("multer");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "property_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/avif",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, JPG, and AVIF are allowed."
      ),
      false
    );
  }
};

// Initialize Multer with storage and file filter
const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
});

router.post("/properties/create", upload.single("image"), createProperty);
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);
router.put("/properties/:id", upload.single("image"), updatePropertyById);
router.delete("/properties/:id", deletePropertyById);

//search and filter routes
router.get("/properties/search", searchProperties);
router.get("/properties/location/:location", getPropertiesByLocation);
router.get("/properties/by-price-range", getPropertiesByPriceRange);

module.exports = router;
