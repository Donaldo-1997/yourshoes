import React from "react";
import { Link } from "react-router-dom";
import styles from "./FavoritesItem.module.css"
export default function FavItem({ data }) {
  console.log('data',data)
    let { id, image, price, quantity } = data;
  console.log(data);
  return (
    <div className={styles.container}>
    
      <div className={styles.container2}>
      <img src={image} alt="Img Not Found" width={100}  className={styles.img}/>
          ${price} 
        <div>
        </div>
      </div>
    </div>
  );
}
