const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ["veg", "nonveg"],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  ingredients: {
    type: [String],
    default: [],
  },

  topping: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
