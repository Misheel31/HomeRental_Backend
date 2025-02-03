const Property = require("../models/propertyModel");

const createProperty = async (req, res) => {
  try {
    const {
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      location,
      pricePerNight,
      available,
    } = req.body;

    if (!title || !description || !location || !pricePerNight) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProperty = new Property({
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      location,
      image: req.file ? req.file.originalname : null,
      pricePerNight,
      available: available ?? true,
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching all properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      image,
      pricePerNight,
      available,
      bedCount,
      bedroomCount,
    } = req.body;

    // Ensure all necessary fields are present
    if (
      title === undefined ||
      description === undefined ||
      location === undefined ||
      (image === undefined && !req.file) ||
      pricePerNight === undefined ||
      bedCount === undefined ||
      bedroomCount === undefined
    ) {
      return res.status(400).json({
        error:
          "All required fields are not provided (title, description, location, image, pricePerNight, bedCount, and bedroomCount).",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        image: req.file ? req.file.path : image,
        pricePerNight,
        available,
        bedCount,
        bedroomCount,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("Error updating property by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePropertyById = async (req, res) => {
  try {
    let { id } = req.params;

    // Clean the ID (trim whitespace, remove unwanted characters like colons and newlines)
    id = id.trim().replace(/^:/, "").replace(/\n$/, "");

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchProperties = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const regex = new RegExp(searchTerm, "i");
    const properties = await Property.find({
      $or: [{ title: regex }, { description: regex }, { location: regex }],
    });

    if (!properties.length) {
      return res.status(404).json({ message: "No matching properties found" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPropertiesByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const properties = await Property.find({ location });

    if (!properties.length) {
      return res
        .status(404)
        .json({ message: "No properties found in the specified location" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties by location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPropertiesByPriceRange = async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ message: "Invalid price range values" });
    }

    const properties = await Property.find({
      pricePerNight: { $gte: minPrice, $lte: maxPrice },
    });

    if (!properties.length) {
      return res
        .status(404)
        .json({ message: "No properties found in the specified price range" });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties by price range:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  searchProperties,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
};
