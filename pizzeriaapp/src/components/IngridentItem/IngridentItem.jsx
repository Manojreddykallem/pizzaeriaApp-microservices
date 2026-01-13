import styles from "./IngridentItem.module.css";

const IngridentItem = (props) => {
  const { ingrident , onSelectIngrident,checked} = props;
  const { id,tname, price, image } = ingrident;

  const onSelect = (e) => {
    onSelectIngrident(ingrident, e.target.checked)
  }

  return (
    <tr>
      <td>
        <img className={styles.img} src={image} />
      </td>
      <td>
        <span className={styles.namePriceText}>{tname}</span>{" "}
        <span className={styles.namePriceText}>{`₹${price}.00`}</span>
      </td>
      <td>
        <input id={id} type="checkbox" checked={checked} onChange={onSelect} />
        <label htmlFor={id} className={styles.addText}>Add</label>
      </td>
    </tr>
  );
};

export default IngridentItem;
