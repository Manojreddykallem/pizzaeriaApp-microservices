const express = require("express");
const router = express.Router();

const {
  createCart,
  getCart,
  updateItemQuantity,
  deleteItem,
} = require("../controllers/shoppingcartController");

router.post("/:cartId/item", createCart);
router.get("/:cartId", getCart);
router.put("/:cartId/item/:itemId", updateItemQuantity);
router.delete("/:cartId/item/:itemId", deleteItem);

module.exports = router;
