import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../../components/Loaders/Loader";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { getCartId } from "../../utils/cartId";
import CartContext from "../../context/CartContext";

import styles from "./OrderPizza.module.css";

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [CustomizePizza, setCustomizePizza] = useState(false);
  const [ingridents, setIngridents] = useState([]);
  const [selectedIngridents, setSelectedIngridents] = useState([]);

  const { shoppingCart, setShoppingCart } = useContext(CartContext);

  const addToCart = (pizza) => {
    setShowPreview(true);
    setSelectedPizza(pizza);
  };

  const onCustomizePiza = () => {
    setCustomizePizza(true);
  };

  const addIngridents = (ingrident, checked) => {
    setSelectedIngridents((prev) =>
      checked
        ? [...prev, ingrident]
        : prev.filter((each) => each.id !== ingrident.id)
    );
  };

  const extraPrice = selectedIngridents.reduce(
    (sum, ingrident) => sum + ingrident.price,
    0
  );

  const totalPrice = selectedPizza ? selectedPizza.price + extraPrice : 0;

  const confirmAndAddToCart = async () => {
    try {
      const cartId = getCartId();

      const payload = {
        itemType: "DIRECT",
        basePizzaId: selectedPizza.id,
        name: selectedPizza.name,
        basePrice: selectedPizza.price,
        image: selectedPizza.image,
      };

      const res = await axios.post(
        `http://localhost:8080/cart/${cartId}/item`,
        payload
      );

      setShoppingCart(res.data.items);
      setShowPreview(false);
      setSelectedPizza(null);
    } catch (e) {
      console.log(e.message);
    }
  };

  const customizeAndAddtoCart = async () => {
    try {
      const cartId = getCartId();

      const payload = {
        itemType: "DIRECT_CUSTOMIZED",
        basePizzaId: selectedPizza.id,
        name: selectedPizza.name,
        basePrice: selectedPizza.price,
        ingridentsPrice: extraPrice,
        image: selectedPizza.image,
        ingridents: selectedIngridents,
      };

      const res = await axios.post(
        `http://localhost:8080/cart/${cartId}/item`,
        payload
      );

      setShoppingCart(res.data.items);

      setShowPreview(false);
      setSelectedPizza(null);
      setSelectedIngridents([]);
      setCustomizePizza(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get("http://localhost:8080/pizzas");
        setPizzas(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

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

  return (
    <div>
      <div className={styles.grid}>
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
        ))}
      </div>
      {showPreview && selectedPizza && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowPreview(false), setCustomizePizza(false);
          }}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h7>Pizza Preview: </h7>
            <div className={styles.previewBox}>
              <div>
                <h4>{selectedPizza.name}</h4>
                <p>{selectedPizza.description}</p>
                <p>
                  <b>Price: ₹{selectedPizza.price}</b>
                </p>
              </div>
              <div>
                <img
                  className={styles.img}
                  src={selectedPizza.image}
                  alt={selectedPizza.name}
                />
              </div>
            </div>

            {!CustomizePizza && (
              <div>
                <button
                  className="btn btn-success m-1"
                  onClick={onCustomizePiza}
                >
                  Customize pizza
                </button>
                <button
                  className="btn btn-success m-1"
                  onClick={confirmAndAddToCart}
                >
                  Add pizza
                </button>
              </div>
            )}

            {CustomizePizza && (
              <div>
                <hr></hr>
                {
                  <ul className={styles.list}>
                    {ingridents.map((ingrident) => (
                      <li className={styles.listItems} key={ingrident._id}>
                        <span className={styles.name}>{ingrident.tname}</span>
                        <span className={styles.price}>₹{ingrident.price}</span>
                        <input
                          className={styles.input}
                          onChange={(e) =>
                            addIngridents(ingrident, e.target.checked)
                          }
                          type="checkbox"
                        />
                      </li>
                    ))}
                  </ul>
                }

                {selectedIngridents.length > 0 && (
                  <div>
                    <p className={styles.prices}>
                      <b>Extra Price : {extraPrice}</b>
                    </p>
                    <p className={styles.prices}>
                      <b>Total Price: {totalPrice}</b>
                    </p>
                  </div>
                )}

                <button
                  className="btn btn-success mt-2"
                  onClick={customizeAndAddtoCart}
                  disabled={selectedIngridents.length === 0}
                >
                  Add Customized Pizza
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPizza;
