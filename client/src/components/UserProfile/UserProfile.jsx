import React from "react";
import styles from "./UserProfile.module.css";
import Navbar from "../NavBar/NavBar"

export default function UserProfile() {

  const infoUser = JSON.parse(localStorage.getItem("user"))
  console.log("info user profile", infoUser);

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div>
        {infoUser ? (
          <div>
            {!infoUser.image ? (
              <img
                className={styles.img}
                src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png"
              />
            ) : (
              <img className={styles.img} src={infoUser.image} />
            )}
            {!infoUser.name ? (
              <div className={styles.nameContainer}><p className={styles.userName}>Nombre: </p> <h2>{infoUser.name}</h2></div>
            ) : (
              <div className={styles.nameContainer}><p className={styles.userName}>Nombre: </p> <h2>{infoUser.name}</h2></div>
            )}
            <div className={styles.nameContainer}><p className={styles.userName}>Apellido: </p> <h2 className={styles.userData}>{infoUser.surname}</h2></div>
            <div className={styles.nameContainer}><p className={styles.userName}>E-mail: </p> <h2 className={styles.userData}>{infoUser.email}</h2></div>
            <div >
              <div className={styles.historialContainer}>
                <p className={styles.compras}>Historia de compras: </p>
                <div className={styles.divHistorial}>{infoUser.orders && infoUser.orders.map(e => <div className={styles.historial}><h2>Fecha de compra: {e.date.slice(0,10)}</h2><h2>Precio: ${e.amount}</h2><h2>Estado de compra: {e.status.charAt(0).toUpperCase() + e.status.slice(1)}</h2></div>)}</div></div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
}
