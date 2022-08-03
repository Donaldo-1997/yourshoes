import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllShoes,
  getAllBrands,
  filterByBrand,
  filterByPrice,
  getAllCategories,
  combinationsFilter,
  filterByCategory,
  filterBySize,
  combinationsFilter6,
  combinationsFilter4,
  combinationsFilter8,
  combinationsFilter11,
  combinationsFilter_12,
  combinationsFilter_13,
  getShoesName,
  combinationsFilter1,
  combinationsFilter3,
  combinationsFilter2,
  combinationsFilter5,
  combinationsFilter7,
  combinationsFilter9,
  combinationsFilter10,
  combinationsFilter14,
  combinationsFilter15,
  combinationsFilter16,
  combinationsFilter17,
  combinationsFilter18,
  getAllSizes
} from "../../redux/actions";
import ProductCards from "../ProductCards/ProductCards";
import Pagination from "../Pagination/Pagination";
import Banner from "../Banner/Banner";
import NavBar from "../NavBar/NavBar";
import About from "../About/Footer";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  const [brandFilter, setBrandFilter] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [sizeFilter, setSizeFilter] = useState("default");
  const [nameFilter, setNameFilter] = useState("")
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("")

  //Paginado//
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage] = useState(12);
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes =
    Array.isArray(allProducts) &&
    allProducts.slice(indexOfFirstShoe, indexOfLastShoe);

  const pagination = (page) => {
    setCurrentPage(page);
  };

  const nextPageButton = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPageButton = () => {
    setCurrentPage(currentPage - 1);
  };
  //Paginado//

  const handleInputPriceMin = (e) => {
    setPriceMin(e.target.value)
  }

  const handleInputPriceMax = (e) => {
    setPriceMax(e.target.value)
  }
  const handleInputName = (e) => {
    e.preventDefault();
    setNameFilter(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if(sizeFilter !== "default" && brandFilter !== "default" && priceMin !== "" && priceMax !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter18(sizeFilter, categoryFilter, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && sizeFilter !== "default" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter14(sizeFilter, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && categoryFilter !== "default" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter10(categoryFilter, nameFilter, priceMax, priceMin, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMax !== "" && priceMin !== "" && brandFilter !== "default"){
      dispatch(combinationsFilter2(brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMax !=="" && priceMin !=="" && categoryFilter !== "default"){
      dispatch(combinationsFilter9(categoryFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !=="default" && categoryFilter !== "default"){
      dispatch(combinationsFilter7(categoryFilter, brandFilter, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter1(nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default"){
      dispatch(combinationsFilter3(nameFilter, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(categoryFilter !=="default"){
      dispatch(combinationsFilter5(categoryFilter, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if( sizeFilter !=="default"){
      dispatch(combinationsFilter15(sizeFilter, nameFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    } 
    else {
      dispatch(getShoesName(nameFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data));
    }
    setCurrentPage(1)
  };

  const handleFilterBrand = (e) => {
    setBrandFilter(e.target.value);
    if(nameFilter !== "" && sizeFilter !== "default" && priceMin !== "" && priceMax !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter18(sizeFilter, categoryFilter, e.target.value, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== "" && sizeFilter !== "default" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter14(sizeFilter, e.target.value, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(categoryFilter !== "default" && nameFilter !== "" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter10(categoryFilter, nameFilter, priceMax, priceMin, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMin !== "" && priceMax !== "" && sizeFilter !== "default"){
      dispatch(combinationsFilter11(e.target.value, priceMin, priceMax, sizeFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    
    else if(priceMax !== "" && priceMin !== "" && nameFilter !== ""){
      dispatch(combinationsFilter2(e.target.value, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMax !== "" && priceMin !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter8(categoryFilter, e.target.value, priceMax, priceMin))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(categoryFilter !== "default" && sizeFilter !== "default"){
      dispatch(combinationsFilter17(sizeFilter, categoryFilter,e.target.value,))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(categoryFilter !=="default" && nameFilter !== ""){
      dispatch(combinationsFilter7(categoryFilter, e.target.value, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== ""){
      dispatch(combinationsFilter3(nameFilter, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (priceMin !== "" && priceMax !== "") {
      dispatch(combinationsFilter(e.target.value, priceMin, priceMax))
        .then(res => console.log(res.data))
        .catch(err => alert(err.response.data))
    }
    else if(sizeFilter !== "default"){
      dispatch(combinationsFilter_13(sizeFilter, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(categoryFilter !=="default"){
      dispatch(combinationsFilter6(e.target.value, categoryFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByBrand(e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data));
    }
    setCurrentPage(1);
  };

  const handleCategories = (e) => {
    setCategoryFilter(e.target.value);
    if(nameFilter !== "" && brandFilter !== "default" && priceMin !== "" && priceMax !== "" && sizeFilter !== "default"){
      dispatch(combinationsFilter18(sizeFilter,e.target.value, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && nameFilter !== "" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter10(e.target.value, nameFilter, priceMax, priceMin, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(priceMax !== "" && priceMin !==" " && brandFilter !== "default"){
      dispatch(combinationsFilter8(e.target.value,nameFilter, brandFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== "default" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter9(e.target.value, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && sizeFilter !== "default"){
      dispatch(combinationsFilter17(sizeFilter, e.target.value, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (priceMin !== "" && priceMax !== "") {
      dispatch(combinationsFilter4(e.target.value, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(brandFilter !=="default" && nameFilter !== ""){
      dispatch(combinationsFilter7(e.target.value, brandFilter, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(nameFilter !==""){
      dispatch(combinationsFilter5(e.target.value, nameFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(brandFilter !=="default"){
      dispatch(combinationsFilter6(brandFilter, e.target.value))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(sizeFilter !=="default"){
      dispatch(combinationsFilter16(sizeFilter, e.target.value))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByCategory(e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    setCurrentPage(1);
  }

  const handleFilterByPrice = (e) => {
    e.preventDefault()
    if(nameFilter !== "" && brandFilter !== "default" && priceMin !== "" && priceMax !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter18(sizeFilter, categoryFilter, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== "" && sizeFilter !== "default" && brandFilter !== "default"){
      dispatch(combinationsFilter14(sizeFilter, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && nameFilter !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter10(categoryFilter, nameFilter, priceMax, priceMin, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (brandFilter !== "default" && nameFilter !== "") {
      dispatch(combinationsFilter2( brandFilter, nameFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if (brandFilter !== "default" && sizeFilter !== "default") {
      dispatch(combinationsFilter11( brandFilter, priceMin, priceMax, sizeFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && categoryFilter !== "default"){
      dispatch(combinationsFilter8(categoryFilter, brandFilter, priceMax, priceMin))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter9(categoryFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !==""){
      dispatch(combinationsFilter1(nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (brandFilter !== "default" ) {
      dispatch(combinationsFilter(brandFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if (categoryFilter !== "default" ) {
      dispatch(combinationsFilter4(categoryFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else if (sizeFilter !== "default" && priceMin !=="" && priceMax !=="") {
      dispatch(combinationsFilter_12(sizeFilter, priceMin, priceMax))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterByPrice(priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    setCurrentPage(1)
  }

  
  const handleSize = (e) => {
    setSizeFilter(e.target.value)
    if(nameFilter !== "" && brandFilter !== "default" && priceMin !== "" && priceMax !== "" && categoryFilter !== "default"){
      dispatch(combinationsFilter18(e.target.value, categoryFilter, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(nameFilter !== "" && brandFilter !== "default" && priceMin !== "" && priceMax !== ""){
      dispatch(combinationsFilter14(e.target.value, brandFilter, nameFilter, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    if(priceMin !== "" && priceMax !== "" && brandFilter !== "default"){
      dispatch(combinationsFilter11(brandFilter, priceMin, priceMax, e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default" && categoryFilter !== "default"){
      dispatch(combinationsFilter17(e.target.value, categoryFilter, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if (priceMax !== "" && priceMin !== "") {
      dispatch(combinationsFilter_12(e.target.value, priceMin, priceMax))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if(brandFilter !== "default"){
      dispatch(combinationsFilter_13(e.target.value, brandFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if( nameFilter !==""){
      dispatch(combinationsFilter15(e.target.value, nameFilter))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    else if( categoryFilter !== "default"){
      dispatch(combinationsFilter16(e.target.value, categoryFilter))
        .then(res => console.log(res))
        .catch(err => alert(err.response.data))
    }
    else {
      dispatch(filterBySize(e.target.value))
      .then(res => console.log(res))
      .catch(err => alert(err.response.data))
    }
    setCurrentPage(1);
  }


  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getAllShoes());
    setNameFilter("")
    setBrandFilter("default");
    setCategoryFilter("default");
    setSizeFilter("default")
    setPriceMax("")
    setPriceMin("")
  };

  useEffect(() => {
    dispatch(getAllShoes());
    dispatch(getAllBrands());
    dispatch(getAllCategories())
    dispatch(getAllSizes())
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <NavBar
        handleNameSubmit={handleNameSubmit}
        handleInputName={handleInputName}
        handleReset={handleReset}
      ></NavBar>
      <Banner></Banner>
      <div className={styles.filtersContainer}>
        <select onChange={(e) => handleFilterBrand(e)} value={brandFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Marcas</option>
          <option value="Vans">Vans</option>
          <option value="Converse">Converse</option>
          <option value="Crocs">Crocs</option>
          <option value="Nike">Nike</option>
          <option value="Vizzano">Vizzano</option>
          <option value="adidas">Adidas</option>
          <option value="Caterpillar">Caterpillar</option>
          <option value="Moleca">Moleca</option>
          <option value="Faraon">Faraon</option>
          <option value="Briganti">Briganti</option>
        </select>
        <select onChange={(e) => handleCategories(e)} value={categoryFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Categorías</option>
          <option value="Zapatillas">Zapatillas</option>
          <option value="Botas y Botinetas">Botas y Botinetas</option>
          <option value="Sandalias y Ojotas">Sandalias y Ojotas</option>
          <option value="Stilletos y Plataformas">Stilletos y Plataformas</option>
          <option value="Mocasines y Oxfords">Mocasines y Oxfords</option>
          <option value="Pantuflas">Pantuflas</option>
          <option value="Chatitas">Chatitas</option>
          <option value="Alpargatas">Alpargatas</option>
        </select>
        <select onChange={(e) => handleSize(e)} value={sizeFilter} className={styles.brandSelect}>
          <option value={"default"} disabled>Talles</option>
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
        <form onSubmit={handleFilterByPrice}>
          <input value={priceMin} type="search" onChange={(e) => handleInputPriceMin(e)} placeholder="Precio min." className={styles.priceFilter} />
          <input value={priceMax} type="search" onChange={(e) => handleInputPriceMax(e)} placeholder="Precio max." className={styles.priceFilter} />
          <button type="submit" className={styles.priceButton}>➤</button>
        </form>
      </div>
      <Pagination
        shoesPerPage={shoesPerPage}
        allProducts={ allProducts && allProducts.length}
        pagination={pagination}
        nextPageButton={nextPageButton}
        prevPageButton={prevPageButton}
        currentPage={currentPage}
      />
      <div className={styles.cardContainer}>
        <div>
          {currentShoes ? (
            <ProductCards allProducts={currentShoes} />
          ) : (
            <ProductCards allProducts={allProducts} />
          )}
        </div>
        <Pagination
          shoesPerPage={shoesPerPage}
          allProducts={allProducts && allProducts.length}
          pagination={pagination}
          nextPageButton={nextPageButton}
          prevPageButton={prevPageButton}
          currentPage={currentPage}
        />
        
      </div>
    </div>
  );
}