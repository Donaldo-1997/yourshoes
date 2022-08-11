import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import UserProfile from "./components/UserProfile/UserProfile";
import AdminHome from "./components/AdminHome/AdminHome";
import Footer from "./components/About/Footer";
import AdminUsers from "./components/Admin/AdminUsers/AdminUsers";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import Community from "./components/About/Community";
import EditProduct from "./components/EditProduct/EditProduct";
import { ToastContainer } from "react-toastify";
import Success from "./components/MercadoPago/Success";
import Chatbot from "react-chatbot-kit";
import config from "./components/Chatbot/chatbotConfig";
import ActionProvider from "./components/Chatbot/ActionProvider";
import MessageParser from "./components/Chatbot/MessageParser";
import axios from 'axios'
import EditUser from "./components/EditUser/EditUser";
import SocialFollow from "./components/About/SocialFollow";





function App() {
  const dispatch = useDispatch();
  const [user, SetUser] = useState(null);
  useEffect(() => {
    let isCancelled = false;

    if (localStorage.length === 0) {
      localStorage.setItem("products", JSON.stringify([]));
      localStorage.setItem("favProducts", JSON.stringify([]));
      localStorage.setItem("user", JSON.stringify([]));
    }

    const getUser = () => {
      // fetch(`${process.env.REACT_APP_URL}/auth/login/success`, {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     // Accept: "application/json",
      //     "origin": [`${process.env.REACT_APP_URL}`],
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true,
      //     "Access-Control-Allow-Origin": "*"
      //   },
      // })
      //   .then((response) => {
      //     if (response.status === 200) return response.json();
      //     throw(response)
      //   })
      //   .then((res) => {
      //     if(!isCancelled){ 
      //     dispatch(loginUser(res.user))
      //     SetUser(res.user)
      //     localStorage.setItem('user',  JSON.stringify(res.user))
      //     console.log('google -->',res);
      //   }})
      //   .catch((err) => {
      //     console.log(err);
      //   });
      axios.get(`${process.env.REACT_APP_URL}/auth/login/success`, {
        withCredentials: true,
          "origin": [`${process.env.REACT_APP_URL}`],
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        })
        .then(res => {
          if(!isCancelled){
            if(res.data.user) {
                dispatch(loginUser(res.data.user))
                localStorage.setItem('user', JSON.stringify(res.data.user))
              }
              console.log('LOGIN_SUCCESS -->', res);
          }
        })
        .catch((err) => {
            console.log('LOGIN_ERROR', err);
        });
      };
    getUser();

    return () => {
      isCancelled = true;
    };
  }, []);




  useEffect(() => {
    if (localStorage.length === 0) {
      localStorage.setItem("products", JSON.stringify([]));
      localStorage.setItem("favProducts", JSON.stringify([]));
    }
  }, [user]);

  const productsLS = JSON.parse(localStorage.getItem("products"));

  useEffect(() => {
    console.log("ACTUALIZANDO CARRITO");
    dispatch(hydratateFromLocalStorage(productsLS));
  }, [productsLS]);

  const favoritesLS = JSON.parse(localStorage.getItem("favProducts"));
  useEffect(() => {
    dispatch(hydratateLSFav(favoritesLS));
  }, [favoritesLS]);

  return (
    <Router>
      <ToastContainer/>
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
        <Route exact path="/datauser" element={<UserProfile/>}/>
        {/* <Route exact path="/admin" element={<AdminHome></AdminHome>}/>
        <Route exact path="/admin/users" element={<AdminUsers></AdminUsers>}/>
        <Route exact path="/admin/products" element={<AdminProducts></AdminProducts>}/>
        <Route exact path="/admin/create-product" element={<AdminProducts></AdminProducts>}/>
        <Route exact path="/community" element={<Community/>}/>
        <Route exact path="/edit/:id" element={<EditProduct/>}/> */}
        <Route exact path="/admin" element={ JSON.parse(localStorage.getItem('user'))?.isAdmin === true ? <AdminHome /> : <Navigate to='/' />}/>
        <Route exact path="/admin/users" element={ JSON.parse(localStorage.getItem('user'))?.isAdmin === true ? <AdminUsers /> : <Navigate to='/' />}/>
        <Route exact path="/admin/products" element={JSON.parse(localStorage.getItem('user'))?.isAdmin === true ? <AdminProducts /> : <Navigate to='/' />}/>
        <Route exact path="/admin/create-product" element={ JSON.parse(localStorage.getItem('user'))?.isAdmin === true ? <AdminProducts /> : <Navigate to='/' />}/>
        <Route exact path="/community" element={<Community/>}/>
        <Route exact path="/edit/:id" element={ JSON.parse(localStorage.getItem('user'))?.isAdmin === true ? <EditProduct /> : <Navigate to='/' />}/>
        <Route exact path="/success" element={<Success/>}/>
        <Route exact path="/failure" element={<div>FAILURE</div>}/>
        <Route exact path="/edituser" element={<EditUser/>}/>
        <Route exact path="/contact" element={<SocialFollow/>}/>
        <Route exact path="/chatbot" element={<Chatbot
         config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            className="app_Chatbot"
        ><img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSTcf9vxteFLXwKOVebZMuNkDh7PkAvwe7w&usqp=CAU"
          alt="Career Guidance Bot"
        /></Chatbot>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}
export default App;
