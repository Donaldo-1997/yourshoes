import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "./ProductCards.module.css";
import { FaHeart } from "react-icons/fa";
export default function ProductCards({ allProducts }) {
  return (
    <div className={styles.container}>
      {allProducts && allProducts.map((product) => {
        return (
          <div key={product.id} className={styles.card}>
            {/* <Link to={"/shoes/" + product.id} className={styles.Link}> */}
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              id={product.id}
              key={product.id}
            />
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
}
