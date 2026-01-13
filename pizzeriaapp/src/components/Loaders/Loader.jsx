import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Oval color="black" secondaryColor="grey" />
    </div>
  );
};

export default Loader;
