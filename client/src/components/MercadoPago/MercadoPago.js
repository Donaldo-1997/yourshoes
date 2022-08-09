import "./App.css";
import { useEffect, useState } from "react";
import Checkout from "./Checkout.jsx";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProductStock } from "../../redux/actions";

function MercadoPago() {
  const cart = useSelector((state) => state.cart);
  console.log(cart.length, "CART LENGTH");
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  if (cart.length > 0 && !loading && !datos) {
    console.log("MERCADOPAGO!!!", cart);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/mercadopago`, { as: cart })
      .then((data) => {
        setLoading(false)
        dispatch(putProductStock({ cart }));
        setDatos(data.data);
        // localStorage.setItem("products", JSON.stringify([]));
        console.info("Contenido de data:", data);
      })
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  //   if (cart.length > 0 && !loading) {
  //     console.log("MERCADOPAGO!!!", cart);
  //     setLoading(true)
  // axios
  //   .post(`${process.env.REACT_APP_URL}/mercadopago`, { as: cart })
  //   .then((data) => {
  //     dispatch(putProductStock({ cart }));
  //     setDatos(data.data);
  //     // localStorage.setItem("products", JSON.stringify([]));
  //     console.info("Contenido de data:", data);
  //   })
  //   .catch((err) => console.error(err));
  //   }
  // }, [loading, cart.length]);

  return (
    <div className="a">
      {!datos ? <p>Aguarde un momento....</p> : <Checkout data={datos} />}
    </div>
  );
}
export default MercadoPago;
