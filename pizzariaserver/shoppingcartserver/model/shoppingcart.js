const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ["DIRECT", "DIRECT_CUSTOMIZED", "CUSTOM"],
    required: true,
  },

  basePizzaId: {
    type: String,
    default: null,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  ingridents: {
    type: [String],
    default: [],
  },

  crust: {
    type: String,
    default: null,
  },

  size: {
    type: String,
    default: null,
  },

  basePrice: {
    type: Number,
    default: 0,
  },

  ingridentsPrice: {
    type: Number,
    default: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const shoppingCartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
    unique: true,
  },

  items: [cartItemSchema],

  cartTotalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", shoppingCartSchema);
