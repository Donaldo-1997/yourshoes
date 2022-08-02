import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./App.css";
import Cart from "./components/Cart/Cart";
import FormUser from "./components/FormUser/FormUser";
import LogIn from "./components/LogIn/LogIn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hydratateFromLocalStorage, loginUser } from "./redux/actions";
import AboutUs from "./components/About/AboutUs";
import FAQs from "./components/About/FAQs";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import Favorites from "./components/Favorites/Favorites";
import { hydratateLSFav } from "./redux/actions";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import AdminHome from "./components/AdminHome/AdminHome";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/About/Footer"
import AdminUsers from "./components/Admin/AdminUsers/AdminUsers";
import AdminPets from "./components/Admin/AdminPets/AdminPets";


function App() {

  useEffect(() => {
    const getUser = () => {
      fetch(`${window.env.URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((res) => {
          dispatch(loginUser(res.user))
          console.log('google -->',res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  useEffect(() => {
    if (localStorage.length === 0) {
      localStorage.setItem("products", JSON.stringify([]));
      localStorage.setItem("favProducts", JSON.stringify([]));
    }
  }, []);
  
  const productsLS = JSON.parse(localStorage.getItem("products"));
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydratateFromLocalStorage(productsLS));
  }, [productsLS]);

  const favoritesLS = JSON.parse(localStorage.getItem("favProducts"));
  useEffect(() => {
    dispatch(hydratateLSFav(favoritesLS));
  }, [favoritesLS]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/shoes/:id" element={<ProductDetail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/user" element={<FormUser />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/aboutUs" element={<AboutUs />} />
        <Route exact path="/questions" element={<FAQs />} />
        <Route exact path="/mercadopago/pagos" element={<MercadoPago />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/post" element={<CreateProduct/>}/>
        <Route exact path="/admin" element={<AdminHome></AdminHome>}/>
        <Route exact path="/admin/users" element={<AdminUsers></AdminUsers>}/>
        <Route exact path="/admin/products" element={<AdminPets></AdminPets>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}
export default App;
