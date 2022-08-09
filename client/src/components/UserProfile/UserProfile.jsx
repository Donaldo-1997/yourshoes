import React from "react";
import styles from "./UserProfile.module.css";
import Navbar2 from "../Navbar2/Navbar2";

export default function UserProfile() {
  const infoUser = JSON.parse(localStorage.getItem("user"));
  console.log("info user profile", infoUser);

  return (
    <div className={styles.container}>
      <Navbar2></Navbar2>
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
              <div className={styles.nameContainer}><p className={styles.userName}>Nombre:</p> <h1>{infoUser.user.name}</h1></div>
            ) : (
              <div className={styles.nameContainer}><p className={styles.userName}>Nombre:</p> <h1>{infoUser.name}</h1></div>
            )}
            <div className={styles.nameContainer}><p className={styles.userName}>Apellido:</p> <h1 className={styles.userData}>{infoUser.surname}</h1></div>
            <div className={styles.nameContainer}><p className={styles.userName}>E-mail:</p> <h1 className={styles.userData}>{infoUser.email}</h1></div>
            <div className={styles.nameContainer}><h1 className={styles.compras}>Historia de compras:</h1></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
