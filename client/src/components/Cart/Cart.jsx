import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem.jsx";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { deleteOneToCart, removerTodo } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let precios = 0;
  for (let i = 0; i < cartProducts && cartProducts.length; i++) {
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

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <button className={styles.yourshoes}>
          YOUR<span className={styles.shoes}>SHOES</span>
        </button>
      </Link>

      {/* <button onClick={clearCart}>Limpiar carrito</button> */}
      <div>
        {cartProducts.length ? (
          <div className={styles.contenedor}>
            {cartProducts.map((item, index) => (
              <CartItem key={index} data={item} deleteProduct={deleteProduct} />
            ))}
            <div>
              <div>
                <h2>SUMA TOTAL: ${precios}</h2>
                <Link to='/mercadopago/pagos'>
                  <button>Pagar</button>
                </Link>
                <button onClick={clearCart}>Limpiar carrito</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.containerSinDato}>
            <h4>El carrito está vacío.</h4>
            <h5>Vuelve y escoje tus zapatillas favoritas!</h5>
          </div>
        )}
      </div>
    </div>
  );
}
