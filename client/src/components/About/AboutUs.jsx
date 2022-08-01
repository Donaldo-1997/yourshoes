import styles from "./AboutUs.module.css";
import { Link } from "react-router-dom";
export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.hijo}>
      <Link to="/">
        <button className={styles.yourshoes}>
          YOUR<span className={styles.shoes}>SHOES</span>
        </button>
      </Link>
        <p className={styles.p}>
          Somos un grupo de estudiantes de Henry creando nuestro proyecto final
          nos decidimos por hacer un e-commerce de ZAPATILLAS
        </p>
        
      </div>
    </div>
  );
}
