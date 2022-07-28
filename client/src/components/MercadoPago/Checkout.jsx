import { useEffect } from "react";
import s from "./Checkout.module.css";
import React from "react";
import { useSelector } from "react-redux";

export default function Comprar({ data }) {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };
  }, [data]);

  let precios = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity === 1) {
      precios += cart[i].price;
    } else {
      precios += cart[i].price * cart[i].quantity;
    }
  }
  return (
    <div className={s.container}>
      <form id="form1">
        <div className={s.hijo}>
          <div>
            {cart.map((producto, i) => {
              return (
                <div className={s.hijo2} key={i}>
                  <img src={producto.image} alt="" width={75} />
                  <h5>{producto.title.slice(0, 25)}...</h5>
                  <h5>
                    {producto.price} x {producto.quantity} =$
                    {producto.price * producto.quantity}
                  </h5>
                  <h5>{producto.quantity}</h5>
                </div>
              );
            })}
            <h4>Total a pagar: ${precios}</h4>
          </div>
        </div>
      </form>
    </div>
  );
}
