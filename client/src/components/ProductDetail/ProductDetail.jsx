import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneToCart, getDetails } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "../Navbar2/Navbar2";

import { useState } from "react";

export default function ProductDetail({ id }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const user = useSelector(state => state.user)

  const cartProducts = useSelector((state) => state.cart);
  
  const myShoes = useSelector((state) => state.detail);
  let cantidad = 1
  console.log(myShoes, "soy my shoes")
  const [size, setSize]= useState([])
  const shoesAdd ={
    id: id,
    size: size.map(e=>parseInt(e)),
    quantity: size.length
  }
  console.log(shoesAdd, "shoesAdd")
  const handleToast = () => {
    toast.error("Debes estar logueado para poder comprar", {
      className: "buy-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      toastId: "prevent-buy-toast"
    })
  }

  const addLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  };

  const saveLocalStorage = () => {
    localStorage.getItem("products");
  };

  //  const addToCartToast = () => {
    
  // }
  const handleOnChangeSize = (e)=>{
    e.preventDefault()
    setSize(
      size.concat(e.target.value)
    )
  }
  const handleDeleteSizes = (e,el)=>{
    e.preventDefault()
    setSize(
      size.filter(en =>en !== el)
    )
  }
  console.log(size)
   useEffect(() => {
    if(cartProducts && cartProducts.length){
    addLocalStorage()
    saveLocalStorage()}
   },[cartProducts])

  const addToCart = () => {
    dispatch(addOneToCart(shoesAdd));
    toast.success("Tu producto fue agregado al carrito!", {
      className: "cart-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
    setSize([])
  };

  return (
    <div>
      {myShoes ? (
        <div className={styles.divCard}>
          <img
            src={myShoes.image}
            alt="imgShoes not found"
            className={styles.imagen}
          />
          <div className={styles.divContent}>
            <h1 className={styles.title}>{myShoes.title}</h1>
            <div className={styles.sizePriceCont}>
              <div className={styles.sizeContainer}>
                <h1 className={styles.size}>Talle: </h1>
                <h4> Cantidad={size.length >= 1? cantidad * size.length:0}</h4>
                <select className={styles.selectSize}
                        onChange={(e) => {handleOnChangeSize(e) }}>
                            <option></option>
                        {myShoes.sizes && myShoes.sizes.map((s, i) => (
                            <option  key={i} value={s.number}>{s.number}</option>
                        ))}
                    </select>
                     {size.length && size.map((sn, i) => (
                    <span 
                    key={i}
                    onClick={(e) => {handleDeleteSizes(e,sn)}}
                    >{sn} x </span>
                    ))}
              </div>
              <h3 className={styles.price}>${myShoes.price}</h3>
            </div>          
            <div className={styles.buttons}>
            {
              !Object.keys(user).length ? <button onClick={handleToast} className={styles.cart}>
                    Comprar
                  </button> :
              <Link to="/mercadopago/pagos">
                <button
                  className={styles.cart}
                  onClick={() => addToCart(myShoes.id)}
                  id={myShoes.id}
                >
                  Comprar
                </button>
              </Link>}
              <button
                className={styles.cart}
                onClick={() => addToCart( myShoes.id)}
                id={myShoes.id}
              >
                Añadir al carro
              </button>{" "}
              <ToastContainer />
             

            </div>
          </div>
        </div>
      ) : (
        <div>
          <img
            src="https://i.pinimg.com/originals/76/59/35/7659353c8fcde74a4c224dafd7a5eccf.gif"
            alt="Shoes"
          />
          <p>Loading...</p>
        </div>
      )}
      
    </div>
  );
}
