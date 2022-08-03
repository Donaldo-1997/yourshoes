import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { addOneToFav } from "../../redux/actions";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductCard({ image, title, price, id }) {
  const dispatch = useDispatch();

  const favProducts = useSelector((state) => state.favorites);
  const addLocalStorage = () => {
    localStorage.setItem("favProducts", JSON.stringify(favProducts));
  };
  const saveLocalStorage = () => {
    localStorage.getItem("favProducts");
  };
  useEffect(() => {
    if (favProducts?.length) {
      addLocalStorage();
      saveLocalStorage();
    }
  }, [favProducts]);

  const addToFav = (id) => {
    dispatch(addOneToFav(id));
    toast.success("Tu producto fue agregado favoritos!", {
      className: "cart-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className={styles.infoContainer}>
      <Link to={"/shoes/" + id} className={styles.Link}>
        <div className={styles.containerImg}>
          <img src={image} alt="img not found" className={styles.cardImg} />
        </div>
      </Link>
      <div className={styles.botonFav}>
        <button onClick={() => addToFav(id)}>
          <FaHeart style={{ color: "#f87d2d" }} />
        </button>
        <ToastContainer/>
      </div>
      <div className={styles.container}>
        <div className={styles.short}>
          {title.length > 20 ? (
            <h4 className={styles.title}>{title.slice(0, 15)}...</h4>
          ) : (
            <h4 className={styles.title}>{title}</h4>
          )}
        </div>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
}
