import styles from "./PizzaCard.module.css";

const PizzaCard = (props) => {
  const { pizza , addToCart} = props;
  const { name, image, price, type, description, ingredients, topping } = pizza;

  const added = () => {
    addToCart(pizza)
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.nameAndPriceContainer}>
        <p className={styles.boldText}>{name}</p>
        <p
          className={`${styles.typeBox} ${
            type === "veg" ? styles.veg : styles.nonveg
          }`}
        ></p>
        <p className={styles.boldText}>{`₹${price}.00`}</p>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.cardText}>{description}</p>
        <p className={styles.cardText}>
          <span className={styles.boldText}>Ingridents: </span>
          {ingredients}
        </p>
        <p className={styles.cardText}>
          <span className={styles.boldText}>Toppings: </span>
          {topping}
        </p>
      </div>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={image} />
        <button className={styles.button} onClick={added}>Add to Cart</button>
      </div>
    </div>
  );
};

export default PizzaCard;
