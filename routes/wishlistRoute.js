const express = require("express");
const {
  getWishlists,
  getWishlistByUsername,
  createWishlist,
  deleteWishlist,
} = require("../controller/wishlistController");

const router = express.Router();

router.get("/", getWishlists);
router.get("/:username", getWishlistByUsername);
router.post("/create", createWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;
