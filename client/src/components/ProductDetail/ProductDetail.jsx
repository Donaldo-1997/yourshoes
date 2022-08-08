import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneToCart, getDetails } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "../Navbar2/Navbar2";
import { useState } from "react"
export default function ProductDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  let cantidad = 1
  const user = useSelector(state => state.user)

  const cartProducts = useSelector((state) => state.cart);
  
  const myShoes = useSelector((state) => state.detail);
  console.log(myShoes, "soy my shoes")
  const [size, setSize]= useState([])
  const shoesAdd ={
    id: id,
    size: size.map(e=>parseInt(e)),
    quantity: cantidad * size.length
  }
  console.log(shoesAdd, "shoesAdd")
  const addLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  };

  const saveLocalStorage = () => {
    localStorage.getItem("products");
  };

  const handleOnChangeSize = (e)=>{
    e.preventDefault()
    setSize(
      size.concat(e.target.value)
    )
  }
  const handleDeleteSize = (sn) => {
    setSize(
       size.filter(el => el !== sn )
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
    <Navbar2></Navbar2>
      <Link to="/">
        <button className={styles.yourshoes}>
          YOUR<span className={styles.shoes}>SHOES</span>
        </button>
      </Link>
      {myShoes ? (
        <div className={styles.divCard}>
          <img
            src={myShoes.image}
            alt="imgShoes not found"
            className={styles.imagen}
          />
          <div className={styles.divContent}>
            <h1 className={styles.title}>{myShoes.title}</h1>
            <h4>Cantidad = {size.length>=1?cantidad * size.length: 0}</h4>
            <h3 className={styles.price}> Total ${size.length>=2? myShoes.price*size.length:myShoes.price}</h3>
            <h5>descripcion del producto</h5>
            <h1 className={styles.size}>Talle: </h1>
            <select
                    onChange={(e) => {handleOnChangeSize(e) }}>
                        <option></option>
                    {myShoes.sizes && myShoes.sizes.map((s, i) => (
                        <option  key={i} value={s.number}>{s.number}</option>
                    ))}
                </select>
                {size.length && size.map((cn, i) => (
                    <span key={i}
                        onClick={() =>{handleDeleteSize(cn)}}
                    >{cn} x  </span>
                ))} 
        
            <div className={styles.buttons}>
            {!Object.keys(user).length ?  <Link to='/login'><button className={styles.cart}>
                    Logueate para comprar
                  </button></Link> :
              <Link to="/mercadopago/pagos">
                <button
                  className={styles.cart}
                  onClick={() => addToCart(myShoes.id)}
                  id={myShoes.id}>
                  Comprar
                </button>
              </Link>}
              <button
                className={styles.cart}
                onClick={() => addToCart( myShoes.id)}
                id={myShoes.id}>
                Añadir al carro
              </button>{" "}
              <ToastContainer/>
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
