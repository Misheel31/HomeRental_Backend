const Wishlist = require("../models/wishlistModel");

const getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlists" });
  }
};

const getWishlistByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Fetching wishlist for user:", username);

    const wishlist = await Wishlist.find({ username });

    if (!wishlist || wishlist.length === 0) {
      return res.status(404).json({ message: "No wishlist items found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createWishlist = async (req, res) => {
  try {
    const newWishlist = new Wishlist(req.body);
    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create the wishlist", details: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWishlist = await Wishlist.findByIdAndDelete(id);
    if (!deletedWishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the wishlist" });
  }
};

module.exports = {
  getWishlists,
  getWishlistByUsername,
  createWishlist,
  deleteWishlist,
};
