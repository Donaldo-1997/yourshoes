import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import {Link} from 'react-router-dom'
import styles from './NavBar2.module.css'






export default function NavBar() {

  

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container fluid>
         <Link to='/'><Navbar.Brand className={styles.yourShoes}>Your<span>Shoes</span></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={styles.icon}>
             <Link to='/cart' className={styles.Link}> <BsFillCartFill style={{ color: "#f87d2d" }} /></Link> 
            </Nav.Link>
            <Nav.Link  className={styles.icon}>
              <Link to="/favorites"><FaHeart style={{ color: "#f87d2d" }} /></Link> 
            </Nav.Link>
              <Nav.Link  className={styles.icon}>
                 <Link to='/login'><FaUserAlt  style={{ color: "#f87d2d" }} /></Link>
              </Nav.Link>
        
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}