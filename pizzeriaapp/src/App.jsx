import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/homepage/homepage";
import OrderPizza from "./pages/OrderPizza/OrderPizza";
import BuildUrPizza from "./pages/BuildUrPizza/BuildUrPizza";
import ShoppingCart from "./pages/ShoppingcartPage/Shoppingcart";

import CartContext from "./context/CartContext";

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);


  return (
    <CartContext.Provider
      value={{ shoppingCart, setShoppingCart}}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order-pizza" element={<OrderPizza />} />
          <Route path="/build-ur-pizza" element={<BuildUrPizza />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
