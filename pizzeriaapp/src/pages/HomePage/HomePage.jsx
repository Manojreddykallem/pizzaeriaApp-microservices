import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.section}>
        <h1 className={styles.title}>Our story</h1>

        <p className={styles.text}>
          We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on
          our Facebook fan page. Fans were given situations where they had to
          come up with wacky and fun excuses.
        </p>

        <p className={styles.text}>
          Ever since we launched the Tastiest Pan Pizza, people have not been
          able to resist the softest, cheesiest, crunchiest, butteriest pizza
          ever.
        </p>
      </section>

      {/* Ingredients */}
      <section className={`${styles.section} ${styles.split}`}>
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Ingredients"
          className={styles.image}
        />

        <div>
          <h2 className={styles.subtitle}>Ingredients</h2>
          <p className={styles.text}>
            We’re ruthless about goodness. We cut, chop, steam and stir while
            ingredients are fresh.
          </p>
        </div>
      </section>

      {/* Our Chefs */}
      <section
        className={`${styles.section} ${styles.split}`}
      >
        <div>
          <h2 className={styles.subtitle}>Our Chefs</h2>
          <p className={styles.text}>
            They make sauces sing and salads dance with skill, passion and
            experience.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="Chef"
          className={styles.image}
        />
      </section>

      {/* Delivery */}
      <section className={`${styles.section} ${styles.split}`}>
        <img
          src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6"
          alt="Delivery"
          className={`${styles.image} ${styles.small}`}
        />

        <h2 className={styles.deliveryText}>45 min delivery</h2>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2017 Pizzeria. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
