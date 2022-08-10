import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Searchbar from "../SearchBar/SearchBar";
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { logoutUser } from "../../redux/actions";


export default function NavBar({
  handleReset,
  handleInputName,
  handleNameSubmit,
}) {
  
  const { user } = useSelector(state => state)

  const handleLogout = () => {
    localStorage.setItem("products", JSON.stringify([]));
    localStorage.setItem("favProducts", JSON.stringify([]));
    localStorage.setItem("user", JSON.stringify([]));
  };

  return (

    <Navbar style={{background: "#212121"}} expand="lg" className={styles.navbar}>
      <Container fluid>
        <button onClick={(e) => handleReset(e)} className={styles.resetButton}>
          <Navbar.Brand className={styles.yourShoes}>
            Your<span>Shoes</span>
          </Navbar.Brand>
        </button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div className={styles.containerLogout}>
              <Nav.Link className={styles.icon}>
                <Link to="/cart" className={styles.Link}>
                  {" "}
                  <BsFillCartFill style={{ color: "#f87d2d" }} />
                </Link>
              </Nav.Link>
            </div>
            <div className={styles.containerLogout}>
              <Nav.Link className={styles.icon}>
                <Link to="/favorites">
                  <FaHeart style={{ color: "#f87d2d" }} />
                </Link>
              </Nav.Link>
            </div>
            {user && Object.keys(user).length ? (
              <div className={styles.containerLogout}>
                <div>
                  <a
                    href={`${process.env.REACT_APP_URL}/auth/logout`}
                    onClick={handleLogout}
                    className={styles.logout_button}
                  >
                    <BiLogOut style={{ color: "#f87d2d" }}></BiLogOut>
                  </a>
                </div>
                <div>
                  <Link to="/datauser">
                    {!user.image ? (
                      <img
                        className={styles.img}
                        src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png"
                      />
                    ) : (
                      <img className={styles.img} src={user.image} />
                    )}
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.containerLogout}>
                <Nav.Link className={styles.icon}>
                  <Link to="/login">
                    <FaUserAlt style={{ color: "#f87d2d" }} />
                  </Link>
                </Nav.Link>
              </div>
            )}
            { user && user.isAdmin === true ?
            <Link to="/admin">
              <button className={styles.createProdButton}>
                <p className={styles.link}>Dashboard admin</p>
              </button>
              </Link> : <p></p>}
          </Nav>

          <Searchbar
            handleInputName={handleInputName}
            handleNameSubmit={handleNameSubmit}
          ></Searchbar>
        </Navbar.Collapse>
        {/* <GoogleLogin
          clientId="321230858550-vrrr1cr5coemim48ourin60pumf2rh3f.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        /> */}
      </Container>
    </Navbar>
  );
}
