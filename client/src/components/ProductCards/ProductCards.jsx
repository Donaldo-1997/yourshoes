import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductCards.module.css";
import { ReactComponent as ErrorImg } from "../../assets/not-found-img.svg"

export default function ProductCards({ allProducts }) {
  return (
    <div className={styles.container}>
      {allProducts?.length ? (
        allProducts.map((product) => {
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
        })
      ) : (
        <div className={styles.sinFiltro}>
          <ErrorImg/>
          <h1>Ups! Parece que no pudimos encontrar el producto que buscabas.</h1>
        </div>
      )}
    </div>
  );
}
