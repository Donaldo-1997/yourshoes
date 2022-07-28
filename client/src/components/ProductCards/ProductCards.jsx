import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "./ProductCards.module.css"
export default function ProductCards({ allProducts }) {
  return (
    <div className={styles.container}>
      {allProducts.map((product) => {
        return (
          <div key={product.id} className={styles.card}>
            <Link to={"/shoes/" + product.id} className={styles.Link}>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                key={product.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
