const express = require("express");
const cors = require("cors");
const listingRoutes = require("./routes/listingRoute.js");
const bookingRoute = require("./routes/bookingRoute.js");
const userRoute = require("./routes/userRoute.js");
const authRoutes = require("./routes/authRoute.js");
const wishlistRoutes = require("./routes/wishlistRoute.js");
const propertyRoute = require("./routes/propertyRoute.js");
const paymentRoutes = require("./routes/paymentRoute");
const connectDB = require("./config/db");
// const path = require('path');

require("dotenv").config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/listings", listingRoutes);
app.use("/api/booking", bookingRoute);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/property", propertyRoute);
app.use("/api/payment", paymentRoutes);
app.use("/property_images", express.static("property_images"));
