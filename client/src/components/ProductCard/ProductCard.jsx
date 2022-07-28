import React from "react";
import styles from "./ProductCard.module.css";
export default function ProductCard({ image, title, price }) {
  return (
    <div className={styles.infoContainer}>
      <div>
        <img src={image} alt="img not found" className={styles.cardImg}/>
      </div>
      <div className={styles.container}>
        <div className={styles.short}>
          {title.length > 20 ? (
            <h4 className={styles.title}>{title.slice(0, 15)}...</h4>
          ) : (
            <h4 className={styles.title}>{title}</h4>
          )}
          {/* <h4 className={styles.ellipsis}>{title}<p>...</p></h4> */}
        </div>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
}
