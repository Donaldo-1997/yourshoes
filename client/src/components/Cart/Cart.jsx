import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem.jsx";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { deleteOneToCart, removerTodo } from "../../redux/actions";
import { Link } from "react-router-dom";
import Navbar2 from "../Navbar2/Navbar2";

export default function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log(cartProducts, "Soy el producto añadido al carrito")

  let precios = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].quantity === 1) {
      precios += cartProducts[i].price;
    } else {
      precios += cartProducts[i].price * cartProducts[i].quantity;
    }
  }
  const deleteProduct = (id, all = false) => {
    dispatch(deleteOneToCart({ productId: id, all }));
  };
  const clearCart = () => {
    dispatch(removerTodo());
  };
  
  const user = useSelector(state => state.user)
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div>
    <Navbar2></Navbar2>

    <div className={styles.container}>
      {/* <button onClick={clearCart}>Limpiar carrito</button> */}

      <div>
        {cartProducts && cartProducts.length ? (
          <div className={styles.contenedor}>
            {cartProducts && cartProducts.map((item, index) => (
              <CartItem key={index} data={item} deleteProduct={deleteProduct} />
            ))}
            <div className={styles.carrito}>
                <h2>SUMA TOTAL: ${precios}</h2>
              <div>
                <Link to="/mercadopago/pagos" className={styles.mpLinkBtn}>
                  <button className={styles.buttonsContainer}>
                    Ir a comprar
                  </button> 
                </Link> 
                <button className={styles.buttonsContainer} onClick={clearCart}>
                  Limpiar carrito
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.containerSinDato}>
            <h5>El carrito está vacío.</h5>
            <h5>Vuelve y escoge tus zapatillas favoritas!</h5>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
