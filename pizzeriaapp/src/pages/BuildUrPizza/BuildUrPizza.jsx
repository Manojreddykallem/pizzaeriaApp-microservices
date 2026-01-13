import styles from "./BuildUrPizza.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loaders/Loader";
import IngridentItem from "../../components/IngridentItem/IngridentItem";
import { getCartId } from "../../utils/cartId";
import CartContext from "../../context/CartContext";

const BuildUrPizza = () => {
  const [ingridents, setIngridents] = useState([]);
  const [selectedIngridents, setSelectedIngridents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  const [size, setSize] = useState(null);
  const [crust, setCrust] = useState(null);

  const onSelectIngrident = (ingrident, checked) => {
    setSelectedIngridents((prev) =>
      checked
        ? [...prev, ingrident]
        : prev.filter((each) => each.id !== ingrident.id)
    );
  };

  const sizePrice = {
    SMALL: 50,
    MEDIUM: 100,
    LARGE: 150,
  };

  const crustPrice = {
    THIN: 50,
    PAN: 75,
    CHEESE_BURST: 100,
  };

  const ingridentsPrice = selectedIngridents.reduce(
    (sum, ingrident) => sum + ingrident.price,
    0
  );

  const basePrice =
    (size ? sizePrice[size] : 0) + (crust ? crustPrice[crust] : 0);

  const totalCost = basePrice + ingridentsPrice;

  const canBuildPizza =
    selectedIngridents.length > 0 && size !== null && crust !== null;

  useEffect(() => {
    const fetchIngridents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/ingridents");
        setIngridents(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };
    fetchIngridents();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const buildPizzaAddToCart = async () => {
    try {
      const cartId = getCartId();

      const payload = {
        itemType: "CUSTOM",
        ingridents: selectedIngridents,
        basePrice,
        ingridentsPrice,
        size,
        crust,
      };

      const res = await axios.post(
        `http://localhost:8080/cart/${cartId}/item`,
        payload
      );
      setShoppingCart(res.data.items);
      setShowPreview(false);
      setSelectedIngridents([]);
      setSize(null);
      setCrust(null);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.bgContainer}>
      <p>
        Pizzeria now give you option to build your own pizza. Customize pizza by
        choosing ingridents from the list given below
      </p>
      <table className="table table-bordered table-striped w-50 mx-auto">
        <tbody>
          {ingridents.map((ingrident) => (
            <IngridentItem
              ingrident={ingrident}
              key={ingrident.id}
              checked={selectedIngridents.some((i) => i.id === ingrident.id)}
              onSelectIngrident={onSelectIngrident}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.optionBlock}>
        <h4>Size</h4>
        {["SMALL", "MEDIUM", "LARGE"].map((s) => (
          <label key={s}>
            <input
              type="radio"
              name="size"
              value={s}
              checked={size === s}
              onChange={() => setSize(s)}
            />
            {s} (₹{sizePrice[s]})
          </label>
        ))}
      </div>

      <div className={styles.optionBlock}>
        <h4>Crust</h4>
        {["THIN", "PAN", "CHEESE_BURST"].map((c) => (
          <label key={c}>
            <input
              type="radio"
              name="crust"
              value={c}
              checked={crust === c}
              onChange={() => setCrust(c)}
            />
            {c} (₹{crustPrice[c]})
          </label>
        ))}
      </div>

      <button
        className={styles.button}
        onClick={() => setShowPreview(true)}
        disabled={!canBuildPizza}
      >
        Build Ur Pizza
      </button>

      <footer className={styles.footer}>
        © 2026 Pizzeria. All rights reserved.
      </footer>

      {showPreview && (
        <div className={styles.overlay} onClick={() => setShowPreview(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h1>custom pizza</h1>
            <div class={styles.detailsContainer}>
              <p className={styles.detailsText}>
                <b>ingridents: </b>
                {selectedIngridents.map((item) => item.tname).join(", ")}
              </p>
              <p className={styles.detailsText}>
                <b>Crust:</b> {crust} ₹{crustPrice[crust]}
              </p>
              <p className={styles.detailsText}>
                <b>Size:</b> {size} ₹{sizePrice[size]}
              </p>
              <p className={styles.detailsText}>
                <b>Base Price : </b>₹{basePrice}
              </p>
              <p className={styles.detailsText}>
                <b>Ingridents Price :</b> ₹{ingridentsPrice}
              </p>
              <p className={styles.detailsText}>
                <b>Total :</b> ₹{totalCost}
              </p>
            </div>
            <div>
              <button
                className="btn btn-success m-2"
                onClick={() => setShowPreview(false)}
              >
                Edit pizza
              </button>
              <button
                className="btn btn-success m-2"
                onClick={buildPizzaAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildUrPizza;
