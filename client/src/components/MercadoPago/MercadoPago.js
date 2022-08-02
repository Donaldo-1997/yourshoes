import "./App.css";
import { useEffect, useState } from "react";
import Checkout from "./Checkout.jsx";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

function MercadoPago() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [datos, setDatos] = useState("");

  useEffect(() => {
    if (cart.length > 0) {
      axios
        .post(`${window.env.URL}/mercadopago`, { as: cart })
        .then((data) => {
          setDatos(data.data);
          console.info("Contenido de data:", data);
          console.log(cart)
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
