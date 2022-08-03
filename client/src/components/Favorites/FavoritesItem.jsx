import React from "react";
import { Link } from "react-router-dom";
import styles from "./FavoritesItem.module.css";
export default function FavItem({ data, deleteProduct }) {
  let { id, image, price } = data;
  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.imag}>
          <img
            src={image}
            alt="Img Not Found"
            width={100}
            className={styles.img}
          />
        </div>
        ${price}
        <div className={styles.contButt}>
          {/* <img src="https://cdn-icons-png.flaticon.com/512/1017/1017530.png" width={30} alt="" /> */}
          <button onClick={() => deleteProduct(id)}>
          <img src="https://cdn-icons-png.flaticon.com/512/1017/1017530.png" width={30} alt="" />

          </button>
        </div>
      </div>
    </div>
  );
}
