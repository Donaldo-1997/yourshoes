import "./App.css";
import { useEffect, useState } from "react";
import Checkout from "./Checkout.jsx";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, postOrder, putProductStock } from "../../redux/actions";

function MercadoPago() {
  const cart = useSelector((state) => state.cart);

  const [datos, setDatos] = useState("");
  const dispatch = useDispatch()
  const orderId = useSelector(state=>state.order)
  console.log(orderId)
  const user = localStorage.getItem('user')
  const json = JSON.parse(user)
  const userId = json.id 
  console.log(cart, 'soy el producto añadido al carrito')
  
  useEffect(() => {
    let isCancelled = false
    dispatch(getAllUsers())
    if (cart.length > 0) {
      axios
      .post(`${process.env.REACT_APP_URL}/payments`, {userId:userId, as:cart })
      .then((data) => {
        if(!isCancelled){ 
          dispatch(putProductStock({cart}))
          
          setDatos(data.data);
          localStorage.setItem("products", JSON.stringify([]));
          console.info("Contenido de data:", data);
        }})
        .catch((err) => console.error(err));
    }
    return ()=>{
      isCancelled = true
    }
  }, [cart]);

  console.log(cart.length, "CART LENGTH");


  return (
    <div className="a">
      {!datos ? <p>Aguarde un momento....</p> : <Checkout data={datos} />}
    </div>
  );
}
export default MercadoPago;
