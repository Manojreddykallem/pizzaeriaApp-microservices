const Cart = require("../model/shoppingcart");

const createCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const {
      itemType,
      basePizzaId,
      name,
      ingridents = [],
      basePrice,
      ingridentsPrice,
      image,
      crust = null,
      size = null,
    } = req.body;

    let totalPrice = 0;

    if (itemType === "DIRECT") {
      totalPrice = basePrice;
    } else if (itemType === "DIRECT_CUSTOMIZED") {
      totalPrice = basePrice + ingridentsPrice;
    } else if (itemType === "CUSTOM") {
      totalPrice = basePrice + ingridentsPrice;
    } else {
      return res.status(400).json({ message: "Invalid itemType" });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({
        cartId,
        items: [],
        cartTotalPrice: 0,
      });
    }

    const ingridentNames = ingridents.map((ing) => ing.tname);

    cart.items.push({
      itemType,
      basePizzaId,
      name: itemType === "CUSTOM" ? "Own Pizza" : name,
      ingridents: ingridentNames,
      basePrice,
      ingridentsPrice,
      totalPrice,
      quantity: 1,
      image,
      crust,
      size,
    });

    cart.cartTotalPrice += totalPrice;

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(200).json({
        cartId,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(200).json({
        cartId,
        items: [],
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    item.quantity = quantity;
    let totalPrice = 0;

    if (item.itemType === "DIRECT") {
      totalPrice = item.basePrice * item.quantity;
    } else if (item.itemType === "DIRECT_CUSTOMIZED") {
      totalPrice = (item.basePrice + item.ingridentsPrice) * item.quantity;
    } else if (item.itemType === "CUSTOM") {
      totalPrice = item.ingridentsPrice * item.quantity;
    } else {
      return res.status(400).json({ message: "Invalid itemType" });
    }

    item.totalPrice = totalPrice;

    cart.cartTotalPrice = cart.items.reduce(
      (sum, cartItem) => sum + cartItem.totalPrice,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const cart = await Cart.findOne({ cartId });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    cart.cartTotalPrice = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { createCart, getCart, updateItemQuantity, deleteItem };
