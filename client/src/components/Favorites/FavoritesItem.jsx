import React from "react";
import styles from "./FavoritesItem.module.css"
export default function FavItem({ data }) {
    let { id, image, price, quantity } = data;
  console.log(data);
  return (
    <div className={styles.container}>
      <img src={image} alt="Img Not Found" width={100} />
      <div>
        <h5>
          ${price}
        </h5>
        <div>
        </div>
      </div>
    </div>
  );
}
