import React from "react";

const CartContext = React.createContext({
  shoppingCart: [],
  setShoppingCart: () => {},
});

export default CartContext;
