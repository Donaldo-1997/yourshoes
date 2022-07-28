import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getShoesName } from "../../redux/actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import styles from './SearchBar.module.css'


export default function Searchbar({handleInputName, handleNameSubmit}) {
  
  return (
   
    <Form className="d-flex" onSubmit={(e) => handleNameSubmit(e)}  >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => handleInputName(e)}
              id={"input-searchbar"}
            />
            <Button variant="outline-success" onClick={(e) => handleNameSubmit(e)}><FaSearch/></Button>
          </Form>
          
  );
}
