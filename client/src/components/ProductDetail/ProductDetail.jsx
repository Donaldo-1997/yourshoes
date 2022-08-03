import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneToCart, getDetails } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar2 from "../Navbar2/Navbar2";

export default function ProductDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const user = useSelector(state => state.user)

  const cartProducts = useSelector((state) => state.cart);
  
  const myShoes = useSelector((state) => state.detail);
  
  const addLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(cartProducts));
  };

  const saveLocalStorage = () => {
    localStorage.getItem("products");
  };

  //  const addToCartToast = () => {
    
  // }

   useEffect(() => {
    if(cartProducts && cartProducts.length){
    addLocalStorage()
    saveLocalStorage()}
   },[cartProducts])

  const addToCart = (id) => {
    dispatch(addOneToCart(id));
    toast.success("Tu producto fue agregado al carrito!", {
      className: "cart-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
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
            <h3 className={styles.price}>${myShoes.price}</h3>
            <h5>descripcion del producto</h5>
            <h1 className={styles.size}>Talle: </h1>
            <select className={styles.select}>
              <option value={35}>35</option>
              <option value={36}>36</option>
              <option value={37}>37</option>
              <option value={38}>38</option>
              <option value={39}>39</option>
              <option value={40}>40</option>
              <option value={41}>41</option>
              <option value={42}>42</option>
              <option value={43}>43</option>
              <option value={44}>44</option>
              <option value={45}>45</option>
            </select>
            <div className={styles.buttons}>
            {
              !Object.keys(user).length ?  <Link to='/login'><button className={styles.cart}>
                    Logueate para comprar
                  </button></Link> :
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
