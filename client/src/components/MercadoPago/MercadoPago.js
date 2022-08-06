import "./App.css";
import { useEffect, useState } from "react";
import Checkout from "./Checkout.jsx";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProductStock, postOrder } from "../../redux/actions";

function MercadoPago() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [datos, setDatos] = useState("");
  const dispatch = useDispatch()

  useEffect(() => { 
    if (cart.length > 0) {
      axios
        .post(`${window.env.URL}/mercadopago`, { as: cart })
        .then((data) => {
          dispatch(putProductStock({cart}));
          dispatch(postOrder({cart}));
          setDatos(data.data);
          console.info("Contenido de data:", data);
        })
        .catch((err) => console.error(err));
    }
  }, [cart]);

  //   const productos = [
  //     { title: "Producto 1", quantity: 5, price: 10.52 },
  //     { title: "Producto 2", quantity: 15, price: 100.52 },
  //     { title: "Producto 3", quantity: 6, price: 200 },
  //   ];
  return (
    <div className="a">
      {!datos ? <p>Aguarde un momento....</p> : <Checkout data={datos} />}
    </div>
  );
}
export default MercadoPago;
