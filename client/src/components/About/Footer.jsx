import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.footer_col}>
            <h3>NOSOTROS</h3>
            <ul>

              <li><Link to="/aboutUs"><span className={styles.boton}>SOBRE NOSOTROS</span></Link></li>
              <li><Link to="/community"><span className={styles.boton}>EQUIPO DE YOURSHOES</span></Link></li>

              <li>
                <Link to="/aboutUs">ABOUT US</Link>
              </li>
              <li>
                <Link to="/community">COMUNIDAD</Link>
              </li>

            </ul>
          </div>
          <div className={styles.footer_col2}>
            <h3>PRODUCTOS</h3>
            <ul>
              <li>ZAPATILLAS PARA LA FAMILIA</li>
            </ul>
          </div>
          <div className={styles.footer_col3}>
            <h3>SOPORTE</h3>
            <ul>
              <li>PREGUNTAS FRECUENTES</li>
              <li>CONTACTO</li>
            </ul>
          </div>
          <div>
            <h3>NOTIFICACIONES</h3>
            <input type="email" placeholder="Email: " />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
