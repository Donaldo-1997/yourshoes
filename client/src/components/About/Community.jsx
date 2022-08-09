import styles from "./Community.module.css";
import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div>
      <Link to="/">
        <button className={styles.yourshoes}>
          YOUR<span className={styles.shoes}>SHOES</span>
        </button>
      </Link>
      <p>Humildes desarrolladores de este proyecto:</p>
      <div>
        <p>» Benjamin Malo</p>
        <p>» Donaldo Barraza</p>
        <p>» Giselle Taboada</p>
        <p>» Juan Carracedo</p>
        <p>» Marcos Guzman</p>
        <p>» Nicolas Bringas</p>
        <p>» Ramiro Hernandez</p>
      </div>
    </div>
  );
}
