// // const express = require("express");
// // const connectDB = require("./config/db");
// // const app = express();
// // const userRoute = require("./routes/userRoute");
// // const listingRoute = require("./routes/listingRoute");

// // connectDB();

// // app.use(express.json());

// // app.use("/api/user", userRoute);
// // app.use("/api/listing", listingRoute); // Use the listing route

// // const port = 3001;
// // app.listen(port, () => {
// //   console.log(`Server running at http://localhost:${port}`);
// // });


// const express = require ('express');
// const listingRoutes = require ('./routes/listingRoute.js');
// const userRoute = require ('./routes/userRoute.js')
// const connectDB = require("./config/db");

// connectDB();


// const app = express();

// app.use(express.json());
// app.use("/api/user", userRoute);
// app.use('/api/listings', listingRoutes);

// app.listen(3000, () => console.log('Server running on port 3000'));


const express = require('express');
const listingRoutes = require('./routes/listingRoute.js');
const bookingRoute = require('./routes/bookingRoute.js')
const userRoute = require('./routes/userRoute.js');
const authRoutes =require('./routes/authRoute.js')
const wishlistRoutes = require('./routes/wishlistRoute.js')
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);
app.use('/api/listings', listingRoutes);
app.use('/api/booking', bookingRoute)
app.use('/api/auth', authRoutes)
app.use('/api/wishlist', wishlistRoutes)


app.listen(3000, () => console.log('Server running on port 3000'));
