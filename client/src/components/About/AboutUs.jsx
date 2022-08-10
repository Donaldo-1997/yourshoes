import styles from "./AboutUs.module.css";
import NavBar2 from "../Navbar2/Navbar2"


export default function AboutUs() {
  return (
    <div>
      <NavBar2/>
      <div className={styles.container}>
        <div className={styles.hijo}>
          <img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" className={styles.henryImg}/>
          <p className={styles.p}>
            Somos un grupo de estudiantes de Henry creando nuestro proyecto final
            nos decidimos por hacer un e-commerce de ZAPATILLAS
          </p>

        </div>
      </div>
    </div>
  );
}
