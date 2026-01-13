import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const {shoppingCart } = useContext(CartContext);

  return (
    <nav className={styles.navContainer}>
      <Link className={`${styles.logoLink} ${styles.navLinks}`} to="/">
        <span>Pizzeria</span>
        <img className={styles.logo} src="/image.png" />
      </Link>

      <Link className={styles.navLinks} to="/order-pizza">
        Order Pizza
      </Link>

      <Link className={styles.navLinks} to="/build-ur-pizza">
        Build Ur Pizza
      </Link>

      <Link
        className={`${styles.navLinks} ${styles.cart}`}
        to="/shoppingcart"
      >
        <span>Shopping cart</span>
        <span className={styles.logo}>
          <i className="bi bi-cart3">({shoppingCart.length})</i>
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
