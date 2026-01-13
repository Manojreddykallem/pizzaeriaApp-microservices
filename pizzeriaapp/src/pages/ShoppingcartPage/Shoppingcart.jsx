import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CartContext from "../../context/CartContext";
import Cart from "../../components/Cart/Cart";
import { getCartId } from "../../utils/cartId";
import Loader from "../../components/Loaders/Loader";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Shoppingcart.module.css";

const ShoppingCart = () => {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  const placeOrder = () => {
    setShoppingCart([]);
    localStorage.removeItem("cartId");
    setOrderPlaced(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const fetchCart = async () => {
    try {
      const CartId = getCartId();
      const res = await axios.get(`http://localhost:8080/cart/${CartId}`);
      setShoppingCart(res.data.items || []);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartPrice = shoppingCart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const deliveryCharge = 40;

  const grandTotal = cartPrice + deliveryCharge;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.bgContainer}>
      <div className={styles.itemSection}>
        {!orderPlaced && <h1>Shopping Cart</h1>}
        {shoppingCart.length === 0 && !orderPlaced ? (
          <p>No items in the cart</p>
        ) : (
          shoppingCart.map((item) => (
            <Cart key={item._id} item={item} fetchCart={fetchCart} />
          ))
        )}
      </div>
      {shoppingCart.length > 0 && (
        <div className={styles.summarySection}>
          <h3>Order Summary</h3>
          <div className={styles.row}>
            <span>Items Total</span>
            <span>₹{cartPrice}</span>
          </div>
          <div className={styles.row}>
            <span>Delivey Charges</span>
            <span>{deliveryCharge}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>
          <button className="btn btn-success mt-2" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}

      {orderPlaced && (
        <div className={styles.successScreen}>
          <FaCheckCircle className={styles.tickIcon} />
          <h2>Order Placed Successfully</h2>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
