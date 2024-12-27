const express = require('express');
const {
    getWishlists,
    getWishlistById,
    createWishlist,
    deleteWishlist
} = require('../controllers/wishlistController');

const router = express.Router();

router.get('/', getWishlists);
router.get('/:id', getWishlistById);
router.post('/', createWishlist);
router.delete('/:id', deleteWishlist);

module.exports = router;
