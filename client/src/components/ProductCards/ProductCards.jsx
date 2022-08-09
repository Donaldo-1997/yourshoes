import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductCards.module.css";
export default function ProductCards({ allProducts }) {
  return (
    <div className={styles.container}>
      {allProducts && allProducts.map((product) => {
        return (
          <div key={product.id} className={styles.card}>
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              id={product.id}
              key={product.id}
            />
          </div>
        );
      })}
    </div>
  );
}
