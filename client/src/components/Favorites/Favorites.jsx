import styles from "./favorites.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavItem from "./FavoritesItem";
import { Link } from "react-router-dom";
import { deleteOneToFav } from "../../redux/actions";
import Navbar2 from "../Navbar2/Navbar2";

export default function Favorites() {
  const dispatch = useDispatch();

  const favProducts = useSelector((state) => state.favorites);
  useEffect(() => {
    localStorage.setItem("favProducts", JSON.stringify(favProducts));
  }, [favProducts]);

  const deleteProduct = (id) => {
    dispatch(deleteOneToFav({ FavId: id}));
  };
  const usuario = useSelector((state) => state.user);

  return (

    <div className={styles.container}>
    <Navbar2></Navbar2>
      <Link to="/" className={styles.yourShoes}>
        YOUR<span>SHOES</span>
      </Link>
      <div className={styles.favoritosTitle}>
        <h3 className={styles.favoritosTitle2}>Favoritos</h3>
        <h2>HOLA! {usuario.displayName}</h2>
      </div>

      <div>
        {usuario.id ? (
          <div>
            {favProducts.length ? (
              <div className={styles.containerCards}>
                {favProducts.map((item, index) => (
                  <FavItem key={index} data={item} deleteProduct={deleteProduct} />
                ))}
              </div>
            ) : (
              <div>
                <h4>no hay nada</h4>
              </div>
            )}
          </div>
        ) : (
          <h1>tienes que registrarte</h1>
        )}
      </div>
    </div>
  );
}
