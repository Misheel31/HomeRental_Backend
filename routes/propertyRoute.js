const express = require("express");
const { createProperty, getAllProperties, getPropertyById, updatePropertyById, deletePropertyById, searchProperties, getPropertiesByLocation, getPropertiesByPriceRange } = require("../controller/propertyController"); 


const router = express.Router();

router.post("/properties/create", createProperty);

router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);
router.put("/properties/:id", updatePropertyById);
router.delete("/properties/:id", deletePropertyById);

//search and filter routes
router.get("/properties/search", searchProperties);
router.get("/properties/location/:location", getPropertiesByLocation);
router.get("/properties/price-range", getPropertiesByPriceRange);



module.exports = router;
