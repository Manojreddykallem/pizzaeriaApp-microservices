import styles from "./Cart.module.css";
import { getCartId } from "../../utils/cartId";
import axios from "axios";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

const Cart = (props) => {
  const { item, fetchCart } = props;
  const {
    _id,
    itemType,
    name,
    ingridents,
    basePrice,
    ingridentsPrice,
    totalPrice,
    quantity,
    image,
    crust,
    size,
  } = item;

  const { shoppingCart, setShoppingCart } = useContext(CartContext);

  const getTitle = () => {
    if (itemType === "DIRECT") return name;
    if (itemType === "DIRECT_CUSTOMIZED")
      return `${name} (Direct Customized Pizza)`;
    if (itemType === "CUSTOM") return name;
    return name;
  };

  const updateQuantity = async (newQty) => {
    if (newQty < 1) return;

    const cartId = getCartId();
    const res = await axios.put(
      `http://localhost:8080/cart/${cartId}/item/${_id}`,
      {
        quantity: newQty,
      }
    );
    setShoppingCart(res.data.items);
    fetchCart();
  };

  const deleteItem = async () => {
    const cartId = getCartId();
    const res = await axios.delete(
      `http://localhost:8080/cart/${cartId}/item/${_id}`
    );
    fetchCart();
    setShoppingCart(res.data.items);
  };

  return (
    <div>
      <div className={styles.cartCard}>
        {itemType != "CUSTOM" && (
          <img className={styles.img} src={image} alt={name} />
        )}

        <div className={styles.details}>
          <p className={styles.text}>
            <b>{getTitle()}</b>
          </p>
          {itemType === "DIRECT_CUSTOMIZED" && ingridents.length > 0 && (
            <p>
              <b>Extra Ingredients:</b> {ingridents.join(", ")}
            </p>
          )}

          {itemType === "CUSTOM" && (
            <>
              <p className={styles.text}>
                <b>Ingredients:</b> {ingridents.join(", ")}
              </p>

              <p className={styles.text}>
                <b>Size:</b> {size}
              </p>

              <p className={styles.text}>
                <b>Crust:</b> {crust}
              </p>
            </>
          )}

          <p className={styles.prices}>Base Price: ₹{basePrice}</p>
          {ingridentsPrice > 0 && (
            <p className={styles.prices}>Extra Price: ₹{ingridentsPrice}</p>
          )}
          <p className={styles.prices}>
            <b>Total Price : ₹{totalPrice}</b>
          </p>
          <div className={styles.qty}>
            <button onClick={() => updateQuantity(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => updateQuantity(quantity + 1)}>+</button>
          </div>
          <button className="btn btn-danger mt-2" onClick={deleteItem}>
            Remove
          </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Cart;
