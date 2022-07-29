import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./App.css";
import Cart from "./components/Cart/Cart";
import FormUser from "./components/FormUser/FormUser";
import LogIn from "./components/LogIn/LogIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydratateFromLocalStorage } from "./redux/actions";
import AboutUs from "./components/About/AboutUs";
import FAQs from "./components/About/FAQs";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import Favorites from "./components/Favorites/Favorites";
import { hydratateLSFav } from "./redux/actions";

function App() {

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
      </Routes>
    </Router>
  );
}
export default App;
